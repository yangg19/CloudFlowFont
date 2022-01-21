<template>
  <div>
    <div>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">概览</el-menu-item>
        <el-submenu index="2">
          <template slot="title">修改信息</template>
          <el-menu-item index="2-1">个人信息修改</el-menu-item>
          <el-menu-item index="/passInfo">密码修改</el-menu-item>
          <el-menu-item index="2-3">密码找回</el-menu-item>
        </el-submenu>
        <el-menu-item index="3">消息中心</el-menu-item>
        <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  name: "StaPers",
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1',
    };
  },
  methods: {
    handleSelect(index) {
      this.$router.push(index);
    }
  }
}
</script>

<style scoped>
.el-menu-demo{
  display: flex;
  justify-content: flex-end;
  font-weight: bolder;
}
</style>