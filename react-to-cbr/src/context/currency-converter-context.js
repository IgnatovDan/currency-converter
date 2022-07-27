import { createContext } from "react";

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
  if (Number.isNaN(value) || value === Infinity|| value === undefined || value === null) {
    return 0;
  }
  return value;
}

export class ConverterModel {
  availableCurrencies = //null;
    [Currency.RUB(), new Currency('asdfasdfsadf', 'asd', 10)];
  amount = 42;
  sourceCurrencyValue = null;
  sourceCurrencyCharCode = null;
  targetCurrencyValue = null;
  targetCurrencyCharCode = null;
  targetAmount = 0;
  targetRate = 0;

  constructor(sourceState, newState, refreshCallback) {
    Object.assign(this, sourceState, newState);
    refreshCallback?.(this);
  }

  static #refreshTargetAmount(state) {
    const safeValue = HandleValueNumberToZero(state.amount * state.sourceCurrencyValue / state.targetCurrencyValue);
    state.targetAmount =
      Math.round((safeValue + Number.EPSILON) * 100) / 100;
  }

  static #refreshTargetRate(state) {
    const safeValue = HandleValueNumberToZero(state.sourceCurrencyValue / state.targetCurrencyValue)    
    state.targetRate = Math.round((safeValue + Number.EPSILON) * 10000) / 10000;
  }

  static setAvailableCurrencies(state, currencies) {
    return (state.availableCurrencies === currencies) ? state : new ConverterModel(state, { availableCurrencies: currencies });
  }

  static setAmount(state, amount) {
    const newValue = HandleValueNumberToZero(amount);
    return (state.amount === newValue) ? state : new ConverterModel(state, { amount: newValue }, ConverterModel.#refreshTargetAmount);
  }

  static setTargetCurrencyCharCode(state, newValue) {
    const newCurrency = state.availableCurrencies?.find(item => item.CharCode === newValue);
    if (!newCurrency || state.targetCurrencyCharCode === newValue) {
      return state;
    } else {
      return new ConverterModel(
        state,
        { targetCurrencyCharCode: newValue, targetCurrencyValue: newCurrency.Value },
        (state) => {
          ConverterModel.#refreshTargetAmount(state);
          ConverterModel.#refreshTargetRate(state);
        }
      );
    }
  }

  static setSourceCurrencyCharCode(state, newValue) {
    const newCurrency = state.availableCurrencies?.find(item => item.CharCode === newValue);
    if (!newCurrency || state.sourceCurrencyCharCode !== newValue) {
      return state;
    } else {
      return new ConverterModel(
        state,
        { sourceCurrencyCharCode: newValue, sourceCurrencyValue: newCurrency.Value },
        ConverterModel.#refreshTargetAmount
      );
    }
  }
}

export const CurrencyConverterContext = createContext(new ConverterModel());
