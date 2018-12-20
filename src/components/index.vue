<template>
  <div class="content">
		<!-- 运行模式配置 -->
		<div class="box">
			<h4 class="top-head">运行模式配置</h4>	
			<div class="center-body">
				<input type="hidden" name="old_mode" v-model="old_mode"/>
				<div class="radio-inner">
					<label for="rdo0">
						<span class="radio-text">安装模式</span>
						<input type="radio" class="a-radio" name="mode" id="rdo0" v-model="mode" value="0" />
						<span class="b-radio"></span>
					</label>
				</div>
				<div class="radio-inner">
					<label for="rdo1">
						<span class="radio-text">工作模式</span>
						<input type="radio" class="a-radio" name="mode" id="rdo1" v-model="mode" value="1" />
						<span class="b-radio"></span>
					</label>
				</div>
			</div>
			<h5 class="bot-info">注意：模式修改之后设备将会重新启动</h5>
		</div>
		<!-- 设备ID配置 -->
		<div class="box" ref="dis">
			<h4 class="top-head">设备ID配置</h4>	
			<div class="center-body">
				<div class="radio-inner">
					<div class="item">
						<p class="input-left">设备ID</p>
						<div class="input-right">
							<input placeholder="请输入" type="text" name="device_id" id="device_id" v-model="devId">
						</div>
					</div>		
				</div>
			</div>
			<h5 class="bot-info">注意：设备ID请参见机壳电源侧条码</h5>
		</div>
		<!-- wifi热点名称配置 -->
		<div class="box" ref="dis">
			<h4 class="top-head">wifi热点名称配置</h4>	
			<div class="center-body">
				<div class="radio-inner">
					<div class="item">
						<p class="input-left">wifi热点名称</p>
						<div class="input-right">
							<input placeholder="请输入" type="text" name="ssid" id="ssid" v-model="ssid">
						</div>
					</div>		
				</div>
			</div>
		</div>
		<!-- 红外传感器安装位置配置 -->
		<div class="box" ref="dis">
			<h4 class="top-head">红外传感器安装位置配置</h4>	
			<div class="center-body">
				<div class="radio-inner">
					<label for="dir0">
						<span class="radio-text">左侧安装</span>
						<input type="radio" class="a-radio" name="direction" id="dir0" v-model="direction" value="0" />
						<span class="b-radio"></span>
					</label>
				</div>
				<div class="radio-inner">
					<label for="dir1">
						<span class="radio-text">右侧安装</span>
						<input type="radio" class="a-radio" name="direction" id="dir1" v-model="direction" value="1" />
						<span class="b-radio"></span>
					</label>
				</div>
			</div>
			<h5 class="bot-info">注意：红外板正对靶标，判断复位传感器左右位置</h5>
		</div>
		<!-- 红外传感器类型 -->
		<div class="box" ref="dis">
			<h4 class="top-head">红外传感器类型</h4>	
			<div class="center-body">
				<div class="radio-inner">
					<label for="ir_type1">
						<span class="radio-text">条形模块</span>
						<input type="radio" class="a-radio" name="ir_type" id="ir_type1" v-model="ir_type" value="0" />
						<span class="b-radio"></span>
					</label>
				</div>
				<div class="radio-inner">
					<label for="ir_type2">
						<span class="radio-text">方形模块</span>
						<input type="radio" class="a-radio" name="ir_type" id="ir_type2" v-model="ir_type" value="1" />
						<span class="b-radio"></span>
					</label>
				</div>
			</div>
		</div>
		<!-- 现场图片上传模式配置 -->
		<div class="box" ref="dis">
			<h4 class="top-head">现场图片上传模式配置</h4>	
			<div class="center-body">
				<div class="radio-inner">
					<label for="pic0">
						<span class="radio-text">按需上传</span>
						<input type="radio" class="a-radio" name="pic" id="pic0" v-model="picMode" value="0" />
						<span class="b-radio"></span>
					</label>
				</div>
				<div class="radio-inner">
					<label for="pic1">
						<span class="radio-text">立即上传</span>
						<input type="radio" class="a-radio" name="pic" id="pic1" v-model="picMode" value="1" />
						<span class="b-radio"></span>
					</label>
				</div>
			</div>
		</div>
		<!-- 通信运营商配置 -->
		<div class="box" ref="dis">
			<h4 class="top-head">通信运营商配置</h4>	
			<div class="center-body">
				<div class="radio-inner">
					<label for="rmobile">
						<span class="radio-text">中国移动（手机卡、物联网卡）</span>
						<input type="radio" class="a-radio" name="mobile" id="rmobile" v-model="mnc" value="0" />
						<span class="b-radio"></span>
					</label>
				</div>
				<div class="radio-inner">
					<label for="rmobile1">
						<span class="radio-text">中国联通移动卡</span>
						<input type="radio" class="a-radio" name="mobile" id="rmobile1" v-model="mnc" value="1" />
						<span class="b-radio"></span>
					</label>
				</div>
				<div class="radio-inner">
					<label for="rmobile2">
						<span class="radio-text">中国联通物联网卡</span>
						<input type="radio" class="a-radio" name="mobile" id="rmobile2" v-model="mnc" value="2" />
						<span class="b-radio"></span>
					</label>
				</div>
			</div>
		</div>
		<div class="box-btn">
			<button class="big-btn" type="button" @click="upConfs()">提交</button>
		</div>
  </div>
</template>
<script src="../js/manage/index.js"></script>