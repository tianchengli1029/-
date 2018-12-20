<style lang="scss"></style>
<template>
	<div id="app" class="app">
		<nav class="nav">
			<h4>系统配置</h4>
			<div class="nav-right" @click="getNavList()">
				<div class="nav-cion">
					<img alt="导航菜单" src="../static/images/nav-cion.png"/>
				</div>	
			</div>
			<div v-show="navListShow" class="nav-list">
				<ul>
					<li v-for="(arr,index) in navList">
						<template v-if="arr.isFlag==false" >
							<a @click="navTo(arr.url)" class="nav-item">
								<div class="nav-pic-box">
									<div class="nav-pic" ><img :alt="arr.name" src="../static/images/sys_setting.png"/></div>
								</div>
								<span>{{arr.name}}</span>
							</a>
						</template>
						<template v-if="arr.isFlag==true">
							<a class="nav-item" @click="getNavChildrenList()">
								<div class="nav-pic-box">
									<div class="nav-pic" ><img :alt="arr.name" src="../static/images/sys_setting.png"/></div>
								</div>
								<span>{{arr.name}}</span>
							</a>
							<ul class="nav-child-item on">
								<li v-for="childList in arr.children">
									<a @click="navTo(childList.url)" class="nav-item">
										<span>{{childList.name}}</span>
									</a>
								</li>
							</ul>
						</template>						
					</li>
				</ul>
			</div>
		</nav>
		<div class="container">
			<router-view />
		</div>
		<footer class="copy">
			Copyright &copy; 长沙慧联智能科技有限公司
		</footer>
	</div>
</template>

<script>
	export default {
		name: 'App',
		data() {
			return {
				isDisable:true,
				navListShow:false,
				style: "on",
				navList:[
					{
						name:"系统配置",
						url:"/",
						isFlag:false,
					},
					{
						name:"参数配置",
						url:"",
						isFlag:true,
						children:[
							{
								name:"故障检测参数配置",
								url:"/ele_conf"
							},
							{
								name:"加速度计参数配置",
								url:"/acc_fault"
							},
							{
								name:"参数详情",
								url:"/sysPramsDetails"
							}
						]
					},
					{
						name:"系统标定",
						url:"",
						isFlag:true,
						children:[
							{
								name:"传感器检测",
								url:"/data_de_5"
							},
							{
								name:"井道误检测试",
								url:"/data_de_1"
							},
							{
								name:"靶标安装验证",
								url:"/data_de"
							},
							{
								name:"井道声强标定",
								url:"/data_de_2"
							},
							{
								name:"加速度计标定",
								url:"/data_de_3"
							},
						]
					},
					
					{
						name:"设备状态查看",
						url:"/data_status_check",
						isFlag:false
					},
					{
						name:"实时数据查看",
						url:"/test_view",
						isFlag:false
						
					}
				]
			}
		},
		methods: {
			aboutClick: function() {
				if(this.isDisable==true){
					this.isDisable = false;
					this.style = "down-prop";
				}else{
					this.isDisable = true;
					this.style = "on";
				}
			},
			navTo:function(url){
				this.navListShow = !this.navListShow;
				var e = event.currentTarget;
				var renList1 = e.parentElement.getElementsByTagName("ul");
				if(renList1.length==0){
					var list = e.parentElement.parentElement.getElementsByTagName("ul");
					for(var i=0;i<list.length;i++){
						if(list[i].children.length>1){
							list[i].className = "on";
						}
					}
				}
				var renlist2= e.offsetParent.getElementsByTagName("span");
				for(var i=0;i<renlist2.length;i++){
					renlist2[i].className = "";
				}
				if(e.children.length>1){
					e.children[1].className = "active";
				}else{
					e.children[0].className = "active";
				}
 				this.$router.push(url);
			},
			getNavList:function(){
				this.navListShow = !this.navListShow;
			},
			getNavChildrenList:function(){
				var e = event.currentTarget;
				var className = e.nextElementSibling.className;
				var renlist = e.parentNode.parentNode.children;
				for(var i=0;i<renlist.length;i++){
					if(renlist[i].children.length>1){
						renlist[i].getElementsByTagName("ul")[0].className = "on";
					}
				}
				if(className!=""){
					e.nextElementSibling.className= "";
				}else{
					e.nextElementSibling.className = "on";
				}
			}
		}
	}
</script>