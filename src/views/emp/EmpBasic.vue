<template>
  <div>
    <div>
      <div
          style="display: flex;
          justify-content: space-between">
        <div>
          <el-input
              style="width: 300px; margin-right: 10px"
              v-model="empName"
              @keydown.enter.native="initEmps"
              prefix-icon="el-icon-search"
              clearable
              @clear="initEmps"
              placeholder="请输入员工名进行搜索">
          </el-input>
          <el-button
              type="primary"
              icon="el-icon-search"
              @click="initEmps"
              style="background: #0e57a2; border-color: #0e57a2">
            搜索
          </el-button>
          <el-button
              type="primary"
              style="
                   background: #0e57a2; border-color: #0e57a2">
            <i class="fa fa-angle-double-down" aria-hidden="true"></i>
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
              action="/employee/basic/import">
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
              @click="showAddEmpView"
              icon="el-icon-plus">
            添加员工
          </el-button>
        </div>
      </div>
      <div class="multiSearchBox">
        <el-row>
          <el-col :span="3">
            政党
<!--            <el-select size="mini" style="width: 130px; margin-left: 5px">-->
<!--              <el-option>-->

<!--              </el-option>-->
<!--            </el-select>-->
          </el-col>
          <el-col :span="3">
            民族
<!--            <el-select size="mini" style="width: 130px; margin-left: 5px">-->
<!--              <el-option>-->

<!--              </el-option>-->
<!--            </el-select>-->
          </el-col>
          <el-col :span="3">
            职位
<!--            <el-select size="mini" style="width: 130px; margin-left: 5px">-->
<!--              <el-option>-->

<!--              </el-option>-->
<!--            </el-select>-->
          </el-col>
          <el-col :span="3">
            职称
<!--            <el-select size="mini" style="width: 130px; margin-left: 5px">-->
<!--              <el-option>-->

<!--              </el-option>-->
<!--            </el-select>-->
          </el-col>
          <el-col :span="4">
            聘用形式
<!--            <el-select size="mini" style="width: 130px; margin-left: 5px">-->
<!--              <el-option>-->

