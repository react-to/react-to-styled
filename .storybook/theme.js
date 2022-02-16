import { Colors } from '@react-to-styled/essentials'
import { create } from '@storybook/theming'

export default create({
  base: 'light',

  colorPrimary: Colors.storybookPrimary,
  colorSecondary: Colors.storybookGray,

  // UI
  appBg: Colors.background,
  appContentBg: Colors.grayBackground,
  appBorderColor: Colors.borderColor,
  appBorderRadius: 4,

  // Typography
  fontBase: 'sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: Colors.storybookGray,
  textInverseColor: Colors.storybookGray,

  // Toolbar default and active colors
  barTextColor: Colors.storybookGray,
  barSelectedColor: Colors.storybookGray,
  barBg: Colors.storybookGrayLight,

  // Form colors
  inputBg: Colors.background,
  inputBorder: Colors.borderColor,
  inputTextColor: Colors.storybookGray,
  inputBorderRadius: 4,

  brandTitle: 'react-to-styled',
  brandUrl: 'https://github.com/react-to',
})
