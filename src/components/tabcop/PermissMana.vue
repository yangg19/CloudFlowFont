<template>
  <div>
    <div class="permissManaTool">
      <el-input v-model="role.name" size="small" placeholder="请输入角色英文名">
        <template slot="prepend">Role_</template>
      </el-input>
      <el-input v-model="role.nameZh" size="small" placeholder="请输入角色中文名" @keydown.enter.native="doAddRoles" />
      <el-button size="small" type="primary" icon="el-icon-plus" @click="doAddRoles">添加角色</el-button>
    </div>
    <div class="permissManaMain">
      <el-collapse v-model="activeName" accordion @change="change">
        <el-collapse-item v-for="(r, index) in roles" :key="index" :title="r.nameZh" :name="r.id">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>可访问资源</span>
              <el-button style="float: right; padding: 3px 0; color: #ff0000" icon="el-icon-delete" type="text" @click="doDeleteRule(r)">删除
              </el-button>
            </div>
            <div>
              <el-tree
                ref="tree"
                :key="index"
                show-checkbox
                :data="menuList"
                :props="defaultProps"
                :default-checked-keys="selectMenus"
                node-key="id"
              />
              <div style="display: flex; justify-content: flex-end; margin-top: 10px">
                <el-button size="mini" @click="cancelUpdate">取消修改</el-button>
                <el-button
                  size="mini"
                  type="primary"
                  style="background-color: #0e57a2; border-color: #0e57a2"
                  @click="doUpdate(r.id, index)"
                >确认修改</el-button>
              </div>
            </div>
          </el-card>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PermissMana',
  data() {
    return {
      role: {
        name: '',
        nameZh: ''
      },
      roles: [],
      menuList: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      selectMenus: [],
      activeName: -1
    }
  },
  mounted() {
    this.initRoles()
  },
  methods: {
    doDeleteRule(role) {
      this.$confirm('此操作将永久删除该[' + role.name + ']角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteRequest('/system/basic/permiss/role/' + role.id).then(resp => {
          if (resp) {
            this.initRoles()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    doAddRoles() {
      if (this.role.name && this.role.nameZh) {
        this.postRequest('/system/basic/permiss/role', this.role).then(resp => {
          if (resp) {
            this.initRoles()
            this.role.name = ''
            this.role.nameZh = ''
          }
        })
      } else {
        this.$message.error('所有字段不能为空！')
      }
    },
    cancelUpdate() {
      this.activeName = -1
    },
    doUpdate(rid, index) {
      const tree = this.$refs.tree[index]
      const selectKeys = tree.getCheckedKeys(true)
      let url = '/system/basic/permiss/?rid=' + rid
      selectKeys.forEach(key => {
        url += '&mids=' + key
      })
      this.putRequest(url).then(resp => {
        if (resp) {
          this.initRoles()
          // this.activeName = -1;
        }
      })
    },
    initSelectedMenus(rid) {
      this.getRequest('/system/basic/permiss/mid/' + rid).then(resp => {
        if (resp) {
          this.selectMenus = resp
        }
      })
    },
    change(rid) {
      if (rid) {
        this.initMenuList()
        this.initSelectedMenus(rid)
      }
    },
    initMenuList() {
      this.getRequest('/system/basic/permiss/menuList').then(resp => {
        if (resp) {
          this.menuList = resp
        }
      })
    },
    initRoles() {
      this.getRequest('/system/basic/permiss/').then(resp => {
        if (resp) {
          this.roles = resp
        }
      })
    }
  }
}
</script>

<style scoped>
.permissManaTool {
  display: flex;
  justify-content: flex-start;
}

.permissManaTool .el-input {
  margin-right: 10px;
  width: 300px;
}

.permissManaTool .el-button {
  background-color: #0e57a2;
  border-color: #0e57a2;
}

.permissManaMain {
  margin-top: 10px;
  width: 700px;
}
</style>
