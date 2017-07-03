import { Component, Input, OnChanges } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { FormBase, ValidationMessages } from 'app/core/forms'
import { CepService } from 'app/core/providers'
import { Event } from 'models'

@Component({
  selector: 'inv-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent extends FormBase implements OnChanges {

  @Input() event: Event

  public validationMessages: ValidationMessages = {
    'name': {
      required: 'Campo obrigatório'
    },
    'date': {
      required: 'Campo obrigatório'
    },
    'eventsPlace.name': {
      required: 'Campo obrigatório'
    },
    'eventsPlace.zipCode': {
      required: 'Campo obrigatório',
      zipcode: 'CEP inválido'
    },
    'eventsPlace.address': {
      required: 'Campo obrigatório'
    },
    'eventsPlace.neighbor': {
      required: 'Campo obrigatório'
    },
    'eventsPlace.city': {
      required: 'Campo obrigatório'
    },
    'eventsPlace.state': {
      required: 'Campo obrigatório'
    },
    'time.start': {
      required: 'Campo obrigatório'
    },
    'time.end': {
      required: 'Campo obrigatório'
    }
  }

  private cep: CepService

  constructor (formBuilder: FormBuilder, cep: CepService) {
    super(formBuilder)
    this.cep = cep
  }

  ngOnChanges () {
    if (this.event) {
      this.form.reset(this.event)
    }
  }

  fillAddress (cep: FormControl | null): void {

    if (!cep) { return }
    if (cep.invalid) { return }

    const toggleControls = (doControl?: 'disable') => {
      const controlAddress = this.form.get('eventsPlace.address')
      const controlComplement = this.form.get('eventsPlace.complement')
      const controlNeighbor = this.form.get('eventsPlace.neighbor')
      const controlCity = this.form.get('eventsPlace.city')
      const controlState = this.form.get('eventsPlace.state')
      if (controlNeighbor && controlCity && controlState && controlAddress && controlComplement) {
        if (doControl === 'disable') {
          controlAddress.disable()
          controlComplement.disable()
          controlNeighbor.disable()
          controlCity.disable()
          controlState.disable()
        } else {
          controlAddress.enable()
          controlComplement.enable()
          controlNeighbor.enable()
          controlCity.enable()
          controlState.enable()
        }
      }
    }

    toggleControls('disable')

    this.cep.getAddress(cep.value.replace(/\D/g, ''))
      .subscribe(
        address => {
          const eventsPlace = this.form.get('eventsPlace')
          if (!eventsPlace) { return }
          eventsPlace.patchValue(address)
          toggleControls()
        }
      )
  }

  protected createFormModel (): FormGroup {
    return this.formBuilder.group({
      id: [null],
      name: [null, Validators.required],
      date: [null, Validators.required],
      time: this.formBuilder.group({
        start: [null, Validators.required],
        end: [null, Validators.required]
      }),
      invitationText: [null],
      eventsPlace: this.formBuilder.group({
        name: [null, Validators.required],
        capacity: [0],
        zipCode: [null, [Validators.required, this.validators.zipcode]],
        address: [null, Validators.required],
        number: '',
        complement: '',
        neighbor: [null, Validators.required],
        city: [null, Validators.required],
        state: [null, Validators.required]
      })
    })
  }
}
