import MainDialog from "../../../components/MainDialog.vue";
import { ToggleMainDialogState } from "../../../composables/Triggers";
import CustomModal from "../components/CustomModal.vue";
import Filters from "../../../components/Filters.vue";
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { MyTasks, DoneTasks, inProgress } from "../composables/Tasks.js";
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
    let keyResults = ref([
      { result_name: "", selectedTime: null, checked: false },
    ]);
    const addKeyResult = () => {
      // Add form
      keyResults.value.push({
        result_name: "",
        selectedTime: null,
        checked: false,
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
      // Group tasks by title
      const groupedTasks = keyResults.value.reduce((groups, task) => {
        const existingGroup = groups.find(
          (group) => group.title === taskTitle.value
        );

        if (existingGroup) {
          existingGroup.todos.push({
            name: task.result_name,
            checked: false, // Set checked to false for each task
          });
          existingGroup.selectedTimes.push(formatTime(task.selectedTime));
        } else {
          groups.push({
            title: taskTitle.value,
            todos: [
              {
                name: task.result_name,
                checked: false, // Set checked to false for each task
              },
            ],
            selectedTimes: [formatTime(task.selectedTime)],
            checked: false,
          });
        }

        return groups;
      }, []);

      // Push new tasks to MyTasks array
      let id = MyTasks.value.length;
      MyTasks.value.push(...groupedTasks);

      // Check if new tasks were added to MyTasks
      if (MyTasks.value.length > id) {
        showNotify(true);
      } else {
        showNotify(false);
      }

      // Reset form and clear input fields
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
