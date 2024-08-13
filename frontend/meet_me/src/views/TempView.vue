<template>
    <div class="container0">
      <!-- 기존 코드 ... -->
      <div class="container_chat">
        <!-- 검색 결과가 있으면 searchList를 사용하고, 그렇지 않으면 roomList를 사용 -->
        <div v-for="(room, index) in (searchText ? searchList : roomList)" :key="index">
          <div class="chat_list" @click="clickeToChatRoom(room.chat_list_id)">
            <img class="profile_circle" :src="this.$imageFileFormat(room.user_image_path)">
            <div class="chat_container">
              <div class="chat_name">{{ room.user_nickname }}</div>
              <div class="chat_content">
                <div class="chat_contnet_chat">{{ room.latestMessage }}</div>
                <div class="chat_content_time">·{{ room.latestMessageTime }}</div>
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
        messages: [] // 채팅방 별 메시지 저장
      };
    },
    async created() {
      this.connectToServer();
      await this.getchatRoomList(); 
  
      // receiveMessage 리스너를 설정
      this.$socket.on("receiveMessage", (data) => {
        console.log("New message data:", data);
        this.handleNewMessage(data.message);
      });
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
  
      handleNewMessage(message) {
        // 메시지를 수신한 방을 찾고 메시지를 업데이트
        const room = this.roomList.find(r => r.chat_list_id === message.room);
        if (room) {
          room.latestMessage = message.text;
          room.latestMessageTime = new Date(message.chatDate).toLocaleDateString(); // 또는 원하는 포맷으로 변경
        }
      }
    }
  };
  </script>
  