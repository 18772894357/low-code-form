<template>
  <el-drawer
    size="60%"
    :visible.sync="visible"
    @close="close">
    <JsonEditor :code="value" />
  </el-drawer>
</template>
<script type="text/javascript">
  import JsonEditor from './json-editor'
  export default {
    components: {
      JsonEditor
    },
    data () {
      return {
        visible: false,
        value: null
      }
    },
    methods: {
      open (row) {
        this.visible = true
        this.value = JSON.parse(row.value)
      },
      close () {
        this.visible = false
      }
    }
  }
</script>