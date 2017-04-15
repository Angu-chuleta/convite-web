import { AbstractControl } from '@angular/forms'
import { isValidDate } from './datebr-validator'

const invalids = [
  '90/01/2017',
  '01/90/2017',
  '00/00/2017',
  '2017/01/01'
]

const valids = [
  ...new Array<string>(12).fill('').map(() => {
    let data = new Date()
    let dia = data.getDate()
    let mes = data.getMonth() + 1
    let ano = data.getFullYear()
    return `${String('0' + dia).slice(-2)}/${String('0' + mes).slice(-2)}/${ano}`
  }),
  '18/01/1995',
  '10/10/2017',
  '31/12/2017',
  null
]

describe('DateBr Validator', () => {

  it('Is a funciotn', () => {
    expect(isValidDate).toBeDefined()
    expect(typeof isValidDate).toBe('function')
  })

  invalids.forEach(date => {
    it(`Invalid DATE: ${date} ->`, () => expect(isValidDate({ value: date } as AbstractControl).date).toBe(true))
  })

  valids.forEach(date => {
    it(`Valid DATE: ${date} ->`, () => expect(isValidDate({ value: date } as AbstractControl)).toBeNull())
  })

})
