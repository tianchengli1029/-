export default {
	/*获取系统模式 
	* 0:安装模式 1:工作模式
	*/
   getSysMode:function(that,callback){
	   that.$https.get(that.$config.getSysModeUrl(), null, function (res) {
	   	var sysmode = that.$utils.parseINIString(res).elevator_para_config;
	   	callback(sysmode.mode);
	   });
   },
   /*
   *获取运行状态
   */
   getRuntimeStatus:function(that,callback){
	   var txt = [];
	   that.$https.get(that.$config.getDispStatusUrl(),null,function (res) {
	   	if (res) {
	   		var $r = /.+/g;
	   		var $a = res.match($r);
	   		for (var i = 0; i < $a.length; i++) {
	   			txt.push($a[i] + "\r\n");
	   		}
	   		callback(txt.reverse().join(''));
	   	}
	   })
   },
}