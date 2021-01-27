<template>
	<div class="EssayLists">
		<menu-lists :cateLists="cateLists" @getEssayLists="getEssayLists"></menu-lists>
	</div>

</template>

<script>
	import commonFunc from '@/docs/config';
	import category from "@/docs/category";
	import MenuLists from "@/components/MenuLists";
	import Collapse from "@/components/Collapse";

	export default {
		name: "EssayLists",
		components: {Collapse, MenuLists},
		data() {
			return {
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
								this.cateLists[j].filesLists.push(fileObj);
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
		},
		mounted() {
			this.getCategory()
		}
	}
</script>

<style scoped lang="scss">
	.EssayLists {
		padding: 1rem 3rem;
	}

</style>
