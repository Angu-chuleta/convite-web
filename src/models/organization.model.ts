import { ETypeOrganizer, IOrganization } from 'interfaces'
import { BaseModel } from './base.model'

export class Organization extends BaseModel implements IOrganization {

  event: string
  user: string
  type: ETypeOrganizer = ETypeOrganizer.ORGANIZADOR // default ORGANIZADOR

}
