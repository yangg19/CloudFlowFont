<template>
  <div>
    <div class="wrap">
      <div class="form">
        <div class="left">
          <video src="../assets/video.mp4" muted loop autoplay></video>
        </div>
        <div class="right">
          <el-form :rules="rules"
                   ref="loginForm"
                   v-loading="loading"
                   element-loading-text="正在登录"
                   :model="loginForm"
                   class="right-con">
            <el-image :src="require('../img/teampark3.png')" fit="contain" class="el-image-logo"></el-image>
            <div class="loginMain">
              <el-form-item label="账号" prop="username" size="big" style="font-size: 20px">
                <el-input type="text" auto-complete="false" placeholder="请输入用户名" v-model="loginForm.username"></el-input>
              </el-form-item>

              <el-form-item label="密码" prop="password" size="big">
                <el-input type="password" auto-complete="false" placeholder="请输入密码" v-model="loginForm.password"></el-input>
              </el-form-item>
              <el-button type="primary" style="transform: translateY(10px)" class="login-button"
                         @click="submitLogin" size="big">登录TEAMPARK
              </el-button>
            </div>
          </el-form>
        </div>
      </div>
    </div>
    <div class="groupCopyright">
      <h5 style="color: #5a5959">copyright©2022 研发A8团队</h5>
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
        username: 'yangg',
        password: '123',
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

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.wrap {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #dde4e6;
  /*background-image: linear-gradient(to left top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1);*/
}

.form{
  width:900px;
  height:560px;
  display: flex;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 25px 45px rgba(0,0,0,0.1);
}

.left{
  width: 500px;
  height: 560px;
}

.left video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.right {
  width: 400px;
  height: 560px;
  background: rgba(255, 255, 255, .9);
  display: flex;
  align-items: center;
  justify-content: center;
}

.right-con{
  width: 70%;
  display: flex;
  flex-direction: column;
  text-align: center;
}


.login-button {
  background: #0e57a2;
  border-color: #0e57a2;
  /*color: #0e57a2;*/
}

/*.checkBox {*/
/*  !*background: #0e57a2;*!*/
/*  !*border-color: #0e57a2;*!*/
/*  !*color: #0e57a2;*!*/
/*}*/

.el-image-logo {
  /*display: inline-block;*/
  width: 220px;
  /*float: right;*/
  position: relative;
  margin-left: 10%;
  /*margin-left: 400px;*/
}

.login-button {
  width: 100%;
  height: 40px;
  /*border-radius: 20px;*/
  border: none;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  margin-top: 30px;
  /*background-image: linear-gradient(120deg, #76daec 0%, #c5a8de 100%);*/
}

.loginMain {
  margin-top: 40px
}

.groupCopyright {
  position: absolute;
  bottom: 0;
  width: 100%;
  margin-bottom: 20px;
  text-align: center;
}

</style>