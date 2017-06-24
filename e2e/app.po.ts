import { browser, by, element } from 'protractor'

export class InviteMePage {
  navigateTo () {
    return browser.get('/')
  }

  getTitle () {
    return element(by.css('inv-root h1')).getText()
  }
}
