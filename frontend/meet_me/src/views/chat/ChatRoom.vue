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
                  <div class="box_content_left">
                    <img v-if="messageList.chat_image_path" :src="$imageFileFormat(messageList.chat_image_path)" class="chat-image"/>
                    {{ messageList.chat_content }}         
                  </div>
                  <div class="time">{{ $timeFormatChat(messageList.chat_create_date)}}</div>
                </div>
              </div>
            </div>
          </div>
          <!-- 사용자의 메시지일 경우 -->
          <div v-else>
            <div class="middle_right">
              <div class="middle_right_content">
                <div class="check_icon">
                    <img src="../../../public/icon/chat/check.svg" />
                  </div>
                <div class="time">{{ $timeFormatChat(messageList.chat_create_date)}}</div>
                <div class="box_content_right">
                  <img v-if="messageList.chat_image_path" :src="$imageFileFormat(messageList.chat_image_path)" class="chat-image"/>
                  {{ messageList.chat_content }}
                </div>
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
                  <div class="box_content_left"> 
                    <img v-if="chatData.image" :src="`${chatData.image.split(',')[0]},${chatData.image.split(',')[1]}`" class="chat-image"/>       
                    {{ chatData.text }}  
                  </div>
                  <div class="time">{{ $timeFormatChat(chatData.chatDate)}}</div>
                </div>
              </div>
            </div>
          </div>
          <!-- 사용자의 메시지일 경우 -->
          <div v-else>
            <div class="middle_right">
              <div class="middle_right_content">
                <div class="check_icon">
                    <img src="../../../public/icon/chat/check.svg" />
                  </div>
                <div class="time">{{ $timeFormatChat(chatData.chatDate)}}</div>
                <div class="box_content_right">
                  <img v-if="chatData.image" :src="`${chatData.image.split(',')[0]},${chatData.image.split(',')[1]}`" class="chat-image"/>       
                  {{ chatData.text }}  
                </div>
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
      <textarea
        class="box_chat"
        v-model="newChat"
        placeholder="메세지를 입력하세요"
        @keydown.enter.prevent="sendChat"
      >      
    </textarea>
      <div class="send_icon" @click="sendChat">
        <img src="../../../public/icon/chat/send.svg" />
      </div>
    </div>
  </div>
