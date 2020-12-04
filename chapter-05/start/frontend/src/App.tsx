/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { Header } from './Header';
import { HomePage } from './HomePage';

import { fontFamily, fontSize, gray2 } from './Styles';

function App() {
  return (
    <div
      css={css`
        font-family: ${fontFamily};
        font-size: ${fontSize};
        color: ${gray2};
      `}
    >
      <Header />
      <HomePage />
    </div>
  );
}

export default App;
