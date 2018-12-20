export default {
	name: "acc_fault",
	data: function() {
		return {
			accObj: {
				acc_start_th: "",
				acc_stop_th: "",
				acc_move_th: "",
				acc_hor_th: "",
				acc_ver_th: "",
				acc_range: "",
				acc_rate: "", //-------加速度计参数
				n_sp: "",
				max_floor: "",
				floor_label: "",
				floor_height: "",
				specialfhList: [],
				reset_floor_num: "",
				fixed_wait_floor: "",
				wait_stop_floor: "",
				lock_time: "",
				door_open_warn_num: "",
				door_action_exception_time: "",
				over_high_speed_warn: "", //-------系统配置参数
			}
		}
	},
	mounted: function() {
		this.getConfigData();
		this.getSpecialHeights();
		this.getMx6sConf();
	},
	methods: {
		/**获取特殊楼层*/
		getSpecialHeights: function() {
			var that = this;
			this.$https.get(this.$config.getSpecialHeights(), null, function(res) {
				if (res) {
					var elv = that.$utils.parseINIString(res).mx6s_conf;
					var tsFloorList = elv.special_floor_height; //特殊楼层号
					tsFloorList = tsFloorList.split("?");
					for (var i = 0; i < tsFloorList.length; i++) {
						var obj = eval("(" + tsFloorList[i] + ")");
						that.accObj.specialfhList.push({
							floor: obj.floor,
							height: obj.height
						})
					}
				}
			})
		},
		/**
		 * 获取controller.conf  mx6s_conf属性
		 */
		getMx6sConf: function() {
			var that = this;
			this.$https.get(this.$config.getPicModeUrl(), null, function(res) {
				if (res) {
					var mx6s = that.$utils.parseINIString(res).mx6s_conf;
					that.accObj.floor_label = mx6s.floor_label;
				}
			});
		},
		/**
		 * 获取config.data  elevator_para_config属性
		 */
		getConfigData: function() {
			var that = this;
			this.$https.get(this.$config.getSysModeUrl(), null, function(res) {
				if (res) {
					var elevator = that.$utils.parseINIString(res).elevator_para_config;
					//acc参数
					that.accObj.acc_start_th = elevator.acc_start_th + ' m/s²';
					that.accObj.acc_stop_th = elevator.acc_stop_th + ' m/s²';
					that.accObj.acc_move_th = elevator.acc_move_th + ' m/s²';
					that.accObj.acc_hor_th = elevator.acc_hor_th + ' m/s²';
					that.accObj.acc_ver_th = elevator.acc_ver_th + ' m/s²';
					var res_range = '';
					switch (Number(elevator.acc_range)) {
						case 0:
							res_range = '2g';
							break;
						case 1:
							res_range = '4g';
							break;
						case 2:
							res_range = '8g';
							break;
					}
					that.accObj.acc_range = res_range;

					var res_rate = '';
					switch (Number(elevator.acc_rate)) {
						case 0:
							res_rate = '800HZ';
							break;
						case 1:
							res_rate = '400HZ';
							break;
						case 2:
							res_rate = '200HZ';
							break;
						case 3:
							res_rate = '100HZ';
							break;
						case 4:
							res_rate = '50HZ';
							break;
						case 5:
							res_rate = '12.5HZ';
							break;
						case 7:
							res_rate = '6.25HZ';
							break;
						case 8:
							res_rate = '1.56HZ';
							break;
					}
					that.accObj.acc_rate = res_rate;

					//系统配置参数
					that.accObj.n_sp = elevator.n_sp + ' 米/秒';
					that.accObj.max_floor = elevator.max_floor;
					that.accObj.floor_height = elevator.floor_height + ' 厘米';
					that.accObj.reset_floor_num = elevator.reset_floor_num;
					var fixed_wait_floor = "",
						sty = "none";
					if (elevator.fixed_wait_floor == 0) {
						fixed_wait_floor = "无";
					} else if (elevator.fixed_wait_floor == 1) {
						fixed_wait_floor = "有";
						that.accObj.wait_stop_floor = elevator.wait_stop_floor;
						sty = "block";
					} else {
						fixed_wait_floor = "-";
					}
					that.$refs.wait.style.display = sty;
					that.accObj.fixed_wait_floor = elevator.fixed_wait_floor;
					that.accObj.lock_time = elevator.lock_time;
					that.accObj.door_open_warn_num = elevator.door_open_warn_num;
					var door_action_exception_time = '';
					if (elevator.door_action_exception_time == undefined) {
						door_action_exception_time = "-";
					} else {
						door_action_exception_time = elevator.door_action_exception_time;
					}
					that.accObj.door_action_exception_time = door_action_exception_time + " 秒";
					that.accObj.over_high_speed_warn = elevator.over_high_speed_warn;
				}
			})
		}
	}
}
