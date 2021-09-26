import {debounce} from "./index";
import BackTop from "components/content/backTop/BackTop";

export const listenImg = {
  data() {
    return {
      imgItemlisten: null
    }
  },
  mounted() {
    const refresh = debounce(this.$refs.wrapper.refresh,500);
    this.imgItemlisten = () => {
      refresh()
    }
    //监听事件总线，图片加载完成
    this.$bus.$on('imgItemLoad',this.imgItemlisten)
  },
}

export const backTop = {
  components: {
    BackTop
  },
  data() {
    return {
      isShow: false
    }
  },
  methods: {
    //回到顶部事件
    backTop() {
      this.$refs.wrapper.scrollTo(0,0,500)
    }
  }
}
