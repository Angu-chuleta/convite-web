import { FormControl } from '@angular/forms'

/**
 * Verifica se as senhas conferem
 */
export const passwordMatcher = ( control: FormControl ): { [ key: string ]: boolean } | null => {
  const password = control.root.get( 'password' )
  const confirm = control.root.get( 'confirm' )

  if ( !password || !confirm ) {
    return null
  }

  return password.value === confirm.value ? null : { noMatchPassword: true }
}
