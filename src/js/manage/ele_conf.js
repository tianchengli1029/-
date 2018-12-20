/**
 * 故障检测参数配置.js
 */
export default {
	name: 'ele_conf',
	data() {
		return {
			top_warn: '',
			bottom_warn: '',
			n_sp: '',
			acce_anomaly_sp_warn: '',
			max_floor: '11',
			s_warn: '',
			lock_time: '',
			s_open_time: '',
			minus_floor: '',
			door_close_warn_num: '',
			door_open_warn_num: '',
			door_action_exception_time: '',
			stop_time: '',
			top_panel_position: '',
			bottom_panel_position: '',
			reset_floor_num: '',
			over_high_speed_warn: '',
			over_low_speed_warn: '',
			door_repeated_action_interval_time: '',
			door_repeated_action_num: '',
			// sound_warn : 50,
			floor_height: '',
			wait_stop_floor: '',
			floor_label: '-3~-2,-1~3,b,a,6~8',
			dialog: {},
			// level_door_sensor_dist:'',
			fixed_wait_floor: '', //固定待楼梯层
			show: "on",
			num: 0,
			tsFloorList: [], //特殊楼层高集合
			tsfloorNum: 0, //特殊楼层和
			tsfloorVal: "", //特殊楼层集合
			errorSumTs: "", //特殊错误提示
			errorSumDt: "", //待梯楼层提示
			errorSumXz: "", //校准楼层提示
			xzfloorIndex: 0, //校准楼层号
			xzfloorStr: "",
			dtfloorIndex: 0, //待梯楼层号下标
			dtfloorStr: [], //待梯楼层号
			xzfloorIndex: 0, //校准楼层号下标
			syList: [], //所有楼层
			errorSumLc:"",//楼层号输入错误日食
		}
	},
	mounted: function() {
		this.getFloorLabel();
		this.getEleList();
		this.getSpecialHeights();
	},
	methods: {
		//添加特殊楼层
		addFloorHeight: function() {
			var obj = {};
			obj.floor = "";
			obj.height = "";
			this.tsFloorList.push(obj);
		},
		//移除特殊楼层
		jianFloorHeight: function(index) {
			this.tsFloorList.splice(index, 1);
		},
		/**value 1:固定待梯楼层 0:无待梯楼层*/
		isFixedWait: function(value) {
			if (value == 1) { //固定待梯楼层
				this.$refs.dtfloor.style.display = "block";
			} else if (value == 0) {
				this.$refs.dtfloor.style.display = "none";
			}
		},
		/**输出错误提示*/
		floorErrorinnerHTML: function(tips, type) {
			if (type == 'dt') {
				this.errorSumDt = tips;
			} else if (type == 'xz') {
				this.errorSumXz = tips;
			} else if (type == 'ts'){
				this.errorSumTs = tips;
			}else{
				this.errorSumLc = tips;
			}
			if (tips == "") {
				return false;
			} else {
				return true;
			}
		},
		//获取楼层号
		getFloorLabel: function() {
			var that = this;
			that.$https.get(that.$config.getPicModeUrl(), null, function(res) {
				if (res) {
					var elv = that.$sys.parseINIString(res).mx6s_conf;
					that.floor_label = elv.floor_label;
					that.allFloor();
				}
			})
		},
		//获取特殊楼层
		getSpecialHeights: function() {
			var that = this;
			that.$https.get(that.$config.getSpecialHeights(), null, function(res) {
				if (res) {
					var elv = that.$sys.parseINIString(res).mx6s_conf;
					var tsFloorList = elv.special_floor_height;
					if (tsFloorList == "None") {
						that.tsFloorList = [];
					} else {
						tsFloorList = tsFloorList.split("?");
						for (var i = 0; i < tsFloorList.length; i++) {
							var obj = eval("(" + tsFloorList[i] + ")");
							that.tsFloorList.push(obj);
						}
					}
				}
			})
		},
		//获取系统参数
		getEleList: function() {
			var that = this;
			that.$https.get(that.$config.getSysModeUrl(), null, function(res) {
				if (res) {
					var elevator = that.$sys.parseINIString(res).elevator_para_config;
					that.top_warn = elevator.top_warn;
					that.bottom_warn = elevator.bottom_warn;
					that.n_sp = elevator.n_sp;
					that.max_floor = elevator.max_floor;
					that.s_warn = elevator.s_warn;
					that.lock_time = elevator.lock_time;
					that.s_open_time = elevator.s_open_time;
					//   document.getElementById("minus_floor").value=minus_floor.replace(reg,"");
					that.door_close_warn_num = elevator.door_close_warn_num;
					that.door_open_warn_num = elevator.door_open_warn_num;
					that.stop_time = elevator.stop_time;
					that.reset_floor_num = that.getFloorStr(elevator.reset_floor_num);
					that.door_repeated_action_interval_time = elevator.door_repeated_action_interval_time;
					that.door_repeated_action_num = elevator.door_repeated_action_num;
					//   document.getElementById("sound_warn").value=sound_warn.replace(reg,"");
					that.floor_height = elevator.floor_height;
					that.top_panel_position = elevator.top_panel_position;
					that.bottom_panel_position = elevator.bottom_panel_position;
					that.over_high_speed_warn = elevator.over_high_speed_warn;
					that.over_low_speed_warn = elevator.over_low_speed_warn;
					that.fixed_wait_floor = elevator.fixed_wait_floor;
					if (that.fixed_wait_floor == 0) {
						that.wait_stop_floor = "";
						that.$refs.dtfloor.style.display="on";
					} else {
						that.fixed_wait_floor = 1;
						that.wait_stop_floor = that.getFloorStr(elevator.wait_stop_floor);
						that.$refs.dtfloor.style.display="block";
					}

					if (elevator.door_action_exception_time == undefined) {
						that.door_action_exception_time = "";
					} else {
						that.door_action_exception_time = elevator.door_action_exception_time;
					}
				}
			})
		},
		//获取所有的楼层
		allFloor: function() {
			//获取所有的楼层
			this.syList = [];
			var flList = this.floor_label.split(","); //已经存在的楼层号
			for (let index = 0; index < flList.length; index++) {
				if (flList[index].indexOf("~") != -1) {
					var list = flList[index].split("~");
					for (let i = (parseInt(list[0])); i <= (parseInt(list[1])); i++) {
						if (i != 0) {
							this.syList.push(i);
						}
					}

				} else {
					this.syList.push(flList[index]);
				}
			}
		},
		//提交待楼层,转换成下标值
		floorStr: function(value) {
			var str = "";
			var floorList = value.split(",");
			for (let index = 0; index < floorList.length; index++) {
				if (floorList[index].indexOf("~") != -1) {
					var list = floorList[index].split("~");
					for (let i = 0; i < this.syList.length; i++) {
						if (list[0] == this.syList[i]) {
							str = str + (i + 1) + "~";
						}
						if (list[1] == this.syList[i]) {
							str = str + (i + 1) + ",";
						}
					}
				} else {
					for (let i = 0; i < this.syList.length; i++) {
						if (floorList[index] == this.syList[i]) {
							str = str + (i + 1) + ",";
						}
					}
				}
			}
			return str.substring(0, str.length - 1);
		},
		//获取已有的数据值，return 字符
		getFloorStr: function(value) {
			var sr, str = "";
			if (value != null && value != "") {
				sr = value.split(",");
				for (let index = 0; index < sr.length; index++) {
					var item = sr[index];
					if (item.indexOf("~") != -1) { //-1~20
						var list = item.split("~");
						var num1 = parseInt(list[0]);
						var num2 = parseInt(list[1]);
						for (let x = 0; x < this.syList.length; x++) {
							if (num1 == (x + 1)) {
								str += this.syList[x] + "~";
							}
							if (num2 == (x + 1)) {
								str += this.syList[x] + ",";
								break;
							}
						}

					} else { //a b 1
						for (let x = 0; x < this.syList.length; x++) {
							if (item == (x + 1)) {
								str += this.syList[x] + ',';
								break;
							}
						}
					}

				}
			}
			return str.substring(0, str.length - 1);
		},
		/**实时监听楼层号输入*/
		isFloorLabel:function(floor,maxFloor){
			if(maxFloor==""||maxFloor.length==0){
				this.$utils.showTips(this, 2, "请填写总楼层数！");
				return false;
			}
			if (floor == '') {
				this.floorErrorinnerHTML("");
				return false;
			}
			if(floor.charAt(0)==0||floor.charAt(0)=='~'){
				this.floorErrorinnerHTML("楼层格式错误！！");
				return false;
			}
			var mindex = 0;
			var floorList = floor.split(",");
			for(let i =0;i<floorList.length;i++){
				var item = floorList[i];
				if(item.indexOf("~")!=-1){
					var list = item.split("~");
					var num1 = parseInt(list[0]);
					var num2 = parseInt(list[1]);
					if(num1>num2){
						this.floorErrorinnerHTML("楼层格式错误!");
						break;
					}
					if(list[0].charAt(0)!="-" && list[1].charAt(0)!="-"){
						mindex += ((num2 - num1)+1);
					}else if(list[0].charAt(0)=="-"&&list[1].charAt(0)=="-"){
						mindex += ((num2 - num1)+1);
					}else{
						mindex+=(num2 - num1);
					}
					
				}else{
					mindex+=1;
				}
			}
			console.log(mindex);
			if(mindex>parseInt(maxFloor)){
				this.floorErrorinnerHTML("楼层号不能大于总楼层数,当前楼层数为："+mindex);
				return false;
			}else if(mindex<parseInt(maxFloor)){
				this.floorErrorinnerHTML("楼层号不能小于总楼层数,当前楼层数为："+mindex);
				return false;
			}
		},
		isblurFloor: function() {
			this.isInputFloor(this.reset_floor_num, 'xz');
			this.isInputFloor(this.wait_stop_floor, 'dt');
			for (var i = 0; i < this.tsFloorList.length; i++) {
				var isFlag = this.isInputFloor(this.tsFloorList[i].floor, '');
				if (isFlag == false) {

					break;
				}
			}
		},
		//实时监听校准输入值
		isInputFloor: function(floor, type) {
			if (floor == '') {
				this.floorErrorinnerHTML("", type)
				return false;
			}
			if(floor.charAt(0)==0||floor.charAt(0)=='~'){
				this.floorErrorinnerHTML("楼层格式错误！！", type);
				return false;
			}
			if (type == 'xz') {
				if (floor.indexOf(",") != -1 || floor.indexOf("~") != -1) {
					this.floorErrorinnerHTML("楼层号格式错误！只能输入单个楼层", type);
					return false;
				}
			}
			this.allFloor();
			var floorList = floor.split(",");
			var mindex = 0;
			var isFlag = true;
			for (let index = 0; index < floorList.length; index++) {
				var item = floorList[index];
				if (item.indexOf("~") != -1) {
					var list = item.split("~");
					var num1 = parseInt(list[0]);
					var num2 = parseInt(list[1]);
					if (num1 > num2) {
						isFlag = false;
						this.floorErrorinnerHTML("楼层格式错误！！", type);
						break;
					}
					var isTrue1 = false;
					var isTrue2 = false;
					for (let i = 0; i < this.syList.length; i++) {
						if (num1 == this.syList[i]) {
							isTrue1 = true;
						}
						if (num2 == this.syList[i]) {
							isTrue2 = true;
						}
					}
					if (isTrue1 == false || isTrue2 == false) {
						isFlag = false;
						break;
					} else {
						mindex = num2 - num1;
					}
				} else {
					var isTrue = false;
					for (let i = 0; i < this.syList.length; i++) {
						if (item == this.syList[i]) {
							isTrue = true;
							mindex++;
							break;
						}
					}
					if (isTrue == false) {
						isFlag = false;
						break;
					}
				}
			}
			if (isFlag == false) {
				this.floorErrorinnerHTML("楼层号不存在！", type)
				return false;
			}
			if (mindex > this.syList.length) {
				this.floorErrorinnerHTML("楼层不能大于总楼层！", type)
				return false;
			}
			if (isFlag == true && mindex <= this.syList.length) {
				this.floorErrorinnerHTML("", type)
				return false;
			}
		},
		//修改系统参数
		upEleList: function() {
			var that = this;
			this.$sys.getSysMode(function(res) {
				if (res == 0) {
					if (that.errorSumLc!= "") {
						that.$utils.showTips(that, 2, "楼层号输入,请重新检测输入！");
						return false;
					}
					if (that.errorSumTs != "") {
						that.$utils.showTips(that, 2, "特殊楼层号不存在，请检查并重新输入！");
						return false;
					}
					if (that.errorSumXz != "") {
						that.$utils.showTips(that, 2, "校准楼层号不存在，请检查并重新输入！");
						return false;
					}
					var tips = "不能为空或格式错误！";
					var floorItem = document.getElementsByClassName("edit-child-item"),
						special_floor_height = "";
					for (var i = 0; i < floorItem.length; i++) {

						var tsfloorh = floorItem[i].getElementsByName("tsfloorh").value;
						var tsfloor = floorItem[i].getElementsByName("tsfloor").value;
						if (tsfloor == "") {
							that.$utils.showTips(that, 2, "特殊楼层号不能为空！");
							return false;
						}
						if (tsfloorh != "" && that.$utils.isNumberPoint(tsfloorh)) {} else {
							that.$utils.showTips(that, 2, "特殊楼层高" + tips);
							return false;
						}
						special_floor_height += "{'floor':'" + tsfloor + "'," + "'height':'" + tsfloorh + "'}" + "?";
					}

					special_floor_height = special_floor_height.substring(0, special_floor_height.length - 1);

					if (that.n_sp != "" && that.$utils.isNumberPoint(that.n_sp)) { //额定速度
						if (that.max_floor != "" && that.$utils.isNumberPoint(that.max_floor)) { //总楼层数
							if (that.floor_label != "" && !that.$utils.isChinese(that.floor_label)) { //楼层号输入
								if (that.floor_height != "" && that.$utils.isNumberPoint(that.floor_height)) { //层间高度
									if (that.lock_time != "" && that.$utils.isNumberPoint(that.lock_time)) { //长时间关人预警时间
										if (that.s_open_time != "" && that.$utils.isNumberPoint(that.s_open_time)) { //停梯开/关门预警时间
											if (that.door_open_warn_num != "" && that.$utils.isNumberPoint(that.door_open_warn_num)) { //开门异常预警次数
												if (that.door_action_exception_time != "" && that.$utils.isNumberPoint(that.door_action_exception_time)) { //门移动异常预警时间
													if (that.reset_floor_num != "" && !that.$utils.isChinese(that.reset_floor_num)) { //校准楼层号
														if (that.over_high_speed_warn != "" && that.$utils.isNumberPoint(that.over_high_speed_warn)) { //电梯超速预警比例值
															if (that.fixed_wait_floor == 0) { //固定待楼梯层   0:无待梯楼层
																that.wait_stop_floor = " "; //置空待楼梯层号
																that.errorSumDt = "";
															} else if (that.fixed_wait_floor == 1) { //固定待楼梯层   1:有待梯楼层
																if (that.wait_stop_floor == "") {
																	that.$utils.showTips(that, 2, "待楼梯层不能为空");
																	return false;
																}
																if (that.errorSumDt != "") {
																	that.$utils.showTips(that, 2, "待梯楼层号不存在，请检查并重新输入！");
																	return false;
																}
															}
														} else {
															that.$utils.showTips(that, 2, "电梯超速预警比例值" + tips);
															return false;
														}
													} else {
														that.$utils.showTips(that, 2, "校准楼层号" + tips);
														return false;
													}
												} else {
													that.$utils.showTips(that, 2, "门移动异常预警时间" + tips);
													return false;
												}
											} else {
												that.$utils.showTips(that, 2, "开门异常预警次数" + tips);
												return false;
											}
										} else {
											that.$utils.showTips(that, 2, "停梯开/关门预警时间" + tips);
											return false;
										}
									} else {
										that.$utils.showTips(that, 2, "长时间关人预警时间" + tips);
										return false;
									}
								} else {
									that.$utils.showTips(that, 2, "层间高度" + tips);
									return false;
								}
							} else {
								that.$utils.showTips(that, 2, "楼层号" + tips);
								return false;
							}
						} else {
							that.$utils.showTips(that, 2, "总楼层数" + tips);
							return false;
						}
					} else {
						that.$utils.showTips(that, 2, "额定速度" + tips);
						return false;
					}
					var param = {
						top_warn: that.top_warn,
						bottom_warn: that.bottom_warn,
						n_sp: that.n_sp,
						acce_anomaly_sp_warn: that.acce_anomaly_sp_warn,
						max_floor: that.max_floor,
						s_warn: that.s_warn,
						lock_time: that.lock_time,
						s_open_time: that.s_open_time,
						minus_floor: that.minus_floor,
						door_close_warn_num: that.door_close_warn_num,
						door_open_warn_num: that.door_open_warn_num,
						door_action_exception_time: that.door_action_exception_time,
						stop_time: that.stop_time,
						top_panel_position: that.top_panel_position,
						bottom_panel_position: that.bottom_panel_position,
						reset_floor_num: that.floorStr(that.reset_floor_num), //校准楼层数
						over_high_speed_warn: that.over_high_speed_warn,
						over_low_speed_warn: that.over_low_speed_warn,
						door_repeated_action_interval_time: that.door_repeated_action_interval_time,
						door_repeated_action_num: that.door_repeated_action_num,
						// sound_warn : 50,
						floor_height: that.floor_height,
						wait_stop_floor: that.floorStr(that.wait_stop_floor),
						floor_label: that.floor_label,
						// level_door_sensor_dist : that.level_door_sensor_dist,
						fixed_wait_floor: that.fixed_wait_floor,
						special_floor_height: special_floor_height
					}
					console.log('param=',param);
					return false;
					that.$https.get(that.$config.upEleList(), param, function(res) {
						if (res.success) {
							that.$utils.showTips(that, 1);
						} else {
							that.$utils.showTips(that, 0);
						}
					})
				} else {
					that.$utils.showTips(that, 2, '工作模式下，不能修改电梯参数！');
				}
			})
		},
	}
}
