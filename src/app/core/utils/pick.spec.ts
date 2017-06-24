import { pick } from './pick'

describe('Pick Test ->', () => {

  it('Is defined ->', () => {
    expect(pick).toBeDefined()
  })

  it('Is a function ->', () => {
    expect(typeof pick).toBe('function')
  })

  it('Sample pick ->', () => {
    let target = { a: 'a', b: 'b', c: 'c' }
    let props = ['a', 'c']
    expect(pick(target, props)).toEqual({ a: 'a', c: 'c' })
  })

  it('Prop not exists ->', () => {
    let target = { a: 'a' }
    let props = ['b']
    expect(pick(target, props)).toEqual({})
  })

})
