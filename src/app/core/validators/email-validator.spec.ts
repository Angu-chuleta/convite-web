import { AbstractControl } from '@angular/forms'
import { isValidEmail } from './email-validator'

const invalids = [
  ...new Array<string>(5).fill('').map(() => {
    let random = Math.round(Math.random() * 10000000)
    return `${random}@${random}`
  }),
  'abcd@abc',
  '!@$!$#@!#@#!',
  '.com.br@.com',
  '~teste~@~.com',
  '**@**.com'
]

const valids = [
  ...new Array<string>(3).fill('').map(() => {
    let random = Math.round(Math.random() * 10000000)
    return `${random}@${random}.com`
  }),
  'isvalid@dominio.com',
  'isavalidemail@email.com.br',
  null
]

describe('Email Validator', () => {

  it('Is a funciotn', () => {
    expect(isValidEmail).toBeDefined()
    expect(typeof isValidEmail).toBe('function')
  })

  invalids.forEach(email => {
    it(`Invalid EMAIL: ${email} ->`, () => expect(isValidEmail({ value: email } as AbstractControl).email).toBe(true))
  })

  valids.forEach(email => {
    it(`Valid EMAIL: ${email} ->`, () => expect(isValidEmail({ value: email } as AbstractControl)).toBeNull())
  })

})
