<template>
  <div>
    <el-tabs v-model="activeName" type="border-card">
      <el-tab-pane label="部门管理" name="DepMana"><DepMana></DepMana></el-tab-pane>
      <el-tab-pane label="职位管理" name="PosMana"><PosMana></PosMana></el-tab-pane>
      <el-tab-pane label="职称管理" name="JobLevelMana"><JobLevelMana></JobLevelMana></el-tab-pane>
<!--      <el-tab-pane label="奖惩规则" name="EcMana"><EcMana></EcMana></el-tab-pane>-->
      <el-tab-pane label="权限组" name="PermissMana"><PermissMana></PermissMana></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

import DepMana from "../../components/DepMana";
// import EcMana from "../../components/EcMana";
import JobLevelMana from "../../components/JobLevelMana";
import PermissMana from "../../components/PermissMana";
import PosMana from "../../components/PosMana";

export default {
  name: "SysBasic",
  data() {
    return {
      activeName: 'DepMana'
    }
  },
  components:{
    DepMana,
    PosMana,
    JobLevelMana,
    // EcMana,
    PermissMana
  }

}
</script>

<style scoped>

</style>