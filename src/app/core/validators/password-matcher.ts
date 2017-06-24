import { FormControl } from '@angular/forms'

/**
 * Verifica se as senhas conferem
 */
export const passwordMatcher = ( control: FormControl ): { [ key: string ]: boolean } | null => {
  const password = control.root ? control.root.get( 'password' ) : null
  const confirm = control.root ? control.root.get( 'confirm' ) : null

  if ( !password || !confirm ) {
    return null
  }

  return password.value === confirm.value ? null : { noMatchPassword: true }
}
