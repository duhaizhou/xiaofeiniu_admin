<template>
  <div class="login">
    <el-card class="xfn-login-card">
      <div slot="header">管理员登陆</div>
      <div>
        <el-form :model="formData" :rules="rules" ref="formData " label-width="100px">
          <el-form-item label="管理员名：" prop="aname">
            <el-input v-model="formData.aname" placeholder="请输入管理员名"></el-input>
          </el-form-item>

          <el-form-item label="登陆密码：" prop="apwd">
            <el-input type="password" v-model="formData.apwd" placeholder="请输入管理员密码" ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="doLogin">登陆</el-button>
            <el-button @click="doCancel">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default{
    data() {
      return {
        rules:{
          aname:{required:true,message: '用户名不能为空',trigger:'blur'},
          apwd:{required:true,message:'密码不能为空',trigger:'blur'}
        },
        formData:{//表单中用户输入的两个
          aname:'',
          apwd:''
        }
      }
    },
    methods: {
      doLogin(){//执行登陆
        if(this.formData.aname && this.formData.apwd){
          var url=this.$store.state.globalSettings.apiUrl+`/admin/login/${this.formData.aname}/${this.formData.apwd}`;
          this.$axios.get(url)
          .then((result)=>{
            if(result.data.code==200){//登陆成功
              //把用户名存入vuex中
              this.$store.commit('setAdminName',this.formData.aname);
              //跳转至Main
              this.$router.push('/main');
            }else{//登陆失败，显示警告框
              this.$alert('用户名或密码有误，请重新输入！','登陆失败',{type:'error'})
              .then(()=>{}).catch(()=>{});
            }
          }).catch((err)=>{
            console.log(err);
          })
        }
        
      },
      doCancel(){
        this.formData.aname='';
        this.formData.apwd='';
      }
    },
    mounted() {
      console.log(this.$store.state.globalSettings.apiUrl+`admin/login/${this.formData.aname}/${this.formData.apwd}`);
    },
    
  }
</script>

<style lang="scss">
  .xfn-login-card{
    width:450px;
    margin:100px auto;
    .el-card__header{
      text-align: center;
      font-size:1.2em;
    }
  }
</style>
  