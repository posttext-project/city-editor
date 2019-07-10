import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import path from 'path'

export const mode = process.env.NODE_ENV || 'development'
export const prod = mode === 'production'

export default {
  entry: {
    polyfill: [
      './src/polyfill.js'
    ],
    bundle: [
      './src/main.js'
    ]
  },
  resolve: {
    extensions: ['.css', '.mjs', '.js', '.svelte']
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].js',
    chunkFilename: '[name].[id].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.svelte$/,
        exclude: /node_modules/,
        use: {
          loader: 'svelte-loader',
          options: {
            emitCss: true,
            hotReload: true
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          prod ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  mode,
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ],
  devtool: prod ? false : 'source-map',
  devServer: {
    port: 8080,
    contentBase: path.resolve(__dirname, 'public')
  }
}
