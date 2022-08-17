import { render, screen } from '@testing-library/react';
import Button from './button';

test('render', () => {
  render(<Button />);
  expect(screen.getByRole('button')).toBeInTheDocument();
});

test('render svg tag', () => {
  render(<Button svgImage="svg" />);
  expect(screen.getByRole("button").querySelectorAll('svg')).toHaveLength(1);
});

test('render aria-label for button', () => {
  render(<Button text="text1" />);
  expect(screen.getByLabelText('text1', { selector: 'button' })).toBeInTheDocument();
  expect(screen.getByRole('button').getAttribute('aria-label')).toBe('text1');
});
