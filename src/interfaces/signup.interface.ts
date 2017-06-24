import { IBase } from './base.interface'

export interface IPreSignUp {
  email: string
}

export interface ISignUp extends IBase, IPreSignUp {
  name: string
  password: string
  confirm?: string
}