</form>
    <!-- 이미지 모달 -->
    <div
      v-if="imagePath" 
      class="modal-overlay"
      @click="handleOverlayClick"
    >
      <div class="modal-popup" ref="modalPopup" @click.stop>
        <div class="modal-title">선택된 사진</div>
        <div class="modal-description">
          <img v-if="imagePath" :src="imagePath" class="chat-image"/>       
        </div>
        <div class="modal-divider"></div>
        <div class="modal-select-div">
          <div class="modal-select-left" style="cursor: pointer;" @click="no_click">취소</div>
          <div class="modal-select-right" style="cursor: pointer;" @click="sendChat">전송</div>
        </div>
      </div>
    </div>
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
      imagePath: "",  // Base64 인코딩된 이미지 데이터
      filePath: "",
      isModalVisible: true, // 모달
      placeholder: "메세지를 입력하세요"

    };
  },

  async created() {
    this.connectToServer();
    

    // chatListId를 복호화하여 설정
    let chat_list_id = this.$route.query.data;
    chat_list_id = this.$decrypt(chat_list_id);
    this.chatListId = chat_list_id;

    // 특정 채팅방에 join
    this.$socket.emit("join", { room: this.chatListId });

    await this.getUserId();
    await this.getMessageList();
    await this.getOtherUserInfo();


    // receiveMessage 리스너를 설정
    this.$socket.on("receiveMessage", (data) => {
      this.chatData.push(data.message);
      this.filePath = data.message.filePath || ""; // filePath가 없으면 빈 문자열로 설정
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

        const response = await this.$api('/chat/finduser', requestBody, "post");
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
        const response = await this.$api('/chat/getotheruserinfo', requestBody, "post");
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
          chatListId: this.chatListId,
          access_token: this.$getAccessToken()
        };

        const response = await this.$api('/chat/getmessage', requestBody, "post");
        this.messageList = response.messageList;
        console.log("메세지리스트", this.messageList);

        this.scrollToBottom();
      } catch (error) {
        console.error("Error in getMessageList:", error);
      }
    },

    async clickeToprofile(user_id) {
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
      if (file) {
      this.imagePath = await this.$base64(file);
      console.log(this.imagePath);
      this.isModalVisible = true;

      // 파일 선택 후 입력 필드 초기화
      this.$refs.fileInput.value = ""; // 파일 입력 초기화
    }
    },

    async sendChat() {
      try {

        if(!this.newChat && !this.imagePath){
        alert("메세지를 입력 해 주세요")


        } else{       
        // 먼저 getUserId 메소드를 호출하여 userId를 가져옵니다.
        await this.getUserId();

        const now = new Date();
        const chatDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

        // message 객체에 userId와 chatListId를 포함시킵니다.
        const message = {
          text: this.newChat,
          image: this.imagePath,
          userId: this.myuserId,
          chatDate,
          room: this.chatListId,
          filePath: this.filePath || ""  // filePath가 없으면 빈 문자열로 설정
        };

        // 새 Promise를 생성하여 receiveMessage 이벤트를 기다리게 합니다.
        await new Promise((resolve) => {
          // receiveMessage 이벤트 리스너를 설정합니다.
          this.$socket.once("receiveMessage", (data) => {
            // 데이터가 수신되면 filePath를 업데이트합니다.
            if (data.message.filePath) {
            this.filePath = data.message.filePath.replace(/\\/g, '/'); // '\\'를 '/'로 변환
            }
            resolve();
          });

          // 소켓을 통해 message 객체를 특정 방으로 전송합니다.
          this.$socket.emit("sendMessage", { message, room: this.chatListId });
        });

        console.log("파일패스경로", this.filePath);

        this.scrollToBottom();

        const requestBody = {
          roomId: this.chatListId,
          access_token: this.$getAccessToken(),
          chatDate: chatDate,
          text: this.newChat, 
          chatView: "T",
          filePath: this.filePath 
        };

        const response = await this.$api('/chat/saveChat', requestBody, "post");
        this.chatUserId = response.userId;

        // 상태 리셋
        this.newChat = "";
        this.imagePath = ""; // 이미지 경로 초기화
        this.filePath = ""; // filePath 초기화

        // 미리보기 이미지 삭제
        this.$refs.fileInput.value = ""; // 파일 입력 초기화
      }
      } catch (error) {
        console.error("Error in sendChat:", error);
      }
      
    },

    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.containerMiddle;
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      });
    },

    connectToServer() {
      this.$socket.on("connect", () => {
        console.log("채팅룸에 입장");
      });
    },

   // 모달
   no_click() {
      this.imagePath = ""; // 수정된 부분: 이미지 경로 초기화
      this.isModalVisible = false; // 모달을 숨김
    },
    ok_click() {
      this.imagePath = ""; // 수정된 부분: 이미지 경로 초기화
      this.isModalVisible = false; // 모달을 숨김
    },
    handleOverlayClick(event) {
      if (!this.$refs.modalPopup.contains(event.target)) {
        this.imagePath = ""; // 수정된 부분: 이미지 경로 초기화
        this.isModalVisible = false; // 모달을 숨김
      }
    },
  }
};
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

    textarea{
      resize: none;
      padding-top: 15px; /* padding 값은 텍스트를 중앙에 배치하기 위해 조정 필요 */

    }

    textarea::placeholder{
        font-family: 'Noto Sans KR', sans-serif;
    }
    textarea::-webkit-scrollbar {
        display: none;
    }   
    .header_font{
      font-size: 16px;
    }
    .top_name{
        font-size: 16px;
        font-weight: bold;
        color: white;
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

    /* 상대방채팅 */
     div.middle_left{
        display: grid;
        grid-template-columns: 80px auto;
        margin-top: 40px;
        /* border: 1px solid red; */
     }
      .profile_circle{
      width: 70px;
      height: 70px;
      border-radius: 50px;
      background-color: #f5f5f5;
      cursor: pointer;
      }
      div.middle_left_content{
        /* border: 1px solid blue; */
        max-width: 405px;
        display: flex;
        flex-direction: column;

     }
     div.left_name{
      margin-top: 5px;
        text-align: left;
        font-weight: bold;
        /* border: 1px solid red; */
     }
     div.middle_left_content2{
        /* border: 1px solid red; */
        display: flex;
        gap: 5px;
        align-items: flex-end;
        margin-top: 5px;
        margin-bottom: 10px;
        word-break: break-all;
        /* border: 1px solid red; */
     }
     .box_content_left{
        width: auto;
        max-width: 280px;
        background-color: #f5f5f5;
        display: flex;
        flex-direction: column;
        padding: 10px;
        box-sizing: border-box;
        border-top-right-radius: 5px;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;     
        text-align: left; 
     }
     .time{
       color: #888888;
       font-size: 12px;
      
    }
    .check_icon{
        width: 14px;
        height: 14px;
        margin-bottom: 5px;
        
        /* background-color: aqua; */
        /* border: 1px solid violet */
     }

     /* 나의 채팅 */
     div.middle_right{
        display: flex;
        justify-content: flex-end;
        margin-top: 30px;
        /* border: 1px solid red; */
     }
     div.middle_right_content{
        /* border: 1px solid orange; */
        display: flex;
        gap: 5px;
        align-items: flex-end;
        margin-top: 10px;
        margin-bottom: 10px;
        word-break: break-all;
     }


     div.middle_left_hidden{
        display: grid;
        grid-template-columns: 80px auto;
        /* border: 1px solid red; */
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

     .box_content_right{
        width: auto;
        max-width: 280px;
        background-color: #f5f5f5;
        display: flex;
        flex-direction: column;
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
          width: 65px;
          height: 65px;
          border-radius: 100px;
          margin: 10px;
          justify-content: start;
          object-fit: cover;
        }
      .profile_circle_hidden{
      width: 70px;
      height: 70px;
      border-radius: 50px;
      background-color: #f5f5f5;
      visibility: hidden;
      }
      .chat-image{
        max-width: 100%; /* 부모 요소의 너비에 맞게 이미지 크기 조절 */
        max-height: 200px; /* 이미지의 최대 높이 설정 (필요에 따라 조정) */
        object-fit: contain; /* 이미지의 비율을 유지하면서 박스에 맞게 조절 */

      }

      /* 모달 */
      .modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  /* backdrop-filter: blur(5px); */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999; /* 배경을 덮도록 z-index 설정 */
}

.modal-popup {
  width: 400px;
  height: 400px;
  background-color: rgba(255, 255, 255, 0.6);
  box-shadow: 0 0px 32px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(60px);
  z-index: 1000;
  display: grid;
  grid-template-rows: auto auto auto;
  border-radius: 15px;

  padding: 20px 0px;
  padding-bottom: 0px;
  /* visibility: collapse; */
  flex-direction: column;
  /* border: 1px solid red; */
}

.modal-title {
  font-size: 17px;
  font-weight: 500;
  color: #000;
  /* border: 1px solid blue; */
}

.modal-description {
  font-size: 13px;
  color: #000;
  padding: 0px 16px;
  /* border: 1px solid violet; */
  display: grid;
  justify-content: center;
  align-content: center;
}

.modal-divider {
  padding: 15px 0px;
  padding-bottom: 0px;
  border-bottom: 1px solid #898989;
  /* border: 1px solid red; */
}

.modal-select-div {
  display: flex;
  height: 100%;
  align-items: center;
  /* border: 1px solid blue; */
}

.modal-select-left {
  flex: 1;
  color: #0e72ed;
  font-size: 17px;
  border-right: 1px solid #898989;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  /* border: 1px solid orange; */
}

.modal-select-right {
  flex: 1;
  color: #e30909;
  font-size: 17px;
  font-weight: 500;
  /* border: 1px solid orange; */
}
  
</style>

