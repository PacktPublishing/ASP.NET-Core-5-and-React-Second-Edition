import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { Page } from './Page';

afterEach(cleanup); 

test('When the Page component is rendered, it should contain the correct title and content', () => {
  const { queryByText } = render(
    <Page title="Title test">
      <span>Test content</span>
    </Page>,
  );
  const title = queryByText('Title test');
  expect(title).not.toBeNull();
  const content = queryByText('Test content');
  expect(content).not.toBeNull();

});
