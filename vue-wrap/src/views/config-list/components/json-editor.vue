<template>
  <div class="json-editor">
    <div v-if="type === 'array'">
      <el-tree
        :highlight-current="false"
        v-if="code.length"
        :data="getTreeDate(1)">
        <div slot-scope="{data}">
          <span class="vertical-align-top flex-start-center m-r-8">
            <i v-if="['object', 'array'].includes(getType(data.innerCode))" :class="!hideDetail[data.label] ? 'el-icon-caret-bottom' : 'el-icon-caret-right'" @click="toggleShow(data.label)"></i>
            {{data.label}}
            <span
            v-if="['object', 'array'].includes(getType(data.innerCode))" class="flex-start-center">: 
              <span class="display-inline-block max-w-400 text-ellipsis">{{JSON.stringify(data.innerCode)}}</span>}
            </span>
          </span>
          <div v-show="!hideDetail[data.label]" class="m-l-30">
            <JsonEditor :code="data.innerCode" />
          </div>
        </div>
      </el-tree>
    </div>
    <el-tree
      :highlight-current="false"
      v-else-if="type === 'object' && code !== null"
      :data="getTreeDate(2)">
      <div slot-scope="{data}">
        <span class="vertical-align-top" :class="{'flex-start-center': ['object', 'array'].includes(getType(data.innerCode))}">
          <i v-if="['object', 'array'].includes(getType(data.innerCode))" :class="!hideDetail[0] ? 'el-icon-caret-bottom' : 'el-icon-caret-right'"  @click="toggleShow(0)"></i>
          {{data.label}}
          <span
            v-if="['object', 'array'].includes(getType(data.innerCode))" class="flex-start-center">: 
            <span class="display-inline-block max-w-400 text-ellipsis">{{JSON.stringify(data.innerCode)}}</span>]
          </span>
        </span>
        <div :class="['object', 'array'].includes(getType(data.innerCode)) ? 'display-block m-l-70' : 'display-inline-block vertical-align-top'" v-show="!hideDetail[0]">
          <JsonEditor :code="data.innerCode" />
        </div>
      </div>
    </el-tree>
    <span v-else class="display-inline-block max-w-300 overflow-hidden text-ellipsis">: {{code}}</span>
  </div>
</template>
<script type="text/javascript">
  export default {
    name: 'JsonEditor',
    props: {
      code: {
        type: [Array, Object, String, Number],
        default: ''
      }
    },
    computed: {
      type () {
        return this.getType(this.code)
      }
    },
    data () {
      return {
        hideDetail: {}
      }
    },
    methods: {
      getType (code) {
        return Object.prototype.toString.call(code).slice(8, -1).toLowerCase()
      },
      getTreeDate (type) {
        if (type === 1) {
          return this.code.map((v, index) => ({
            label: index,
            innerCode: v
          }))
        } else if (type === 2) {
          return Object.keys(this.code).map(key => ({
            label: key,
            innerCode: this.code[key]
          }))
        }
      },
      toggleShow (index) {
        this.$set(this.hideDetail, index, !this.hideDetail[index])
      }
    }
  }
</script>
<style type="text/css" lang="less">
  .el-tree-node__content {
    height:auto;
  }
  .el-tree-node__expand-icon {
    display: none;
  }
  .el-tree-node__content:hover, .el-upload-list__item:hover {
    background: none;
  }
</style>