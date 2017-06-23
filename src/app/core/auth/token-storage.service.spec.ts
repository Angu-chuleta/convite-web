import { inject, TestBed } from '@angular/core/testing'
import { StorageService } from '../storage/storage.service'
import { TokenStorageService } from './token-storage.service'

describe('TokenStorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TokenStorageService,
        StorageService
      ]
    })
  })

  it('should be created', inject([TokenStorageService], (service: TokenStorageService) => {
    expect(service).toBeTruthy()
  }))
})
