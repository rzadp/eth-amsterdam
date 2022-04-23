import { createGlobalStyle } from 'styled-components'

import GSRegular from 'src/fonts/GeneralSans-Regular.woff'
import GSRegular2 from 'src/fonts/GeneralSans-Regular.woff2'
import GSBold from 'src/fonts/GeneralSans-Bold.woff'
import GSBold2 from 'src/fonts/GeneralSans-Bold.woff2'
import GSItalic from 'src/fonts/GeneralSans-Italic.woff'
import GSItalic2 from 'src/fonts/GeneralSans-Italic.woff2'
import GSBoldItalic from 'src/fonts/GeneralSans-BoldItalic.woff'
import GSBoldItalic2 from 'src/fonts/GeneralSans-BoldItalic.woff2'

export const FontStyles = createGlobalStyle`
  @font-face {
    font-family: 'General-Sans';
    src: url(${GSRegular}) format('woff'), url(${GSRegular2}) format('woff2');
  }
  
  @font-face {
    font-family: 'General-Sans';
    src: url(${GSBold}) format('woff'), url(${GSBold2}) format('woff2');
    font-weight: bold;
  }

  @font-face {
    font-family: 'General-Sans';
    src: url(${GSItalic}) format('woff'), url(${GSItalic2}) format('woff2');
    font-style: italic;
  }

  @font-face {
    font-family: 'General-Sans';
    src: url(${GSBoldItalic}) format('woff'), url(${GSBoldItalic2}) format('woff2');
    font-style: italic;
    font-weight: bold;
  }
  
  body {
    font-family: 'General-Sans', sans-serif;
    margin: 0;
  }
`
