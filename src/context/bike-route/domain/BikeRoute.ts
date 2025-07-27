import { User } from "@/context/user/domain/User";
import { Distance } from "./ValueObjects/Distance";
import { Id } from "./ValueObjects/Id";
import { Name } from "./ValueObjects/Name";

export class BikeRoute {
  constructor(
    readonly id: Id,
    readonly name: Name,
    readonly distance: Distance,
    readonly creator: User,
    readonly bikers: User[],
    readonly image?: string
  ) {}

  static fromPrimitives(data: {
    id: string;
    name: string;
    distance: number;
    creator: {
      id: string;
      name: string;
      email: string;
      password: string;
    };
    bikers?: Array<{
      id: string;
      name: string;
      email: string;
      password: string;
    }>;
    image?: string;
  }): BikeRoute {
    return new BikeRoute(
      new Id(data.id),
      new Name(data.name),
      new Distance(data.distance),
      User.fromPrimitives(data.creator), // Usa User.fromPrimitives para convertir el objeto creator
      data.bikers ? data.bikers.map((biker) => User.fromPrimitives(biker)) : [], // Convierte cada biker
      data.image
    );
  }

  toPrimitives(): {
    id: string;
    name: string;
    distance: number;
    creator: {
      id: string;
      name: string;
      email: string;
      password: string;
    };
    bikers: Array<{
      id: string;
      name: string;
      email: string;
      password: string;
    }>;
    image?: string;
  } {
    return {
      id: this.id.id,
      name: this.name.name,
      distance: this.distance.distance,
      creator: this.creator.toPrimitives(), // Convierte el User a objeto plano
      bikers: this.bikers.map((biker) => biker.toPrimitives()), // Convierte cada biker
      image: this.image,
    };
  }
}
