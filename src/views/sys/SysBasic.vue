<template>
  <div>
    <el-tabs v-model="activeName" type="border-card">
      <el-tab-pane label="部门管理" name="DeptManage">
        <h1>部门管理</h1>
        <table border="1">
          <tr>
            <td>姓名</td>
            <td>地址</td>
          </tr>
          <tr>
            <td>张三</td>
            <td>上海</td>
          </tr>
        </table>
      </el-tab-pane>
      <el-tab-pane label="职位管理" name="JobManage">职位管理</el-tab-pane>
      <el-tab-pane label="职称管理" name="TitleManage">职称管理</el-tab-pane>
      <el-tab-pane label="奖惩规则" name="RwdPnsManage">奖惩规则</el-tab-pane>
      <el-tab-pane label="权限组" name="RightsManage">权限组</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "SysBasic",
  data() {
    return {
      activeName: 'DeptManage'
    }
  }
}
</script>

<style scoped>

</style>