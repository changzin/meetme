<template>
  <div class="container0">
    <MeetHeader class="header_font" />
    <ChatModal />
    <div class="container_top">
      <div class="box_name">
        <div class="container_top_content">
          <div class="back_icon" @click="this.$router.push({ path: '/chatlist/' })">
            <img src="../../../public/icon/chat/back.svg" />
          </div>
          <div class="top_name">{{ this.otherUserName }}</div>
          <div class="out_icon" @click="chatModal()">
            <img src="../../../public/icon/chat/out.svg" />
          </div>
        </div>
      </div>
    </div>
    <div class="container_white">
      <div class="container_middle" ref="containerMiddle">
        <!-- 불러온 채팅 -->
        <div v-for="(messageList, index) in messageList" :key="index">
          <!-- 상대방의 메시지일 경우 -->
          <div v-if="myuserId !== messageList.user_id">
            <div class="middle_left">
              <img class="profile_circle" :src="this.$imageFileFormat(this.otherUserImage)" @click="clickeToprofile(this.otherUserId)" >
              <div class="middle_left_content">
                <div class="left_name">{{ messageList.user_nickname }}</div>
                <div class="middle_left_content2">
                  <!-- 텍스트 메시지와 이미지 모두 표시 -->
                  <div v-if="messageList.chat_content" class="box_content_left">
                    {{ messageList.chat_content }}
                  </div>
                  <div v-if="messageList.image" class="box_content_left">
                    <img :src="messageList.image" class="chat_image" />
                  </div>
                  <div class="time">{{ $timeFormatChat(messageList.chat_create_date)}}</div>
                  <div class="check_icon">
                    <img src="../../../public/icon/chat/check.svg" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 사용자의 메시지일 경우 -->
          <div v-else>
            <div class="middle_right">
              <div class="middle_right_content">
                <!-- 텍스트 메시지와 이미지 모두 표시 -->
                <div v-if="messageList.chat_content" class="box_content_right"> 
                  {{ messageList.chat_content }}
                </div>
                <div v-if="messageList.image" class="box_content_right">
                  <img :src="messageList.image" class="chat_image" />
                </div>
                <div class="time">{{ $timeFormatChat(messageList.chat_create_date)}}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 실시간 채팅 -->
        <div v-for="(chatData, index) in chatData" :key="index">
          <!-- 상대방의 메시지일 경우 -->
          <div v-if="myuserId !== chatData.userId">
            <div class="middle_left">
              <img class="profile_circle" :src="this.$imageFileFormat(this.otherUserImage)">
              <div class="middle_left_content">
                <div class="left_name">{{ this.otherUserName }}</div>
                <div class="middle_left_content2">
                  <!-- 텍스트 메시지와 이미지 모두 표시 -->
                  <div v-if="chatData.text" class="box_content_left">
                    {{ chatData.text }}
                  </div>
                  <div v-if="chatData.image" class="box_content_left">
                    <img :src="chatData.image" class="chat_image" />
                  </div>
                  <div class="time">{{ $timeFormatChat(chatData.chatDate)}}</div>
                  <div class="check_icon">
                    <img src="../../../public/icon/chat/check.svg" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 사용자의 메시지일 경우 -->
          <div v-else>
            <div class="middle_right">
              <div class="middle_right_content">
                <!-- 텍스트 메시지와 이미지 모두 표시 -->
                <div v-if="chatData.text" class="box_content_right">
                  {{ chatData.text }}
                </div>
                <div v-if="chatData.image" class="box_content_right">
                  <img :src="chatData.image" class="chat_image" />
                </div>
                <div class="time">{{ $timeFormatChat(chatData.chatDate)}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <form id="chat-form" @submit.prevent="sendChat">
      <div class="container_bottom">
        <div class="container_bottom_box">
          <div class="gallery_icon" @click="triggerFileInput">
            <img src="../../../public/icon/chat/gallery.svg" />
            <input 
              type="file" 
              ref="fileInput" 
              accept="image/*" 
              @change="handleFileChange" 
              style="display: none;" 
            />
          </div>
          <input
            class="box_chat"
            v-model="newChat"
            placeholder="메시지를 입력하세요"
          />
          <div class="send_icon" @click="sendChat">
            <img src="../../../public/icon/chat/send.svg" />
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newChat: "", // 보낸 메세지
      chatData: [],
      userSocketId: "", // 현재 사용자의 socketId
      userData: {},
      myuserId: "",
      chatUserId: "",
      chatDate: "",
      messageList: [],
      otherUserName: "",
      otherUserImage: "",
      otherUserId: "",
      chatListId: "", // 현재 채팅방 ID를 저장할 변수
      imagePath: "" // 선택된 이미지 경로
    };
  },

  async created() {
    this.connectToServer();

    // chatListId를 복호화하여 설정
    let chat_list_id = this.$route.query.data;
    chat_list_id = this.$decrypt(chat_list_id);
    this.chatListId = chat_list_id;

    // 특정 채팅방에 join
    this.$socket.emit("join", { room: this.chatListId }); // 추가된 부분

    this.getUserId();
    this.getMessageList();
    this.getOtherUserInfo();

    // socketId 확인
    this.$socket.on("connect", () => {
      this.userSocketId = this.$socket.id;
    });

    // receiveMessage 리스너를 설정
    this.$socket.on("receiveMessage", (data) => {
      console.log("New message data:", data);
      this.chatData.push(data.message);
      this.scrollToBottom();
    });
  },

  beforeUnmount() {
    this.$socket.off("receiveMessage");
    this.$socket.off("connect");
  },

  methods: {
    chatModal() {
      this.$store.commit("setModalOn");
    },

    async getUserId() {
      try {
        const requestBody = {
          access_token: this.$getAccessToken()
        };

        const response = await this.$api(`/chat/finduser`, requestBody, "post");
        console.log("유저아이디", response);
        this.myuserId = response.userId;
      } catch (error) {
        console.error("로그인 상태가 아닙니다");
      }
    },

    async getOtherUserInfo() {
      try {
        const requestBody = {
          access_token: this.$getAccessToken(),
          chatListId: this.chatListId
        };

        // 상대 유저 정보 가져오기
        const response = await this.$api(`/chat/getotheruserinfo`, requestBody, "post");
        this.otherUserInfo = response.otherUserInfo[0];
        this.otherUserName = this.otherUserInfo.user_nickname;
        this.otherUserImage = this.otherUserInfo.user_image_path;
        this.otherUserId = this.otherUserInfo.opponent_user_id;

        console.log(this.otherUserInfo);
      } catch (error) {
        alert("잘못된 접근입니다");
        console.error(error);
      }
    },

    async getMessageList() {
      try {
        const requestBody = {
          chatListId: this.chatListId, // chatListId 설정된 후 사용
          access_token: this.$getAccessToken()
        };

        const response = await this.$api(`/chat/getmessage`, requestBody, "post");
        this.messageList = response.messageList;
        console.log("메세지리스트", this.messageList);
        this.scrollToBottom();
      } catch (error) {
        console.error("Error in sendChat:", error);
      }
    },

    async clickeToprofile(user_id){
      try {
        await this.$router.push({ name: 'ProfileDetail', query: { data: this.$encrypt(user_id) } });
      } catch (err) {
        console.error(err);
      }
    },

    triggerFileInput() {
      this.$refs.fileInput.click(); // file input을 강제로 클릭하여 파일 선택 창을 엽니다.
    },

    async handleFileChange(event) {
      const file = event.target.files[0];
      if (!file) return;

      try {
        // 이미지 파일을 서버에 업로드하고 경로를 받습니다.
        const formData = new FormData();
        formData.append("file", file);

        const response = await this.$api(`/chat/uploadImage`, formData, "post", {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        this.imagePath = response.imagePath; // 서버에서 반환된 이미지 경로를 저장합니다.
        this.sendChat(); // 이미지 전송
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    },

    async sendChat() {
      try {
        // 먼저 getUserId 메소드를 호출하여 userId를 가져옵니다.
        await this.getUserId();

        const now = new Date();
        const chatDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

        // message 객체에 userId와 chatListId를 포함시킵니다.
        const message = {
          text: this.newChat,
          image: this.imagePath, // 이미지 경로를 message 객체에 포함 - 추가된 부분
          userId: this.myuserId,
          chatDate,
          room: this.chatListId // 채팅방 ID를 포함 - 수정된 부분
        };

        // 소켓을 통해 message 객체를 특정 방으로 전송합니다.
        this.$socket.emit("sendMessage", { message, room: this.chatListId }); // 수정된 부분

        this.scrollToBottom();

        const requestBody = {
          roomId: this.chatListId, // 채팅방 ID 사용
          access_token: this.$getAccessToken(),
          chatDate: chatDate,
          text: this.newChat,
          chatView: "T",
          image: this.imagePath // 이미지 경로를 포함 - 추가된 부분
        };

        const response = await this.$api(`/chat/saveChat`, requestBody, "post");
        this.chatUserId = response.userId;
        this.newChat = "";
        this.imagePath = ""; // 전송 후 이미지 경로 초기화 - 추가된 부분
      } catch (error) {
        console.error("Error in sendChat:", error);
      }
    },

    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.containerMiddle;
        container.scrollTop = container.scrollHeight;
      });
    },

    connectToServer() {
      this.$socket.on("connect", () => {
        console.log("Connected to server");
      });
    }
  }
};
</script>
