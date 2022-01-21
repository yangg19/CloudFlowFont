<template>
  <div>
    <div>
      <el-menu :default-active="activeIndex" class="userMenu" mode="horizontal" @select="handleSelect" router>
        <el-menu-item index="/userInfo">个人信息</el-menu-item>
        <el-submenu index="2">
          <template slot="title">密码相关</template>
          <el-menu-item index="/passInfo">密码修改</el-menu-item>
          <el-menu-item index="/findPassword">密码找回</el-menu-item>
        </el-submenu>
        <el-menu-item index="/messageCenter">消息中心</el-menu-item>
      </el-menu>
    </div>
    <div class="avatarInfo">
      <img title="点击修改用户头像" :src="admin.userFace" style="margin-top:20px; margin-left:30px; height: 150px; width: 150px; border-radius: 100px" alt="">
      <span>
        <h5 style="font-size: 40px; margin-left: 50px">{{admin.name}}</h5>
      </span>
      <!--      <span>-->
<!--        <h5 style="font-size: 30px; margin-left: 50px">{{admin.remark}}</h5>-->
<!--      </span>-->

    </div>
<!--    <el-divider></el-divider>-->
    <div class="userInfoDisplay">
      <el-descriptions  title="个人信息" :column="3" size="medium" border>
        <template slot="extra">
          <el-button type="primary" @click="showUpdateAdminInfoView" size="small">修改信息</el-button>
        </template>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            姓名
          </template>
          {{ admin.name }}
        </el-descriptions-item>
<!--        <el-descriptions-item>-->
<!--          <template slot="label">-->
<!--            <i class="el-icon-user"></i>-->
<!--            域名-->
<!--          </template>-->
<!--          {{ admin.username }}-->
<!--        </el-descriptions-item>-->
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-mobile-phone"></i>
            工号
          </template>
          {{ admin.workID }}
        </el-descriptions-item>
<!--        <el-descriptions-item>-->
<!--          <template slot="label">-->
<!--            <i class="el-icon-mobile-phone"></i>-->
<!--            邮箱-->
<!--          </template>-->
<!--          {{ admin.email }}-->
<!--        </el-descriptions-item>-->
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-mobile-phone"></i>
            座机号码
          </template>
          {{ admin.telephone }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-mobile-phone"></i>
            手机号
          </template>
          {{ admin.phone }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-mobile-phone"></i>
            出生日期
          </template>
          {{ admin.birthday }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-location-outline"></i>
            居住地
          </template>
          {{ admin.address }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-tickets"></i>
            备注
          </template>
          <el-tag size="small">{{ admin.remark }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-tickets"></i>
            角色
          </template>
          <el-tag size="small" v-for="(r, index) in admin.roles" :key="index" style="margin-left: 7px">{{ r.nameZh }}</el-tag>
        </el-descriptions-item>
      </el-descriptions>
    </div>
    <div>
      <el-dialog
          title="编辑用户信息"
          :visible.sync="dialogVisible"
          width="30%">
        <div>
          <table>
            <!--          <tr>-->
            <!--            <td>用户昵称：</td>-->
            <!--            <td><el-input v-model="adminDisplay.name"></el-input></td>-->
            <!--          </tr>-->
            <tr>
              <td>电话号码：</td>
              <td><el-input v-model="adminDisplay.telephone"></el-input></td>
            </tr>
            <tr>
              <td>手机号码：</td>
              <td><el-input v-model="adminDisplay.phone"></el-input></td>
            </tr>
            <tr>
              <td>用户地址：</td>
              <td><el-input v-model="adminDisplay.address"></el-input></td>
            </tr>
          </table>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="updateAdminInfo">确定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
  data() {
    return{
      admin: null,
      adminDisplay: null,
      dialogVisible: false,
      passwordDialogVisible: false,
    }
  },
  mounted() {
    this.initAdmin();
  },
  methods:{
    updateAdminInfo() {
      this.putRequest('/admin/info/', this.adminDisplay).then(resp=>{
        if(resp) {
          this.dialogVisible = false;
          this.initAdmin()
        }
      })
    },
    showUpdateAdminInfoView() {
      this.dialogVisible = true;
    },
    handleSelect(index) {
      this.$router.push(index);
    },
    initAdmin() {
      this.getRequest('/admin/info/').then(resp=>{
        this.admin = resp;
        // 拷贝admin信息用于展示
        this.adminDisplay = Object.assign({},this.admin)
      })
    }
  },
}
</script>

<style scoped>
.userInfoDisplay {
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 20px;

}
.userMenu {
  display: flex;
  justify-content: flex-end;
}

.avatarInfo{
  display: flex;
  justify-content: flex-start;
  border-radius: 20px;
  margin-top: 10px;
  margin-left: 20px;
  margin-right: 20px;

  /*background-image: url("../assets/blue.png");*/
  background: #f0f2f5;
}

</style>