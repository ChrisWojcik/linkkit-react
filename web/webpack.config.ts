import path from 'path';
import webpack, { Configuration } from 'webpack';
import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const config = (
  env: Record<string, any>,
  argv: Record<string, any>
): Configuration => {
  const isProduction = argv.mode === 'production';

  return {
    mode: isProduction ? 'production' : 'development',
    context: __dirname,
    entry: [
      !isProduction &&
        'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr&timeout=20000',
      path.resolve(__dirname, 'src/main.tsx'),
    ].filter(Boolean),
    output: {
      path: path.resolve(__dirname, 'build'),
      publicPath: '/',
      filename: 'main.js',
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      alias: {
        '@/web': path.resolve(__dirname, 'src'),
        '@/api': path.resolve(__dirname, '../api/src'),
      },
    },
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    plugins: [
      !isProduction && new webpack.HotModuleReplacementPlugin(),
      !isProduction &&
        new ReactRefreshPlugin({
          overlay: {
            sockIntegration: 'whm',
          },
        }),
      new MiniCssExtractPlugin({
        filename: 'main.css',
      }),
    ].filter(Boolean),
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
            },
          ],
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            { loader: 'css-loader', options: { importLoaders: 2 } },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [['postcss-preset-env']],
                },
              },
            },
            'sass-loader',
          ],
        },
      ],
    },
  };
};

export default config;
