<template>
	<div class="NavBar">
		<nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
			<a class="navbar-brand mb-0 h1" href="javascript:void(0)" @click="toPage(0)">七元</a>
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
			        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"
			        ref="navbar-toggler">
				<span class="navbar-toggler-icon"></span>
			</button>
			
			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav mr2R ml2R ml-auto">
					<li :class="['nav-item',{'active': active === '0'}]">
						<a class="nav-link" href="javascript:void(0)" @click="toPage(0)">主页 <span class="sr-only">(current)</span></a>
					</li>
					<li :class="['nav-item',{'active': active === '1'}]">
						<a class="nav-link" href="javascript:void(0)" @click="toPage(1)">文章</a>
					</li>
					<li :class="['nav-item',{'active': active === '2'}]">
						<a class="nav-link" href="javascript:void(0)" @click="toPage(2)">关于网站</a>
					</li>
				</ul>
				<div class="flex">
					<input class="form-control mr-sm-2" type="search" placeholder="搜索" aria-label="Search"
					       v-model="searchValue">
					<button class="btn btn-outline-success my-2 my-sm-0" @click="search">搜索</button>
				</div>
			</div>
		</nav>
	</div>
</template>

<script>
	import commonFunc from "@/docs/config";

	export default {
		name: "NavBar",
		data() {
			return {
				active: "0",
				searchValue: "",
			}
		},
		methods: {
			toPage(val) {
				switch (val) {
					case 0:
						this.$router.push('/');
						break;
					case 1:
						this.$router.push('/EssayLists');
						break;
					case 2:
						this.toHow();
						break;
				}
				this.$refs['navbar-toggler'].click();
			},
			toHow() {
				//获取包含"七元"关键字开发文档
				const files = commonFunc.getFiles();
				let fileName;
				for (let filePath of files.keys()) {
					if (filePath.indexOf("七元") > -1) {
						this.$router.push({name: 'Essay', params: {fileName, filePath}})
						break;
					}
				}
			},
			//文章搜索（支持模糊搜索）
			search() {
				this.$router.push({path:'/SearchLists',query:{searchValue:this.searchValue}})
			}
		},
		watch: {
			//修改导航栏
			'$store.state.active': function (newVal, oldVal) {
				this.active = newVal;
			}

		}
	}
</script>

<style scoped lang="scss">
	@import "../assets/css/global";
	
	.NavBar {
		.navbar {
			box-shadow: 0px 0px 5px 0px rgba(3, 3, 3, 0.15);
			
			.btn {
				width: 5rem;
			}
			
			.flex {
				display: flex;
				align-items: center;
			}
		}
	}
</style>
