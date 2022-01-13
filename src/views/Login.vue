<template>

  <div class="backgroundWall">
    <div>
      <el-form :rules="rules"
               ref="loginForm"
               v-loading="loading"
               element-loading-text="正在登录"
               element-loading-spinner="el-icon-loading"
               element-loading-background="rgba(0, 0, 0, 0.8)"
               :model="loginForm"
               class="loginContainer">
        <div>
          <div class="introduce">
            <h3>
              协作公园
              <h3 class="introduceSub">
                问答、检索、梳理，致力提高团队知识利用
              </h3>
            </h3>
            <div class="el-image-introduce">
              <el-image :src="require('../img/left2.jpg')" fit="contain" style="width: 400px"></el-image>
            </div>

          </div>

          <div class="loginAll">
<!--            <h3 class="logoWord">-->
<!--              TEAMPARK-->
<!--            </h3>-->
            <el-image :src="require('../img/teampark3.png')" fit="contain" class="el-image-logo"></el-image>
            <div class="loginMain">
              <el-form-item label="账号" prop="username" size="big" style="font-size: 20px">
                <el-input type="text" auto-complete="false" placeholder="请输入用户名" v-model="loginForm.username" style="width: 350px"></el-input>
              </el-form-item>

              <el-form-item label="密码" prop="password" size="big">
                <el-input type="password" auto-complete="false" placeholder="请输入密码" v-model="loginForm.password" style="width: 350px"></el-input>
              </el-form-item>

              <!--        <el-checkbox v-model="checked" class="checkBox">记住我</el-checkbox>-->

              <!--        <el-form-item prop="code" style="transform: translateY(10px)">-->
              <!--          <el-input class="captchaBox" type="code" auto-complete="false" placeholder="点击图片更换验证码"-->
              <!--                    v-model="loginForm.code"-->
              <!--                    style="width:230px; margin-right: 10px; transform: translateY(-15px)">-->
              <!--          </el-input>-->
              <!--          <img :src="captchaUrl" @click="updateCaptcha" style="">-->
              <!--        </el-form-item>-->

              <el-button type="primary" style="width: 350px; transform: translateY(10px)" class="login-button"
                         @click="submitLogin" size="big">登录
              </el-button>
            </div>
          </div>

        </div>


      </el-form>
    </div>
  </div>
</template>

<script>

export default {
  name: "Login",
  data() {
    return {
      imgSrc:require('../img/background.png'),
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
  /*margin: 180px auto;*/
  /*外边距属性。*/
  margin:150px 300px 180px auto;
  /*内边距属性 上 右 下 左*/
  padding: 50px 50px 80px 85px;
  /*宽度*/
  width: 1000px;
  /*高度*/
  height: 450px;
  /*背景颜色*/
  background: #fff;
  /*线属性*/
  border: 2px solid #dcdfe6;
  /*!*阴影*!*/
  box-shadow: 0 0 1px #cac6c6;
}

.loginMain {
  /*margin-left: 400px;*/
  /*display: inline-block;*/
}

.loginAll {
  display: inline-block;
  position: relative;
  margin-right: 8%;
  margin-top: 3%;
  float: right;

}

.introduce {
  text-align: left;
  font-size: 25px;
  display: inline-block;
  /*margin-top: 5%;*/
}

.introduceSub {
  text-align: left;
  font-size: 18px;
  font-family: "微软雅黑 Light";
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
  display: inline-block;
  width: 300px;
  float: right;
  position: relative;
  margin-right: 5%;
  /*margin-left: 400px;*/
}

.el-image-introduce {
  display: inline-block;
  width: 200px;

}

/*.logoWord {*/
/*  font-size: 35px;*/
/*  color: #0e57a2;*/
/*  margin-left: 70px;*/
/*  !*float: right;*!*/
/*}*/

.backgroundWall {
  /*background: url("../img/blue.png") center center no-repeat;*/
  background: #f0f2f5;
  width: 100%;
  height: 100%;
  position: fixed;
  /*background-size: 100% 100%;*/
}
</style>