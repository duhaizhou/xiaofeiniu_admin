<template>
  <div class="xfn-table-info">
    <el-card shadow="hover">
      <div class="xfn-table" :style="{background:getTableColor(data.status)}">{{data.tid}}号桌：{{data.status | tableStatus}}</div>
      <el-button type="success" plain size="mini" @click="showTableDetail">详情</el-button>
      <el-button type="danger" plain size="mini">修改</el-button>
    </el-card>
  
  <!--桌台详情对话框-->
    <el-dialog :title="data.tid+'号桌详情'" :visible="dailogTableDetailVisible" :before-close="closeDailogTableDetail">
      <el-tabs type="border-card" @tab-click="makeQRcode">
        <el-tab-pane label="桌台状态">状态加载中...</el-tab-pane>
        <el-tab-pane label="桌台二维码">
          <img :src="qrcodeData"></img>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer">
        <el-button type="primary" @click="closeDailogTableDetail">确定</el-button>
      </div>
    </el-dialog>
  </div>
  
</template>

<script>
  export default{
    data(){
      return {
        dailogTableDetailVisible:false,
        qrcodeData:''//二维码图片的base64编码的字符串
      }
    },
    props:['data'],
    methods: {
      getTableColor(status){
        if(status==1) return '#67c23a';
        else if(status==2) return '#e6a23c';
        else if(status==3) return '#f56c6c';
        else return '#909399';
      },
      showTableDetail(){
        this.dailogTableDetailVisible=true;
        //dailog只在显示时挂载到dom树
      },
      closeDailogTableDetail(){
        this.dailogTableDetailVisible=false;
      },
      makeQRcode(){
        
        //创建二维码，此方法不能在当前组价的mounted中调用，因为绘图必须的canvas在el-dialog中，对话框组件在加载时并不在DOM树上
        var qrcode=require('qrcode');
        //每个桌子对应的URL应该形如：http://127.0.0.1:8092/#/3
        var tableUrl=this.$store.state.globalSettings.appUrl+'/#/'+this.data.tid;
        //绘制得到的二维码图片的base64位编码的字符串
        qrcode.toDataURL(tableUrl,{width:300,errorCorrectionLever:'H'},(err,url)=>{
          //url为绘制好的二维码的base64位编码的字符串
          this.qrcodeData=url;
        });
      }
    }
  }
</script>
<style lang="scss">
  .xfn-table-info{
    padding:3px;
    text-align: center;
    .xfn-table{
      width:90%;
      height:100px;
      line-height:100px;
      border:1px solid #aaa;
      border-radius:50%;
      box-shadow:3px -4px 5px #666;
      margin:0 auto 10px;
    }
  }

</style>