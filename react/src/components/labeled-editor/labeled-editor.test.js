import { render, screen } from '@testing-library/react';
import LabeledEditor from './labeled-editor';

test('render caption', () => {
  render(<LabeledEditor caption={ 'my caption' } />);
  expect(screen.getByText(/my caption/i)).toBeInTheDocument();
});

test('render children', () => {
  render(<LabeledEditor>my children</LabeledEditor>);
  expect(screen.getByText(/my children/i)).toBeInTheDocument();
});
