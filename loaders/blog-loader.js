const path = require('path')
const loaderUtils = require('loader-utils')
const globby = require('globby')
const Module = require("module")

function exec(code, filename) {
  const module = new Module(filename, this)
  module.paths = Module._nodeModulePaths(this.context)
  module.filename = filename
  module._compile(code, filename)
  return module.exports
}

async function main(source) {
  const options = loaderUtils.getOptions(this)
  const config = exec.call(this, source, this.resource)
  const cwd = path.resolve(__dirname, '..', config.dir)

  const files = await globby('*.md', { cwd })
  const names = files.map(f => {
    return {
      slug: path.basename(f, '.md')
    }
  })

  return `module.exports=${JSON.stringify(names)}`
}

module.exports = function (source) {
  const callback = this.async()

  main.call(this, source).then(result => {
    callback(null, result)
  }, err => {
    callback(err)
  })
}
