<template>
	<div v-if="!trolley.length">
		<div class="no-order">
			<img class="no-order-img"
			     src="../../commom/images/trolley.png">
			<span class="no-order-msg">购物车是空的哦</span>
		</div>
	</div>
	<div v-else>
		<!-- 头部 -->
		<div class="trolley-opr">
			<div class="ui-radio">
				<input type="checkbox"
				       v-model="checkAll"
				       id="checkAll">
				<label class="bgwhite"
				       for="checkAll">全选</label>
			</div>
			<span @click="toggleEditable">编辑</span>
		</div>
		<!-- 商品列表区 -->
		<div class="trolley-list">
			<div class="trolley-product"
			     v-for="(item,index) in trolley">
				<div class="ui-radio">
					<input type="checkbox"
					       v-model="checkArr"
					       :value="item.id"
					       :id="index">
					<label class="bggrey"
					       :for="index"></label>
				</div>
				<img :src="item.imgsrc"
				     class="product-img">
				<div class="product-detail">
					<div class="product-name"> {{item.name}} </div>
					<div class="product-price">￥ {{item.price}} </div>
					<div class="product-num">
						<span v-if="!editable">X {{item.num}}</span>
						<div class="product-num-opr"
						     v-else>
							<span class="addnum"
							      @click="changeGoodNum(item,-1,index)">-</span>
							<span class="item-num"> {{item.num}} </span>
							<span class="decnum"
							      @click="changeGoodNum(item,1,index)">+</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 结算按钮区 -->
		<div class="trolley-total">
			<div class="total-price">
				<div class="ui-radio">
					<input type="checkbox"
					       v-model="checkAll"
					       id="checkoutAll">
					<label class="bggrey"
					       for="checkoutAll">全选</label>
				</div>
				<div class="total-price-content">
					<span class="total-price-text">总价</span>
					<span>￥ {{total}}</span>
				</div>
			</div>
			<div class="checkout"
			     @click="checkOut">结算</div>
		</div>
		<!-- 弹窗 -->
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
			editable: false,
			checkArr: [],
			showPopup: false,
			msg: "",
			total: 0
		};
	},
	methods: {
		//切换编辑状态
		toggleEditable() {
			this.editable = !this.editable;
		},
		//增减购物车商品数量
		changeGoodNum(item, num, index) {
			let newNum = item.num + num;
			if (newNum === 0) {
				this.msg = "是否需要删除商品？";
				this.showPopup = true;
				this.onEnsure = () => {
					//更新勾选状态
					this.checkArr.splice(index, 1);
					this.$store.dispatch("deleteGood", { id: item.id, index });
				};
			} else {
				//更新后的商品数量
				this.$store.dispatch("addToTrolley", { good: item, num });
			}
		},
		//显示隐藏遮罩层
		toggleShowPopup(boolean) {
			this.showPopup = boolean;
		},
		//计算总价
		mathTotal() {
			let total = 0;
			this.trolley.forEach(element => {
				total += element.num * element.price;
			});
			this.total = total;
		},
		//结算
		checkOut() {
			this.$store.dispatch("checkOut", this.checkArr);
			this.checkArr = [];
			this.msg = "结算成功!";
			this.showPopup = true;
			this.onEnsure = () => {};
		},
		onEnsure() {}
	},
	watch: {
		//如果勾选了商品，商品计算总价
		checkArr() {
			this.mathTotal();
		}
	},
	computed: {
		checkAll: {
			get: function() {
				return this.checkArr.length == this.trolley.length;
			},
			set: function(boolean) {
				this.checkArr = [];
				if (boolean) {
					this.trolley.forEach(item => {
						this.checkArr.push(item.id);
					});
				}
			}
		},
		trolley() {
			return this.$store.state.trolley;
		}
	}
};
</script>

<style lang="scss" scoped>
@import "../../commom/sass/base.scss";
$check-width: px2rem(30);
$opr-height: px2rem(60);
$total-height: px2rem(85);

.trolley-opr {
	position: fixed;
	z-index: 1;
	top: 0;
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 px2rem(24) 0 px2rem(42);
	height: $opr-height;
	background: #ececee;
	font-size: px2rem(24);
	line-height: px2rem(60);
}

.trolley-list {
	padding-top: $opr-height;
	padding-bottom: $total-height;
}

.trolley-product {
	display: flex;
	align-items: center;
	margin: 0 px2rem(20) px2rem(22);
	padding: 0 px2rem(24);
	height: px2rem(172);
	background: $cardbg;
	@include bdrs;
	@include base-boxshadow;
	> .ui-radio {
		float: left;
	}
	.product-img {
		float: left;
		width: px2rem(172);
		height: px2rem(172);
	}
	.product-detail {
		flex: 1;
		padding: px2rem(28) 0 0 px2rem(22);
		height: px2rem(172);
		.product-name {
			height: px2rem(39);
			line-height: px2rem(39);
			font-size: px2rem(24);
			color: #4a4a52;
		}
		.product-price {
			height: px2rem(33);
			line-height: px2rem(33);
			font-size: px2rem(22);
			color: #000;
		}
		.product-num {
			height: px2rem(36);
			line-height: px2rem(36);
			font-size: px2rem(20);
			color: #000;
			text-align: right;
			.product-num-opr {
				display: flex;
				justify-content: flex-end;
				.addnum,
				.decnum {
					display: block;
					width: px2rem(36);
					height: px2rem(36);
					border: 2px solid $icon-bhColor;
					line-height: px2rem(32);
					text-align: center;
					border-radius: 50%;
				}
				.item-num {
					margin: 0 px2rem(15);
				}
			}
		}
	}
}

.trolley-total {
	position: fixed;
	display: flex;
	bottom: $tabBar-height;
	width: 100%;
	height: $total-height;
	background: $cardbg;
	font-size: px2rem(22);
	line-height: px2rem(85);
	border-top: 1px solid #ececee;
	.total-price {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-left: px2rem(44);
		padding-right: px2rem(24);
		width: px2rem(430);
		.total-price-text {
			color: #61617d;
		}
	}
	.checkout {
		width: px2rem(210);
		text-align: center;
		background: $themeColor;
		color: #958d4a;
	}
}

// 美化复选框
.ui-radio {
	> input[type="checkbox"] {
		display: none;
		&:checked + label {
			&:before {
				box-shadow: inset 0 0 0 0 #fff;
			}
			&:after {
				border: px2rem(1) solid #2b2f3e;
				border-left-color: transparent;
				border-bottom-color: transparent;
			}
		}
		// &:checked + label.bgwhite {
		// }
	}
	label {
		position: relative;
		display: flex;
		align-items: center;

		&:before {
			content: "";
			margin-right: $check-width/2;
			width: $check-width;
			height: $check-width;
			background: $themeColor;
			border-radius: 50%;
			// transition: all 0.3s ease;
			// box-shadow: inset 0 0 0 px2rem(30) #fff;
		}
		&:after {
			content: "";
			position: absolute;
			top: 50%;
			left: $check-width/5;
			margin-top: -1 * px2rem(10);
			width: $check-width/2;
			height: $check-width/3;
			border: 0 solid #2b2f3e;
			border-left-color: transparent;
			border-bottom-color: transparent;
			transform: rotate(125deg);
			// transition: all 0.3s ease;
		}
	}
	label.bgwhite {
		&:before {
			box-shadow: inset 0 0 0 px2rem(30) #fff;
		}
	}
	label.bggrey {
		&:before {
			box-shadow: inset 0 0 0 px2rem(30) #ececee;
		}
	}
}

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
</style>
