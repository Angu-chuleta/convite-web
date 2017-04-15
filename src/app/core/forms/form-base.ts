import { Output, EventEmitter } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'

import {
  isValidCellPhone,
  isValidCPF,
  isValidDate,
  isValidPhone,
  isValidCNPJ,
  isValidEmail,
  isValidZipCode
} from '../validators'

import {
  CNPJ_MASK,
  CEP_MASK,
  PHONE_MASK,
  CELL_PHONE_MASK,
  DATE_MASK,
  CREDICARD_MASK,
  YEAR_MASK,
  PLATE_MASK
} from '../utils/masks/masks'

export type ValidationMessages = { [key: string]: { [key: string]: string; }; }
export type ValidationErrors = { [key: string]: string[]; }

export abstract class FormBase {

  @Output() public onSubmit = new EventEmitter<any>()

  /**
   *
   *
   * @protected
   *
   * @memberOf FormBase
   */
  protected validators = {
    cellphone: isValidCellPhone,
    cpf: isValidCPF,
    date: isValidDate,
    phone: isValidPhone,
    cnpj: isValidCNPJ,
    email: isValidEmail,
    zipcode: isValidZipCode
  }

  /**
   *
   *
   * @protected
   *
   * @memberOf FormBase
   */
  protected masks = {
    cnpj: CNPJ_MASK,
    cep: CEP_MASK,
    phone: PHONE_MASK,
    cellphone: CELL_PHONE_MASK,
    date: DATE_MASK,
    credicard: CREDICARD_MASK,
    year: YEAR_MASK,
    plate: PLATE_MASK
  }

  /**
   *
   *
   * @protected
   * @type {FormGroup}
   * @memberOf FormBase
   */
  protected form: FormGroup

  /**
   *
   *
   * @abstract
   * @type {{ [ key: string ]: string; }}
   * @memberOf FormBase
   */
  protected abstract validationMessages: ValidationMessages

  /**
   *
   *
   * @abstract
   * @type {{ [ key: string ]: string; }}
   * @memberOf FormBase
   */
  protected validationErrors: ValidationErrors = {}

  /**
   * Creates an instance of FormBase.
   *
   * @memberOf FormBase
   */
  constructor(protected formBuilder: FormBuilder) {
    this.createForm()
  }

  /**
   *
   *
   * @protected
   * @abstract
   * @returns {FormGroup}
   *
   * @memberOf FormBase
   */
  protected abstract createFormModel(): FormGroup

  /**
   *
   *
   * @protected
   * @param {*} [data]
   *
   * @memberOf FormBase
   */
  protected updateErrors(data?: any) {
    this.validationErrors = this.getValidationErrors(this.form, this.validationMessages)
  }

  /**
   *
   *
   * @protected
   * @param {*} entity
   *
   * @memberOf FormBase
   */
  protected onSubmitClick(formModel: any) {
    if (!this.form.valid) {
      this.showErrors()
      return
    }
    formModel = this.prepareFormModel(formModel)
    this.submitForm(formModel)
    this.onSubmit.emit(formModel)
  }

  /**
   *
   *
   * @protected
   * @abstract
   * @param {*} entity
   *
   * @memberOf FormBase
   */
  protected submitForm(entity: any) { }

  /**
   *
   *
   * @protected
   * @param {*} entity
   * @returns {*}
   *
   * @memberOf FormBase
   */
  protected prepareFormModel(formModel: any): any { return formModel }

  /**
   *
   *
   * @protected
   *
   * @memberOf FormBase
   */
  protected showErrors(): void {
    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key).markAsTouched()
      this.updateErrors()
    })
  }

  /**
   *
   *
   * @protected
   * @param {boolean} isDisabled
   *
   * @memberOf FormBase
   */
  protected setAllControlsState(isDisabled: boolean): void {
    Object.keys(this.form.controls).forEach(key => {
      isDisabled
        ? this.form.get(key).disable()
        : this.form.get(key).enable()
    })
  }

  /**
   * Build validation errors from validation messages and form model
   *
   * @protected
   * @param {FormGroup} form
   * @param {*} validationMessages
   * @returns
   *
   * @memberOf FormBase
   */
  protected getValidationErrors(form: FormGroup, validationMessages: ValidationMessages): ValidationErrors {
    if (!form || !validationMessages) {
      return {}
    }
    // build form errors Object from validationMessages Object (same structure)
    let errors = Object.assign({}, ...Object.keys(validationMessages).map(key => ({ [key]: [] })))

    for (const field in errors) {
      const control = form.get(field)
      if (control && control.touched && !control.valid) {
        const messages = validationMessages[field]

        for (const key in control.errors) {
          errors[field].push(`${messages[key]} `)
        }
      }
    }
    return errors
  }

  /**
   *
   *
   * @private
   *
   * @memberOf ProfileFormComponent
   */
  protected createForm(): void {
    this.form = this.createFormModel()
    this.form.valueChanges.subscribe(data => this.updateErrors(data))
    this.updateErrors() // (re)set validation messages now
  }
}
