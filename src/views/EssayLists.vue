<template>
	<!--文章列表-->
	<div class="EssayLists accordion" id="accordionExample">
		<!--目录结构-->
		<div class="category_block" v-for="(cate,index) in cateLists" :key="index">
			<div class="cate_title" data-toggle="collapse" :href="`#collapse-${index}`" aria-expanded="false"
			     :aria-controls="`#collapse-${index}`" @click="getEssayLists(cate.name)">
				➡️　{{cate.name}}
			</div>
			<!--内容折叠块-->
			<div class="collapse multi-collapse" :id="`collapse-${index}`" data-parent="#accordionExample">
				<div class="cate_content">
					<!--具体的内容区域（文章或子目录）-->
					<div class="list-group">
						<a href="javascript:void(0)" class="list-group-item list-group-item-action">Cras justo odio</a>
						<a href="javascript:void(0)" class="list-group-item list-group-item-action">Cras justo odio</a>
						<a href="javascript:void(0)" class="list-group-item list-group-item-action">Cras justo odio</a>
						<a href="javascript:void(0)" class="list-group-item list-group-item-action">Cras justo odio</a>
					</div>
				</div>
			</div>
		</div>
		<!--文章组件-->
		<!--<div class="lists_block" v-for="(item,index) in essayLists" :key="index" @click="toEssay(item)">-->
		<!--	<div class="block_title">-->
		<!--		{{item}}-->
		<!--	</div>-->
		<!--</div>-->
	</div>
</template>

<script>
	import commonFunc from '@/docs/config';
	import category from "@/docs/category";

	export default {
		name: "EssayLists",
		data() {
			return {
				essayLists: [], //md文章列表
				cateLists: [], //目录列表
			}
		},
		methods: {
			//获取目录下文件
			getEssayLists(cateName) {
				// console.log(name)
				let files = commonFunc.getFiles(cateName);
				console.log(files)
				// const fileNameArr = [];
				// for (let i in files) {
				// 	//正则匹配获取文件名字
				// 	let fileName = files[i].match(/\.\/(\S*)\.md/);
				// 	fileNameArr.push(fileName[1]);
				// }
				// //多量数据时加快性能，减少vue源码的get set
				// this.essayLists = Object.freeze(fileNameArr);
			},
			//获取目录结构
			getCategory() {
				const cate = commonFunc.getCategory();
				this.cateLists = Object.freeze(cate);
			},
			toEssay(item) {
				this.$router.push({name: 'Essay', params: {item}})
			}
		},
		mounted() {
			this.getCategory()
		}
	}
</script>

<style scoped lang="scss">
	.EssayLists {
		padding: 3rem 1rem;
		
		.category_block {
			width: 90%;
			margin: 1rem auto;
			padding: 1rem;
			background-color: #fbfbfb;
			cursor: pointer;
			border-radius: 10px;
			transition: all ease 0.3s;
			-webkit-transition: all ease 0.3s;
			-o-transition: all ease 0.3s;
			-moz-transition: all ease 0.3s;
			
			.cate_title {
				font-size: 1rem;
				letter-spacing: 0.1rem;
				font-weight: 600;
			}
			
			.cate_content {
				padding-top: 1rem;
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
	}
</style>
