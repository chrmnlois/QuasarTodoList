import MainDialog from "../../../components/MainDialog.vue";
import { ToggleMainDialogState } from "../../../composables/Triggers";
import CustomModal from "../components/CustomModal.vue";
import Filters from "../../../components/Filters.vue";
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { MyTasks, DoneTasks } from "../composables/Tasks.js";
import { date } from "quasar";
import { useQuasar } from "quasar";

export default {
  components: { MainDialog, CustomModal, Filters },
  setup() {
    // ** WEBPAGE TITLE **
    document.title = "To-Do List";

    // ** DIALOG BOXES **
    const showDialog = () => {
      ToggleMainDialogState();
    };

    // ** ROUTERS **
    const route = useRoute();
    const router = useRouter();

    // ** REACTIVE STATE FOR TASKS **
    const tasksState = ref(MyTasks.value);

    // ** COMPUTED PROPERTY FOR MyTasks **
    const myTasks = computed(() =>
      tasksState.value.filter((task) => !task.checked)
    );

    // ** COMPUTED PROPERTY FOR DoneTasks **
    const doneTasks = computed(() =>
      tasksState.value.filter((task) => task.checked)
    );

    // ** COMPUTED PROPERTY FOR TODAY'S DATE **
    const todaysDate = computed(() => {
      const timeStamp = Date.now();
      return date.formatDate(timeStamp, "MMMM D, YYYY");
    });

    // ** COMPUTED PROPERTY FOR TIME **
    const todaysTime = computed(() => {
      const timeStamp = Date.now();
      return date.formatDate(timeStamp, "hh:mm A");
    });

    /** CHECKBOX CHANGE **/
    const handleCheckboxChange = (task) => {
      task.checked = !task.checked; // Toggle the checked status

      // Update the tasksState array
      tasksState.value = tasksState.value.map((t) =>
        t.id === task.id ? task : t
      );
    };

    /** EDIT AND DELETE TASKS **/
    const deleteTask = () => {
      tasksState.value = [];
      ToggleMainDialogState();
    };

    // ** NOTIFICATION FOR IN PROGRESS / DONE **
    const $q = useQuasar();

    return {
      showDialog,
      route,
      router,
      myTasks,
      doneTasks,
      todaysDate,
      handleCheckboxChange,
      deleteTask,
      todaysTime,

      // Uncheck Notification
      inprogressNotify() {
        $q.notify({
          position: $q.screen.width < 767 ? "top" : "bottom-right",
          classes: "onboarding-success-notif",
          html: true,
          message: `<div class="text-bold">Successfully Added!</div> To-Do List has been added to Done Section successfully`,
        });
      },

      // Check Notification
      doneNotify() {
        $q.notify({
          position: $q.screen.width < 767 ? "top" : "bottom-right",
          classes: "onboarding-success-notif",
          html: true,
          message: `<div class="text-bold">Successfully Added!</div> To-Do List has been added to In Progress Section successfully`,
        });
      },
    };
  },
};
