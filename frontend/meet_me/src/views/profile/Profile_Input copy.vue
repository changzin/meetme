<template>
    <div class="container0">
        <div class="container_top">
            <div>프로필 입력</div>
        </div>
        <div class="container_middle">
            <div class="container_gen_age">
                <div class="gender">
                    <div>성별</div>
                    <div>박스</div>
                </div>
                <div class="age">
                    <div>나이</div>
                    <div>박스</div>
                </div>
            </div>
            <div class="subtitle">
                필수 입력
            </div>
            <div class="container_essential">
                <div>박스</div>
                <div>박스</div>
                <div>박스</div>
                <div>박스</div>
                <div>박스</div>
                <div>박스</div>
                <div>박스</div>
                <div>박스</div>

            </div>
            <div class="subtitle">
                주소지
            </div>
            <div class="adress">
                <input type="text" placeholder="주소검색" />
                <input type="submit" />
            </div>
            <div class="subtitle">
                자기소개
            </div>
            <div class="intro">
                g하이
            </div>

        </div>
        <div class="container_bottom">
            <button calss="next">다음으로</button>
        </div>

    </div>


</template>
<style scoped>
 /* div */
 
        
    div.container0{
        width: 600px;
        height: 100vh;
        margin:0 auto; 
        /* border:1px solid red; */
        display: flex; 
        flex-direction: column; 
        justify-content: flex-start; 
        border: none;
        background: none;
        border-radius: 10px;
        box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.23);
    }
    div.container_top{
        border: 1px solid red;
        margin-bottom: 20px;
    }

    div.container_middle{
        border: 1px solid blue;
        display: flex;
        flex-direction: column; 
        gap: 10px;


    }

    div.container_gen_age{
        border: 1px solid green;
        display: grid;
        grid-template-columns: 1fr 1fr;
         

    }

    div.gender{
        border: 1px solid red;
        display: grid;
        grid-template-columns: 1fr 2fr;
        justify-items: start;

    }

    div.age{
        border: 1px solid red;
        display: grid;
        grid-template-columns: 1fr 2fr;
        justify-items: start;
    }

    div.subtitle{
        border: 1px solid red;

    }

    div.container_essential{
        border: 1px solid red;
        display: grid;
        grid-template-columns: 1fr 1fr;

    }
    .container_essential div{
        border: 1px solid blue;
    }

    div.adress{
        border: 1px solid red;
        display: grid;
        grid-gap: 20px;
        grid-template-columns: 440px 75px;

    }

    div.intro{
        /* border: 1px solid red; */
        background: #888888;
        height: 300px;

    }

    div.container_bottom{
        border: 1px solid red;

    }

    
</style>
<script>
export default {	
    name:'',
    components:{},
    data() {
        return {
            sampleData : ''
        };
    },
    beforeCreate() {},
    created() {},
    beforeMount() {},
    mounted() {},
    beforeUpdate() {},
    updated() {},
    beforeUnmount() {},
    unmounted() {},
    methods: {}
}
</script>