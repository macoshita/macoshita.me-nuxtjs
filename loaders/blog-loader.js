const fs = require('fs')
const readFile = require('util').promisify(fs.readFile)
const path = require('path')
const loaderUtils = require('loader-utils')
const globby = require('globby')
const fm = require('front-matter')
const util = require('./util')

async function main(source) {
  const options = loaderUtils.getOptions(this)
  const config = util.exec.call(this, source, this.resource)
  const cwd = path.resolve(__dirname, '..', config.dir)

  const files = await globby('*.md', { cwd })

  const jobs = files.map(async function (f) {
    const fmmd = await readFile(path.join(cwd, f), 'utf8')
    const { slug, date } = util.parseFilePath(f)
    const { attributes } = fm(fmmd)

    if (attributes.draft) {
      return null
    } else {
      return {
        slug,
        date,
        ...attributes
      }
    }
  })

  const posts = await Promise.all(jobs)
  const filtered = posts.filter(o => !!o)

  filtered.sort((a, b) => a.date < b.date)

  return `module.exports=${JSON.stringify(filtered)}`
}

module.exports = function (source) {
  const callback = this.async()

  main.call(this, source).then(result => {
    callback(null, result)
  }, err => {
    callback(err)
  })
}
