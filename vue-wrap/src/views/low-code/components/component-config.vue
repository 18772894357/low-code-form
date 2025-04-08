<template>
  <div class="component-config display-flex flex-direction-column p-x-16 p-y-12">
    <div class="lh-44 fs-20 border-b-1 border-c-black-10">属性设置区域</div>
    <div class="flex-1 overflow-y-auto m-t-16">
      <el-form :model="form">
        <el-form-item label="vModel" v-if="type === 3">
          <el-input v-model="form['v-model']" />
        </el-form-item>
        <el-form-item v-for="item in list" :key="item.key" :label="item.key">
          <el-input v-if="item.type === 'String'" v-model="form[item.key]" />
          <el-input-number v-if="item.type === 'Number'" v-model="form[item.key]" :controls="false" />
          <el-select v-if="item.type === 'Boolean'" v-model="form[item.key]" clearable>
            <el-option label="是" :value="true" />
            <el-option label="否" :value="false" />
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="border-t-1 border-c-black-10 text-right p-t-16">
      <el-button type="primary" @click="handleSave">保存</el-button>
    </div>
  </div>
</template>
<script>
import ElementUI from 'element-ui'
import { cloneDeep } from 'lodash'
export default {
  data () {
    return {
      form: {},
      list: [],
      item: null,
      type: null
    }
  },
  methods: {
    onSetConfig (item, type) {
      this.item = item
      this.type = type
      let component = null
      if (type === 3) {
        component = ElementUI[item.key]
        this.form = Object.keys(item.componentAttrs || {}).reduce((res, cur) => {
          res[cur] = item.componentAttrs[cur]
          return res
        }, {}) ?? {}
      } else if (type === 2) {
        component = ElementUI.FormItem
        this.form = Object.keys(item.itemAttrs || {}).reduce((res, cur) => {
          res[cur] = item.itemAttrs[cur]
          return res
        }, {}) ?? {}
      } else {
        component = ElementUI.Form
        this.form = Object.keys(item.formAttrs || {}).reduce((res, cur) => {
          res[cur] = item.formAttrs[cur]
          return res
        }, {}) ?? {}
      }
      this.list = Object.keys(component.props).map(prop => {
        const reg = /function ([a-zA-Z]+)\(\) \{ \[native code\] \}/
        const strType = String(component.props[prop].type)
        const type = strType.match(reg)?.[1]
        return {
          key: prop,
          type: type
        }
      })
    },
    // 保存
    handleSave () {
      if (this.type === 3) {
        this.$set(this.item, 'componentAttrs', cloneDeep(this.form))
      } else if (this.type === 2) {
        this.$set(this.item, 'itemAttrs', cloneDeep(this.form))
      } else {
        this.$set(this.item, 'formAttrs', cloneDeep(this.form))
      }
    }
  }
}
</script>
