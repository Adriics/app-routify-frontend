import { InvalidIdLength } from "../errors/InvalidIdLength";

export class Name {
  constructor(readonly name: string) {
    if (name.length < 3)
      throw new InvalidIdLength(`The length of the name ${name} is invalid`);
  }
}
