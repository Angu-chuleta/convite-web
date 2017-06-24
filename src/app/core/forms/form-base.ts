import { EventEmitter, Output } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'

import {
  isValidCellPhone,
  isValidCNPJ,
  isValidCPF,
  isValidDate,
  isValidEmail,
  isValidPhone,
  isValidZipCode
} from '../validators'

import {
  CELL_PHONE_MASK,
  CEP_MASK,
  CNPJ_MASK,
  CREDICARD_MASK,
  DATE_MASK,
  PHONE_MASK,
  PLATE_MASK,
  YEAR_MASK
} from '../utils/masks/masks'

export type ValidationMessages = { [key: string]: { [key: string]: string; }; }
export type ValidationErrors = { [key: string]: string[]; }

export abstract class FormBase {

  @Output() public onSubmit = new EventEmitter<any>()

  public get isValid (): boolean {
    return this.form.valid
  }

  /**
   *
   *
   *
   * @memberof FormBase
   */
  public masks = {
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
   * @type {FormGroup}
   * @memberof FormBase
   */
  public form: FormGroup

  /**
   *
   *
   * @abstract
   * @type {ValidationMessages}
   * @memberof FormBase
   */
  public abstract validationMessages: ValidationMessages

  /**
   *
   *
   * @type {ValidationErrors}
   * @memberof FormBase
   */
  public validationErrors: ValidationErrors = {}

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
   * Creates an instance of FormBase.
   *
   * @memberOf FormBase
   */
  constructor (protected formBuilder: FormBuilder) {
    this.createForm()
  }

  /**
   *
   *
   * @param {*} formModel
   *
   * @memberof FormBase
   */
  public onSubmitClick (formModel: any) {
    if (!this.form.valid) {
      this.showErrors()
      return
    }
    formModel = this.prepareFormModel(formModel)
    this.onSubmit.emit(formModel)
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
  protected abstract createFormModel (): FormGroup

  /**
   *
   *
   * @protected
   *
   * @memberOf FormBase
   */
  protected updateErrors () {
    this.validationErrors = this.getValidationErrors(this.form, this.validationMessages)
  }

  /**
   *
   *
   * @protected
   * @param {*} entity
   * @returns {*}
   *
   * @memberOf FormBase
   */
  protected prepareFormModel (formModel: any): any { return formModel }

  /**
   *
   *
   * @protected
   *
   * @memberOf FormBase
   */
  protected showErrors (): void {
    Object.keys(this.form.controls).forEach(key => {
      let value = this.form.get(key)
      if (value) {
        value.markAsTouched()
      }
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
  protected setAllControlsState (isDisabled: boolean): void {
    Object.keys(this.form.controls).forEach(key => {
      let value = this.form.get(key)
      if (value) {
        isDisabled
          ? value.disable()
          : value.enable()
      }
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
  protected getValidationErrors (form: FormGroup, validationMessages: ValidationMessages): ValidationErrors {
    if (!form || !validationMessages) {
      return {}
    }
    // build form errors Object from validationMessages Object (same structure)
    let errors = Object.assign({}, ...Object.keys(validationMessages).map(key => ({ [key]: [] })))

    for (const field in errors) {
      const control = form.get(field)
      if (control && control.touched && !control.valid && control.errors) {
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
  protected createForm (): void {
    this.form = this.createFormModel()
    this.form.valueChanges.subscribe(() => this.updateErrors())
    this.updateErrors() // (re)set validation messages now
  }
}
