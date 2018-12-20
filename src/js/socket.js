var websock = null;
var global_callback = null;
const socket = {
	initWebSocket: function(url, wsName, callback) { //初始化weosocket
		//ws地址
		global_callback = callback;
		websock = new WebSocket(url, wsName);
		websock.onopen = socket.websocketonopen;
		websock.onerror = socket.websocketonerror;
		websock.onmessage = socket.websocketonmessage;
		websock.onclose = socket.websocketclose;
	},
	websocketonopen: function() {
		console.log("WebSocket连接成功");
	},
	websocketonerror: function(e) { //错误
		console.log("WebSocket连接发生错误");
	},
	websocketonmessage: function(msg) { //数据接收 
		console.log("socket message: " + msg.data);
		var obj = JSON.parse(msg.data);
		global_callback(obj);
	},
	websocketsend: function() { //数据发送 
		websock.send();
	},
	websocketclose: function() {
		console.log("connection closed socket");
	},
}
export default socket;