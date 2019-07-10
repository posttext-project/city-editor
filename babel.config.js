import { prod } from './webpack.config'

export default function(api) {
  api.cache(!prod)

  return { presets: ['@babel/preset-env'] }
}
