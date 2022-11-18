class CustomError extends Error {
  constructor(message: string, public code: number) {
    super(message)
    this.code = code

    Object.setPrototypeOf(this, CustomError.prototype)
  }
}

export const UserConflictError = new CustomError(
  'This username has already been taken.',
  409
)

export default CustomError
