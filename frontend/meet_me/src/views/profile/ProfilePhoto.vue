<template>
    <div>
      <MeetHeader />
      <div class="safety_zone">
        <div class="heade_div">사진 등록하기</div>
        <div class="sub_div">프로필 사진 1장을 추가 해주세요(필수)</div>
        <div class="photo-grid">
          <div
            v-for="(photo, index) in photos"
            :key="index"
            class="photo-box"
            @click="openFileDialog(index)"
          >
            <img v-if="photo" :src="photo" class="uploaded-photo" />
          </div>
        </div>
  
        <div class="instructions">
          <div class="example-photo">
            <img src="icon/picture/OImage.png" alt="example" />
            <div class="selection-circle">
              <img src="/icon/picture/OIcon.svg" alt="O" class="x-icon" />
            </div>
          </div>
          <div class="example-photo">
            <img src="icon/picture/XImage.png" alt="example" />
            <div class="selection-circle">
              <img src="/icon/picture/XIcon.svg" alt="X" class="x-icon" />
            </div>
          </div>
        </div>
        <div class="description_div">
          여럿이 찍은 사진이 아닌 독사진을 올려주세요
        </div>
        <button class="submitButton" @click="clickToPost()">이상형을 만나러 가보실까요?</button>
        <input
          type="file"
          ref="fileInput"
          accept="image/*"
          @change="onFileChange"
          style="display: none"
        />
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    data() {
      return {
        photos: [null, null, null, null, null, null], // 사진을 저장할 배열
        currentIndex: null, // 현재 선택한 인덱스
      };
    },
    methods: {
        openFileDialog(index) {
            this.currentIndex = index;
            this.$refs.fileInput.click();
        },
        onFileChange(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = (e) => {
                    this.photos[this.currentIndex] = e.target.result;
                };
            }       
        },
        dataURLtoBlob(dataURL) {
            const parts = dataURL.split(",");
            const mime = parts[0].match(/:(.*?);/)[1];
            const bstr = atob(parts[1]);
            let n = bstr.length;
            const u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new Blob([u8arr], { type: mime });
        },
        // Blob처리 해서 요청을 보낸다.
        async clickToPost() {
            let photoList = [];

            for(let i of this.photos){
                if (i){
                    photoList.push(this.dataURLtoBlob(i));
                }
            }

            if (photoList.length == 0){
              alert("하나 이상의 사진을 등록해야 합니다.");
              return;
            }

            await this.patchRequestForMulter("/user/enterphoto", photoList, {
                access_token: this.$getAccessToken(),
                fileType: "profile",
            });
        },  
        // axios로 요청을 보내고 받음.
        /**
         * 
         * @param endpoint : url이 들어감.
         * @param payload : formdata가 들어감
         * @param importantHeaders : Content-type: multipart/form-data
         */
        async patchRequest(endpoint, payload = null, importantHeaders = {}) {
            try {
                const config = { headers: importantHeaders };
                const response = await axios.post(endpoint, payload, config);
                console.log(response);
                if (response.status >= 400) {
                  this.$router.push({
                      name: "ErrorPage",
                      query: { message: response.data.message },
                  });
                }
                else{
                  this.$router.push({
                      name: "MainPage",
                  });
                }
                return response.data;
            } catch (error) {
                alert("예기치 못한 에러가 발생하였습니다.")
            }
        },
        // 요청을 보내기 위한 HTTP request 디자인 + HTTP 요청을 보내는 함수 발동
        async patchRequestForMulter(url, images, additionalInfo) {
            const formData = this.makeFormDataForMulter(images, additionalInfo);
            await this.patchRequest(url, formData, {
                "Content-Type": "multipart/form-data",
            });
        },
        makeFormDataForMulter(images, additionalInfo) {
            const formData = new FormData();

            if (Array.isArray(images)) {
                images.forEach((image, index) => {
                formData.append("image", image, `image${index}.png`);
                });
            } else {
                formData.append("image", images, "image.png");
                formData.append("imageIndex", 0);
            }

            if (additionalInfo) {
                Object.keys(additionalInfo).forEach((key) => {
                formData.append(key, additionalInfo[key]);
                });
            }
            return formData;
        },
    },
  };
  </script>
  
  <style scoped>
  .safety_zone {
    min-width: 600px;
    width: 600px;
    margin: 0 auto;
    padding: 0 25px;
    padding-top: 54px;
    padding-bottom: 46px;
    background-color: white;
  }
  
  .heade_div {
    font-size: 24px;
    font-weight: 700;
  }
  
  .sub_div {
    font-size: 14px;
    font-weight: 500;
  
    margin-top: 50px;
    text-align: left;
  }
  
  .photo-upload-container {
    max-width: 500px;
    margin: 0 auto;
    text-align: center;
  }
  
  .photo-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 35px;
    grid-row-gap: 23px;
    margin: 20px 0;
    margin-top: 7px;
  }
  
  .photo-box {
    width: 100%;
    height: 150px;
    background-color: #e0e0e0;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    overflow: hidden;
  }
  
  .uploaded-photo {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .instructions {
    display: flex;
    /* margin-bottom: 5px; */
    justify-content: center;
    gap: 20px;
  }
  
  .example-photo {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }
  
  .example-photo img {
    border-radius: 10px;
  }
  
  .selection-circle {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 0;
    transform: translateY(50%);
  }
  
  .description_div {
    font-size: 12px;
    margin-bottom: 40px;
    margin-top: 20px;
    color: #484848;
  }
  
  .submitButton {
    background-image: var(--gradient);
    border: none;
    border-radius: 5px;
    color: white;
    padding: 18px 0px;
    font-size: 22px;
    cursor: pointer;
    width: 100%;
  }
  </style>
  