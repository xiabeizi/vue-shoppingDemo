<template>
	<div>
		<div class="hot-card">
			<div class="hot-name">
				<img class="hot-line"
				     src="../../commom/images/line-red.png">
				<span class="hot-text"> 钱包 </span>
				<img class="hot-line"
				     src="../../commom/images/line-red.png">
			</div>
			<img class="discount"
			     src="../../commom/images/discount.png">
			<img class="hot-good"
			     src="../../commom/images/product1.jpg">
		</div>
		<div class="list-title">
			<img class="list-title-line"
			     src="../../commom/images/line-black.png">
			<span class="list-title-text"> 春季推荐 </span>
			<img class="list-title-line"
			     src="../../commom/images/line-black.png">

		</div>
		<div class="good-list">
			<router-link class="good-card"
			             tag="div"
			             :to="'/good-detail/' + good.id"
			             v-if="goodsData.length"
			             v-for="good in goodsData"
			             :key="good.id">
				<div class="good-img">
					<img :src="good.imgsrc">
				</div>
				<div class="good-name">{{good.name}}</div>
				<div class="good-meta">
					<div class="money">￥</div>
					<div class="price">{{good.price}}</div>
					<div class="add-to-torlley"
					     @click.stop="addToTrolley(good)">+</div>
				</div>
			</router-link>

		</div>

		<toast :showPopup="showPopup"
		       @toggleShowPopup="toggleShowPopup"
		       :msg="msg"
		       :onEnsure="onEnsure"></toast>

	</div>
</template>

<script>
import toast from "../../components/toast/toast";

export default {
	components: { toast },
	data() {
		return {
			//全部商品信息
			goodsData: [],
			showPopup: false,
			msg: ""
		};
	},
	computed: {
		isLogin() {
			return this.$store.getters.isLogin;
		}
	},
	methods: {
		toggleShowPopup(boolean) {
			this.showPopup = boolean;
		},
		//把商品信息存到购物车中
		addToTrolley(good) {
			//判断是否登录
			if (!this.isLogin) {
				this.msg = "还没有登录哦亲, <br>是否跳转到登录页面？";
				this.toggleShowPopup(true);
				this.onEnsure = function() {
					this.$router.push({ path: "/user" });
				};
			} else {
				this.$store.dispatch("addToTrolley", { good });
			}
		},
		onEnsure() {}
	},
	created() {
		//初始化 请求商品数据
		this.$api.getGoods.then(Response => {
			this.goodsData = Response.data;
		});
	}
};
</script>

<style lang="scss" scoped>
@import "../../commom/sass/base.scss";
.hot-card {
	position: relative;
	margin: px2rem(36) px2rem(42) 0;
	height: px2rem(282);
	background: $cardbg;
	@include bdrs;
	@include base-boxshadow;
	.hot-name {
		position: absolute;
		top: px2rem(36);
		left: px2rem(34);
		display: flex;
		align-items: center;
		height: px2rem(32);
		.hot-line {
			width: px2rem(22);
			height: px2rem(32);
		}
		.hot-text {
			margin: 0 px2rem(15);
			color: #34373e;
			font-size: px2rem(22);
		}
	}
	.discount {
		position: absolute;
		bottom: 0;
		left: px2rem(35);
		width: px2rem(224);
		height: px2rem(164);
	}
	.hot-good {
		position: absolute;
		top: px2rem(68);
		right: px2rem(40);
		width: px2rem(200);
		height: px2rem(206);
	}
}
.list-title {
	margin-top: px2rem(78);
	height: px2rem(30);
	display: flex;
	justify-content: center;
	align-items: center;
	.list-title-line {
		width: px2rem(18);
		height: px2rem(30);
	}
	.list-title-text {
		margin: 0 px2rem(16);
		color: #000;
		font-size: px2rem(24);
	}
}
.good-list {
	display: flex;
	flex-wrap: wrap;
	margin: px2rem(36) px2rem(42) 0;
}
.good-card {
	margin-bottom: px2rem(22);
	width: px2rem(266);
	height: px2rem(366);
	background: $cardbg;
	@include bdrs;
	@include base-boxshadow;
	overflow: hidden;
	&:nth-child(odd) {
		margin-right: px2rem(22);
	}
	.good-img {
		width: px2rem(266);
		height: px2rem(266);
		> img {
			width: 100%;
			height: 100%;
		}
	}
	.good-name {
		height: px2rem(50);
		font-size: px2rem(24);
		text-indent: px2rem(16);
		line-height: px2rem(50);
		color: #51545c;
	}
	.good-meta {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: px2rem(32);
		padding: 0 px2rem(15);
		font-size: px2rem(24);
		.price {
			flex: 1;
			text-indent: px2rem(5);
			color: #000;
		}
		.money,
		.add-to-torlley {
			width: px2rem(32);
			height: px2rem(32);
			border-radius: 50%;
			background: $icon-bhColor;
			color: $icon-fontColor;
			text-align: center;
			line-height: px2rem(32);
		}
	}
}
</style>
