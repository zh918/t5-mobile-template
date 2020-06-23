<template>
  <div class="default-container">
    <div class="view-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabIndex: 0
    }
  },
  created() { 
    
  },
  methods: {
    initData() {
      
    }
  }
}
</script>

<style lang="scss">
.default-container {
  position:fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto; 

  .view-container {
    position:fixed;
    top: 0;
    bottom: rem(98);
    left: 0;
    right: 0;
    margin: auto;
    padding: 0 0 0 0;
    overflow-y: auto;
    z-index: 1000;
  }

  .view-tabs {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;;
    padding: 0;
    width: 100%;
    height: rem(98);
    border-top: 1px solid #e0e0e0;

  }
}
</style>
