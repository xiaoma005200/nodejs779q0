<template>
<div :style='{"border":"1px solid #9ce3b5","padding":"20px","boxShadow":"0px 2px 6px #ccc,inset 0px 0px 600px 0px #e0f8e8","margin":"20px auto 0","borderRadius":"16px","background":"#fff","width":"1200px","position":"relative"}'>
    <el-form
      class="add-update-preview"
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="80px"
    >
          <el-form-item :style='{"border":"0px solid #dfdfdf","padding":"10px","boxShadow":"0px 0px 0px #eee","margin":"0 0 8px 0","borderRadius":"8px","background":"none"}' label="房间名称" prop="fangjianmingcheng">
            <el-input v-model="ruleForm.fangjianmingcheng" 
                placeholder="房间名称" clearable ></el-input>
          </el-form-item>
          <el-form-item :style='{"border":"0px solid #dfdfdf","padding":"10px","boxShadow":"0px 0px 0px #eee","margin":"0 0 8px 0","borderRadius":"8px","background":"none"}' label="房间楼层" prop="fangjianlouceng">
            <el-input v-model="ruleForm.fangjianlouceng" 
                placeholder="房间楼层" clearable ></el-input>
          </el-form-item>
          <el-form-item :style='{"border":"0px solid #dfdfdf","padding":"10px","boxShadow":"0px 0px 0px #eee","margin":"0 0 8px 0","borderRadius":"8px","background":"none"}'  label="房间类型" prop="fangjianleixing">
            <el-select v-model="ruleForm.fangjianleixing" placeholder="请选择房间类型" >
              <el-option
                  v-for="(item,index) in fangjianleixingOptions"
                  :key="index"
                  :label="item"
                  :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :style='{"border":"0px solid #dfdfdf","padding":"10px","boxShadow":"0px 0px 0px #eee","margin":"0 0 8px 0","borderRadius":"8px","background":"none"}' label="房间图片" v-if="type!='cross' || (type=='cross' && !ro.fangjiantupian)" prop="fangjiantupian">
            <file-upload
            tip="点击上传房间图片"
            action="file/upload"
            :limit="3"
            :multiple="true"
            :fileUrls="ruleForm.fangjiantupian?ruleForm.fangjiantupian:''"
            @change="fangjiantupianUploadChange"
            ></file-upload>
          </el-form-item>
            <el-form-item :style='{"border":"0px solid #dfdfdf","padding":"10px","boxShadow":"0px 0px 0px #eee","margin":"0 0 8px 0","borderRadius":"8px","background":"none"}' class="upload" v-else label="房间图片" prop="fangjiantupian">
                <img v-if="ruleForm.fangjiantupian.substring(0,4)=='http'" class="upload-img" style="margin-right:20px;" v-bind:key="index" :src="ruleForm.fangjiantupian.split(',')[0]" width="100" height="100">
                <img v-else class="upload-img" style="margin-right:20px;" v-bind:key="index" v-for="(item,index) in ruleForm.fangjiantupian.split(',')" :src="baseUrl+item" width="100" height="100">
            </el-form-item>
          <el-form-item :style='{"border":"0px solid #dfdfdf","padding":"10px","boxShadow":"0px 0px 0px #eee","margin":"0 0 8px 0","borderRadius":"8px","background":"none"}' label="房间设施" prop="fangjiansheshi">
            <el-input v-model="ruleForm.fangjiansheshi" 
                placeholder="房间设施" clearable ></el-input>
          </el-form-item>
          <el-form-item :style='{"border":"0px solid #dfdfdf","padding":"10px","boxShadow":"0px 0px 0px #eee","margin":"0 0 8px 0","borderRadius":"8px","background":"none"}' label="房间价格" prop="fangjianjiage">
            <el-input v-model="ruleForm.fangjianjiage" 
                placeholder="房间价格" clearable ></el-input>
          </el-form-item>
          <el-form-item :style='{"border":"0px solid #dfdfdf","padding":"10px","boxShadow":"0px 0px 0px #eee","margin":"0 0 8px 0","borderRadius":"8px","background":"none"}'  label="房间状态" prop="fangjianzhuangtai">
            <el-select v-model="ruleForm.fangjianzhuangtai" placeholder="请选择房间状态" >
              <el-option
                  v-for="(item,index) in fangjianzhuangtaiOptions"
                  :key="index"
                  :label="item"
                  :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :style='{"border":"0px solid #dfdfdf","padding":"10px","boxShadow":"0px 0px 0px #eee","margin":"0 0 8px 0","borderRadius":"8px","background":"none"}' label="订房电话" prop="dingfangdianhua">
            <el-input v-model="ruleForm.dingfangdianhua" 
                placeholder="订房电话" clearable ></el-input>
          </el-form-item>
          <el-form-item :style='{"border":"0px solid #dfdfdf","padding":"10px","boxShadow":"0px 0px 0px #eee","margin":"0 0 8px 0","borderRadius":"8px","background":"none"}' label="房间介绍" prop="fangjianjieshao">
            <editor 
                :style='{"minHeight":"300px","padding":"0","margin":"0","borderColor":"#ccc","backgroundColor":"#fff","borderRadius":"0","borderWidth":"0","width":"100%","borderStyle":"solid","height":"auto"}'
                v-model="ruleForm.fangjianjieshao" 
                class="editor" 
                action="file/upload">
            </editor>
          </el-form-item>

      <el-form-item :style='{"padding":"0","margin":"20px 0 20px 0"}'>
        <el-button :style='{"border":"0","cursor":"pointer","padding":"0","boxShadow":"1px 2px 3px #aaa","margin":"0 20px 0 0","color":"#fff","outline":"none","borderRadius":"4px","background":"linear-gradient(180deg, rgba(17,112,210,1) 0%, rgba(8,179,68,1) 100%)","width":"128px","lineHeight":"40px","fontSize":"14px","height":"40px"}'  type="primary" @click="onSubmit">提交</el-button>
        <el-button :style='{"border":"1px solid #bbb","cursor":"pointer","padding":"0","boxShadow":"1px 2px 6px #ccc","margin":"0","color":"#999","outline":"none","borderRadius":"4px","background":"#fff","width":"128px","lineHeight":"40px","fontSize":"14px","height":"40px"}' @click="back()">返回</el-button>
      </el-form-item>
    </el-form>
