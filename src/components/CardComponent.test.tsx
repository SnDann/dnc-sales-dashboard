import React from 'react';
import { render } from '@testing-library/react';
import 'jest-styled-components';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '@/styles';
import { CardComponent } from './CardComponent';

describe('CardComponent', () => {
  it('renders with correct styles and children', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <CardComponent>
          <p>Test Content</p>
        </CardComponent>
      </ThemeProvider>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});