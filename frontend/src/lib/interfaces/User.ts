export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface User {
  id: string
  email: string
  name: string
  lastName: string
  role: Role
  createdAt: string
  updatedAt: string
}
