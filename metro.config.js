const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { withNativeWind } = require('nativewind/metro');

// Get the default Metro config
const defaultConfig = getDefaultConfig(__dirname);

// Custom configuration for SVG support
const svgConfig = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    assetExts: defaultConfig.resolver.assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...defaultConfig.resolver.sourceExts, 'svg'],
  },
};

// Merge all configurations
const config = mergeConfig(
  mergeConfig(defaultConfig, svgConfig),
  {
    /* your additional config */
  }
);

// Apply NativeWind
module.exports = withNativeWind(config, { 
  input: './global.css',
  // Optional: Add these if you're using Tailwind's JIT mode
  jit: true,
  // Optional: Set the config path if it's not in the root
  // configPath: './tailwind.config.js',
});