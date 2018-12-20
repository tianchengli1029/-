<!-- 加速度计参数配置 -->
<template>
  <div class="content">
		<div class="box-de">
			<div class="top-box">
				<h4>运行实时状态</h4>
				<div class="i-textarea">
					<div class="i-label">
						<textarea rows="8" v-model="calibStatus" disabled="disabled"></textarea>
					</div>
				</div>
			</div>
		</div>
    <div class="edit-item">
    	<label class="label-title">启动加速度超标阈值
    		<input type="text" name="acc_start_th" v-model="start" placeholder="请输入"/><span>m/s²</span>
    	</label>
    </div>
		<div class="edit-item">
			<label class="label-title">停止加速度超标阈值
				<input type="text" name="acc_stop_th" v-model="stop" placeholder="请输入"/><span>m/s²</span>
			</label>
		</div>
		<div class="edit-item">
			<label class="label-title">轿厢异常滑动阈值
				<input type="text" name="acc_move_th" v-model="move" placeholder="请输入"/><span>m/s²</span>
			</label>
		</div>
		<div class="edit-item">
			<label class="label-title">轿厢异常振动水平振动阈值
				<input type="text" name="acc_hor_th" v-model="hor" placeholder="请输入"/><span>m/s²</span>
			</label>
		</div>
		<div class="edit-item">
			<label class="label-title">设置量程和采样频率
					<!-- 量程 -->
				<select name="acc_range" id="acc_range" class="input-select" v-model="selectedRange"
				>
					<option v-for="item in options" :value="item.value" :key="item.value" v-html="item.text"></option>
				</select>
				<!-- 频率 -->
				<select name="acc_rate" id="acc_rate" v-model="selectedRate" class="input-select">
					<option v-for="item in options2" :value="item.value" :key="item.value" v-html="item.text"></option>
				</select>
			</label>
		</div>
		<div class="box-btn">
			<button class="big-btn" type="button" @click="upAccFaultList()">提交</button>
		</div>
  </div>
</template>
<script src="../js/manage/acc_fault.js"></script>
<style scoped>
 input{
 	width: 25%;
 }
</style>