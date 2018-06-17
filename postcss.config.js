const autoprefixer = require('autoprefixer');
const flexbugFixes = require('postcss-flexbugs-fixes');
const stylelint = require('stylelint');

module.exports = {
  plugins: ()=> [
    flexbugFixes,
    autoprefixer({
      browsers: [
        '>1%',
        'last 4 versions',
        'Firefox ESR',
        'not ie < 9'
      ],
      flexbox: 'no-2009',
    }),
    stylelint({
      failOnError: true
    })
  ]
};