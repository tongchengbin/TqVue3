<template>
    <section>
        <h3 class="box-title" slot="header" style="width: 100%;">
            <el-row style="width: 100%;">
                <el-col :span="12">
                    <router-link :to="{ path: 'userAdd'}">
                        <el-button type="primary" icon="plus">新增</el-button>
                    </router-link>
                </el-col>
                <el-col :span="12">
                    <div class="el-input" style="width: 200px; float: right;">
                        <i class="el-input__icon el-icon-search"></i>
                        <input type="text" placeholder="输入用户名称" v-model="searchKey" @keyup.enter="search($event)"
                               class="el-input__inner">
                    </div>
                </el-col>
            </el-row>
        </h3>
        <div>
            <el-table
                    :data="tableData"
                    border
                    style="width: 100%"
                    v-loading="listLoading">
                <el-table-column label="头像" width="76">
                    <template slot-scope="scope">
                        <img :src='scope.row.avatar' style="height: 35px;vertical-align: middle;" alt="">
                    </template>
                </el-table-column>
                <el-table-column prop="username" label="昵称"></el-table-column>
                <el-table-column
                        prop="email"
                        label="邮箱">
                </el-table-column>
                <el-table-column
                        label="状态">
                    <template slot-scope="scope">
                        {{ scope.row.status===1 ? '已激活' : '未激活' }}
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="285">
                    <template slot-scope="scope">
                        <el-button
                                size="small"
                                type="default"
                                icon="edit"
                                @click="handleEdit(scope.$index, scope.row)">编辑
                        </el-button>
                        <el-button
                                size="small"
                                type="info"
                                icon="setting"
                                @click="handleRoleConfig(scope.$index, scope.row)">配置角色
                        </el-button>
                        <el-button
                                size="small"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--</imp-panel>-->
        </div>
        <el-dialog title="配置用户角色" :visible.sync="dialogVisible" size="tiny">
            <div class="select-tree">
                <el-scrollbar
                        tag="div"
                        class='is-empty'
                        wrap-class="el-select-dropdown__wrap"
                        view-class="el-select-dropdown__list">
                    <el-tree
                            ref="roleTree"
                            :data="roleTree"
                            show-checkbox
                            check-strictly
                            node-key="id" v-loading="dialogLoading"
                            :props="defaultProps">
                    </el-tree>
                </el-scrollbar>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="configUserRoles">确 定</el-button>
            </span>
        </el-dialog>
    </section>

</template>

<script>
    import http from '@/api/public'
    import api from '@/api/CoreApi'
    export default {
        data(){
            return {
                params:{},
                currentRow: {},
                dialogVisible: false,
                dialogLoading: false,
                defaultProps: {
                    children: 'children',
                    label: 'name',
                    id: "id",
                },
                roleTree: [],
                listLoading: false,
                searchKey: '',
                tableData:[],
                total:0
            }
        },
        methods: {
            search(target){
                this.loadData();
            },
            handleRoleConfig(index, row){
                this.currentRow = row;
                this.dialogVisible = true;
                if (this.roleTree.length <= 0) {
                    http.get(api.ACCOUNT_ROLE_LIST,{})
                        .then(res => {
                            this.roleTree = res.data.results
                        })
                }
                // http.get(api.SYS_USER_ROLE + "?id=" + row.id)
                //     .then(res => {
                //         this.$refs.roleTree.setCheckedKeys(res.data);
                //     }).catch(err=>{
                // })
            },
            configUserRoles(){
                let checkedKeys = this.$refs.roleTree.getCheckedKeys();
                this.$http.get(api.ACCOUNT_ROLE_LIST)
                    .then(res => {
                        this.$message('修改成功');
                        this.dialogVisible = false;
                    })
            },
            handleSizeChange(val) {
                this.tableData.pagination.pageSize = val;
                this.loadData();
            },
            handleCurrentChange(val) {
                this.tableData.pagination.pageNo = val;
                this.loadData();
            },
            handleEdit(index, row){
                this.$router.push({path: 'userAdd', query: {id: row.id}})
            },
            handleDelete(index, row){
                this.$http.get(api.SYS_USER_DELETE + "?userIds=" + row.id).then(res => {
                    this.loadData();
                });
            },
            loadData(){
                http.get(api.ACCOUNT_USER_LIST,this.parsms)
                    .then(res => {
                        console.log(res)
                        this.tableData= res.data.results;
                        this.total = res.data.total;
                    });
            }
        },
        created(){
            this.loadData();
        }
    }
</script>
<style>
    .el-pagination {
        float: right;
        margin-top: 15px;
    }
</style>