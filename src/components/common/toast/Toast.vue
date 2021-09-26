<template>
    <transition name="fade">
      <div class="menBan" v-if="isShow">
        <div class="toast" v-show="isShow">{{message}}</div>
      </div>
    </transition>
</template>

<script>
	export default {
		name: "Toast",
    data() {
			return {
				isShow: false,
        message: '我是弹窗'
      }
    }
	}
</script>

<style scoped>
  .toast {
    position: fixed;
    left: 50%;
    top: 50%;
    background-color: rgba(0,0,0,.8);
    padding: 10px;
    border-radius: 5px;
    transform: translate(-50%,-50%);
    color:#fff;
    z-index: 99;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  .menBan {
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 998;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
</style>
