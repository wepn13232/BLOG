<template>
	<!--文件目录菜单-->
	<div class="Menu">
		<!--目录结构-->
		<div v-for="(cate,index) in cateLists" :key="index" @click="getEssayLists(cate.name,index)">
			<Collapse :categoryName="cate.name">
				<div slot="slot_content">
					<!--内容折叠块-->
					<div class="cate_content">
						<!--具体的内容区域（文章或子目录）-->
						<div class="list-group">
							<a href="javascript:void(0)" class="list-group-item list-group-item-action"
							   v-for="(lists,l_index) in cate.filesLists" :key="l_index"
							   @click="toEssay(lists.fileName,lists.filePath)">{{lists.fileName}}</a>
						</div>
					</div>
					<!--&lt;!&ndash;如果还存在目录的情况下&ndash;&gt;-->
					<!--<div v-if="cate.item.length > 0">-->
					<!--	<menu-lists :cateLists="cate.item"></menu-lists>-->
					<!--</div>-->
				</div>
			</Collapse>
		</div>
	</div>
</template>

<script>
	import Collapse from "@/components/Collapse";

	export default {
		name: "MenuLists",
		components: {Collapse},
		props: {
			//文件目录列表
			cateLists: {
				type: Array,
			}
		},
		methods: {
			//跳转至具体的文章
			toEssay(fileName, filePath) {
				this.$router.push({name: 'Essay', params: {fileName, filePath}})
			},
			//获取目录下的内容
			getEssayLists(fileName, index) {
				this.$emit('getEssayLists', fileName, index)
			}
		},
	}
</script>

<style scoped lang="scss">
	.Menu {
		.cate_content {
			padding-top: 1rem;
		}
	}

</style>
