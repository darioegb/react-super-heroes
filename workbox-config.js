module.exports = {
  globDirectory: 'build/',
  globPatterns: [
		'**/*.{json,ico,html,png,txt,css,js}'
  ],
  globFollow: true, // follow symlinks
  globStrict: true, // fail the build if anything goes wrong while reading the files
  globIgnores: [],
  swDest: 'build/sw.js',
  swSrc: 'build/sw.js',
};
