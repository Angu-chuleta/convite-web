import { environment } from './../../environments/environment'

export const config = {
  apiEndPoint: environment.apiEndpoint,
  tokenName: `iv-jwt-token-${environment.envName}`
}
