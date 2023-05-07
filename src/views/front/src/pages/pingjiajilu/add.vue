<template>
<div :style='{"border":"1px solid #9ce3b5","padding":"20px","boxShadow":"0px 2px 6px #ccc,inset 0px 0px 600px 0px #e0f8e8","margin":"20px auto 0","borderRadius":"16px","background":"#fff","width":"1200px","position":"relative"}'>
    <el-form
      class="add-update-preview"
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="80px"
    >
          <el-form-item :style='{"border":"0px solid #dfdfdf","padding":"10px","boxShadow":"0px 0px 0px #eee","margin":"0 0 8px 0","borderRadius":"8px","background":"none"}' label="退房单号" prop="tuifangdanhao">
              <el-input v-model="ruleForm.tuifangdanhao" placeholder="退房单号" readonly></el-input>
          </el-form-item>
          <el-form-item :style='{"border":"0px solid #dfdfdf","padding":"10px","boxShadow":"0px 0px 0px #eee","margin":"0 0 8px 0","borderRadius":"8px","background":"none"}' label="房间名称" prop="fangjianmingcheng">
            <el-input v-model="ruleForm.fangjianmingcheng" 
                placeholder="房间名称" clearable readonly></el-input>
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
          <el-form-item :style='{"border":"0px solid #dfdfdf","padding":"10px","boxShadow":"0px 0px 0px #eee","margin":"0 0 8px 0","borderRadius":"8px","background":"none"}' label="退房时间" prop="tuifangshijian" >
              <el-date-picker
                  value-format="yyyy-MM-dd HH:mm:ss"
                  v-model="ruleForm.tuifangshijian" 
                  type="datetime"
                  placeholder="退房时间">
              </el-date-picker>
          </el-form-item>
          <el-form-item :style='{"border":"0px solid #dfdfdf","padding":"10px","boxShadow":"0px 0px 0px #eee","margin":"0 0 8px 0","borderRadius":"8px","background":"none"}' label="退房备注" prop="tuifangbeizhu">
            <el-input v-model="ruleForm.tuifangbeizhu" 
                placeholder="退房备注" clearable ></el-input>
          </el-form-item>
          <el-form-item :style='{"border":"0px solid #dfdfdf","padding":"10px","boxShadow":"0px 0px 0px #eee","margin":"0 0 8px 0","borderRadius":"8px","background":"none"}'  label="房间评分" prop="fangjianpingfen">
            <el-select v-model="ruleForm.fangjianpingfen" placeholder="请选择房间评分" >
              <el-option
                  v-for="(item,index) in fangjianpingfenOptions"
                  :key="index"
                  :label="item"
                  :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :style='{"border":"0px solid #dfdfdf","padding":"10px","boxShadow":"0px 0px 0px #eee","margin":"0 0 8px 0","borderRadius":"8px","background":"none"}' label="用户名" prop="yonghuming">
            <el-input v-model="ruleForm.yonghuming" 
                placeholder="用户名" clearable ></el-input>
          </el-form-item>
          <el-form-item :style='{"border":"0px solid #dfdfdf","padding":"10px","boxShadow":"0px 0px 0px #eee","margin":"0 0 8px 0","borderRadius":"8px","background":"none"}' label="手机" prop="shouji">
            <el-input v-model="ruleForm.shouji" 
                placeholder="手机" clearable ></el-input>
          </el-form-item>
          <el-form-item :style='{"border":"0px solid #dfdfdf","padding":"10px","boxShadow":"0px 0px 0px #eee","margin":"0 0 8px 0","borderRadius":"8px","background":"none"}' label="房间评价" prop="fangjianpingjia">
            <el-input
              type="textarea"
              :rows="8"
              placeholder="房间评价"
              v-model="ruleForm.fangjianpingjia">
            </el-input>
          </el-form-item>
          <el-form-item :style='{"border":"0px solid #dfdfdf","padding":"10px","boxShadow":"0px 0px 0px #eee","margin":"0 0 8px 0","borderRadius":"8px","background":"none"}' label="意见反馈" prop="yijianfankui">
            <el-input
              type="textarea"
              :rows="8"
              placeholder="意见反馈"
              v-model="ruleForm.yijianfankui">
            </el-input>
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
            tuifangdanhao : false,
            fangjianmingcheng : false,
            fangjiantupian : false,
            tuifangshijian : false,
            tuifangbeizhu : false,
            fangjianpingfen : false,
            fangjianpingjia : false,
            yijianfankui : false,
            yonghuming : false,
            shouji : false,
            crossuserid : false,
            crossrefid : false,
            shhf : false,
        },
        type: '',
        userTableName: localStorage.getItem('UserTableName'),
        ruleForm: {
          tuifangdanhao: this.getUUID(),
          fangjianmingcheng: '',
          fangjiantupian: '',
          tuifangshijian: '',
          tuifangbeizhu: '',
          fangjianpingfen: '',
          fangjianpingjia: '',
          yijianfankui: '',
          yonghuming: '',
          shouji: '',
        },
        fangjianpingfenOptions: [],
        rules: {
          tuifangdanhao: [
          ],
          fangjianmingcheng: [
          ],
          fangjiantupian: [
          ],
          tuifangshijian: [
          ],
          tuifangbeizhu: [
          ],
          fangjianpingfen: [
            { required: true, message: '房间评分不能为空', trigger: 'blur' },
          ],
          fangjianpingjia: [
            { required: true, message: '房间评价不能为空', trigger: 'blur' },
          ],
          yijianfankui: [
            { required: true, message: '意见反馈不能为空', trigger: 'blur' },
          ],
          yonghuming: [
          ],
          shouji: [
            { validator: this.$validate.isMobile, trigger: 'blur' },
          ],
          crossuserid: [
          ],
          crossrefid: [
          ],
          shhf: [
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
      this.ruleForm.tuifangshijian = this.getCurDateTime()
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
            if(o=='tuifangdanhao'){
              this.ruleForm.tuifangdanhao = obj[o];
              this.ro.tuifangdanhao = true;
              continue;
            }
            if(o=='fangjianmingcheng'){
              this.ruleForm.fangjianmingcheng = obj[o];
              this.ro.fangjianmingcheng = true;
              continue;
            }
            if(o=='fangjiantupian'){
              this.ruleForm.fangjiantupian = obj[o].split(",")[0];
              this.ro.fangjiantupian = true;
              continue;
            }
            if(o=='tuifangshijian'){
              this.ruleForm.tuifangshijian = obj[o];
              this.ro.tuifangshijian = true;
              continue;
            }
            if(o=='tuifangbeizhu'){
              this.ruleForm.tuifangbeizhu = obj[o];
              this.ro.tuifangbeizhu = true;
              continue;
            }
            if(o=='fangjianpingfen'){
              this.ruleForm.fangjianpingfen = obj[o];
              this.ro.fangjianpingfen = true;
              continue;
            }
            if(o=='fangjianpingjia'){
              this.ruleForm.fangjianpingjia = obj[o];
              this.ro.fangjianpingjia = true;
              continue;
            }
            if(o=='yijianfankui'){
              this.ruleForm.yijianfankui = obj[o];
              this.ro.yijianfankui = true;
              continue;
            }
            if(o=='yonghuming'){
              this.ruleForm.yonghuming = obj[o];
              this.ro.yonghuming = true;
              continue;
            }
            if(o=='shouji'){
              this.ruleForm.shouji = obj[o];
              this.ro.shouji = true;
              continue;
            }
            if(o=='crossuserid'){
              this.ruleForm.crossuserid = obj[o];
              this.ro.crossuserid = true;
              continue;
            }
            if(o=='crossrefid'){
              this.ruleForm.crossrefid = obj[o];
              this.ro.crossrefid = true;
              continue;
            }
          }
        }
        // 获取用户信息
        this.$http.get(this.userTableName + '/session', {emulateJSON: true}).then(res => {
          if (res.data.code == 0) {
            var json = res.data.data;
            if(json.yonghuming!=''&&json.yonghuming){
                this.ruleForm.yonghuming = json.yonghuming
            }
            if(json.shouji!=''&&json.shouji){
                this.ruleForm.shouji = json.shouji
            }
          }
        });
        this.fangjianpingfenOptions = "1,2,3,4,5".split(',')
      },

    // 多级联动参数
      // 多级联动参数
      info(id) {
        this.$http.get('pingjiajilu/detail/${id}', {emulateJSON: true}).then(res => {
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
                 this.$http.get('pingjiajilu/list', {
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


                          this.$http.post('pingjiajilu/add', this.ruleForm).then(res => {
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


                  this.$http.post('pingjiajilu/add', this.ruleForm).then(res => {
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
