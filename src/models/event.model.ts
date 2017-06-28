import { IEvent, IEventsPlace, IEventTime } from 'interfaces'
import { BaseModel } from './base.model'

export class Event extends BaseModel implements IEvent {

  name: string = ''
  date: Date = new Date()
  time: IEventTime = { start: new Date(), end: new Date() }
  link: string = ''
  invitationText: string = ''
  canceled: boolean = false
  eventsPlace: IEventsPlace = {
    name: '',
    capacity: 0,
    zipCode: '',
    address: '',
    number: '',
    complement: '',
    neighbor: '',
    city: '',
    state: '',
    country: ''
  }

}
