export class Distance {
  constructor(readonly distance: number) {
    if (typeof distance !== "number")
      throw new Error("Distance must be a number");
    if (distance < 0) throw new Error("Distance must be positive");
  }
}
