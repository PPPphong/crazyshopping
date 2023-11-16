<template>
  <div class="search-tap">
    <el-input :placeholder="placeholder" icon="search" v-model="searchData" :on-icon-click="handleIconClick" :style="{width:width+'px'}" @keyup.native="handleIconClick">
    </el-input>
    <div class="tab-box" v-if="show" @click.stop="show = true">
      <el-checkbox-group v-model="checkboxGroup" @change="handleChange">
        <el-checkbox-button v-for="item in allItem" :label="item" :key="item">{{item}}</el-checkbox-button>
      </el-checkbox-group>
    </div>
    <div>
      <el-tag v-for="(tag,i) in checkboxGroup" :key="tag" :closable="true" type="primary" @close="closeTag">
        {{tag}}
      </el-tag>
    </div>
  </div>
</template>

<script>
Array.prototype.diff = function(a) {
  return this.filter(function(i) { return a.indexOf(i) < 0; });
};

//函数节流优化
let first = true, time = null;

function http(self) {
  time = setTimeout(function() {
    fn(self)
    clearTimeout(time);
    time = null
  }, 600);
}
async function fn(self) {
  self.result = await self.ajax(self.searchData);

  if (self.tag) {
    self.loadChecked();
    self.handleChange();
    self.tag = false
  }
}


export default {
  props: {
    //输入框的placeholder
    placeholder: {
      type: String,
      default: function() {
        return "请输入"
      }
    },
    // 输入框的宽度
    width: {
      type: Number,
      default: function() {
        return 200
      }
    },
    ajax: {
      type: Function,
    },
    //所有选项的list字段名
    listFiled: {
      type: String,
      function() {
        return "data"
      }
    },
    //需要展示的文本的字段名
    text: {
      type: String,
      function() {
        return "name"
      }
    },
    //已选中的list字段名
    checkedListFiled: {
      type: String,
      function() {
        return "checked"
      }
    }
  },
  mounted() {
    document.body.addEventListener("click",()=>{
      if (this.show) this.show = false;
    },false);
  },
  data() {
    return {
      // 搜索关键字
      searchData: '',
      //未加工的搜索的结果
      result: {},
      //选中的值
      checkboxGroup: [],
      //是否是第一次搜索
      tag: true,
      //所有被选中的值。
      allChecked: [],
      //否是展示选项框
      show: false,
    }
  },
  computed: {
    // 所有的选项
    allItem() {
      if (!this.result[this.listFiled]) return
      let list = this.result[this.listFiled];
      return this.translate(list)
    },

  },
  methods: {
    async handleIconClick(ev) {
      ev.stopPropagation();
      if (!this.ajax) return
      this.show = true;

      //通过函数节流优化
      if (first) {
        fn(this);
        first = false;
      }
      if (time) return
      http(this)
    },
    //数据加工
    translate(list) {
      let arr = [];
      for (let item of list) {
        arr.push(item[this.text]);
      }
      return arr
    },
    //数据还原格式
    dataRestore(list) {
      let arr = [];
      for (let item of list) {
        for (let d of this.result[this.listFiled]) {
          if (item === d[this.text]) {
            arr.push(d);
            break;
          }
        }
      }
      return arr
    },
    //把已选中添加到checkboxGroup中监听。
    loadChecked() {
      if (!this.result[this.checkedListFiled]) return []
      let list = this.result[this.checkedListFiled];
      let newArr = this.translate(list);
      this.checkboxGroup = newArr;
    },

    //选项发生变化,将选中的数据传出去
    handleChange() {
      // 未选中的值
      let diffArr = this.allItem.diff(this.checkboxGroup);

      let checked = this.dataRestore(this.checkboxGroup);
      this.result[this.checkedListFiled] = checked;

      //将选中的值存入allChecked大容器中
      for (let item of checked) {
        let flag = true;
        for (let i of this.allChecked) {
          if (item[this.text] === i[this.text]) {
            flag = false;
          }
        }
        if (flag) {
          this.allChecked.push(item);
        }
      }

      //将未选中的值从allChecked中剔除
      for (let i = 0; i < this.allChecked.length; i++) {
        let item = this.allChecked[i];
        if (~diffArr.indexOf(item[this.text])) {
          this.allChecked.splice(i, 1);
        }
      }
      //传出数据
      this.$emit("searchTapChange", this.allChecked);
    },
    //删除tag
    closeTag(e) {
      let val = e.target.parentNode.innerText.trim();
      let index = this.checkboxGroup.indexOf(val);
      this.checkboxGroup.splice(index, 1);
      this.handleChange();
    }

  }
}




</script>

<style lang="scss" scoped>
.search-tap {
  position: relative;
  .tab-box {
    position: absolute;
    top: 40px;
    left: 0px;
    border: 1px solid #C2CAD2;
    background: #fff;
    padding: 10px;
    z-index: 4;
  }
  .el-tag {
    border-radius: 0;
    background: #EFF7F9;
    border: 1px solid #C2EAF8;
    padding: 8px 10px;
    line-height: 0px;
    height: 32px;
    margin-left: 0px !important;
    margin: 5px 10px 5px 0;
    color: #33b2df;
  }
  .el-tag+.el-tag {
    margin-left: 10px;
  }
}
</style>