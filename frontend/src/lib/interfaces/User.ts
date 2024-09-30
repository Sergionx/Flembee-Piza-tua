export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}

export interface User {
  id: string
  email: string
  name: string
  lastName: string
  // password: string
  role: Role
  createdAt: Date
  updatedAt: Date
}