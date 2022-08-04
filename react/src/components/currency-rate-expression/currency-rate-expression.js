import styles from './currency-rate-expression.module.css';
import styles__item from './__item/currency-rate-expression__item.module.css';

function CurrencyRateExpression({ sourceCurrencyCharCode, targetRate, targetCurrencyCharCode }) {
  return (
    <div className={ styles.s }>
      <p className={ styles__item.s }>1</p>
      <p className={ styles__item.s }>{ sourceCurrencyCharCode ?? 'USD' }</p>
      <p className={ styles__item.s }>=</p>
      <p className={ styles__item.s }>{ targetRate ?? '1' }</p>
      <p className={ styles__item.s }>{ targetCurrencyCharCode ?? 'RUB' }</p>
    </div>
  );
}

export default CurrencyRateExpression;
