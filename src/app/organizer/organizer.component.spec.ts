import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { CoreModule } from 'app/core'
import { SharedModule } from 'app/shared'
import { OrganizerComponent } from './organizer.component'

describe('OrganizerComponent', () => {
  let component: OrganizerComponent
  let fixture: ComponentFixture<OrganizerComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizerComponent ],
      imports: [
        CoreModule,
        RouterTestingModule,
        SharedModule
      ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizerComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should be created', () => {
    expect(component).toBeTruthy()
  })
})
