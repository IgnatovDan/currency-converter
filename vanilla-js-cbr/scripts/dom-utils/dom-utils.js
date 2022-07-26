class DOMUtils {
  static SetSelectElementState(selector, dropDownModel, value, onChange) {
    const element = document.querySelector(selector);
    if (element) {
      element.textContent = '';
      dropDownModel?.forEach(item => {
        const option = document.createElement('option');
        option.value = item.value;
        option.text = item.text;
        element.appendChild(option);
      });

      element.value = value;
      element.onchange = onChange;
    }
  } 

  static SetNumberInputElementState(selector, value, onChange) {
    const element = document.querySelector(selector);
    if (element) {
      element.value = value;
      element.onchange = onChange;
    }
  }

  static SetElementText(selector, value) {
    const element = document.querySelector(selector);
    if (element) {
      element.innerText = value;
    }
  }
  
  static SetButtonElementState(selector, onClick) {
    const element = document.querySelector(selector);
    if (element) {
      element.onclick = onClick;
    }
  }
}
