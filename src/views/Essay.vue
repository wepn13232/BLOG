<template>
	<!--文章-->
	<div class="Essay">
		<div class="markdown-body" v-highlight>
			<component :is="path"></component>
		</div>
	</div>
</template>

<script>
	import commonFunc from "@/docs/config";
	import 'github-markdown-css/github-markdown.css'

	export default {
		name: "Essay",
		components: {},
		data() {
			return {
				path: null
			}
		},
		methods: {
			//动态获取md文件
			getMarkDownFile() {
				this.path = commonFunc.getComponent(this.$route.params.filePath)
			}
		},
		mounted() {
			this.$store.commit('setActive', "1");
			this.getMarkDownFile()
		}
	}
</script>

<style scoped lang="scss">
	@import "../assets/css/global";
	
	.Essay {
		min-height: calc(100vh - 120px);
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
		
		.bg_color_hbuilder {
			background-color: #fffae7 !important;
		}
	}
</style>
