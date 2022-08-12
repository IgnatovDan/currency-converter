import { render, screen } from '@testing-library/react';
import Header from './header';

test('render H1 with text', () => {
  render(<Header />);

  expect(screen.queryAllByRole('heading', { level: 1 })).toHaveLength(1);
  expect(screen.getByRole('heading', { level: 1 }).textContent).toMatch(/currency converter/i);
});
