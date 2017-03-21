import { ConviteWebPage } from './app.po';

describe('convite-web App', () => {
  let page: ConviteWebPage;

  beforeEach(() => {
    page = new ConviteWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
