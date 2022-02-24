class Manager {
  /**
   * Application's token
   */
  token: string;

  constructor(token: string) {
    this.token = token;
  }
  /**
   * Translate an object into query string for GET requests
   * @param options - Object of options
   * @returns Query string
   */
  protected optionsToQueryStringParams(options: object): string {
    let params = '?';
    const paramsArray = [];
    for (const t of Object.entries(options)) {
      paramsArray.push(`${t[0]}=${t[1]}`);
    }
    params += paramsArray.join('&');
    return params;
  }
}

export { Manager };
