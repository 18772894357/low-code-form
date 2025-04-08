<template>
  <div class="config-list bg-f2f3f5 h-100p">
    <div class="display-flex h-100p">
      <div class="config-nav flex-basis-260 bg-fff m-r-16 p-x-16 p-y-12">
        <ConfigNav />
      </div>
      <div class="flex-1 bg-fff p-x-16 p-y-12">
        <ConfigContent />
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
// application environment Cluster namespace
import ConfigNav from './components/config-nav'
import ConfigContent from './components/config-content.vue'
export default {
  components: {
    ConfigNav,
    ConfigContent
  },
  data () {
    return {}
  }
}
</script>