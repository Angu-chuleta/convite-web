
export class RouterStub {
  activeRoute = [] as string[]
  navigate (route: string[], options: any): Promise<any> {
    this.activeRoute = route || []
    return Promise.resolve(options || true)
  }
}
