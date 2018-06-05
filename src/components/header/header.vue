<template>
	<div class="pub-header">
		<span class="extend-click header-icon header-goback"
		      @click="goBack()"></span>
		<div v-if="headerTitle"
		     class="header-content">
			{{headerTitle}}
			<slot></slot>
		</div>
	</div>
</template>
<script>
export default {
	props: ["headerTitle", "back"],
	methods: {
		goBack() {
			// 坑
			this.$router.go(-1);
		}
	}
};
</script>
<style lang="scss" scoped>
@import "../../commom/sass/base.scss";

.pub-header {
	position: fixed;
	top: 0;
	z-index: 2;
	width: 100%;
	background-color: $cardbg;
	height: $header-height;
	line-height: $header-height;
	text-align: center;
	font-size: px2rem(28);
	font-weight: 700;
}
.header-icon {
	position: absolute;
	top: 50%;
	left: px2rem(16);
	margin-top: -1 * px2rem(17);
	width: px2rem(19);
	height: px2rem(34);
	background-repeat: no-repeat;
	background-size: 100% 100%;
	background-position: left center;
}
.header-goback {
	background-image: url("../../commom/images/goback.png");
	// left: 0.6rem;
}
</style>
