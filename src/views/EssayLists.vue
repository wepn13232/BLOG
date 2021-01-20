<template>
	<!--文章列表-->
	<div class="EssayLists">
		<div class="lists_block" v-for="(item,index) in essayLists" :key="index" @click="toEssay(item)">
			<div class="block_title">
				{{item}}
			</div>
		</div>
	</div>
</template>

<script>
	import configJS from '../docs/config'

	export default {
		name: "EssayLists",
		data() {
			return {
				essayLists: [], //md文章列表
			}
		},
		methods: {
			//获取文档目录下文件
			getLists() {
				let files = configJS.getFiles();
				const fileNameArr = [];
				for (let i in files) {
					//正则匹配获取文件名字
					let fileName = files[i].match(/\.\/(\S*)\.md/);
					fileNameArr.push(fileName[1]);
				}
				//多量数据时加快性能，减少vue源码的get set
				this.essayLists = Object.freeze(fileNameArr);
			},
			toEssay(item) {
				this.$router.push({name: 'Essay', params: {item}})
			}
		},
		mounted() {
			this.getLists()
		}
	}
</script>

<style scoped lang="scss">
	.EssayLists {
		padding: 3rem 1rem;
		
		.lists_block {
			width: 80%;
			padding: 3rem;
			margin: 1rem auto;
			background-color: #fbfbfb;
			box-shadow: 0 2px 7px 0 rgba(3, 3, 3, 0.07);
			cursor: pointer;
		}
	}
</style>
