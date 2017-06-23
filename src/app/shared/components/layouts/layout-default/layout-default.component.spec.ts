import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterLinkActiveOptionsStub, RouterLinkStubDirective } from 'stubs'
import { FooterComponent } from '../../footer/footer.component'
import { LogoComponent } from '../../logo/logo.component'
import { LayoutDefaultComponent } from './layout-default.component'

describe('LayoutDefaultComponent', () => {
  let component: LayoutDefaultComponent
  let fixture: ComponentFixture<LayoutDefaultComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FooterComponent,
        LogoComponent,
        RouterLinkActiveOptionsStub,
        RouterLinkStubDirective,
        LayoutDefaultComponent
      ],
      imports: [
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
