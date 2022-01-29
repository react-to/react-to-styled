module.exports = {
  stories: ['../stories/*.stories.@(js|ts|tsx|mdx)'],
  reactOptions: {
    fastRefresh: true,
    strictMode: true,
  },
  addons: [
    {
      name: '@storybook/addon-docs',
      options: {
        transcludeMarkdown: true,
      },
    },
    '@storybook/addon-essentials',
    '@storybook/addon-actions',
    '@storybook/addon-storysource',
    '@storybook/addon-links',
    '@storybook/addon-controls',
    '@storybook/addon-measure',
    'storybook-addon-outline',
    '@storybook/addon-viewport',
  ],
  core: {
    builder: 'webpack4',
  },
  features: {
    postcss: false,
    modernInlineRender: true,
  },

  webpackFinal: async config => {
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
            implementation: require('sass'),
          },
        },
      ],
    })
    config.resolve.extensions.push('.ts', '.tsx')
    return config
  },
}
