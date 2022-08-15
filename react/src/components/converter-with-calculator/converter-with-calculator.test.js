import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ConverterUI from './converter-ui';

describe('Source amount', () => {
  const labelMatch = /source amount/i;
  test('render', () => {
    render(<ConverterUI />);
    expect(screen.getByLabelText(labelMatch)).toBeInTheDocument();
  });

  test('render value', () => {
    render(<ConverterUI amount={ 42 } />);
    expect(screen.getByLabelText(labelMatch)).toHaveValue(42);
  });

  test('amountChanged callback is called when amount was changed', async () => {
    const user = userEvent.setup()
    let counter = jest.fn();
    render(<ConverterUI amountChanged={ counter } />);

    await user.type(screen.getByLabelText(labelMatch), '23');

    expect(counter).toHaveBeenLastCalledWith(23);
  });
});
