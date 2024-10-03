import { render } from '@testing-library/react';

import CustomDropdown from './CustomDropdown';

describe('CustomDropdown', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CustomDropdown />);
    expect(baseElement).toBeTruthy();
  });
});
