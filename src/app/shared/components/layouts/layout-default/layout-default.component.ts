import { Component, Input } from '@angular/core'

@Component({
  selector: 'inv-layout-default',
  templateUrl: './layout-default.component.html',
  styleUrls: ['./layout-default.component.scss']
})
export class LayoutDefaultComponent {
  pageTitle: any
  @Input() openedSidebar: boolean = false

  // constructor ( private sharedService: SharedService ) {
  //   sharedService.changeEmitted$.subscribe(
  //     title => {
  //       this.pageTitle = title
  //     }
  //   )
  // }

  sidebarState () {
    this.openedSidebar = !this.openedSidebar
  }
}
