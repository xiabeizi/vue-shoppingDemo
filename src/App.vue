<template>
	<div id="app">

		<router-view></router-view>
		<nav class="tabBar"
		     v-show="tabBarShow">
			<router-link to="/home">
				<span class="bg home"></span>
				<span>首页</span>
			</router-link>
			<router-link to="/order">
				<span class="bg order"></span>
				<span>订单</span>
			</router-link>
			<router-link to="/trolley">
				<span class="badge"
				      v-show="trolleyNum > 0"
				      :class="{'badgeAdd':badgeAdd}">{{trolleyNum}}</span>
				<span class="bg trolley"></span>
				<span>购物车</span>
			</router-link>
			<router-link to="/user">
				<span class="bg user"></span>
				<span>个人中心</span>
			</router-link>
		</nav>
		<img class="app-bg"
		     src="./commom/images/bg.png">
	</div>
</template>

<script>
export default {
	name: "app",
	data() {
		return {
			badgeAdd: false
		};
	},
	computed: {
		tabBarShow() {
			return this.$store.state.tabBarShow;
		},
		trolleyNum: {
			get() {
				this.badgeAdd = true;
				setTimeout(() => {
					this.badgeAdd = false;
				}, 300);
				return this.$store.getters.trolleyNum;
			}
		}
	},
	methods: {
		cbadgeAdd() {
			this.badgeAdd = !this.badgeAdd;
		}
	}
};
</script>

<style lang="scss">
@import "commom/sass/base.scss";

body {
	background: $appbg;
}
/* 滚动显示阴影 */
.shadowscroll {
	background: linear-gradient(white 30%, transparent),
		radial-gradient(at 50% 0, rgba(0, 0, 0, 0.2), transparent 70%);
	background-repeat: no-repeat;
	background-size: 100% 50px, 100% 15px;
	background-attachment: local, scroll;
}
.app-bg {
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: px2rem(140);
	z-index: -1;
}
.badgeAdd {
	transition: 0.3s;
	transform: scale(1.5);
}
</style>

<style lang="scss" scoped>
@import "commom/sass/base.scss";

#app {
	margin-bottom: $tabBar-height;
}

.tabBar {
	position: fixed;
	bottom: 0;
	display: flex;
	width: 100%;
	height: $tabBar-height;
	background: $tabBar-bgColor;
	border-top: 2px solid $tabBar-borderColor;
	> a {
		@mixin bg($bg) {
			background-image: url("commom/images/#{$bg}.png");
		}

		position: relative;
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: px2rem(20);
		color: $tabBar-fontColor;
		.bg {
			width: px2rem(52);
			height: px2rem(52);
			background-size: 100% 100%;
			background-repeat: no-repeat;
		}
		.home {
			@include bg(home);
		}
		.order {
			@include bg(order);
		}
		.trolley {
			@include bg(trolley);
		}
		.user {
			@include bg(user);
		}
		.badge {
			position: absolute;
			top: 0;
			right: px2rem(16);
			width: px2rem(32);
			height: px2rem(32);
			border-radius: 50%;
			background: $themeColor;
			color: $icon-fontColor;
			text-align: center;
			line-height: px2rem(32);
			@include base-boxshadow;
		}
	}
	.router-link-active {
		@mixin bg-sel($bg) {
			background-image: url("commom/images/#{$bg}-sel.png");
		}

		.home {
			@include bg-sel(home);
		}
		.order {
			@include bg-sel(order);
		}
		.trolley {
			@include bg-sel(trolley);
		}
		.user {
			@include bg-sel(user);
		}
	}
}
</style>
