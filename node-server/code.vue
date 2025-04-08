<template>
	<el-form labelPosition="top">
		<el-row :gutter="16">
			<el-col :span="4">
				<el-form-item label="名称">
					<el-input v-model="form.name" />
				</el-form-item>
			</el-col>
			<el-col :span="4">
				<el-form-item
					label="年龄"
					:required="true">
					<el-input-number v-model="form.age" />
				</el-form-item>
			</el-col>
			<el-col :span="4">
				<el-form-item
					label="是否已经工作"
					:required="true">
					<el-switch
						v-model="form.hasWork"
						:value="false"
						:disabled="false"
						activeText="是"
						inactiveText="否"
						:activeValue="true"
						:inactiveValue="false" />
				</el-form-item>
			</el-col>
		</el-row>
	</el-form>
</template>
<script>
	export default {
		data() {
			return { form: { name: '', age: '', hasWork: false } }
		}
	}
</script>
<style lang="less" scoped></style>
