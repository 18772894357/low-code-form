<template>
  <el-drawer
    class="code-drawer"
    size="60%"
    :visible.sync="visible"
    @close="onClose"
  >
    <div style="white-space: pre" class="p-x-16 p-y-12 bg-282c34 c-fff m-x-16">
      {{ code }}
    </div>
  </el-drawer>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      code: ''
    };
  },
  methods: {
    open(code) {
      this.code = code;
      this.visible = true;
    },
    onClose() {
      this.visible = false;
      this.code = '';
    }
  }
};
</script>
