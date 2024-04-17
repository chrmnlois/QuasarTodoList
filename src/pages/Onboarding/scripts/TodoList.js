import MainDialog from "../../../components/MainDialog.vue";
import { ToggleMainDialogState } from "../../../composables/Triggers";
import CustomModal from "../components/CustomModal.vue";
import Filters from "../../../components/Filters.vue";
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  MyTasks,
  DoneTasks,
  SampleTasks,
  tempArray,
  updateArray,
} from "../composables/Tasks.js";
import { date } from "quasar";
import { useQuasar } from "quasar";

export default {
  components: { MainDialog, CustomModal, Filters },

  computed: {
    isMyTasksEmpty() {
      return this.myTasks.length === 0;
    },
  },

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

    /** CHECKBOX CHANGE **/
    const handleCheckboxChange = (clickedTask) => {
      // Update the tasksState array
      tasksState.value = tasksState.value.map((task) => {
        if (task === clickedTask) {
          // Toggle the checked status of the clicked task
          task.checked = !task.checked;
        }
        return task;
      });
    };

    // ** REACTIVE STATE FOR SAMPLE TASKS **
    const tasksStateSample = ref(SampleTasks.value);

    // ** COMPUTED PROPERTY FOR SAMPLE MyTasks **
    const sampleMyTasks = computed(() =>
      tasksStateSample.value.filter((sampleTask) => !sampleTask.checked)
    );

    // ** COMPUTED PROPERTY FOR SAMPLE DoneTasks **
    const sampleDoneTasks = computed(() =>
      tasksStateSample.value.filter((sampleTask) => sampleTask.checked)
    );

    /** CHECKBOX CHANGE FOR SAMPLE **/
    const handleCheckboxChangeSample = (sampleTask) => {
      sampleTask.checked = !sampleTask.checked; // Toggle the checked status

      // Update the tasksState array
      tasksStateSample.value = tasksStateSample.value.map((t) =>
        t.id === sampleTask.id ? task : t
      );
    };

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

    /** EDIT AND DELETE TASKS **/
    const editTask = (taskSet) => {
      // Create a new object to hold the taskSet and its associated todos and selectedTimes
      const editedTaskSet = {
        title: taskSet.title,
        keyResults: [],
      };

      // Combine todos and selectedTimes into the keyResults array
      for (let i = 0; i < taskSet.todos.length; i++) {
        editedTaskSet.keyResults.push({
          todo: taskSet.todos[i],
          selectedTime: taskSet.selectedTimes[i],
        });
      }

      // Push the edited taskSet to tempArray
      tempArray.value.push(editedTaskSet);

      // Navigate to the edit-todo route
      router.push({ name: "edit-todo" });
    };

    const deleteTask = (taskSet) => {
      const index = tasksState.value.findIndex(
        (item) => item.id === taskSet.id
      );
      if (index !== -1) {
        tasksState.value.splice(index, 1);
      }
      ToggleMainDialogState();
    };
    // ** NOTIFICATION FOR IN PROGRESS / DONE **
    const $q = useQuasar();

    console.log("updateArray: ", updateArray.value);
    console.log("myTasks: ", myTasks.value);
    console.log("tempArray: ", tempArray.value);

    return {
      showDialog,
      route,
      router,
      myTasks,
      doneTasks,
      todaysDate,
      handleCheckboxChange,
      handleCheckboxChangeSample,
      editTask,
      deleteTask,
      todaysTime,
      sampleMyTasks,
      sampleDoneTasks,
      tempArray,
      showPopup: false,

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
