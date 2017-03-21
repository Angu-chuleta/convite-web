import { ConviteWebPage } from './app.po'

describe('convite-web App', () => {
  let page: ConviteWebPage

  beforeEach(() => {
    page = new ConviteWebPage()
  })

  it('should display message saying Convite works', () => {
    page.navigateTo()
    expect(page.getParagraphText()).toEqual('Convite works')
  })
})
