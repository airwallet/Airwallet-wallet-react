let blacklist = null;

try {
  // >= 0.57
  blacklist = require('metro-config/src/defaults/blacklist');
} catch (e) {
  // <= 0.56
  blacklist = require('metro/src/blacklist');
}

// blacklist is a function that takes an array of regexes and combines
// them with the default blacklist to return a single regex.

module.exports = {
  resolver: {
    blacklistRE: blacklist([
        /node_modules\/react-native-twitter-signin\/node_modules\/react-native\/package.json/,
        /node_modules\/react-native-twitter-signin\/node_modules\/react-native\/Libraries\/.*/,
    ])
  }
};