<template>
  <n-message-provider>
    <div id="root">
      <router-view />
    </div>
  </n-message-provider>
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: auto;
  // background: #000428;  /* fallback for old browsers */
  // background: -webkit-linear-gradient(to right, #004e92, #000428);  /* Chrome 10-25, Safari 5.1-6 */
  // background: linear-gradient(to right, #004e92, #000428); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  background: #2C3E50;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to bottom, #2C3E50, #4CA1AF,);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to bottom, #2C3E50, #4CA1AF,); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  #root {
    width: 100%;
    height: 100%;
    margin: 0;
    border: 0;
    padding: 0;
  }
  .w {
    max-width: 1200px;
    margin: 0 auto;
  }
  li {
    list-style: none;
  }
  a{
    text-decoration: none;
    color: #2c3e50;
  }
}
</style>
