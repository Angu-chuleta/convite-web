import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { FormBase } from 'app/core/forms'

@Component({
  selector: 'inv-pre-sign-up-form',
  templateUrl: './pre-sign-up-form.component.html',
  styleUrls: ['./pre-sign-up-form.component.scss']
})
export class PreSignUpFormComponent extends FormBase {
  public validationMessages = {
    'email': {
      'required': 'Digite seu email',
      'email': 'Email inválido'
    }
  }

  /**
   * Creates an instance of PreSignUpFormComponent.
   * @param {FormBuilder} formBuilder
   *
   * @memberof PreSignUpFormComponent
   */
  constructor (formBuilder: FormBuilder) {
    super(formBuilder)
  }

  /**
   * Create form model
   *
   * @protected
   * @returns {FormGroup}
   *
   * @memberof PreSignUpFormComponent
   */
  protected createFormModel (): FormGroup {
    return this.formBuilder.group({
      email: ['', [Validators.required, this.validators.email]]
    })
  }
}
