<template>
	<div class="Home">
		<div :class="['banner','RGBAnimation',`banner_color-${getBanner()}`]">
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
		<div class="home_content">
			<div class="content_title">这里有什么?</div>
			<img src="../assets/img/19-排版.svg" class="content_pic"/>
			<div class="content_intro">较为常见的前端类文章将不断在这里更新</div>
			<div class="content_intro intro--gray">
				你可以在这里查看各类前端技术文章，包含前端基础、JavaScript、Vue等框架内容
			</div>
			<button type="button" class="btn btn-info" @click="toEssayLists">看看有什么文章</button>
		</div>
		<div class="home_content content--white">
			<div class="content_title">这里有什么优势?</div>
			<img src="../assets/img/45-适配2.svg" class="content_pic"/>
			<div class="content_intro">你可以在任何一个端访问这个地方</div>
			<div class="content_intro intro--gray">
				在这已经做了自适应配置，任何用户以任何端都可以随时随地查看
			</div>
			<!--<button type="button" class="btn btn-info">看看有什么文章</button>-->
		</div>
		<div class="home_content">
			<div class="content_title">这个博客是如何做到的?</div>
			<img src="../assets/img/05-编码.svg" class="content_pic"/>
			<div class="content_intro">我准备了一篇文章，来告诉您是如何打造这个地方的</div>
			<div class="content_intro intro--gray">
				您可以阅读我的文档，了解这个地方是如何构建起来的，同时又是怎么运作的，并且我将提供源码作为参考
			</div>
			<button type="button" class="btn btn-info" @click="toHow">如何打造这个博客</button>
		</div>
	</div>
</template>

<script>
	import NavBar from "@/components/NavBar";
	import commonFunc from "@/docs/config";

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
				// this.listener = window.addEventListener('resize', function () {})
			},
			//跳转至文章列表
			toEssayLists() {
				this.$router.push('/EssayLists')
			},
			//跳转至网站文档说明
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
			}
		},
		mounted() {
			this.$store.commit('setActive', "0")
		},
		created() {
			this.getWindowWidth();
		},
	}
</script>

<style scoped lang="scss">
	.Home {
		width: 100%;
		height: 100%;
		
		
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
		
		.home_content {
			width: 100%;
			background-color: #f2f2f2;
			text-align: center;
			font-weight: 600;
			font-size: 2.5rem;
			padding: 5rem 1rem;
			font-family: "SF Pro SC", "SF Pro Display", "SF Pro Icons", "PingFang SC", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
			line-height: 1.3;
			
			.content_pic {
				margin-top: 2rem;
				width: 7rem;
				height: 7rem;
			}
			
			.content_intro {
				font-size: 1.2rem;
				font-weight: 350;
				letter-spacing: 0.11rem;
				margin-top: 1rem;
			}
			
			.btn {
				margin-top: 1rem;
			}
			
			.intro--gray {
				font-size: 0.8rem;
				font-weight: 350;
				letter-spacing: 0.11rem;
				color: #86868b;
			}
		}
		
		.content--white {
			background-color: #f9f9f9;
		}
	}
	
	/*渐变色色板*/
	.banner_color-1 {
		background: #8e9eab; /* fallback for old browsers */
		background: -webkit-linear-gradient(to right, #eef2f3, #8e9eab); /* Chrome 10-25, Safari 5.1-6 */
		background: linear-gradient(to right, #eef2f3, #8e9eab); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
		background-size: 200% 200%;
		animation: RGB 7s ease infinite;
	}
	
	.banner_color-2 {
		background: #1A2980; /* fallback for old browsers */
		background: -webkit-linear-gradient(to right, #26D0CE, #1A2980); /* Chrome 10-25, Safari 5.1-6 */
		background: linear-gradient(to right, #26D0CE, #1A2980); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
		background-size: 200% 200%;
		animation: RGB 7s ease infinite;
	}
	
	.banner_color-3 {
		background: #403B4A; /* fallback for old browsers */
		background: -webkit-linear-gradient(to right, #E7E9BB, #403B4A); /* Chrome 10-25, Safari 5.1-6 */
		background: linear-gradient(to right, #E7E9BB, #403B4A); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
		background-size: 200% 200%;
		animation: RGB 7s ease infinite;
	}
	
	.banner_color-4 {
		background: #232526; /* fallback for old browsers */
		background: -webkit-linear-gradient(to right, #414345, #232526); /* Chrome 10-25, Safari 5.1-6 */
		background: linear-gradient(to right, #414345, #232526); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
		background-size: 200% 200%;
		animation: RGB 7s ease infinite;
	}
	
	@keyframes RGB {
		0% {
			background-position: 0 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0 50%;
		}
	}
	
	@import "../assets/css/global";
</style>

