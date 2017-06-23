import { Invite.MePage } from './app.po';

describe('invite.me App', () => {
  let page: Invite.MePage;

  beforeEach(() => {
    page = new Invite.MePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to inv!!');
  });
});
