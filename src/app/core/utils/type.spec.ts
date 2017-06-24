import { type } from './type'

describe('Type Test ->', () => {

  it('Is defined ->', () => {
    expect(type).toBeDefined()
  })

  it('Is a function ->', () => {
    expect(typeof type).toBe('function')
  })

  it('Sample type ->', () => {
    type test = string
    let a: test = 'test'
    expect(type<test>(a)).toEqual(a)
  })

  it('Equals type ->', () => {
    type test = string
    let b = 'test'
    try {
      type<test>(b)
      expect(false).toBe(true, 'Permitiu tipos dupkicados')
    } catch (e) {
      expect(e).toEqual(new Error( `Action type '${b}' is not unique"` ))
    }
  })

})
