import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from 'app/core/auth'
import { StorageService } from 'app/core/storage'
import { environment } from 'environments'
import * as $ from 'jquery'

export const NAVBAR_KEY = `inv-${environment.envName}-navbar`

@Component({
  selector: 'inv-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  private atualBodyClass: string
  private toggledBodyClass: string
  constructor (
    private auth: AuthService,
    private router: Router,
    private storage: StorageService) {}

  ngOnInit (): void {
    this.atualBodyClass = this.storage.getItem(NAVBAR_KEY) || 'nav-md'
    this.toggledBodyClass = this.atualBodyClass === 'nav-md' ? 'nav-sm' : 'nav-md'
  }

  logout (): void {
    this.auth.logout()
    this.router.navigate(['/auth', 'login'])
  }

  toggleSideBar (): void {
    $('body').removeClass(this.atualBodyClass).addClass(this.toggledBodyClass)
    const old = this.atualBodyClass
    this.atualBodyClass = this.toggledBodyClass
    this.toggledBodyClass = old
    this.storage.setItem(NAVBAR_KEY, this.atualBodyClass)
  }

}
