import { environment } from 'environments'

export const GRC_CONFIG = {
  apiEndPoint: environment.apiEndpoint,
  tokenName: `inv-jwt-token-${environment.envName}`,
  version: '0.0.0'
}
