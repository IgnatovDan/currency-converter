import { render, screen, fireEvent } from '@testing-library/react';
import ConverterUI from './converter-ui';

describe('Source amount', () => {
  test('render', () => {
    render(<ConverterUI />);
    expect(screen.getByLabelText(/source amount/i)).toBeInTheDocument();
  });

  test('render value', () => {
    render(<ConverterUI amount={ 42 } />);
    expect(screen.getByLabelText(/source amount/i)).toHaveValue(42);
  });

  test('amountChanged event is thrown when amount was changed', () => {
    // let newValue;
    // render(<ConverterUI amount={ 42 } amountChanged={ (val) => newValue = val } />);
    // const input = screen.getByLabelText(/source amount/i);//.querySelectorAll('input1');
    // fireEvent.change(
    //   input,
    //   { target: { value: 43 } }
    // )
    // expect(newValue).toBe("43");
  });
});

describe('From', () => {
  test('render', () => {
    render(<ConverterUI />);
    expect(screen.getByLabelText(/from/i)).toBeInTheDocument();
  });

  test('value', () => {
    const availableCurrencies = [{ CharCode: 'code1', Name: 'Name1' }, { CharCode: 'code2', Name: 'Name2' }];
    render(<ConverterUI availableCurrencies={ availableCurrencies } sourceCurrencyCharCode={ 'code2' } />);
    expect(screen.getByLabelText(/from/i)).toHaveValue('code2');
  });
});

describe('Toggle currencies', () => {
  test('render', () => {
    render(<ConverterUI />);
    expect(screen.getByLabelText(/Toggle currencies/i)).toBeInTheDocument();
  });
});

describe('Into', () => {
  test('render', () => {
    render(<ConverterUI />);
    expect(screen.getByLabelText(/into/i)).toBeInTheDocument();
  });

  test('value', () => {
    const availableCurrencies = [{ CharCode: 'code1', Name: 'Name1' }, { CharCode: 'code2', Name: 'Name2' }];
    render(<ConverterUI availableCurrencies={ availableCurrencies } targetCurrencyCharCode={ 'code2' } />);
    expect(screen.getByLabelText(/into/i)).toHaveValue('code2');
  });
});

describe('Target amount', () => {
  test('render', () => {
    render(<ConverterUI />);
    expect(screen.getByLabelText(/target amount/i)).toBeInTheDocument();
  });

  test('value', () => {
    render(<ConverterUI targetAmount={ 42 } />);
    expect(screen.getByLabelText(/target amount/i).textContent).toBe('42');
  });
});

describe('Exchange rates source', () => {
  test('render', () => {
    render(<ConverterUI />);
    expect(screen.getByLabelText(/Exchange rates source/i)).toBeInTheDocument();
  });

  test('value', () => {
    const availableExchangeRateSources = [{ key: 1, caption: 'item1' }, { key: 2, caption: 'item2' }, { key: 3, caption: 'item3' }];
    render(<ConverterUI availableExchangeRateSources={ availableExchangeRateSources } exchangeRatesSourceKey={ 2 } />);
    expect(screen.getByLabelText(/Exchange rates source/i)).toHaveValue('2');
  });
});

describe('Currency rate expression', () => {
  test('render', () => {
    render(<ConverterUI />);
    expect(screen.getByLabelText(/Source rate/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Source char code/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Target rate/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Target char code/i)).toBeInTheDocument();
  });

  test('values', () => {
    render(<ConverterUI sourceCurrencyCharCode={ "USD" } targetRate={ 11 } targetCurrencyCharCode={ "RUB" } />);
    expect(screen.getByLabelText(/Source rate/i).textContent).toBe('1');
    expect(screen.getByLabelText(/Source char code/i).textContent).toBe('USD');
    expect(screen.getByLabelText(/Target rate/i).textContent).toBe('11');
    expect(screen.getByLabelText(/Target char code/i).textContent).toBe('RUB');
  });
});

describe('Warning message', () => {
  test('not render if empty', () => {
    render(<ConverterUI />);
    expect(screen.queryByLabelText(/Warning message/i)).toBeNull();
  });

  test('render', () => {
    render(<ConverterUI warningMessage={ 'msg1' } />);
    expect(screen.getByLabelText(/Warning message/i)).toBeInTheDocument();
  });

  test('value', () => {
    render(<ConverterUI warningMessage={ 'msg1' } />);
    expect(screen.getByLabelText(/Warning message/i).textContent).toBe('msg1');
  });
});
