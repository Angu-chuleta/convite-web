import { Observable } from 'rxjs/Observable'

export class ActivatedRouteStub {
  public static params: { [key: string]: string } = {}
  public static queryParams: { [key: string]: string } = {}

  get params (): Observable<any> {
    return Observable.of(ActivatedRouteStub.params)
  }

  get queryParams (): Observable<any> {
    return Observable.of(ActivatedRouteStub.queryParams)
  }
}