</div>
</template>

<script>
  export default {
    data() {
      return {
        id: '',
        baseUrl: '',
        ro:{
            fangjianmingcheng : false,
            fangjianlouceng : false,
            fangjianleixing : false,
            fangjiantupian : false,
            fangjiansheshi : false,
            fangjianjiage : false,
            fangjianzhuangtai : false,
            dingfangdianhua : false,
            fangjianjieshao : false,
            clicktime : false,
        },
        type: '',
        userTableName: localStorage.getItem('UserTableName'),
        ruleForm: {
          fangjianmingcheng: '',
          fangjianlouceng: '',
          fangjianleixing: '',
          fangjiantupian: '',
          fangjiansheshi: '',
          fangjianjiage: '',
          fangjianzhuangtai: '可预订',
          dingfangdianhua: '',
          fangjianjieshao: '',
        },
        fangjianleixingOptions: [],
        fangjianzhuangtaiOptions: [],
        rules: {
          fangjianmingcheng: [
            { required: true, message: '房间名称不能为空', trigger: 'blur' },
          ],
          fangjianlouceng: [
          ],
          fangjianleixing: [
            { required: true, message: '房间类型不能为空', trigger: 'blur' },
          ],
          fangjiantupian: [
          ],
          fangjiansheshi: [
          ],
          fangjianjiage: [
            { required: true, message: '房间价格不能为空', trigger: 'blur' },
            { validator: this.$validate.isIntNumer, trigger: 'blur' },
          ],
          fangjianzhuangtai: [
            { required: true, message: '房间状态不能为空', trigger: 'blur' },
          ],
          dingfangdianhua: [
            { validator: this.$validate.isPhone, trigger: 'blur' },
          ],
          fangjianjieshao: [
          ],
          clicktime: [
          ],
        },
      };
    },
    computed: {



    },
    created() {
	  //this.bg();
      let type = this.$route.query.type ? this.$route.query.type : '';
      this.init(type);
      this.baseUrl = this.$config.baseUrl;
    },
    methods: {
      getMakeZero(s) {
          return s < 10 ? '0' + s : s;
      },
      // 下载
      download(file){
        window.open(`${file}`)
      },
      // 初始化
      init(type) {
        this.type = type;
        if(type=='cross'){
          var obj = JSON.parse(localStorage.getItem('crossObj'));
          for (var o in obj){
            if(o=='fangjianmingcheng'){
              this.ruleForm.fangjianmingcheng = obj[o];
              this.ro.fangjianmingcheng = true;
              continue;
            }
            if(o=='fangjianlouceng'){
              this.ruleForm.fangjianlouceng = obj[o];
              this.ro.fangjianlouceng = true;
              continue;
            }
            if(o=='fangjianleixing'){
              this.ruleForm.fangjianleixing = obj[o];
              this.ro.fangjianleixing = true;
              continue;
            }
            if(o=='fangjiantupian'){
              this.ruleForm.fangjiantupian = obj[o].split(",")[0];
              this.ro.fangjiantupian = true;
              continue;
            }
            if(o=='fangjiansheshi'){
              this.ruleForm.fangjiansheshi = obj[o];
              this.ro.fangjiansheshi = true;
              continue;
            }
            if(o=='fangjianjiage'){
              this.ruleForm.fangjianjiage = obj[o];
              this.ro.fangjianjiage = true;
              continue;
            }
            if(o=='fangjianzhuangtai'){
              this.ruleForm.fangjianzhuangtai = obj[o];
              this.ro.fangjianzhuangtai = true;
              continue;
            }
            if(o=='dingfangdianhua'){
              this.ruleForm.dingfangdianhua = obj[o];
              this.ro.dingfangdianhua = true;
              continue;
            }
            if(o=='fangjianjieshao'){
              this.ruleForm.fangjianjieshao = obj[o];
              this.ro.fangjianjieshao = true;
              continue;
            }
            if(o=='clicktime'){
              this.ruleForm.clicktime = obj[o];
              this.ro.clicktime = true;
              continue;
            }
          }
        }
        // 获取用户信息
        this.$http.get(this.userTableName + '/session', {emulateJSON: true}).then(res => {
          if (res.data.code == 0) {
            var json = res.data.data;
          }
        });
        this.$http.get('option/fangjianleixing/fangjianleixing', {emulateJSON: true}).then(res => {
          if (res.data.code == 0) {
            this.fangjianleixingOptions = res.data.data;
          }
        });
        this.fangjianzhuangtaiOptions = "已预订,可预订".split(',')
      },

    // 多级联动参数
      // 多级联动参数
      info(id) {
        this.$http.get('fangjianxinxi/detail/${id}', {emulateJSON: true}).then(res => {
          if (res.data.code == 0) {
            this.ruleForm = res.data.data;
          }
        });
      },
      // 提交
      onSubmit() {

        //更新跨表属性
        var crossuserid;
        var crossrefid;
        var crossoptnum;
        this.$refs["ruleForm"].validate(valid => {
          if(valid) {
            if(this.type=='cross'){
                 var statusColumnName = localStorage.getItem('statusColumnName');
                 var statusColumnValue = localStorage.getItem('statusColumnValue');
                 if(statusColumnName && statusColumnName!='') {
                     var obj = JSON.parse(localStorage.getItem('crossObj'));
                     if(!statusColumnName.startsWith("[")) {
                         for (var o in obj){
                             if(o==statusColumnName){
                                 obj[o] = statusColumnValue;
                             }
                         }
                         var table = localStorage.getItem('crossTable');
                         this.$http.post(table+'/update', obj).then(res => {});
                     } else {
                            crossuserid=Number(localStorage.getItem('userid'));
                            crossrefid=obj['id'];
                            crossoptnum=localStorage.getItem('statusColumnName');
                            crossoptnum=crossoptnum.replace(/\[/,"").replace(/\]/,"");
                     }
                 }
            }
            if(crossrefid && crossuserid) {
                 this.ruleForm.crossuserid=crossuserid;
                 this.ruleForm.crossrefid=crossrefid;
                 var params = {
                     page: 1,
                     limit: 10,
                     crossuserid:crossuserid,
                     crossrefid:crossrefid,
                 }
                 this.$http.get('fangjianxinxi/list', {
                  params: params
                 }).then(res => {
                     if(res.data.data.total>=crossoptnum) {
                         this.$message({
                          message: localStorage.getItem('tips'),
                          type: 'success',
                          duration: 1500,
                         });
                          return false;
                     } else {
                         // 跨表计算


                          this.$http.post('fangjianxinxi/add', this.ruleForm).then(res => {
                              if (res.data.code == 0) {
                                  this.$message({
                                      message: '操作成功',
                                      type: 'success',
                                      duration: 1500,
                                      onClose: () => {
                                          this.$router.go(-1);
                                      }
                                  });
                              } else {
                                  this.$message({
                                      message: res.data.msg,
                                      type: 'error',
                                      duration: 1500
                                  });
                              }
                          });
                     }
                 });
             } else {


                  this.$http.post('fangjianxinxi/add', this.ruleForm).then(res => {
                     if (res.data.code == 0) {
                          this.$message({
                              message: '操作成功',
                              type: 'success',
                              duration: 1500,
                              onClose: () => {
                                  this.$router.go(-1);
                              }
                          });
                      } else {
                          this.$message({
                              message: res.data.msg,
                              type: 'error',
                              duration: 1500
                          });
                      }
                  });
             }
          }
        });
      },
      // 获取uuid
      getUUID () {
        return new Date().getTime();
      },
      // 返回
      back() {
        this.$router.go(-1);
      },
      fangjiantupianUploadChange(fileUrls) {
          this.ruleForm.fangjiantupian = fileUrls.replace(new RegExp(this.$config.baseUrl,"g"),"");;
      },
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.el-date-editor.el-input {
		width: auto;
	}
	
	.add-update-preview .el-form-item /deep/ .el-form-item__label {
	  padding: 0 10px 0 0;
	  color: #666;
	  font-weight: 500;
	  width: 80px;
	  font-size: 14px;
	  line-height: 40px;
	  text-align: right;
	}
	
	.add-update-preview .el-form-item /deep/ .el-form-item__content {
	  margin-left: 80px;
	}
	
	.add-update-preview .el-input /deep/ .el-input__inner {
	  border: 1px solid #ccc;
	  border-radius: 4px;
	  padding: 0 12px;
	  outline: none;
	  color: #999;
	  background: #fff;
	  width: 400px;
	  font-size: 14px;
	  height: 40px;
	}
	
	.add-update-preview .el-select /deep/ .el-input__inner {
	  border: 1px solid #ccc;
	  border-radius: 4px;
	  padding: 0 10px;
	  outline: none;
	  color: #999;
	  background: #fff;
	  width: 200px;
	  font-size: 14px;
	  height: 40px;
	}
	
	.add-update-preview .el-date-editor /deep/ .el-input__inner {
	  border: 1px solid #ccc;
	  border-radius: 4px;
	  padding: 0 10px 0 30px;
	  outline: none;
	  color: #999;
	  background: #fff;
	  width: 200px;
	  font-size: 14px;
	  height: 40px;
	}
	
	.add-update-preview /deep/ .el-upload--picture-card {
		background: transparent;
		border: 0;
		border-radius: 0;
		width: auto;
		height: auto;
		line-height: initial;
		vertical-align: middle;
	}
	
	.add-update-preview /deep/ .upload .upload-img {
	  border: 1px solid #ccc;
	  cursor: pointer;
	  border-radius: 6px;
	  color: #999;
	  background: #fff;
	  width: 200px;
	  font-size: 32px;
	  line-height: 120px;
	  text-align: center;
	  height: auto;
	}
	
	.add-update-preview /deep/ .el-upload-list .el-upload-list__item {
	  border: 1px solid #ccc;
	  cursor: pointer;
	  border-radius: 6px;
	  color: #999;
	  background: #fff;
	  width: 200px;
	  font-size: 32px;
	  line-height: 120px;
	  text-align: center;
	  height: auto;
	}
	
	.add-update-preview /deep/ .el-upload .el-icon-plus {
	  border: 1px solid #ccc;
	  cursor: pointer;
	  border-radius: 6px;
	  color: #999;
	  background: #fff;
	  width: 200px;
	  font-size: 32px;
	  line-height: 120px;
	  text-align: center;
	  height: auto;
	}
	
	.add-update-preview .el-textarea /deep/ .el-textarea__inner {
	  border: 1px solid #ccc;
	  border-radius: 4px;
	  padding: 12px;
	  outline: none;
	  color: #999;
	  background: #fff;
	  width: 400px;
	  font-size: 14px;
	  min-height: 120px;
	}
</style>
