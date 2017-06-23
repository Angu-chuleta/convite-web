import { Injectable } from '@angular/core'

@Injectable()
export class StorageService {

  /**
   *
   *
   * @param {string} key
   * @param {*} value
   *
   * @memberOf StorageService
   */
  public setItem (key: string, value: any) {
    localStorage.setItem(key, this.convertValue(value))
  }

  /**
   *
   *
   * @param {any} k
   * @returns
   *
   * @memberOf Store
   */
  public getItem (key: string | number) {
    let value: string | null
    if (typeof key !== 'number') {
      value = localStorage.getItem(key)
    } else {
      const assertKey: string | null = localStorage.key(key)
      value = assertKey ? localStorage.getItem(assertKey) : null
    }
    return this.unconvertValue(value)
  }

  /**
   *
   *
   * @param {any} k
   *
   * @memberOf Store
   */
  public removeItem (key: string) {
    localStorage.removeItem(key)
  }

  /**
   *
   *
   * @param {string} key
   * @param {*} updates
   *
   * @memberOf Storage
   */
  public updateItem (key: string, updates: any) {
    const obj = this.getItem(key)
    if (typeof obj === 'string' || typeof obj === 'boolean') {
      this.setItem(key, updates)
      return
    }
    this.setItem(key, Object.assign(obj || {}, updates))
  }

  /**
   *
   *
   *
   * @memberOf Store
   */
  public clear () {
    localStorage.clear()
  }

  /**
   *
   *
   * @private
   * @param {any} value
   * @returns
   *
   * @memberOf Store
   */
  private convertValue (value: any): any {
    return typeof value !== 'object' ? value : JSON.stringify(value)
  }

  /**
   *
   *
   * @private
   * @param {string|null} value
   * @returns
   *
   * @memberOf Store
   */
  private unconvertValue (value: string | null) {
    if (value !== null) {
      if (value.indexOf('{') === 0 || value.indexOf('[') === 0) {
        return JSON.parse(value)
      } else {
        return value
      }
    }
  }
}
