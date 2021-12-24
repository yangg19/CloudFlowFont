<template>
  <div>
    <!--    <div>-->
    <!--      <img :src="logo1">-->
    <!--    </div>-->
    <div>

      <el-form :rules="rules"
               ref="loginForm"
               v-loading="loading"
               element-loading-text="正在登录"
               element-loading-spinner="el-icon-loading"
               element-loading-background="rgba(0, 0, 0, 0.8)"
               :model="loginForm"
               class="loginContainer">
        <h3 class="loginTitle">用户登录</h3>
        <el-form-item label="账号" prop="username">
          <el-input type="text" auto-complete="false" placeholder="请输入用户名" v-model="loginForm.username"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input type="password" auto-complete="false" placeholder="请输入密码" v-model="loginForm.password"></el-input>
        </el-form-item>

        <!--        <el-checkbox v-model="checked" class="checkBox">记住我</el-checkbox>-->

<!--        <el-form-item prop="code" style="transform: translateY(10px)">-->
<!--          <el-input class="captchaBox" type="code" auto-complete="false" placeholder="点击图片更换验证码"-->
<!--                    v-model="loginForm.code"-->
<!--                    style="width:230px; margin-right: 10px; transform: translateY(-15px)">-->
<!--          </el-input>-->
<!--          <img :src="captchaUrl" @click="updateCaptcha" style="">-->
<!--        </el-form-item>-->

        <el-button type="primary" style="width: 100%; transform: translateY(10px)" class="login-button"
                   @click="submitLogin">登录
        </el-button>

      </el-form>
    </div>
  </div>
</template>

<script>

export default {
  name: "Login",
  data() {
    return {
      logo1: require("../assets/CloudFlow.png"),
      // captchaUrl: '/captcha?time=' + new Date(), // 确保验证码能够正确刷新
      loginForm: {
        username: 'admin',
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
          // this.loading = true;
          this.postRequest('/login', this.loginForm).then(resp => {
            // 如果有返回值，跳转到home
            if (resp) {
              this.loading = false;
              // 从返回报文中获取token
              const tokenStr = resp.obj.tokenHead + resp.obj.token;
              // 存储用户token
              window.sessionStorage.setItem('tokenStr', tokenStr);
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
.loginContainer {
  /*圆角边框*/
  border-radius: 10px;
  /*规定背景的绘制区域*/
  background-clip: padding-box;
  /*外边距属性。*/
  margin: 180px auto;
  /*内边距属性*/
  padding: 5px 35px 70px 35px;
  /*宽度*/
  width: 350px;
  /*背景颜色*/
  background: #fff;
  /*线属性*/
  border: 2px solid #dcdfe6;
  /*!*阴影*!*/
  /*box-shadow: 0 0 25px #cac6c6;*/
}

.loginTitle {
  /*margin:0px auto 40px auto;*/
  text-align: center;
  font-size: 25px;
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

</style>