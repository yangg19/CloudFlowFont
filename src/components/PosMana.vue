<template>
  <div>
    <div>
      <el-input
          size="small"
          class="addPosInput"
          placeholder="添加职位"
          suffix-icon="el-icon-plus"
          @keydown.enter.native="addPosition"
          v-model="pos.name">
      </el-input>
      <el-button class="addButton" size="small" icon="el-icon-plus" type="primary" @click="addPosition">添加</el-button>

      <div class="posManaMain">
        <el-table
            :data="positionData"
            size="small"
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
              label="职位"
              width="120">
          </el-table-column>
          <el-table-column
              prop="createDate"
              label="创建时间"
              width="120">
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
      </div>

      <el-button type="danger" size="small" class="multiDelete" :disabled="this.multipleSelection.length===0" @click="multiDelete">批量删除</el-button>
      <el-dialog
          title="提示"
          :visible.sync="dialogVisible"
          width="30%">
        <div>
          <el-tag>职位名称</el-tag>
          <el-input v-model="updatePos.name" class="updatePos" size="small">职位名称</el-input>

        </div>
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
  name: "PosMana",
  data() {
    return {
      pos: {
        name: ''
      },
      positionData: [],
      dialogVisible: false,
      updatePos: {
        name: ''
      },
      multipleSelection: []
    }
  },
  mounted() {
    this.initPositionData();
  },
  methods: {
    multiDelete () {
      this.$confirm('此操作将永久删除该[' + this.multipleSelection.length + ']条职位信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let ids = '?';
        this.multipleSelection.forEach(item=>{
          ids+= 'ids=' + item.id + '&';
        })
        this.deleteRequest('/system/basic/pos/' + ids).then(resp => {
          if (resp) {
            this.initPositionData();
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    handleSelectionChange(val){
      this.multipleSelection = val;
    },
    doUpdate() {
      this.putRequest('/system/basic/pos/', this.updatePos).then(resp => {
        if (resp) {
          this.initPositionData();
          this.dialogVisible = false;
        }
      })
    },
    addPosition() {
      if (this.pos.name) {
        this.postRequest('/system/basic/pos/', this.pos).then(resp => {
          if (resp) {
            this.initPositionData();
            this.pos.name = '';
          }
        })
      } else {
        this.$message.error('职位名称不能为空');
      }
    },
    initPositionData() {
      this.getRequest('/system/basic/pos/').then(resp => {
        if (resp) {
          this.positionData = resp;
        }
      })
    },
    showEditView(data) {
      Object.assign(this.updatePos, data); // 拷贝数值
      this.updatePos.createDate = '';
      this.dialogVisible = true;
    },
    singleDelete(data) {
      this.$confirm('此操作将永久删除该[' + data.name + ']职位, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteRequest('/system/basic/pos/' + data.id).then(resp => {
          if (resp) {
            this.initPositionData();
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  }
}
</script>

<style scoped>

.addPosInput {
  width: 300px;
  margin-right: 10px;
}

.addButton {
  background-color: #0e57a2;
  border-color: #0e57a2;
}

.multiDelete {
  margin-top: 20px;
}

.posManaMain {
  margin-top: 20px;
}

.updatePos {
  width: 200px;
  margin-left: 10px;
}

</style>