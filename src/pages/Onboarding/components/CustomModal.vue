<template>
  <div class="onboarding-dialog-confirmation">
    <q-dialog v-model="DialogState" persistent>
      <div
        class="onboarding-dialog-container text-center text-white no-shadow flex justify-center items-center"
      >
        <div class="width-300">
          <div class="q-pa-md">
            <q-icon name="error" class="onboarding-text-accent-0" size="md" />
          </div>
          <div class="text-22 text-bold">
            Are you sure you want to delete this To-Do List?
          </div>
          <div class="text-16 q-mt-md">This process cannot be undone.</div>
          <div class="text-16 q-mb-xl">
            By confirming, this account will be deleted. To go back Click
            “Cancel”
          </div>
          <div class="row items-center justify-center q-mt-xl">
            <q-btn
              label="Cancel"
              @click="closeDialog"
              flat
              rounded
              no-caps
              dense
              class="action-btn onboarding-border-accent-0 onboarding-bg-accent-none text-white"
            />
            <q-btn
              flat
              rounded
              no-caps
              dense
              class="action-btn onboarding-border-accent-0 onboarding-bg-accent-0 text-white q-ml-md"
              label="Yes"
              :loading="btnLoadingState"
              @click="deleteNotify"
            />
          </div>
        </div>
      </div>
    </q-dialog>
  </div>
</template>

<script>
import { ref } from "vue";
import {
  ToggleMainDialogState,
  DialogState,
} from "../../../composables/Triggers";
import { MyTasks } from "../composables/Tasks";
import MainDialog from "../../../components/MainDialog.vue";
import { useQuasar } from "quasar";

export default {
  setup() {
    const btnLoadingState = ref(false);

    const closeDialog = () => {
      ToggleMainDialogState();
    };

    const confirmDelete = () => {
      btnLoadingState.value = true;

      // Clear the MyTasks and DoneTasks arrays
      MyTasks.value = [];

      // Close the dialog after deleting the tasks
      closeDialog();

      btnLoadingState.value = false;
    };

    const $q = useQuasar();

    return {
      btnLoadingState,
      closeDialog,
      DialogState,
      confirmDelete,

      deleteNotify() {
        $q.notify({
          position: $q.screen.width < 767 ? "top" : "bottom-right",
          classes: "onboarding-success-notif",
          html: true,
          message: `<div class="text-bold">Successfully Deleted!</div> To-Do List has been Deleted successfully`,
        });
        closeDialog();
      },
    };
  },
};
</script>

<style scoped>
.action-btn {
  min-width: 96px;
}
</style>
