import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { CreateEventComponent } from './create.component'

describe('CreateComponent', () => {
  let component: CreateEventComponent
  let fixture: ComponentFixture<CreateEventComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEventComponent ]
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
