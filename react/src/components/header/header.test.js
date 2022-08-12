import { render, screen } from '@testing-library/react';
import Header from './header';

test('render param values', () => {
  render(<Header />);
  
  expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
});
