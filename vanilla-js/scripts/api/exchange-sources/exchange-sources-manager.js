class RateSourcesManager {
  #rateSources = {};

  registerSource(name, source) {
    if (!name) {
      throw new Error('Source name cannot be null or empty');
    }
    this.#rateSources[name] = source;
  }

  async getRates(ratesSourceName) {
    const ratesSource = this.#rateSources[ratesSourceName];
    if (!ratesSource) {
      throw new Error(`Cannot find '${ratesSourceName}' rates source. Available sources: ${Object.getOwnPropertyNames(this.#rateSources).join(", ")}.`);
    }
    return ratesSource.getRates();
  }
}

const rateSourcesManager = new RateSourcesManager();

export { rateSourcesManager }
