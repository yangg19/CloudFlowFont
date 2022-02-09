<template>
  <div>
    <el-container>
      <el-header class="homeHeader">
          <div>
            <el-image :src="require('../img/TEAMPARK5.png')" fit="contain" class="el-image-logo"></el-image>
          </div>
        <span style="color: white; font-size: 15px; position: absolute; right: 65px" >
                    {{user.name}}
        </span>
        <el-dropdown class="userInfo" @command="commandHandler">
          <span class="el-dropdown-link">
<!--            <el-avatar icon="el-icon-user-solid"></el-avatar>-->
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
          <el-menu router
                   :default-openeds="openeds">
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
                <div class="container">
                  <div class="left">
                    <div>
                      <el-card class="box-card">
                        <div slot="header" class="clearfix">
                          <span>通知</span>
<!--                          <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
                        </div>
                        <div style="font-size: 20px; text-align:left; font-family: 新宋体">
                          各位同事好：
                        </div>
                        <div>
                          &nbsp
                        </div>
                        <div style="font-size: 20px; text-align:left; font-family: 新宋体">
                          &nbsp&nbsp<span v-text="noticeContent1"> </span>
                        </div>
                        <div style="font-size: 20px; text-align:left; font-family: 新宋体; margin-top: 10px">
                          &nbsp&nbsp<span v-text="noticeContent2"> </span>
                        </div>
                        <div style="font-size: 20px; text-align:left; font-family: 新宋体; margin-top: 10px">
                          &nbsp&nbsp<span v-text="noticeContent3"> </span>
                        </div>
                        <div style="font-size: 20px; text-align:right; font-family: 新宋体; margin-top: 30px;">
                          &nbsp&nbsp<span v-text="creatDate"> </span>
                        </div>

                      </el-card>
                    </div>
                  </div>
                  <div class="right">
                    <el-tabs class="todolistTab"
                             v-model="activeName"
                             @tab-click="handleClick"
                             stretch
                             type="border-card">
                      <el-tab-pane label="任务清单" name="ProTask">
                        <ProTask v-if="isProTaskUpdate"></ProTask>
                      </el-tab-pane>
                      <el-tab-pane label="完成任务" name="ComTask">
                        <ComTask v-if="isComTaskUpdate"></ComTask>
                      </el-tab-pane>
                      <el-tab-pane label="删除任务" name="DelTask">
                        <DelTask v-if="isDelTaskUpdate"></DelTask>
                      </el-tab-pane>
                    </el-tabs>
                  </div>
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

import ComTask from "../components/todolist/ComTask";
import ProTask from "../components/todolist/ProTask";
import DelTask from "../components/todolist/DelTask";

export default {
  name: "Home",
  data() {
    return {
      isProTaskUpdate:true,
      isComTaskUpdate:false,
      isDelTaskUpdate:false,
      calendarDate: new Date(),
      activeName: 'ProTask',
      openeds:['0','1','2','3'],
      addDialogVisible: false,
      repoDialogVisible: false,
      finishDialogVisible: false,
      unfinishDialogVisible: false,
      type:'',
      user: JSON.parse(window.sessionStorage.getItem('user')), // 将获取的用户信息转换为对象
      noticeContent1:'',
      noticeContent2:'',
      noticeContent3:'',
      creatDate:''

    }
  },
  components:{
    ComTask,
    ProTask,
    DelTask
  },
  computed: {
    routes() {
      this.notice();
      console.log(this.$store.state.routes)
      return this.$store.state.routes;
    }
  },
  methods:{
    notice() {
      this.getRequest('/billboard/').then(resp=>{
        if(resp) {
          this.noticeContent1 = resp.noticeContent1;
          this.noticeContent2 = resp.noticeContent2;
          this.noticeContent3 = resp.noticeContent3;
          this.creatDate = resp.creatDate;

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
    handleClick(tab) {
      if(tab.name === "ProTask") {
        this.isProTaskUpdate = true;
        this.isComTaskUpdate = false;
        this.isDelTaskUpdate = false;
      } else if(tab.name === "ComTask") {
        this.isProTaskUpdate = false;
        this.isComTaskUpdate = true;
        this.isDelTaskUpdate = false;
      } else if(tab.name == "DelTask") {
        this.isProTaskUpdate = false;
        this.isComTaskUpdate = false;
        this.isDelTaskUpdate = true;
      }
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
          // this.$message({
          //   type: 'info',
          //   message: '已取消'
          // });
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
  /*box-shadow: 0 8px 4px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);*/

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
  width: 40px;
  height: 40px;
  border-radius: 24px;
  margin-left: 8px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);

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
  width: 130px;
  height: 100px;
  /*margin-left: -30px;*/
}


*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.wrap{
  display: flex;
  /*justify-content: center;*/
  /*align-items: center;*/
  /*background-color: #f0f2f5;*/
  /*background-image: linear-gradient(to left bottom, #ffffff, #f4f3f4, #e9e8e9, #dedcdd, #d4d1d1);*/
  width: 100%;
  /*height: 100vh;*/
  /*margin: 10px;*/
}

.container{
  width:100%;
  height:100%;
  display: flex;
  /*justify-content: space-around	;*/
  /*align-items: center;*/
}

.left, .right, form{
  display: flex;
  flex-direction: column;
  /*align-content: center;*/
  /*align-items: center;*/
  /*justify-content: center;*/
  margin: 10px;
  flex:1;
}

.left{
  /*width:500px;*/
  align-items: flex-end;
  margin-right: 100px;
}

.right{
  /*width:500px;*/
  align-items: flex-start;
}

.calendarDate {

  /*margin: 20px;*/
  width: 90%;
  font-size: 20px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);

}

.todolistTab {
  /*height: calc(100vh - 110px);*/

  /*overflow-y: auto;*/
}
.todolistTab {
  /*height: calc(100vh - 110px);*/
  /*overflow-y: auto;*/
  /*border-radius: 15px;*/
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
}

.box-card {
  width: 700px;
  height: 700px;
  padding: 10px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);

}

</style>
