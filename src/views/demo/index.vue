<template>
    <div class="home-container">
      {{data}}
      <div class="demo-box"></div>
        <pagoda-button plain type="primary" @click="handleSubmit">朴素按钮</pagoda-button>
        <pagoda-button plain type="info">朴素按钮</pagoda-button>
    </div>
</template>

<script>
import api from "@/services/demoLogic";

export default {
  data() {
    return {
      data: null
    }
  },
  methods: {
    handleSubmit() {
      api.getDemoList().then(result => {
        this.data = result;
      });
    }
  }
}
</script>

<style lang="scss" scoped>
    .home-container {
        width: 100%;
        height: 100%;

        .title {
            font-size: 30px;
        }

        .demo-box {
          width: rem(750);
          height: rem(200);
          border: 1px solid red;
        }
    }
</style>
