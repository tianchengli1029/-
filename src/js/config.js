/**
 * 请求路径.js
 */
const config = {
	host : function() {
			return "/conf";
	},
	hostcgi : function() {
			return "/cgi-bin";
	},
	wsurl:function(){
	 		return "ws://" + document.domain + ":"; 
	},
	/**
	 * 
	 * @returns {获取系统模型配置}
	 */
	getSysModeUrl : function() {
		return config.host() + "/config.data";
	},
	/**
	 * 
	 * @returns {获取系统模型配置}
	 */
	getPicModeUrl : function() {
		return config.host() + "/controller.conf";
	},
	/**
	 * 
	 * @returns {获取wifi热点名称配置}
	 */
	getSSID : function() {
		return  config.host() + "/wilc_hostapd.conf";
	},
	/**
	 * 
	 * @returns {获取实时状态}
	 */
	getDispStatusUrl : function() {
		return config.host() + "/rt_disp";
	},
	/**
	 * 
	 * @returns {获取电梯实时电梯检测状态 0:静止 1:开始}
	 */
	getSpeedStatusUrl : function() {
		return config.host() + "/result_verify.data";
	},
	/**
	 * 
	 * @returns {获取运营商状态 MOBILE:中国移动 UNICOM:中国联通}
	 */
	getMncUrl : function() {
		return config.host() + "/mnc.conf";
	},
	
	/**
	 * 
	 * @returns {轿厢内照明状态 0:不正常 1:正常}
	 */
	getLightUrl : function() {
		return config.host() + "/rt_value";
	},
	/**
	 * 
	 * @returns {获取网络强度}
	 */
	getCsqStatusUrl : function() {
		return config.host() + "/csq_status.data";
	},
	/**
	 * 修改加速度参数
	 */
	upAccFaultList : function(){
		return config.hostcgi() +'/acc_fault.cgi';
	},
	/**
	 * 修改安装模式和工作模式
	 */
	upMode:function(){
		return config.hostcgi() +'/mode.cgi';
	},
	/**
	 * 修改运营商
	 */
	upMnc:function(){
		return config.hostcgi() +'/yys.cgi';
	},
	/**
	 * 修改系统ID设置
	 */
	upDeviceId:function(){
		return config.hostcgi() +'/device_id.cgi';
	},
	/**
	 * 修改系统安装方向设置
	 */
	upDirctionMode:function(){
		return config.hostcgi() +'/dirction.cgi';
	},
	/**
	 * 修改系统图片上传设置
	 */
	upPicMode:function(){
		return config.hostcgi() +'/pic_conf.cgi';
	},
	/**
	 * 修改系统配置参数
	 */
	upEleList:function(){
		return config.hostcgi() +'/configure.cgi';
	},
	/**
	 * 加速度计开始标定
	 */
	startAcc:function(){
		return config.hostcgi()+'/acc_start.cgi';
	},
	/**
	 * 加速度计取消标定
	 */
	stopAcc:function(){
		return config.hostcgi()+'/acc_stop.cgi';
	},
	/**
	 * 井道误检测试开始
	 */
	startFloor:function(){
		return config.hostcgi()+'/floor_start.cgi';
	},
	/**
	 * 井道误检测试结束
	 */
	stopFloor:function(){
		return config.hostcgi()+'/floor_stop.cgi';
	},
	/**
	 * 靶标安装验证
	 */
	startVerify:function(){
		return config.hostcgi()+'/verify_start1.cgi';
	},
	/**
	 * 井道声强标定开始
	 */
	startSound:function(){
		return config.hostcgi()+'/sound_start.cgi';
	},
	/**
	 * 井道声强标定结束
	 */
	stopSound:function(){
		return config.hostcgi()+'/sound_stop.cgi';
	},
	/**
	 * 靶标标定开始
	 */
	startRunTime:function(){
		return config.hostcgi()+'/runtime_start.cgi';
	},
	/**
	 * 靶标标定结束
	 */
	stopRunTime:function(){
		return config.hostcgi()+'/runtime_stop.cgi';
	},
	/**
	 * 靶标标定结果查询
	 */
	resultRunTime:function(){
		return config.host()+'/run_time.conf';
	},
	/**
	 * 靶标标定结果验证
	 */
	startVerify2:function(){
		return config.hostcgi()+'/verify_start2.cgi';
	},
	/**
	 * 重置为出厂状态
	 */
	resetSys:function(){
		return config.hostcgi()+'/reset.cgi';
	},
	/**
	 * 实时检测查看
	 */
	runStatus:function(){
		return config.hostcgi()+'/run_status.cgi';
	},
	/**
	 * 获取实时检测查看
	 */
	getResVerify:function(){
		return config.host()+'/result_verify.data';
	},
	/**
	 * 传感器检测开始
	 */
	startSensor:function(){
		return config.hostcgi()+'/sensor_check.cgi';
	},
	/**
	 * 传感器检测结束
	 */
	stopSensor:function(){
		return config.hostcgi()+'/sensor_check.cgi';
	},
	carTop:function(){
		return config.hostcgi()+'/car_top_config.cgi';
	},
	//获取实时数据查看
	getDoorStatus:function(){
		return config.wsurl()+"8889";
	},
	//获取gpio_status
	getGpioStatusUrl:function(){
		return config.wsurl()+"8888";
	},
	//获取2G网络状态
	get2gNetWork:function(){
		return config.hostcgi()+'/2g_network.cgi';
	},
	//获取存储空间状态
	getFlashInfo:function(){
		return config.hostcgi()+'/flash_info.cgi';
	},
	// 关键任务运行状态
	getProcessInfo:function(){
		return config.hostcgi()+'/process_info.cgi';
	},
	//修改首页信息
	upIndex:function(){
		return config.hostcgi()+'/index.cgi';
	},
	// 获取特殊楼层
	getSpecialHeights(){
		return config.host()+'/special_heights.conf';
	},
}
export default config;