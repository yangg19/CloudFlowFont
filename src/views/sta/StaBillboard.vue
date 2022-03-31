<template>

  <div>
    <div style="width: 44%">
      <el-input
          v-model="billboard.noticeContent"
          class="billboardText"
          type="textarea"
          :rows="2"
          placeholder="请输入内容通知内容"
          :autosize="{ minRows: 20, maxRows: 30}"
          show-word-limit
          clearable
          size="medium"
          style="font-size: 20px; text-align:left; font-family: 新宋体"
          maxlength="2000"
      />
      <div style="margin-top: 15px; float: right">
        <el-button
            style="background: #0e57a2; border-color: #0e57a2; color: #ffffff"
            @click="updateNotice"
        >提交</el-button>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  name: 'StaBillboard',
  data() {
    return {
      billboard: {
        id: 1,
        noticeContent: ''
      },
      createDate: ''
    }
  },
  mounted() {
    this.notice()
  },
  methods: {
    notice() {
      this.getRequest('/billboard/').then(resp => {
        if (resp) {
          this.billboard.noticeContent = resp.noticeContent
          this.createDate = resp.createDate
        }
      })
    },
    updateNotice() {
      console.log(this.billboard.noticeContent)
      console.log(this.billboard)
      this.putRequest('/billboard/', this.billboard).then(resp => {
        if (resp) {
          this.notice()
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
