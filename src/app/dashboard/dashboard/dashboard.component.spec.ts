import { async, ComponentFixture, TestBed } from '@angular/core/testing'
// import { ActivatedRoute, Router } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'
import { CoreModule } from 'app/core'
import { AuthService } from 'app/core/auth'
import { SharedModule } from 'app/shared'
import { AuthStub } from 'stubs'
import { DashboardComponent } from './dashboard.component'

describe('DashboardComponent', () => {
  let component: DashboardComponent
  let fixture: ComponentFixture<DashboardComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      imports: [
        CoreModule,
        RouterTestingModule,
        SharedModule
      ],
      providers: [
        // { provide: Router, useClass: RouterStub },
        // { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: AuthService, useClass: AuthStub }
      ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should be created', () => {
    expect(component).toBeTruthy()
  })
})
