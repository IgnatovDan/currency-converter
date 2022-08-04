class Currency {
  #name;
  #charCode;
  #value;

  constructor(name, charCode, value) {
    this.#name = name; // 'String', human readable name
    this.#charCode = charCode; // 'String', code
    this.#value = value; // 'Number' TODO: force convert to number
  }

  get Name() { return this.#name; }
  get CharCode() { return this.#charCode; }
  get Value() { return this.#value; }

  static RUB() { return new Currency("Российский рубль", "RUB", 1); }
  static USD() { return new Currency("Доллар США", "USD", 60.2198); }
  static GBP() { return new Currency("Фунт стерлингов Соединенного королевства", "GBP", 72.5287); }
}

class ExchangeRates {
  #date;
  #items;
  constructor(date, items) {
    this.#date = date;
    this.#items = items;
  }
  get Date() { return this.#date; }
  get Items() { return this.#items; }
}

export { ExchangeRates, Currency }
