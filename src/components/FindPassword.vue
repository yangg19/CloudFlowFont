<template>
  <div>
    <div>
      <el-menu :default-active="activeIndex" class="userMenu" mode="horizontal" @select="handleSelect" router>
        <el-menu-item index="/userInfo">概览</el-menu-item>
        <el-submenu index="2">
          <template slot="title">密码相关</template>
          <el-menu-item index="/passInfo">密码修改</el-menu-item>
          <el-menu-item index="/findPassword">密码保护</el-menu-item>
        </el-submenu>
        <el-menu-item index="/messageCenter">消息中心</el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  name: "FindMessage",
  methods:{
    handleSelect(index) {
      this.$router.push(index);
    }
  }
}
</script>

<style scoped>
.userMenu {
  display: flex;
  justify-content: flex-end;
}
</style>