<template>
  <div class="wrap">
    <div class="left">
    </div>
    <div class="right">
      <el-tabs class="todolistTab"
               v-model="activeName"
               type="border-card">
        <el-tab-pane label="任务清单" name="ProTask"><ProTask></ProTask></el-tab-pane>
        <el-tab-pane label="过期任务" name="OverTask"><OverTask></OverTask></el-tab-pane>
        <el-tab-pane label="完成任务" name="ComTask"><ComTask></ComTask></el-tab-pane>
      </el-tabs>
    </div>

  </div>
</template>

<script>

import ComTask from "../../components/todolist/ComTask";
import OverTask from "../../components/todolist/OverTask";
import ProTask from "../../components/todolist/ProTask";

export default {
  name: "StaAll",
  data() {
    return {
      activeName: 'ProTask'
    }
  },
  components:{
    ComTask,
    OverTask,
    ProTask
  }

}
</script>

<style scoped>
.todolistTab {
  height: 650px;
  /*margin: 50px;*/
}

.wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  /*background-image: linear-gradient(to left bottom, #ffffff, #f4f3f4, #e9e8e9, #dedcdd, #d4d1d1);*/
  width: 100%;
  /*height: 100vh;*/
}

.left, .right{
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: center;
  margin: 10px;
  /*flex:1;*/
}

.left{
  width:500px;
  align-items: flex-start;
  margin-right: 200px;
}

.right{
  width:500px;
  align-items: flex-end;
}
.todo-today{

}

.todo-repo{
  margin-top: 20px;
}
</style>