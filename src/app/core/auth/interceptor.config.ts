const DEFAULT_HEADER_NAME = 'Authorization'

/**
 *
 *
 * @export
 * @interface InterceptorConfigOptional
 */
export interface InterceptorConfigOptional {
  headerName?: string
  headerPrefix?: string
  noTokenError?: boolean
}

/**
 *
 *
 * @export
 * @class InterceptorConfig
 */
export class InterceptorConfig {

  headerName: string = DEFAULT_HEADER_NAME
  noTokenError: boolean = false

  constructor ( config?: InterceptorConfigOptional ) {
    config = config || {}
    Object.assign( this, config )
  }
}
