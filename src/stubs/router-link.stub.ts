import { Directive, Input } from '@angular/core'

@Directive({
  selector: '[routerLink]',
  host: {
    '(click)': 'onClick()'
  }
})
export class RouterLinkStubDirective {
  @Input('routerLink') linkParams: any
  navigatedTo: any = null

  onClick () {
    this.navigatedTo = this.linkParams
  }

}

@Directive({
  selector: '[routerLinkActiveOptions]',
  exportAs: 'routerLinkActiveOptions'
})
export class RouterLinkActiveOptionsStub {
  @Input('routerLinkActiveOptions') routerLinkActiveOptions: any
}
