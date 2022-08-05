class RateSourcesManager {
  #rateSources = {};

  registerSource(key, source, caption) {
    if (!key) {
      throw new Error('Source name cannot be null or empty');
    }
    this.#rateSources[key] = { source, caption };
  }

  getRegisteredSources() {
    return Object.getOwnPropertyNames(this.#rateSources).map(
      propertyName => ({ key: propertyName, caption: this.#rateSources[propertyName].caption })
    );
  }

  async getRates(ratesSourceKey) {
    const ratesSource = this.#rateSources[ratesSourceKey].source;
    if (!ratesSource) {
      throw new Error(`Cannot find '${ratesSourceKey}' rates source. Available sources: ${Object.getOwnPropertyNames(this.#rateSources).join(", ")}.`);
    }
    return ratesSource.getRates();
  }
}

const rateSourcesManager = new RateSourcesManager();

export default rateSourcesManager;
