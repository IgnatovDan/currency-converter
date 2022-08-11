import { render, screen } from '@testing-library/react';
import Button from './button';

test('render svg tag', () => {
  render(<Button svgImage="svg" />);
  const button = screen.getByRole("button");
  const svgElements = button.querySelectorAll('svg');
  expect(svgElements).toHaveLength(1);
});
