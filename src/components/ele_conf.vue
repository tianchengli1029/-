<!-- 故障检测参数配置 -->
<template>
  <div class="content">
		<div class="edit-item">
			<label class="label-title">额定速度
				<input type="text" name="n_sp" v-model="n_sp" placeholder="请输入"/><span>米/秒</span>
			</label>
		</div>
		<div class="edit-item">
			<label class="label-title">总楼层数
				<input type="text" name="max_floor" v-model="max_floor" placeholder="请输入"/>
			</label>
			<b>[最底层编号为1，向上逐层加1]</b>
		</div>
		<div class="edit-item">
			<label  class="label-title">楼层号输入
				<input @input="isFloorLabel(floor_label,max_floor)" type="text" name="floor_label" v-model="floor_label" placeholder="请输入"/>
			</label>
			<b>输入格式：-2~-1,b,a,3~5,m&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:red;">务必从最底层开始向上逐层编号</span></b>
			<p class="error-tip" v-html="errorSumLc"></p>
		</div>
		<div class="edit-item">
			<label class="label-title">层间高度
				<input type="text" name="floor_height" v-model="floor_height" placeholder="请输入"/><span>厘米</span>
			</label>
		</div>
		<div class="edit-item">
			<label class="label-title" @click="addFloorHeight">特殊楼层高度
					<img class="pic" src="../../dist/static/images/add.png">
			</label>
			<b  v-if="tsFloorList.length!==0">输入格式：-2~-1,b,a,3~5,m</b>
			<p class="error-tip" v-html="errorSumTs"></p>
			<div class="edit-child-item" :class="show" v-for="(item,index) in tsFloorList">
				<div class="left">
					<label>特殊楼层号
						<input class="left-input" name="tsfloor" type="text" placeholder="请输入" @input="isInputFloor(item.floor,'ts')" v-model="item.floor"/>
					</label>
					<label>高度
						<input class="left-input1" name="tsfloorh" type="text" placeholder="请输入" v-model="item.height"/><span>厘米</span>
					</label>
				</div>
				<div class="right"  @click="jianFloorHeight(index)" >
					<img src="../../dist/static/images/jian.png" alt="移除特殊楼层"/>
				</div>
			</div>
		</div>
		<div class="edit-item">
			<label class="label-title">长时间关人预警时间
				<input type="text" name="lock_time" v-model="lock_time" placeholder="请输入"/><span>秒</span>
			</label>
		</div>
		<div class="edit-item">
			<label class="label-title">停梯开/关门预警时间
				<input type="text" name="s_open_time" v-model="s_open_time" placeholder="请输入"/><span>秒</span>
			</label>
		</div>
		<div class="edit-item">
			<label class="label-title">开门异常预警次数
				<input type="text" name="door_open_warn_num" v-model="door_open_warn_num" placeholder="请输入"/>
			</label>
		</div>
		<div class="edit-item">
			<label class="label-title">门移动异常预警时间
				<input type="text" name="door_action_exception_time" v-model="door_action_exception_time" placeholder="请输入"/><span>秒</span>
			</label>
		</div>
		<div class="edit-item">
			<label class="label-title">校准楼层号
				<input type="text" @input="isInputFloor(reset_floor_num,'xz')"  name="reset_floor_num" v-model="reset_floor_num" placeholder="请输入"/>
			</label>
			<p class="error-tip" v-html="errorSumXz"></p>
		</div>	
		<div class="edit-item">
			<label class="label-title">电梯超速预警比例值
				<input type="text" name="over_high_speed_warn" v-model="over_high_speed_warn" placeholder="请输入"/><span>秒</span>
			</label>
		</div>	
		<div class="edit-item">
			<label class="label-title">固定待梯楼层</label>
			<label for="fixed_wait_floor" @click="isFixedWait(1)" class="input-radio">
				<span class="radio-text">有</span>
				<input type="radio" name="fixed_wait_floor" class="a-radio"  v-bind:value="1"  id="fixed_wait_floor" v-model="fixed_wait_floor">
				<span class="b-radio"></span>
			</label>
			<label for="fixed_wait_floor1" @click="isFixedWait(0)" class="input-radio">
				<span class="radio-text">无</span>
				<input class="a-radio" type="radio" name="fixed_wait_floor" v-bind:value="0"   id="fixed_wait_floor1" v-model="fixed_wait_floor">
				<span class="b-radio"></span>
			</label>
		</div>	
		<div class="edit-item" ref='dtfloor' style="display: none;">
			<label class="label-title">待梯楼层号
				<input type="text" name="wait_stop_floor" v-model="wait_stop_floor" @input="isInputFloor(wait_stop_floor,'dt')" placeholder="请输入"/>
			</label>
		</div>
		<div class="box-btn">
			<button class="big-btn" type="button" @click="upEleList()">提交</button>
		</div>
  </div>
</template>
<script src="../js/manage/ele_conf.js"></script>
<style scoped>
	.edit-item label.label-title input{
		width: 40%;
	}
</style>
