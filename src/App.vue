<template>
    <div id="root">
        <router-view></router-view>
    </div>
</template>

<style lang="scss" scoped>
	#root { 
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
        overflow-y: scroll;
	}
</style>
