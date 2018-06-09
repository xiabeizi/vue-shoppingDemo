<template>
	<div v-if="!orderData.length">
		<div class="no-order">
			<img class="no-order-img"
			     src="../../commom/images/order.png">
			<span class="no-order-msg">暂时还没有订单</span>
		</div>
	</div>
	<div v-else>
		<div class="order-list"
		     v-for="item in orderData"
		     :key=item.id>
			<div class="order-status">
				<img class="status-line"
				     src="../../commom/images/line-black.png">
				<span>已完成</span>
			</div>
			<div class="order-item"
			     v-for="item in item.order">
				<img class="order-product"
				     :src="item.imgsrc">
				<div class="product-detail">
					<div class="product-name"> {{item.name}} </div>
					<div class="product-price">￥ {{item.price}} </div>
					<div class="product-num">X {{item.num}} </div>

					<router-link tag="div"
					             class="to-comment"
					             :to="'/comment/' + item.id">
						评价
					</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			orderData: []
		};
	},
	methods: {},
	computed: {
		order() {
			return this.$store.state.order;
		}
	},
	//理论上应该在用户登录，得到用户id之后获取，没有完整的后台，只能先这样
	created() {
		this.$api.getOrder.then(Response => {
			this.orderData = Response.data;
		});
	},
	actived() {
		this.$api.getOrder.then(Response => {
			this.orderData = Response.data;
		});
	}
};
</script>

<style lang="scss" scoped>
@import "../../commom/sass/base.scss";
.no-order {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: px2rem(36) px2rem(20) 0;
	height: px2rem(368);
	background: $cardbg;
	@include bdrs;
	@include base-boxshadow;
	.no-order-img {
		margin-top: -1 * px2rem(20);
		margin-bottom: px2rem(20);
		width: px2rem(80);
		height: px2rem(80);
		opacity: 0.4;
	}
	.no-order-msg {
		font-size: px2rem(24);
		color: #a2a2a9;
	}
}

.order-list {
	padding: px2rem(15) px2rem(22) 0;
	.order-status {
		display: flex;
		align-items: center;
		height: px2rem(48);
		font-size: px2rem(20);
		color: #6a6b71;
		.status-line {
			margin-right: px2rem(8);
			width: px2rem(20);
			height: px2rem(26);
		}
	}
	.order-item {
		margin: px2rem(20);
		height: px2rem(172);
		background: $cardbg;
		@include bdrs;
		@include base-boxshadow;
		overflow: hidden;
		.order-product {
			float: left;
			width: px2rem(172);
			height: px2rem(172);
		}
		.product-detail {
			position: relative;
			margin-left: px2rem(172);
			padding: px2rem(13) px2rem(18) 0 0;
			.product-name {
				height: px2rem(46);
				line-height: px2rem(46);
				font-size: px2rem(22);
				color: #555458;
			}
			.product-price {
				height: px2rem(43);
				line-height: px2rem(43);
				font-size: px2rem(20);
				color: #000;
			}
			.product-num {
				height: px2rem(50);
				line-height: px2rem(50);
				font-size: px2rem(20);
				color: #000;
				text-align: right;
			}
			.to-comment {
				position: absolute;
				top: px2rem(29);
				right: px2rem(18);
				width: px2rem(84);
				height: px2rem(45);
				background: $themeColor;
				text-align: center;
				font-size: px2rem(22);
				line-height: px2rem(45);
				color: #000;
			}
		}
	}
}
</style>
