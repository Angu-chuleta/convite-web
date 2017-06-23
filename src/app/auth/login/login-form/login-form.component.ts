import { Component, Input, OnChanges, SimpleChanges } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { FormBase } from 'app/core/forms'
import { ICredentialsLogin } from 'interfaces'

@Component({
  selector: 'inv-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent extends FormBase implements OnChanges {

  @Input() credentials: ICredentialsLogin

  public validationMessages = {
    'email': {
      'required': 'Digite seu email',
      'email': 'Email inválido'
    },
    'password': {
      'required': 'Digite sua senha'
    }
  }

  /**
   * Creates an instance of LoginFormComponent.
   * @param {FormBuilder} formBuilder
   *
   * @memberof LoginFormComponent
   */
  constructor (formBuilder: FormBuilder) {
    super(formBuilder)
  }

  /**
   * On Changes (inputs)
   *
   * @param {SimpleChanges} changes
   *
   * @memberof LoginFormComponent
   */
  ngOnChanges (changes: SimpleChanges): void {
    if (changes['credentials']) {
      this.form.reset(this.credentials)
    }
  }

  /**
   * Create form model
   *
   * @protected
   * @returns {FormGroup}
   *
   * @memberof LoginFormComponent
   */
  protected createFormModel (): FormGroup {
    return this.formBuilder.group({
      email: ['', [Validators.required, this.validators.email]],
      password: ['', Validators.required],
      keepLogin: [false]
    })
  }

}
