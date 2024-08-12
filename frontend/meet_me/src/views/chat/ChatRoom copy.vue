<template> 
    <div class="container0">
      <MeetHeader  class="header_font" />
      <ChatModal />
        <div class="container_top">
          <div class="box_name">
            <div class="container_top_content">
              <div class="back_icon" @click="this.$router.push({path: '/chatlist/'})"><img src="../../../public/icon/chat/back.svg"></div>
              <div class="top_name">상대방1</div>
              <div class="out_icon" @click="chatModal()"><img src="../../../public/icon/chat/out.svg"></div>
            </div>
          </div>
        </div>
          <div class="container_white">
            <div class="container_middle">
              <div class="middle_left">
                <div class="profile_circle"></div>
                <div class="middle_left_content">
                  <div class="left_name">상대방</div>
                  <div class="middle_left_content2">
                    <div class="box_content_left">
                      안녕하세요
                    </div>
                    <div class="time">오후 10:24</div>
                    <div class="cehck_icon"><img src="../../../public/icon/chat/check.svg"></div>
                  </div>
                </div>
              </div>
              <div class="middle_left_hidden">
                <div class="profile_circle_hidden"></div>
                <div class="middle_left_content">
                  <div class="left_name_hidden">상대방</div>
                  <div class="middle_left_content2">
                    <div class="box_content_left">
                      안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요
                      안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요
                      안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요
                    </div>
                    <div class="time">오후 10:29</div>
                    <div class="cehck_icon"><img src="../../../public/icon/chat/check.svg"></div>
                  </div>
                </div>
              </div>
              <div class="middle_left">
                <div class="profile_circle"></div>
                <div class="middle_left_content">
                  <div class="left_name">상대방</div>
                  <div class="middle_left_content2">
                    <div class="box_content_left">
                      대답좀
                    </div>
                    <div class="time">오후 10:30</div>
                    <div class="cehck_icon"><img src="../../../public/icon/chat/check.svg"></div>
                  </div>
                </div>
              </div>
              <div class="day">
                <div class="box_day">2024년 12월 3일</div>
              </div>
              <div class="middle_right">
                <div class="middle_left_content2">
                  <div class="check_icon"></div>
                  <div class="time">오후 10:29</div>
                  <div class="box_content_right">
                    말걸지마아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아
                  </div>
                </div>
              </div>
              <div class="middle_right">
                <div class="middle_left_content2">
                  <div class="check_icon"></div>
                  <div class="time">오후 10:29</div>
                  <div class="box_content_right">
                    아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아
                  </div>
                </div>
              </div>
              <div class="middle_right">
                <div class="middle_left_content2">
                  <div class="check_icon"></div>
                  <div class="time">오후 10:29</div>
                  <div class="box_content_right">
                    다시놀자
                  </div>
                </div>
              </div>              
          </div> 
        </div>
        <div class="container_bottom">
          <div class="container_bottom_box">
            <div class="gallery_icon"><img src="../../../public/icon/chat/gallery.svg"></div>
            <input class="box_chat" placeholder="메시지를 입력하세요" />
            <div class="send_icon"><img src="../../../public/icon/chat/send.svg"></div>
          </div>
        </div>
      </div>
  </template>  
<script>

export default {
  data(){
    return {
    }
  },
  methods: {
    chatModal(){
      this.$store.commit("setModalOn");
    },      
  },
}

