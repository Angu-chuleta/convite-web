import { immutableMerge } from './immutable-merge'

describe('Immutable merge test ->', () => {

  it('Is defined ->', () => {
    expect(immutableMerge).toBeDefined()
  })

  it('Sample two objects ->', () => {
    let source = { a: 'a' }
    let target = { b: 'b' }
    const result = immutableMerge(source, target)
    expect(result).toEqual({ a: 'a', b: 'b' })
  })

  it('Two list ->', () => {
    let source = [1]
    let target = [2, 3]
    const result = immutableMerge(target, source)
    expect(result).toEqual(Object.assign({}, target))
  })

  it('Equals objects levels ->', () => {
    let source = { a: { b: 'b' } }
    let target = { a: { b: 'a' } }
    const result = immutableMerge(target, source)
    expect(result).toEqual(source)
  })

  it('Not equals objects levels ->', () => {
    let source = { a: { d: 'b' } }
    let target = { b: { c: 'c' } }
    const result = immutableMerge(target, source)
    expect(result).toEqual({ b: { c: 'c' }, a: { d: 'b' } })
  })

})
