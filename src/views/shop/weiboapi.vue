<template>
    <div>
        <el-table :data="data">
            <el-table-column label="Phone">
                <template slot-scope="scope">
                    {{ scope.row.phone}}
                </template>
            </el-table-column>
            <el-table-column label="result_status">
                <template slot-scope="scope">
                    {{ scope.row.result_status}}
                </template>
            </el-table-column>
            <el-table-column label="login_datetime">
                <template slot-scope="scope">
                    {{ scope.row.login_datetime}}
                </template>
            </el-table-column>
            <el-table-column label="result_msg">
                <template slot-scope="scope">
                    {{ scope.row.result_msg}}
                </template>
            </el-table-column>
            <el-table-column label="create_ip">
                <template slot-scope="scope">
                    {{ scope.row.create_ip}}
                </template>
            </el-table-column>
            <el-table-column label="login_ip">
                <template slot-scope="scope">
                    {{ scope.row.login_ip}}
                </template>
            </el-table-column>
        </el-table>

    </div>
</template>

<script>
    import request from '@/api/public'
    import CoreApi from '@/api/CoreApi'
    export default {
        name: "weiboapi",
        data(){
            return {
                data:[],
                params:{
                    page:1,
                    pagesize:10
                }
            }
        },
        methods: {
            featchData(){
                request.get(CoreApi.WEIBO_API,this.params).then(res=>{
                    this.data=res.data.results
                })
            }
        },
        created() {
            this.featchData()
        }
    }
</script>

<style scoped>

</style>