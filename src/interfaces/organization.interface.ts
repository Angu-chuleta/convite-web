import { IBase } from './base.interface'

/**
 * Organização de eventos
 *
 * @export
 * @interface IOrganization
 * @extends {IBase}
 */
export interface IOrganization extends IBase {
  /**
   * ID do evento
   *
   * @type {string}@memberof IOrganization
   */
  event: string

  /**
   * ID do usuário
   *
   * @type {string}@memberof IOrganization
   */
  user: string

  /**
   * Tipo do organizador
   *
   * @type {ETypeOrganizer}@memberof IOrganization
   */
  type: ETypeOrganizer
}

/**
 * Tipo de Organizador
 *
 * @export
 * @enum {number}
 */
export enum ETypeOrganizer {
  /**
   * Organizador do evento
   */
  ORGANIZADOR,
  /**
   * Colaborador do evento
   */
  COLABORADOR
}
