import { config } from './app.config'

describe('AppConfig Test ->', () => {

  it('Is defined ->', () => {
    expect(config).toBeDefined('Config não está definido!')
  })

  it('Backend server test ->', done => {
    let xhr = new XMLHttpRequest()
    xhr.open('GET', `${config.apiEndPoint}/status/200`, true)
    xhr.send(null)
    xhr.onload = e => {
      if (xhr.readyState === 4) {
        expect(xhr.status).toBe(200, 'Servidor respondeu status diferente de 200')
        done()
      }
    }
    xhr.onerror = err => {
      expect(err).toBeUndefined()
      done()
    }
  })

})
