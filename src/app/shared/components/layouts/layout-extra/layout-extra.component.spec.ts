import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { LayoutExtraComponent } from './layout-extra.component'

describe('LayoutExtraComponent', () => {
  let component: LayoutExtraComponent
  let fixture: ComponentFixture<LayoutExtraComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutExtraComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutExtraComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should be created', () => {
    expect(component).toBeTruthy()
  })
})
