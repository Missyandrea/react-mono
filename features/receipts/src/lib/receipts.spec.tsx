import { render } from '@testing-library/react';

import Receipts from './receipts';

describe('Receipts', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Receipts />);
    expect(baseElement).toBeTruthy();
  });
});
