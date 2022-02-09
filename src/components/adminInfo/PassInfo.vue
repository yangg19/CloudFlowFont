<template>
  <div>
    <div>
      <el-menu :default-active="activeIndex" class="userMenu" mode="horizontal" @select="handleSelect" router>
        <el-menu-item index="/userInfo">个人信息</el-menu-item>
        <el-menu-item index="/passInfo">密码保护</el-menu-item>
      </el-menu>
    </div>
    <div class="passWordMenu">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
        <el-form-item label="密码保护问题" prop="oldPass">
          <el-input v-model="ruleForm.passQuestion" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码保护答案" prop="pass">
          <el-input v-model="ruleForm.passAnswer" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updatePasswordInfo('ruleForm')">提交</el-button>
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
    var validatePassInfo = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密保信息'));
      }
    }
    return {
      admin: null,
      ruleForm: {
        passQuestion: '',
        passAnswer: ''
      },
      rules: {
        passQuestion: [
          {validator: validatePassInfo, trigger: 'blur'}
        ],
        passAnswer: [
          {validator: validatePassInfo, trigger: 'blur'}
        ]
      }
    }
  },
  mounted(){
    this.initAdmin();
  },
  methods: {
    updatePasswordInfo(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.ruleForm.adminId = this.admin.id;
          console.log(this.ruleForm);
          this.putRequest('/system/admin/passPro', this.ruleForm).then(resp=>{
            if(resp) {
              console.log('设置密保成功');
            }
          });
        } else {
          console.log('设置密保失败');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleSelect(index) {
      this.$router.push(index);
    },
    initAdmin() {
      this.getRequest('/admin/info/').then(resp=>{
        this.admin = resp;
        this.ruleForm.passQuestion = resp.passQuestion;
        this.ruleForm.passAnswer = resp.passAnswer
        // 拷贝admin信息用于展示
        this.adminDisplay = Object.assign({},this.admin)
      })
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