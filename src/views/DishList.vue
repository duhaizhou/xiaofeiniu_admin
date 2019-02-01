<template>
    <div class="xfn-dish-list">
      <h1>菜品列表</h1>
      <el-tabs type="border-card">
        <el-tab-pane v-for="(c,i) in dishList">
          <span slot="label">
            <el-badge :value="c.dishList.length">{{c.cname}}</el-badge>
          </span>
          <el-row>
            <el-col :xs="12" :md="6" :lg="4" :xl="3" v-for="(d,j) in c.dishList">
              <!--<xfn-dish :data="d">-->
              {{d.title}}
              <img :src="require('../assets/img/dish/'+d.imgUrl)" alt="" style="max-width:100%">
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>

      
    </div>
  </template>
  <script>
    export default{
      data(){
        return{
          url:this.$store.state.globalSettings.apiUrl+'/admin/dish',
          dishList:[]//{cid:xx,cname:'xx',dishList[]}
        }
      },
      mounted() {
        //异步获取菜品列表
        this.$axios.get(this.url).then(({data})=>{
          this.dishList=data;

        }).catch((err)=>{
          console.log(err);
        })
      },
    }
  </script>
  