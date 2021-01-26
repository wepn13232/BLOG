<template>
	<!--折叠组件-->
	<div class="Collapse">
		<div class="block" @click="clickCollapse($event)" ref="block">
			我是可点击区域
			<!--slot内容区域-->
			<div class="slot" slot="block_content" ref="block_content" v-if="showContent">
				<div class="inside_content">
					我是里面的内容
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Collapse",
		data() {
			return {
				initHeight: 0, //块初始高度
				showContent: false,
				father_dom: null,
			}
		},
		methods: {
			//获取原始高度，设置原始高度值
			getInitHeight() {
				let block = this.$refs.block;
				this.initHeight = block.clientHeight;
				block.style.height = this.initHeight + 'px';
				this.father_dom = block;
			},
			//点击折叠区域
			clickCollapse(e) {
				//判断是否点击了此元素
				if (e.currentTarget === e.target) {
					this.showContent = !this.showContent;
					this.$nextTick(() => {
						let block_content = this.$refs.block_content;
						e.currentTarget.style.height = this.showContent ? block_content.clientHeight + this.initHeight + 'px' : this.initHeight + 'px';
					})
				}
			},
		},
		mounted() {
			this.getInitHeight();
		},
	}
</script>

<style scoped lang="scss">
	.Collapse {
		.block {
			width: 100%;
			background-color: #4d4d4c;
			padding: 1rem;
			cursor: pointer;
			transition: all 0.3s ease-in-out;
			-webkit-transition: all 0.3s ease-in-out;
			-moz-transition: all 0.3s ease-in-out;
			-o-transition: all 0.3s ease-in-out;
			overflow: hidden;
			
			.slot {
				padding: 2rem;
			}
			
			.inside_content {
				width: 100%;
				height: 5rem;
				background-color: #26D0CE;
				cursor: initial;
				transition: all 0.3s ease-in-out;
				-webkit-transition: all 0.3s ease-in-out;
				-moz-transition: all 0.3s ease-in-out;
				-o-transition: all 0.3s ease-in-out;
			}
		}
	}
</style>