<!--              </el-option>-->
<!--            </el-select>-->
          </el-col>
        </el-row>

      </div>
      <div class="empTable">
        <el-table
            :data="emps"
            stripe
            border
            style="width: 100%">
          <!--          @selection-change="handleSelectionChange">-->
          <el-table-column
              type="selection"
              width="55">
          </el-table-column>
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
              width="150">
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
              width="50">
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
              width="100">
          </el-table-column>
          <el-table-column
              prop="address"
              label="联系地址"
              align="left"
              width="300">
          </el-table-column>
          <el-table-column
              prop="department.name"
              label="所属部门"
              align="left"
              width="180">
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
              prop="engageForm"
              label="聘用形式"
              align="left"
              width="80">
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
              prop="workState"
              label="在职状态"
              align="left"
              width="70">
          </el-table-column>
          <el-table-column
              prop="beginDate"
              label="入职日期"
              align="left"
              width="95">
          </el-table-column>
          <el-table-column
              prop="beginContract"
              label="合同起始日期"
              align="left"
              width="95">
          </el-table-column>
          <el-table-column
              prop="endContract"
              label="合同结束日期"
              align="left"
              width="95">
          </el-table-column>
          <el-table-column
              label="合同期限"
              align="left"
              width="100">
            <template slot-scope="scope">
              <el-tag>{{ scope.row.contractTerm }}</el-tag>
              年
            </template>
          </el-table-column>
          <el-table-column
              label="操作"
              fixed="right"
              width="170">
            <template slot-scope="scope">
              <el-button @click="showEditEmpView(scope.row)" style="padding:8px">编辑</el-button>
              <el-button style="padding:8px;background: #0e57a2;border-color: #0e57a2; color: #ffffff">查看</el-button>
              <el-button @click="deleteEmp(scope.row)" style="padding:8px" type="danger">删除</el-button>
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
      </div>
    </div>
    <el-dialog
        title="添加员工"
        :visible.sync="dialogVisible"
        width="80%">
      <div>
        <el-form ref="empForm" :model="emp" :rules="rules">
          <el-row>
            <el-col :span="6">
              <el-form-item label="姓名：" prop="name">
                <el-input size="mini"
                          style="width: 150px" v-model="emp.name"
                          prefix-icon="el-icon-edit"
                          placeholder="请输入员工姓名">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="性别：" prop="gender">
                <el-radio-group v-model="emp.gender">
                  <el-radio label="男">男</el-radio>
                  <el-radio label="女">女</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="出生日期：" prop="birthday">
                <el-date-picker
                    size="mini"
                    v-model="emp.birthday"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="政治面貌：" prop="politicId" size="mini">
                <el-select v-model="emp.politicId" placeholder="政治面貌">
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
                <el-select v-model="emp.nationId" placeholder="民族" size="mini" style="width: 150px">
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
                <el-input v-model="emp.nativePlace" placeholder="请输入籍贯" prefix-icon="el-icon-edit" size="mini" style="width:120px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="电子邮箱：" prop="email">
                <el-input v-model="emp.email" placeholder="请输入电子邮箱" prefix-icon="el-icon-edit" size="mini" style="width:200px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="联系地址：" prop="address">
                <el-input v-model="emp.address" placeholder="请输入联系地址" prefix-icon="el-icon-message" size="mini" style="width:200px"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="职位：" prop="posId">
                <el-select v-model="emp.posId" placeholder="职位" size="mini" style="width: 150px">
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
                <el-select v-model="emp.jobLevelId" placeholder="职称" size="mini" style="width: 150px">
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
              <el-form-item label="所属部门：" prop="departmentId">
                <el-input v-model="emp.departmentId" placeholder="请输入所属部门" prefix-icon="el-icon-edit" size="mini" style="width:200px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="电话号码：" prop="phone">
                <el-input v-model="emp.phone" placeholder="请输入联系地址" prefix-icon="el-icon-phone" size="mini" style="width:200px"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="工号：" prop="workID">
                <el-input v-model="emp.workID" placeholder="请输入工号" prefix-icon="el-icon-edit" disabled size="mini" style="width:200px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="学历：" prop="tiptopDegree">
                <el-select v-model="emp.tiptopDegree" placeholder="学历" size="mini" style="width: 150px">
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
                <el-input v-model="emp.school" placeholder="请输入毕业院校" prefix-icon="el-icon-edit" size="mini" style="width:200px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="专业名称：" prop="specialty">
                <el-input v-model="emp.specialty" placeholder="请输入专业名称" prefix-icon="el-icon-edit" size="mini" style="width:200px"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="入职日期:" prop="beginDate">
                <el-date-picker
                    size="mini"
                    v-model="emp.beginDate"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="转正日期:" prop="conversionTime">
                <el-date-picker
                    size="mini"
                    v-model="emp.conversionTime"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="合同起始日期:" prop="beginContract">
                <el-date-picker
                    size="mini"
                    v-model="emp.beginContract"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="合同截止日期:" prop="endContract">
                <el-date-picker
                    size="mini"
                    v-model="emp.endContract"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="身份证号码：" prop="idCard">
                <el-input v-model="emp.idCard" placeholder="请输入身份证号码" prefix-icon="el-icon-edit" size="mini" style="width:200px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="聘用形式：" prop="engageForm">
                <el-radio-group v-model="emp.engageForm">
                  <el-radio label="劳动合同">劳动合同</el-radio>
                  <el-radio label="劳务合同">劳务合同</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="婚姻状况：" prop="wedlock">
                <el-radio-group v-model="emp.wedlock">
                  <el-radio label="已婚">已婚</el-radio>
                  <el-radio label="未婚">未婚</el-radio>
                  <el-radio label="离异">离异</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>

      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="doAddEmp">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "EmpBasic",
  data() {
    return {
      headers:{
        Authorization: window.sessionStorage.getItem('tokenStr')
      },
      importDataDisabled: 'false',
      importDataButtonText:'导入数据',
      importDataButtonIcon:'el-icon-upload2',
      emps: [],
      total: 0,
      currentPage: 1,
      size: 10,
      empName: '',
      dialogVisible: false,
      emp: {
        id: null,
        name: '',
        gender: '',
        birthday: '',
        idCard: '',
        wedlock: '',
        nationId: null,
        nativePlace: '',
        politicId: null,
        email: '',
        phone: '',
        address: '',
        departmentId: null,
        jobLevelId: null,
        posId: null,
        engageForm: '',
        tiptopDegree: '',
        specialty: '',
        school: '',
        beginDate: '',
        workState: '在职',
        workID: '',
        contractTerm: null,
        conversionTime: '',
        notWorkDate: null,
        beginContract: '',
        endContract: '',
        workAge: null,
        salaryId: null
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
        address: [{required: true, message: '请输入地址', trigger: 'blur'}],
        departmentId: [{required: true, message: '请输入部门', trigger: 'blur'}],
        jobLevelId: [{required: true, message: '请输入职称', trigger: 'blur'}],
        posId: [{required: true, message: '请输入职位', trigger: 'blur'}],
        engageForm: [{required: true, message: '请输入聘用形式', trigger: 'blur'}],
        tiptopDegree: [{required: true, message: '请输入学历', trigger: 'blur'}],
        specialty: [{required: true, message: '请输入专业', trigger: 'blur'}],
        school: [{required: true, message: '请输入学校', trigger: 'blur'}],
        beginDate: [{required: true, message: '请输入入职日期', trigger: 'blur'}],
        workState: [{required: true, message: '请输入工作状态', trigger: 'blur'}],
        workID: [{required: true, message: '请输入工号', trigger: 'blur'}],
        contractTerm: [{required: true, message: '请输入合同期限', trigger: 'blur'}],
        conversionTime: [{required: true, message: '请输入转正日期', trigger: 'blur'}],
        notWorkDate: [{required: true, message: '请输入离职日期', trigger: 'blur'}],
        beginContract: [{required: true, message: '请输入合同起始日期', trigger: 'blur'}],
        endContract: [{required: true, message: '请输入合同起始日期', trigger: 'blur'}],
        workAge: [{required: true, message: '请输入工龄', trigger: 'blur'}]
        }
    }
  },
  mounted() {
    this.initEmps();
    this.initData();
  },
  methods: {
    onSuccess(){
      this.importDataButtonIcon = 'el-icon-upload2';
      this.importDataButtonText = '导入数据';
      this.importDataDisabled = false;
      this.initEmps();
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
      this.downloadRequest('/employee/basic/export');
    },
    showEditEmpView(data) {
      this.title = '编辑员工信息';
      this.emp = data;
      this.initPositions();
      this.dialogVisible = true;
    },
    deleteEmp(data) {
        this.$confirm('此操作将永久删除[' + data.name + '], 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteRequest('/employee/basic/' + data.id).then(resp => {
            if(resp) {
              this.initEmps();
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
    doAddEmp(){
      if (this.emp.id) {
        this.$refs['empForm'].validate(valid=>{
          if(valid) {
            this.putRequest('/employee/basic/', this.emp).then(resp=> {
              if(resp) {
                this.dialogVisible = false;
                this.initEmps();
              }
            })
          }
        })
      } else {
        this.$refs['empForm'].validate(valid=>{
          if(valid) {
            this.postRequest('/employee/basic/', this.emp).then(resp=> {
              if(resp) {
                this.dialogVisible = false;
                this.initEmps();
              }
            })
          }
        })
      }

    },
    getMaxWorkID(){
      this.getRequest('/employee/basic/maxWorkID').then(resp=>{
         if(resp) {
           this.emp.workID = resp.obj;
         }
      })
    },
    initPositions(){
      this.getRequest('/employee/basic/positions').then(resp=>{
        if(resp) {
          this.positions = resp;
        }
      })
    },
    initData(){
      if (!window.sessionStorage.getItem('nations')) {
        this.getRequest('/employee/basic/nations').then(resp=>{
          if(resp) {
            this.nations = resp;
            window.sessionStorage.setItem('nations', JSON.stringify(resp));
          }
        })
      } else {
        this.nations = JSON.parse(window.sessionStorage.getItem('nations'));
      }
      if (!window.sessionStorage.getItem('joblevels')) {
        this.getRequest('/employee/basic/joblevels').then(resp=>{
          if(resp) {
            this.joblevels = resp;
            window.sessionStorage.setItem('joblevels', JSON.stringify(resp));
          }
        })
      } else {
        this.joblevels = JSON.parse(window.sessionStorage.getItem('joblevels'));
      }
      if (!window.sessionStorage.getItem('politicsstatus')) {
        this.getRequest('/employee/basic/politicsStatus').then(resp=>{
          if(resp) {
            this.politicsstatus = resp;
            window.sessionStorage.setItem('politicsstatus', JSON.stringify(resp));
          }
        })
      } else {
        this.politicsstatus = JSON.parse(window.sessionStorage.getItem('politicsstatus'));
      }
    },

    showAddEmpView(){
      this.initPositions();
      this.emp= {
            id: null,
            name: '',
            gender: '',
            birthday: '',
            idCard: '',
            wedlock: '',
            nationId: null,
            nativePlace: '',
            politicId: null,
            email: '',
            phone: '',
            address: '',
            departmentId: null,
            jobLevelId: null,
            posId: null,
            engageForm: '',
            tiptopDegree: '',
            specialty: '',
            school: '',
            beginDate: '',
            workState: '在职',
            workID: '',
            contractTerm: null,
            conversionTime: '',
            notWorkDate: null,
            beginContract: '',
            endContract: '',
            workAge: null,
            salaryId: null
      }
      this.getMaxWorkID();
      this.dialogVisible = true;
    },
    initEmps() {
      this.getRequest('/employee/basic/?currentPage=' + this.currentPage + '&size=' + this.size + '&name=' + this.empName).then(resp => {
        if (resp) {
          this.emps = resp.data;
          this.total = resp.total;
        }
      })
    },
    currentChange(currentPage) {
      this.currentPage = currentPage;
      this.initEmps();
    },
    sizeChange(size) {
      this.size = size;
      this.initEmps();
    }
  }
}
</script>

<style scoped>
.empTable {
  margin-top: 20px;
}

.multiSearchBox {
  box-sizing: border-box;
  padding: 5px;
  font-size: 15px;
  margin-top: 20px;
}
</style>