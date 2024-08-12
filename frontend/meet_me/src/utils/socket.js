// src/utils/socket.js
import { io } from "socket.io-client";

let socketInstance = null; // 소켓 인스턴스를 저장하는 변수

/**
 * 소켓을 초기화하고 싱글톤 인스턴스를 반환하는 함수
 */
export function initializeSocket() {
  if (!socketInstance) {
    // 아직 소켓 인스턴스가 없으면 새로 생성
    socketInstance = io(process.env.VUE_APP_SERVER_URL);

    // 만약 socket이 disconnect가 되면 현재 socketInstance를 null로 설정
    socketInstance.on("disconnect", () => {
      console.log("socket is disconnect");
      socketInstance = null;
    })
    console.log("Socket initialized");
  } else {
    console.log("Socket already initialized");
  }
  return socketInstance; // 항상 동일한 인스턴스를 반환
}

/**
 * 싱글톤 소켓 인스턴스를 반환하는 함수
 */
export function getSocket() {
  if (!socketInstance) {
    console.error("Socket has not been initialized. Call initializeSocket first.");
    return initializeSocket();
  }
  return socketInstance;
}
