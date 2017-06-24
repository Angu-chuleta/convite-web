import { isObject } from './is-object'

/**
 *  Do a deep merge
 *  ref: http://stackoverflow.com/questions/27936772/how-to-deep-merge-instead-of-shallow-merge
 * @export
 * @param {any} target
 * @param {any} sources
 * @returns
 */
export function merge (target: any, ...sources: any[]): any {
  if (!sources.length) { return target }
  const source = sources.shift()

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) {
          Object.assign(target, { [key]: {} })
        }
        merge(target[key], source[key])
      } else {
        Object.assign(target, { [key]: source[key] })
      }
    }
  }

  return merge(target, ...sources)
}
