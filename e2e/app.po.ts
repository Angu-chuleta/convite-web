import { browser, by, element } from 'protractor';

export class Invite.MePage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('inv-root h1')).getText();
  }
}
