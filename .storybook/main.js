module.exports = {
  stories: ['../stories/**/*.stories.@(js|ts|tsx|mdx)'],
  reactOptions: {
    fastRefresh: true,
    strictMode: true,
  },
  addons: [
    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: true,
        sourceLoaderOptions: null,
        transcludeMarkdown: true,
      },
    },
    '@storybook/addon-essentials',
    '@storybook/addon-storysource',
    '@storybook/addon-links',
    '@storybook/addon-measure',
  ],
  core: {
    builder: 'webpack5',
    options: { fsCache: true, lazyCompilation: true },
  },
  features: {
    postcss: false,
    storyStoreV7: true,
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
      use: [
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
