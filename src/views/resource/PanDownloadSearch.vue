<template>
    <div class="app-container">
        <el-form class="search-form" v-if="showSearch">
            <el-form-item>
                <el-input @keyup.enter.native="searchSubmit"  maxlength="20" placeholder="请输入内容" v-model="form.key" class="input-with-select search-color">
                    <el-button @click="searchSubmit"  type="primary"   slot="append" icon="el-icon-search search-color"></el-button>
                </el-input>
            </el-form-item>
        </el-form>
        <div>
            <el-form v-if="!showSearch">
                    <el-form-item>
                        <el-input v-model="form.key" style="width: 200px;"></el-input>
                        <el-button type="primary" @click="searchSubmit"  icon="el-icon-search"></el-button>
                    </el-form-item>
            </el-form>
            <el-table v-if="!showSearch"  :data="DataList" highlight-current-row stripe fit highlight-current-row  border style="width: 100%;" v-loading="listLoading">
                <el-table-column type="expand" prop="list">
                    <template slot-scope="props">
                        <div v-for="title,index in props.row.list">
                            <li>{{title}}</li>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="rank"  label=序号 width="50"></el-table-column>
                <el-table-column align="center"  prop="title" label=名称 width="450">
                    <template slot-scope="scope">
                        <i class="iconfont" :class="filetype(scope.row)" style="padding-right: 10px"></i>{{ scope.row.title}}
                    </template>
                </el-table-column>
                <el-table-column align="center"  prop="ctime" label=修改时间 width="160">
                    <template slot-scope="scope">
                        {{ scope.row.ctime | timestampToTime }}
                    </template>
                </el-table-column>
                <el-table-column align="center"  prop="user" label=分享人 width="200"></el-table-column>
                <el-table-column align="center"  label=大小 width="80">
                    <template slot-scope="scope">
                        {{ scope.row.size | sizeTranslation }}
                    </template>
                </el-table-column>
                <el-table-column align="center"   label=操作 width="400px">
                    <template slot-scope="scope">
                        <el-button type="primary" size="small"><a type="buttom" :href="scope.row.surl" target="_blank">打开连接</a></el-button>
                        <el-button type="success" v-if="scope.row.needpassword" @click="getPassword(scope.row)">查看密码</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-col :span="24" class="toolbar">
                <el-pagination background  :current-page="form.page"
                               @current-change="handleCurrentChange"
                               layout="total, sizes, prev, next, jumper" :total="DataListTotal"
                               style="float:right;">
                </el-pagination>
            </el-col>
        </div>
    </div>

</template>

<script>
    import http from '@/api/public'
    import api from '../../api/CoreApi'
    import PanelGroup from "../dashboard/admin/components/PanelGroup";
    export default {
        name: "PanDownloadSearch",
        components: {PanelGroup},
        data(){
            return {
                listLoading:false,
                showSearch:true,
                DataListTotal:0,
                form:{
                    "key":"",
                    "page":1
                },
                DataList:[]
            }
        },
        methods:{
            searchSubmit(){
                this.showSearch=false;
                this.listLoading=true;
                http.get(api.PANDOWNLOAD_SEARCH,this.form).then(res=>{
                    this.listLoading=false;
                    this.DataListTotal=res.data.total;
                    this.DataList=res.data.data;
                })
            },
            filetype(row){
                if(row.isdir==="1"){
                    return "tq-wulumuqishigongandashujuguanlipingtai-ico-"
                }
                if(row.type==='mp4'){
                    return 'tq-mp'
                }else if(row.type==='zip'|| row.type==='rar'){
                    return 'tq-yasuobao'
                }else if(row.type==='apk'){
                    return 'tq-apk'
                }
                return "test"
            },
            getPassword(row) {
                let password;
                if(row.password){
                     password=row.password;
                }else{
                     password='没有密码哟'
                }
                this.$confirm(password, '密码', {
                    confirmButtonText: '确定',
                    type: 'success',
                    showCancelButton:false,
                    center:true
                })
            },
            handleCurrentChange(val) {
                this.form.page = val;
                this.searchSubmit()
            },
        },
        filters:{
            strfilter(str){
                console.log(str);
                return "我是新数据";
            },
            timestampToTime (cjsj) {
                var date = new Date(cjsj*1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
                var Y = date.getFullYear() + '-';
                var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                var D = date.getDate() + ' ';
                var h = date.getHours() + ':';
                var m = date.getMinutes() + ':';
                var s = date.getSeconds();
                return Y+M+D+h+m+s
            },
            sizeTranslation (val) {
                val=val/1000;
                if(val===0){
                    return null
                }else  if(val >1000&& val<1000000){
                    return (val/1000).toFixed(1) +"M"
                }else{
                    return (val/1000000).toFixed(1)+"G"
                }

            },
        }

    }

</script>

<style scoped>

    .search-form{
        width: 500px;
        margin: auto;
        margin-top: 300px;
        min-height: 500px;
    }
</style>