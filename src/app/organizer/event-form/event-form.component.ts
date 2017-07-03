import { Component, Input, OnChanges } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { FormBase, ValidationMessages } from 'app/core/forms'
import { IEvent } from 'interfaces'
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

  constructor (formBuilder: FormBuilder) {
    super(formBuilder);
    (window as any).form = this.form
  }

  ngOnChanges () {
    if (this.event) {
      this.form.reset(this.event)
    }
  }

  findCep (model: IEvent): void {
    // let cep = model.eventsPlace.zipCode
    // let endereco = model.eventsPlace.address
    // let num = model.eventsPlace.number
    // let bairro = model.eventsPlace.neighbor
    // let cidade = model.eventsPlace.city
    // let estado = model.eventsPlace.state

    // const controlNeighbor = this.form.get('neighbor')
    // const controlCity = this.form.get('city')
    // const controlState = this.form.get('state')

    // if (!cidade && !bairro && !estado) {
    //   if (controlNeighbor && controlCity && controlState) {
    //     controlNeighbor.disable()
    //     controlCity.disable()
    //     controlState.disable()
    //   }
    //   let sub = this.maps.getAddress(model.zipCode).subscribe(address => {
    //     this.form.patchValue({ 'neighbor': address.neighbor }, { onlySelf: true, emitEvent: true })
    //     this.form.patchValue({ 'city': address.city }, { onlySelf: true, emitEvent: true })
    //     this.form.patchValue({ 'state': address.state }, { onlySelf: true, emitEvent: true })
    //   }, () => void (0), () => {
    //     if (controlNeighbor && controlCity && controlState) {
    //       controlNeighbor.enable()
    //       controlCity.enable()
    //       controlState.enable()
    //     }
    //     sub.unsubscribe()
    //   })
    // }
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
