export interface IEnvironment {
  production: boolean
  envName: 'dev' | 'prod'
  apiEndpoint: string
}
