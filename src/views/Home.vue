<template>
  <div>
    <el-container>
      <el-header class="homeHeader">
        <div class="title">CloudFlow
          <div class="sub-title">
            飞流工作管理
          </div>
        </div>
        <el-dropdown class="userInfo" @command="commandHandler">
          <span class="el-dropdown-link">
            {{user.username}}
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
          <el-menu router unique-opened>
            <el-submenu :index="index + ''"
                        v-for="(item, index) in routes"
                        :key="index"
                        v-if="!item.hidden">
              <template slot="title">
                <i :class="item.iconCls" style="color:#0e57a2; margin-right: 10px"></i>
                <span>{{ item.name }}</span>
              </template>
              <el-menu-item :index="children.path"
                            v-for="(children, indexj) in item.children">
                {{ children.name }}
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>

        <el-main>
          <el-breadcrumb separator-class="el-icon-arrow-right" v-if="this.$router.currentRoute.path!=='/home'">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{this.$router.currentRoute.name}}</el-breadcrumb-item>
          </el-breadcrumb>
          <div class="homeInitPage" v-if="this.$router.currentRoute.path==='/home'">
            欢迎来到飞流工作管理系统
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
      user: JSON.parse(window.sessionStorage.getItem('user')) // 将获取的用户信息转换为对象
    }
  },
  computed: {
    routes() {
      return this.$store.state.routes;
    }
  },
  methods:{
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
    }
  }
}
</script>

<style scoped>
.homeHeader {
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


</style>