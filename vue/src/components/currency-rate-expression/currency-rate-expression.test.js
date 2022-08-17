import { render, screen } from '@testing-library/vue';
import CurrencyRateExpression from './currency-rate-expression.vue';

test('render values', () => {
  render(<CurrencyRateExpression
    sourceCurrencyCharCode={ 'source code' }
    targetRate={ 'target rate' }
    targetCurrencyCharCode={ 'target code' } />);
  
  const sourceCodeElement = screen.getByText(/source code/i);
  expect(sourceCodeElement).toBeInTheDocument();

  const targetRateElement = screen.getByText(/target rate/i);
  expect(targetRateElement).toBeInTheDocument();

  const targetCodeElement = screen.getByText(/target code/i);
  expect(targetCodeElement).toBeInTheDocument();
});
