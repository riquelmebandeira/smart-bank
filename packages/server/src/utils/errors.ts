class CustomError extends Error {
  constructor(message: string, public code: number) {
    super(message)
    this.code = code

    Object.setPrototypeOf(this, CustomError.prototype)
  }
}

export const UserConflictError = new CustomError(
  'Este nome de usuário pertence a outra pessoa.',
  409
)

export const InvalidCredentialsError = new CustomError(
  'Nome de usuário ou senha incorretos.',
  401
)

export default CustomError
