import { FormControl } from '@angular/forms'
import { passwordMatcher } from './password-matcher'

const fakeControl = (value: any, confirm: any): FormControl => {
  return {
    root: {
      get: (key: string) => {
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
  } as FormControl
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
    const passMatch = passwordMatcher(fakeControl(duoEquals[0], duoEquals[1]))
    it(`Invalid cellphone: ${duoEquals} ->`, () => expect(passMatch ? passMatch.noMatchPassword : passMatch).toBe(true))
  })

  valids.forEach(duoEquals => {
    it(`Valid cellphone: ${duoEquals}`, () => {
      expect(passwordMatcher(fakeControl(duoEquals[0], duoEquals[1]))).toBeNull()
    })
  })

})
