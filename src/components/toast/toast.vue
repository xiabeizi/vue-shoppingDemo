<template>
	<div class="popup"
	     :class="{'showPopup':show}">
		<div class="popup-container">
			<p v-html="msg"></p>
			<div class="buttons">
				<a @click="onClickLeft"> {{btnLeftText}} </a>
				<a @click="onClickRight"> {{btnRightText}} </a>
			</div>
		</div>
	</div>

</template>

<script>
export default {
	props: {
		showPopup: {
			type: Boolean,
			default: false
		},
		msg: {
			type: String,
			default: "提示信息"
		},
		btnLeftText: {
			type: String,
			default: "取消"
		},
		btnRightText: {
			type: String,
			default: "确认"
		},
		onEnsure: {
			type: Function
		},
		onCancle: {
			type: Function
		}
	},
	computed: {
		show() {
			return this.showPopup;
		}
	},
	methods: {
		onClickLeft() {
			this.$emit("toggleShowPopup", false);
			if (this.onCancle) this.onCancle();
		},
		onClickRight() {
			this.$emit("toggleShowPopup", false);
			if (this.onEnsure) this.onEnsure();
		}
	}
};
</script>

<style lang="scss" scoped>
@import "../../commom/sass/base.scss";

.popup {
	display: flex;
	align-items: center;
	position: fixed;
	z-index: 10;
	left: 0;
	top: 0;
	height: 100%;
	width: 100%;
	background-color: rgba(0, 0, 0, 0.2);
	opacity: 0;
	visibility: hidden;
	transition: opacity 0.3s 0s, visibility 0s 0.3s;
	.popup-container {
		flex: 1;
		margin: 0 px2rem(40);
		background: #fff;
		border-radius: 0.25em 0.25em 0.4em 0.4em;
		text-align: center;
		box-shadow: 0 0 20px 1px rgba(0, 0, 0, 0.2);
		transform: translateY(-50%);
		transition-property: transform;
		transition-duration: 0.3s;
		p {
			padding: px2rem(60) px2rem(20);
			font-size: px2rem(32);
			line-height: 1.2;
		}
	}
	.buttons {
		display: flex;
		a {
			width: 50%;
			height: px2rem(80);
			line-height: px2rem(80);
			color: #000;
			font-size: px2rem(28);
			transition: background-color 0.2s;
			&:first-child {
				background: $sideBtnColor;
				border-radius: 0 0 0 0.25em;
				// &:hover {
				// 	background-color: $sideBtnColo;
				// }
			}
			&:last-child {
				background: $themeColor;
				border-radius: 0 0 0 0.25em;
				// &:hover {
				// 	background-color: $themeColor;
				// }
			}
		}
	}
}
.showPopup {
	opacity: 1;
	visibility: visible;
	transition: opacity 0.3s 0s, visibility 0s 0s;
	.popup-container {
		transform: translateY(0);
	}
}
</style>
