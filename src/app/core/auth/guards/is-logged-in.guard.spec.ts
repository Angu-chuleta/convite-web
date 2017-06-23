import { inject, TestBed } from '@angular/core/testing'
import { Router } from '@angular/router'
import { AuthStub, RouterStub } from 'stubs'
import { AuthService } from '../auth.service'
import { IsLoggedInGuard } from './is-logged-in.guard'

describe('IsLoggedInGuard ->', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        IsLoggedInGuard,
        { provide: AuthService, useClass: AuthStub },
        { provide: Router, useClass: RouterStub }
      ]
    })
  })

  it('should ...', inject([IsLoggedInGuard, AuthService], (service: IsLoggedInGuard, auth: AuthService) => {
    expect(service).toBeTruthy('O Guard não foi instanciado corretamente!')
    expect(auth).toBeTruthy('O AuthStub não foi instanciado corretamente!')
    expect(auth.login).toBeDefined('Login não está implementado')
  }))

  it('Can load ->', inject([IsLoggedInGuard, AuthService], (service: IsLoggedInGuard, auth: AuthService) => {

    const ROUTE = { path: 'test' }

    expect(service.canLoad(ROUTE)).toBeFalsy('O guard não funcionou corretamente')
    expect(service.canLoad({ path: undefined })).toBeFalsy('O guard não funcionou corretamente')

    auth.login({ email: 'teste@teste.com', password: 'password' })
      .subscribe(
      () => {
        expect(service.canLoad(ROUTE)).toBeTruthy('O guard não deixou carregar a rota depois do login')
      },
      err => {
        throw err
      }
      )

  }))

  it('Can activate ->', inject([IsLoggedInGuard, AuthService], (service: IsLoggedInGuard, auth: AuthService) => {

    const ACTIVATED_ROUTE: any = { url: [{ path: 'test' }] }

    expect(service.canActivate(ACTIVATED_ROUTE)).toBeFalsy('O guard não funcionou corretamente')
    expect(service.canActivate({ url: { map: () => undefined }} as any)).toBeFalsy('O guard não funcionou corretamente')

    auth.login({ email: 'teste@teste.com', password: 'password' })
      .subscribe(
      () => {
        expect(service.canActivate(ACTIVATED_ROUTE)).toBeTruthy('O guard não deixou ativar a rota depois do login')
      },
      err => {
        throw err
      }
      )

  }))

})
