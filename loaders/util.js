const path = require('path')
const Module = require("module")

module.exports = {
  parseFilePath (f) {
    const slug = path.basename(f, '.md')
    const date = slug.replace(/^(\d{4}-\d{2}-\d{2}).*/, '$1')
    return { slug, date }
  },

  exec (code, filename) {
    const module = new Module(filename, this)
    module.paths = Module._nodeModulePaths(this.context)
    module.filename = filename
    module._compile(code, filename)
    return module.exports
  }
}
