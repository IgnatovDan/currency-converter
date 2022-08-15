import { useEffect, useState, useCallback } from 'react';
import rateSourcesManager from '../../api/exchange-sources/exchange-sources-manager.js';
import ConverterWithCalculator from '../converter-with-calculator/converter-with-calculator.js';

import { Currency } from '../../api/exchange-sources/exchange-rates-data-objects';

function ConverterWithRateSources({ classes }) {
  const [isLoading, setIsLoading] = useState(true);
  const [availableCurrencies, setAvailableCurrencies] = useState([]);
  const [exchangeRatesSourceKey, setExchangeRatesSourceKey] = useState('cbr'); // default rates source, pass in props
  const [warningMessage, setWarningMessage] = useState();
  const [availableExchangeRateSources] = useState(
    rateSourcesManager.getRegisteredSources().map(item => ({ key: item.key, caption: item.caption })));


  useEffect(
    () => {
      setWarningMessage(undefined);
      setIsLoading(true);
      const currentAbortController = {};
      rateSourcesManager.getRates(exchangeRatesSourceKey)
        .then(exchangeRates => {
          if (currentAbortController.aborted) {
            return;
          }
          setAvailableCurrencies(exchangeRates?.Items);
          if (exchangeRatesSourceKey === 'demo') {
            setWarningMessage('Демо данные'); // read this value from the current 'rates' object?
          }
          else {
            setWarningMessage(undefined);
          }
          setIsLoading(false);
        })
        .catch(error => {
          if (currentAbortController.aborted) {
            return;
          }
          setIsLoading(false);
          const demoDataMessageTemplate = "При получении данных о курсе обмена валют возникла ошибка и показаны демонстрационные данные";
          setWarningMessage(`${demoDataMessageTemplate} (${error})`);
          setAvailableCurrencies([Currency.RUB(), Currency.USD(), Currency.GBP()]);
        });
      return () => currentAbortController.aborted = true; /* cancellationToken */
    },
    [exchangeRatesSourceKey]
  );

  const exchangeRatesSourceKeyChanged = useCallback(value => {
    setExchangeRatesSourceKey(value);
  }, []);

  return (
    <ConverterWithCalculator
      classes={ classes }
      availableExchangeRateSources={ availableExchangeRateSources }
      isLoading={ isLoading }
      exchangeRatesSourceKey={ exchangeRatesSourceKey }
      availableCurrencies={ availableCurrencies }
      warningMessage={ warningMessage }
      exchangeRatesSourceKeyChanged={ exchangeRatesSourceKeyChanged }
      defaultSourceCurrencyCharCode={ Currency.USD().CharCode }
      defaultTargetCurrencyCharCode={ Currency.RUB().CharCode }
    />
  );

}

export default ConverterWithRateSources;
