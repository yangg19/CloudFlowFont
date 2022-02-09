<template>
  <div>
    <div>
      <el-menu class="userMenu" mode="horizontal" @select="handleSelect" router>
        <el-menu-item index="/userInfo">个人信息</el-menu-item>
        <el-menu-item index="/passInfo">密码保护</el-menu-item>

<!--        <el-submenu index="2">-->
<!--          <template slot="title">密码相关</template>-->
<!--          <el-menu-item index="/passInfo">密码修改</el-menu-item>-->
<!--          <el-menu-item index="/findPassword">密码保护</el-menu-item>-->
<!--        </el-submenu>-->
<!--        <el-menu-item index="/messageCenter">消息中心</el-menu-item>-->
      </el-menu>
    </div>
    <div class="avatarInfo">
      <img title="点击修改用户头像" :src="admin.userFace" class="avatarImage" alt="">
      <span style="margin-top: 50px">
        <span style="font-size: 20px;font-weight: bolder; margin-left: 30px">{{admin.name}}</span>
        <div style="margin-left: 30px; margin-top: 10px; font-size: 15px; font-family: '微软雅黑 Light'">{{admin.remark}}</div>
      </span>
    </div>
        <el-divider></el-divider>

    <div class="userInfoDisplay">
      <el-descriptions  title="个人信息" :column="3" size="medium" border>
        <template slot="extra">
          <el-button type="primary"
                     @click="showUpdateAdminInfoView"
                     style="background: #0e57a2;border-color: #0e57a2"
                     size="small">
            修改信息
          </el-button>
          <el-button type="danger"
                     @click="showUpdatePasswordView"
                     size="small">
            修改密码
          </el-button>
        </template>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            姓名
          </template>
          {{ admin.name }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            域名
          </template>
          {{ admin.username }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-mobile-phone"></i>
            工号
          </template>
          {{ admin.workID }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-mobile-phone"></i>
            邮箱
          </template>
          {{ admin.email }}
        </el-descriptions-item>
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
<!--        <el-descriptions-item>-->
<!--          <template slot="label">-->
<!--            <i class="el-icon-tickets"></i>-->
<!--            备注-->
<!--          </template>-->
<!--          <el-tag size="small">{{ admin.remark }}</el-tag>-->
<!--        </el-descriptions-item>-->
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-tickets"></i>
            组别
          </template>
          <el-tag size="small">{{ admin.workGroup }}</el-tag>
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
          class="adminDialog"
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
          <el-button type="primary" @click="updateAdminInfo" style="background: #0e57a2;border-color: #0e57a2">确定</el-button>
        </span>
      </el-dialog>
    </div>
    <div>
      <el-dialog  title="更新密码"
                  class="passDialog"
                  :visible.sync="passwordDialogVisible"
                  width="30%">
        <div>
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="旧密码" prop="oldPass">
              <el-input type="password" v-model="ruleForm.oldPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="pass">
              <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认新密码" prop="checkPass">
              <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="updatePassword('ruleForm')">提交</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return{
      admin: null,
      adminDisplay: null,
      dialogVisible: false,
      passwordDialogVisible: false,
      ruleForm: {
        oldPass: '',
        pass:'',
        checkPass: '',
        adminId: ''
      },
      rules: {
        oldPass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }

    }
  },
  mounted() {
    this.initAdmin();
  },
  methods:{
    updatePassword(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.ruleForm.adminId = this.admin.id;
          console.log(this.ruleForm);
          this.putRequest('/system/admin/password', this.ruleForm).then(resp=>{
            if(resp) {
              // 更新密码成功后，退出登录
              this.postRequest('/logout');
              // 清除数据
              window.sessionStorage.removeItem('user');
              window.sessionStorage.removeItem('tokenStr');
              // 菜单初始化
              this.$store.commit('initRoutes', []);
              // 跳转
              this.$router.replace('/');
            }
          });
        } else {
          console.log('修改密码失败!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    showUpdatePasswordView() {
      this.passwordDialogVisible = true;
    },
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
  /*background-image: linear-gradient(to left top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1);*/
  /*background: #605d54;*/
}

.avatarInfo .avatarImage {
  margin-top:20px;
  /*margin-left:30px;*/
  height: 100px;
  width: 100px;
  border-radius: 100px
}

.passDialog /deep/.el-dialog {
  border-radius: 8px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
}

.adminDialog /deep/.el-dialog {
  border-radius: 8px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
}
</style>