<template>
    <div class="dashboard-container">
        <template>
            <div class="dashboard-editor-container">
                <!--<github-corner style="position: absolute; top: 0px; border: 0; right: 0;"/>-->
                <!--<panel-group @handleSetLineChartData="handleSetLineChartData"/>-->
                <!--<el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">-->
                <!--<line-chart :chart-data="lineChartData"/>-->
                <!--</el-row>-->
                <!--<el-row :gutter="32">-->
                <!--<el-col :xs="24" :sm="24" :lg="8">-->
                <!--<div class="chart-wrapper">-->
                <!--<raddar-chart/>-->
                <!--</div>-->
                <!--</el-col>-->
                <!--<el-col :xs="24" :sm="24" :lg="8">-->
                <!--<div class="chart-wrapper">-->
                <!--<pie-chart/>-->
                <!--</div>-->
                <!--</el-col>-->
                <!--<el-col :xs="24" :sm="24" :lg="8">-->
                <!--<div class="chart-wrapper">-->
                <!--<bar-chart/>-->
                <!--</div>-->
                <!--</el-col>-->
                <!--</el-row>-->
                <!--<el-row :gutter="8">-->
                <!--<el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="padding-right:8px;margin-bottom:30px;">-->
                <!--<transaction-table/>-->
                <!--</el-col>-->
                <!--<el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">-->
                <!--<todo-list/>-->
                <!--</el-col>-->
                <!--<el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">-->
                <!--<box-card/>-->
                <!--</el-col>-->
                <!--</el-row>-->
            </div>
        </template>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import editorDashboard from './editor'
    export default {
        name: 'Dashboard',
        components: {},
        data() {
            return {
            }
        },
        methods: {
            handleSetLineChartData(type) {
            }
        },
        computed: {
            ...mapGetters([
                'roles'
            ])
        },
        created() {
            if (!this.roles.includes('admin')) {
                this.currentRole = 'editorDashboard'
            }
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .dashboard-editor-container {
        padding: 32px;
        background-color: rgb(240, 242, 245);

        .chart-wrapper {
            background: #fff;
            padding: 16px 16px 0;
            margin-bottom: 32px;
        }
    }
</style>
