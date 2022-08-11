import { render, screen } from '@testing-library/react';
import Button from './button';

test('renders header', () => {
  const { container } = render(<Button svgImage="svg" />);
  const svgElements = container.querySelectorAll('svg');
  expect(svgElements).toHaveLength(1);
});
