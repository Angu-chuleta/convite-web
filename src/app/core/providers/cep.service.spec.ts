import { inject, TestBed } from '@angular/core/testing'
import { HttpModule } from '@angular/http'

import { CepService } from './cep.service'

describe('CepService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CepService],
      imports: [
        HttpModule
      ]
    })
  })

  it('should be created', inject([CepService], (service: CepService) => {
    expect(service).toBeTruthy()
  }))

  it('find valid cep', inject([CepService], (service: CepService) => {
    const obs = service.getAddress('01001000')
    expect(obs).toBeDefined()
    expect(obs.subscribe).toBeDefined()
  }))

})
