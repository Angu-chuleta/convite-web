import { merge } from './merge'

describe('Merge test ->', () => {

  it('Is defined ->', () => {
    expect(merge).toBeDefined()
  })

  it('Is a function ->', () => {
    expect(typeof merge).toBe('function')
  })

  it('Not sources ->', () => {
    let target = { test: 'teste' }
    expect(merge(target, ...[])).toEqual(target)
  })

  it('Sample merge object ->', () => {
    let target = { a: 'a' }
    let source1 = { b: 'b' }
    let source2 = { c: 'c' }
    let source3 = { d: 'd' }
    expect(merge(target, source1, source2, source3)).toEqual({ a: 'a', b: 'b', c: 'c', d: 'd' })
  })

  it('Sample Array ->', () => {
    let target = [1, 2]
    let source = { a: 'a' }
    expect(merge(target, source)).toEqual(target)
  })

  it('Sample object levels ->', () => {
    let target = { a: { b: 'b' } }
    let source = { c: { d: 'd' } }
    let source2 = { e: { f: 'f' } }
    expect(merge(target, source, source2)).toEqual({ a: { b: 'b' }, c: { d: 'd' }, e: { f: 'f' } })
  })

  it('Sample object levels with equals keys ->', () => {
    let target = { a: {} }
    let source2 = { a: { f: null } }
    expect(merge(target, source2)).toEqual({ a: { f: null } })
  })

})
