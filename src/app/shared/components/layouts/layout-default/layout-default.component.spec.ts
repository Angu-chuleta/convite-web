import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { MaterialModule } from '@angular/material'
import { RouterLinkActiveOptionsStub, RouterLinkStubDirective } from 'stubs'
import { BadgeComponent } from '../../badge/badge.component'
import { FooterComponent } from '../../footer/footer.component'
import { LogoComponent } from '../../logo/logo.component'
import { MainMenuComponent } from '../../main-menu/main-menu.component'
import { MainMenuService } from '../../main-menu/main-menu.service'
import { NavbarComponent } from '../../navbar/navbar.component'
import { SidebarComponent } from '../../sidebar/sidebar.component'
import { LayoutDefaultComponent } from './layout-default.component'

describe('LayoutDefaultComponent', () => {
  let component: LayoutDefaultComponent
  let fixture: ComponentFixture<LayoutDefaultComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BadgeComponent,
        FooterComponent,
        LogoComponent,
        MainMenuComponent,
        NavbarComponent,
        RouterLinkActiveOptionsStub,
        RouterLinkStubDirective,
        SidebarComponent,
        LayoutDefaultComponent
      ],
      imports: [
        MaterialModule
      ],
      providers: [
        MainMenuService
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
