<template>
  <div
    class="component-wrapper h-100p display-flex"
    v-loading="loading"
    element-loading-background="rgba(0, 0, 0, 0.2)"
  >
    <ComponentList
      class="flex-basis-300 bg-fff m-r-8"
      @drag="drag"
      @dragend="dragend"
    />
    <ComponentContent
      class="flex-1 bg-fff m-r-8"
      ref="content"
      @setConfig="onSetConfig"
      @formatCode="onFormatCode"
    />
    <ComponentConfig ref="config" class="bg-fff flex-basis-300" />
    <CodeDrawer ref="codeDrawer" />
  </div>
</template>
<script>
import ComponentList from './components/component-list.vue';
import ComponentContent from './components/component-content.vue';
import ComponentConfig from './components/component-config.vue';
import CodeDrawer from './components/code-drawer.vue';
import { buildCode } from './utils';
export default {
  components: {
    ComponentList,
    ComponentContent,
    ComponentConfig,
    CodeDrawer
  },
  data() {
    return {
      formatCode: '',
      loading: false
    };
  },
  methods: {
    drag(e, item) {
      this.$refs.content.drag(e, item);
    },
    dragend(e, item) {
      this.$refs.content.dragend(e, item);
    },
    onChoose(item) {
      this.form.componentList.push({
        key: item.key
      });
    },
    onSetConfig(item, type) {
      if (type === 1) {
        this.$refs.config.onSetConfig(item, type);
      } else {
        this.$refs.config.onSetConfig(item, type);
      }
    },
    // 生成代码格式化
    onFormatCode(data) {
      const components = data.components.map(component => {
        return {
          key: 'Col',
          attr: {
            span: component.w
          },
          children: [
            {
              key: 'FormItem',
              attr: component.itemAttrs,
              children: [
                {
                  key: component.key,
                  attr: component.componentAttrs
                }
              ]
            }
          ]
        };
      });
      const tree = [
        {
          key: 'Form',
          attr: data.root?.formAttrs,
          children: [
            {
              key: 'Row',
              attr: {
                gutter: 16
              },
              children: components
            }
          ]
        }
      ];
      const defaultForm = data.components.reduce((res, cur) => {
        const { componentAttrs } = cur;
        const { 'v-model': vModel, value } = componentAttrs ?? {};
        if (vModel) {
          res[vModel] = value ?? '';
        }
        return res;
      }, {});
      const code = buildCode(tree, { form: defaultForm });
      this.loading = true;
      fetch('/code/format', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code })
      })
        .then(response => response.json())
        .then(data => {
          this.$refs.codeDrawer.open(data?.data);
          this.loading = false;
        });
    }
  }
};
</script>
<style lang="less" scoped>
.component-wrapper {
  margin: 0 !important;
  padding: 0 !important;
  background-color: #f2f3f5 !important;
}
</style>
