<template>
  <div>
    <div>
      <el-table
          :data="todolists"
          style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" class="table-expand">
              <el-form-item label="待办详情">
                <span>{{ props.row.taskDetails }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
            prop="todoTask"
            label="待办事项"
            width="300">
          <template slot-scope="scope">
            {{scope.row.todoTask}}
          </template>
        </el-table-column>
        <el-table-column
            prop="planTime"
            label="计划时间"
            width="150">
          <template slot-scope="scope">
            <el-tag color=white
                    style="color: #000000">{{scope.row.planTime}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
            prop="userID"
            label="任务执行人"
            width="100">
          <template slot-scope="scope">
            {{scope.row.adminName.name}}
          </template>
        </el-table-column>
        <el-table-column
            prop="postCount"
            label="延期次数"
            width="100">
          <template slot-scope="scope">
            {{scope.row.postCount}}
          </template>
        </el-table-column>
        <el-table-column
            prop="taskScore"
            label="任务分数"
            width="100">
          <template slot-scope="scope">
            {{scope.row.taskScore}}
          </template>
        </el-table-column>
        <el-table-column
            label="操作"
            width="150">
          <template slot-scope="scope">
            <el-button @click="redoTask(scope.row)" icon="el-icon-refresh" style="padding:8px;background: #0e57a2;border-color: #0e57a2; color: #ffffff"></el-button>
            <el-button @click="deleteTask(scope.row)" icon="el-icon-close" style="padding:8px" type="danger"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 10px">
        <el-pagination
            background
            layout="prev, pager, next, jumper, ->, total"
            @current-change="currentChange"
            @size-change="sizeChange"
            :total="total">
        </el-pagination>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "AllComTask",
  data() {
    return {
      todolists:[],
      type:'',
      taskStatusID:'完成',
      total: 0,
      currentPage: 1,
      size: 10,
    }
  },
  mounted() {
    this.initTodolist();
  },
  methods: {
    redoTask(data) {
      this.$confirm('此操作将重新开启：[' + data.todoTask + '], 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.putRequest('/todolist/redo/?id=' + data.id).then(resp => {
          if (resp) {
            this.initTodolist();
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消重新开启'
        });
      });
    },
    initTodolist() {
      this.getRequest('/todolist/all/query/?currentPage=' + this.currentPage + '&size=' + this.size + '&taskStatusID=' + this.taskStatusID).then(resp => {
        if (resp) {
          this.todolists = resp.data;
          this.total = resp.total;
        }
      })
    },
    deleteTask(data) {
      this.putRequest('/todolist/del/?id=' + data.id).then(resp => {
        if(resp) {
          this.initTodolist();
        }
      })
    },
    currentChange(currentPage) {
      this.currentPage = currentPage;
      this.initTodolist();
    },
    sizeChange(size) {
      this.size = size;
      this.initTodolist();
    },

  }
}
</script>

<style scoped>
.scoreTab {
  margin-top: 20px;
}

.table-expand {
  margin-left: 20px;
  font-size: 0;
  color: #000000;
}
.table-expand label {
  width: 90px;
  font-size: 15px;
  font-color: #99a9bf;
  font-weight: bold;
}
.table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  /*  width: 50%;*/
}

.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #0e57a2;
  color: #fff;
}

</style>
