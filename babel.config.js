module.exports = {
  plugins: [
    'module:react-native-dotenv',
    [
      'babel-plugin-inline-import',
      {
        extensions: ['.svg'],
      },
    ],
  ],
  presets: ['module:metro-react-native-babel-preset'],
}
