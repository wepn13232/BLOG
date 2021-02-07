<template>
	<!--搜索内容-->
	<div class="SearchLists">
		<div class="list-group" v-if="match_files.length > 0">
			<a href="javascript:void(0)" class="list-group-item list-group-item-action"
			   v-for="(item,index) in match_files"
			   :key="index" @click="toEssay(item.fileName,item.filePath)">
				<span v-html="item.fileHighLight"></span>
			</a>
		</div>
		<div class="no_content" v-else>
			暂无内容~
		</div>
	</div>
</template>

<script>
	import commonFunc from "@/docs/config";

	export default {
		name: "SearchLists",
		data() {
			return {
				searchValue: "",
				match_files: [], //匹配的文件内容
			}
		},
		methods: {
			//根据输入的内容来获取新列表
			getEssayBySerach() {
				if (!this.searchValue) {
					alert("请输入内容！");
					return false;
				}
				this.match_files = [];
				const ALL_FILES = commonFunc.getFiles().keys();
				//获取匹配内容的文件
				for (let i of ALL_FILES) {
					if (i.lastIndexOf(this.searchValue) !== -1) {
						//拆分路径，只匹配最后一个具体的文件名
						let files_arr = i.split('/');
						if (files_arr[files_arr.length - 1].indexOf(this.searchValue) !== -1) {
							let full_fileName = files_arr[files_arr.length - 1];
							//切割文件名的.md后缀
							let fileName = files_arr[files_arr.length - 1].substring(0, full_fileName.length - 3);
							//对匹配文字进行高亮展示
							let fileHighLight = this.setHighLight(fileName, this.searchValue);
							let file_obj = {
								fileName: fileName,
								filePath: i,
								fileHighLight: fileHighLight
							}
							this.match_files.push(file_obj);
						}
					}
				}
			},
			//跳转至具体的文章
			toEssay(fileName, filePath) {
				this.$router.push({name: 'Essay', params: {fileName, filePath}})
			},
			//设置匹配文字高亮展示
			setHighLight(fileName, keyWord) {
				if (!fileName || fileName === '') return; //空搜索不进行高亮匹配
				let map_index = 0; //开始遍历的位置
				let font_length = keyWord.length;
				let fileName_length = fileName.length;
				let highLight_font = `<span style="color:#dd4b39">${keyWord}</span>`;
				let final_p = "";
				while (map_index <= fileName_length) {
					let start_index = fileName.indexOf(keyWord);
					//如果匹配到了
					if (start_index > -1) {
						//切割原有的两个文字，并添加高亮文字
						let p_1 = fileName.substring(0, start_index); //前段文字
						final_p += p_1 + highLight_font; //拼接文字样式
						map_index = start_index + font_length; //从切割文字后开始重新遍历
						fileName = fileName.substr(map_index, fileName_length); //重新截取剩余的片段
					} else {
						final_p += fileName; //拼接最后的后段文字
						break;
					}
				}
				return final_p;
			}
		},
		mounted() {
			this.searchValue = this.$route.query.searchValue;
			this.getEssayBySerach();
		},
		watch: {
			$route: {
				handler(to, from) {
					//只有存在搜索不同内容的时候才重新执行查找
					if (to.query.searchValue !== this.searchValue) {
						this.searchValue = to.query.searchValue;
						this.getEssayBySerach();
					}
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.SearchLists {
		padding: 3rem;
		
		.no_content {
			color: #4d4d4c;
			text-align: center;
		}
	}
</style>
