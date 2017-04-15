import { AbstractControl } from '@angular/forms'
import { isValidCNPJ } from './cnpj-validator'

const invalids = [
  ...new Array<string>(10).fill('').map(() => Math.round(Math.random() * 10000).toString()),
  '098765432109312'
]

const valids = [
  '24686645000198',
  '18.909.361/0001-10',
  '58.498.459/0001-47',
  '34.783.139/0001-70',
  '30482453000162',
  '73591537000147',
  '82883346000140',
  '52846714000119',
  '46.040.614/0001-06',
  '54.072.475/0001-12',
  null
]

describe('CNPJ Validator', () => {

  it('Is a function', () => {
    expect(isValidCNPJ).toBeDefined()
    expect(typeof isValidCNPJ).toBe('function')
  })

  invalids.forEach(cnpj => {
    it(`Invalid CPNJ: ${cnpj} ->`, () => expect(isValidCNPJ({ value: cnpj } as AbstractControl).cnpj).toBe(true))
  })

  valids.forEach(cnpj => {
    it(`Valid CNPJ: ${cnpj} ->`, () => expect(isValidCNPJ({ value: cnpj } as AbstractControl)).toBeNull())
  })

})
