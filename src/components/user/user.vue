<template>
	<div v-if="!isLogin">
		<div class="unlogin-card">
			<div class="unlogin-avatar"></div>
			<div class="unlogin-meta">
				<div class="unlogin-name">还没登录哦</div>
				<div class="unlogin-msg">
					登录后可以方便购物
				</div>
			</div>
		</div>
		<div class="unlogin-btn"
		     @click="login">
			点击登录
		</div>
	</div>
	<div v-else>
		<div class="user-card">
			<img class="user-avatar"
			     :src="userInfo.avatar">
			<div class="user-name"> {{userInfo.name}} </div>
		</div>
		<div class="user-opr">
			<ul>
				<li class="user-opr-item">
					收货地址
					<img src="../../commom/images/grey-arrow.png">
				</li>
				<li class="user-opr-item">
					联系客服
					<img src="../../commom/images/grey-arrow.png">
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	methods: {
		//把商品信息存到vuex中
		login() {
			this.$store.dispatch("setLogin");
		}
	},
	computed: {
		userInfo: {
			get() {
				return this.$store.state.userInfo;
			}
		},
		isLogin() {
			return this.$store.getters.isLogin;
		}
	}
};
</script>

<style lang="scss" scoped>
@import "../../commom/sass/base.scss";
/* 未登录 */
.unlogin-card {
	display: flex;
	align-items: center;
	margin: px2rem(50) px2rem(18) 0;
	height: px2rem(170);
	background: $cardbg;
	@include bdrs;
	@include base-boxshadow;
	.unlogin-avatar {
		margin: 0 px2rem(28) 0 px2rem(46);
		width: px2rem(85);
		height: px2rem(85);
		background: $themeColor;
		border-radius: 50%;
	}
	.unlogin-meta {
		height: px2rem(85);
		.unlogin-name {
			font-size: px2rem(28);
			line-height: px2rem(52);
			color: #000;
		}
		.unlogin-msg {
			font-size: px2rem(20);
			margin: px2rem(4) 0 px2rem(10);
			color: #8b8b8b;
		}
	}
}
.unlogin-btn {
	margin: px2rem(28) auto;
	width: px2rem(216);
	height: px2rem(68);
	background: $themeColor;
	color: #000;
	font-size: px2rem(26);
	line-height: px2rem(68);
	text-align: center;
}
/* 登录 */
.user-card {
	display: flex;
	align-items: center;
	margin: px2rem(50) px2rem(18) 0;
	height: px2rem(170);
	background: $cardbg;
	border-radius: $base-radius $base-radius 0 0;
	@include base-boxshadow;
	.user-avatar {
		margin: 0 px2rem(22) 0 px2rem(40);
		width: px2rem(90);
		height: px2rem(88);
	}
	.user-name {
		font-size: px2rem(28);
		color: #000;
	}
}
.user-opr {
	margin: px2rem(8) px2rem(18) 0;
	background: $cardbg;
	@include base-boxshadow;
	.user-opr-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: px2rem(0) px2rem(22) 0 px2rem(38);
		height: px2rem(110);
		color: #4a4a52;
		font-size: px2rem(24);
		> img {
			width: px2rem(8);
			height: px2rem(14);
		}
		+ .user-opr-item {
			border-top: 2px solid #eaeaea;
		}
	}
}
</style>
