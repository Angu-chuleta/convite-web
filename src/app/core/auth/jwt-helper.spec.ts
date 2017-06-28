import { inject, TestBed } from '@angular/core/testing'
import { JwtHelper } from './jwt-helper'

describe('jwt-helper', () => {

  let validToken: string
  let invalidTokens: Array<string>

  beforeEach(() => {
    validToken = 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkIxYmI1JDZ3a0AiLCJhY3RpdmUiOnRydWUsImNyZWF0ZWRBdCI6IjIwMTctMDUtMDNUMjE6MTU6NTIuNzgxWiIsIm5hbWUiOiJSb290IiwiZW1haWwiOiJyb290QGxvY2FsLmNvbSIsInVzZXJuYW1lIjoiIiwiaWF0IjoxNDk4NTI3MjMyLCJleHAiOjE0OTg5NTkyMzJ9.zObj0QWsBYPGVmeY8Fdya0MGacN67pZ4h_khE0ivTZ0'
    invalidTokens = [
      'JWT invalid12312qsdasdtoken1231r13',
      ''
    ]
    TestBed.configureTestingModule({
      providers: [
        JwtHelper
      ]
    })
  })

  it('should be created ->', inject([JwtHelper], (service: JwtHelper) => {
    expect(service).toBeTruthy()
  }))

  it('decode token ->', inject([JwtHelper], (service: JwtHelper) => {
    const userClaims = service.decodeToken(validToken)
    expect(userClaims).toBeDefined('Não decodificou o token!')
    expect(userClaims.id).toBeDefined('Decodificou um token sem um id!')
    invalidTokens.forEach(token => {
      expect(() => service.decodeToken(token)).toThrow()
    })
  }))

  it('get token expiration date ->', inject([JwtHelper], (service: JwtHelper) => {
    const date = service.getTokenExpirationDate(validToken)
    expect(date).toBeDefined()
    expect(date instanceof Date).toBe(true)
    invalidTokens.forEach(token => {
      expect(() => service.getTokenExpirationDate(token)).toThrow()
    })
  }))

  it('is token expired? ->', inject([JwtHelper], (service: JwtHelper) => {
    expect(typeof service.isTokenExpired(validToken) === 'boolean').toBe(true)
    invalidTokens.forEach(token => {
      expect(() => service.isTokenExpired(token)).toThrow()
    })
  }))

})
