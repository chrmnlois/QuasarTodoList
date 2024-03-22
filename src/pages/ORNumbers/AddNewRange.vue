<template>
	<transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" :duration="2000">
		<div class="onboarding-text-primary">
			<div v-if="!pageLoadingState">
				<div class="q-px-lg q-pt-lg gt-xs">
					<div class="flex justifty-start itempt-center onboarding-text-accent-0 q-mt-sm q-mb-lg z gt-xs">
						<q-btn @click="$router.go(-1)" round dense flat icon="arrow_back" />
						<h5 class="text-26 text-semibold q-my-none q-ml-sm">
							{{ route.params.id ? 'Edit' : 'Add New' }} Range
						</h5>
					</div>
				</div>
				<div class="onboarding-main-scroll standard-scroll padding-top-bottom-lg q-mb-xl">
					<q-form ref="newRangeForm" greedy @submit="addNewRange()">
						<div>
							<label class="text-weight-medium">Select</label>
							<q-select
								ref="assign_toRef"
								class="
									onboarding-border-radius-10 onboarding-border-accent-0 onboarding-select-field
									standard
									q-mt-sm
								"
								dense
								borderless
								v-model="form.fund_type_id"
								option-label="name"
								option-value="id"
								:label="!form.fund_type_id ? 'Select' : ''"
								emit-value
								map-options
								:options="fundTypes"
								hide-bottom-space
								optiononboarding-selected-class="onboarding-selected-class"
								popup-content-class="onboarding-option-style-light"
								transition-show="scale"
								transition-hide="scale"
								behavior="menu"
								:rules="[(val) => (val !== null && val !== '') || '']"
							/>
						</div>
						<div class="q-mt-md">
							<label class="text-weight-medium">Input</label>
							<q-input
								dense
								borderless
								v-model="form.form_type"
								placeholder="Input"
								:rules="[(val) => (val !== null && val !== '') || '']"
								hide-bottom-space
								class="
									onboarding-input-field
									standard
									onboarding-border-accent-0 onboarding-border-radius-10
									q-mt-sm
								"
							/>
						</div>

						<div :class="$q.screen.width < 767 && 'fixed-bottom q-mb-lg q-mx-xl'">
							<q-btn
								:loading="btnLoadingState"
								type="submit"
								rounded
								dense
								flat
								no-caps
								:label="route.params.id ? 'Update' : 'Add Range'"
								class="
									onboarding-buttononboarding-border-accent-0 onboarding-bg-accent-0
									text-white
									q-px-xl q-mt-lg
								"
							/>
						</div>
					</q-form>
				</div>
			</div>
			<q-inner-loading
				class="absolute-center onboarding-bg-primary text-20 full-width full-height onboarding-text-accent-0"
				:showing="pageLoadingState"
			/>
		</div>
	</transition>
</template>

<script src="./scripts/AddNewRange.js"></script>

<style lang="scss">
@import "./styles/ORNumbers.scss";
</style>
