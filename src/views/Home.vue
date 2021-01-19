<template>
	<div class="Home">
		<div :class="['banner',`banner_color-${getBanner()}`]">
			<div class="logo">
				<img src="../assets/img/home_welcome.jpeg" class="logo_pic"/>
			</div>
			<div class="title">
				<h1>七元</h1>
				<div class="title_detail">一个简约和高效的记事BLOG</div>
			</div>
			<!--静态展示，如果页面属于手机页面，则用滚动展示-->
			<div class="intro" v-if="isOverPad">
				<div class="intro_block">
					<img src="../assets/img/clip.svg" class="intro_pic"/>
					<h4>轻便</h4>
					<div class="intro_content">轻便不繁重，减少多余</div>
				</div>
				<div class="line"></div>
				<div class="intro_block">
					<img src="../assets/img/eye.svg" class="intro_pic"/>
					<h4>简约</h4>
					<div class="intro_content">简约不繁杂，方便寻找</div>
				</div>
				<div class="line"></div>
				<div class="intro_block">
					<img src="../assets/img/pen.svg" class="intro_pic"/>
					<h4>高效</h4>
					<div class="intro_content">高效记录，即开即看</div>
				</div>
			</div>
			<div class="slideOver" v-else>
				<div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">
					<div class="carousel-inner">
						<div class="carousel-item active" data-interval="2000">
							<div class="intro_block">
								<img src="../assets/img/clip.svg" class="intro_pic"/>
								<h4>轻便</h4>
								<div class="intro_content">轻便不繁重，减少多余</div>
							</div>
						</div>
						<div class="carousel-item" data-interval="2000">
							<div class="intro_block">
								<img src="../assets/img/eye.svg" class="intro_pic"/>
								<h4>简约</h4>
								<div class="intro_content">简约不繁杂，方便寻找</div>
							</div>
						</div>
						<div class="carousel-item" data-interval="2000">
							<div class="intro_block">
								<img src="../assets/img/pen.svg" class="intro_pic"/>
								<h4>高效</h4>
								<div class="intro_content">高效记录，即开即看</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import NavBar from "@/components/NavBar";
	import commonJs from '../docs/config'

	export default {
		name: "Home",
		components: {NavBar},
		data() {
			return {
				bannerSet: ["1", "2", "3", "4"], //多少个banner背景
				listener: '', //监听器
				isOverPad: true, //分辨率是否大于Pad（区分手机 pad 和 pc）
			}
		},
		methods: {
			getBanner() {
				return this.bannerSet[Math.floor((Math.random() * this.bannerSet.length))];
			},
			//获取窗口宽度大小
			getWindowWidth() {
				let win_width = window.screen.width;
				this.isOverPad = win_width > 760;
				// //监听
				// this.listener = window.addEventListener('resize', function () {
				//
				// })
			},
		},
		mounted() {
			this.$store.commit('setActive',"0")
		},
		created() {
			this.getWindowWidth();
			commonJs.getFiles();
		},
	}
</script>

<style scoped lang="scss">
	.banner {
		width: 100%;
		height: 37rem;
		position: relative;
		text-align: center;
		
		.logo {
			width: 100%;
			padding-top: 3rem;
			
			.logo_pic {
				width: 11rem;
				height: 11rem;
				border-radius: 7px;
			}
		}
		
		.title {
			font-size: 3rem;
			color: #ffffff;
			margin-top: 2.5rem;
			
			.title_detail {
				font-size: 1rem;
			}
		}
		
		.intro, .slideOver {
			display: flex;
			justify-content: space-around;
			margin-top: 2.5rem;
			height: 100%;
			
			.line {
				height: 10rem;
				width: 1px;
				background: white;
			}
			
			.intro_block {
				color: rgba(255, 255, 255, 0.86);
				
				.intro_pic {
					width: 5rem;
					height: 5rem;
					opacity: 0.9;
					margin-bottom: 1rem;
				}
			}
		}
	}
	
	.banner_color-1 {
		background: #8e9eab; /* fallback for old browsers */
		background: -webkit-linear-gradient(to right, #eef2f3, #8e9eab); /* Chrome 10-25, Safari 5.1-6 */
		background: linear-gradient(to right, #eef2f3, #8e9eab); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
	}
	
	.banner_color-2 {
		background: #085078; /* fallback for old browsers */
		background: -webkit-linear-gradient(to right, #85D8CE, #085078); /* Chrome 10-25, Safari 5.1-6 */
		background: linear-gradient(to right, #85D8CE, #085078); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
	}
	
	.banner_color-3 {
		background: #134E5E; /* fallback for old browsers */
		background: -webkit-linear-gradient(to right, #71B280, #134E5E); /* Chrome 10-25, Safari 5.1-6 */
		background: linear-gradient(to right, #71B280, #134E5E); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
	}
	
	.banner_color-4 {
		background: #232526; /* fallback for old browsers */
		background: -webkit-linear-gradient(to right, #414345, #232526); /* Chrome 10-25, Safari 5.1-6 */
		background: linear-gradient(to right, #414345, #232526); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
	}
</style>
