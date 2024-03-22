<template>
	<div class="onboarding-dialog-confirmation">
		<!-- <q-dialog class="core-dialog-background" v-model="GET_CORE_DIALOG_STATE"> -->
		<q-dialog class="onboarding-dialog-background" v-model="DialogState" maximized persistent>
			<div class="onboarding-dialog-container text-center text-white no-shadow flex justify-center items-center">
				<div class="width-300">
					<div>
						<q-spinner class="text-accent-0" size="3em" />
						<div>Please wait...</div>
					</div>
				</div>
			</div>
		</q-dialog>
	</div>
</template>

<script>
import { DialogState } from "./../../composables/MainLayout";
export default {
  setup() {
    return {
      DialogState,
    };
  },
};
</script>
