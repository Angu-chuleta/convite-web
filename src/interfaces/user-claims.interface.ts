import { IBase } from './base.interface'

export interface IUserClaims extends IBase {
  name: string
  email: string
  exp: number
  iat: number
  isAdmin: boolean
}
