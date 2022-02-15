<template>
  <div>
    <div>
      <el-menu class="userMenu" mode="horizontal" router @select="handleSelect">
        <el-menu-item index="/userInfo">个人信息</el-menu-item>
        <el-menu-item index="/passInfo">密码保护</el-menu-item>
      </el-menu>
    </div>
    <div class="avatarInfo">
      <el-upload
        action="/admin/uploadAvatar"
        :headers="headers"
        :show-file-list="false"
        :on-success="onSuccess"
      >
        <img title="点击修改用户头像" :src="imgPath" fit="contain" class="avatarImage" alt="">
      </el-upload>
      <span style="margin-top: 50px">
        <span style="font-size: 20px;font-weight: bolder; margin-left: 30px">{{ admin.name }}</span>
        <!--        <div style="margin-left: 30px; margin-top: 10px; font-size: 15px; font-family: '微软雅黑 Light'">{{admin.remark}}</div>-->
      </span>
    </div>
    <el-divider />

    <div class="userInfoDisplay">
      <el-descriptions v-if="admin" title="个人信息" :column="3" size="medium" border>
        <template slot="extra">
          <el-button
            type="primary"
            style="background: #0e57a2;border-color: #0e57a2"
            size="small"
            @click="showUpdateAdminInfoView"
          >
            修改信息
          </el-button>
          <el-button
            type="danger"
            size="small"
            @click="showUpdatePasswordView"
          >
            修改密码
          </el-button>
        </template>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user" />
            姓名
          </template>
          {{ admin.name }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user" />
            性别
          </template>
          {{ admin.gender }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-date" />
            出生日期
          </template>
          {{ admin.birthday }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user" />
            民族
          </template>
          {{ admin.nation.name }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-location-outline" />
            籍贯
          </template>
          {{ admin.nativePlace }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user" />
            政治面貌
          </template>
          {{ admin.politicsStatus.name }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user" />
            用户名
          </template>
          {{ admin.username }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-coffee-cup" />
            工号
          </template>
          {{ admin.workID }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-message" />
            邮箱
          </template>
          {{ admin.email }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-phone-outline" />
            座机号码
          </template>
          {{ admin.telephone }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-mobile-phone" />
            手机号
          </template>
          {{ admin.phone }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-map-location" />
            联系地址
          </template>
          {{ admin.address }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-school" />
            最高学历
          </template>
          {{ admin.tiptopDegree }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-reading" />
            专业
          </template>
          {{ admin.specialty }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user" />
            婚姻状况
          </template>
          {{ admin.wedlock }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-school" />
            毕业院校
          </template>
          {{ admin.school }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user" />
            职位
          </template>
          {{ admin.position.name }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user" />
            职称
          </template>
          {{ admin.joblevel.name }}
        </el-descriptions-item>

        <!--        <el-descriptions-item>-->
        <!--          <template slot="label">-->
        <!--            <i class="el-icon-tickets"></i>-->
        <!--            组别-->
        <!--          </template>-->
        <!--          <el-tag size="small">{{ admin.workGroup }}</el-tag>-->
        <!--        </el-descriptions-item>-->
      </el-descriptions>
    </div>
    <el-dialog
      class="addDialog"
      title="员工信息"
      :visible.sync="dialogVisible"
      width="80%"
    >
      <div>
        <el-form ref="adminForm" :model="admin">
          <el-row>
            <el-col :span="6">
              <el-form-item label="姓名：" prop="name">
                <el-input
                  v-model="admin.name"
                  size="mini"
                  disabled
                  style="width: 150px"
                  prefix-icon="el-icon-edit"
                  maxlength="8"
                  placeholder="请输入员工姓名"
                />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="性别：" prop="gender">
                <el-radio-group v-model="admin.gender">
                  <el-radio label="男">男</el-radio>
                  <el-radio label="女">女</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="出生日期：" prop="birthday">
                <el-date-picker
                  v-model="admin.birthday"
                  size="mini"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                />
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="政治面貌：" prop="politicId" size="mini">
                <el-select v-model="admin.politicId" placeholder="政治面貌">
                  <el-option
                    v-for="item in politicsstatus"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="民族：" prop="nationId">
                <el-select v-model="admin.nationId" placeholder="民族" size="mini" style="width: 150px">
                  <el-option
                    v-for="item in nations"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="籍贯：" prop="nativePlace">
                <el-input
                  v-model="admin.nativePlace"
                  placeholder="请输入籍贯"
                  prefix-icon="el-icon-edit"
                  size="mini"
                  maxlength="20"
                  style="width:120px"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="电子邮箱：" prop="email">
                <el-input
                  v-model="admin.email"
                  placeholder="请输入电子邮箱"
                  prefix-icon="el-icon-edit"
                  size="mini"
                  maxlength="30"
                  style="width:200px"
                />
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="联系地址：" prop="address">
                <el-input
                  v-model="admin.address"
                  placeholder="请输入联系地址"
                  prefix-icon="el-icon-message"
                  size="mini"
                  maxlength="64"
                  style="width:200px"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="职位：" prop="posId">
                <el-select v-model="admin.posId" placeholder="职位" size="mini" style="width: 150px">
                  <el-option
                    v-for="item in positions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="职称：" prop="jobLevelId">
                <el-select v-model="admin.jobLevelId" placeholder="职称" size="mini" style="width: 150px">
                  <el-option
                    v-for="item in joblevels"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="电话号码：" prop="phone">
                <el-input
                  v-model="admin.phone"
                  placeholder="请输入电话号码"
                  prefix-icon="el-icon-phone"
                  size="mini"
                  maxlength="11"
                  style="width:200px"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="座机号码：" prop="telephone">
                <el-input
                  v-model="admin.telephone"
                  placeholder="请输入座机号码"
                  prefix-icon="el-icon-phone-outline"
                  size="mini"
                  maxlength="11"
                  style="width:200px"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="工号：" prop="workID">
                <el-input
                  v-model="admin.workID"
                  disabled
                  placeholder="请输入工号"
                  prefix-icon="el-icon-edit"
                  size="mini"
                  maxlength="12"
                  style="width:200px"
                />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="学历：" prop="tiptopDegree">
                <el-select v-model="admin.tiptopDegree" placeholder="学历" size="mini" style="width: 150px">
                  <el-option
                    v-for="item in tiptopDegrees"
                    :key="item"
                    :label="item"
                    :value="item"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="毕业院校：" prop="school">
                <el-input
                  v-model="admin.school"
                  placeholder="请输入毕业院校"
                  prefix-icon="el-icon-edit"
                  size="mini"
                  maxlength="32"
                  style="width:200px"
                />
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="专业名称：" prop="specialty">
                <el-input
                  v-model="admin.specialty"
                  placeholder="请输入专业名称"
                  prefix-icon="el-icon-edit"
                  size="mini"
                  maxlength="32"
                  style="width:200px"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="身份证号码：" prop="idCard">
                <el-input
                  v-model="admin.idCard"
                  placeholder="请输入身份证号码"
                  prefix-icon="el-icon-edit"
                  size="mini"
                  maxlength="18"
                  style="width:200px"
                />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="婚姻状况：" prop="wedlock">
                <el-radio-group v-model="admin.wedlock">
                  <el-radio label="已婚">已婚</el-radio>
                  <el-radio label="未婚">未婚</el-radio>
                  <el-radio label="离异">离异</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="用户名：" prop="username">
                <el-input
                  v-model="admin.username"
                  disabled
                  placeholder="请输入用户名"
                  prefix-icon="el-icon-edit"
                  size="mini"
                  maxlength="15"
                  style="width:200px"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" style="background: #0e57a2;border-color: #0e57a2" @click="updateAdmin">确 定</el-button>
      </span>
    </el-dialog>
    <div>
      <el-dialog
        title="更新密码"
        class="passDialog"
        :visible.sync="passwordDialogVisible"
        width="30%"
      >
        <div>
          <el-form ref="ruleForm" :model="ruleForm" status-icon :rules="rules" label-width="100px" class="demo-ruleForm">
            <el-form-item label="旧密码" prop="oldPass">
              <el-input v-model="ruleForm.oldPass" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item label="新密码" prop="pass">
              <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item label="确认新密码" prop="checkPass">
              <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" style="background: #0e57a2;border-color: #0e57a2" @click="updatePassword('ruleForm')">提交</el-button>
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
  name: 'UserInfo',
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      admin: '',
      adminDisplay: '',
      imgPath: '',
      dialogVisible: false,
      nations: [],
      joblevels: [],
      politicsstatus: [],
      positions: [],
      headers: {
        Authorization: window.sessionStorage.getItem('tokenStr')
      },
      tiptopDegrees: ['博士', '硕士', '本科', '大专', '高中', '初中', '小学', '其他'],
      passwordDialogVisible: false,
      ruleForm: {
        oldPass: '',
        pass: '',
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
    this.initAdmin()
    this.initData()
    this.initPositions()
  },
  methods: {
    onSuccess() {
      this.initAdmin()
    },
    updateAdmin() {
      this.$refs['adminForm'].validate(valid => {
        if (valid) {
          this.putRequest('/admin/', this.admin).then(resp => {
            if (resp) {
              this.dialogVisible = false
              this.initAdminInfo()
            }
          })
        }
      })
    },
    initPositions() {
      this.getRequest('/admin/positions').then(resp => {
        if (resp) {
          this.positions = resp
        }
      })
    },
    initData() {
      if (!window.sessionStorage.getItem('nations')) {
        this.getRequest('/admin/nations').then(resp => {
          if (resp) {
            this.nations = resp
            window.sessionStorage.setItem('nations', JSON.stringify(resp))
          }
        })
      } else {
        this.nations = JSON.parse(window.sessionStorage.getItem('nations'))
      }
      if (!window.sessionStorage.getItem('joblevels')) {
        this.getRequest('/admin/joblevels').then(resp => {
          if (resp) {
            this.joblevels = resp
            window.sessionStorage.setItem('joblevels', JSON.stringify(resp))
          }
        })
      } else {
        this.joblevels = JSON.parse(window.sessionStorage.getItem('joblevels'))
      }
      if (!window.sessionStorage.getItem('politicsstatus')) {
        this.getRequest('/admin/politicsStatus').then(resp => {
          if (resp) {
            this.politicsstatus = resp
            window.sessionStorage.setItem('politicsstatus', JSON.stringify(resp))
          }
        })
      } else {
        this.politicsstatus = JSON.parse(window.sessionStorage.getItem('politicsstatus'))
      }
    },
    updatePassword(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.ruleForm.adminId = this.admin.id
          this.putRequest('/system/admin/password', this.ruleForm).then(resp => {
            if (resp) {
              // 更新密码成功后，退出登录
              this.postRequest('/logout')
              // 清除数据
              window.sessionStorage.removeItem('user')
              window.sessionStorage.removeItem('tokenStr')
              // 菜单初始化
              this.$store.commit('initRoutes', [])
              // 跳转
              this.$router.replace('/')
            }
          })
        } else {
          console.log('修改密码失败!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    showUpdatePasswordView() {
      this.passwordDialogVisible = true
    },
    showUpdateAdminInfoView() {
      this.dialogVisible = true
    },
    handleSelect(index) {
      this.$router.push(index)
    },
    initAdmin() {
      this.getRequest('/admin/adminInfo').then(resp => {
        this.admin = resp
        this.imgPath = require('../img/avatar/' + resp.userFace)
        // 拷贝admin信息用于展示
        this.adminDisplay = Object.assign({}, this.admin)
      })
    }
  }
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
  border-radius: 100px;
  box-shadow: 0 4px 4px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);

}

.passDialog /deep/.el-dialog {
  border-radius: 8px;
  font-weight: bold;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
}

.adminDialog /deep/.el-dialog {
  border-radius: 8px;
  font-weight: bold;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
}

.addDialog /deep/.el-dialog {
  border-radius: 8px;
  font-weight: bold;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
}

</style>
