import './rate-expression.css';
import './__item/rate-expression__item.css';

export default function RateExpression(props) {
  return (
    <div class="rate-expression">
      <p class="rate-expression__item">1</p>
      <p class="rate-expression__item">{ props.sourceRateCharCode ?? 'USD'}</p>
      <p class="rate-expression__item">=</p>
      <p class="rate-expression__item">{ props.targetRateValue ?? '1'}</p>
      <p class="rate-expression__item">{ props.targetRateCharCode ?? 'USD'}</p>
    </div>
  );
}
