import { GRC_CONFIG } from './app.config'

describe('AppConfig Test ->', () => {

  it('Is defined ->', () => {
    expect(GRC_CONFIG).toBeDefined('Config não está definido!')
  })

  it('All properties ->', () => {
    // API Endpoint
    expect(GRC_CONFIG.apiEndPoint).not.toBeUndefined('Api endpoint is undefined')
    expect(GRC_CONFIG.apiEndPoint).not.toBeNull('Api endpoint is null')
    // Token name
    expect(GRC_CONFIG.tokenName).not.toBeUndefined('Token name is undefined')
    expect(GRC_CONFIG.tokenName).not.toBeNull('Token name is null')
  })

})
