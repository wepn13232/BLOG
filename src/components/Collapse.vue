<template>
	<!--折叠组件-->
	<div class="category_block" @click="clickCollapse($event)" ref="block">
		<div class="cate_title" id="cate_title">
			➡️ {{categoryName}}
		</div>
		<!--slot内容区域-->
		<div class="slot" ref="block_content" v-if="showContent">
			<slot name="slot_content"></slot>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Collapse",
		props: ["categoryName"],
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
				let son_dom = e.currentTarget.getElementsByClassName('cate_title')[0];
				//判断是否点击了此元素
				if (e.currentTarget === e.target || son_dom === e.target) {
					this.showContent = !this.showContent;
					this.$nextTick(() => {
						let block_content = this.$refs.block_content;
						let _e_currTarget = e.currentTarget;
						setTimeout(() => {
							_e_currTarget.style.height = this.showContent ? block_content.clientHeight + this.initHeight + 'px' : this.initHeight + 'px';
						}, 0)
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
	.category_block {
		width: 95%;
		margin: 1rem auto;
		padding: 1rem;
		background-color: #fbfbfb;
		cursor: pointer;
		border-radius: 10px;
		overflow: hidden;
		transition: all ease 0.3s;
		-webkit-transition: all ease 0.3s;
		-o-transition: all ease 0.3s;
		-moz-transition: all ease 0.3s;
		
		.cate_title {
			font-size: 1rem;
			letter-spacing: 0.1rem;
			font-weight: 600;
		}
		
		.slot {
			cursor: initial;
		}
		
		&:hover {
			box-shadow: 0 1px 4px 0 rgba(18, 18, 18, 0.07);
		}
	}
	
	.lists_block {
		width: 80%;
		padding: 3rem;
		margin: 1rem auto;
		background-color: #fbfbfb;
		box-shadow: 0 2px 7px 0 rgba(3, 3, 3, 0.07);
		cursor: pointer;
	}
</style>
