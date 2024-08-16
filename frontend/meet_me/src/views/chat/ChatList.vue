<template>
    <div class="container0">
        <MeetHeader :activeIcon="'chat'" />
        <div class="search">
            <div class="search_icon"><img src="../../../public/icon/chat/search.svg"></div>
            <input class="search_box" type="text" placeholder="검색" />
        </div>    
        <div class="container_chat">
          <div v-for="(roomList, index) in roomList" :key="index">
            <div class="chat_list" @click="clickeToChatRoom(roomList.chat_list_id)">
                <img class="profile_circle" :src="this.$imageFileFormat(roomList.user_image_path)">
                <div class="chat_container">
                    <div class="chat_name">{{ roomList.user_nickname }}</div>
                    <div class="chat_content">
                        <div class="chat_contnet_chat">fdsfdsdffdfffdsfdsdffdfffdsfdsdffdfffdsfdsdffdff</div>
                        <div class="chat_content_time">·2달전</div>
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
      roomList: [], // 보낸 메세지
    };
  },
  async created() {
    this.connectToServer();
    this.getchatRoomList(); 

    // receiveMessage 리스너를 설정
    this.$socket.on("receiveMessage", (data) => {
      console.log("New message data:", data);
      // data.message에서 실제 메시지 문자열을 추출하여 업데이트
      // this.chatData.push(data.message);
      // this.scrollToBottom();
    });
  },
  beforeUnmount() {
    this.$socket.off("receiveMessage");
    this.$socket.off("connect");

  },

  methods: {

    async getchatRoomList() {
      try{       

      const requestBody = {
          access_token: this.$getAccessToken()
        }
       
      // 채팅방 리스트 가져오기
      const response = await this.$api(`/chat/getlist`, requestBody, "post");      
      this.roomList = response.roomList;
      console.log("룸리스트", this.roomList);
    // } 
    }catch(error){
      alert("채팅방 리스트를 불러올 수 없습니다");
      console.error(error);

    }      
    },
    async clickeToChatRoom(chat_list_id){
            try{
                await this.$router.push({name : 'Chatroom' , query : {data: this.$encrypt(chat_list_id)}});
            }
            catch(err){
                console.error(err);
            }
        },

    connectToServer() {
      this.$socket.on("connect", () => {
        console.log("Connected to server");
      });
    }
  }
};


</script>
<style scoped>
       /* font */
       @import url(http://fonts.googleapis.com/earlyaccess/notosanskr.css); 
        div{
            font-family: 'Noto Sans KR', sans-serif;
            font-size: 16px;
            color:#555555;
        }
        input::placeholder{
        font-family: 'Noto Sans KR', sans-serif;
        }
        
        /* div */
        
        div.container0{
            width: 600px;
            height: 100vh;
            margin:0 auto; 
            padding-left: 15px;
            padding-right: 15px;
            /* border:1px solid red; */
            display: flex; 
            flex-direction: column; 
            justify-content: flex-start; 
            border: none;
            background: white;
            border-radius: 10px;
            box-sizing: border-box;
            box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.23);
            
        }
        
        div.search{
            border-radius: 10px;
            background: white;
            /* border: 1px solid blue; */
        }
        .search_box{
            width: 520px;
            height: 45px;
            margin-top : 10px;
            margin-left: 26px;
            margin-right: 26px;
            margin-bottom: 25px;
            border-radius: 15px;
            background-color: #f5f5f5;
            text-indent: 45px;
            /* border: 1px solid pink; */
            display: grid;
            align-content: center;
            border: none;
            box-sizing: border-box;
            outline: none;
        }

        .search_container{
            display: flex;
            /* border: 1px solid green; */
        }
        div.container_chat{
            height: 100vh;
            overflow: scroll; 
            background: white;
            /* border:4px solid green; */
            border-radius: 0px 0px 10px 10px;
            padding-bottom: 60px;
        }
        div.container_chat::-webkit-scrollbar {
        display: none;
        }   

        div.chat_list{
            margin-left: 36px;
            margin-right: 36px;
            margin-bottom: 20px;
            /* border: 1px solid green; */
            display: grid;
            grid-template-columns: 88px auto ;
            align-items: center;
            cursor: pointer;
        }

        div.chat_container{
            /* border: 1px solid red; */
        }

        div.chat_name{
            /* border: 1px solid yellow; */
            font-weight: bold;
            word-break: break-all;
            text-align: left;
        }
        div.chat_content{
            /* border:1px solid blue; */
            display: flex;
            gap: 10px;
            grid-template-columns: auto auto;
            margin-bottom: 10px;
            word-break: break-all;
        }
        div.chat_contnet_chat{
            /* border: 1px solid red; */
            max-width: 300px;
            white-space: nowrap; 
            overflow: hidden;
            text-overflow:ellipsis

        }
        div.chat_content_time{
            color: #888888;
            /* border: 1px solid red; */
        }


        /* 아이콘 */
        .search_icon{
            display: grid;
            align-content: center;
            width: 16px;
            height: 16px;
            position: relative;
            left:45px;
            top:42px;
            /* background-color: aqua; */
        }

        /* 이미지 */
        
        .profile_circle{
          width: 65px;
          height: 65px;
          border-radius: 100px;
          margin: 10px;
          justify-content: start;
          object-fit: cover;
        }

</style>