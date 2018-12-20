<template>
	<!-- 加速度计标定 -->
	<div class="content">
		<div class="box-de">
			<div class="table-box">
				<table>
					<tbody>
						<tr>
							<th width="50%">红外传感器1</th>
							<td colspan="3"><span id="gpio1" v-html="gpio1"></span></td>
						</tr>
						<tr>
							<th width="50%">红外传感器2</th>
							<td colspan="3"><span id="gpio2" v-html="gpio2"></span></td>
						</tr>
						<tr>
							<th width="50%">红外传感器3</th>
							<td colspan="3"><span id="gpio3" v-html="gpio3"></span></td>
						</tr>
						<tr>
							<th width="50%">开门到位开关</th>
							<td colspan="3"><span id="gpio134" v-html="gpio134"></span></td>

						</tr>
						<tr>
							<th width="50%">关门到位开关</th>
							<td colspan="3"><span id="gpio138" v-html="gpio138"></span></td>
						</tr>
						<tr>
							<th width="50%">人感检测</th>
							<td colspan="3"><span id="people_sense" v-html="people_sense"></span></td>
						</tr>
						<tr>
							<th width="50%">轿厢内照明状态</th>
							<td colspan="3"><span id="light" v-html="light"></span></td>
						</tr>
						<tr>
							<th width="50%">电源状态</th>
							<td colspan="3"><span id="source" v-html="source"></span></td>
						</tr>
						<tr>
							<th width="50%">紧急按钮开关</th>
							<td colspan="3"><span id="gpio4" v-html="gpio4"></span></td>
						</tr>
						<tr>
							<th width="50%">维保开关</th>
							<td colspan="3"><span id="gpio137" v-html="gpio137"></span></td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="bot-box">
				<span>注意：请参考手册文档查询具体的测试操作过程。</span>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: "data_de_5",
		data:function() {
			return {
				gpio137: "--",
				gpio4: "--",
				source: "--",
				light: "--",
				people_sense: "--",
				gpio138: "--",
				gpio134: "--",
				gpio1: "--",
				gpio2: "--",
				gpio3: "--",
			}
		},
		created: function() {
			//页面刚进入时开启长连接
			this.initWebSocket();
		},
		destroyed: function() {
			//页面销毁时关闭长连接
			this.$socket.websocketclose();
		},
		methods: {
			initWebSocket: function() {
				this.$socket.initWebSocket(this.$config.getGpioStatusUrl(), 'get_gpio_info', function(obj) {
					var success = "<font color=green>连通</font>";
					var error = "<font color=red>断开</font>";
					this.gpio1 = (obj.gpio_1 == 0 ? success : error);
					this.gpio2 = (obj.gpio_2 == 0 ? success : error);
					this.gpio3 = (obj.gpio_3 == 0 ? success : error);
					this.gpio134 = (obj.gpio_134 == 0 ? success : error);
					this.gpio138 = (obj.gpio_138 == 0 ? success : error);
					this.gpio137 = (obj.gpio_137 == 0 ? success : error);
					this.light = (obj.lt_stat == 0 ? "<font color=red>偏暗</font>" : (obj.lt_stat == 1 ?
						"<font color=green>良好</font>" : "--"));
					this.source = (obj.pw_stat == 0 ? "<font color=red>停电</font>" : (obj.pw_stat == 1 ?
						"<font color=green>正常</font>" : "--"));
					this.people_sense = (obj.hd_result == 0 ? '有人' : (obj.hd_result == 1 ? "无人" : "--"));
				});
			},
		},
	}
</script>
