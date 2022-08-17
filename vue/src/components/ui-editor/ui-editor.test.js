import { render, screen, fireEvent } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import UiEditor from './ui-editor.vue';

describe('type = spinbutton', () => {
  test('render', async () => {
    render(UiEditor);
    expect(screen.queryAllByRole(/spinbutton/i)).toHaveLength(1);
  });

  test('render with editorType:spinbutton', async () => {
    render(UiEditor, { props: { editorType: 'spinbutton' } });
    expect(screen.queryAllByRole(/spinbutton/i)).toHaveLength(1);
  });

  test('render modelValue={ 42 }', async () => {
    render(UiEditor, { props: { 'modelValue': '42' } });
    expect(screen.getByRole(/spinbutton/i)).toHaveValue(42);
  });

  test('render required', async () => {
    render(UiEditor, { props: { required: true } });
    expect(screen.getByRole(/spinbutton/i)).toHaveAttribute('required');
  });

  test('render step=0.01', async () => {
    render(UiEditor, { props: { step: 0.01 } });
    expect(screen.getByRole(/spinbutton/i)).toHaveAttribute('step', '0.01');
  });

  test('update:modelValue is called when input value is changed', async () => {
    const { emitted } = render(UiEditor, { props: { 'modelValue': 1 } });

    await fireEvent.update(screen.getByRole(/spinbutton/i), 42);

    expect(screen.getByRole(/spinbutton/i)).toHaveValue(42);
    expect(emitted('update:modelValue').length).toBe(1);
    expect(emitted('update:modelValue')[0][0]).toBe('42');
  });

});

describe('with editorType:combobox', () => {
  test('render', async () => {
    render(UiEditor, { props: { editorType: 'combobox' } });
    expect(screen.queryAllByRole(/combobox/i)).toHaveLength(1);
  });

  test('render with required', async () => {
    render(UiEditor, { props: { editorType: 'combobox', required: true } });
    expect(screen.getByRole(/combobox/i)).toHaveAttribute('required');
  });

  test('render value and items', async () => {
    const items = [
      { value: 'value1', text: 'text1' },
      { value: 'value2', text: 'text2' }
    ];
    render(UiEditor, { props: { editorType: 'combobox', listItems: items, value: 'value2' } });

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

  //   // test('value not in items', async () => {
  //   //   const items = [
  //   //     { value: 'value1', text: 'text1' },
  //   //     { value: 'value2', text: 'text2' }
  //   //   ];
  //   //   render(<Editor tagName="select" listItems={ items } value="value-not-exist" onChange={ () => { } } />);

  //   //   expect(screen.getByRole('combobox')).toHaveValue('value1');
  //   // });

  //   // test('value not in items with default value', async () => {
  //   //   const items = [
  //   //     { value: 'value1', text: 'text1' },
  //   //     { value: 'value2', text: 'text2' },
  //   //     { value: 'value3', text: 'text3' }
  //   //   ];
  //   //   render(<Editor tagName="select" listItems={ items } value="value-not-exist" onChange={ () => { } } defaultValue={ 'value2' } />);

  //   //   expect(screen.getByRole('combobox')).toHaveValue('value2');
  //   // });

  //   test('onChange is called when selected item is changed', async () => {
  //     const items = [
  //       { value: 'value1', text: 'text1' },
  //       { value: 'value2', text: 'text2' },
  //       { value: 'value3', text: 'text3' },
  //     ];
  //     let newValue = '';
  //     render(
  //       <UiEditor tagName="select" listItems={ items } value={ 'value2' }
  //         onChange={ e => newValue = e.target.value }
  //       />
  //     );

  //     expect(screen.getByRole('combobox')).toHaveValue('value2');

  //     await userEvent.selectOptions(
  //       screen.getByRole('combobox'),
  //       screen.getByRole('option', { name: 'text3' })
  //     );

  //     expect(newValue).toBe('value3');
  //   });

});
