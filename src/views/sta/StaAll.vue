<template>
  <div>
    <div class="wrap">

      <div class="container">
        <div class="left">
          <div style="font-size: 15px; font-weight: bold">
              <span v-text="this.lastStartDate + ' ～ ' + this.lastEndDate"> </span>
            </div>
          <div style="">
            <el-button type="primary"
                       @click="exportLastData"
                       icon="el-icon-download"
                       style="background: #0e57a2;border-color: #0e57a2; display: inline-flex; margin-right: 10px">
              导出时控表
            </el-button>
          </div>
          <div>
            <el-table
                border
                style="width: 100%; margin-top: 20px;"
                height="700"
                :span-method="objectSpanLastMethod"
                :data="lastTodolists">
              <el-table-column label="上周工作" align="center">
                <el-table-column width="150"
                                 prop="userID"
                                 label="姓名"
                                 align="center">
                  <template slot-scope="scope">
                    {{scope.row.adminName.name}}
                  </template>
                </el-table-column>
                <el-table-column label="" prop="" width="80" align="center">
                  <template slot-scope="scope">
                    <span v-text="getIndex(scope.$index)"> </span>
                  </template>
                </el-table-column>
                <el-table-column prop="todoTask"
                                 width="400"
                                 label="任务"
                                 align="left">
                </el-table-column>
                <el-table-column
                    prop="planTime"
                    label="计划时间"
                    width="90">
                </el-table-column>
                <el-table-column
                    prop="taskStatusID"
                    label="状态"
                    :filters="[{ text: '进行中', value: '进行中' }, { text: '逾期', value: '逾期' }]"
                    :filter-method="filterTag"
                    filter-placement="bottom-end"
                    width="80">
                  <template slot-scope="scope">
                    <el-tag
                        :type="scope.row.taskStatusID === '完成' ? 'success' : scope.row.taskStatusID === '逾期' ? 'danger' : ''">
                      {{scope.row.taskStatusID}}
                    </el-tag>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="right">


            <div style="font-size: 15px; font-weight: bold">
              <span v-text="this.startDate + ' ～ ' + this.endDate"> </span>
            </div>
<!--            <el-tag color=white-->
<!--                    style="color: #000000; border-color: #1c1e21">-->
<!--                {{this.startDate}} -> {{this.endDate}}-->
<!--            </el-tag>-->

          <div style="">
            <el-button type="primary"
                       @click="exportThisData"
                       icon="el-icon-download"
                       style="background: #0e57a2; border-color: #0e57a2; display: inline-flex; margin-right: 10px">
              导出时控表
            </el-button>
          </div>
          <div>
            <el-table
                border
                style="width: 100%; margin-top: 20px"
                height="700"
                :span-method="objectSpanMethod"
                :data="todolists">
              <el-table-column label="本周工作" align="center" >

                <el-table-column width="150"
                                 prop="userID"
                                 label="姓名"
                                 align="center">
                  <template slot-scope="scope">
                    {{scope.row.adminName.name}}
                  </template>
                </el-table-column>
                <el-table-column label="" prop="" width="80" align="center">
                  <template slot-scope="scope">
                    <span v-text="getIndex(scope.$index)"> </span>
                  </template>
                </el-table-column>
                <el-table-column prop="todoTask"
                                 width="400"
                                 label="任务"
                                 align="left">
                </el-table-column>
                <el-table-column
                    prop="planTime"
                    label="计划时间"
                    width="90">
                </el-table-column>
                <el-table-column
                    prop="taskStatusID"
                    label="状态"
                    :filters="[{ text: '进行中', value: '进行中' }, { text: '逾期', value: '逾期' }]"
                    :filter-method="filterTag"
                    filter-placement="bottom-end"
                    width="80">
                  <template slot-scope="scope">
                    <el-tag
                        :type="scope.row.taskStatusID === '完成' ? 'success' : scope.row.taskStatusID === '逾期' ? 'danger' : ''">
                      {{scope.row.taskStatusID}}
                    </el-tag>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script>

import AllComTask from "../../components/todolist/AllComTask";
import AllDelTask from "../../components/todolist/AllDelTask";
import AllProTask from "../../components/todolist/AllProTask";

