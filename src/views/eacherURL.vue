<template>
  <div class="print">
      <p>我是弹窗组建</p>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      >
      <span>大哥好啊，getoutway bitch get out myway</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="closeDialog">取 消</el-button>
    <el-button type="primary" @click="sureDialog">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>
<script>
 
  export default {
    name: 'print',
    props:{
      isShow:{
        type:Boolean,
        default:false
      },
    },
    data () {
      return {
        dialogVisible: this.isShow
      }
    },
    watch: {
      isShow () {
        this.dialogVisible = this.isShow;
        console.log(this.dialogVisible)
      }
    },
    mounted(){
    },
 
    methods:{
 
      closeDialog(){
          this.dialogVisible=false
          this.$emit('closeDialogFather',this.dialogVisible);
      },
      sureDialog(){
        this.$emit('sureDialogFather');
      },
    },
  }
</script>