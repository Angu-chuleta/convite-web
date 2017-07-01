import { IBase } from './base.interface'

export interface IPagination<T extends IBase> {
  page: number
  total: number
  result: T[]
}
