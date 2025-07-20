import { Id } from "./ValueObjects/Id";
import { Name } from "./ValueObjects/Name";
import { Email } from "./ValueObjects/Email";
import { Password } from "./ValueObjects/Password";

export class User {
  constructor(
    public readonly id: Id, // CAMBIO: Ahora es public readonly
    public readonly name: Name, // CAMBIO: Ahora es public readonly
    public readonly email: Email, // CAMBIO: Ahora es public readonly
    public readonly password: Password // CAMBIO: Ahora es public readonly
  ) {}

  // Método para crear una instancia de User desde datos primitivos (ej. de la API)
  // Esto es crucial para convertir la respuesta JSON de tu backend en una instancia de tu dominio.
  static fromPrimitives(data: {
    id: string;
    name: string;
    email: string;
    password: string;
  }): User {
    return new User(
      new Id(data.id),
      new Name(data.name),
      new Email(data.email),
      new Password(data.password)
    );
  }

  // Método para convertir la instancia de User a datos primitivos (ej. para enviar a la API)
  // Esto es útil si necesitas enviar un objeto plano a tu backend (aunque para login/register
  // normalmente envías email/password directamente).
  toPrimitives(): {
    id: string;
    name: string;
    email: string;
    password: string;
  } {
    return {
      id: this.id.id,
      name: this.name.name,
      email: this.email.email,
      password: this.password.password,
    };
  }
}
