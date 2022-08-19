import { useCallback, useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Editor from './editor';

describe('type = number', () => {
  test('render', async () => {
    render(<Editor type="number" />);
    expect(screen.queryAllByRole('spinbutton')).toHaveLength(1);
  });

  test('render value={ 42 }', async () => {
    render(<Editor type="number" value={ 42 } onChange={ () => { } } />);
    expect(screen.getByRole('spinbutton')).toHaveValue(42);
  });

  test('render required', async () => {
    render(<Editor type="number" required />);
    expect(screen.getByRole('spinbutton')).toHaveAttribute('required');
  });

  test('render step="0.01"', async () => {
    render(<Editor type="number" step="0.01" />);
    expect(screen.getByRole('spinbutton')).toHaveAttribute('step', '0.01');
  });

  test('onChange is called when value is changed', async () => {
    const user = userEvent.setup();
    let onChange = jest.fn();
    render(<Editor type="number" value={ 0 } onChange={ (e) => onChange(e.target.value) } />);
    
    await user.type(screen.getByRole(/spinbutton/i), '5');
    expect(onChange).toHaveBeenLastCalledWith('5');

    // Just keep here other approaches:
    // fireEvent.change(
    //   screen.getByRole('spinbutton'),
    //   { target: { value: 43 } }
    // )
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

describe('tagName = select', () => {
  test('render tagName="select"', async () => {
    render(<Editor tagName="select" />);
    expect(screen.queryAllByRole('combobox')).toHaveLength(1);
  });

  test('render with required', async () => {
    render(<Editor tagName="select" required />);
    expect(screen.getByRole('combobox')).toHaveAttribute('required');
  });

  test('render value and items', async () => {
    const items = [
      { value: 'value1', text: 'text1' },
      { value: 'value2', text: 'text2' }
    ];
    render(<Editor tagName="select" listItems={ items } value="value2" onChange={ () => { } } />);

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

  test('onChange is called when selected item is changed', async () => {
    const user = userEvent.setup();
    const items = [
      { value: 'value1', text: 'text1' },
      { value: 'value2', text: 'text2' },
      { value: 'value3', text: 'text3' },
    ];
    let newValue = '';
    render(
      <Editor tagName="select" listItems={ items } value={ 'value2' }
        onChange={ e => newValue = e.target.value }
      />
    );

    expect(screen.getByRole('combobox')).toHaveValue('value2');

    await user.selectOptions(screen.getByRole(/combobox/i), 'value3');

    expect(newValue).toBe('value3');
  });

  test('change value with wrapper (just keep this approach here)', async () => {
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
