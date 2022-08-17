import { render, screen } from '@testing-library/vue';
import CurrencyRateExpression from './currency-rate-expression.vue';

test('render values', () => {
  render(<CurrencyRateExpression
    sourceCurrencyCharCode={ 'code1' }
    targetRate={ 1234 }
    targetCurrencyCharCode={ 'code2' } />);

  expect(screen.getByLabelText(/Source rate/i)).toHaveTextContent('1');
  expect(screen.getByLabelText(/Source currency char code/i)).toHaveTextContent('code1');
  expect(screen.getByLabelText(/Target rate/i)).toHaveTextContent('1234');
  expect(screen.getByLabelText(/Target currency char code/i)).toHaveTextContent('code2');
});
