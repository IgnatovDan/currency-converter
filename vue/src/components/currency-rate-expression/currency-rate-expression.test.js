import { render, screen } from '@testing-library/vue';
import CurrencyRateExpression from './currency-rate-expression.vue';

test('render values', () => {
  render(<CurrencyRateExpression
    sourceCurrencyCharCode={ 'source code' }
    targetRate={ 1234 }
    targetCurrencyCharCode={ 'target code' } />);
  
  const sourceCodeElement = screen.getByText(/source code/i);
  expect(sourceCodeElement).toBeInTheDocument();

  const targetRateElement = screen.getByText(/1234/);
  expect(targetRateElement).toBeInTheDocument();

  const targetCodeElement = screen.getByText(/target code/i);
  expect(targetCodeElement).toBeInTheDocument();
});
