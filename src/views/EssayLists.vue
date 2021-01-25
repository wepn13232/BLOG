<template>
	<!--文章列表-->
	<div class="EssayLists accordion" id="accordionExample">
		<!--目录结构-->
		<div class="category_block" v-for="(cate,index) in cateLists" :key="index" data-toggle="collapse"
		     :href="`#collapse-${index}`" aria-expanded="false"
		     :aria-controls="`#collapse-${index}`" @click="getEssayLists(cate.name,index)">
			<div class="cate_title">
				➡️　{{cate.name}}
			</div>
			<!--内容折叠块-->
			<div class="collapse multi-collapse" :id="`collapse-${index}`" data-parent="#accordionExample">
				<div class="cate_content">
					<!--具体的内容区域（文章或子目录）-->
					<div class="list-group">
						<a href="javascript:void(0)" class="list-group-item list-group-item-action"
						   v-for="(lists,l_index) in cate.filesLists" :key="l_index"
						   @click="toEssay(lists.fileName,lists.filePath)">{{lists.fileName}}</a>
					</div>
				</div>
			</div>
		</div>
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
			getEssayLists(cateName, index) {
				//如果已经获取过目录下文件，就不再请求
				if (this.cateLists[index].filesLists.length > 0) return false;
				console.log('请求目录下文件')
				let files = commonFunc.getFiles();
				/**
				 * 遍历files 匹配点击的目录(filesArr)名称，将具体的文件添加进相对应的目录里面
				 * */
				let filesArr = files.keys();
				for (let i in filesArr) {
					//进行目录切割
					let lastIndex = filesArr[i].lastIndexOf('/');
					let startIndex = filesArr[i].indexOf('/');
					let path = filesArr[i].substring(startIndex + 1, lastIndex);
					//如果点击的目录名称和文件的路径目录对应,存放到对应的目录下
					if (path === cateName) {
						for (let j in this.cateLists) {
							if (this.cateLists[j].name === cateName) {
								//获取文件名字
								let fileName = filesArr[i].substring(lastIndex + 1, filesArr[i].length - 3);
								let fileObj = {
									fileName: fileName,
									filePath: filesArr[i]
								}
								this.cateLists[j].filesLists.push(fileObj)
							}
						}
					}
				}
			},
			//获取目录结构
			getCategory() {
				const cate = commonFunc.getCategory();
				//每一个目录下添加文件列表数组
				this.addFilesLists(cate);
				this.cateLists = cate;
			},
			//针对每个目录都添加一个文件数组
			addFilesLists(category) {
				for (let i of category) {
					i.filesLists = [];
					//如果还存在子目录的情况下
					if (i.item.length > 0) {
						this.addFilesLists(i.item)
					}
				}
			},
			toEssay(fileName,filePath) {
				this.$router.push({name: 'Essay', params: {fileName,filePath}})
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
