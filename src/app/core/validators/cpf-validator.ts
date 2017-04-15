import { AbstractControl } from '@angular/forms'
import * as cpfCnpj from 'cpf_cnpj'

/**
 * Faz a validação de CPF
 */
export const isValidCPF = ( control: AbstractControl ): { [ key: string ]: boolean } => {

  if ( !control.value ) { return null }

  return cpfCnpj.CPF.isValid( control.value )
    ? null
    : { cpf: true }
}
