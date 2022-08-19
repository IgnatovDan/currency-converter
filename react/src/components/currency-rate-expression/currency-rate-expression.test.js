import { render, screen } from '@testing-library/react';
import CurrencyRateExpression from './currency-rate-expression';

test('render param values', () => {
  render(<CurrencyRateExpression
    sourceCurrencyCharCode={ 'code1' }
    targetRate={ 1234 }
    targetCurrencyCharCode={ 'code2' } />);

  expect(screen.getByLabelText(/Source rate/i).textContent).toBe('1');
  expect(screen.getByLabelText(/Source char code/i).textContent).toBe('code1');
  expect(screen.getByLabelText(/Target rate/i).textContent).toBe('1234');
  expect(screen.getByLabelText(/Target char code/i).textContent).toBe('code2');
});
