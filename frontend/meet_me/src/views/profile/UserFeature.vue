<template>
    <div class="container container0">
        <div class="row justify-content-center">
            <div class="card_box row justify-content-center">
            <div class="title">
                특징 선택
            </div>
            <div class="sub_title"> 
                특징을 선택해주세요
            </div>
            
            
            <div class="feature_box">
                <div class="select_box" 
                v-for="feature in userFeature" :key="feature.user_feature_id"
                :class="{'select_box': selectedIds.includes(feature.user_feature_id),'visble_select_box' : !selectedIds.includes(feature.user_feature_id)}" 
                @click="setActive(feature)" >
                    {{feature.user_feature_value }}

                    <!-- 클릭한거 대상으로  변수를 지정해주고  클릭한 것의 id를 post해준다. -->
                </div>
            </div>
 
            <div class="container_bottom">
                <button class="next" @click="postUserFeature()">다음으로</button>
            </div>
        </div>
    </div>
</div>


</template>
<script>


export default {
    data(){
        return{
            user_feature_id:[],
            user_feature_value:[],
            userFeatureIds:[],
            userFeatureId : {},
            userFeature:{},
            selectedValues : [],
            selectedIds : [],
            //user아직 없음
            user_id : 2,
        }
    },
    computed:{
    },
    created(){
      this.fetchFeature();
    },

    methods:{
        setActive(feature){
          const index = this.selectedIds.indexOf(feature.user_feature_id);
          if(index === -1){
            if(this.selectedIds.length >= 4){
                this.selectedIds.shift ();
            }
            this.selectedIds.push(feature.user_feature_id);
            
          }  
          console.log(this.selectedIds);
          
        },


       clearActive(){
        this.activeInput = null;
       },
        async fetchFeature(){
            const requestBody = {}
            const response = await this.$api(`/userFeature/list`,requestBody,"GET")
            console.log(response);
            
            if(response.status == 200){
                this.userFeature = response.userFeature;
                console.log(this.userFeature);
            }

        },
        async postUserFeature(){

            if(this.selectedIds.length >=4){
                const requestBody ={
                //프로필 단계 진행되면 액세스토큰으로 바꾸기 현제 단계에선 일반 user_id로
                // access_token: "a5b4d6dc-95de-4626-8ca3-bea748b8eb94",
                userId : this.user_id,
                user_feature_id : this.selectedIds
                }
                console.log(this.access_token);
                const featureId = await this.$api("/userFeature/insert",requestBody,"POST") 
                console.log(featureId);
                //다음 페이지로 넘어가는 함수 추가 
                this.$router.push({
                    name:"profilephoto"
                })

            }else{
                alert("특징을 4개 선택해주세요")
            }
            
            

        }


        
    },
} 

</script>

      

<style scoped>
    .container0 {
    width: 600px;
    /* border: 1px solid red; */
    display: grid;
    /* grid-auto-columns:  */
    align-content: center;
    
    }
    input[type="text"]{
        outline: none;
        border: none;
    }
    .card_box {
        /* border: 1px soslid red; */
        margin-top: 30px;
        margin-bottom: 80px;
        width: 568px;
        /* display: grid; */
        /* grid-auto-columns: repeat(2, minmax(100px,auto)); */
        background-color: #FFFFFF;
        border-radius: 18px;
    }

    .title {
        margin-top: 54px;
        font-size: 24px;
        color: #111111;
        text-align: center;
        margin-bottom:30px;
        font-weight: bold;
        /* border: red; */
    }
    .sub_title{
        text-align: start;
        font-weight: 500;
        font-size: 18px;
        margin-bottom: 15px;
        color:#111111;
        /* border: 1px solid red; */
    }
    .feature_box{
        display: grid;
        grid-template-columns : repeat(auto-fit,minmax(120px,1fr));
        gap:15px; /* 그리드 아이템 사이의 간격 */
        align-content: center;
        justify-items: stretch;
        /* border: 1px ssolid green; */
        margin-bottom: 30px;
        
    }
    
    .select_box{
        align-content: center;
        justify-content: center;
        height: 40px;
        border-radius: 8px;
        color: #FFFFFF;
        background-color: #64BAAA ;
        text-align: center;
        border: none;
        font-size: 14px;
    }
    .select_box:hover{
        cursor: pointer;
    }

    .visble_select_box{
        align-content: center;
        justify-content: center;
        height: 40px;
        background: none;
        border-radius: 8px;
        color: #888888;
        text-align: center;
        border: 1px solid #b6b6b6;
        font-size: 14px;
    }
    .visble_select_box:hover{
        cursor: pointer;
    }

    div.container_bottom{
        /* border: 1px solid red; */
        
        padding: 0px;
        
        
    }

    .next{
        margin-bottom: 27px;
        /* margin-right: 30px; */
        width: 508px;
        
        height: 60px;
        text-align: center;
        font-size: 22px;
        font-weight: 500;
        color: #FDF7FF;
        background-image: var(--gradient);
        border-radius: 8px;
        border: none;
        
    }

</style> 