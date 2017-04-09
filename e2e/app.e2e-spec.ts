import { InviteMeWebPage } from './app.po'

describe('invite.me-web App', () => {
  let page: InviteMeWebPage

  beforeEach(() => {
    page = new InviteMeWebPage()
  })

  it('should display message saying InviteMe works', () => {
    page.navigateTo()
    page.getParagraphText().then(value => {
      expect(value).toBe('InviteMe works', 'Título esperado não foi encontrado!')
      return value;
    })
  })
})
