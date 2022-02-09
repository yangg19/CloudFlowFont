<template>
  <div>
    <div>
      <div
          style="display: flex;
          justify-content: space-between">
        <div>
          <el-input
              style="width: 300px; margin-right: 10px"
              v-model="adminName"
              @keydown.enter.native="initAdminInfo"
              prefix-icon="el-icon-search"
              clearable
              :disabled="showAdvanceSearchVisible"
              @clear="initAdminInfo"
              placeholder="请输入员工名进行搜索">
          </el-input>
          <el-button
              type="primary"
              icon="el-icon-search"
              @click="initAdminInfo"
              style="background: #0e57a2; border-color: #0e57a2">
            搜索
          </el-button>
          <el-button type="primary" @click="showAdvanceSearchVisible = !showAdvanceSearchVisible" style="background: #0e57a2; border-color: #0e57a2">
            <i :class="showAdvanceSearchVisible?'fa fa-angle-double-up':'fa fa-angle-double-down'" aria-hidden="true"></i>
            高级搜索
          </el-button>
        </div>
        <div>
          <el-upload
              style="display: inline-flex; margin-right: 10px"
              :show-file-list="false"
              :before-upload="beforeUpload"
              :on-success="onSuccess"
              :on-error="onError"
              :headers="headers"
              :disabled="importDataDisabled"
              action="/admin/import">
            <el-button type="primary"
                       style="background: #0e57a2;border-color: #0e57a2"
                       :disabled="importDataDisabled = false"
                       :icon="importDataButtonIcon">
              {{ importDataButtonText }}
            </el-button>
          </el-upload>

          <el-button type="primary"
                     @click="exportData"
                     icon="el-icon-download"
                     style="background: #0e57a2;border-color: #0e57a2">
            导出数据
          </el-button>
          <el-button
              type="primary"
              style="background: #0e57a2;border-color: #0e57a2"
              @click="showAddAdminView"
              icon="el-icon-plus">
            添加员工
          </el-button>
        </div>
      </div>

    </div>
    <transition name="slide-fade">
      <div class="advanceSearchBox" v-show="showAdvanceSearchVisible">
        <el-row>
        </el-row>
        <el-row>
          <el-col :span="5" style="margin-left: 100px">
            政治面貌：
            <el-select v-model="searchValue.politicId" placeholder="政治面貌" size="mini" style="width: 150px">
              <el-option
                  v-for="item in politicsstatus"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
              </el-option>
            </el-select>

          </el-col>
          <el-col :span="5">
            员工民族：
            <el-select v-model="searchValue.nationId" placeholder="民族" size="mini" style="width: 150px">
              <el-option
                  v-for="item in nations"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
              </el-option>
            </el-select>

          </el-col>
          <el-col :span="5">
            员工职位：
            <el-select v-model="searchValue.posId" placeholder="职位" size="mini" style="width: 150px">
              <el-option
                  v-for="item in positions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="5">
            员工职称：
            <el-select v-model="searchValue.jobLevelId" placeholder="职称" size="mini" style="width: 150px">
              <el-option
                  v-for="item in joblevels"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
              </el-option>
            </el-select>
          </el-col>
        </el-row>

        <el-row style="margin-top: 20px; margin-left: 100px">
          <el-col :span="5">
            <el-button size="mini" icon="el-icon-arrow-left">取消</el-button>
            <el-button type="primary" icon="el-icon-search" @click="initAdminInfo('advanced')" size="mini" style="background: #0e57a2; border-color: #0e57a2">搜索</el-button>
          </el-col>
        </el-row>

      </div>
    </transition>
    <div class="adminTable">
      <el-table
          :data="adminInfoList"
          stripe
          border
          style="width: 100%">
        <!--          @selection-change="handleSelectionChange">-->
        <el-table-column
            prop="name"
            label="姓名"
            fixed="left"
            align="left"
            width="90">
        </el-table-column>
        <el-table-column
            prop="workID"
            label="工号"
            align="left"
            width="85">
        </el-table-column>
        <el-table-column
            prop="gender"
            label="性别"
            width="50">
        </el-table-column>
        <el-table-column
            prop="birthday"
            label="出生日期"
            align="left"
            width="100">
        </el-table-column>
        <el-table-column
            prop="idCard"
            label="证件号码"
            align="left"
            width="180">
        </el-table-column>
        <el-table-column
            prop="wedlock"
            label="婚姻状况"
            width="70">
        </el-table-column>
        <el-table-column
            prop="nation.name"
            label="民族"
            align="left"
            width="100">
        </el-table-column>
        <el-table-column
            prop="nativePlace"
            label="籍贯"
            align="left"
            width="100">
        </el-table-column>
        <el-table-column
            prop="politicsStatus.name"
            label="政治面貌"
            align="left"
            width="120">
        </el-table-column>
        <el-table-column
            prop="email"
            label="电子邮件"
            align="left"
            width="180">
        </el-table-column>
        <el-table-column
            prop="phone"
            label="电话号码"
            align="left"
            width="120">
        </el-table-column>
        <el-table-column
            prop="telephone"
            label="座机号码"
            align="left"
            width="120">
        </el-table-column>
        <el-table-column
            prop="address"
            label="联系地址"
            align="left"
            width="300">
        </el-table-column>
        <el-table-column
            prop="joblevel.name"
            label="职称"
            align="left"
            width="100">
        </el-table-column>
        <el-table-column
            prop="position.name"
            label="职位"
            align="left"
            width="100">
        </el-table-column>
        <el-table-column
            prop="tiptopDegree"
            label="最高学历"
            align="left"
            width="70">
        </el-table-column>
        <el-table-column
            prop="school"
            label="毕业院校"
            align="left"
            width="180">
        </el-table-column>
        <el-table-column
            prop="specialty"
            label="专业"
            align="left"
            width="150">
        </el-table-column>
        <el-table-column
            label="操作"
            fixed="right"
            width="115">
          <template slot-scope="scope">
            <el-button @click="showEditAdminView(scope.row)" style="padding:8px">编辑</el-button>
            <el-button @click="deleteAdmin(scope.row)" style="padding:8px;color: white;background: #c61919; border-color: #c61919">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="display: flex; justify-content: flex-end; margin-top: 10px">
        <el-pagination
            background
            layout="sizes, prev, pager, next, jumper, ->, total"
            @current-change="currentChange"
            @size-change="sizeChange"
            :total="total">
        </el-pagination>
      </div>

      <el-dialog
          class="addDialog"
          title="员工信息"
          :visible.sync="dialogVisible"
          width="80%">
        <div>
          <el-form ref="empForm" :model="adminInfo" :rules="rules">
            <el-row>
              <el-col :span="6">
                <el-form-item label="姓名：" prop="name">
                  <el-input size="mini"
                            style="width: 150px" v-model="adminInfo.name"
                            prefix-icon="el-icon-edit"
                            placeholder="请输入员工姓名">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="性别：" prop="gender">
                  <el-radio-group v-model="adminInfo.gender">
                    <el-radio label="男">男</el-radio>
                    <el-radio label="女">女</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="出生日期：" prop="birthday">
                  <el-date-picker
                      size="mini"
                      v-model="adminInfo.birthday"
                      type="date"
                      value-format="yyyy-MM-dd"
                      placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="政治面貌：" prop="politicId" size="mini">
                  <el-select v-model="adminInfo.politicId" placeholder="政治面貌">
                    <el-option
                        v-for="item in politicsstatus"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="民族：" prop="nationId">
                  <el-select v-model="adminInfo.nationId" placeholder="民族" size="mini" style="width: 150px">
                    <el-option
                        v-for="item in nations"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="籍贯：" prop="nativePlace">
                  <el-input v-model="adminInfo.nativePlace" placeholder="请输入籍贯" prefix-icon="el-icon-edit" size="mini" style="width:120px"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="电子邮箱：" prop="email">
                  <el-input v-model="adminInfo.email" placeholder="请输入电子邮箱" prefix-icon="el-icon-edit" size="mini" style="width:200px"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="联系地址：" prop="address">
                  <el-input v-model="adminInfo.address" placeholder="请输入联系地址" prefix-icon="el-icon-message" size="mini" style="width:200px"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="职位：" prop="posId">
                  <el-select v-model="adminInfo.posId" placeholder="职位" size="mini" style="width: 150px">
                    <el-option
                        v-for="item in positions"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="职称：" prop="jobLevelId">
                  <el-select v-model="adminInfo.jobLevelId" placeholder="职称" size="mini" style="width: 150px">
                    <el-option
                        v-for="item in joblevels"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="电话号码：" prop="phone">
                  <el-input v-model="adminInfo.phone" placeholder="请输入联系地址" prefix-icon="el-icon-phone" size="mini" style="width:200px"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="座机号码：" prop="telephone">
                  <el-input v-model="adminInfo.telephone" placeholder="请输入联系地址" prefix-icon="el-icon-phone" size="mini" style="width:200px"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="工号：" prop="workID">
                  <el-input v-model="adminInfo.workID" placeholder="请输入工号" prefix-icon="el-icon-edit" size="mini" style="width:200px"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="学历：" prop="tiptopDegree">
                  <el-select v-model="adminInfo.tiptopDegree" placeholder="学历" size="mini" style="width: 150px">
                    <el-option
                        v-for="item in tiptopDegrees"
                        :key="item"
                        :label="item"
                        :value="item">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="毕业院校：" prop="school">
                  <el-input v-model="adminInfo.school" placeholder="请输入毕业院校" prefix-icon="el-icon-edit" size="mini" style="width:200px"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="专业名称：" prop="specialty">
                  <el-input v-model="adminInfo.specialty" placeholder="请输入专业名称" prefix-icon="el-icon-edit" size="mini" style="width:200px"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="身份证号码：" prop="idCard">
                  <el-input v-model="adminInfo.idCard" placeholder="请输入身份证号码" prefix-icon="el-icon-edit" size="mini" style="width:200px"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="婚姻状况：" prop="wedlock">
                  <el-radio-group v-model="adminInfo.wedlock">
                    <el-radio label="已婚">已婚</el-radio>
                    <el-radio label="未婚">未婚</el-radio>
                    <el-radio label="离异">离异</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="工作域名：" prop="username">
                  <el-input v-model="adminInfo.username" placeholder="请输入工作域名" prefix-icon="el-icon-edit" size="mini" style="width:200px"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>

        </div>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="doAddAdmin">确 定</el-button>
      </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "SysAdminInfo",
  data() {
    return {
      // 搜索条件
      searchValue: {
        politicId: null,
        nationId: null,
        posId: null,
        jobLevelId: null,
      },
      showAdvanceSearchVisible: false,
      headers:{
        Authorization: window.sessionStorage.getItem('tokenStr')
      },
      importDataDisabled: 'false',
      importDataButtonText:'导入数据',
      importDataButtonIcon:'el-icon-upload2',
      adminInfoList: [],
      total: 0,
      currentPage: 1,
      size: 10,
      adminName: '',
      dialogVisible: false,
      adminInfo: {
        id: null,
        name: '',
        gender: '',
        birthday: '1900-01-01',
        idCard: '',
        wedlock: '',
        nationId: 57,
        nativePlace: '',
        politicId: 13,
        email: '',
        phone: '',
        telephone: '',
        address: '',
        jobLevelId: 1,
        posId: 1,
        tiptopDegree: '',
        specialty: '',
        school: '',
        workID: '',
        username: ''
      },
      nations:[],
      joblevels:[],
      politicsstatus:[],
      positions:[],
      tiptopDegrees:['博士','硕士','本科','大专','高中','初中','小学','其他'],
      rules:{
        name: [{required: true, message: '请输工姓名', trigger: 'blur'}],
        gender: [{required: true, message: '请输入性别', trigger: 'blur'}],
        birthday: [{required: true, message: '请输入出生日期', trigger: 'blur'}],
        idCard: [{required: true, message: '请输入身份证号码', trigger: 'blur'}],
        wedlock: [{required: true, message: '请输入婚姻状况', trigger: 'blur'}],
        nationId: [{required: true, message: '请输入民族', trigger: 'blur'}],
        nativePlace: [{required: true, message: '请输入籍贯', trigger: 'blur'}],
        politicId: [{required: true, message: '请输入员工政治面貌', trigger: 'blur'}],
        email: [{required: true, message: '请输入邮箱地址', trigger: 'blur'},
          {type:'email', message: '邮箱地址格式不正确', trigger: 'blur'}],
        phone: [{required: true, message: '请输入电话', trigger: 'blur'}],
        telephone: [{required: true, message: '请输入座机电话', trigger: 'blur'}],
        address: [{required: true, message: '请输入地址', trigger: 'blur'}],
        jobLevelId: [{required: true, message: '请输入职称', trigger: 'blur'}],
        posId: [{required: true, message: '请输入职位', trigger: 'blur'}],
        tiptopDegree: [{required: true, message: '请输入学历', trigger: 'blur'}],
        specialty: [{required: true, message: '请输入专业', trigger: 'blur'}],
        school: [{required: true, message: '请输入学校', trigger: 'blur'}],
        workID: [{required: true, message: '请输入工号', trigger: 'blur'}],
        username: [{required: true, message: '请输入域名', trigger: 'blur'}]
      }
    }
  },
  mounted() {
    this.initAdminInfo();
    this.initData();
    this.initPositions();
  },
  methods: {
    onSuccess(){
      this.importDataButtonIcon = 'el-icon-upload2';
      this.importDataButtonText = '导入数据';
      this.importDataDisabled = false;
      this.initAdminInfo();
    },
    onError(){
      this.importDataButtonIcon = 'el-icon-upload2';
      this.importDataButtonText = '导入数据';
      this.importDataDisabled = false;
    },
    beforeUpload(){
      this.importDataButtonIcon = 'el-icon-loading';
      this.importDataButtonText = '正在导入';
      this.importDataDisabled = true;
    },
    exportData(){
      this.downloadRequest('/admin/export');
    },
    showEditAdminView(data) {
      this.title = '编辑员工信息';
      this.adminInfo = data;
      this.initPositions();
      this.dialogVisible = true;
    },
    showAdminView(data) {
      this.title = '查看员工信息';
      this.adminInfo = data;
      this.initPositions();
      this.dialogVisible = true;

    },
    deleteAdmin(data) {
      this.$confirm('此操作将永久删除[' + data.name + '], 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteRequest('/admin/' + data.id).then(resp => {
          if(resp) {
            this.initAdminInfo();
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    doAddAdmin(){
      if (this.adminInfo.id) {
        this.$refs['empForm'].validate(valid=>{
          if(valid) {
            this.putRequest('/admin/', this.adminInfo).then(resp=> {
              console.log(this.adminInfo)
              if(resp) {
                this.dialogVisible = false;
                this.initAdminInfo();
              }
            })
          }
        })
      } else {
        this.$refs['empForm'].validate(valid=>{
          if(valid) {
            this.postRequest('/admin/', this.adminInfo).then(resp=> {
              if(resp) {
                this.dialogVisible = false;
                this.initAdminInfo();
              }
            })
          }
        })
      }

    },
    // getMaxWorkID(){
    //   this.getRequest('/admin/maxWorkID').then(resp=>{
    //      if(resp) {
    //        this.adminInfo.workID = resp.obj;
    //      }
    //   })
    // },
    initPositions(){
      this.getRequest('/admin/positions').then(resp=>{
        if(resp) {
          this.positions = resp;
        }
      })
    },
    initData(){
      if (!window.sessionStorage.getItem('nations')) {
        this.getRequest('/admin/nations').then(resp=>{
          if(resp) {
            this.nations = resp;
            window.sessionStorage.setItem('nations', JSON.stringify(resp));
          }
        })
      } else {
        this.nations = JSON.parse(window.sessionStorage.getItem('nations'));
      }
      if (!window.sessionStorage.getItem('joblevels')) {
        this.getRequest('/admin/joblevels').then(resp=>{
          if(resp) {
            this.joblevels = resp;
            window.sessionStorage.setItem('joblevels', JSON.stringify(resp));
          }
        })
      } else {
        this.joblevels = JSON.parse(window.sessionStorage.getItem('joblevels'));
      }
      if (!window.sessionStorage.getItem('politicsstatus')) {
        this.getRequest('/admin/politicsStatus').then(resp=>{
          if(resp) {
            this.politicsstatus = resp;
            window.sessionStorage.setItem('politicsstatus', JSON.stringify(resp));
          }
        })
      } else {
        this.politicsstatus = JSON.parse(window.sessionStorage.getItem('politicsstatus'));
      }
    },

    showAddAdminView(){
      this.initPositions();
      this.adminInfo= {
        id: null,
        name: '',
        gender: '',
        birthday: '1900-01-01',
        idCard: '',
        wedlock: '',
        nationId: 57,
        nativePlace: '',
        politicId: 13,
        email: '',
        phone: '',
        telephone: '',
        address: '',
        jobLevelId: 1,
        posId: 1,
        tiptopDegree: '',
        specialty: '',
        school: '',
        workID: '',
        username: '',
      }
      this.dialogVisible = true;
    },
    initAdminInfo(type) {
      let url = '/admin/?currentPage=' + this.currentPage + '&size=' + this.size;
      if (type && type === 'advanced') {
        if(this.searchValue.politicId) {
          url += '&politicId=' + this.searchValue.politicId;
        }
        if(this.searchValue.nationId) {
          url += '&nationId=' + this.searchValue.nationId;
        }
        if(this.searchValue.posId) {
          url += '&posId=' + this.searchValue.posId;
        }
        if(this.searchValue.jobLevelId) {
          url += '&jobLevelId=' + this.searchValue.jobLevelId;
        }

      } else {
        url += '&name=' + this. adminName;
      }
      this.getRequest(url).then(resp => {
        if (resp) {
          this.adminInfoList = resp.data;
          this.total = resp.total;
        }
      })

    },
    currentChange(currentPage) {
      this.currentPage = currentPage;
      this.initAdminInfo();
    },
    sizeChange(size) {
      this.size = size;
      this.initAdminInfo();
    }
  }
}
</script>

<style>
.adminTable {
  margin-top: 20px;
}

.advanceSearchBox {
  /*背景颜色*/
  background: #fafafa;
  /*线属性*/
  border: 1px solid #dcdfe6;
  box-shadow: 0 0 1px #cac6c6;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 5px;
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 15px;
}

.slide-fade-enter-active {
  transition: all .5s ease;
}

.slide-fade-leave-active {
  transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.addDialog /deep/.el-dialog {
  border-radius: 10px;
  /*box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);*/
}
</style>
