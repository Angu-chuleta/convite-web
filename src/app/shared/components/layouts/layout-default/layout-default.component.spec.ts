import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { CoreModule } from 'app/core'
import { SharedModule } from 'app/shared'
import { RouterLinkActiveOptionsStub, RouterLinkStubDirective } from 'stubs'
import { LayoutDefaultComponent } from './layout-default.component'

describe('LayoutDefaultComponent', () => {
  let component: LayoutDefaultComponent
  let fixture: ComponentFixture<LayoutDefaultComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RouterLinkActiveOptionsStub,
        RouterLinkStubDirective
      ],
      imports: [
        CoreModule,
        RouterTestingModule,
        SharedModule
      ],
      providers: [
      ]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutDefaultComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should be created', () => {
    expect(component).toBeTruthy()
  })
})
