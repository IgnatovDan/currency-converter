import './rate-expression.css';
import './__item/rate-expression__item.css';

function RateExpression(props) {
  return (
    <div className="rate-expression">
      <p className="rate-expression__item">1</p>
      <p className="rate-expression__item">{ props.sourceRateCharCode ?? 'USD' }</p>
      <p className="rate-expression__item">=</p>
      <p className="rate-expression__item">{ props.targetRateValue ?? '1' }</p>
      <p className="rate-expression__item">{ props.targetRateCharCode ?? 'USD' }</p>
    </div>
  );
}

export default RateExpression;
