<template>
  <div>
      <el-button type="success" class="btn" @click="btn">登录</el-button>
  </div>
</template>

<script>
export default {
data(){
    return{}
},
methods:{
    btn(){
        this.$router.push('/login')
    }
}
}
</script>

<style>
body{
    background-color: rgb(5, 5, 66);
}
.btn{
    float: right;
}
</style>