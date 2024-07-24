<template>
  <nav>
    <router-link to="/">Home</router-link> |

    <router-link to="/about">About</router-link> |
    <router-link to="/mypage">MyPage</router-link>

    <router-link to="/tempview">TempView</router-link> |
    <router-link to="/about">About</router-link>

  </nav>
  <router-view />
</template>

<style>

@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;600;700&display=swap');
* {
  font-family: Noto Sans KR, sans-serif, Avenir, Helvetica, Arial;
  box-sizing: border-box;
  margin: 0px;
  padding: 0px;
}

#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
