<template>
    <div class="web_body">
        <AdminHeader />
        <div class="admin_web_inner_flex">
            <div>
                <div class="admin_header_text">판매 현황</div>
                <div class="admin_analysis_button_row">
                    <button class="admin_analysis_excel_button" @click="getExcel">Excel</button>
                </div>
                <div class="admin_analysis_graph_content">
                    <div class="admin_analysis_graph_box">
                        <div class="admin_graph_header">매출 분석</div>
                        <div class="admin_graph_content">
                            <GChart
                            type="LineChart"
                            :data="monthlyProfitData"
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
                            :data="monthlyMatchingData"
                            class="analysis_chart"
                            />
                        </div>
                    </div>
                    <div class="admin_analysis_graph_box">
                        <div class="admin_graph_header">사용자 연령대 분석</div>
                        <div class="admin_graph_content">
                            <GChart
                            type="ColumnChart"
                            :data="genderAgeData"
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
    import { saveAs } from 'file-saver';
    import ExcelJS from 'exceljs';
    export default {
        components:{
            GChart
        },
        data() {
            return {
                userGenderRateData: [
                    ['성별', '회원수'],
                ],
                monthlyProfitData: [
                    ['날짜', '매출'],
                ],
                monthlyMatchingData: [
                    ['날짜', '매칭 수'],
                ],
                genderAgeData:[
                ]
            }
        },
        async created(){
            await this.getAnalysisData();
        },
        methods: {
            async getAnalysisData(){
                try{
                    const requestBody = {
                        access_token: this.$getAccessToken()
                    }
                    const result = await this.$api('/analysis', requestBody, "POST");
                    result.genderRateData.map(
                        (data) => this.userGenderRateData.push([(data.user_gender=='M') ? '남자' : '여자', data.amount])
                    );

                    result.monthlyProfitData.map(
                        (data) => this.monthlyProfitData.push([data.date, Number(data.monthly_profit)])
                    );
                    result.monthlyMatchingData.map(
                        (data) => this.monthlyMatchingData.push([data.date, Number(data.monthly_success)])
                    );
                    result.genderAgeData.map(
                        (data) => this.genderAgeData.push([`${data.age}대 ${(data.user_gender=='M') ? '남자' : '여자'}`, Number(data.amount), (data.user_gender=='M') ? 'blue' : 'red' ])
                    );
                    this.genderAgeData.sort();
                    this.genderAgeData.unshift(['Element', '회원수', { role: 'style' }]);
                }
                catch(err){
                    console.error(err);
                    alert("분석 데이터를 불러올 수 없습니다.")
                }
            },
            async getExcel() {
                try{
                    // workbook(엑셀 파일 하나를 구성하는 여러 시트로 이루어진 단위) 생성
                    const workbook = new ExcelJS.Workbook();
                    
                    // sheet 생성
                    const benefitSheet = workbook.addWorksheet('매출분석');
                    const benefitColumns = Object.keys(this.monthlyProfitData[0]);

                    const userGenderRateSheet = workbook.addWorksheet('회원 남녀 비율');
                    const userGenderRateColumns = Object.keys(this.userGenderRateData[0]);

                    const matchingSheet = workbook.addWorksheet('매칭 수 추이');
                    const monthColumns = Object.keys(this.monthlyMatchingData[0]);

                    const genderAgeSheet = workbook.addWorksheet('사용자 연령대 분석');
                    const genderAgeColumns = Object.keys(this.genderAgeData[0]);

                    // worksheet에 컬럼에 대한 정보를 줌
                    // 맨 첫 번째 줄에 컬럼들이 삽입됨
                    benefitSheet.benefitColumns = benefitColumns.map((column) => ({
                        header: column, // 컬럼 이름
                        key: column, // data에서 컬럼의 값을 구분하기 위한 key
                        width: 18,
                        style: {
                            font: {
                                size: 12
                            },
                            alignment: {
                                vertical: 'middle',
                            }
                        }
                    }));

                    userGenderRateSheet.userGenderRateColumns = userGenderRateColumns.map((column) => ({
                        header: column, // 컬럼 이름
                        key: column, // data에서 컬럼의 값을 구분하기 위한 key
                        width: 18,
                        style: {
                            font: {
                                size: 12
                            },
                            alignment: {
                                vertical: 'middle',
                            }
                        }
                    }));

                    matchingSheet.monthColumns = monthColumns.map((column) => ({
                        header: column, // 컬럼 이름
                        key: column, // data에서 컬럼의 값을 구분하기 위한 key
                        width: 18,
                        style: {
                            font: {
                                size: 12
                            },
                            alignment: {
                                vertical: 'middle',
                            }
                        }
                    }));

                    genderAgeSheet.genderAgeColumns = genderAgeColumns.map((column) => ({
                        header: column, // 컬럼 이름
                        key: column, // data에서 컬럼의 값을 구분하기 위한 key
                        width: 18,
                        style: {
                            font: {
                                size: 12
                            },
                            alignment: {
                                vertical: 'middle',
                            }
                        }
                    }));

                    // 두 번째 줄부터 데이터 행들을 한꺼번에 입력
                    benefitSheet.insertRows(1, this.monthlyProfitData);
                    userGenderRateSheet.insertRows(1, this.userGenderRateData);
                    matchingSheet.insertRows(1, this.monthlyMatchingData);
                    genderAgeSheet.insertRows(1, this.genderAgeData);

                    const buffer = await workbook.xlsx.writeBuffer();
                    saveAs(new Blob([buffer]), '매출 분석.xlsx');
                }
                catch(err){
                    console.error(err);
                    alert("예기치 못한 문제로 엑셀을 다운로드할 수 없습니다.")
                }
            },
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