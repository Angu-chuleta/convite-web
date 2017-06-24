import { InviteMePage } from './app.po'

describe('invite.me App', () => {

  let page: InviteMePage

  beforeEach(() => {
    page = new InviteMePage()
  })

  it('should display welcome message', () => {
    page.navigateTo()
    expect(page.getTitle()).toEqual('Login')
  })
})
