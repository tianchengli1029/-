export default {
	name: 'index',
	data() {
		return {
			devId: '',
			mode: '',
			direction: '',
			picMode: '',
			mnc: '',
			ssid: "", //wifi热点名称
			old_mode: "",
			ir_type: "", //红外传感器形状value
		}
	},
	mounted() {
		this.getModeDirection(); //获取系统配置和安装配置
		this.getPicMode(); //获取图片上传模式
		this.getMnc(); //获取运营商状态
	},
	methods: {
		/**
		 * 获取系统配置和安装配置
		 */
		getModeDirection: function() {
			var that = this;
			this.$https.get(this.$config.getSysModeUrl(), null, function(res) {
				var elv = that.$utils.parseINIString(res).elevator_para_config;
				that.mode = elv.mode;
				that.old_mode = elv.mode;
				if (parseInt(elv.mode) == 0) {
					that.$refs.dis.style.display="block";
				} else if (parseInt(elv.mode)== 1) {
					that.$refs.dis.style.display="none";
				}
				that.direction = elv.direction;
				that.ssid = elv.ssid;				//wifi热点名称
				that.ir_type = elv.ir_type;//红外传感器形状
			})
		},
		/**
		 * 获取图片上传模式
		 */
		getPicMode: function() {
			var that = this;
			this.$https.get(this.$config.getPicModeUrl(), null, function(res) {
				var elv = that.$utils.parseINIString(res).mx6s_conf;
				that.devId = elv.device_id; //系统配置ID
				that.picMode = elv.pic_upload_mode;//图片模式
			})
		},

		/**
		 * 获取运营商状态
		 */
		getMnc: function() {
			var that = this;
			this.$https.get(this.$config.getMncUrl(), null, function(res) {
				var elv = that.$utils.parseINIString(res).operator;
				var mb = elv.MNC;
				if (mb === "MOBILE") {
					that.mnc = 0;
				} else if (mb === "UNICOM") {
					that.mnc = 1;
				} else if (mb === "UNICOM_IOT") {
					that.mnc = 2;
				}
			})
		},
		/**修改配置*/
		upConfs: function() {
			var that = this;
			if (parseInt(this.old_mode)==0){
				var data = {};
				data.mode =  parseInt(this.mode); //运行模式
				data.device_id = this.devId; //设备ID
				data.ssid = this.ssid; //WiFi热点名称
				data.direction =  parseInt(this.direction); //红外传感器安装key
				data.pic =  parseInt(this.picMode); //现场图片上传模式配置
				data.mnc =  parseInt(this.mnc); //通信运营商配置
				data.ir_type =  parseInt(this.ir_type);
				if (parseInt(this.old_mode) != parseInt(this.mode)) {
					this.$confirm('模式修改之后设备将会重新启动, 是否继续?', '系统运行模式', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						that.upIndex(data);
					}).catch(() => {});
				} else {
					this.upIndex(data);
				}
			} else {
				this.upMode();
			}
		},
		/**安装模式下运行程序*/
		upIndex: function(data) {
			var that = this;
			this.$https.get(that.$config.upIndex(), data, function(res) {
				if (res.success) {
					that.$utils.showTips(that,1);
				} else {
					that.$utils.showTips(that,0);
				}
			})
		},
		/**
		 *工作模式运行程序
		 */
		upMode:function() {
			var that = this;
			that.$confirm('模式修改之后设备将会重新启动, 是否继续?', '系统运行模式', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				that.$https.get(that.$config.upMode(), {
					mode: parseInt(that.mode)
				}, function(res) {
					if (res.success) {
						that.$utils.showTips(that,1);
					} else {
						that.$utils.showTips(that,0);
					}
				})
			}).catch(() => {});
		},
	},
}
