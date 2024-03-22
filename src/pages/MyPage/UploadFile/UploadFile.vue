<template>
	<div>
		<div class="upload-container">
			<q-uploader
				no-thumbnails
				square
				flat
				bordered
				accept=".xlsx"
				class="upload-box"
				@added="isFileSet = true"
				@removed="isFileSet = false"
			>
				<template v-slot:header></template>
				<template v-slot:list="scope">
					<q-list separator class="upload-list file-list">
						<div v-if="scope.files.length === 0">
							<!-- // LABEL -->
							<div class="img-bg">
								<q-img src="./assets/upload-image.png" width="80px" />
							</div>
							<div class="text-22 text-semibold drop">Drag & drop files</div>
							<div class="text-16 text-accent-0 q-mt-md">Browse on your device</div>
						</div>
						<div v-else>
							<div class="img-bg">
								<q-img src="./assets/icon-excel-file.png" width="50px" />
							</div>
							<div class="text-22 text-semibold drop">
								{{ scope.files[0].name }}
							</div>
							<div class="text-16 text-accent-0 q-mt-md">Browse on your device</div>
						</div>
						<q-btn class="hidden" ref="clearBtn" @click="scope.removeFile(scope.files[0])">clear</q-btn>
						<q-btn class="hidden" ref="uploadBtn" @click="UploadTask(scope.files)">clear</q-btn>
						<q-uploader-add-trigger />
					</q-list>
				</template>
			</q-uploader>
		</div>
	</div>
</template>

<script src="./scripts/UploadFile.js"></script>

<style scoped lang="scss">
.onboarding-button {
	padding-left: 10%;
	padding-right: 10%;
}
.upload-box {
	border: none;
	outline: none;
	background: transparent;
}
.pm-dark-mode {
	.upload-list {
		border: dashed 1px #ffffff;
	}
}
.upload-list {
	border: dashed 1px black;
	border-radius: 10px;
	width: 100%;
	min-height: 100%;
	padding-bottom: 10px;
	.img-bg {
		width: 95%;
		justify-content: center;
		position: absolute;
		margin-top: 25px;
	}
	.drop {
		padding-top: 100px;
	}
	div {
		text-align: center;
		width: 100%;
	}
}
.btn-upload {
	display: flex;
	justify-content: center;
}
.file-list {
	max-height: 100%;
	overflow-y: auto;
}

.hidden {
	display: none;
}

@media only screen and (max-width: 767px) {
	.upload-box {
		width: 100%;
		min-height: 100%;
	}
	.upload-list {
		min-width: 100%;
	}
	.btn-upload {
		width: 100%;
	}
	.img-bg {
		margin-left: 0px;
	}
}

@media only screen and (min-width: 768px) {
	.upload-box {
		width: 100%;
		height: 100%;
	}
	.btn-upload {
		width: 100%;
	}
	.upload-list {
		width: 100%;
		min-height: 100%;
	}
}
</style>
