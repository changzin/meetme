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
        <!--불러온 채팅-->
        <div v-for="(messageList, index) in messageList" :key="index">
          <!-- 상대방의 메시지일 경우 -->
          <div v-if="myuserId !== messageList.user_id">
            <div class="middle_left">
              <img class="profile_circle" :src="this.$imageFileFormat(this.otherUserImage)" @click="clickeToprofile(this.otherUserId)" >
              <div class="middle_left_content">
                <div class="left_name">{{ messageList.user_nickname }}</div>
                <div class="middle_left_content2">
                  <div class="box_content_left">
                    {{ messageList.chat_content }}
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
                <div class="check_icon"></div>
                <div class="time">{{ $timeFormatChat(messageList.chat_create_date)}}</div>
                <div class="box_content_right"> {{ messageList.chat_content }}</div>
              </div>
            </div>
          </div>
        </div>

        <!--실시간 채팅-->
        <div v-for="(chatData, index) in chatData" :key="index">
          <!-- 상대방의 메시지일 경우 -->
          <div v-if="myuserId !== chatData.userId">
            <div class="middle_left">
              <img class="profile_circle" :src="this.$imageFileFormat(this.otherUserImage)">
              <div class="middle_left_content">
                <div class="left_name">{{ this.otherUserName }}</div>
                <div class="middle_left_content2">
                  <div class="box_content_left">
                    {{ chatData.text }}
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
                <div class="check_icon"></div>
                <div class="time">{{ $timeFormatChat(chatData.chatDate)}}</div>
                <div class="box_content_right">{{ chatData.text }}</div>
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
      imagePath: ""
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


    async sendChat() {
      try {
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
          image: ""
        };
        console.log("지금챗", this.newChat);

        const response = await this.$api(`/chat/saveChat`, requestBody, "post");
        this.chatUserId = response.userId;
        this.newChat = "";
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
        word-break: break-all;
        /* border: 1px solid red; */
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
  
</style>

