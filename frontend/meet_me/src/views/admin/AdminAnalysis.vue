<template>
    <div class="web_body">
        <AdminHeader />
        <div class="admin_web_inner_flex">
            <div>
                <div class="admin_header_text">판매 현황</div>
                <div class="admin_analysis_button_row">
                    <button class="admin_analysis_excel_button">Excel</button>
                </div>
                <div class="admin_analysis_graph_content">
                    <div class="admin_analysis_graph_box">
                        <div class="admin_graph_header">신규 회원 추이</div>
                        <div class="admin_graph_content">
                            <GChart
                            type="LineChart"
                            :data="newUserTimeLineData"
                            class="analysis_chart"
                            />
                        </div>
                    </div>
                    <div class="admin_analysis_graph_box">
                        <div class="admin_graph_header">회원 남녀 비율</div>
                        <div class="admin_graph_content">
                            <GChart
                            type="PieChart"
                            :data="userGenderRateData"
                            class="analysis_chart"
                            />
                        </div>
                    </div>
                    <div class="admin_analysis_graph_box">
                        <div class="admin_graph_header">매칭 수 추이</div>
                        <div class="admin_graph_content">
                            <GChart
                            type="LineChart"
                            :data="matchingAmountTimeLineData"
                            class="analysis_chart"
                            />
                        </div>
                    </div>
                    <div class="admin_analysis_graph_box">
                        <div class="admin_graph_header">사용자 연령대 분석</div>
                        <div class="admin_graph_content">
                            <GChart
                            type="ColumnChart"
                            :data="userGenderAmountData"
                            class="analysis_chart"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </template>    
    <script>
    import { GChart } from 'vue-google-charts';
    export default {
        components:{
            GChart
        },
        data() {
            return {
                userGenderRateData: [
                    ['성별', '회원수'],
                    ['남자', 10],
                    ['여자', 5]
                ],
                newUserTimeLineData: [
                    ['날짜', '신규 회원 수'],
                    ['YYYY-MM-DD', 0]
                ],
                matchingAmountTimeLineData: [
                    ['날짜', '신규 회원 수'],
                    ['YYYY-MM-DD', 0]
                ],
                userGenderAmountData:[
                    ['Element', '회원수', { role: 'style' }],
                    ['20대 남자', 300, 'blue'],
                    ['20대 여자', 110, 'red'],
                    ['', 0, 'white'],
                    ['30대 남자', 200, 'blue'],
                    ['30대 여자', 100, 'red'],
                    ['', 0, 'white'],
                    ['40대 남자', 50, 'blue'],
                    ['40대 여자', 20, 'red'],
                ]
            }
        }
    }
    </script>
        
    <style scoped>
        .admin_analysis_button_row{
            width:1160px;
            display:flex;
            justify-content: end;
        }
        .admin_analysis_graph_content{
            width:1160px;
            display:flex;
            justify-content: space-between;
            flex-wrap: wrap;
        }
        .admin_graph_header{
            width:560px;
            height:63px;
            padding-left:20px;
            padding-top:20px;
            text-align: start;
            background-color: #FFFFFF;
            font-size: 16px;
            color: #000000;
            font-weight: 500;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
        }
        .admin_graph_content{
            width:560px;
            height:482px;
            background-color: #FFFFFF;
            border-bottom-left-radius: 8px;
            border-bottom-right-radius: 8px;
        }
        .admin_analysis_graph_box{
            margin-top:40px;
            border-radius: 8px;
            border: 1px solid rgba(171, 170, 170, 0.37);
            box-shadow: 0px 4px 14px 10px rgba(170, 170, 170, 0.25);
        }

.admin_analysis_excel_button{
    margin-top:42px;
    width:67px;
    height:35px;
    text-align: center;   
    background-color: #64BAAA;
    color: #FFFFFF;
    border: none;
    border-radius: 8px;
}
.analysis_chart{
    width:100%;
    height: 100%;
}
@media (max-width: 1200px) {
  .web_body{
    width: 600px;
  }
  .admin_header_text{
    max-width: 600px;
  }
  .admin_analysis_graph_content{
    width:600px;
    padding-left:20px;
  }
  .admin_analysis_button_row{
    width:600px;
  }
  .admin_analysis_excel_button{
    margin-right:20px;
  }

  .admin_analysis_graph_content .admin_analysis_graph_box:last-child{
    margin-bottom:236px;
  }
}
</style>