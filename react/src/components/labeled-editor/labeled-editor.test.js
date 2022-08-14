import { render, screen } from '@testing-library/react';
import LabeledEditor from './labeled-editor';

test('render caption and content', () => {
  render(
    <LabeledEditor caption={ 'my caption' }>
      <input id="id_1"></input>
    </LabeledEditor>
  );
  expect(screen.getByLabelText(/my caption/i)).toHaveAttribute('id', 'id_1');
});
