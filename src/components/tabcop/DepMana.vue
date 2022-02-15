<template>
  <div style="width: 500px">
    <el-input
      v-model="filterText"
      placeholder="搜索部门..."
      prefix-icon="el-icon-search"
      style="margin-bottom: 20px"
    />

    <el-tree
      ref="tree"
      :data="deps"
      :props="defaultProps"
      :filter-node-method="filterNode"
      :expand-on-click-node="false"
      style="font-size: 12px"
      default-expand-all
    >
      <span
        slot-scope="{ node, data }"
        class="custom-tree-node"
        style="display: flex; justify-content: space-between; width: 100%"
      >
        <span>{{ data.name }}</span>
        <span>
          <el-button
            type="primary"
            size="mini"
            class="depButton"
            @click="() => showAddDep(data)"
          >
            添加
          </el-button>
          <el-button
            type="danger"
            size="mini"
            class="depButton"
            @click="() => deleteDep(data)"
          >
            删除
          </el-button>
        </span>
      </span>
    </el-tree>
    <el-dialog
      title="添加部门"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <div>
        <table>
          <tr>
            <td>
              <el-tag style="margin-right: 10px">上级部门</el-tag>
            </td>
            <td>{{ pname }}</td>
          </tr>
          <tr>
            <td>
              <el-tag>部门名称</el-tag>
            </td>
            <td>
              <el-input v-model="dep.name" placeholder="请输入部门名称.." />
            </td>
          </tr>
        </table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="doAddDep">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'DepMana',
  data() {
    return {
      filterText: '',
      deps: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      dialogVisible: false,
      dep: {
        name: '',
        parentId: -1
      },
      pname: ''
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  mounted() {
    this.initDeps()
  },
  methods: {
    initDep() {
      this.dep = {
        name: '',
        parentId: -1
      }
      this.pname = ''
    },
    addDep2Deps(deps, dep) { // 部门列表，添加的部门信息
      for (let i = 0; i < deps.length; i++) { // 遍历部门列表
        const d = deps[i] // 临时变量：当前列表的部门信息
        if (d.id === dep.parentId) { // 如果当前部门是添加部门的父节点，在当前部门的子节点列表中拼接新的部门信息，否则继续递归
          d.children = d.children.concat(dep)
          if (d.children.length > 0) {
            d.isParent = true
          }
          return
        } else {
          this.addDep2Deps(d.children, dep)
        }
      }
    },
    doAddDep() {
      this.postRequest('/system/basic/department/', this.dep).then(resp => {
        if (resp) {
          this.addDep2Deps(this.deps, resp.obj)
          this.dialogVisible = false
          this.initDep()
        }
      })
    },
    showAddDep(data) {
      this.dep.parentId = data.id
      this.pname = data.name
      this.dialogVisible = true
    },
    removeDepFromDeps(p, deps, id) {
      for (let i = 0; i < deps.length; i++) {
        const d = deps[i]
        if (d.id === id) { // 递归到需要删除的部门
          deps.splice(i, 1)

          if (deps.length === 0) {
            p.isParent = false
          }
          return
        } else {
          this.removeDepFromDeps(d, d.children, id)
        }
      }
    },
    deleteDep(data) {
      if (data.isParent) {
        this.$message.error('该部门存在子部门，删除失败！')
      } else {
        this.$confirm('此操作将永久删除[' + data.name + ']部门, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteRequest('/system/basic/department/' + data.id).then(resp => {
            if (resp) {
              this.removeDepFromDeps(null, this.deps, data.id)
              // this.dialogVisible =false;
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    },
    initDeps() {
      this.getRequest('/system/basic/department/').then(resp => {
        if (resp) {
          this.deps = resp
        }
      })
    },
    filterNode(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    }
  }
}
</script>

<style scoped>
.depButton{
  /*margin-left: 10px;*/
  padding: 2px;
}

</style>
