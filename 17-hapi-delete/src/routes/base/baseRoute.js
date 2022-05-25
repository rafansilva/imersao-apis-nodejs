export class BaseRoute {
  static methods() {
    return Object.getOwnPropertyNames(this.prototype)
      .filter(method => method !== 'constructor' && method !== 'methods' && !method.startsWith('_'));
  }
}