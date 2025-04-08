<template>
  <div class="base-layout h-100p display-flex flex-direction-column">
    <div class="h-44 lh-44 p-x-16 border-b-1 border-c-black-10">
      <i class="el-icon-s-home fs-20 c-black-68 cursor-pointer"></i>
    </div>
    <div class="flex-1 overflow-y-auto p-x-16 p-y-12 bg-f2f3f5">
      <router-view />
    </div>
  </div>
</template>
<script type="text/javascript">
  export default {
    data () {
      return {}
    }
  }
</script>