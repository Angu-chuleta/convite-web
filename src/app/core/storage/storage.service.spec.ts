import { TestBed, inject } from '@angular/core/testing'
import { StorageService } from './storage.service'

const TEST = {
  'unit-test': { value: 'unit test' },
  'unit-test-2': ['value2'],
  'unit-test-3': 'value3'
}

describe('StorageService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StorageService]
    })
  })

  it('should ...', inject([StorageService], (service: StorageService) => {
    expect(service).toBeTruthy('O Serviço não foi instanciado corretamente!')
    expect(localStorage).toBeTruthy('localStorage não está definido no ambiente de teste')
  }))

  Object.keys(TEST).forEach(KEY => {
    const VALUE = TEST[KEY]

    it(`Set item ${KEY} ->`, inject([StorageService], (service: StorageService) => {
      service.setItem(KEY, VALUE)
      expect(localStorage.length > 0).toBe(true, 'Não inseriu corretamente no localStorage!')
      expect(localStorage.getItem(KEY)).toBeDefined('Item inserido não está definido no localStorage!')
    }))

    it(`Get item ${KEY} ->`, inject([StorageService], (service: StorageService) => {
      const ITEM = service.getItem(KEY)
      expect(ITEM).toBeDefined('Ao tentar obter item inserido, obteve-se algo indefinido!')
      expect(ITEM).toEqual(VALUE, 'Item obtido diferente do item cadastrado!')
    }))

    it(`Update item ${KEY} ->`, inject([StorageService], (service: StorageService) => {
      const ITEM = service.getItem(KEY)
      let updated = JSON.parse(JSON.stringify(ITEM)) // cloning
      switch (typeof ITEM) {
        case 'string':
          updated = 'updated'
          break
        case 'boolean':
          updated = !ITEM
          break
        case 'number':
          updated = ITEM + 50
          break
        default:
          if (typeof ITEM.length === 'number') {
            updated = ['updated', null]
            break
          }
          updated.updated = true
      }
      service.updateItem(KEY, updated)
      expect(service.getItem(KEY)).not.toEqual(ITEM, 'Não atualizou o item corretamente!')
    }))

    it(`Remove iem ${KEY}`, inject([StorageService], (service: StorageService) => {
      service.removeItem(KEY)
      expect(service.getItem(KEY)).toBeUndefined()
      expect(localStorage.getItem(KEY)).toBeNull()
    }))

  })

  it('Get invalid item ->', inject([StorageService], (service: StorageService) => {
    // Obtendo item inválido
    let invalidItem = service.getItem('invalidItem')
    expect(invalidItem).toBeUndefined('Item inválido não está indefinido!')
  }))

  it('Get item by number key ->', inject([StorageService], (service: StorageService) => {
    service.setItem('test-by-number', true)
    // Obtendo item por number
    let itemClone = service.getItem(0)
    expect(itemClone).toBeDefined('Ao tentar obter item inserido por number key, obteve-se algo indefinido!')
  }))

  it('Update non-existent item', inject([StorageService], (service: StorageService) => {
    const key = 'test-non-existent'
    const item = { exists: true }
    expect(service.getItem(key)).toBeUndefined()
    service.updateItem(key, item)
    expect(service.getItem(key)).toEqual(item)
  }))

  it('Clear storage ->', inject([StorageService], (service: StorageService) => {
    service.clear()
    expect(localStorage.length).toBe(0, 'localStorage não está vazio')
  }))

})
