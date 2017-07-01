import { IBase, IPagination } from 'interfaces'

export class Pagination<T extends IBase> implements IPagination<T> {
  page: number = 1
  pageSize: number = 10
  total: number
  result: Array<T>
}
