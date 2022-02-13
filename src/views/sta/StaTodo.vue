<template>
  <div>
    <div class="wrap">
      <div class="container">
        <el-tabs class="todolistTab"
                 v-model="activeName"
                 @tab-click="handleClick">
          <el-tab-pane label="任务清单" name="AllProTask">
            <AllProTask v-if="isProTaskUpdate"></AllProTask>
          </el-tab-pane>
          <el-tab-pane label="完成任务" name="AllComTask">
            <AllComTask v-if="isComTaskUpdate"></AllComTask>
          </el-tab-pane>
          <el-tab-pane label="删除任务" name="AllDelTask">
            <AllDelTask v-if="isDelTaskUpdate"></AllDelTask>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>

import AllComTask from "../../components/todolist/AllComTask";
import AllDelTask from "../../components/todolist/AllDelTask";
import AllProTask from "../../components/todolist/AllProTask";

export default {
  name: "StaTodo",
  data() {
    return {
      isProTaskUpdate:true,
      isComTaskUpdate:false,
      isDelTaskUpdate:false,
      activeName: 'AllProTask'
    }
  },
  components:{
    AllComTask,
    AllProTask,
    AllDelTask
  },
  methods:{
    handleClick(tab) {
      if(tab.name === "AllProTask") {
        this.isProTaskUpdate = true;
        this.isComTaskUpdate = false;
        this.isDelTaskUpdate = false;
      } else if(tab.name === "AllComTask") {
        this.isProTaskUpdate = false;
        this.isComTaskUpdate = true;
        this.isDelTaskUpdate = false;
      } else if(tab.name == "AllDelTask") {
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

.todolistTab {
  /*height: calc(100vh - 110px);*/

  /*overflow-y: auto;*/
}
/*.todolistTab {*/
/*  !*height: calc(100vh - 110px);*!*/
/*  !*overflow-y: auto;*!*/
/*  !*border-radius: 15px;*!*/
/*  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);*/
/*}*/

.box-card {
  width: 1000px;
  height: 1000px;
}
</style>
