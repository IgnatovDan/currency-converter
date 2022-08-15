import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ConverterUI from './converter-ui';

describe('Source amount', () => {
  const labelMatch = /source amount/i;
  test('render', () => {
    render(<ConverterUI />);
    expect(screen.getByLabelText(labelMatch)).toBeInTheDocument();
  });

  test('render value', () => {
    render(<ConverterUI amount={ 42 } />);
    expect(screen.getByLabelText(labelMatch)).toHaveValue(42);
  });

  test('amountChanged callback is called when amount was changed', async () => {
    const user = userEvent.setup()
    let counter = jest.fn();
    render(<ConverterUI amountChanged={ counter } />);

    await user.type(screen.getByLabelText(labelMatch), '23');

    expect(counter).toHaveBeenLastCalledWith(23);
  });
});

describe('From', () => {
  test('render', () => {
    render(<ConverterUI />);
    expect(screen.getByLabelText(/from/i)).toBeInTheDocument();
  });

  test('render value', () => {
    const availableCurrencies = [{ CharCode: 'code1', Name: 'Name1' }, { CharCode: 'code2', Name: 'Name2' }];
    render(<ConverterUI availableCurrencies={ availableCurrencies } sourceCurrencyCharCode={ 'code2' } />);

    expect(screen.getByLabelText(/from/i)).toHaveValue('code2');
  });

  test('sourceCurrencyCharCodeChanged callback is called when source currency was changed', async () => {
    const availableCurrencies = [
      { CharCode: 'code1', Name: 'Name1' },
      { CharCode: 'code2', Name: 'Name2' },
      { CharCode: 'code3', Name: 'Name3' }
    ];
    const user = userEvent.setup()
    let counter = jest.fn();
   
    render(<ConverterUI
      sourceCurrencyCharCodeChanged={ counter }
      availableCurrencies={ availableCurrencies }
      sourceCurrencyCharCode={ 'code2' } />);
    
    await user.selectOptions(screen.getByLabelText(/from/i), 'code3');

    expect(counter).toHaveBeenLastCalledWith('code3');
  });
});

describe('Toggle currencies', () => {
  test('render', () => {
    render(<ConverterUI />);
    expect(screen.getByRole('button', { name: /Toggle currencies/i })).toBeInTheDocument();
  });

  test('click calls sourceCurrencyCharCodeChanged and targetCurrencyCharCodeChanged', async () => {
    const user = userEvent.setup()
    let counterSource = jest.fn();
    let counterTarget = jest.fn();
    const availableCurrencies = [{ CharCode: 'code1', Name: 'Name1' }, { CharCode: 'code2', Name: 'Name2' }];

    render(<ConverterUI
      availableCurrencies={ availableCurrencies }
      sourceCurrencyCharCode={ 'code1' }
      sourceCurrencyCharCodeChanged={ counterSource }
      targetCurrencyCharCode={ 'code2' }
      targetCurrencyCharCodeChanged={ counterTarget } />
    );

    await user.click(screen.getByRole('button', { name: /Toggle currencies/i }));

    expect(counterSource).toHaveBeenCalledTimes(1);
    expect(counterSource).toHaveBeenCalledWith('code2');

    expect(counterTarget).toHaveBeenCalledTimes(1);
    expect(counterTarget).toHaveBeenCalledWith('code1');
  });
});

describe('Into', () => {
  test('render', () => {
    render(<ConverterUI />);
    expect(screen.getByLabelText(/into/i)).toBeInTheDocument();
  });

  test('show value', () => {
    const availableCurrencies = [{ CharCode: 'code1', Name: 'Name1' }, { CharCode: 'code2', Name: 'Name2' }];
    render(<ConverterUI availableCurrencies={ availableCurrencies } targetCurrencyCharCode={ 'code2' } />);
    expect(screen.getByLabelText(/into/i)).toHaveValue('code2');
  });

  test('targetCurrencyCharCodeChanged callback is called when target currency was changed', async () => {
    const availableCurrencies = [
      { CharCode: 'code1', Name: 'Name1' },
      { CharCode: 'code2', Name: 'Name2' },
      { CharCode: 'code3', Name: 'Name3' }
    ];
    const user = userEvent.setup()
    let counter = jest.fn();
   
    render(<ConverterUI
      targetCurrencyCharCodeChanged={ counter }
      availableCurrencies={ availableCurrencies }
      targetCurrencyCharCode={ 'code2' } />);
    
    await user.selectOptions(screen.getByLabelText(/into/i), 'code3');

    expect(counter).toHaveBeenLastCalledWith('code3');
  });

});

describe('Target amount', () => {
  test('render', () => {
    render(<ConverterUI />);
    expect(screen.getByLabelText(/target amount/i)).toBeInTheDocument();
  });

  test('show value', () => {
    render(<ConverterUI targetAmount={ 42 } />);
    expect(screen.getByLabelText(/target amount/i).textContent).toBe('42');
  });
});

describe('Exchange rates source', () => {
  test('render', () => {
    render(<ConverterUI />);
    expect(screen.getByLabelText(/Exchange rates source/i)).toBeInTheDocument();
  });

  test('show value', () => {
    const availableExchangeRateSources = [{ key: 1, caption: 'item1' }, { key: 2, caption: 'item2' }, { key: 3, caption: 'item3' }];
    render(<ConverterUI availableExchangeRateSources={ availableExchangeRateSources } exchangeRatesSourceKey={ 2 } />);
    expect(screen.getByLabelText(/Exchange rates source/i)).toHaveValue('2');
  });

  test('exchangeRatesSourceKeyChanged callback is called when target rates source was changed', async () => {
    const availableExchangeRateSources = [
      { key: 1, caption: 'item1' },
      { key: 2, caption: 'item2' },
      { key: 3, caption: 'item3' }
    ];
    const user = userEvent.setup()
    let counter = jest.fn();
   
    render(<ConverterUI
      exchangeRatesSourceKeyChanged={ counter }
      availableExchangeRateSources={ availableExchangeRateSources }
      exchangeRatesSourceKey={ 2 } />);
    
    await user.selectOptions(screen.getByLabelText(/Exchange rates source/i), '3');

    expect(counter).toHaveBeenLastCalledWith('3');
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

  test('show values', () => {
    render(<ConverterUI sourceCurrencyCharCode={ "USD" } targetRate={ 11 } targetCurrencyCharCode={ "RUB" } />);
    expect(screen.getByLabelText(/Source rate/i).textContent).toBe('1');
    expect(screen.getByLabelText(/Source char code/i).textContent).toBe('USD');
    expect(screen.getByLabelText(/Target rate/i).textContent).toBe('11');
    expect(screen.getByLabelText(/Target char code/i).textContent).toBe('RUB');
  });
});

describe('Warning message', () => {
  test('render if not empty', () => {
    render(<ConverterUI warningMessage={ 'msg1' } />);
    expect(screen.getByLabelText(/Warning message/i).textContent).toBe('msg1');
  });

  test('not render if empty', () => {
    render(<ConverterUI />);
    expect(screen.queryByLabelText(/Warning message/i)).toBeNull();
  });
});

describe('Loading panel', () => {
  test('render if loading', () => {
    render(<ConverterUI isLoading={ true } />);
    expect(screen.getByTestId(/loading-panel/i)).toBeInTheDocument();
  });

  test('not render if loaded', () => {
    render(<ConverterUI isLoading={ false } />);
    expect(screen.queryByTestId(/loading-panel/i)).toBeNull();
  });
});
