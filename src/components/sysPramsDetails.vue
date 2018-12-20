<template>
  <div class="content tabs-content">
    <div class="box">
    	<!-- 电梯配置数据信息 -->
    	<div class="test-tilte">
    		<p class="text">电梯配置数据信息</p>
    	</div>
    	<div class="test-body table-box">
    		<table>
    				<tbody>
    						<tr>
    								<th width="50%">额定速度</th>
    								<td colspan="3"><span id="n_sp">-</span></td>
    						</tr>
    						<tr>
    								<th width="50%">总楼层数</th>
    								<td colspan="3"><span id="max_floor">-</span></td>
    						</tr>
    						<tr>
    								<th width="50%">楼层号</th>
    								<td colspan="3"><span id="floor_label">-</span></td>
    						</tr>
    						<tr>
    								<th width="50%">层间高度</th>
    								<td colspan="3"><span id="floor_height">-</span></td>
    						</tr>
    						<tr>
    								<th width="50%">特殊楼层高度</th>
    								<td colspan="3">
											<span v-if="accObj.specialfhList && accObj.specialfhList.length==0">-</span>
											<ul v-else>
												<li v-for="arr in accObj.specialfhList">
													<span style="margin-right: 10px;">{{arr.floor}}</span><span>{{arr.height}}</span>
												</li>
											</ul>
    								</td>
    						</tr>
    						<tr>
    								<th width="50%">校准楼层号</th>
    								<td colspan="3"><span id="reset_floor_num">-</span></td>
    						</tr>
    						<tr>
    								<th width="50%">固定待楼梯层</th>
    								<td colspan="3"><span id="fixed_wait_floor">-</span></td>
    						</tr>
    						<tr ref="wait" style="display: none;">
    								<th width="50%">待楼梯层号</th>
    								<td colspan="3"><span id="wait_stop_floor">-</span></td>
    						</tr>
    						<tr>
    								<th width="50%">长时间关人预警时间</th>
    								<td colspan="3"><span id="lock_time">-</span></td>
    						</tr>
    						<tr>
    								<th width="50%">开门异常预警次数</th>
    								<td colspan="3"><span id="door_open_warn_num">-</span></td>
    						</tr>
    						<tr>
    								<th width="50%">门移动异常预警时间</th>
    								<td colspan="3"><span id="door_action_exception_time">-</span></td>
    						</tr>
    						<tr>
    								<th width="50%">电梯超速预警比例值</th>
    								<td colspan="3"><span id="over_high_speed_warn">-</span></td>
    						</tr>
    				</tbody>
    		</table>
    	</div>
		</div>
		<div class="box">
			<!-- 电梯配置数据信息 -->
			<div class="test-tilte">
				<p class="text">加速度计参数</p>
			</div>
			<div class="test-body table-box">
				<table>
						<tbody>
								<tr>
										<th width="50%">启动加速度超标阈值</th>
										<td colspan="3"><span id="acc_start_th">-</span></td>
								</tr>
								<tr>
										<th width="50%">停止加速度超标阈值</th>
										<td colspan="3"><span id="acc_stop_th">-</span></td>
								</tr>
								<tr>
										<th width="50%">轿厢异常滑动阈值</th>
										<td colspan="3"><span id="acc_move_th">-</span></td>
								</tr>
								<tr>
										<th width="50%">轿厢异常水平振动阈值</th>
										<td colspan="3"><span id="acc_hor_th">-</span></td>
								</tr>
								<tr>
										<th width="50%">轿厢异常垂直振动阈值</th>
										<td colspan="3"><span id="acc_ver_th">-</span></td>
								</tr>
								<tr>
										<th width="50%">加速度计量程</th>
										<td colspan="3"><span id="acc_range">-</span></td>
								</tr>
								<tr>
										<th width="50%">加速度计采样频率</th>
										<td colspan="3"><span id="acc_rate">-</span></td>
								</tr>
						</tbody>
				</table>
			</div>
		</div>
	</div>
</template>
<script src="../js/manage/sys_details.js"></script>