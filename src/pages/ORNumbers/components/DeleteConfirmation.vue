<template>
  <div class="width-300">
    <div class="full-width flex justify-center q-mb-md">
      <div class="onboarding-border-radius-10 bg-white width-auto q-pa-sm">
        <q-icon
          name="iconfont icon-delete-fill"
          class="onboarding-text-accent-0"
          size="30px"
        />
      </div>
    </div>
    <h4
      :class="`text-semibold text-28 q-my-none ${
        $q.screen.width < 768 ? 'q-mb-sm' : 'q-mb-lg'
      }`"
    >
      Are you sure you want to delete?
    </h4>
    <p class="text-20 text-weight-light q-pb-sm">
      This process cannot be undone.
    </p>

    <q-btn
      @click="deleteOR"
      :loading="btnLoadingState"
      flat
      no-caps
      label="Yes, I'm sure"
      dense
      :class="`onboarding-bg-accent-0 onboarding-text-accent-1 text-white full-width q-py-sm q-mb-s onboarding-border-radius-${
        $q.screen.width < 768 ? '10' : '50'
      }`"
    />
    <div
      @click="closeDialog()"
      class="full-width q-py-sm cursor-pointer text-14"
    >
      Cancel
    </div>
  </div>
</template>
<script>
import { ref, inject } from "vue";
import { ToggleMainDialogState } from "../../../composables/Triggers";

export default {
  setup() {
    let btnLoadingState = ref(false);

    let rows = ref([]);

    const deleteOR = inject("deleteOR");

    const closeDialog = () => {
      ToggleMainDialogState();
    };

    return {
      deleteOR,
      closeDialog,
      btnLoadingState,
    };
  },
};
</script>
