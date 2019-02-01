<template>
  <div class="settings">
    <el-breadcrumb>
      <el-breadcrumb-item to="/main">首页</el-breadcrumb-item>
      <el-breadcrumb-item>全局设置</el-breadcrumb-item>
    </el-breadcrumb>
    <br>
    <el-card shadow="never">
      <el-form label-width="140px">
        <el-form-item label="应用名称:" >
          <el-input v-model="formData.appName"></el-input>
        </el-form-item>
        <el-form-item label="应用API网址:" >
            <el-input v-model="formData.apiUrl"></el-input>
        </el-form-item>
        <el-form-item label="后台管理端网址：" >
            <el-input v-model="formData.adminUrl"></el-input>
        </el-form-item>
        <el-form-item label="客户端App网址：" >
            <el-input v-model="formData.appUrl"></el-input>
        </el-form-item>
        <el-form-item label="客ICP备案号：" >
            <el-input v-model="formData.icp"></el-input>
        </el-form-item>
        <el-form-item label="版权声明：" >
            <el-input v-model="formData.copyright"></el-input>
        </el-form-item>
        <el-form-item >
            <el-button type="primary" @click="doSubmit">确定</el-button>
            <el-button @click="doCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
  export default{
    data() {
      return {
        formData:{
          appName:this.$store.state.globalSettings.appName,apiUrl:this.$store.state.globalSettings.apiUrl,adminUrl:this.$store.state.globalSettings.adminUrl,appUrl:this.$store.state.globalSettings.appUrl,
          icp:this.$store.state.globalSettings.icp,copyright:this.$store.state.globalSettings.copyright,
        }
      }
    },
    methods:{
      doSubmit(){
        var url=this.$store.state.globalSettings.apiUrl+'/admin/settings';
        var data=this.formData;
        this.$axios.put(url,data).then((res)=>{
          console.log(res);
          if(res.data.code==200){//数据库中全局信息修改成功
            this.$message.success('全局设置修改成功！');
            //修改$store中的全局信息
            this.$store.state.globalSettings={
              apiUrl:this.formData.apiUrl,
              appName:this.formData.appName,
              adminUrl:this.formData.adminUrl,
              appUrl:this.formData.appUrl,
              icp:this.formData.icp,
              copyright:this.formData.copyright
            };

          }else{
            this.$message.error('全局设置修改失败！');
          }

        }).catch((err)=>{
          console.log(err);
        })
      },
      doCancel(){
        this.formData={
          
          appName:this.$store.state.globalSettings.appName,apiUrl:this.$store.state.globalSettings.apiUrl,adminUrl:this.$store.state.globalSettings.adminUrl,appUrl:this.$store.state.globalSettings.appUrl,
          icp:this.$store.state.globalSettings.icp,copyright:this.$store.state.globalSettings.copyright,
        
        }
      }
    }
  }
</script>
