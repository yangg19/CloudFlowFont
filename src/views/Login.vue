<template>
  <div class="wrap">
    <div class="container">
      <div class="left">
        <h1>TEAMPARK</h1>
        <p>问答系统，知识检索，尽在协作公园</p>
<!--        <p>工作统计，进度跟踪，尽在协作公园</p>-->

      </div>
      <div class="right">
        <el-form action=""
                 :rules="rules"
                 ref="loginForm"
                 v-loading="loading"
                 element-loading-text="正在登录"
                 :model="loginForm"
                 @keydown.enter.native="submitLogin"
                 class="right-con">
          <div class="inputBox">
            <el-form-item prop="username">
              <el-input type="text" placeholder="用户名" v-model="loginForm.username" size="big"> </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" placeholder="密码" v-model="loginForm.password" size="big"> </el-input>
            </el-form-item>
          </div>

          <el-button class="loginBtn" @click="submitLogin">登录</el-button>
          <el-button class="forget" @click="showAddAdminView">忘记密码?</el-button>
<!--          <a href="" class="forget" @click="open">忘记密码?</a>-->
          <div class="sign-up">
<!--            <a href="" class="signupBtn">新建账户</a>-->
            <el-button class="signupBtn" @click="showAddAdminView">新建账户</el-button>

          </div>
        </el-form>
<!--        <p><b>新建账户服务</b>目前直接联系管理员即可</p>-->
<!--        <p><b>众人拾柴</b> 火焰高.</p>-->
      </div>
      <div>
        <el-dialog
            title="创建你的账号"
            class="addDialog"
            :visible.sync="dialogVisible"
            width="30%">
          <div>
            <span style="margin-bottom: 20px; font-weight: bold; display: flex">请填写真实信息，定期清理不规范账户</span>

            <el-form ref="registerForm" :model="registerMainInfo" :rules="registerRules">
              <el-row>
                <el-col :span="24">
                  <el-form-item prop="username">
                    <el-input class="inputAdmin"
                              v-model="registerMainInfo.username"
                              placeholder="用户名">
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item prop="password">
                    <el-input class="inputAdmin"
                              type="password"
                              v-model="registerMainInfo.password"
                              placeholder="密码">
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item prop="name">
                    <el-input class="inputAdmin"
                              v-model="registerMainInfo.name"
                              placeholder="姓名">
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item prop="workID">
                    <el-input class="inputAdmin"
                              v-model="registerMainInfo.workID"
                              placeholder="工号">
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item prop="email">
                    <el-input class="inputAdmin"
                              v-model="registerMainInfo.email"
                              placeholder="电子邮箱">
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item prop="phone">
                    <el-input class="inputAdmin"
                              v-model="registerMainInfo.phone"
                              placeholder="手机号码">
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="doRegister" style="background: #0e57a2; border-color: #0e57a2">确 定</el-button>
          </span>
        </el-dialog>
      </div>
      <div class="groupCopyright">
        <h5 style="color: #5a5959">Copyright©2022 研发A8团队</h5>
        <h5 style="color: #5a5959">如有任何问题，请联系 yangg19@spdb.com.cn</h5>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  name: "Login",
  data() {
    return {
      registerMainInfo: {
        name: '',
        email: '',
        workID: '',
        username: '',
        password: '',
        phone: '',
        enabled: true,
        userFace: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
      },
      registerSubInfo: {
        gender: '',
        birthday: '1900-01-01',
        idCard: '',
        wedlock: '',
        nationId: 57,
        nativePlace: '',
        politicId: 13,
        telephone: '',
        address: '',
        jobLevelId: 1,
        posId: 1,
        tiptopDegree: '',
        specialty: '',
        school: ''
      },
      // captchaUrl: '/captcha?time=' + new Date(), // 确保验证码能够正确刷新
      loginForm: {
        username: '',
        password: '',
        // code: ''
      },
      loading: false,
      checked: true,
      rules: {
        username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
        password: [{required: true, message: '请输入密码', trigger: 'blur'}],
        // code: [{required: true, message: '请输入验证码', trigger: 'blur'}]
      },
      dialogVisible: false,
      registerRules:{
        name: [{required: true, message: '请输工姓名', trigger: 'blur'}],
        email: [{required: true, message: '请输入邮箱地址', trigger: 'blur'},
          {type:'email', message: '邮箱地址格式不正确', trigger: 'blur'}],
        phone: [{required: true, message: '请输入电话', trigger: 'blur'}],
        workID: [{required: true, message: '请输入工号', trigger: 'blur'}],
        username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
        password: [{required: true, message: '请输入密码', trigger: 'blur'}]
      }
    }
  },
  mounted() {
    this.directLogin()
  },
  methods: {
    doRegister() {
      console.log(this.registerMainInfo)
      console.log(this.registerMainInfo)

      this.$refs['registerForm'].validate(valid=>{
        if(valid) {
          console.log(this.registerMainInfo)
          this.postRequest('/register', this.registerMainInfo).then(resp=> {
            if(resp) {
              this.dialogVisible = false;
            }
          })
        }
      })
    },
    showAddAdminView(){
      console.log(this.registerMainInfo)

      this.dialogVisible = true;
    },
    // // 更新验证码方法
    // updateCaptcha() {
    //   this.captchaUrl = '/captcha?time=' + new Date()
    // },
    directLogin() {
      this.$router.replace('/home');
    },
    // 登录方法
    submitLogin() {
      this.$refs['loginForm'].validate((valid) => {
        if (valid) {
          this.postRequest('/login', this.loginForm).then(resp => {
            // 如果有返回值，跳转到home
            if (resp) {
              this.loading = true;
              // 从返回报文中获取token
              const tokenStr = resp.obj.tokenHead + resp.obj.token;
              // 存储用户token
              window.sessionStorage.setItem('tokenStr', tokenStr);
              setTimeout(() => {
                this.loading = false;
              }, 200);
              // 跳转首页
              this.$router.replace('/home');
            }
          })
        } else {
          this.$message.error('请输入所有字段！');
          return false;
        }
      });
    }
  }
}
</script>

