class DOMUtils {
  static SetSelectElementState(selector, dropDownModel, value) {
    const selectEl = document.querySelector(selector);
    if (selectEl) {
      selectEl.textContent = '';
      dropDownModel?.forEach(item => {
        const option = document.createElement('option');
        option.value = item.value;
        option.text = item.text;
        selectEl.appendChild(option);
      });

      selectEl.value = value;
    }
  } 

  static SetNumberInputElementState(selector, value, onChange) {
    const inputEl = document.querySelector(selector);
    if (inputEl) {
      inputEl.value = value;
      inputEl.onchange = onChange;
    }
  }

  static SetElementText(selector, value) {
    const el = document.querySelector(selector);
    if (el) {
      el.innerText = value;
    }
  }
  
}
