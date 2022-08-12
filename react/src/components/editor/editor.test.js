import { useCallback, useState } from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Editor from './editor';

describe("input", () => {
  test('render without params', async () => {
    render(<Editor />);
    expect(screen.getByRole('textbox')).not.toBeNull();
  });

  test('render with value={ 42 } type="number" required step="0.01"', async () => {
    render(<Editor type="number" value={ 42 } required step="0.01" onChange={ () => { } } />);
    const spin = screen.getByRole('spinbutton');
    expect(spin).not.toBeNull();
    expect(spin).toHaveAttribute('required');
    expect(spin).toHaveAttribute('step', '0.01');
    expect(spin).toHaveValue(42);
  });

  test('change value', async () => {
    let newValue = 0;
    render(<Editor type="number" value={ 42 } onChange={ (e) => newValue = e.target.value } />);
    const spin = screen.getByRole('spinbutton');
    expect(spin).toHaveValue(42);
    fireEvent.change(spin, { target: { value: 2 } })
    expect(newValue).toBe("2");

    // Memoize other approaches:
    //await act(async () => {
    //  fireEvent.change(spin, { target: { value: 2 } })
    //})
    // userEvent.type(spin, 1);
    // userEvent.clear(spin);
    // userEvent.type(spin, '1');
    // userEvent.click(screen.getByRole("button"));
    // fireEvent.change(spin, {target: {value: '23'}}) // https://testing-library.com/docs/example-input-event/
    //expect(spin).toHaveValue(1);
  });
});

describe("combobox", () => {
  test('render tagName="select"', async () => {
    render(<Editor tagName="select" />);
    expect(screen.getByRole('combobox')).not.toBeNull();
  });

  test('render with required', async () => {
    render(<Editor tagName="select" required />);
    expect(screen.getByRole('combobox')).toHaveAttribute('required');
  });

  test('display value and listItems', async () => {
    const items = [
      { value: 'value1', text: 'text1' },
      { value: 'value2', text: 'text2' }
    ];
    render(<Editor tagName="select" listItems={ items } value="value2" onChange={ () => { } } />);

    const comboboxes = screen.getAllByRole('combobox');
    expect(comboboxes).toHaveLength(1);
    expect(comboboxes[0]).toHaveValue('value2');

    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(2);

    const option1 = screen.getByRole('option', { name: 'text1' });
    expect(option1.selected).toBe(false)
    expect(option1.value).toBe('value1');
    expect(option1.text).toBe('text1');

    const option2 = screen.getByRole('option', { name: 'text2' });
    expect(option2.selected).toBe(true)
    expect(option2.value).toBe('value2');
    expect(option2.text).toBe('text2');
  });

  test('change value', async () => {

    const items = [
      { value: 'value1', text: 'text1' },
      { value: 'value2', text: 'text2' },
      { value: 'value3', text: 'text3' },
    ];
    let newValue = '';
    render(
      <Editor
        tagName="select"
        listItems={ items }
        value={ 'value2' }
        onChange={ e => newValue = e.target.value } />
    );

    expect(screen.getByRole('combobox')).toHaveValue('value2');

    await userEvent.selectOptions(
      screen.getByRole('combobox'),
      screen.getByRole('option', { name: 'text3' })
    );

    expect(newValue).toBe('value3');
  });

  test('change value with wrapper', async () => {
    // https://github.com/testing-library/user-event/issues/549
    function EditorWrapper({ defaultValue, ...rest }) {
      const [value, setValue] = useState(defaultValue);
      const onChange = useCallback((event) => setValue(event.target.value), [setValue]);
      return <Editor onChange={ onChange } value={ value } { ...rest } />
    }

    const items = [
      { value: 'value1', text: 'text1' },
      { value: 'value2', text: 'text2' },
      { value: 'value3', text: 'text3' },
    ];
    render(<EditorWrapper tagName="select" listItems={ items } defaultValue={ 'value2' } />);

    expect(screen.getByRole('combobox')).toHaveValue('value2');

    await userEvent.selectOptions(
      screen.getByRole('combobox'),
      screen.getByRole('option', { name: 'text3' })
    );

    expect(screen.getByRole('combobox')).toHaveValue('value3');
  });
});
