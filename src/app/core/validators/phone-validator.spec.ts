import { AbstractControl } from '@angular/forms'
import { isValidPhone } from './phone-validator'

const invalids = [
  ...new Array<string>(10).fill('').map(() => Math.round(Math.random() * 1000000000).toString()),
  '2733333333',
  '1000000000',
  '0098765432',
  '0009876543',
  '31098765432',
  '270987654321'
]

const valids = [
  ...new Array<string>(10).fill('').map(() => {
    let n = Math.round(Math.random() * (10000000000000 - 100000000) + 100000000).toString()
    return `(${n.substr(0, 2)}) ${n.substr(3, 4)}-${n.substr(6, 4)}`
  }),
  '(27) 3333-3333',
  '(28) 3999-9998',
  '(31) 4999-9997',
  '(72) 5999-9996',
  '(60) 6999-9995',
  '(11) 7999-9994',
  null
]

describe('Phone Validator', () => {

  it('Is defined', () => {
    expect(isValidPhone).toBeDefined()
    expect(typeof isValidPhone).toBe('function')
  })

  invalids.forEach(phone => {
    const isValidReturn = isValidPhone({ value: phone } as AbstractControl)
    it(`Invalid phone: ${phone} ->`, () => expect(isValidReturn ? isValidReturn.phone : isValidReturn).toBe(true))
  })

  valids.forEach(phone => {
    it(`Valid phone: ${phone}`, () => expect(isValidPhone({ value: phone } as AbstractControl)).toBeNull())
  })

})
