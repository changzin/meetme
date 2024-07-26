<template>
<div class="web_body">
    <AdminHeader />
    <MemberReportModal :data="this.reportData"/>
    <MemberPayModal :data="this.payData"/>
    <div class="admin_web_inner_flex">
        <div>
            <div class="admin_header_text">회원 관리</div>
            <div class="admin_mobile_row">
                <div class="admin_search_div">
                    <form class="admin_search_form" @submit.prevent="search()">
                        <img src="/icon/admin/search.svg" class="search_icon" @click="search">
                        <input type="text" class="search_input" placeholder="이메일, 닉네임으로 검색" v-model="keyword">
                    </form>
                </div>
            </div>
            <div class="admin_mobile_row">
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
                            <tr :class="{tr_gray: (index%2==0), tr_white: (index%2==1) }"
                                 v-for="(user, index) in userList" :key="index">
                                <td>{{index+1 + (page-1)*10}}</td>
                                <td>{{user.user_email}}</td>
                                <td>{{user.user_nickname}}</td>
                                <td @click="viewPayModal(user.user_id)">{{(user.user_payment) ? user.user_payment : 0}}</td>
                                <td @click="viewReportModal(user.user_id)">{{(user.user_reportCount) ? user.user_reportCount : 0}}</td>
                                <td>
                                    <div class="block_buttons">
                                        <div :class="{block_button_active: (user.user_block=='T'), 
                                            block_button_inactive: (user.user_block=='F') }" @click="blockUser(user)">Y</div>
                                        <div :class="{block_button_active: (user.user_block=='F'), 
                                            block_button_inactive: (user.user_block=='T') }" @click="unBlockUser(user)">N</div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="admin_web_inner_flex">
                <div class="admin_pagination_box">
                    <div :class="{button_hidden: (page-2 < 1)}" class="pagination_button_inactive" @click="goToPage(page-2)">
                        {{page-2}}
                    </div>
                    <div :class="{button_hidden: (page-1 < 1)}" class="pagination_button_inactive" @click="goToPage(page-1)">
                        {{page-1}}
                    </div>
                    <div class="pagination_button_active">
                        {{page}}
                    </div>
                    <div :class="{button_hidden: (page+1 > maxPage)}" class="pagination_button_inactive" @click="goToPage(page+1)">
                        {{page+1}}
                    </div>
                    <div :class="{button_hidden: (page+2 > maxPage)}" class="pagination_button_inactive" @click="goToPage(page+2)">
                        {{page+2}}
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
            userList: [],
            page: 1,
            maxPage: 1,
            offset: 10,
            keyword: "",
            prevKeyword: "",
            reportData: {},
            payData:{}
        }
    },
    methods: {
        async getUserList(){
            try{
                await this.$router.push({name: 'member', query: {page: this.page, keyword: this.prevKeyword, offset: this.offset}});

                this.page = this.$route.query.page;
                this.prevKeyword = this.$route.query.keyword;
                this.offset = this.$route.query.offset;
                this.page = (!this.page) ? 1 : Number(this.page);
                this.prevKeyword = (!this.prevKeyword) ? "" : this.prevKeyword;
                this.offset = (!this.offset) ? 10 : this.offset;

                let requestBody = {

                };
                let result = await this.$api(`/user/list?page=${this.page}&keyword=${this.prevKeyword}&offset=${this.offset}`, requestBody, "POST");
                this.userList = result.userList;
                this.maxPage = result.maxPage;
            }
            catch(err){
                console.error(err);
            }
        },
        async search(){
            this.prevKeyword = this.keyword;
            this.page = 1;
            await this.getUserList();
        },
        async goToPage(targetPage){
            this.page = targetPage;
            await this.getUserList();
        },
            // 유저 차단 
        async blockUser(user){
            try{
                const result = await this.$api(`/user/block`, {user_id: user.user_id}, "POST");
                if (result.status == 200){
                user.user_block = "T";
                }
                else{
                alert("서버 에러로 작업을 완료하지 못했습니다. 다시 시도하세요.")
                }
            } 
            catch(err){
                console.error(err);
                alert("서버 에러로 작업을 완료하지 못했습니다. 다시 시도하세요.")
            }
        },
        // 유저 차단 해제
        async unBlockUser(user){
            try{
                const result = await this.$api(`/user/unblock`, {user_id: user.user_id}, "POST");
                if (result.status == 200){
                user.user_block = "F";
                }
                else{
                alert("서버 에러로 작업을 완료하지 못했습니다. 다시 시도하세요.")
                }
            }
            catch(err){
                console.error(err);
                alert("서버 에러로 작업을 완료하지 못했습니다. 다시 시도하세요.")
            }
        },
        async viewReportModal(user_id){
            let requestBody = {
                user_id: user_id
            }
            let result = await this.$api("/user/report", requestBody, "POST");
            this.reportData = result;
            this.$store.commit("setModalOn");
        },
        async viewPayModal(user_id){
            let requestBody = {
                user_id: user_id
            }
            let result = await this.$api("/user/payment", requestBody, "POST");
            this.payData = result;
            console.log(this.$store.state.modalOn2);
            this.$store.commit("setModalOn2");
        }

    },
    async created(){
        await this.getUserList();
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
    cursor: pointer;
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
    cursor: pointer;
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
    cursor: pointer;
    background-color: #5C09E3;
    color: #FFFFFF;
    width:40px;
    height:21px;
    border-radius: 5px;
    font-size:13px;
    display: flex;
    justify-content: center;
    align-items: center;
    border:0px solid black;
}

.block_button_inactive{
    cursor: pointer;
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

.admin_table_thead td:first-child{
    width: 120px;
}
.admin_table_thead td:nth-child(2){
    width: 241px;
}
.admin_table_thead td:nth-child(3){
    width: 183px;
}
.admin_table_thead td:nth-child(4){
    width: 150px;
}
.admin_table_thead td:nth-child(5){
    width: 150px;
}
.admin_table_thead td:nth-child(6){
    width: 121px;
}

tbody tr:last-child td:first-child{
    border-bottom-left-radius: 8px;
}
tbody tr:last-child td:last-child{
    border-bottom-right-radius: 8px;
}
.button_hidden{
    visibility: hidden;
}
@media (max-width: 1200px) {
  tr :nth-child(4), tr :nth-child(5){
    display: none;
  }
  table{
    width:453px;
  }
  .admin_table_div{
    width:453px;
  }
  .web_body{
    min-width: 600px;
    width: 600px;
  }
  .admin_header_text{
    max-width: 600px;
  }
  .admin_search_div{
    margin-right:73px;
  }
  .admin_mobile_row{
    width:600px;
    display:flex;
    justify-content: center;
  }
}
</style>