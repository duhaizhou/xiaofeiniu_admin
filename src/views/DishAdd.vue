<template>
  <div class="xfn-uploader">
    <h1>添加菜品</h1>
    <el-form label-width="100px">
      <el-form-item label="菜品图片：">
        <el-upload class="xfn-uploader" name="dishImg" :show-file-list="false" :on-success="doUploadSuccss" :action="uploadAction">
          <img  v-if="imageUrl" :src="imageUrl">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
        
    </el-form>
  </div>
</template>
<script>
  export default{
    data() {
      return {
        imageUrl:'',
        uploadAction:this.$store.state.globalSettings.apiUrl+'/admin/dish/image',
        formData:{
          title:'',
          imgUrl:'',
          price:'',
          detail:'',
          categoryId:''
        }
      }
    },
    methods: {
      doUploadSuccss(res,file){
        console.log(this.uploadAction);
        //上传成功后，客户端得到相应消息之后的处理函数
        //res:服务器端返回的响应消息
        //file:从INPUT[type=file]中读取的第一个上传的文件对象
        this.formData.imgUrl=res.fileName;
        this.imageUrl = URL.createObjectURL(file.raw);
      }
    },
  }
</script>
<style lang="scss">
  .xfn-uploader{
    .el-upload{
      border:1px dashed #d9d9d9;
      border-radius:6px;
      cursor:point;
      width:250px;
      height:177px;
      overflow: hidden;
      &:hover{
        border-color:#409eff;
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 177px;
        height: 177px;
        line-height: 177px;
        text-align: center;
      }
      img{
        width:100%;
        height:100%;
      }
    }
    
  }
</style>
