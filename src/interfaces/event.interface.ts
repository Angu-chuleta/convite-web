import { IAddress } from './address.interface'
import { IBase } from './base.interface'

/**
 * Interface para as entidades de Eventos
 *
 * @export
 * @interface IEvent
 * @extends {IBase}
 */
export interface IEvent extends IBase {
  /**
   * Nome do evento
   *
   * @type {string}
   * @memberof IEvent
   */
  name: string
  /**
   * Data do evento
   *
   * @type {Date}
   * @memberof IEvent
   */
  date: Date
  /**
   * Horário do evento
   *
   * @type {IEventTime}
   * @memberof IEvent
   */
  time: IEventTime
  /**
   * Link do convite
   *
   * @type {string}
   * @memberof IEvent
   */
  link: string
  /**
   * Texto do convite
   *
   * @type {string}
   * @memberof IEvent
   */
  invitationText: string
  /**
   * Se o evento foi cancelado
   *
   * @type {boolean}
   * @memberof IEvent
   */
  canceled: boolean
  /**
   * Local do evento
   *
   * @type {IEventsPlace}
   * @memberof IEvent
   */
  eventsPlace: IEventsPlace
  /**
   * Campo puramente usado no front para saber
   * a relação do evento com usuário atual logado
   *
   * @type {('Organizador' | 'Colaborador' | 'Convidado')}
   * @memberof IEvent
   */
  userRole?: 'Organizador' | 'Colaborador' | 'Convidado'
}

export interface IEventTime {
  /**
   * Hora de início do evento
   *
   * @type {number}
   * @memberof IEventTime
   */
  start: Date
  /**
   * Hora do fim do evento
   *
   * @type {number}
   * @memberof IEventTime
   */
  end: Date
}

export interface IEventsPlace extends IAddress {
  /**
   * Nome do local
   *
   * @type {string}
   * @memberof IEventsPlace
   */
  name: string
  /**
   * Capacidade do local
   *
   * @type {number}
   * @memberof IEventsPlace
   */
  capacity: number
}
