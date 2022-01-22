module.exports = {
  features: {
    postcss: false,
  },
  stories: ['../stories/*.stories.tsx'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-docs',
    '@storybook/addon-controls',
    '@storybook/addon-measure',
    'storybook-addon-outline',
    '@storybook/addon-viewport',
  ],

  webpackFinal: async config => {
    // styles
    config.module.rules.push({
      test: /\.less$/,
      use: [
        { loader: 'style-loader' },
        { loader: 'css-loader', options: { modules: false } },
        { loader: 'less-loader', options: { javascriptEnabled: true } },
      ],
    })
    config.module.rules.push({
      test: /\.scss$/,
      loaders: [
        'style-loader',
        'css-loader',
        {
          loader: 'sass-loader',
          options: {
            // Prefer `dart-sass`
            implementation: require('sass'),
          },
        },
      ],
    })
    config.resolve.extensions.push('.ts', '.tsx')
    return config
  },
}
