import { render, screen, fireEvent } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import UiEditor from './ui-editor.vue';

describe('type = spinbutton', () => {
  test('render', async () => {
    render(<UiEditor />);
    expect(screen.queryAllByRole(/spinbutton/i)).toHaveLength(1);
  });

  test('render with editorType:spinbutton', async () => {
    render(<UiEditor editorType="spinbutton" />);
    expect(screen.queryAllByRole(/spinbutton/i)).toHaveLength(1);
  });

  test('render modelValue={ 42 }', async () => {
    render(<UiEditor modelValue={ 42 } />);
    expect(screen.getByRole(/spinbutton/i)).toHaveValue(42);
  });

  test('render required', async () => {
    render(<UiEditor required />);
    expect(screen.getByRole(/spinbutton/i)).toHaveAttribute('required');
  });

  test('render step=0.01', async () => {
    render(<UiEditor step={ 0.01 } />);
    expect(screen.getByRole(/spinbutton/i)).toHaveAttribute('step', '0.01');
  });

  test('update:modelValue is called when input value is changed', async () => {
    const user = userEvent.setup();
    const { emitted } = render(<UiEditor modelValue="0" />);

    await user.type(screen.getByRole(/spinbutton/i), '5');
    //Or: await fireEvent.update(screen.getByRole(/spinbutton/i), 42);

    expect(screen.getByRole(/spinbutton/i)).toHaveValue(5);
    expect(emitted('update:modelValue').length).toBe(1);
    expect(emitted('update:modelValue')[0][0]).toBe(5);
  });

});

describe('with editorType:combobox', () => {
  test('render', async () => {
    render(<UiEditor editorType="combobox" />);
    expect(screen.queryAllByRole(/combobox/i)).toHaveLength(1);
  });

  test('render with required', async () => {
    render(<UiEditor editorType="combobox" required />);
    expect(screen.getByRole(/combobox/i)).toHaveAttribute('required');
  });

  test('render value and items', async () => {
    const items = [
      { value: 'value1', text: 'text1' },
      { value: 'value2', text: 'text2' }
    ];
    render(<UiEditor editorType="combobox" listItems={ items } modelValue="value2" />);

    expect(screen.getByRole('combobox')).toHaveValue('value2');
    expect(screen.getAllByRole('option')).toHaveLength(2);

    const option1 = screen.getByRole('option', { name: 'text1' });
    expect(option1.selected).toBe(false)
    expect(option1.value).toBe('value1');
    expect(option1.text).toBe('text1');

    const option2 = screen.getByRole('option', { name: 'text2' });
    expect(option2.selected).toBe(true)
    expect(option2.value).toBe('value2');
    expect(option2.text).toBe('text2');
  });

  test('update:modelValue is called when selected item is changed', async () => {
    const user = userEvent.setup();
    const items = [
      { value: 'value1', text: 'text1' },
      { value: 'value2', text: 'text2' },
      { value: 'value3', text: 'text3' },
    ];
    const { emitted } = render(<UiEditor editorType="combobox" listItems={ items } modelValue="value2" />);

    await user.selectOptions(screen.getByRole(/combobox/i), 'value3');
    // Or:
    // await userEvent.selectOptions(
    //   screen.getByRole(/combobox/i),
    //   screen.getByRole(/option/i, { name: 'text3' })
    // );

    expect(emitted('update:modelValue').length).toBe(1);
    expect(emitted('update:modelValue')[0][0]).toBe('value3');
  });

});
