import { IInvitation } from 'interfaces'
import { BaseModel } from './base.model'

export class Invitation extends BaseModel implements IInvitation {

  event: string = ''
  guest: string = ''
  date: Date = new Date()
  deadline: Date = new Date(Date.now() + (86400000 * 30)) // Today + 30 days
  isConfirmed: boolean

}
