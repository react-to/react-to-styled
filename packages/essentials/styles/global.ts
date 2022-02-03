import { createGlobalStyle } from 'styled-components'

import OpenSansFont from '../fonts/OpenSans/OpenSans-Regular.woff'
import OpenSansBoldFont from '../fonts/OpenSans/OpenSans-Bold.woff'

export const EssentialStyle = createGlobalStyle`
  @font-face {
    font-family: 'Open Sans'; 
    font-weight: normal;
    font-style: normal;
    src: local('Open Sans'), url(${OpenSansFont}) format('woff');
  }
  
  @font-face {
    font-family: 'Open Sans';
    font-weight: bold;
    font-style: normal;
    src: local('Open Sans Bold'), url(${OpenSansBoldFont}) format('woff');
  }
`
