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
              <i><img :src="require('../assets/' + user.userFace)"></i>
<!--            <img :src="imgPath" fit="contain" class="avatarImage"></img>-->
          </span>

          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="userInfo">个人中心</el-dropdown-item>
<!--            <el-dropdown-item command="setting">设置</el-dropdown-item>-->
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
          <div>
            <el-breadcrumb separator-class="el-icon-arrow-right"
                           v-if="this.$router.currentRoute.path!=='/home'">
              <el-breadcrumb-item :to="{path:'/home'}">首页</el-breadcrumb-item>
              <el-breadcrumb-item>{{ this.$router.currentRoute.name }}</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div class="homeInitPage" v-if="this.$router.currentRoute.path==='/home'">
            <template>
              <div><HomePage title="标题"></HomePage></div>
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

import HomePage from "./emp/HomePage";

export default {
  name: "Home",
  data() {
    return {
      imgPath: '',
      openeds:['0','1','2','3'],
      admin: '',
      user: JSON.parse(window.sessionStorage.getItem('user')), // 将获取的用户信息转换为对象
    }
  },
  components:{
    HomePage
  },
  // mounted(){
  //   this.initAdmin()
  // },
  computed: {
    routes() {
      return this.$store.state.routes;
    }
  },
  methods:{
    // initAdmin() {
    //   this.getRequest('/admin/adminInfo').then(resp=>{
    //     // this.admin = resp;
    //     this.imgPath = require('../assets/' + resp.userFace);
    //     this.admin = resp;
    //     console.log(this.imgPath)
    //   })
    // },
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
  /*padding: 0;*/
  box-sizing: border-box;
}

</style>
