function convertCurrenciesToSelectElementOptions(currencies) {
  return currencies?.map(item => ({ value: item.CharCode, text: item.Name + `(${item.CharCode})` }))
}
