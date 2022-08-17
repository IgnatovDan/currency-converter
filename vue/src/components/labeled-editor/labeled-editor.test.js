import { render, screen } from '@testing-library/vue';
import LabeledEditor from './labeled-editor.vue';

test('render caption and content', () => {
  render(
    <LabeledEditor caption={ 'my caption' }>
      <input id="id_1"></input>
    </LabeledEditor>
  );
  expect(screen.getByLabelText(/my caption/i)).toHaveAttribute('id', 'id_1');
});
