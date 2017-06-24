import { Injectable } from '@angular/core'
import { environment } from 'environments'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { Observable } from 'rxjs/Observable'
import { StorageService } from '../storage/storage.service'

@Injectable()
export class TokenStorageService {

  token$: Observable<string>
  private token: BehaviorSubject<string>
  private key: string = `inv-${environment.envName}-token`

  /**
   * Creates an instance of TokenStorageService.
   * @param {StorageService} storage
   *
   * @memberof TokenStorageService
   */
  constructor (private storage: StorageService) {
    const token = this.storage.getItem(this.key)
    this.token = new BehaviorSubject<string>(token)
    this.token$ = this.token.asObservable()
  }

  /**
   * Set token
   *
   * @param {string} token
   * @param {boolean} keep
   *
   * @memberof TokenStorageService
   */
  set (token: string, keep: boolean): void {
    if (keep) {
      this.storage.setItem(this.key, token)
    }
    this.token.next(token)
  }

  /**
   * Remove token
   *
   * @memberof TokenStorageService
   */
  remove (): void {
    this.storage.removeItem(this.key)
    this.token.next(undefined as any)
  }

}
