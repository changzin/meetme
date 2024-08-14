<template>
    <div class="safety_zone">
        <div class="container">
            <div class="title">
                스토어
            </div>
            <div class="profile_box">
                <div>
                    <img class="jpg" src="/KakaoTalk_20240814_161650916.jpg">
                </div>
                <div class="store_subtitle">
                    <div class="regular_black_font">
                        보유중인 내 코인
                    </div>
                    <div class="store_mycoin">
                        {{$numberFormat(coin)}}개
                    </div>
                </div>

                <div class="store_box">
                    <div class="store_coin_row" v-for="(coinProduct, i) in coinProductList" :key="i">
                        <img src="/icon/mypage/store/coin.svg" >
                        <div class="store_row_content">
                            <div class="regular_black_font store_product_coin_value">{{$numberFormat(coinProduct.coin_product_price)}}코인</div>
                            <div class="matching_button" @click="requestPay(coinProduct)">{{$numberFormat(coinProduct.coin_product_amount)}}원</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <MeetHeader />
    </div>
</template>
<script>
export default {	
    data() {
        return {
            coin: 0,
            coinProductList: [],
            userNickname: {},
        };
    },
    async created() {
        await this.getCoinProduct();
        await this.getCoin();
    },
    methods: {
        async getCoinProduct(){
            try{

                let result = await this.$api("/coinproduct/list");
                
                if (result.status==200){
                    this.coinProductList = result.coinProductList;
                }
                else{
                    throw new Error("불러올 수 없습니다")   
                }
            }
            catch(err){
                console.error(err);
            }
        },
        async getCoin(){
            try{
                let requestBody = {
                    access_token: this.$getAccessToken()
                }
                let result = await this.$api("/user/coin", requestBody,"POST");
                
                if (result.status==200){
                    this.coin = result.userCoin;
                    this.userNickname = result.user_nickname;
                }
                else{
                    throw new Error("불러올 수 없습니다")
                }
            }
            catch(err){
                console.error(err);
            }
        },
        async requestPay(coinProduct){
            
        // //결제데모를 사용 시 실제로 결제가 되기 때문에 앞쪽으로 빼놓음.
            try {
                let requestBody = {
                    access_token: this.$getAccessToken(),                                
                    coin_product_id: coinProduct.coin_product_id,
                    coinUpdate: coinProduct.coin_product_price,
                };
                await this.$api("/payment/intopayment", requestBody, "POST");
            } catch (err) {
                console.error("결제 처리 중 오류:", err);
            }
            await this.getCoinProduct();
            await this.getCoin();
            
            
            let name = this.$numberFormat(coinProduct.coin_product_price)
            let amount = this.$numberFormat(coinProduct.coin_product_amount)
            let buyer_name = this.userNickname
            const IMP = window.IMP;
            IMP.init("imp17750140");
            
            IMP.request_pay(
                {
                    pg: "html5_inicis",
                    pay_method: "card",
                    name: name + '코인',
                    amount: amount,
                    buyer_name: buyer_name,
                    buyer_tel: "010-1234-1234",
                    buyer_addr: "0",
                    buyer_postcode: "123",
                },
                async (rsp) => {  // 콜백 함수에 async 추가
                    if (rsp.success) {
                        try {
                            let requestBody = {
                                access_token: this.$getAccessToken(),
                                coin_product_id: this.coin_product.coin_product_id,
                                payment_id: this.payment.payment_id,
                            };
                            let result = await this.$api("/payment/intopayment", requestBody, "POST");
                            console.log(result);
                        } catch (err) {
                            console.error("결제 처리 중 오류:", err);
                        }
                    } else {
                        console.error("결제 실패:", rsp.error_msg);  // rsp.success가 false인 경우 처리 추가
                    }
                }
            );
        },


    }
}
</script>
<style scoped>

.container {
    min-width: 600px;
    padding: 0 16px 0 16px;
}

.title {
    font-size: 24px;
    font-weight: 700;
    padding: 30px 0 15px 0;
    margin: 0;
}

.mypage_container {
    padding-top: 80px;
}

.profile_box {
    margin-bottom: 20px;
}

.mini_profile {
    width: 60px;
    height: 60px;
    border-radius: 100px;
    margin: 10px;
    justify-content: start;
    object-fit: cover;
}

.name_title {
    padding: 10px 0 10px 0;
    text-align: start;
    display: flex;
    align-items: center;
}

.status {
    font-weight: 400;
    padding: 0 10px 0 10px;
}

.live {
    color: #9D88B3;
}

.button {
    display: flex;
    padding-right: 20px;
    margin-left: auto;
    justify-content: end;
    align-items: center;
    cursor: pointer;
}

.matching_button {
    border: 2px solid var(--purple_main);
    border-radius: 10px;
    /* margin: 0 15px 0 15px;
    padding: 8px 16px; */
    color: var(--purple_main);
    display: flex;
    height:32px;
    align-items: center;
    justify-content: center;
    padding: 0px 17px;
    
    cursor: pointer;
    min-width:100px;
}

.matching_cencel {
    border: 2px solid var(--purple_main);
    border-radius: 10px;
    margin: 0 15px 0 15px;
    padding: 8px 16px;
    background-color: var(--purple_main);
    color: #ffffff;
}

.trash {
    border-color: #9d88b300;
    background-color: #9d88b300;
    padding-bottom: 5px;
    
}

.regular_black_font{
    font-size: 16px;
    color: #000000;
}

.store_subtitle{
    text-align: start;
    padding-left:30px;
    padding-top:25px;
    display:flex;
    margin-bottom: 20px;
}

.store_mycoin{
    color: #64BAAA;
    font-weight: bold;
    font-size:16px;
    margin-left:22px;
}

.store_box{
    padding: 20px 28px;
    background-color: #FFFFFF;
    border-radius: 10px;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.23);
}

.store_package{
    font-size: 18px;
    color: #000000;
    font-weight: 500;
    text-align: start;
    min-width:200px;
    text-align: start;
}

.store_coin_row{
    display: flex;
    height:32px;
    align-items: center;
    justify-content: start;
    margin-top:21px;
}

.store_product_coin_value{
    padding-left:15px;
    text-align: start;
}
.store_row_content{
    width:100%;
    justify-content: space-between;
    display: flex;
}
.jpg{
    width: 568px;
}
</style>