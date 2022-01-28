<template>
  <div>
    <el-tabs v-model="activeName" type="border-card">
      <el-tab-pane label="部门管理" name="DepMana"><DepMana></DepMana></el-tab-pane>
      <el-tab-pane label="职位管理" name="PosMana"><PosMana></PosMana></el-tab-pane>
      <el-tab-pane label="职称管理" name="JobLevelMana"><JobLevelMana></JobLevelMana></el-tab-pane>
      <el-tab-pane label="权限组" name="PermissMana"><PermissMana></PermissMana></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

import DepMana from "../../components/tabcop/DepMana";
import JobLevelMana from "../../components/tabcop/JobLevelMana";
import PermissMana from "../../components/tabcop/PermissMana";
import PosMana from "../../components/tabcop/PosMana";

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