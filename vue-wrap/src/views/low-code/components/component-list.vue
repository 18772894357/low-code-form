<template>
  <div class="component-list p-x-16 p-y-12">
    <div class="lh-44 fs-20 border-b-1 border-c-black-10">组件库</div>
    <div class="display-flex flex-wrap-wrap">
      <el-row :gutter="8" class="m-t-16">
        <el-col v-for="item in componentList" :key="item.key" :span="8">
          <div
            draggable="true"
            class="text-center h-32 border-2 border-c-67C23A border-style-dashed border-radius-2 m-y-8 c-606266 fs-10 flex-center-center cursor-pointer"
            @drag="e => drag(e, item)"
            @dragend="e => dragEnd(e, item)"
          >
            {{ item.label }}
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    const pos = {
      height: 48,
      minHeight: 48,
      width: 4
    };
    return {
      componentList: [
        {
          label: '单选框',
          key: 'Radio',
          ...pos
        },
        {
          label: '多选框',
          key: 'Checkbox',
          ...pos
        },
        {
          label: '输入框',
          key: 'Input',
          ...pos
        },
        {
          label: '计数器',
          key: 'InputNumber',
          ...pos
        },
        {
          label: '选择器',
          key: 'Select',
          ...pos
        },
        {
          label: '级联选择器',
          key: 'Cascader',
          ...pos
        },
        {
          label: '开关',
          key: 'Switch',
          ...pos
        },
        {
          label: '滑块',
          key: 'slider',
          ...pos
        },
        {
          label: '时间选择器',
          key: 'TimePicker',
          ...pos
        },
        {
          label: '日期选择器',
          key: 'DatePicker',
          ...pos
        },
        {
          label: '上传',
          key: 'Upload',
          ...pos
        },
        {
          label: '评分',
          key: 'Rate',
          ...pos
        },
        {
          label: '颜色选择器',
          key: 'ColorPicker',
          ...pos
        },
        {
          label: '穿梭框',
          key: 'Transfer',
          ...pos
        }
      ]
    };
  },
  methods: {
    drag(e, item) {
      this.$emit('drag', e, item);
    },
    dragEnd(e, item) {
      this.$emit('dragend', e, item);
    }
  }
};
</script>
