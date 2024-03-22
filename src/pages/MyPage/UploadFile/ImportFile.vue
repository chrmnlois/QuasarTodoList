<template>
	<transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" :duration="2000">
		<div class="import-task pm-text-primary">
			<!-- For Header of Import Task Page -->
			<div class="q-px-lg row">
				<div class="col-12 col-sm-6">
					<div class="bg-upload-light flex justify-center q-pa-lg rounded-borders">
						<div>
							<UploadFile ref="uploadComponent" />
							<p class="text-16 text-center q-mt-md q-mb-none">
								Note: Make sure you Import Task file is saved as a .xls or .xlsx file.
							</p>
						</div>
					</div>
				</div>
				<div :class="`col-12 col-sm-6 q-pa-lg ${$q.screen.width < 767 && 'align-center'}`">
					<h6 class="text-23 text-semibold q-mt-md q-mb-none text-accent-0">
						<u @click="downloadTemplate" class="cursor-pointer">Download template file</u>
					</h6>
					<p>and fill in with the tasks information</p>
					<div
						v-show="isFileSet"
						class="row"
						:class="
							$q.screen.width > 767
								? 'q-col-gutter-x-md'
								: 'q-col-gutter-y-sm fixed-bottom q-pa-xl q-mb-lg full-width'
						"
					>
						<div class="col-12 col-sm-6">
							<q-btn
								dense
								flat
								no-caps
								@click="storeUploadedTasks"
								label="Upload"
								class="
									onboarding-button onboarding-border-accent-0 onboarding-bg-accent-0
									text-white
									q-px-xl
									full-width
								"
							/>
						</div>
						<div class="col-12 col-sm-6">
							<q-btn
								dense
								flat
								no-caps
								@click="uploadComponent.clearBtn.click()"
								label="Cancel"
								class="
									onboarding-button onboarding-border-accent-0 onboarding-bg-hover-accent-0
									q-px-xl
									full-width
								"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script src="./scripts/ImportFile.js"></script>

<style>
@import "./styles/ImportFile.scss";
</style>
