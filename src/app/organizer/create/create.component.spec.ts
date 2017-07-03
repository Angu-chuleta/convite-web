import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { CoreModule } from 'app/core'
import { SharedModule } from 'app/shared'
import { EventFormComponent } from '../event-form/event-form.component'
import { CreateEventComponent } from './create.component'

describe('CreateComponent', () => {
  let component: CreateEventComponent
  let fixture: ComponentFixture<CreateEventComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CreateEventComponent,
        EventFormComponent
      ],
      imports: [
        CoreModule,
        RouterTestingModule,
        SharedModule
      ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEventComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should be created', () => {
    expect(component).toBeTruthy()
  })
})
