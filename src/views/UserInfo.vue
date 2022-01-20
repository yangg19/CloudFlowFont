<template>
  <div>
    <el-card class="box-card" style="width: 400px">
      <div slot="header" class="clearfix">
        <span>{{admin.name}}</span>
      </div>
      <div>
        <div style="display: flex; justify-content: center">
          <img title="点击修改用户头像" :src="admin.userFace" style="height: 100px; width: 100px; border-radius: 50px" alt="">
        </div>

        <div>
          <div style="font-size: 15px">
            <div style="margin-top: 10px">
            <span style="font-weight: bold">
              手机号码：
            </span>
              <el-tag>{{admin.phone}}</el-tag>
            </div>
            <div style="margin-top: 10px">
            <span style="font-weight: bold">
              电话号码：
            </span>
              <el-tag>{{admin.telephone}}</el-tag>
            </div>
            <div style="margin-top: 10px">
            <span style="font-weight: bold">
              联系地址：
            </span>
              <el-tag>{{admin.address}}</el-tag>
            </div>
            <div style="margin-top: 20px">
              <span style="font-weight: bold">
                用户标签：
              </span>
              <el-tag type="success" v-for="(r, index) in admin.roles" :key="index" style="margin-left: 7px">{{r.nameZh}}</el-tag>
            </div>
          </div>
          <div style="display: flex; justify-content: space-around; margin-top: 50px">
            <el-button type="primary" @click="showUpdateAdminInfoView">修改信息</el-button>
            <el-button type="danger" @click="showUpdatePasswordView">修改密码</el-button>
          </div>
        </div>
      </div>

    </el-card>
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
    <el-dialog  title="更新密码"
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
    initAdmin() {
      this.getRequest('/admin/info/').then(resp=>{
        this.admin = resp;
        // 拷贝admin信息用于展示
        this.adminDisplay = Object.assign({},this.admin)
      })
    }
  }
}
</script>

<style scoped>
.clearfix{
  font-weight: bolder;
  font-size: 25px;
}

</style>