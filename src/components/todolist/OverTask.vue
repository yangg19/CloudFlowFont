<template>
  <div>
    <div slot="header">
    </div>
    <div>
      <el-table
          :data="todolists"
          style="width: 100%">
        <el-table-column
            prop="todoTask, planTime"
            label="待办事项"
            width="300">
          <template slot-scope="scope">
            <el-tag type="">{{scope.row.planTime}}</el-tag>&nbsp&nbsp&nbsp&nbsp&nbsp{{scope.row.todoTask}}
            <!--              <el-tag :type="scope.row.taskStatus">{{scope.row.planTime}}</el-tag>&nbsp&nbsp&nbsp&nbsp&nbsp{{scope.row.todoTask}}-->
            <!--                              <el-tag type="" effect="dark">{{ scope.row.planTime }}</el-tag>-->
          </template>
        </el-table-column>
        <el-table-column
            prop="taskStatusID"
            label="状态"
            width="60">
          <template slot-scope="scope">
            <el-tag color=white style="color: #000000">{{scope.row.rateOfTask}}</el-tag>
            <!--                              <el-tag type="" effect="dark">{{ scope.row.planTime }}</el-tag>-->
          </template>
        </el-table-column>
        <el-table-column
            label="操作"
            width="150">
          <template slot-scope="scope">
            <el-button @click="showEditEmpView(scope.row)" icon="el-icon-check" style="padding:8px"></el-button>
            <el-button @click="showEmpView(scope.row)" icon="el-icon-edit" style="padding:8px;background: #0e57a2;border-color: #0e57a2; color: #ffffff"></el-button>
            <el-button @click="deleteTask(scope.row)" icon="el-icon-close" style="padding:8px" type="danger"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="display: flex; justify-content: flex-end; margin-top: 10px">
        <el-pagination
            background
            layout="prev, pager, next, jumper, ->, total"
            @current-change="currentChange"
            @size-change="sizeChange"
            :total="total">
        </el-pagination>
      </div>
    </div>
    <div>
      <el-dialog
          title="添加待办"
          style="text-align: left"
          :visible.sync="addDialogVisible"
          width="30%"
          :before-close="handleClose">
        <el-input
            suffix-icon="el-icon-plus"
            v-model="addTodolist.todoTask"
            @keydown.enter.native="addTodoTask"
            placeholder="输入待办事项">
        </el-input>
        <div class="scoreTab">
          <el-radio-group v-model="addTodolist.taskScore">
            <el-radio-button label="1"></el-radio-button>
            <el-radio-button label="2"></el-radio-button>
            <el-radio-button label="3"></el-radio-button>
            <el-radio-button label="4"></el-radio-button>
          </el-radio-group>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addTodoTask">确 定</el-button>
        </span>
      </el-dialog>
    </div>


  </div>

</template>

<script>
export default {
  name: "OverTask",
  data() {
    return {
      todolists:[],
      addDialogVisible: false,
      type:'',
      addTodolist:{
        todoTask:'',
        taskScore: 0,
        planTime:'',
      },
      taskStatusID:'3',
      total: 0,
      currentPage: 1,
      size: 10,
    }
  },
  mounted() {
    this.initTodolist();
  },
  methods: {
    initTodolist() {
      this.getRequest('/todolist/?currentPage=' + this.currentPage + '&size=' + this.size + '&taskStatusID=' + this.taskStatusID).then(resp => {
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
    showAddTodoTask() {
      this.addDialogVisible = true;
    },
    addTodoTask(){
      this.postRequest('/todolist/', this.addTodolist).then(resp=>{
        if(resp) {
          this.addDialogVisible = false;
          this.addTodolist.todoTask = '';
          this.initTodolist()
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
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    }
  }
}
</script>

<style scoped>
.scoreTab {
  margin-top: 20px;
}

</style>