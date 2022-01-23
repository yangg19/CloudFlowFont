<template>
  <div>
    <el-container>
      <el-header class="homeHeader">

          <div>
            <el-image :src="require('../img/TEAMPARK4.png')" fit="contain" class="el-image-logo"></el-image>
          </div>

        <el-dropdown class="userInfo" @command="commandHandler">
          <span class="el-dropdown-link">
            <span style="position: fixed; top: 25px; right: 80px; font-size: 15px" >
              {{user.name}}
            </span>
              <i><img :src="user.userFace"></i>
          </span>

          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="userInfo">个人中心</el-dropdown-item>
            <el-dropdown-item command="setting">设置</el-dropdown-item>
            <el-dropdown-item command="logout">注销登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <!-- router相当于启用vue router模式，以index的path路径进行路由跳转-->
          <!-- routes是从router/index.js中获取-->
          <el-menu router>
            <el-submenu :index="index + ''"
                        v-for="(item, index) in routes"
                        :key="index"
                        v-if="!item.hidden"> <!-- hidden隐藏了Login页面-->
              <template slot="title">
                <i :class="item.iconCls" style="color:#0e57a2; margin-right: 10px"></i>
                <span>{{ item.name }}</span>
              </template>
              <el-menu-item :index="children.path"
                            v-for="(children, indexj) in item.children"
                            :key="indexj">
                {{ children.name }}
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>

        <el-main>
          <el-breadcrumb separator-class="el-icon-arrow-right"
                         v-if="this.$router.currentRoute.path!=='/home'">
            <el-breadcrumb-item :to="{path:'/home'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{ this.$router.currentRoute.name }}</el-breadcrumb-item>
          </el-breadcrumb>
          <div class="homeInitPage" v-if="this.$router.currentRoute.path==='/home'">
            <template>
              <div class="wrap">
                <div class="left">

                </div>
                <div class="right">
                  <div>

                    <el-card class="todo-today">
                      <div slot="header">
                        <span style="font-size: 20px; font-weight: bold">今日待办</span>
                        <el-button @click="addDialogVisible = true" style="padding: 3px 0; margin-left: 10px;border: white;font-size: 12px" icon="el-icon-circle-plus-outline"></el-button>
                        <el-button @click="unfinishDialogVisible = true" style="float:right; padding: 3px 0; margin-left: 10px;border: white; font-size: 15px" icon="el-icon-warning-outline"></el-button>
                        <el-button @click="finishDialogVisible = true" style="float:right; padding: 3px 0; margin-left: 10px;border: white; font-size: 15px" icon="el-icon-finished"></el-button>
                        <el-button @click="repoDialogVisible = true" style="float:right; padding: 3px 0; margin-left: 10px;border: white; font-size: 15px" icon="el-icon-tickets"></el-button>
                      </div>
                      <div>
                        <el-table
                            :data="todolists"
                            style="width: 100%">
                          <el-table-column
                              prop="todoTask"
                              label="待办事项"
                              width="300">
                          </el-table-column>
                          <el-table-column
                              prop="planTime"
                              label="计划日期"
                              width="200">
                            <template slot-scope="scope">
                              <el-tag type="" effect="dark">{{ scope.row.planTime }}</el-tag>
                            </template>
                          </el-table-column>
                          <el-table-column
                              label="完成 / 设置日期 / 删除"
                              width="150">
                            <template slot-scope="scope">
                              <el-button @click="showEditEmpView(scope.row)" icon="el-icon-check" style="padding:8px"></el-button>
                              <el-button @click="showEmpView(scope.row)" icon="el-icon-time" style="padding:8px;background: #0e57a2;border-color: #0e57a2; color: #ffffff"></el-button>
                              <el-button @click="deleteTask(scope.row)" icon="el-icon-close" style="padding:8px" type="danger"></el-button>
                            </template>
                          </el-table-column>
                        </el-table>
                        <div style="display: flex; justify-content: flex-end; margin-top: 10px">
                          <el-pagination
                              background
                              layout="sizes, prev, pager, next, jumper, ->, total"
                              @current-change="currentChange"
                              @size-change="sizeChange"
                              :total="total">
                          </el-pagination>
                        </div>
                      </div>
                    </el-card>
                  </div>

                  <el-dialog
                      title="添加待办"
                      style="text-align: left"
                      :visible.sync="addDialogVisible"
                      width="30%"
                      :before-close="handleClose">
                    <el-input
                        v-model="todolist.todoTask"
                        @keydown.enter.native="addTodoTask"
                        placeholder="输入待办事项">
                    </el-input>
                    <div>
                      <el-radio-group v-model="todolist.taskScore">
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

                  <el-dialog
                      title="待办仓库"
                      style="text-align: left"
                      :visible.sync="repoDialogVisible"
                      width="34%"
                      :before-close="handleClose">
                    <div>
                      <el-table
                          :data="tableData"
                          style="width: 100%">
                          <el-table-column
                              prop="name"
                              label="待办事项"
                              width="300">
                          </el-table-column>
                        <el-table-column
                            prop="address"
                            label="计划日期"
                            width="200">
                          <template slot-scope="scope">
                            <el-tag type="" effect="dark">{{ scope.row.address }}</el-tag>
                          </template>
                        </el-table-column>
                          <el-table-column
                              label="完成 / 设置日期 / 删除"
                              width="150">
                            <template slot-scope="scope">
                              <el-button @click="showEditEmpView(scope.row)" icon="el-icon-check" style="padding:8px"></el-button>
                              <el-button @click="showEmpView(scope.row)" icon="el-icon-time" style="padding:8px;background: #0e57a2;border-color: #0e57a2; color: #ffffff"></el-button>
                              <el-button @click="deleteEmp(scope.row)" icon="el-icon-close" style="padding:8px" type="danger"></el-button>
                            </template>
                          </el-table-column>
                        </el-table>
                    </div>
                    <span slot="footer" class="dialog-footer">
                      <el-button @click="repoDialogVisible = false">取 消</el-button>
                      <el-button type="primary" @click="repoDialogVisible = false">确 定</el-button>
                    </span>
                  </el-dialog>

                  <el-dialog
                      title="未完成事项"
                      style="text-align: left"
                      :visible.sync="unfinishDialogVisible"
                      width="34%"
                      :before-close="handleClose">
                    <div>
                      <el-table
                          :data="tableData"
                          style="width: 100%">
                        <el-table-column
                            prop="name"
                            label="待办事项"
                            width="300">
                        </el-table-column>
                        <el-table-column
                            prop="address"
                            label="计划日期"
                            width="200">
                          <template slot-scope="scope">
                            <el-tag type="" effect="dark">{{ scope.row.address }}</el-tag>
                          </template>
                        </el-table-column>
                        <el-table-column
                            label="完成 / 设置日期 / 删除"
                            width="150">
                          <template slot-scope="scope">
                            <el-button @click="showEditEmpView(scope.row)" icon="el-icon-check" style="padding:8px"></el-button>
                            <el-button @click="showEmpView(scope.row)" icon="el-icon-time" style="padding:8px;background: #0e57a2;border-color: #0e57a2; color: #ffffff"></el-button>
                            <el-button @click="deleteEmp(scope.row)" icon="el-icon-close" style="padding:8px" type="danger"></el-button>
                          </template>
                        </el-table-column>
                      </el-table>
                    </div>
                    <span slot="footer" class="dialog-footer">
                      <el-button @click="unfinishDialogVisible = false">取 消</el-button>
                      <el-button type="primary" @click="unfinishDialogVisible = false">确 定</el-button>
                    </span>
                  </el-dialog>

                  <el-dialog
                      title="已完成事项"
                      style="text-align: left"
                      :visible.sync="finishDialogVisible"
                      width="32%"
                      :before-close="handleClose">
                    <div>
                      <el-table
                          :data="tableData"
                          style="width: 100%">
                        <el-table-column
                            prop="name"
                            label="待办事项"
                            width="300">
                        </el-table-column>
                        <el-table-column
                            prop="address"
                            label="计划日期"
                            width="200">
                          <template slot-scope="scope">
                            <el-tag type="" effect="dark">{{ scope.row.address }}</el-tag>
                          </template>
                        </el-table-column>
                        <el-table-column
                            label="回溯 / 删除"
                            width="100">
                          <template slot-scope="scope">
                            <el-button @click="showEmpView(scope.row)" icon="el-icon-refresh-left" style="padding:8px;background: #0e57a2;border-color: #0e57a2; color: #ffffff"></el-button>
                            <el-button @click="deleteEmp(scope.row)" icon="el-icon-close" style="padding:8px" type="danger"></el-button>
                          </template>
                        </el-table-column>
                      </el-table>
                    </div>
                    <span slot="footer" class="dialog-footer">
                      <el-button @click="finishDialogVisible = false">取 消</el-button>
                      <el-button type="primary" @click="finishDialogVisible = false">确 定</el-button>
                    </span>
                  </el-dialog>


                </div>
              </div>

            </template>
          </div>
          <!--展示路由主键-->
          <router-view class="homeRouterView"/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      addDialogVisible: false,
      repoDialogVisible: false,
      finishDialogVisible: false,
      unfinishDialogVisible: false,
      todolists:[],
      todolist:{
        todoTask:'',
        taskScore: 0,
        planTime:'',
      },
      total: 0,
      currentPage: 1,
      size: 10,
      tableData: [{
        date: '1',
        name: '完成360消费分期总体设计',
        address: '2022-01-25'
      }, {
        date: '2',
        name: '完成360消费分期概要设计',
        address: '2022-01-25'
      }, {
        date: '3',
        name: '完成360消费分期详细设计',
        address: '2022-01-25'
      }, {
        date: '4',
        name: '完成360消费分期代码开发自测',
        address: '2022-01-25'
      }],
      user: JSON.parse(window.sessionStorage.getItem('user')) // 将获取的用户信息转换为对象
    }
  },
  mounted() {
    this.initTodolist();
  },
  computed: {
    routes() {
      console.log(this.$store.state.routes)
      return this.$store.state.routes;
    }
  },
  methods:{
    deleteTask(data) {
        this.deleteRequest('/todolist/' + data.id).then(resp => {
          if(resp) {
            this.initTodolist();
          }
        })
    },
    addTodoTask(){
      this.postRequest('/todolist/', this.todolist).then(resp=>{
        if(resp) {
          this.addDialogVisible = false;
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
    initTodolist(){
      this.getRequest('/todolist/?currentPage=' + this.currentPage + '&size=' + this.size).then(resp=>{
        if(resp){
          this.todolists = resp.data;
          this.total = resp.total;

        }
      })

    },
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    },
    commandHandler(command){
      if (command === 'logout') {
        this.$confirm('此操作将注销登录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 注销登录
          this.postRequest('/logout');
          // 清空用户信息
          window.sessionStorage.removeItem('tokenStr');
          window.sessionStorage.removeItem('user');
          // 清空菜单
          this.$store.commit('initRoutes', []);
          this.$router.replace('/');
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      }
      if (command === 'userInfo') {
        this.$router.push('/userInfo');
      }
    }
  }
}
</script>

<style scoped>
.homeHeader {
  /*background: #ffffff;*/
  background: #0e57a2;
  display: flex;
  /*居中*/
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  box-sizing: border-box;

}

.homeHeader .title {
  font-size: 20px;
  font-family: "Trebuchet MS";
  color: white;
}

.homeHeader .title .sub-title {
  font-size: 10px;
  font-family: 微软雅黑;
  color: white;
}

.homeHeader .userInfo {
  cursor: pointer;
}

.el-dropdown-link img {
  width: 48px;
  height: 48px;
  border-radius: 24px;
  margin-left: 8px;
  /*color: white;*/
}

.el-dropdown-link {
  color: white;
}

.homeInitPage {
  text-align: center;
  font-size: 30px;
  font-family: 微软雅黑;
  padding-top: 50px;
}

.homeRouterView {
  margin-top: 30px;
}

.el-image-logo {
  width: 150px;
  height: 150px;
  /*margin-left: -30px;*/
}


.wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  /*background-image: linear-gradient(to left bottom, #ffffff, #f4f3f4, #e9e8e9, #dedcdd, #d4d1d1);*/
  width: 100%;
  /*height: 100vh;*/
}

.left, .right{
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: center;
  margin: 10px;
  flex:1;
}

.left{
  width:500px;
  align-items: flex-start;
  margin-right: 200px;
}

.right{
  width:500px;
  align-items: flex-end;
}

.todo-today{

}

.todo-repo{
  margin-top: 20px;
}


</style>