export default {
  name: "StaAll",
  data() {
    return {
      todolists:[],
      lastTodolists:[],
      startDate:'',
      endDate:'',
      lastStartDate:'',
      lastEndDate:'',
      spanArr: [],
      spanArrLast: [],
    }
  },
  mounted() {
    this.initTodolist();
    this.initLastTodolist();
    this.getCurrentWeek();
    this.getLastWeek();
    // this.onMergeLines();

  },
  methods: {
  //获取表格序号
    getIndex($index) {
      return $index + 1
    },
    exportThisData(){
      this.downloadRequest('/todolist/exportThis');
    },
    exportLastData(){
      this.downloadRequest('/todolist/exportLast');
    },
    filterTag(value, row) {
      return row.taskStatusID === value;
    },
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },
    getCurrentWeek() {
      this.getRequest('/todolist/week').then(resp =>{
        if(resp) {
          this.startDate = resp.startDate;
          this.endDate = resp.endDate;
        }
      })
    },
    getLastWeek() {
      this.getRequest('/todolist/lastWeek').then(resp =>{
        if(resp) {
          this.lastStartDate = resp.startDate;
          this.lastEndDate = resp.endDate;
        }
      })
    },
    initLastTodolist() {
      this.getRequest('/todolist/allLast').then(resp => {
        if (resp) {
          this.lastTodolists = resp;
          console.log(this.lastTodolists)
          this.lastTodolists.forEach((item, index) => {
            if (index === 0) { // 如果为第一条数据，将1加入数组，设置position为0
              this.spanArrLast.push(1);
              this.position = 0;
            } else {
              if (
                  this.lastTodolists[index].adminName.name ===
                  this.lastTodolists[index - 1].adminName.name
              ) {
                this.spanArrLast[this.position] += 1;
                this.spanArrLast.push(0);
              } else {
                this.spanArrLast.push(1);
                this.position = index;
              }
            }
          });
        }
      })

    },

    objectSpanLastMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0 ) { // 第一列
        const _row = this.spanArrLast[rowIndex]; // 获取合并行号
        const _col = _row > 0 ? 1 : 0; // 如果合并列>0，则合并行为1，否则不合并
        return {
          rowspan: _row,
          colspan: _col,
        };
      }
    },
    initTodolist() {
      this.getRequest('/todolist/all').then(resp => {
        if (resp) {
          this.todolists = resp;
          console.log(this.todolists)
          this.todolists.forEach((item, index) => {
            if (index === 0) { // 如果为第一条数据，将1加入数组，设置position为0
              this.spanArr.push(1);
              this.position = 0;
            } else {
              if (
                  this.todolists[index].adminName.name ===
                  this.todolists[index - 1].adminName.name
              ) {
                this.spanArr[this.position] += 1;
                this.spanArr.push(0);
              } else {
                this.spanArr.push(1);
                this.position = index;
              }
            }
          });
        }
      })

    },

    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0 ) { // 第一列
        const _row = this.spanArr[rowIndex]; // 获取合并行号
        const _col = _row > 0 ? 1 : 0; // 如果合并列>0，则合并行为1，否则不合并
        return {
          rowspan: _row,
          colspan: _col,
        };
      }
    },

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
  /*justify-content: center;*/
  /*align-items: center;*/
  /*background-color: #f0f2f5;*/
  /*background-image: linear-gradient(to left bottom, #ffffff, #f4f3f4, #e9e8e9, #dedcdd, #d4d1d1);*/
  width: 100%;
  /*height: 100vh;*/
  /*margin: 10px;*/
}

.container{
  width:100%;
  height:100%;
  display: flex;
  /*justify-content: space-around	;*/
  /*align-items: center;*/
}

.left, .right, form{
  display: flex;
  flex-direction: column;
  /*align-content: center;*/
  /*align-items: center;*/
  /*justify-content: center;*/
  margin: 10px;
  flex:1;
}

.left{
  /*width:500px;*/
  align-items: flex-start;
  margin-right: 100px;
}

.right{
  /*width:500px;*/
  align-items: flex-start;
}

.calendarDate {

  /*margin: 20px;*/
  width: 90%;
  font-size: 20px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);

}

.todolistTab {
  /*height: calc(100vh - 110px);*/

  /*overflow-y: auto;*/
}
.todolistTab {
  /*height: calc(100vh - 110px);*/
  /*overflow-y: auto;*/
  /*border-radius: 15px;*/
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
}

.box-card {
  width: 700px;
  height: 700px;
}

</style>
