<template>
  <div>
    <div style="display: flex; justify-content: center; margin-top: 50px">
      <el-input
          v-model="keywords"
          size="big"
          placeholder="通过用户名搜索用户.."
          prefix-icon="el-icon-search"
          style=
              "width: 400px;
              margin-right: 10px"
          @keydown.enter.native="doSearch">
      </el-input>
      <el-button
          type="primary"
          prefix-icon="el-icon-search"
          style="background-color: #0e57a2;
          border-color: #0e57a2"
          @click="doSearch">
        搜索
      </el-button>
      <el-button
          type="primary"
          style=
              "background-color: #5a5959;
              border-color: #5a5959"
          @click="resetAdmins">
        重置
      </el-button>
    </div>
    <div class="adminContainer">
      <el-card class="adminCard" v-for="(admin, index) in admins" :key="index">
        <div slot="header" class="clearfix">
          <span style="font-weight: bold">{{ admin.name }}</span>
          <el-button
              style=
                  "float: right;
                  padding: 3px 0;
                  color: red"
              type="text"
              @click="deleteAdmin(admin)"
              icon="el-icon-delete">
          </el-button>
        </div>
<!--        <div>-->
<!--          <div class="imageContainer">-->
<!--            <img :src="'../assets/' + admin.userFace" :alt="admin.name" :title="admin.name" class="userFaceImage">-->
<!--          </div>-->
<!--        </div>-->
        <div class="userInfoContainer">
          <div style="font-weight: bold">激活状态：
            <el-switch
                class="switchModel"
                v-model="admin.enabled"
                active-color="#0e57a2"
                @change="enabledChange(admin)"
                inactive-color="#dcdfe6">
            </el-switch>
          </div>
          <div>
            <span style="font-weight: bold">
              用户角色：
            </span>
            <el-tag size="mini" v-for="(role, indexj) in admin.roles" :key="indexj" style="margin-left: 4px">
              {{role.nameZh}}
            </el-tag>

            <el-popover
                placement="right"
                title="角色列表"
                width="200"
                style="margin-left: 10px"
                @show="showPop(admin)"
                @hide="hidePop(admin)"
                trigger="click">
              <el-select v-model="selectRoles" multiple placeholder="请选择">
                <el-option
                    v-for="(r, index) in allRoles"
                    :key="index"
                    :label="r.nameZh"
                    :value="r.id">
                </el-option>
              </el-select>
              <el-button slot="reference" type="text" icon="el-icon-edit"></el-button>
            </el-popover>
          </div>
<!--          <div style="margin-top: 10px">-->
<!--            <span style="font-weight: bold">-->
<!--              备注信息：-->
<!--            </span>-->
<!--            {{admin.remark}}-->
<!--          </div>-->
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "SysAdmin",
    data(){
    return{
      admins:[],
      keywords: '',
      allRoles:[],
      selectRoles:[]
    }
  },
  mounted() {
    this.initAdmins();
  },
  methods:{
    // TODO
    hidePop(admin) {
      let roles = [];
      Object.assign(roles, admin.roles);
      let flag = false;
      if (roles.length!==this.selectRoles.length) {
        flag = true;
      } else {
        for (let i = 0; i < roles.length; i++) {
          let role = roles[i];
          for (let j = 0; j < this.selectRoles.length; j++) {
            let sr = this.selectRoles[j];
            if (role.id === sr) {
              roles.splice(i, 1);
              i-- ;
              break;
            }
          }
        }
        if (roles.length!==0) {
          flag = true;
        }
      }
      if (flag) {
        let url = '/system/admin/role?adminId=' + admin.id;
        this.selectRoles.forEach(sr=>{
          url += '&rids=' + sr;
        });
        this.putRequest(url).then(resp=>{
          if(resp) {
            this.initAdmins();
          }
        })
      }

    },
    // TODO
    showPop(admin) {
      this.initAllRoles();
      let roles = admin.roles;
      this.selectRoles = [];
      roles.forEach(r=>{
        this.selectRoles.push(r.id);
      })
    },
    initAllRoles() {
      this.getRequest('/system/admin/roles').then(resp=>{
        if(resp){
          this.allRoles = resp;
        }
      })
    },
    enabledChange(admin) {
      this.putRequest('/system/admin/', admin).then(resp=>{
        if(resp) {
          this.initAdmins()
        }
      })
    },
    deleteAdmin(admin) {
      this.$confirm('此操作将永久删除该[' + admin.name + ']操作员, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteRequest('/system/admin/' + admin.id).then(resp=>{
          if(resp) {
            this.resetAdmins();
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
    resetAdmins() {
      this.getRequest('/system/admin/').then(resp=>{
        if(resp) {
          this.admins = resp;
        }
      })
    },
    doSearch(){
     this.initAdmins()
    },
    initAdmins(){
      this.getRequest('system/admin/?keywords=' + this.keywords).then(resp=>{
        if(resp) {
          this.admins = resp;
        }
      })
    }
  }
}

</script>

<style scoped>

.adminCard {
  margin: 30px;
  /*margin-top: 20px;*/
  /*margin-right: 50px;*/
  /*justify-content: space-between;*/
  width: 300px;
}

.adminContainer {
  display: flex;
  margin-top: 30px;
  justify-content: left;
  flex-wrap: wrap;

}

.userFaceImage {
  width: 72px;
  height: 72px;
  border-radius: 72px;
  font-size: 10px;
}

.clearfix {
  font-size: 15px;
}

.imageContainer {
  width: 100%;
  display: flex;
  justify-content: center;
}

.userInfoContainer {
  font-size: 12px;
}

.switchModel {
  width: 50px;
  height: 2px;
  margin-top: 20px;
  margin-bottom: 20px;
}

</style>
