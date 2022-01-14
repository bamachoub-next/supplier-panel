var path = require('path');

module.exports = {
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },
  distDir: 'build',
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  }
}
