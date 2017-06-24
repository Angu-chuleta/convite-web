import { isObject } from './is-object'

describe('isObject Test ->', () => {

  it('Is defined ->', () => {
    expect(isObject).toBeDefined()
  })

  it('Is a function ->', () => {
    expect(typeof isObject).toBe('function')
  })

  it('Sample object ->', () => {
    expect(isObject({ a: 1 })).toBe(true)
  })

  it('Sample array ->', () => {
    expect(isObject([1])).toBe(false)
  })

})
