export class Currency {
  constructor(name, charCode, value) {
    this.Name = name; // 'String', human readable name
    this.CharCode = charCode; // 'String', code
    this.Value = value; // 'Number' TODO: force convert to number
  }

  /*
  Error occurs if private fields are used:
  webpack://vue/node_modules/@babel/runtime/helpers/esm/classExtractFieldDescriptor.js?17ff
  classExtractFieldDescriptor.js?17ff:3 Uncaught TypeError: attempted to get private field on non-instance
    at _classExtractFieldDescriptor (classExtractFieldDescriptor.js?17ff:3:1)
    at _classPrivateFieldGet (classPrivateFieldGet.js?e6ae:4:1)
    at get CharCode (exchange-rates-data-objects.js?2465:13:1)
  */
  // get Name() { return this.#name; }
  // get CharCode() { return this.#charCode; }
  // get Value() { return this.#value; }

  static RUB() { return new Currency("Российский рубль", "RUB", 1); }
  static USD() { return new Currency("Доллар США", "USD", 60.2198); }
  static GBP() { return new Currency("Фунт стерлингов Соединенного королевства", "GBP", 72.5287); }
}

export class ExchangeRates {
  #date;
  #items;
  constructor(date, items) {
    this.#date = date;
    this.#items = items;
  }
  get Date() { return this.#date; }
  get Items() { return this.#items; }
}
