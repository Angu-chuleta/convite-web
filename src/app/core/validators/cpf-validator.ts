import { AbstractControl } from '@angular/forms'
const cpfCnpj: any = require('cpf_cnpj')

/**
 * Faz a validação de CPF
 */
export const isValidCPF = ( control: AbstractControl ): { [ key: string ]: boolean } | null => {

  if ( !control.value ) { return null }

  return cpfCnpj.CPF.isValid( control.value )
    ? null
    : { cpf: true }
}
