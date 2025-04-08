const vueTemplate = `
<template>
  #1#
</template>
<script>
export default {
  data () {
    return #2#
  }
}
</script>
<style lang="less" scoped>

</style>
` 

const getElName = name => {
  if (!name) return ''
  return 'el-' + name.replace(/[A-Z]/g, match => {
    return `-${match.toLowerCase()}`
  }).replace(/^-/, '')
}

const getAttrs = (obj) => {
  return Object.keys(obj || {}).reduce((str, cur) => {
    let value = obj[cur]
    if (cur === 'v-model') {
      value = `form.${value}`
    }
    const prefix = typeof value === 'string' ? '' : ':'
    if (value !== undefined) {
      str += ` ${prefix}${cur}="${value}"`
    }
    return str
  }, '')
}

const buildCode = (tree, defaultData) => {
  const buildTree = (tree) => {
    return tree.reduce((res, cur) => {
      const label = getElName(cur.key) || cur.name
      const attr = getAttrs(cur.attr) || ''
      if (cur.children?.length) {
        res += `<${label}${attr}>${buildTree(cur.children)}</${label}>`
      } else {
        res += `<${label}${attr} />`
      }
      return res
    }, '')
  }
  const formCode = buildTree(tree)
  const code = vueTemplate.replace(/#([^#]+)#/g, (...match) => {
    if (match[1] === '1') {
      return formCode
    } else if (match[1] === '2') {
      return JSON.stringify(defaultData)
    }
  })
  return code
}

export {
  getElName,
  getAttrs,
  buildCode
}
