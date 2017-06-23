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
    let n = Math.round(Math.random() * (10000000000000 - 100000000) + 100000000).toString()
    return `(${n.substr(0, 2)}) 9 ${n.substr(3, 4)}-${n.substr(6, 4)}`
  }),
  '(27) 9 9999-9999',
  '(28) 9 9899-9998',
  '(31) 9 8999-9997',
  '(72) 9 9399-9996',
  '(60) 9 9299-9995',
  '(11) 9 9199-9994',
  null
]

describe('Cellphone Validator ->', () => {

  it('Is defined ->', () => {
    expect(isValidCellPhone).toBeDefined()
    expect(typeof isValidCellPhone).toBe('function')
  })

  invalids.forEach(cellphone => {
    const isValidReturn = isValidCellPhone({ value: cellphone } as AbstractControl)
    it(`Invalid cellphone: ${cellphone} ->`, () => expect( isValidReturn ? isValidReturn.cellphone : isValidReturn).toBe(true))
  })

  valids.forEach(cellphone => {
    it(`Valid cellphone: ${cellphone} ->`, () => expect(isValidCellPhone({ value: cellphone } as AbstractControl)).toBeNull())
  })

})
