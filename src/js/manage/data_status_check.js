/* 
	设备状态查看data_status_check.js
 */
export default {
	name: "data_status_check",
	data: function() {
		return {
			ssid: "", //Wifi热点名称
			deviceID: "", //设备ID
			gpioObj: {
				gpio1: "", //红外传感器1
				gpio2: "", //红外传感器2
				gpio3: "", //红外传感器3
				gpio134: "", //开门到位开关
				gpio138: "", //关门到位开关
				people_sense: "", //人感检测
				light: "", //轿厢内照明状态
				source: "", //电源状态
				gpio4: "", //紧急按钮开关
				gpio137: "", //维保开关
			},
			netObj: {
				csq_2g: "", //2G信号强度
				ppp0: "",
				wan: "",
				isFlag1: "",
				isFlag2: "",
			},
			sdObj: {
				stor: "",
				nv_total: "",
				nv_used: "",
				nv_use_ratio: "",
				fv_total: "",
				fv_used: "",
				fv_use_ratio: "",
				fp_total: "",
				fp_used: "",
				fp_use_ratio: "",
				ep_total: "",
				ep_used: "",
				ep_use_ratio: "",
			},
			emmcObj: {
				audio_total: "",
				audio_used: "",
				audio_use_ratio: "",
				log_total: "",
				log_used: "",
				log_use_ratio: "",
			},
			processList: [], //关键任务集合
			videoUrl:"",//视频url
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
	mounted: function() {
		this.getProcessInfo();
		this.getFlashInfo();
		this.get2gNetWork();
		this.getMx6sConf();
		this.getConfigData();
	},
	methods: {
		/**
		 * 获取关键任务
		 */
		getProcessInfo: function() {
			var that = this;
			this.$https.get(this.$config.getProcessInfo(), null, function(res) {
				if (res) {
					that.processList = res.process;
				}
			})
		},
		/**
		 * 获取存储空间状态
		 */
		getFlashInfo: function() {
			var that = this;
			this.$https.get(this.$config.getFlashInfo(), null, function(res) {
				if (res) {
//					console.log(res);
					var emmc_Tag = res.emmc_flash; //emmc是否存在标识
					var emmc_audio = res.fault_audio; //故障音频数据
					var emmc_log = res.log; //系统日志数据
					var sd_Tag = res.sd_flash; //sd是否存在标识
					var sd_fault_video = res.fault_video; //循环故障视频数据
					var sd_normal_video = res.normal_video; //故障视频数据
					var sd_fault_pic = res.fault_pic; //故障图片数据
					var sd_em_pic = res.em_pic; //紧急图片数据

					if (emmc_Tag && emmc_Tag == 'OK') {
						that.$refs.emmc.style.display = "block";
						if (that.$utils.isEmptyObject(emmc_audio)) {
							that.emmcObj.audio_total = emmc_audio.total;
							that.emmcObj.audio_used = emmc_audio.used;
							that.emmcObj.audio_use_ratio = '(' + emmc_audio.use_ratio + ')';
						};
						if (that.$utils.isEmptyObject(emmc_log)) {
							that.emmcObj.log_total = emmc_log.total;
							that.emmcObj.log_used = emmc_log.used;
							that.emmcObj.log_use_ratio = '(' + emmc_log.use_ratio + ')';
						}
					} else {
						console.log("emmc_flash is NO 'OK' ");
					}
					if (sd_Tag && sd_Tag == "OK") {
						that.sdObj.stor = "正常";
						that.$refs.sd.style.display = "block";
						if (that.$utils.isEmptyObject(sd_fault_video)) {
							that.sdObj.fv_total = sd_fault_video.total;
							that.sdObj.fv_used = sd_fault_video.used;
							that.sdObj.fv_use_ratio = '(' + sd_fault_video.use_ratio + ')';
						};
						if (that.$utils.isEmptyObject(sd_normal_video)) {
							that.sdObj.nv_total = sd_normal_video.total;
							that.sdObj.nv_used = sd_normal_video.used;
							that.sdObj.nv_use_ratio = '(' + sd_normal_video.use_ratio + ')';
						}
						if (that.$utils.isEmptyObject(sd_fault_pic)) {
							that.sdObj.fp_total = sd_fault_pic.total;
							that.sdObj.fp_used = sd_fault_pic.used;
							that.sdObj.fp_use_ratio = '(' + sd_fault_pic.use_ratio + ')';
						}
						if (that.$utils.isEmptyObject(sd_em_pic)) {
							that.sdObj.ep_total = sd_em_pic.total;
							that.sdObj.ep_used = sd_em_pic.used;
							that.sdObj.ep_use_ratio = '(' + sd_em_pic.use_ratio + ')';
						}
					} else {
						that.sdObj.stor = "未安装/未分区格式化";
					}
				}
			})
		},
		/**
		 * 获取2G网络状态
		 */
		get2gNetWork: function() {
			var that = this;
			that.$https.get(that.$config.get2gNetWork(), null, function(res) {
				if (res) {
					that.netObj.csq_2g = res.csq;
					if (res.ppp0 && res.ppp0 == "OK") {
						that.netObj.isFlag1 = true;
					} else {
						that.netObj.isFlag1 = false;
					}
					if (res.wan && res.wan == "OK") {
						that.netObj.isFlag2 = true;
					} else {
						that.netObj.isFlag2 = false;
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
					var mx6s = that.$utils.parseINIString(res).mx6s_conf;					that.deviceID = mx6s.device_id;
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
					that.ssid = elevator.ssid;
				}
			})
		},
		/**查看视频*/
		showVideo:function(){
			var that = this;
			this.$sys.getSysMode(this,function (mode) {
				if (mode == 0) {
					that.videoUrl = "rtsp://192.168.2.10:8554/test";
				} else if (mode == 1) {
					that.$utils.showTips(that,2,"工作模式下,不能查看视频！")
				} else {
					that.$utils.showTips(that,2,"获取系统模式失败，请检查服务器！")
				}
			})
		},
		initWebSocket: function() {
			var that = this;
			this.$socket.initWebSocket(this.$config.getGpioStatusUrl(), 'get_gpio_info', function(obj) {
				var success = "<font color=green>连通</font>";
				var error = "<font color=red>断开</font>";
				that.gpioObj.gpio1 = (obj.gpio_1 == 0 ? success : error);
				that.gpioObj.gpio2 = (obj.gpio_2 == 0 ? success : error);
				that.gpioObj.gpio3 = (obj.gpio_3 == 0 ? success : error);
				that.gpioObj.gpio134 = (obj.gpio_134 == 0 ? success : error);
				that.gpioObj.gpio138 = (obj.gpio_138 == 0 ? success : error);
				that.gpioObj.gpio137 = (obj.gpio_137 == 0 ? success : error);
				that.gpioObj.light = (obj.lt_stat == 0 ? "<font color=red>偏暗</font>" : (obj.lt_stat == 1 ?
					"<font color=green>良好</font>" : "--"));
				that.gpioObj.source = (obj.pw_stat == 0 ? "<font color=red>停电</font>" : (obj.pw_stat == 1 ?
					"<font color=green>正常</font>" : "--"));
				that.gpioObj.people_sense = (obj.hd_result == 0 ? '有人' : (obj.hd_result == 1 ? "无人" : "--"));
			});
		},
		
		isValidStr: function(str) {
			return this.$utils.isValidStr(str);
		}
	}
}
