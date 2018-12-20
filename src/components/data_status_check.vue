<!-- 设备状态查看 -->
<template>
	<div class="content">
		<div class="box">
			<!-- 电梯配置数据信息 -->
			<div class="test-tilte">
				<p class="text">电梯配置数据信息</p>
			</div>
			<div class="test-body table-box">
				<table>
					<tbody>
						<tr>
							<th>Wifi热点名称</th>
							<td colspan="3">{{isValidStr(ssid)}}</td>
						</tr>
						<tr>
							<th>设备ID</th>
							<td colspan="3">{{isValidStr(deviceID)}}</td>
						</tr>
					</tbody>
				</table>
			</div>
			<!--传感器状态  -->
			<div class="test-tilte">
				<p class="text">传感器状态</p>
			</div>
			<div class="test-body table-box">
				<table>
					<tbody>
						<tr>
							<th width="35%">红外传感器1</th>
							<td v-html="gpioObj.gpio1"></td>
							<th width="35%">红外传感器2</th>
							<td v-html="gpioObj.gpio2"></td>
						</tr>
						<tr>
							<th width="35%">红外传感器3</th>
							<td colspan="3" v-html="gpioObj.gpio3"></td>
						</tr>
						<tr>
							<th width="35%">开门到位开关</th>
							<td v-html="gpioObj.gpio134"></td>
							<th width="35%">关门到位开关</th>
							<td v-html="gpioObj.gpio138"></td>
						</tr>
						<tr>
							<th width="35%">人感检测</th>
							<td v-html="gpioObj.people_sense"></td>
							<th width="35%">轿厢内照明状态</th>
							<td v-html="gpioObj.light"></td>
						</tr>
						<tr>
							<th width="35%">电源状态</th>
							<td colspan="3" v-html="gpioObj.source"></td>
						</tr>
						<tr>
							<th width="35%">紧急按钮开关</th>
							<td v-html="gpioObj.gpio4"></td>
							<th width="35%">维保开关</th>
							<td v-html="gpioObj.gpio137"></td>
						</tr>
					</tbody>
				</table>
			</div>
			<!--网络状态  -->
			<div class="test-tilte">
				<p class="text">网络状态</p>
			</div>
			<div class="test-body table-box">
				<table>
					<tbody>
						<tr>
							<th>2G信号强度</th>
							<td colspan="3">{{isValidStr(netObj.csq_2g)}}</td>
						</tr>
						<tr>
							<th>2G拨号</th>
							<td>
								<div class="net-pic">
									<img v-if="netObj.isFlag1==true" src="../../static/images/success.png" />
									<img v-if="netObj.isFlag1==false" src="../../static/images/error.png" />
									<span v-else>--</span>
								</div>
							</td>
							<th>云端服务器可达性</th>
							<td>
								<div class="net-pic">
									<img v-if="netObj.isFlag2==true" src="../../static/images/success.png" />
									<img v-if="netObj.isFlag2=false" src="../../static/images/error.png" />
									<span v-else>--</span>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<!-- 存储空间状态 -->
			<div class="test-tilte">
				<p class="text">存储空间状态</p>
			</div>
			<div class="test-body table-box">
				<p class="text">
					SD卡：{{isValidStr(sdObj.stor)}}
				</p>
				<!-- SD卡分区信息 -->
				<table ref="sd" style="display: none;">
					<tbody>
						<tr>
							<th>SD卡分区名</th>
							<th>总空间</th>
							<th>已使用</th>
						</tr>
						<tr>
							<td>循环视频</td>
							<td>{{isValidStr(sdObj.nv_total)}}</td>
							<td><span>{{isValidStr(sdObj.nv_used)}}</span><span>{{isValidStr(sdObj.nv_use_ratio)}}</span></td>
						</tr>
						<tr>
							<td>故障视频</td>
							<td><span id="fv_total">{{isValidStr(sdObj.fv_total)}}</span></td>
							<td><span id="fv_used">{{isValidStr(sdObj.fv_used)}}</span><span id="fv_use_ratio">{{isValidStr(sdObj.fv_use_ratio)}}</span></td>
						</tr>
						<tr>
							<td>故障图片</td>
							<td><span id="fp_total">{{isValidStr(sdObj.fp_total)}}</span></td>
							<td><span id="fp_used">{{isValidStr(sdObj.fp_used)}}</span><span id="fp_use_ratio">{{isValidStr(sdObj.fp_use_ratio)}}</span></td>
						</tr>
						<tr>
							<td>紧急图片</td>
							<td><span id="ep_total">{{isValidStr(sdObj.ep_total)}}</span></td>
							<td><span id="ep_used">{{isValidStr(sdObj.ep_used)}}</span><span id="ep_use_ratio">{{isValidStr(sdObj.ep_use_ratio)}}</span></td>
						</tr>
					</tbody>
				</table>

				<!-- EMMC分区信息 -->
				<table ref="emmc" style="display: none;">
					<tbody>
						<tr>
							<th>EMMC分区名</th>
							<th>总空间</th>
							<th>已使用</th>
						</tr>
						<tr>
							<th>故障音频</th>
							<td><span id="audio_total">{{isValidStr(emmcObj.audio_total)}}</span></td>
							<td><span id="audio_used">{{isValidStr(emmcObj.audio_used)}}</span><span id="audio_use_ratio">{{isValidStr(emmcObj.audio_use_ratio)}}</span></td>
						</tr>
						<tr>
							<th>系统日志</th>
							<td><span id="log_total">{{isValidStr(emmcObj.log_total)}}</span></td>
							<td><span id="log_used">{{isValidStr(emmcObj.log_used)}}</span><span id="log_use_ratio">{{isValidStr(emmcObj.log_use_ratio)}}</span></td>
						</tr>
					</tbody>

				</table>
			</div>
			<!-- 关键任务运行状态 -->
			<div class="test-tilte">
				<p class="text">关键任务运行状态</p>
			</div>
			<div class="test-body table-box">
				<table class="table-bor">
					<thead>
						<tr>
							<th>CMD</th>
							<th>%CPU</th>
							<th>%MEM</th>
							<th>VSZ</th>
							<th>RSS</th>
						</tr>
					</thead>
					<tbody>
						<tr v-if="processList && processList.length==0">
							<td>暂无数据</td>
						</tr>
						<tr v-else v-for="obj in processList">
							<td>{{obj.CMD}}</td>
							<td>{{obj.CPU}}</td>
							<td>{{obj.MEM}}</td>
							<td>{{obj.VSZ}}</td>
							<td>{{obj.RSS}}</td>
						</tr>
					</tbody>
				</table>
			</div>
			<!-- 视频链接地址 -->
			<div class="test-tilte">
				<p class="text">视频链接地址</p>
			</div>
			<div class="test-body" @click="showVideo()">
				<a class="e-video" :href="videoUrl">点击链接查看视频</a>
			</div>
		</div>
	</div>
	</div>
</template>
<script src="../js/manage/data_status_check.js"></script>
