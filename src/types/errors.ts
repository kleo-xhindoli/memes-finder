export class BaseError extends Error {
  type = this.constructor.name;
}

export class InvalidEmailOrPasswordError extends BaseError {
  constructor() {
    super('Invalid email or password');
  }
}
