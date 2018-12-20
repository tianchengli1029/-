<template>
	<!-- 实时数据查看 -->
	<div class="content">
		<div class="box">
			<div class="test-tilte">
				<p class="text">实时数据信息</p>
			</div>
			<div class="table-box" style="padding:0 0px 10px 22px;">
				<table>
					<tbody>
						<tr>
							<th width="25%">楼层号</th>
							<td width="25%"><span id="floor_num">{{floor_num}}</span></td>
							<th width="25%">速度</th>
							<td width="25%"><span id="speed">{{speed}}</span></td>
						</tr>
						<tr>
							<th width="25%">门状态</th>
							<td width="25%"><span id="door_status">{{door_status}}</span></td>
							<th width="25%">方向</th>
							<td width="25%"><span id="fangxiang">{{fangxiang}}</span></td>
						</tr>
						<tr>
							<th width="25%">故障码</th>
							<td width="25%"><span id="fault_code">{{fault_code}}</span></td>
							<th width="25%">平层偏差</th>
							<td width="25%"><span id="offset">{{offset}}</span></td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>
<script src="../js/manage/test_view.js"></script>
