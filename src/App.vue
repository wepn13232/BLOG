<template>
	<div id="app">
		<div class="web_NavBar">
			<nav-bar></nav-bar>
		</div>
		<div class="content">
			<router-view/>
		</div>
		<foot-bar></foot-bar>
	</div>
</template>

<script>
	import NavBar from "@/components/NavBar";
	import FootBar from "@/components/FootBar";

	export default {
		components: {FootBar, NavBar},
		data() {
			return {}
		},
		methods: {},
	}
</script>

<style lang="scss">
	.content {
		margin-top: 56px;
		background-color: #f9f9f9;
	}
</style>
