import { AbstractControl } from '@angular/forms'
import { isValidCellPhone } from './cellphone-validator'

const invalids = [
  ...new Array<string>(10).fill('').map(() => Math.round(Math.random() * 100000000).toString()),
  '27999999999',
  '10000000000',
  '00987654321',
  '000987654321',
  '310987654321',
  '270987654321'
]

const valids = [
  ...new Array<string>(10).fill('').map(() => {
    let n = Math.round(Math.random() * 1000000000000).toString()
    return `(${n.substr(0, 2)}) ${n.substr(2, 1)} ${n.substr(3, 4)}-${n.substr(6, 4)}`
  }),
  '(27) 9 9999-9999',
  '(28) 9 9999-9998',
  '(31) 9 9999-9997',
  '(72) 9 9999-9996',
  '(60) 9 9999-9995',
  '(11) 9 9999-9994',
  null
]

describe('Cellphone Validator', () => {

  it('Is defined', () => {
    expect(isValidCellPhone).toBeDefined()
    expect(typeof isValidCellPhone).toBe('function')
  })

  invalids.forEach(cellphone => {
    it(`Invalid cellphone: ${cellphone} ->`, () => expect(isValidCellPhone({ value: cellphone } as AbstractControl).cellphone).toBe(true))
  })

  valids.forEach(cellphone => {
    it(`Valid cellphone: ${cellphone}`, () => expect(isValidCellPhone({ value: cellphone } as AbstractControl)).toBeNull())
  })

})
