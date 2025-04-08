<template>
  <div
    class="component-content p-x-16 p-y-12 display-flex flex-direction-column"
  >
    <div class="lh-44 fs-20 border-b-1 border-c-black-10 flex-between-center">
      <span @click="handleSetConfig(root, 1)">
        表单设计区
        <i class="el-icon-edit" />
      </span>
      <el-button type="primary" @click="formatCode">生成代码</el-button>
    </div>
    <div
      id="innerContent"
      class="m-t-16 border-1 border-c-black-10 border-style-dashed h-100p flex-1 p-x-12 p-y-16"
    >
      <el-form :model="form" class="h-100p" v-bind="root.formAttrs">
        <GridLayout
          id="content"
          ref="gridlayout"
          :layout.sync="layout"
          :col-num="columns"
          :row-height="rowHeight"
          :is-draggable="true"
          :is-resizable="true"
          :is-mirrored="false"
          :vertical-compact="true"
          :margin="[0, 0]"
          :min-h="minH"
          :use-css-transforms="false"
          class="grid-layout-content"
          style="height: 100%"
        >
          <GridItem
            v-for="(item, index) in layout"
            :key="item.i"
            :x="item.x"
            :y="item.y"
            :w="item.w"
            :h="height"
            :i="item.i"
            :min-h="item.minHeight"
          >
            <div
              class="w-100p h-100p border-1 border-c-black-6 border-style-dashed position-relative"
              @click.stop="handleSetConfig(item, 2)"
            >
              <el-form-item v-bind="item.itemAttrs">
                <span @click.stop="handleSetConfig(item, 3)">
                  <component :is="getElName(item.key)"  v-bind="item.componentAttrs" />
                </span>
              </el-form-item>
              <i
                class="el-icon-close position-absolute r-0 t-0 fw-bold cursor-pointer z-index-1"
                @click="handleDelete(index)"
              ></i>
            </div>
          </GridItem>
        </GridLayout>
      </el-form>
      <div class="position-absolute l-0 r-0 b-0 overflow-y-auto"></div>
    </div>
  </div>
</template>
<script>
import VueGridLayout from 'vue-grid-layout';
import { COLUMNS, ROW_HEIGHT, MIN_H, SCALE_NUM } from '../constants';
import { getElName } from '../utils';
import drag from './drag';
export default {
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem
  },
  mixins: [drag],
  props: {},
  data() {
    return {
      columns: COLUMNS,
      rowHeight: ROW_HEIGHT,
      minH: MIN_H,
      scaleNum: SCALE_NUM,
      layout: [],
      form: {},
      root: {}
    };
  },
  computed: {
    height () {
      return this.root?.formAttrs?.labelPosition === 'top' ? 84 : 48
    }
  },
  methods: {
    getElName(name) {
      return getElName(name);
    },
    handleSetConfig(item, type) {
      this.$emit('setConfig', item, type);
    },
    // 删除一个
    handleDelete(index) {
      this.layout.splice(index, 1);
    },
    // 生成格式化好的代码
    formatCode() {
      this.$emit('formatCode', {
        root: this.root,
        components: this.layout
      });
    }
  }
};
</script>
<style lang="less" scoped>
.component-content {
  ::v-deep .vue-grid-item {
    .vue-resizable-handle,
    .el-icon-close {
      display: none;
    }
    &:hover {
      .vue-resizable-handle,
      .el-icon-close {
        display: block;
      }
    }
  }
}
</style>
