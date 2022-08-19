<template>
  <div class="currency-rate-expression">
    <p class="currency-rate-expression__item" aria-label="Source rate">1</p>
    <p class="currency-rate-expression__item" aria-label="Source char code">{{ sourceCurrencyCharCode }}</p>
    <p class="currency-rate-expression__item">=</p>
    <p class="currency-rate-expression__item" aria-label="Target rate">{{ targetRate }}</p>
    <p class="currency-rate-expression__item" aria-label="Target char code">{{ targetCurrencyCharCode }}</p>
  </div>
</template>

<script>
export default {
  props: {
    sourceCurrencyCharCode: { type: String },
    targetRate: { type: Number },
    targetCurrencyCharCode: { type: String },
  },
};
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
