<template>
  <div class="wrap">
    <div class="container">
      <div class="left">
        <h1>TEAMPARK</h1>
        <p>问答系统，知识检索，尽在协作公园</p>
      </div>
      <div class="right">
        <el-form action=""
                 :rules="rules"
                 ref="loginForm"
                 v-loading="loading"
                 element-loading-text="正在登录"
                 :model="loginForm"
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
          <a href="" class="forget">忘记密码?</a>
          <div class="sign-up">
            <a href="" class="signupBtn">新建账户</a>
          </div>
        </el-form>
<!--        <p><b>新建账户服务</b>目前直接联系管理员即可</p>-->
        <p><b>众人拾柴</b> 火焰高.</p>
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
      // imgSrc:require('../img/background.png'),
      // logo1: require("../assets/CloudFlow.png"),
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
      }
    }
  },
  methods: {
    // // 更新验证码方法
    // updateCaptcha() {
    //   this.captchaUrl = '/captcha?time=' + new Date()
    // },
    // 登录方法
    submitLogin() {
      this.$refs['loginForm'].validate((valid) => {
        if (valid) {
          this.loading = true;
          this.postRequest('/login', this.loginForm).then(resp => {
            // 如果有返回值，跳转到home
            if (resp) {
              // this.loading = false;
              // 从返回报文中获取token
              const tokenStr = resp.obj.tokenHead + resp.obj.token;
              // 存储用户token
              window.sessionStorage.setItem('tokenStr', tokenStr);
              setTimeout(() => {
                this.loading = false;
              }, 200);
              // 跳转首页
              this.$router.replace('/home');

              // let path = this.$route.query.redirect;
              // this.$router.replace((path === '/' || path === undefined) ? '/home' : path);
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

.right{
  width:500px;
  align-items: flex-start;
}

form{
  background-color: white;
  border-radius: 10px;
  width:400px;
  display: flex;
  padding: 20px;
  margin-bottom: 25px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
}

form input{
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
  margin: 15px 0;
  text-decoration: none;
  color: #1877f2;
  font-family: 'Arial';
  font-size: 14px;
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



</style>