<template>
  <div class="container">
    <!-- 제목 -->
    <h1 class="title">탈퇴하기</h1>

    <!-- 첫 번째 설명 박스 -->
    <div class="card">
      <h2 class="card-title">처음부터 다시 가입해야 해요</h2>
      <p class="card-description">
        탈퇴 회원의 정보는 15일간 임시 보관 후 완벽히 삭제되어요. <br />
        탈퇴하시면 회원가입부터 다시 해야 해요.
      </p>
    </div>

    <!-- 두 번째 설명 박스 -->
    <div class="card">
      <h2 class="card-title">관리 중인 서비스들은 해지되지 않아요</h2>
      <p class="card-description">
        탈퇴해도 MEETME에서 관리 중인 구독 서비스와 생활 지출은 해지되지
        않아요. <br />
        서비스 해지를 원해 탈퇴하는 거라면 절대 탈퇴하시면 안 돼요.
      </p>
    </div>

    <!-- 세 번째 설명 박스 -->
    <div class="card">
      <h2 class="card-title">하나하나 다시 연동해야 해요</h2>
      <p class="card-description">
        탈퇴 후에는 연동된 결제 수단과 공인인증서 등 모든 정보가 삭제돼요.
        <br />
        카드, 은행, 간편결제 등 사용 중인 결제 수단을 처음부터 다시 연동해야
        해요.
      </p>
    </div>

    <!-- 버튼들 -->
    <div class="button-group">
      <button class="cancel-button" @click="clickToCancel()">취소</button>
      <button class="delete-button" @click="clickToDelete()">계정 삭제</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  methods: {
    clickToCancel() {
      this.$router.push({ name: "MyPage" });
    },
    clickToDelete() {
      // "정말로 취소하겠습니까?"라는 메세지와 확인 + 취소 버튼이 뜸
      const userConfirmed = confirm("정말로 탈퇴하겠습니까?");
      // 확인을 눌렀을 경우
      if (userConfirmed) {
        this.gotoDelete();
      }
      // 취소를 눌렀을 경우
      else {
        this.clickToCancel();
      }
    },
    gotoDelete() {
      console.log("계정 삭제를 진행합니다.");
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 54px auto;
  padding: 20px;
  text-align: left;
}

.title {
  font-size: 34px;
  font-weight: bold;
  margin-bottom: 50px;
  text-align: center;
}

.card {
  background-color: #f2f2f2;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 30px;
  border: none;
  box-shadow: 0 4px 20px rgba(157, 136, 179, 0.14);
}

.card-title {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 10px;
}

.card-description {
  color: #c1aed4;
  font-size: 14px;
  margin: 0px;
}

.button-group {
  display: flex;
  justify-content: space-around;
  margin-top: 60px;
  gap: 24px;
}

.button-group button {
  padding-top: 16px;
  padding-bottom: 16px;
  border: none;
  border-radius: 30px;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
  width: 100%;
}

.cancel-button {
  background-color: #e0e0e0;
  color: black;
}

.delete-button {
  background-color: #ff4c47;
  color: white;
}
</style>
