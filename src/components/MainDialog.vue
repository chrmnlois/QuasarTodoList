<template>
	<div class="onboarding-dialog-confirmation">
		<!-- <q-dialog class="core-dialog-background" v-model="GET_CORE_DIALOG_STATE"> -->
		<q-dialog class="onboarding-dialog-background" v-model="DialogState" persistent>
			<div class="onboarding-dialog-container text-center text-white no-shadow flex justify-center items-center">
				<div class="width-300">
					<component :is="component" />
				</div>
			</div>
		</q-dialog>
	</div>
</template>

<script>
import { useQuasar } from "quasar";
import { ref, toRef, computed } from "vue";
import { useStore } from "vuex";
import { DialogState } from "../composables/Triggers";
export default {
  props: {
    params: Object,
    content: Object,
  },
  setup(props) {
    const store = useStore();
    const $q = useQuasar();
    let parameter = toRef(props, "params");
    let component = toRef(props, "content");

    return {
      parameter,
      component,
      DialogState,
    };
  },
};
</script>
