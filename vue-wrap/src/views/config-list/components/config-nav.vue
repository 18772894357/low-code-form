<template>
  <div class="config-nav">
    <div class="lh-44 fw-bold fs-16 border-b-1 border-c-black-10 m-b-16">环境列表</div>
    <div 
      v-for="item in environment"
      :key="item.value"
      class="m-t-8 lh-28 cursor-pointer active p-x-8"
      :class="{'bg-ebf2f8 fw-bold': item.value === ev}"
      @click="handleCheckEv(item)">{{item.label}}</div>
    <div class="m-t-28 lh-44 fw-bold fs-16 border-b-1 border-c-black-10 m-b-16">NameSpace</div>
    <div class="cursor-pointer">
      <i class="el-icon-plus fs-20 m-r-3"></i>新增NameSpace
    </div>
  </div>
</template>
<script type="text/javascript">
  export default {
    data () {
      return {
        environment: [{
          label: '开发环境',
          value: 'development'
        }, {
          label: '正式环境',
          value: 'production'
        }],
        ev: 'development'
      }
    },
    methods: {
      handleCheckEv (item) {
        this.ev = item.value
      }
    }
  }
</script>
<style type="text/css" lang="less">
</style>