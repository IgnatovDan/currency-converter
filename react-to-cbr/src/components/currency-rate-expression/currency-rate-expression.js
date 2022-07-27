import './currency-rate-expression.css';
import './__item/currency-rate-expression__item.css';

function CurrencyRateExpression({ sourceCurrencyCharCode, targetRate, targetCurrencyCharCode }) {
  return (
    <div className="currency-rate-expression">
      <p className="currency-rate-expression__item">1</p>
      <p className="currency-rate-expression__item">{ sourceCurrencyCharCode ?? 'USD' }</p>
      <p className="currency-rate-expression__item">=</p>
      <p className="currency-rate-expression__item">{ targetRate ?? '1' }</p>
      <p className="currency-rate-expression__item">{ targetCurrencyCharCode ?? 'USD' }</p>
    </div>
  );
}

export default CurrencyRateExpression;
