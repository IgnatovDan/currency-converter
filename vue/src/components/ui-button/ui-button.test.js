import { render, screen } from '@testing-library/vue';
import UiButton from './ui-button.vue';

test('render img', () => {
  render(<UiButton image='image1' />);
  expect(screen.getByRole('img').getAttribute('src')).toBe('image1');
});

test('render alt in img', () => {
  render(<UiButton text='text1' image='not empty value to render <img>' />);
  expect(screen.getByRole('img').getAttribute('alt')).toBe('text1');
});

test('render aria-label', () => {
  render(<UiButton text='text1' />);
  expect(screen.getByRole('button').getAttribute('aria-label')).toBe('text1');
});
