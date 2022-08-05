<template>
  <div class="currency-rate-expression">
    <p class="currency-rate-expression__item">1</p>
    <p class="currency-rate-expression__item">{{ sourceCurrencyCharCode }}</p>
    <p class="currency-rate-expression__item">=</p>
    <p class="currency-rate-expression__item">{{ targetRate }}</p>
    <p class="currency-rate-expression__item">{{ targetCurrencyCharCode }}</p>
  </div>
</template>

<script>
export default {
  props: {
    sourceCurrencyCharCode: { type: String, required: true },
    targetRate: { type: Number, required: true },
    targetCurrencyCharCode: { type: String, required: true },
  }
}
</script>

<style>
.currency-rate-expression {
  margin-top: 20px;

  display: flex;
  justify-content: center;
  gap: 7px;

  font-style: normal;
  font-weight: 700;
  font-size: 20px;
}

.currency-rate-expression__item {
  /* reset browser styles */
  padding: 0;
  margin: 0;

  white-space: nowrap;
}
</style>
