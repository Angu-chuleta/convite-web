import { Component, Input, OnChanges, SimpleChanges } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { FormBase } from 'app/core/forms'
import { passwordMatcher } from 'app/core/validators'

@Component({
  selector: 'inv-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss']
})
export class SignUpFormComponent extends FormBase implements OnChanges {

  @Input() email: string

  public validationMessages = {
    'name': {
      'required': 'Digite seu nome'
    },
    'email': {
      'required': 'Digite seu email',
      'email': 'Email inválido'
    },
    'password': {
      'required': 'Digite sua senha'
    },
    'confirm': {
      'required': 'Confirme sua senha',
      'noMatchPassword': 'A senha não confere'
    }
  }

  /**
   * Creates an instance of SignUpFormComponent.
   * @param {FormBuilder} formBuilder
   *
   * @memberof SignUpFormComponent
   */
  constructor (formBuilder: FormBuilder) {
    super(formBuilder)
  }

  /**
   * On changes (inputs)
   *
   * @param {SimpleChanges} changes
   *
   * @memberof SignUpFormComponent
   */
  ngOnChanges (changes: SimpleChanges): void {
    if (changes['email']) {
      this.form.reset({ email: this.email })
      let emailControl = this.form.get('email')
      if (emailControl) {
        emailControl.disable()
      }
    }
  }

  /**
   * Create form model
   *
   * @protected
   * @returns {FormGroup}
   *
   * @memberof SignUpFormComponent
   */
  protected createFormModel (): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, this.validators.email]],
      password: ['', Validators.required],
      confirm: ['', [Validators.required, passwordMatcher]]
    })
  }

}
