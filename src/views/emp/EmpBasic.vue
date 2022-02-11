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

          <el-button type="primary"
                     @click="exportData"
                     icon="el-icon-download"
                     style="background: #0e57a2;border-color: #0e57a2">
            导出数据
          </el-button>
<!--          <el-button-->
<!--              type="primary"-->
<!--              style="background: #0e57a2;border-color: #0e57a2"-->
<!--              @click="showAddAdminView"-->
<!--              icon="el-icon-plus">-->
<!--            添加员工-->
<!--          </el-button>-->
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
            <el-select v-model="searchValue.politicId"
                       placeholder="政治面貌"
                       size="mini"
                       clearable
                       style="width: 150px">
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
            <el-select v-model="searchValue.nationId"
                       placeholder="民族"
                       size="mini"
                       clearable
                       style="width: 150px">
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
            <el-select v-model="searchValue.posId"
                       placeholder="职位"
                       size="mini"
                       clearable
                       style="width: 150px">
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
            <el-select v-model="searchValue.jobLevelId"
                       placeholder="职称"
                       size="mini"
                       clearable
                       style="width: 150px">
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
            <el-button size="mini" icon="el-icon-arrow-left" @click="closeAdvance">取消</el-button>
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
</template>

<script>
export default {
  name: "EmpBasic",
  data() {
    return {
      // 搜索条件
      searchValue: {
        politicId: null,
        nationId: null,
        posId: null,
        jobLevelId: null,
      },
      nations:[],
      joblevels:[],
      politicsstatus:[],
      positions:[],
      tiptopDegrees:['博士','硕士','本科','大专','高中','初中','小学','其他'],
      showAdvanceSearchVisible: false,
      headers:{
        Authorization: window.sessionStorage.getItem('tokenStr')
      },
      adminInfoList: [],
      total: 0,
      currentPage: 1,
      size: 10,
      adminName: '',
      adminInfo: {
        id: null,
        name: '',
        gender: '',
        // birthday: '',
        idCard: '',
        wedlock: '',
        nationId: null,
        nativePlace: '',
        politicId: null,
        email: '',
        phone: '',
        telephone: '',
        address: '',
        jobLevelId: null,
        posId: null,
        tiptopDegree: '',
        specialty: '',
        school: '',
        workID: ''
      },
    }
  },
  mounted() {
    this.initAdminInfo();
    this.initData();
    this.initPositions();
  },
  methods: {
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
    exportData(){
      this.downloadRequest('/admin/export');
    },
    closeAdvance(){
      this.showAdvanceSearchVisible = false;
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


</style>
