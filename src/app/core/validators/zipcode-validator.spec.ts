import { AbstractControl } from '@angular/forms'
import { isValidZipCode } from './zipcode-validator'

const invalids = [
  ...new Array<string>(5).fill('').map(() => {
    return Math.round(Math.random() * 10000000).toString()
  }),
  '29150000',
  '29150001',
  '00000000',
  'is not a cep',
  '2a3b4c5d9e'
]

const valids = [
  ...new Array<string>(3).fill('').map(() => {
    let random = Math.round(Math.random() * 10000000000).toString()
    return `${random.substr(0, 2)}.${random.substr(2, 3)}-${random.substr(4, 3)}`
  }),
  '29.000-999',
  '29.111-111',
  '20.989-898',
  null
]

describe('CEP Validator', () => {

  it('Is a funciotn', () => {
    expect(isValidZipCode).toBeDefined()
    expect(typeof isValidZipCode).toBe('function')
  })

  invalids.forEach(zip => {
    const isValidReturn = isValidZipCode({ value: zip } as AbstractControl)
    it(`Invalid CEP: ${zip} ->`, () => expect(isValidReturn ? isValidReturn.zipcode : isValidReturn).toBe(true))
  })

  valids.forEach(zip => {
    it(`Valid CEP: ${zip} ->`, () => expect(isValidZipCode({ value: zip } as AbstractControl)).toBeNull())
  })

})
