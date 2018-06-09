<template>
<div>
 <el-form>
     <el-form-item>
         <el-row :gutter="24">
            <el-col :span="3"><img src="../../static/icons/twitter.png" class="twitLogo" /></el-col>
            <el-col :span="21"><el-input placeholder="Social Media Account" value="@Frances02336973"></el-input></el-col>
         </el-row>
     </el-form-item>
     <el-form-item>
         <el-row :gutter="24">
            <el-col :span="3"><img src="../../static/icons/eos-logo.png" class="twitLogo" /></el-col>
            <el-col :span="21"><el-input title="EOS6ffwtLDTKQavcpUxFGcTEVxoTztayrdbJ3HK2q3N37Hrmxx8RH" placeholder="Wallet" value="EOS6ffwtLDTKQavcpUxFGcTEVxoTztayrdbJ3HK2q3N37Hrmxx8RH"></el-input></el-col>
         </el-row>
     </el-form-item>
     <el-form-item></el-form-item>
 </el-form>
<div style="width: 25%; margin: 0 auto;">
 <img src="../../static/icons/eos-logo.png" class="bigLogo" />
 <h2>10 EOS</h2>
</div>
</div>
</template>

<script>
console.log("D3EP Settings...");

export default {
  data() {
    return {
      fileList: []
    };
  },
  methods: {
    handlePreview() {},
    handleRemove() {}
  }
};
</script>

<style>
.twitLogo {
  width: 32px;
  height: 32px;
  padding-top: 4px;
}

.bigLogo {
  width: 64px;
  height: 64px;
}
</style>