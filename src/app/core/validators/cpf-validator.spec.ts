import { AbstractControl } from '@angular/forms'
import { isValidCPF } from './cpf-validator'

const invalids = [
  ...new Array<string>(10).fill('').map(() => Math.round(Math.random() * 10000000000).toString()),
  '12345678909',
  '11111111111',
  '22222222222',
  '33333333333',
  '44444444444',
  '55555555555',
  '66666666666',
  '77777777777',
  '88888888888',
  '99999999999',
  '00000000000'
]

const valids = [
  '42184242500',
  '63543814370',
  '43048634444',
  '73707967603',
  '35697773242',
  '26038215557',
  '155.124.678-32',
  '177.066.265-04',
  '673.397.720-65',
  '832.381.966-18',
  null
]

describe('CPF Validator', () => {

  it('Is a funciotn', () => {
    expect(isValidCPF).toBeDefined()
    expect(typeof isValidCPF).toBe('function')
  })

  invalids.forEach(cpf => {
    it(`Invalid CPF: ${cpf} ->`, () => expect(isValidCPF({ value: cpf } as AbstractControl).cpf).toBe(true))
  })

  valids.forEach(cpf => {
    it(`Valids CPF: ${cpf} ->`, () => expect(isValidCPF({ value: cpf } as AbstractControl)).toBeNull())
  })

})
