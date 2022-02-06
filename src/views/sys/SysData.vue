<template>
  <div>
    <el-table
        :data="dataTable"
        :span-method="objectSpanMethod"
        style="width: 100%">
      <el-table-column
          prop="category"
          label="种类"
          width="180">
      </el-table-column>
      <el-table-column
          prop="name"
          label="名称"
          width="180">
      </el-table-column>
      <el-table-column
          prop="price"
          label="价格"
          width="180">
      </el-table-column>
      <el-table-column
          prop="count"
          label="数量"
          width="180">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "SysData",
  data() {
    return {
      dataTable: [{
        category: '水果',
        name: '苹果',
        price: 2,
        count: 10,
        subtotal:1
      },{
        category: '水果',
        name: '苹果',
        price: 3,
        count: 20,
        subtotal:1
      },{
        category: '肉食',
        name: '牛肉',
        price: 4,
        count: 10,
        subtotal:1
      },{
        category: '蔬菜',
        name: '白菜',
        price: 4,
        count: 10,
        subtotal:1
      }
        ,{
          category: '蔬菜',
          name: '白菜',
          price: 4,
          count: 10,
          subtotal:1
        }
      ,{
        category: '肉食',
        name: '猪肉',
        price: 5,
        count: 10,
        subtotal:1
      }],
      spanArr: [],
    }
  },
  mounted() {
    this.onMergeLines();
  },
  methods: {
    onMergeLines() {
      this.dataTable.forEach((item, index) => {
        if (index === 0) { // 如果为第一条数据，将1加入数组，设置position为0
          this.spanArr.push(1);
          this.position = 0;
        } else {
          if (
              this.dataTable[index].name ===
              this.dataTable[index - 1].name
          ) {
            this.spanArr[this.position] += 1;
            this.spanArr.push(0);
          } else {
            this.spanArr.push(1);
            this.position = index;
          }
        }
      });
    },

    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      console.log(row, column);
      if (columnIndex === 1 ) { // 第一列
        const _row = this.spanArr[rowIndex]; // 获取合并行号
        const _col = _row > 0 ? 1 : 0; // 如果合并列>0，则合并行为1，否则不合并
        return {
          rowspan: _row,
          colspan: _col,
        };
      }
    }
    // objectSpanMethod({row, column, rowIndex, columnIndex}) { // row 当前行， column 当前列， rowIndex 当前行号， columnIndex 当前列号
    //   // 该函数可以返回一个包含两个元素的数组
    //   // 第一个元素代表rowspan，第二个元素代表colspan。
    //   // 也可以返回一个键名为rowspan和colspan的对象。
    //   if (columnIndex === 0) {
    //     if (rowIndex % 2 === 0) {
    //       return {
    //         rowspan: 2, // 行有2行合并
    //         colspan: 1 // 列有1列合并
    //         // 这里要写一个else的判断,不然被合并列的原始数据会填充到合并之后的表格里
    //         // 这个判断是把合并的第3列,第4列的值省略,在合并的表格右边直接填原先第5列的值,合并了几列,就省略几列的值
    //       };
    //     } else {
    //       return {
    //         rowspan: 0,
    //         colspan: 0
    //       };
    //     }
    //   }
    // }
  }
}
</script>

<style scoped>

</style>
