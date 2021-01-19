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
	import markdown from '@/docs/Vue项目性能加载优化.md';
	import 'github-markdown-css/github-markdown.css'

	export default {
		name: "Essay",
		components: {markdown},
		data() {
			return {
				itemName: '', //文件名称
				path: null

			}
		},
		methods: {
			//动态获取md文件
			getMarkDownFile() {
				this.itemName = this.$route.params.item;
				this.$nextTick(() => {
					this.path = commonFunc.getComponent(this.itemName)
				})
			}
		},
		mounted() {
			this.$store.commit('setActive', "1");
			this.getMarkDownFile()
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
