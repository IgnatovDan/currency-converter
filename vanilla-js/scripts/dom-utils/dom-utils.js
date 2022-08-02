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

  static SetNumberInputElementState(selector, value, onInput) {
    const element = document.querySelector(selector);
    if (element) {
      element.value = value;
      element.oninput = onInput;
    }
  }

  static SetElementText(selector, value) {
    const element = document.querySelector(selector);
    if (element) {
      element.innerText = value;
    }
  }

  static ToggleElementClass(selector, className, toggler) {
    const element = document.querySelector(selector);
    if (element) {
      element.classList.toggle(className, toggler);
    }
  }

  static SetButtonElementState(selector, onClick) {
    const element = document.querySelector(selector);
    if (element) {
      element.onclick = onClick;
    }
  }

  static SetFormState(selector, onSubmit) {
    const element = document.querySelector(selector);
    if (element) {
      element.onsubmit = onSubmit;
    }
  }
}

export { DOMUtils }
