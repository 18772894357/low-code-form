<template>
  <div class="config-content">
    <el-collapse>
      <el-collapse-item v-for="item in nameSpace" :key="item.name" :title="item.name">
        <div slot="title" class="flex-between-center w-100p">
          {{item.name}}
          <span>
            <el-button type="primary">发布</el-button>
            <el-button>授权</el-button>
            <el-button>发布历史</el-button>
            <el-button>回滚</el-button>
          </span>
        </div>
        <el-table :data="item.keys" border>
          <el-table-column label="发布状态" prop="status">
          </el-table-column>
          <el-table-column label="key" prop="key"></el-table-column>
          <el-table-column label="value" prop="value" show-overflow-tooltip></el-table-column>
          <el-table-column label="类型" prop="type"></el-table-column>
          <el-table-column label="备注" prop="remark"></el-table-column>
          <el-table-column label="更新时间" prop="updateTime"></el-table-column>
          <el-table-column label="更新用户" prop="updateUser"></el-table-column>
          <el-table-column label="操作" prop="ctrl">
            <template slot-scope="scope">
              <el-button type="text" icon="el-icon-edit" @click="openDetailDrawer(scope.row)"></el-button>
              <el-button type="text" icon="el-icon-delete"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-collapse-item>
    </el-collapse>
    <DetailDrawer ref="detailDrawer" />
  </div>
</template>
<script type="text/javascript">
  import defaultValue from './default-value'
  import DetailDrawer from './detail-drawer'
  export default {
    components: {
      DetailDrawer
    },
    data () {
      return {
        nameSpace: [{
          name: '测试1',
          keys: [{
            status: 1,
            key: 'key1',
            type: 'object',
            value: defaultValue,
            remark: '',
            updateUser: '',
            updateTime: ''
          }, {
            status: 1,
            key: 'key2',
            type: 'array',
            value: '',
            remark: '',
            updateUser: '',
            updateTime: ''
          }]
        }, {
          name: '测试2',
          keys: []
        }],
        activeKey: ''
      }
    },
    methods: {
      // 修改和查看
      openDetailDrawer (row) {
        console.log()
        this.$refs.detailDrawer.open(row)
      }
    }
  }
</script>
<style type="text/css">
  .el-tooltip__popper {
    max-height: 60vh;
    overflow-y: auto;
  }
</style>