import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { LoadingLoggedOutComponent } from './loading-logged-out.component'

describe('LoadingLoggedOutComponent', () => {
  let component: LoadingLoggedOutComponent
  let fixture: ComponentFixture<LoadingLoggedOutComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoadingLoggedOutComponent]
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingLoggedOutComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should be created', () => {
    expect(component).toBeTruthy()
  })
})
