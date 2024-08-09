<template>
  <div>
    <input v-model="chat" type="text">
    <button @click="clickBtn">제출</button>


    </div>
</template>

<script>
export default {
  data() {
    return {
      chat: "", // 메시지 변수를 정의
      message: "",
      chatData: [],
      
    };
  },
  created() {
    this.connectToServer();

    // receiveMessage 리스너를 설정
    this.$socket.on("receiveMessage", (data) => {
      console.log("New message data:", data);
      // data.message에서 실제 메시지 문자열을 추출하여 업데이트
      this.message = data.message;
      // chatData.push(data);
      // {"유저닉네임 2", "유저닉네임2이 보낸 메세지"}


      // {"유저닉네임 1", "유저닉네임1이 보낸 메세지"}


      // {"유저닉네임 1", "유저닉네임1이 보낸 메세지"},       {"유저닉네임 2", "유저닉네임2이 보낸 메세지"}
    });
  },
  beforeUnmount() {
    this.$socket.off("receiveMessage");
    this.$socket.off("connect");
    this.$socket.off("disconnect");
  },
  watch: {
    chat(newChat) {
      this.message = newChat;
    }
  },
  methods: {
    clickBtn() {
      const message = this.chat;
      this.$socket.emit("sendMessage", { message });  
    },
    connectToServer() {
      this.$socket.on("connect", () => {
        console.log("Connected to server");
      });

      this.$socket.on("disconnect", () => {
        console.log("Disconnected from server");
      });
    },
  },
};
</script>
<style scoped></style>
