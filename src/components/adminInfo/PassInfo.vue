<template>
  <div>
    <div>
      <el-menu :default-active="activeIndex" class="userMenu" mode="horizontal" @select="handleSelect" router>
        <el-menu-item index="/userInfo">个人信息</el-menu-item>
        <el-submenu index="2">
          <template slot="title">密码相关</template>
          <el-menu-item index="/passInfo">密码修改</el-menu-item>
          <el-menu-item index="/findPassword">密码保护</el-menu-item>
        </el-submenu>
        <el-menu-item index="/messageCenter">消息中心</el-menu-item>
      </el-menu>
    </div>
    <div  class="passWordMenu">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
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
  </div>
</template>

<script>
export default {
  name: "PassInfo",
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
    return {
      admin: null,
      adminDisplay: null,
      // dialogVisible: false,
      // passwordDialogVisible: false,
      ruleForm: {
        oldPass: '',
        pass: '',
        checkPass: '',
        adminId: ''
      },
      rules: {
        oldPass: [
          {validator: validatePass, trigger: 'blur'}
        ],
        pass: [
          {validator: validatePass, trigger: 'blur'}
        ],
        checkPass: [
          {validator: validatePass2, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    updatePassword(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.ruleForm.adminId = this.admin.id;
          console.log(this.ruleForm);
          this.putRequest('/admin/password/', this.ruleForm).then(resp=>{
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
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleSelect(index) {
      this.$router.push(index);
    }
  }
}
</script>

<style scoped>
.userMenu {
  display: flex;
  justify-content: flex-end;
}

.passWordMenu {
  margin-top: 20px;
}

.ruleForm {
  width: 30%;
}


</style>