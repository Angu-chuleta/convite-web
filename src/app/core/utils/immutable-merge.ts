import { isObject } from './is-object'
/**
 * Do a immutable deep merge
 *
 * ref: http://stackoverflow.com/questions/27936772/how-to-deep-merge-instead-of-shallow-merge
 *
 * @export
 * @param {any} target
 * @param {any} source
 * @returns
 */
export function immutableMerge( target: any, source: any ) {
  let output = Object.assign( {}, target )
  if ( isObject( target ) && isObject( source ) ) {
    Object.keys( source ).forEach( key => {
      if ( isObject( source[ key ] ) ) {
        if ( !( key in target ) ) {
          Object.assign( output, { [ key ]: source[ key ] } )
        } else {
          output[ key ] = immutableMerge( target[ key ], source[ key ] )
        }
      } else {
        Object.assign( output, { [ key ]: source[ key ] } )
      }
    } )
  }
  return output
}
