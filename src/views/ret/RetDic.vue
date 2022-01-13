<template>
  <div>
    <div>
      <div
          style="display: flex;
          justify-content: space-between">
        <div>
          <el-input
              style="width: 300px; margin-right: 10px"
              v-model="dicType"
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
              style="
                   background: #0e57a2; border-color: #0e57a2">
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
      <div class="multiSearchBox">
        <el-row>
          <el-col :span="4">
            字典类型
            <el-select size="mini" style="width: 130px; margin-left: 5px">
              <el-option>

              </el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            字典类型中文名
            <el-select size="mini" style="width: 130px; margin-left: 5px">
              <el-option>

              </el-option>
            </el-select>
          </el-col>
        </el-row>

      </div>
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
              width="50">
          </el-table-column>
          <el-table-column
              prop="dicType"
              label="字典类型"
              align="left"
              width="150">
          </el-table-column>
          <el-table-column
              prop="dicTypeEN"
              label="字典类型英文名"
              width="200">
          </el-table-column>
          <el-table-column
              prop="dicValue"
              label="字典值"
              align="left"
              width="200">
          </el-table-column>
          <el-table-column
              prop="dicValueSign"
              label="字典值意义"
              align="left"
              width="200">
          </el-table-column>
          <el-table-column
              prop="represent"
              label="描述"
              width="500">
          </el-table-column>
          <el-table-column
              label="操作"
              fixed="right"
              width="170">
            <tdiclate slot-scope="scope">
              <el-button style="padding:8px">编辑</el-button>
              <el-button style="padding:8px;background: #0e57a2;border-color: #0e57a2; color: #ffffff">查看</el-button>
              <el-button style="padding:8px" type="danger">删除</el-button>
            </tdiclate>
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
      dicType: '',
      dialogVisible: false,
    }
  },
  mounted() {
    this.initDics();
  },
  methods: {
    showAddDicView(){
      this.dialogVisible = true;
    },
    initDics() {
      this.getRequest('/retrieval/dic/?currentPage=' + this.currentPage + '&size=' + this.size + '&dicType=' + this.dicType).then(resp => {
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
</style>