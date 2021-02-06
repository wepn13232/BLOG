<template>
	<!--搜索内容-->
	<div class="SearchLists">
		<div class="list-group">
			<a href="javascript:void(0)" class="list-group-item list-group-item-action"
			   v-for="(item,index) in match_files"
			   :key="index">
				<span v-html="item.fileName"></span>
			</a>
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
				this.match_files = [];
				const ALL_FILES = commonFunc.getFiles().keys();
				//获取匹配内容的文件
				for (let i of ALL_FILES) {
					if (i.lastIndexOf(this.searchValue) !== -1) {
						let files_arr = i.split('/');
						if (files_arr[files_arr.length - 1].indexOf(this.searchValue) !== -1) {
							let file_obj = {
								fileName: files_arr[files_arr.length - 1],
								filePath: i,
							}
							this.match_files.push(file_obj);
						}
					}
				}
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
	}
</style>
