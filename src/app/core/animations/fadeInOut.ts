import { trigger, transition, style, animate } from '@angular/core'

const fadeInOut = trigger( 'fadeInOut', [
  transition( 'void => *', [
    style( { opacity: 0 } ),
    animate( 200, style( { opacity: 1 } ) )
  ] ),
  transition( '* => void', [
    animate( 200, style( { opacity: 0 } ) )
  ] )
] )

export { fadeInOut };
