/* 
	实时数据查看.js
 */
export default {
	name:"test_view",
	data:function(){
		return {
			speed:"--",
			fangxiang:"--",
			floor_num:"--",
			offset:"--",
			fault_code:"--",
			door_status:"--"
		}
	},
	mounted: function() {
		//页面刚进入时开启长连接
		this.initWebSocket();
	},
	destroyed: function() {
		//页面销毁时关闭长连接
		this.$socket.websocketclose();
	},
	methods:{
		initWebSocket: function() {
			var that = this;
			this.$sys.getSysMode(this,function(res){
				if(res==0){
					that.$utils.showTips(that,2,"安装模式下，不能查看此数据！");
				}else if(res==1){
					that.$socket.initWebSocket(that.$config.getDoorStatus(), 'get_elv_run_status', function(doordata) {
						var speed = doordata.speed.toString();
						that.speed = speed.substring(1) + " (m/s)";
						var fxStr = "--";
						if(speed.charAt(0)=="-"){
							fxStr = '下';
						}else if(speed.charAt(0)=="+") {
							fxStr = '上';
						}else{
							fxStr = '--';
						}
						that.fangxiang = fxStr;
						that.floor_num = doordata.floor_num;
						that.offset = doordata.level_offset;
						that.fault_code ="0x"+doordata.fault_code.toString(16);
						var status = "--";
						if (doordata.door_stat == 0) {
							status="开门到位";
						} else if (doordata.door_stat == 1) {
							status="关门到位";
						} else if (doordata.door_stat == 2) {
							status="关门中";
						} else if (doordata.door_stat == 3) {
							status="开门中";
						} else {
							status="--";
						}
						that.door_status = status;
					});
				}
			})
		},
	}
}