</script>
<style scoped>
    /* hidden 속성들은 추후 자바스크립트로 합침*/

    /* font */
    @import url(http://fonts.googleapis.com/earlyaccess/notosanskr.css); 
    div{
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 14px;
    color:#555555;
    }
    input::placeholder{
        font-family: 'Noto Sans KR', sans-serif;
    }
    .header_font{
      font-size: 16px;
    }
    .top_name{
        font-size: 16px;
        font-weight: bold;
        color: white;
    }
    .time{
       color: #888888;
    }

    /* div */
    html, body {
    height: 100%;
    margin: 0;
    padding: 0;
    }
    div.container0{
      width: 600px;
      height: 100vh; /* 뷰포트 높이를 100%로 설정 */
      box-sizing: border-box;
      margin: 0 auto; 
      display: flex; /* 그리드 대신 플렉스를 사용 */
      flex-direction: column; /* 세로 방향으로 아이템 정렬 */
      justify-content: flex-start; /* 상단으로 정렬 */
      /* border: 1px solid red; */
      border-radius: 10px;
      box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.23);
      
     }
     div.container_top{
        /* border: 4px solid green; */
     }
     div.container_top_content{
        /* border: 1px solid yellow; */
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: white;
        font-weight: bold;
                
     }
     div.container_white{
      background: white; 
      /* border: 1px solid red; */
     }
     div.container_middle{
        margin-left: 25px;
        margin-right: 25px;
        height: 770px;
        overflow: scroll;
        /* border: 1px solid green; */
     }
     div.container_middle::-webkit-scrollbar {
        display: none;
    }   

     div.middle_left{
        display: grid;
        grid-template-columns: 80px auto;
        margin-top: 40px;
        /* border: 1px solid red; */
     }
     div.middle_left_hidden{
        display: grid;
        grid-template-columns: 80px auto;
        /* border: 1px solid red; */
     }
     
     div.middle_left_content{
        /* border: 1px solid orange; */
        max-width: 405px;
     }
     div.middle_left_content2{
        /* border: 1px solid red; */
        display: flex;
        gap: 5px;
        align-items: flex-end;
        margin-top: 10px;
        word-break: break-all;

     }
     div.left_name{
        text-align: left;
        font-weight: bold;

     }

     div.left_name_hidden{
        font-weight: bold;
        visibility: hidden;

     }
     div.day{
        display: flex;
        justify-content: center;
        color:red
     }
     div.middle_right{
        display: flex;
        justify-content: flex-end;
        margin-top: 30px;
        /* border: 1px solid red; */
     }
     div.container_bottom{
        /* border: 1px solid blue; */
        display: grid;
        padding-bottom:60px;
     }
     div.container_bottom_box{
        background-color: #eeeeee;
        display: flex;
        gap: 18px;
        justify-content: center;
        align-items: center;
        height: 75px;
        border-radius: 0px 0px 10px 10px;
     }

     /* box */
     .box_name{
        height: 75px;
        background-color: #5C09E3;
        display: grid;
        align-items: center;
        word-break: break-all;
        border-radius: 10px 10px 0px 0px;
     }
     .box_content_left{
        width: auto;
        max-width: 280px;
        background-color: #f5f5f5;
        display: inline-block;
        padding: 10px;
        box-sizing: border-box;
        border-top-right-radius: 5px;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;     
        text-align: left; 
     }
     .box_content_right{
        width: auto;
        max-width: 280px;
        background-color: #f5f5f5;
        display: inline-block;
        padding: 10px;
        box-sizing: border-box;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        border-bottom-left-radius: 5px;   
        text-align: left;
     }
     .box_day{
        background-color: #f7f7f7;
        color: #9D88B3;
        border-radius: 20px;
        width: 160px;
        height: 30px;
        margin-top: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
     }
     .box_chat{
        width: 420px;
        height: 50px;
        background-color: white;
        border: none;
        border-radius: 30px;
        outline: none;
        text-indent: 12px;
     }

     /* icon */
     .back_icon{
            width: 36px;
            height: 36px;
            margin-left: 20px;
            cursor: pointer;
        }
     .out_icon{
        margin-top: 6px;
        margin-right: 30px;
        fill: white;
        cursor: pointer;
        
     }
     .check_icon{
        width: 16px;
        height: 16px;
        /* background-color: aqua; */
     }
     .gallery_icon{
        width: 48px;
        height: 48px;
        border-radius: 20px;
        background-color: #f7f7f7;
        cursor: pointer;
        display: grid;
        align-content: center;
        justify-content: center;
     }
     .send_icon{
        width: 48px;
        height: 48px;
        border-radius: 20px;
        background-color: #f7f7f7;
        cursor: pointer;
        display: grid;
        align-content: center;
        justify-content: center;
     }
     

    /* 이미지 */

    .profile_circle{
    width: 70px;
    height: 70px;
    border-radius: 50px;
    background-color: #f5f5f5;
    cursor: pointer;
    }
    .profile_circle_hidden{
    width: 70px;
    height: 70px;
    border-radius: 50px;
    background-color: #f5f5f5;
    visibility: hidden;
    }
  
</style>

