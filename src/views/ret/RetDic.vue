<template>
  <div>
    <div>
      <div style="display: flex; justify-content: space-between">
        <div>
          <el-input
              style="width: 300px; margin-right: 10px"
              v-model="dicTypeName"
              @keydown.enter.native="initDics"
              prefix-icon="el-icon-search"
              clearable
              @clear="initDics"
              placeholder="请输入字典类型进行搜索">
          </el-input>
          <el-button
              type="primary"
              icon="el-icon-search"
              @click="initDics"
              style="background: #0e57a2; border-color: #0e57a2">
            搜索
          </el-button>
          <el-button
              type="primary"
              style="background: #0e57a2; border-color: #0e57a2">
            <i class="fa fa-angle-double-down" aria-hidden="true"></i>
            高级搜索
          </el-button>
        </div>
        <div>
          <el-button type="primary"
                     style="background: #0e57a2;border-color: #0e57a2">
            <i class="fa fa-level-up" aria-hidden="true"></i>
            导入数据
          </el-button>
          <el-button type="primary"
                     style="background: #0e57a2;border-color: #0e57a2">
            <i class="fa fa-level-down" aria-hidden="true"></i>
            导出数据
          </el-button>
          <el-button
              type="primary"
              style="background: #0e57a2;border-color: #0e57a2"
              @click="showAddDicView"
              prefix-icon="el-icon-plus">
            添加字典
          </el-button>
        </div>
      </div>
    </div>
    <div>
      <div class="dicTable">
        <el-table
            :data="dics"
            stripe
            border
            style="width: 100%">
          <!--          @selection-change="handleSelectionChange">-->
          <el-table-column
              prop="id"
              label="序号"
              fixed="left"
              align="left"
              width="100">
          </el-table-column>
          <el-table-column
              prop="dicType"
              label="字典类型"
              align="left"
              width="300">
          </el-table-column>
          <el-table-column
              prop="dicTypeName"
              label="字典类型名"
              width="300">
          </el-table-column>
          <el-table-column
              prop="dicValue"
              label="字典值"
              align="left"
              width="300">
          </el-table-column>
          <el-table-column
              prop="dicValueName"
              label="字典值名"
              align="left"
              width="350">
          </el-table-column>
<!--          <el-table-column-->
<!--              prop="represent"-->
<!--              label="描述"-->
<!--              width="500">-->
<!--          </el-table-column>-->
          <el-table-column
              label="操作"
              width="100">
            <template slot-scope="scope">
<!--              <el-button style="padding:8px">编辑</el-button>-->
              <el-button
                  style="padding:8px;background: #0e57a2; border-color: #0e57a2; color: #ffffff"
                  @click="showDicExplainEditView(scope.row)">
                补充说明
              </el-button>
<!--              <el-button style="padding:8px" type="danger">删除</el-button>-->
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
      <div>
        <el-dialog
            title="字典补充说明"
            :visible.sync="dialogVisible"
            width="60%">
            <el-form :inline="true" :model="retDic" class="demo-form-inline">
              <el-form-item label="字典类型">
                <el-input v-model="retDic.dicTypeName" disabled></el-input>
              </el-form-item>
              <el-form-item label="字典值">
                <el-input v-model="retDic.dicValueName" disabled></el-input>
              </el-form-item>
              <el-form-item label="补充说明">
                <el-input size="big" class="dicExplain" type="textarea" v-model="retDic.dicExplain"></el-input>
              </el-form-item>
<!--              <el-form-item>-->
<!--              <el-button-->
<!--                  @click="saveDicExplainInfo"-->
<!--                  style="background: #0e57a2; border-color: #0e57a2; color: #ffffff">保存-->
<!--              </el-button>-->
<!--              </el-form-item>-->
            </el-form>
          <span slot="footer" class="dialog-footer">
             <el-button @click="dialogVisible = false">取 消</el-button>
             <el-button type="primary"
                        @click="saveDicExplainInfo"
                        style="background: #0e57a2; border-color: #0e57a2; color: #ffffff">
               保 存
             </el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RetDic",
  data() {
    return {
      dics: [],
      total: 0,
      currentPage: 1,
      size: 10,
      dicTypeName: '',
      dialogVisible: false,
      retDic: {
        dicType: '',
        dicTypeName: '',
        dicValue: '',
        dicValueName: '',
        dicExplain: '',
        explainFlag:'',
      }
    }
  },
  mounted() {
    this.initDics();
  },
  methods: {
    saveDicExplainInfo(){
      if (this.retDic.explainFlag === '1') {
        this.putRequest("/retrieval/dic/", this.retDic).then(resp=>{
          this.dialogVisible = false;
        })
      } else {
        this.postRequest("/retrieval/dic/", this.retDic).then(resp=>{
          this.dialogVisible = false;
        })
      }
    },
    showDicExplainEditView(data){
      console.log(data);
      this.retDic.dicType = data.dicType;
      this.retDic.dicValue = data.dicValue;
      this.retDic.dicTypeName = data.dicTypeName;
      this.retDic.dicValueName = data.dicValueName;
      this.retDic.dicExplain = this.findDicExpalin(data);
      this.dialogVisible = true;
    },
    findDicExpalin(data) {
      this.getRequest('/retrieval/dic/explain/?dicType=' + data.dicType + '&dicValue=' + data.dicValue).then(resp => {
        if(resp) {
          this.retDic.dicExplain = resp.dicExplain;
          this.retDic.explainFlag = '1';
        } else {
          this.retDic.dicExplain = '';
          this.retDic.explainFlag = '0';
        }
      })
    },
    showAddDicView(){
      this.dialogVisible = true;
    },
    initDics() {
      this.getRequest('/retrieval/dic/?currentPage=' + this.currentPage + '&size=' + this.size + '&dicTypeName=' + this.dicTypeName).then(resp => {
        if (resp) {
          this.dics = resp.data;
          this.total = resp.total;
        }
      })
    },
    currentChange(currentPage) {
      this.currentPage = currentPage;
      this.initDics();
    },
    sizeChange(size) {
      this.size = size;
      this.initDics();
    }
  }
}
</script>

<style scoped>
.dicTable {
  margin-top: 20px;
}

.multiSearchBox {
  box-sizing: border-box;
  padding: 5px;
  font-size: 15px;
  margin-top: 20px;
}

.dicExplain {
  /*background: #0e57a2;*/
  display: flex;
  /*!*居中*!*/
  /*align-items: center;*/
  justify-content: space-around;
  padding: 5px;
  box-sizing: border-box;
  width: 800px;
}
</style>
