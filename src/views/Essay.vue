<template>
	<!--文章-->
	<div class="Essay">
		<div class="markdown-body" v-highlight>
			<markdown></markdown>
		</div>
	</div>
</template>

<script>
	import markdown from '../docs/JavaScript.md'
	import 'github-markdown-css/github-markdown.css'

	export default {
		name: "Essay",
		components: {markdown},
		data() {
			return {}
		},
		methods: {
		
		},
		mounted() {
			this.$store.commit('setActive',"1")
		}
	}
</script>

<style scoped lang="scss">
	.Essay {
		
		.markdown_area {
			width: 100%;
			height: 800px;
		}
		
		.markdown-body {
			box-sizing: border-box;
			min-width: 200px;
			max-width: 980px;
			margin: 0 auto;
			padding: 45px;
		}
		
		@media (max-width: 767px) {
			.markdown-body {
				padding: 15px;
			}
		}
	}
</style>
