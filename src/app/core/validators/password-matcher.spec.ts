import { AbstractControl } from '@angular/forms'
import { passwordMatcher } from './password-matcher'

const fakeControl = (value, confirm) => {
  return {
    get: (key) => {
      switch (key) {
        case 'password':
          return value ? { value: value } : null
        case 'confirm':
          return value ? { value: confirm } : null
        default:
          return null
      }
    }
  }
}

const invalids = [
  ['123', '321'],
  ['0987654321', '123'],
  ['$#@$!@#!', '!#@!$@#$']
]

const valids = [
  ['', ''],
  ['123', '123'],
  ['!@#!$!@#!#@!123', '!@#!$!@#!#@!123'],
  ['*0987654321*', '*0987654321*']
]

describe('Cellphone Validator', () => {

  it('Is defined', () => {
    expect(passwordMatcher).toBeDefined()
    expect(typeof passwordMatcher).toBe('function')
  })

  invalids.forEach(duoEquals => {
    it(`Invalid cellphone: ${duoEquals} ->`, () => expect(passwordMatcher(fakeControl(duoEquals[0], duoEquals[1]) as AbstractControl).noMatchPassword).toBe(true))
  })

  valids.forEach(duoEquals => {
    it(`Valid cellphone: ${duoEquals}`, () => expect(passwordMatcher(fakeControl(duoEquals[0], duoEquals[1]) as AbstractControl)).toBeNull())
  })

})
