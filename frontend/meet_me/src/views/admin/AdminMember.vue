<template>

</template>    
<script>
export default {
    data() {
    return {
        memberList: [],
        blockOption: false,
        page: 1,
        maxPage: 0,
        keyword: "",
        prevKeyword: "",
        mode: "all",
        prevMode: "all",
        block: 'F',
        adminNick: "null"
    }
    },
    mounted(){      
    },
    methods: {
    async getAdminInfo(){
        try{
        const result = await this.$verifiedAdmin();
        if (result.status == 200){
            this.adminNick = result.admin_nickname;
        }
        else{
            alert("관리자 로그인 상태가 아닙니다.")
        }
        }
        catch(err){
        console.error(err);
        alert("관리자 로그인 상태가 아닙니다.")
        this.$logoutUser();
        this.$router.push({name: 'mainPage'})
        }
    },
    // 멤버 정보 받아오기
    async getMemberList(){
        try{
        // URL에 파라미터를 추가한다.
        await this.$router.push({path: '/admin/memberlist', query:{page: this.page, block: this.block, mode: this.prevMode, keyword: this.prevKeyword} });

        // 멤버 정보를 가져오기 전에 파라미터 갈무리
        this.page = Number(this.$route.query.page);
        this.block = this.$route.query.block;
        this.prevMode = this.$route.query.mode;
        this.prevKeyword = this.$route.query.keyword
        this.page = (!this.page) ? 1 : this.page;
        this.block = (this.block == 'T') ? this.block : 'F';
        this.mode = (!this.mode) ? 'all' : this.mode;
        this.prevKeyword = (!this.prevKeyword) ? "" : this.prevKeyword;

        // memberList 정보 다시 가저오고, maxPage를 맞추어준다.
        const result = await this.$api(`http://localhost:9090/user/list?page=${this.page}&block=${this.block}&mode=${this.mode}&keyword=${this.prevKeyword}`);      
        this.memberList = result.memberList;
        this.maxPage = result.maxPage;
        }
        catch(err){
        console.error(err);
        alert("멤버 정보를 불러올 수 없습니다!");
        }
    },
    // 차단 회원 불러오기(현재 리스트에서 필터만 하면 간단함)
    async getBlockMemberList(){
        this.blockOption = true;
        this.block = 'T';
        this.page = 1;
        this.getMemberList();
    },
    // 전체 회원 불러오기(검색한 상태라면 검색 키워드는 유지하면서 전체 회원을 불러와야 하기 때문에 키워드를 넣었다.)
    async getUnblockMemberList(){
        this.blockOption = false;
        this.block = 'F';
        this.page = 1;
        this.getMemberList();
    }, 
    async search(){
        this.prevKeyword = this.keyword;
        this.prevMode = this.mode;
        this.page = 1;
        this.getMemberList();
    },
    // 이전 블록 페이지로 이동 (5번째 이전 페이지, 남은 이전 페이지가 5개 이하일 경우 마지막 페이지 이동)
    async prevBlock(){
        if (this.page <= 5){
        this.page = 1;
        }
        else{
        this.page = this.page - 5;
        }
        this.getMemberList();
    },
    // 다음 블록 페이지로 이동 (5번째 이후 페이지, 남은 다음 페이지가 5개 이하일 경우 마지막 페이지 이동)
    async nextBlock(){
        if (this.page > this.maxPage-5){
        this.page = this.maxPage;
        }
        else{
        this.page = this.page + 5;
        }
        this.getMemberList();
    },
    async nextPage(){
        this.page+=1;
        this.getMemberList();
    },
    async prevPage(){
        this.page-=1;
        this.getMemberList();
    },
    async goToPage(targetPage){
        this.page = targetPage;
        this.getMemberList();
    },
    // 유저 차단 
    async blockUser(member, user_id){
        try{
        const accessToken = this.$getAccessToken();
        const result = await this.$api(`http://localhost:9090/user/block`, {user_id: user_id, access_token: accessToken}, "POST");
        if (result.status == 200){
            member.user_block = "T";
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
    async unblockUser(member, user_id){
        try{
        const accessToken = this.$getAccessToken();
        const result = await this.$api(`http://localhost:9090/user/unblock`, {user_id: user_id, access_token: accessToken}, "POST");
        if (result.status == 200){
            member.user_block = "F";
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
    }
}
</script>
    
<style scoped>
</style>