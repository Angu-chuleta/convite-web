import { Component, OnDestroy, OnInit } from '@angular/core'
import { StorageService } from 'app/core/storage'
import * as $ from 'jquery'
import { NAVBAR_KEY } from '../navbar/navbar.component'

@Component({
  selector: 'inv-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnDestroy, OnInit {
  private bodyClass: string

  constructor (private storage: StorageService) {
    this.bodyClass = this.storage.getItem(NAVBAR_KEY) || 'nav-md'
  }

  ngOnInit (): void {

    const $BODY = $('body')
    const $LEFT_COL = $('.left_col')
    const $RIGHT_COL = $('.right_col')
    const $NAV_MENU = $('.nav_menu')
    const $SIDEBAR_FOOTER = $('.sidebar-footer')
    const $FOOTER = $('footer')

    $('body').addClass(this.bodyClass)

    $RIGHT_COL.css('min-height', $(window).height() as number)
    let bodyHeight = $BODY.outerHeight() as number
    let footerHeight = $BODY.hasClass('footer_fixed') ? -10 : ($FOOTER.height() as number)
    let leftColHeight = ($LEFT_COL.eq(1).height() as number) + ($SIDEBAR_FOOTER.height() as number)
    let contentHeight = bodyHeight < leftColHeight ? leftColHeight : bodyHeight

        // normalize content
    contentHeight -= ($NAV_MENU.height() as number) + footerHeight

    $RIGHT_COL.css('min-height', contentHeight)
  }

  ngOnDestroy (): void {
    $('body').removeClass(this.bodyClass)
  }
}
