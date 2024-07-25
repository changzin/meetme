<template>
    <div class="container container0">
        <div class="row justify-content-center">
            <div class="cardbox row justify-content-center">
            <div class="title">
                프로필 입력
            </div>
            <div class="genderbox col">
                <div class="subtitle1">
                    성별
                </div>
                <div class="genderselect">
                    
                </div>
            </div>
            <div>

            </div>
        </div>
    </div>
</div>

</template>
<script>
export default {
    data(){
        return{
            
        }
    },
    methods:{
       
    }
}
</script>

      

<style scoped>
    .container0 {
    width: 600px;
    border: 1px solid red;
    display: grid;
    align-content: center;
    background-color: #888888;
    }

    .cardbox {
        margin-top: 30px;
        margin-bottom: 80px;
        width: 568px;
        display: flex;
        background-color: #FFFFFF;
        border-radius: 18px;
    }

    .title {
        margin-top: 44px;
        font-size: 24px;
        color: #111111;
        text-align: center;
        margin-bottom:44px;
        font-weight: bold;
    }
    .genderbox{
        width: 181px;
        height: 34px;
    }
    .subtitle1{
        font-size: 16px;
        font-weight: 500px;
        margin-left: 30px;
        text-align: start;
    }

    .genderselect{
        width:118px;
        background-color: #d9d9d9;
        border-radius: 9px;

        
    }

</style> 