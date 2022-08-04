import { Currency } from "../../api/exchange-sources/exchange-rates-data-objects";

export function convertCurrenciesToSelectListItems(currencies) {
  const RUB = Currency.RUB().CharCode;
  return (currencies || [])
    .map(item => ({ value: item.CharCode, text: item.Name + ` (${item.CharCode})` }))
    .sort((a, b) => {
      if (a.value === RUB) {
        return -1;
      }
      else if (b.value === RUB) {
        return 1;
      }

      return ((a.text > b.text) ? 1 : -1);
    });
}
