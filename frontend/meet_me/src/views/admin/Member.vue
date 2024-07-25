<template>
<div class="web_body">
    <AdminHeader />
    <div class="admin_web_inner_flex">
        <div>
            <div class="admin_header_text">회원 관리</div>
            <div class="admin_search_div">
                <form class="admin_search_form">
                    <img src="/icon/admin/search.svg" class="search_icon">
                    <input type="text" class="search_input" placeholder="이메일, 닉네임으로 검색">
                </form>
            </div>
            <div class="admin_table_div">
                <table class="admin_table">
                    <thead>
                        <tr class="admin_table_thead">
                            <td>번호</td>
                            <td>이메일</td>
                            <td>닉네임</td>
                            <td>총 결제금액</td>
                            <td>신고</td>
                            <td>차단</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="tr_gray">
                            <td>1</td>
                            <td>sa123@naver.com</td>
                            <td>nickname1</td>
                            <td>10,000,000</td>
                            <td>2</td>
                            <td>
                                <div class="block_buttons">
                                    <div class="block_button_active">Y</div>
                                    <div class="block_button_inactive">N</div>
                                </div>
                            </td>
                        </tr>
                        <tr class="tr_white">
                            <td>번호</td>
                            <td>이메일</td>
                            <td>닉네임</td>
                            <td>총 결제금액</td>
                            <td>신고</td>
                            <td>
                                <div class="block_buttons">
                                    <div class="block_button_active">Y</div>
                                    <div class="block_button_inactive">N</div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="admin_web_inner_flex">
                <div class="admin_pagination_box">
                    <div class="pagination_button_active">
                        1
                    </div>
                    <div class="pagination_button_inactive">
                        1
                    </div>
                    <div class="pagination_button_inactive">
                        1
                    </div>
                    <div class="pagination_button_inactive">
                        1
                    </div>
                    <div class="pagination_button_inactive">
                        1
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>    
<script>

export default {
    data() {
        return {
        }
    }
}
</script>
    
<style scoped>

td{
    padding:0px;
    border-spacing: 0px;  
    border: 0px solid black;
}

tr{
    height:44px;
}

tbody tr:hover{
    background-color: #EBEBFF;
}

.tr_gray{
    background-color: #F2F3F5;
}
.tr_white{
    background-color: #FFFFFF;
}


.pagination_button_active{
    background-color: #5C09E3;
    color: #FFFFFF;
    width:30px;
    height:30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 7px;
    font-size:13px;
}

.pagination_button_inactive{
    background-color: #D9D9D9;
    color: #FFFFFF;
    width:30px;
    height:30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 7px;
    font-size:13px;
}

.block_button_active{
    background-color: #5C09E3;
    color: #FFFFFF;
    width:40px;
    height:21px;
    border-radius: 5px;
    font-size:13px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.block_button_inactive{
    background-color: #D9D9D9;
    color: #FFFFFF;
    width:40px;
    height:21px;
    border-radius: 5px;
    font-size:13px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.block_buttons{
    display:flex;
    padding: 11px 15px;
}
.block_buttons :last-child{
    margin-left:10px;
}

.admin_search_div{
    width: 965px;
    display:flex;
    justify-content: end;
}

.admin_table_thead :first-child{
    width: 120px;
}
.admin_table_thead :nth-child(2){
    width: 241px;
}
.admin_table_thead :nth-child(3){
    width: 183px;
}
.admin_table_thead :nth-child(4){
    width: 150px;
}
.admin_table_thead :nth-child(5){
    width: 150px;
}
.admin_table_thead :nth-child(6){
    width: 121px;
}

tbody :last-child :first-child{
    border-bottom-left-radius: 8px;
}
tbody :last-child :last-child{
    border-bottom-right-radius: 8px;
}
</style>