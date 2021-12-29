<template>
  <div>
    <div style="margin-bottom: 10px">
      <el-input v-model="jobLevel.name" placeholder="添加职称等级..." prefix-icon="el-icon-plus" size="small"
                style="width: 300px"></el-input>
      <el-select v-model="jobLevel.titleLevel" placeholder="职称等级" size="small"
                 style="margin-left: 10px; margin-right: 10px">
        <el-option
            v-for="item in titleLevels"
            :key="item"
            :label="item"
            :value="item">
        </el-option>
      </el-select>
      <el-button @click="addJobLevel" class="addButton" type="primary" icon="el-icon-plus" size="small">添加</el-button>
    </div>

    <div>
      <el-table
          :data="jobLevels"
          stripe
          border
          @selection-change="handleSelectionChange"
          style="width: 100%">
        <el-table-column
            type="selection"
            width="55">
        </el-table-column>
        <el-table-column
            prop="id"
            label="编号"
            width="55">
        </el-table-column>
        <el-table-column
            prop="name"
            label="职称名称"
            width="150">
        </el-table-column>
        <el-table-column
            prop="titleLevel"
            label="职称等级"
            width="150">
        </el-table-column>
        <el-table-column
            prop="createDate"
            label="创建日期"
            width="150">
        </el-table-column>
        <el-table-column
            prop="enabled"
            label="是否启用"
            width="80">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.enabled" size="small">已启用</el-tag>
            <el-tag v-else type="info" size="small">未启用</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
                size="mini"
                @click="showEditView(scope.row)">编辑
            </el-button>
            <el-button
                size="mini"
                type="danger"
                @click="singleDelete(scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="danger" size="small" class="multiDelete" :disabled="this.multipleSelection.length===0" @click="multiDelete" style="margin-top: 20px">批量删除</el-button>
    </div>
    <div>
      <el-dialog
          title="职称名称"
          :visible.sync="dialogVisible"
          width="30%">
        <table>
          <tr>
            <el-tag>职称名称</el-tag>
            <td>
              <el-input v-model="updateJobLevel.name" size="small" style="margin-left: 10px"></el-input>
            </td>
          </tr>
          <tr>
            <td>
              <el-tag>职称等级</el-tag>
            </td>
            <td>
              <el-select v-model="updateJobLevel.titleLevel" placeholder="职称等级" size="small"
                         style="margin-left: 10px; margin-right: 10px">
                <el-option
                    v-for="item in titleLevels"
                    :key="item"
                    :label="item"
                    :value="item">
                </el-option>
              </el-select>
            </td>
          </tr>
          <tr>
            <td>
              <el-tag style="margin-right: 10px">是否启用</el-tag>
            </td>
            <td>
              <el-switch
                  style="margin-left: 10px"
                  v-model="updateJobLevel.enabled"
                  active-color="#0e57a2"
                  inactive-color="#dcdfe6"
                  active-text="启用"
                  inactive-text="关闭">
              </el-switch>
            </td>
          </tr>
        </table>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" size="small">取 消</el-button>
          <el-button type="primary" @click="doUpdate" size="small">确 定</el-button>
        </span>
      </el-dialog>
    </div>

  </div>

</template>

<script>
export default {
  name: "JobLevelMana",
  data() {
    return {
      jobLevel: {
        name: '',
        titleLevel: ''
      },
      titleLevels: [
        '正高级',
        '副高级',
        '中级',
        '初级',
        '高级'
      ],
      jobLevels: [],
      dialogVisible: false,
      updateJobLevel: {
        name: '',
        titleLevel:'',
        enabled: false
      },
      multipleSelection: []

    }
  },
  mounted() {
    this.initJobLevels();
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val;
    },
    initJobLevels() {
      this.getRequest('/system/basic/joblevel/').then(resp => {
        if (resp) {
          this.jobLevels = resp;
          this.jobLevel.name = '';
          this.jobLevel.titleLevel = '';
        }
      })
    },
    addJobLevel() {
      if (this.jobLevel.name && this.jobLevel.titleLevel) {
        this.postRequest('/system/basic/joblevel/', this.jobLevel).then(resp => {
          if (resp) {
            this.initJobLevels();
          } else {
            this.$message.error("字段不能为空!");
          }
        })
      }
    },
    singleDelete(data) {
      this.$confirm('此操作将永久删除该[' + data.name + ']职称, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteRequest('/system/basic/joblevel/' + data.id).then(resp => {
          if (resp) {
            this.initJobLevels();
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    showEditView(data) {
      Object.assign(this.updateJobLevel, data);
      this.updateJobLevel.createDate = '';
      this.dialogVisible = true;
    },
    doUpdate(){
      this.putRequest('/system/basic/joblevel/', this.updateJobLevel).then(resp => {
        if (resp) {
          this.initJobLevels();
          this.dialogVisible = false;
        }
      })
    },
    multiDelete () {
      this.$confirm('此操作将永久删除该[' + this.multipleSelection.length + ']条职称信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let ids = '?';
        this.multipleSelection.forEach(item=>{
          ids+= 'ids=' + item.id + '&';
        })
        this.deleteRequest('/system/basic/joblevel/' + ids).then(resp => {
          if (resp) {
            this.initJobLevels();
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },

  },


}
</script>

<style scoped>

.addButton {
  background-color: #0e57a2;
  border-color: #0e57a2;
}

</style>