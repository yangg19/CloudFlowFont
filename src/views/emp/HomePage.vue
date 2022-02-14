<template>
  <div class="wrap">
    <div class="container">
      <div class="left">
        <div>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>通知</span>
            </div>
            <div>
              <el-input
                  class="billboardText"
                  type="textarea"
                  :rows="2"
                  overflow:hidden
                  :autosize="{ minRows: 10, maxRows: 20}"
                  show-word-limit
                  clearable
                  size="medium"
                  style="font-size: 20px; text-align:left; font-family: 新宋体"
                  v-model="billboard.noticeContent">
              </el-input>
            </div>

          </el-card>
        </div>
      </div>
      <div class="right">
        <el-tabs class="todolistTab"
                 v-model="activeName"
                 @tab-click="handleClick"
                 stretch
                 type="border-card">
          <el-tab-pane label="任务清单" name="ProTask">
            <ProTask v-if="isProTaskUpdate"></ProTask>
          </el-tab-pane>
          <el-tab-pane label="完成任务" name="ComTask">
            <ComTask v-if="isComTaskUpdate"></ComTask>
          </el-tab-pane>
          <el-tab-pane label="删除任务" name="DelTask">
            <DelTask v-if="isDelTaskUpdate"></DelTask>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>

</template>

<script>
import ComTask from "../../components/todolist/ComTask";
import ProTask from "../../components/todolist/ProTask";
import DelTask from "../../components/todolist/DelTask";

export default {
name: "HomePage",
  data() {
    return {
      isProTaskUpdate:true,
      isComTaskUpdate:false,
      isDelTaskUpdate:false,
      calendarDate: new Date(),
      activeName: 'ProTask',
      addDialogVisible: false,
      repoDialogVisible: false,
      finishDialogVisible: false,
      billboard:{
        noticeContent: '',
        createDate: ''
      }
    }
  },
  components:{
    ComTask,
    ProTask,
    DelTask
  },
  mounted(){
    this.notice()
  },
  methods:{
    notice() {
      this.getRequest('/billboard/').then(resp=>{
        if(resp) {
          this.billboard.noticeContent = resp.noticeContent;
          this.billboard.createDate = resp.createDate;
        }
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    },
    handleClick(tab) {
      if(tab.name === "ProTask") {
        this.isProTaskUpdate = true;
        this.isComTaskUpdate = false;
        this.isDelTaskUpdate = false;
      } else if(tab.name === "ComTask") {
        this.isProTaskUpdate = false;
        this.isComTaskUpdate = true;
        this.isDelTaskUpdate = false;
      } else if(tab.name === "DelTask") {
        this.isProTaskUpdate = false;
        this.isComTaskUpdate = false;
        this.isDelTaskUpdate = true;
      }
    },
  }
}
</script>

<style scoped>
*{
  margin: 0;
  /*padding: 0;*/
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
  margin: 30px;
  /*flex:1;*/
}

.left{
  /*width:500px;*/
  align-items: flex-end;
  margin-right: 50px;
}

.right{
  /*width:500px;*/
  align-items: flex-start;
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
  padding: 10px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
}


/* 如果你的 el-input type 设置成textarea ，就要用这个了 */
.billboardText>>>.el-textarea__inner {
  border: 0;
  resize: none;/* 这个是去掉 textarea 下面拉伸的那个标志，如下图 */
}

</style>
