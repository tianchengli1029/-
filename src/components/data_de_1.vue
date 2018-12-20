<template>
	<!-- 井道误检测试 -->
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
				<button type="button" @click="start()">开始</button>
				<button type="button" @click="stop()">结束</button>
			</div>
			<div class="bot-box">
				<span>注意：<br>
					1. 请在红外传感器安装测试完毕之后、且靶标安装之前运行本测试</br>
					2. 请从复位楼层开始，向顶层／底层运行电梯；</br>
					3. 若发现井道误检，请进行必要的井道清理，确保消除误检。</span>
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
						that.$https.get(that.$config.startFloor(), null, function(res) {
							if (res.success) {
								that.$utils.showTips(that,1,'开始标定成功');
								setInterval(that.getRuntimeStatus, 100);
							} else {
								that.$utils.showTips(that,0,'开始标定失败');
							}
						})
					} else if (res == 1){
						that.$utils.showTips(that,2,'工作模式下，不能标定!');
					}
				})
			},
			stop: function() {
				var that = this;
				this.$sys.getSysMode(this,function(res) {
					if (res == 0) {//安装模式
						that.$https.get(that.$config.stopFloor(), null, function(res) {
							if (res.success) {
								that.$utils.showTips(that,1,'结束标定成功');
								setInterval(that.getRuntimeStatus, 100);
							} else {
								that.$utils.showTips(that,0,'结束标定失败');
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
