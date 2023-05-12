// import Form from '../index'
import { render } from '@testing-library/react';
import BaseForm from '../__example__/001-base';
describe('Form', () => {
  it('should render the form', () => {
    const { container } = render(<BaseForm />);
    const form = container.querySelector('form');
    expect(form !== null).toBeTruthy();
  });
});
