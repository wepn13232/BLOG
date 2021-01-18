<template>
	<div class="NavBar">
		<nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
			<a class="navbar-brand mb-0 h1" href="#">七元</a>
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
			        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>

			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<form class="form-inline my-2 my-lg-0 ml-auto">
					<input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
					<button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
				</form>
				<ul class="navbar-nav mr2R ml2R">
					<li class="nav-item active">
						<a class="nav-link" href="javascript:void(0)" @click="toPage(0)">主页 <span class="sr-only">(current)</span></a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="javascript:void(0)" @click="toPage(1)">文章</a>
					</li>
				</ul>
			</div>
		</nav>
	</div>
</template>

<script>
    export default {
        name: "NavBar",
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
            }
        },
    }
</script>

<style scoped lang="scss">
	@import "../assets/css/global";
</style>
