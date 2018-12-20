/**
 *加速度计参数配置.js
 */
export default {
	name: "acc_fault",
	data: function() {
		return {
			accFaultList: [],
			start: '',
			stop: '',
			move: '',
			hor: '',
			ver: '',
			selectedRate: '',
			selectedRange: '',
			calibStatus: '',
			options: [{
					text: '2g',
					value: 0
				},
				{
					text: '4g',
					value: 1
				},
				{
					text: '8g',
					value: 2
				},
			],
			options2: [{
					text: '800HZ',
					value: 0
				},
				{
					text: '400HZ',
					value: 1
				},
				{
					text: '200HZ',
					value: 2
				},
				{
					text: '100HZ',
					value: 3
				},
				{
					text: '50HZ',
					value: 4
				},
				{
					text: '12.5HZ',
					value: 5
				},
				{
					text: '6.25HZ',
					value: 7
				},
				{
					text: '1.56HZ',
					value: 8
				},
			],
		}
	},
	mounted: function() {
		this.getAccFaultList();
	},
	methods: {
		//获取加速度计阈值
		getAccFaultList: function() {
			var that = this;
			var elevator;
			this.$https.get(that.$config.getSysModeUrl(), null, function(res) {
				if (res) {
					elevator = that.$utils.parseINIString(res).elevator_para_config;
					that.start = elevator.acc_start_th;
					that.stop = elevator.acc_stop_th;
					that.move = elevator.acc_move_th;
					that.hor = elevator.acc_hor_th;
					that.ver = elevator.acc_ver_th;
					that.selectedRate = parseInt(elevator.acc_rate);
					that.selectedRange = parseInt(elevator.acc_range);
				}
			})
		},
		//获取实时状态
		getAccRuntimeStatus: function() {
			var that = this;
			this.$sys.getRuntimeStatus(that,function(txt) {
				that.calibStatus = txt;
			})
		},
		//修改加速度计阈值
		upAccFaultList: function() {
			var that = this;
			this.$sys.getSysMode(function(res) {
				if (res == 0) {
					var tips = "不能为空或格式错误！";
					if (that.start != null && that.start != "" && that.start > 0 && !isNaN(that.start)) { //启动加速度计超标阈值
						if (that.stop != null && that.stop != "" && that.stop > 0 && !isNaN(that.stop)) { //停止加速度计超标阈值
							if (that.move != null && that.move != "" && that.move > 0 && !isNaN(that.move)) { //轿厢异常滑动阈值
								if (that.hor != null && that.hor != "" && that.hor > 0 && !isNaN(that.hor)) { //轿厢异常振动水平振动阈值 
									if (that.ver != null && that.ver != "" && that.ver > 0 && !isNaN(that.ver)) { //轿厢异常振动垂直振动阈值 
										if (that.selectedRate != null && that.selectedRate != "") { //设置采样频率
											if (that.selectedRange != null && that.selectedRange != "") { //设置量程
											}
										}
									} else {
										that.$utils.showTips(that,2,"轿厢异常振动【垂直】振动阈值" + tips);
										return false;
									}
								} else {
									that.$utils.showTips(that,2,"轿厢异常振动【水平】振动阈值" + tips);
									return false;
								}
							} else {
								that.$utils.showTips(that,2,"轿厢异常滑动阈值" + tips);
								return false;
							}
						} else {
							that.$utils.showTips(that,2,"停止加速度计超标阈值" + tips);
							return false;
						}
					} else {
						that.$utils.showTips(that,2,"启动加速度超标阈值" + tips);
						return false;
					}
					var param = {
						acc_start_th: that.start,
						acc_stop_th: that.stop,
						acc_move_th: that.move,
						acc_hor_th: that.hor,
						acc_ver_th: that.ver,
						acc_rate: that.selectedRate,
						acc_range: that.selectedRange
					}
					that.$https.get(that.$config.upAccFaultList(), param, function(data) {
						if (data.success) {
							setInterval(that.getAccRuntimeStatus, 100); //每隔1毫秒获取修改后状态
							that.$utils.showTips(that,1); //修改成功
						} else {
							that.$utils.showTips(that,0); //修改失败
						}
					})
				} else {
					that.$utils.showTips(that,2,"工作模式下,不能操作！");
					return false;
				}
			})
		},
	}
}
