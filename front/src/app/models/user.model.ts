export interface User {
  _id: string,
  displayName: string,
  email: string,
  token: string,
  avatar: string,
}

export interface RegisterUserData {
  email: string,
  displayName: string,
  password: string
}

export interface LoginUserData {
  email: string,
  displayName: string,
  password: string,
}

export interface FieldError {
  message: string
}

export interface RegisterError {
  errors: {
    password: FieldError,
    displayName: FieldError,
    email: FieldError
  }
}

export interface LoginError {
  error: string
}
