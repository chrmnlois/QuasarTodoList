import MainDialog from "../../../components/MainDialog.vue";
import { ToggleMainDialogState } from "../../../composables/Triggers";
import CustomModal from "../components/CustomModal.vue";
import Filters from "../../../components/Filters.vue";
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { MyTasks, DoneTasks } from "../composables/Tasks.js";
import { useQuasar } from "quasar";

export default {
  components: { MainDialog, CustomModal, Filters },

  setup() {
    // ** WEBPAGE TITLE **
    document.title = "Create A New Task";

    // ** DIALOG BOXES **
    const showDialog = () => {
      ToggleMainDialogState();
    };

    // ** ROUTERS **
    const route = useRoute();
    const router = useRouter();

    // ** INFINITE FORM SETUP **
    let taskTitle = ref("");
    let keyResults = ref([{ result_name: "", selectedTime: null }]);
    const addKeyResult = () => {
      // Add form
      keyResults.value.push({
        result_name: "",
        selectedTime: null,
      });
    };
    const removeKeyResult = (index) => {
      // Remove form
      if (index > -1) {
        keyResults.value.splice(index, 1);
      }
    };

    // ** FORMAT TIME (12-Hour Format) **
    const formatTime = (time) => {
      if (!time) return ""; // return empty string if time is not provided
      const [hours, minutes] = time.split(":").map(Number);
      const period = hours >= 12 ? "PM" : "AM";
      const formattedHours = hours % 12 || 12; // Convert to 12-hour format
      return `${formattedHours}:${minutes
        .toString()
        .padStart(2, "0")} ${period}`;
    };

    // ** SUBMIT FORM **
    let form = ref(null);
    const addTodo = () => {
      const newTasks = keyResults.value.map((task) => ({
        title: taskTitle.value,
        todo: task.result_name,
        selectedTime: formatTime(task.selectedTime),
        checked: false, // check box false
      }));
      let id = MyTasks.value.length;
      MyTasks.value.push(...newTasks);
      if (MyTasks.value.length > id) {
        showNotify(true);
      } else {
        showNotify(false);
      }
      taskTitle.value = "";
      keyResults.value = [{ result_name: "", selectedTime: null }];
      form.value.reset();
    };

    // ** NOTIFICATION ADDING TASK **
    const $q = useQuasar();
    const showNotify = (status) => {
      $q.notify({
        position: $q.screen.width < 767 ? "top" : "bottom-right",
        classes: `${
          status ? "onboarding-success-notif" : "onboarding-error-notif"
        } q-px-lg q-pt-none q-pb-none`,
        html: true,
        message: status
          ? `<div class="text-bold">Successfully Added!</div> New To-Do List has been added successfully`
          : `<div class="text-bold">Failed!</div> Something Went Wrong`,
      });
    };

    return {
      showDialog,
      route,
      router,
      keyResults,
      addKeyResult,
      removeKeyResult,
      taskTitle,
      addTodo,
      form,
      showNotify,
    };
  },

  methods: {
    // Time Cancel Button
    cancelTime() {
      // Reset the selectedTime to null for the last keyResult
      const lastKeyResultIndex = this.keyResults.length - 1;
      if (lastKeyResultIndex >= 0) {
        this.keyResults[lastKeyResultIndex].selectedTime = null;
      }

      // Reset the placeholder to "0:00"
      const inputElement = document.querySelector(".onboarding-input-field");
      if (inputElement) {
        inputElement.setAttribute("placeholder", "0:00");
      }
    },
  },
};
