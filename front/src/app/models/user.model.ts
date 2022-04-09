export interface User {
  _id: string,
  displayName: string,
  email: string,
  token: string,
  role: string,
  avatar: string,
}

export interface RegisterUserData {
  email: string,
  password: string
}

export interface LoginUserData {
  email: string,
  password: string,
}

export interface FieldError {
  message: string
}

export interface RegisterError {
  errors: {
    password: FieldError,
    email: FieldError
  }
}

export interface LoginError {
  error: string
}
