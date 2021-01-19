<template>
	<div class="NavBar">
		<nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
			<a class="navbar-brand mb-0 h1" href="#">七元</a>
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
			        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
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
				<form class="form-inline my-2 my-lg-0">
					<input class="form-control mr-sm-2" type="search" placeholder="搜索" aria-label="Search">
					<button class="btn btn-outline-success my-2 my-sm-0" type="submit">搜索</button>
				</form>
			</div>
		</nav>
	</div>
</template>

<script>
	export default {
		name: "NavBar",
		data() {
			return {
				active: "0"
			}
		},
		methods: {
			toPage(val) {
				switch (val) {
					case 0:
						this.$router.push('/');
						break;
					case 1:
						this.$router.push('/Essay');
						break;
				}
			},
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
</style>
