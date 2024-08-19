<template>
  <div class="container0">
      <MeetHeader :activeIcon="'chat'" />
      <form @submit.prevent="serachChatList">
        <div class="search">
            <div class="search_icon"><img src="../../../public/icon/chat/search.svg"></div>
            <input 
              v-model="searchText" 
              class="search_box" 
              type="text" 
              placeholder="검색" 
              @input="serachChatList"  
            />
        </div>    
      </form>
      <div class="container_chat">  
        <!-- 검색 결과가 있으면 searchList를 사용하고, 그렇지 않으면 roomList를 사용 -->
        <div v-if="(searchText ? searchList : roomList).length === 0" class="no-chats">
          <h4>받은 채팅이 없습니다</h4>
        </div>
        <div v-for="(room, index) in (searchText ? searchList : roomList)" :key="index">
          <div class="chat_list" @click="clickeToChatRoom(room.chat_list_id)">
              <img class="profile_circle" :src="this.$imageFileFormat(room.user_image_path)">
              <div class="chat_container">
                  <div class="chat_name">{{ room.user_nickname }}</div>
                  <div class="chat_content">
                      <div class="chat_contnet_chat">{{room.chat_content}}</div>
                      <div class="chat_content_time">{{ formatDate(room.chat_create_date) }}</div>
                      <div v-if="messages.length > 0" class="alarm">
                        <div v-if="room.chat_list_id && this.room.includes(room.chat_list_id)" class="aralm-circle"></div>
               </div>
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
      roomList: [], // 기본 채팅방 리스트
      searchList: [], // 검색 결과 리스트
      searchText: "", // 검색어
      messages: [], // 채팅방 별 메시지 저장
      room: [],
    };
  },
  async created() {
    this.connectToServer();
    await this.getchatRoomList(); 

    // receiveMessage 리스너를 설정
    this.$socket.on("receiveMessage", (data) => {
      console.log("New message data:", data);
      // 데이터 메시지 처리 로직 추가 가능

      this.messages.push(data.message);
      console.log("New message:", this.messages);
      this.room.push(data.room);
      
      const roomIndex = this.roomList.findIndex(room => room.chat_list_id === data.room);
      if (roomIndex !== -1) {
      // 메시지가 이미지일 경우 "(사진)"으로 표시
      data.message.image = "(사진)";

      // 해당 room의 chat_content를 수신한 메시지의 텍스트 또는 이미지로 업데이트
      this.roomList[roomIndex].chat_content = data.message.text || data.message.image;

      // 최신 메시지의 시간을 roomList의 chat_create_date에 업데이트
      // 이를 통해 해당 채팅방의 마지막 메시지 시간을 최신으로 갱신
      this.roomList[roomIndex].chat_create_date = new Date(); // 메시지 수신 시점으로 업데이트
    }

    // roomList를 최신순으로 정렬
    // chat_create_date를 기준으로 채팅방 리스트를 최신 메시지가 있는 순서대로 정렬
    this.roomList.sort((a, b) => new Date(b.chat_create_date) - new Date(a.chat_create_date));
  });
  },
  beforeUnmount() {
    this.$socket.off("receiveMessage");
    this.$socket.off("connect");
  },

  watch: {
    searchText(newValue) {
      if (newValue.trim()) {
        this.serachChatList();
      } else {
        // 검색어가 비어 있으면 기본 리스트로 복원
        this.roomList = [];
        this.getchatRoomList();
      }
    }
  },

  methods: {
    async getchatRoomList() {
      try {       
        const requestBody = {
          access_token: this.$getAccessToken()
        };
       
        // 채팅방 리스트 가져오기
        const response = await this.$api(`/chat/getlist`, requestBody, "post");      
        this.roomList = response.roomList;
        console.log("룸리스트", this.roomList);

        // 방에 join
        this.roomList.forEach(room => {
        this.$socket.emit("join", { room: room.chat_list_id });
        });
        
      } catch (error) {
        alert("채팅방 리스트를 불러올 수 없습니다");
        console.error(error);
      }      
    },

    async serachChatList() {
      try {
        const requestBody = {
          access_token: this.$getAccessToken(),
          text: this.searchText
        };

        // 서치 결과 가져오기
        const response = await this.$api(`/chat/search`, requestBody, "post");     
        this.searchList = response.searchList; // 검색 결과를 searchList에 저장
        console.log("서치결과", response);
      } catch (error) {
        console.error(error);
      }
    },


    
    async clickeToChatRoom(chat_list_id) {
      try {
        await this.$router.push({ name: 'Chatroom', query: { data: this.$encrypt(chat_list_id) } });
      } catch (err) {
        console.error(err);
      }
    },

    connectToServer() {
      this.$socket.on("connect", () => {
        console.log("채팅방 리스트에 입장");
      });
    },

      // 날짜를 읽기 쉬운 형식으로 변환하는 메서드
      formatDate(dateString) {

        if (!dateString) {
      return ''; // 날짜가 없으면 빈 문자열 반환
    }
      const now = new Date();
      const date = new Date(dateString);
      const diff = now - date; // 시간 차이 (밀리초 단위)
      const seconds = Math.floor(diff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      const months = Math.floor(days / 30);
      const years = Math.floor(days / 365);

      if (seconds < 60) {
        return '방금';
      } else if (minutes < 60) {
        return `${minutes}분 전`;
      } else if (hours < 24) {
        return `${hours}시간 전`;
      } else if (days < 30) {
        return `${days}일 전`;
      } else if (months < 12) {
        return `${months}개월 전`;
      } else {
        return `${years}년 전`;
      }
    },
  },
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
            margin-bottom: 10px;
            word-break: break-all;
        }

        div.alarm {
            display: grid;
            align-content: center;
            margin-left: auto; /* 오른쪽 끝으로 고정 */
            /* display: none; */
            /* border: 1px solid red; */
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
        .aralm-circle{
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: #9d88b3;

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