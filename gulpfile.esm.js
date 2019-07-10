import 'core-js/stable'
import 'regenerator-runtime/runtime'

import gulp from 'gulp'
import path from 'path'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'

import webpackConfig from './webpack.config'

export async function _copyMathJax() {
  const mathJax = path.resolve(
    __dirname,
    'node_modules/mathjax'
  )

  return gulp
    .src(
      [
        'config/**/*',
        'extensions/**/*',
        'fonts/**/*',
        'localization/**/*',
        'jax/**/*',
        'latest.js',
        'MathJax.js'
      ].map(pattern => path.resolve(mathJax, pattern)),
      { base: mathJax }
    )
    .pipe(gulp.dest(path.resolve(__dirname, 'public')))
}

export async function _copyPublicAssets() {
  const sourceDir = path.resolve(__dirname, 'src')

  return gulp
    .src(
      ['index.html', 'favicon.png', 'global.css'].map(pattern =>
        path.resolve(sourceDir, pattern)
      ),
      { base: sourceDir }
    )
    .pipe(gulp.dest(path.resolve(__dirname, 'public')))
}

export const copyAssets = gulp.series(
  _copyMathJax,
  _copyPublicAssets
)

export async function _dev() {
  const devServerConfig = webpackConfig.devServer

  const compiler = webpack(webpackConfig)
  const devServer = new WebpackDevServer(
    compiler,
    devServerConfig
  )

  devServer.listen(devServerConfig.port, err => {
    console.log(err)
  })
}

export const dev = gulp.series(copyAssets, _dev)

export function _build() {
  const compiler = webpack(webpackConfig)

  return new Promise(resolve => {
    compiler.run((err, stats) => {
      console.log(
        stats.toString({
          colors: true
        })
      )

      resolve()
    })
  })
}

export const build = gulp.series(copyAssets, _build)
