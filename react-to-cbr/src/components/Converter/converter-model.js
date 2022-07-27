export class Currency {
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
  static RUB() {
    return new Currency("Российский рубль", "RUB", 1);
  }
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

function HandleValueNumberToZero(value) {
  if (Number.isNaN(value) || value === Infinity || value === undefined || value === null) {
    return 0;
  }
  return value;
}

export class ConverterModel {
  availableCurrencies;
  amount;
  sourceCurrencyValue = null;
  sourceCurrencyCharCode = null;
  targetCurrencyValue = null;
  targetCurrencyCharCode = null;
  targetAmount = null;
  targetRate = null;

  constructor() {
    this.amount = 42;
    this.targetAmount = this.amount;
    this.availableCurrencies = [Currency.RUB(), new Currency('asdfasdfsadf', 'asd', 10)];
    this.sourceCurrencyCharCode = this.availableCurrencies[0].CharCode;
    this.sourceCurrencyValue = this.availableCurrencies[0].Value;
    this.targetCurrencyCharCode = this.availableCurrencies[0].CharCode;
    this.targetCurrencyValue = this.availableCurrencies[0].Value;
    ConverterModel.#refreshTargetAmount(this);
    ConverterModel.#refreshTargetRate(this);
  }

  static Reduce(sourceState, newState, refreshCallback) {
    const result = new ConverterModel();
    Object.assign(result, sourceState, newState);
    refreshCallback?.(result);
    return result;
  }

  static #refreshTargetAmount(model) {
    const safeValue = HandleValueNumberToZero(model.amount * model.sourceCurrencyValue / model.targetCurrencyValue);
    model.targetAmount =
      Math.round((safeValue + Number.EPSILON) * 100) / 100;
  }

  static #refreshTargetRate(model) {
    const safeValue = HandleValueNumberToZero(model.sourceCurrencyValue / model.targetCurrencyValue)
    model.targetRate = Math.round((safeValue + Number.EPSILON) * 10000) / 10000;
  }

  static setAvailableCurrencies(model, currencies) {
    return (model.availableCurrencies === currencies) ? model : ConverterModel.Reduce(model, { availableCurrencies: currencies });
  }

  static setAmount(model, amount) {
    const newValue = HandleValueNumberToZero(amount);
    return (model.amount === newValue) ? model : ConverterModel.Reduce(model, { amount: newValue }, ConverterModel.#refreshTargetAmount);
  }

  static setTargetCurrencyCharCode(model, newValue) {
    const newCurrency = model.availableCurrencies?.find(item => item.CharCode === newValue);
    if (!newCurrency || model.targetCurrencyCharCode === newValue) {
      return model;
    } else {
      return ConverterModel.Reduce(
        model,
        { targetCurrencyCharCode: newValue, targetCurrencyValue: newCurrency.Value },
        (model) => {
          ConverterModel.#refreshTargetAmount(model);
          ConverterModel.#refreshTargetRate(model);
        }
      );
    }
  }

  static setSourceCurrencyCharCode(model, newValue) {
    const newCurrency = model.availableCurrencies?.find(item => item.CharCode === newValue);
    if (!newCurrency || model.sourceCurrencyCharCode === newValue) {
      return model;
    } else {
      return ConverterModel.Reduce(
        model,
        { sourceCurrencyCharCode: newValue, sourceCurrencyValue: newCurrency.Value },
        (model) => {
          ConverterModel.#refreshTargetAmount(model);
          ConverterModel.#refreshTargetRate(model);
        }
      );
    }
  }
}
