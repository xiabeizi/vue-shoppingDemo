<template>
	<div>
		<myHeader headerTitle="商品评论"></myHeader>
		<div class="comment-product">
			<img class="product-img"
			     :src="productDetail.imgsrc">
			<div class="product-meta">
				<div class="product-name">{{productDetail.name}}</div>
				<div class="product-price">￥ {{productDetail.price}}</div>
			</div>
		</div>
		<div class="comment-list">
			<div class="comment-num"> {{productDetail.comment_num}} 条评价</div>
			<div class="comment-item"
			     v-for="item in commentArray">
				<img :src="item.avatar"
				     class="comment-avatar">
				<div class="comment-content">
					<div class="comment-meta">
						<div class="comment-user"> {{item.name}} </div>
						<div class="comment-date">{{item.date | formateDate}}</div>
					</div>
					<div class="comment-text">
						{{item.detail}}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import myHeader from "../header/header.vue";

export default {
	components: { myHeader },
	data() {
		return {
			productDetail: {},
			commentArray: []
		};
	},
	// computed: {
	// 	productDetail() {
	// 		return this.$store.state.productDetail;
	// 	}
	// },
	methods: {},
	created() {
		let id = this.$route.params.id;
		///初始化 请求商品数据
		this.$api.getProductDetail(id).then(Response => {
			this.productDetail = Response.data;
		});
		//请求商品评论
		this.$api.getComment(id).then(Response => {
			this.commentArray = Response.data.commentArray;
		});

		// let comment_num = this.$store.state.productDetail.comment_num || 20;
		// //初始化 请求商品数据
		// this.$store.dispatch("getComment", {
		// 	id,
		// 	comment_num
		// });
	}
};
</script>

<style lang="scss" scoped>
@import "../../commom/sass/base.scss";

.comment-product {
	$imgwidth: px2rem(138);

	margin-top: $header-height;
	padding: px2rem(34) px2rem(22) px2rem(15);
	height: px2rem(186);
	background: $cardbg;
	.product-img {
		float: left;
		width: $imgwidth;
		height: $imgwidth;
	}
	.product-meta {
		margin-left: $imgwidth + px2rem(18);
		.product-name {
			font-size: px2rem(22);
			line-height: px2rem(40);
			color: #4a4a52;
		}
		.product-price {
			font-size: px2rem(16);
			line-height: px2rem(50);
			color: #000;
		}
	}
}

.comment-list {
	margin-top: px2rem(12);
	padding: 0 px2rem(20);
	background: $cardbg;
	.comment-num {
		height: px2rem(76);
		line-height: px2rem(76);
		font-size: px2rem(22);
		color: #4a4a52;
	}
	.comment-item {
		padding: px2rem(10) 0;
		// height: px2rem(100);
		border-bottom: 1px solid #e5e5e7;
		$avatar-width: px2rem(54);
		.comment-avatar {
			float: left;
			width: $avatar-width;
			height: $avatar-width;
		}
		.comment-content {
			padding-left: $avatar-width + px2rem(18);
			.comment-meta {
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: px2rem(32);
				font-size: px2rem(18);
				color: #8e8e92;
			}
			.comment-text {
				line-height: px2rem(30);
				font-size: px2rem(22);
				color: #1d1d27;
			}
		}
	}
}
</style>
