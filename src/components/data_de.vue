<template>
	<!-- 靶标安装验证 -->
	<div class="content">
		<div class="box-de">
			<div class="top-box">
				<h4>运行实时状态</h4>
				<div class="i-textarea">
					<div class="i-label">
						<textarea rows="8" v-model="calibStatus" disabled="disabled"></textarea>
					</div>
				</div>
			</div>
			<div class="center-box">
				<button type="button" @click="start()">开始验证</button>
			</div>
			<div class="bot-box">
				<span>注意：<br>
					1. 请在靶标安装完毕之后运行本测试，以验证靶标安装满足要求；</br>
					2. 请参考手册文档查询具体验证过程。</span>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name:"data_de",
		data() {
			return {
				calibStatus: "", //运行状态
			}
		},
		mounted() {},
		methods: {
			start: function() {
				var that = this;
				this.$sys.getSysMode(this,function(res) {
					if (res == 0) {//安装模式
						that.$https.get(that.$config.startVerify(), null, function(res) {
							if (res.success) {
								that.$utils.showTips(that,1,'验证成功');
								setInterval(that.getRuntimeStatus, 100);
							} else {
								that.$utils.showTips(that,0,'验证失败');
							}
						})
					} else if (res == 1){
						that.$utils.showTips(that,2,'工作模式下，不能标定!');
					}
				})
			},
			getRuntimeStatus:function(){
				var that = this;
				this.$sys.getRuntimeStatus(this,function (txt) {
					that.calibStatus = txt;
				})
			}
		},
	}
</script>
