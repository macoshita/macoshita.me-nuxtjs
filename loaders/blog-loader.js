const fs = require('fs')
const util = require('util')
const readFile = util.promisify(fs.readFile)
const path = require('path')
const loaderUtils = require('loader-utils')
const globby = require('globby')
const Module = require("module")
const blogUtil = require('../utils/blog-util')

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

  const jobs = files.map(async function (f) {
    const fmmd = await readFile(path.join(cwd, f), 'utf8')
    const slug = path.basename(f, '.md')
    const { date, title } = blogUtil.parse(slug, fmmd)

    return {
      slug,
      date,
      title
    }
  })

  const posts = await Promise.all(jobs)

  posts.sort((a, b) => a.date < b.date)

  return `module.exports=${JSON.stringify(posts)}`
}

module.exports = function (source) {
  const callback = this.async()

  main.call(this, source).then(result => {
    callback(null, result)
  }, err => {
    callback(err)
  })
}
