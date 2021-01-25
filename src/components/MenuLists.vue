<template>
	<!--文件目录菜单-->
	<div class="Menu">
		<!--目录结构-->
		<div class="category_block" v-for="(cate,index) in cateLists" :key="index"
		     data-toggle="collapse"
		     :href="`#collapse-${cate.name}`" aria-expanded="false"
		     :aria-controls="`#collapse-${cate.name}`" @click="getEssayLists(cate.name,index)">
			<div class="cate_title">
				➡️　{{cate.name}}
			</div>
			<!--内容折叠块-->
			<div class="collapse multi-collapse" :id="`collapse-${cate.name}`">
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
		</div>
	</div>
</template>

<script>
	export default {
		name: "MenuLists",
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
		/*padding: 3rem 1rem;*/
		
		.category_block {
			width: 95%;
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
