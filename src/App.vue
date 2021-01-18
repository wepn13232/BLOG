<template>
	<div id="app">
		<div class="web_NavBar">
			<nav-bar></nav-bar>
		</div>
		<div class="content">
			<router-view/>
		</div>
	</div>
</template>

<script>
	import NavBar from "@/components/NavBar";

	export default {
		components: {NavBar}
	}
</script>

<style lang="scss">
	.content {
		margin-top: 56px;
	}
</style>