<style scoped>

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.wrap{
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f2f5;
  /*background-image: linear-gradient(to left bottom, #ffffff, #f4f3f4, #e9e8e9, #dedcdd, #d4d1d1);*/
  width: 100%;
  height: 100vh;
  /*margin: 10px;*/
}

.container{
  width:100%;
  height:100%;
  display: flex;
  /*justify-content: space-around	;*/
  align-items: center;
}

.left, .right, form{
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
  align-items: flex-end;
  margin-right: 200px;
}

.right{
  width:500px;
  align-items: flex-start;
}

.left h1{
  font-family: "facebook letter faces";
  font-size: 60px;
  color: #0e57a2;
  align-items: flex-start;
}

.left p{
  font-size: 30px;
  color:#1c1e21;
  height: 200px;
  font-family: "Roboto Condensed", sans-serif;
  display: flex;
  align-items: flex-start;
}



.right-con{
  background-color: white;
  border-radius: 10px;
  width:400px;
  display: flex;
  padding: 20px;
  margin-bottom: 25px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
}

.right-con input{
  width: 100%;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #999;
  outline: none;
  font-size: 16px;
}

/deep/ .el-input__inner{
  height: 58px;
}

.inputBox{
  width: 100%;
  margin-bottom: 10px;
  outline: none;
  font-size: 16px;
}

.loginBtn{
  background-color: #0e57a2;
  padding: 15px;
  text-align: center;
  text-decoration: none;
  width: 100%;
  height: 58px;
  border-radius: 5px;
  color: white;
  font-size: 20px;
  font-family: 'Arial';
  font-weight: 700;
  transition: 0.5s;
}

.loginBtn:hover{
  background-color: #4257b2;
}

.forget{
  border-color: white;
  margin: 5px 0;
  text-decoration: none;
  color: #1877f2;
  font-family: 'Arial';
  font-size: 14px;
  /*height: 8px;*/
  margin-right: 9px;
}

.sign-up{
  padding-top: 20px;
  border-top: 1px solid #999;
  width: 100%;
  display: flex;
  justify-content: center;
}

.signupBtn{
  background-color: #13a305;
  padding: 15px;
  height: 55px;
  text-align: center;
  text-decoration: none;
  border-radius: 5px;
  color: white;
  font-size: 17px;
  font-family: 'Arial';
  font-weight: 600;
  transition: 0.5s;
}

.signupBtn:hover{
  background-color: green;
}

.right p{
  font-family: 'Arial';
  font-size: 15px;
  margin-left: 155px;
}

@media(max-width:950px){
  .container{
    flex-direction: column;
  }

  .left{
    width: 400px;
    align-content: center;
    align-items: center;
  }

  .left p{
    height: 75px;
  }
}

.groupCopyright {
  position: absolute;
  bottom: 0;
  width: 100%;
  margin-bottom: 20px;
  text-align: center;
}

.addDialog /deep/.el-dialog {
  border-radius: 10px;
  font-weight: bold;
  /*box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);*/
}

.el-row {
  width: 100%;
  /*margin-bottom: 10px;*/
  border-radius: 5px;
  outline: none;
  font-size: 16px;
}

.inputAdmin /deep/ .el-input__inner{
  height: 50px;
  /*box-sizing: border-box;*/
  /*-moz-box-sizing: border-box;*/
  /*-webkit-box-sizing: border-box;*/

}


</style>