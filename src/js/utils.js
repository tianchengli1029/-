/**
 *常用工具包.js
 */
const utils = {
	//检测是否为中文，true表示是中文，false表示非中文
	isChinese: function (str) {
		if (/^[\u3220-\uFA29]+$/.test(str)) {
			return true;
		} else {
			return false;
		}
	},
	//验证只能输入数字和小数点
	isNumberPoint:function(value){
		var reg = /^\d+(?=\.{0,1}\d+$|$)/.test(value);
		if(reg){
			return true;
		}else{
			return false;
		}
	},
	//匹配任何空白字符，包括空格、制表符、换页符等等  替换为空字符
	isEmptyStr:function(value){
		var str = "";
		if(value!=""&&value!="undefined"&&value!=null){
			var reg = /\s/g;
			str = value.replace(reg, "");
			return str;
		}else{
			return str;
		}
	},
	isValidStr:function(str){
		if(str!=""||str!=null||str.length!=0||str=="undefined"){
			return str;
		}else{
			return "-";
		}
	},
	//判断是否是空对象
	isEmptyObject:function(obj){
		for(let arr in obj){
			return true;
		}
		return false;
	},
	//解析ini文件return：object
	parseINIString: function (data) {
		var regex = {
			section: /^\s*\[\s*([^]*)\s*\]\s*$/,
			param: /^\s*([\w\.\-\_]+)\s*=\s*(.*?)\s*$/,
			comment: /^\s*;.*$/
		};
		var value = {};
		var lines = data.split(/\r\n|\r|\n/);
		var section = null;
		lines.forEach(function (line) {
			if (regex.comment.test(line)) {
				return;
			} else if (regex.param.test(line)) {
				var match = line.match(regex.param);
				if (section) {
					value[section][match[1]] = match[2];
				} else {
					value[match[1]] = match[2];
				}
			} else if (regex.section.test(line)) {
				var match = line.match(regex.section);
				value[match[1]] = {};
				section = match[1];
			} else if (line.length == 0 && section) {
				section = null;
			}
		});
		return value;
	},
	//格式化日期
	formartDate:function(param) {
		if(param){
			let date = new Date(param);
			Y = date.getFullYear() + '-';
			M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) + '-' : date.getMonth() + 1 + '-';
			D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
			h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
			m = date.getMinutes()  < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
			s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
			return Y + M + D + h + m + s;
		}
	},
	/**
	 * @return  0修改失败 1 修改成功 2 提示信息
	 */
	showTips:function(that,type,tips){
		var msg = "",typeStr="";
		if(tips==undefined){
			msg = (type==1?"修改成功":"修改失败");
		}else{
			msg = tips;
		}
		switch (type){
			case 0://修改失败 error
				typeStr = 'error';
				break;
			case 1://修改成功 success
				typeStr = 'success';
				break;
			case 2://提示信息 warning
				typeStr = 'warning';
				break;	
		}
		that.$message({
			type: typeStr,
			message:msg
		})
	}
}
export default utils;