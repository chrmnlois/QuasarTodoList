import MainDialog from "../../../components/MainDialog.vue";
import { ToggleMainDialogState } from "../../../composables/Triggers";
import CustomModal from "../components/CustomModal.vue";
import Filters from "../../../components/Filters.vue";
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  MyTasks,
  DoneTasks,
  inProgress,
  tempArray,
  updateArray,
} from "../composables/Tasks.js";
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
      taskSet.keyResults.push({
        todo: {
          name: "",
        },
        selectedTime: null,
      });
    };

    const removeKeyResult = (index) => {
      // Remove form
      if (index > -1) {
        keyResults.value.splice(index, 1);
      }
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

      // Push the edited taskSet back to MyTasks array
      if (tempArray.value.length > 0) {
        const editedTaskSet = tempArray.value[0];
        MyTasks.value.push(editedTaskSet);
        tempArray.value = [];
      }
    };

    const updateTask = () => {
      // Find the index of the taskSet in tempArray
      const taskSetIndex = tempArray.value.findIndex(
        (task) => task.title === tempArray.value[0].title
      );

      // If the taskSet exists in tempArray, update it
      if (taskSetIndex !== -1) {
        // Update the title, keyResults, and selectedTime of the taskSet
        tempArray.value[taskSetIndex].title = tempArray.value[0].title;
        tempArray.value[taskSetIndex].keyResults =
          tempArray.value[0].keyResults.map((result) => ({
            todo: { name: result.todo.name },
            selectedTime: result.selectedTime,
          }));

        // Push the updated taskSet to updateArray
        const restructuredTaskSet = restructureTaskSet(tempArray.value[0]);
        updateArray.value.push(restructuredTaskSet);

        // Update the first element of myTasks with the restructured taskSet
        MyTasks.value.splice(0, 1, restructuredTaskSet);

        // Clear the tempArray
        tempArray.value = [];

        // Clear the updateArray
        updateArray.value = [];
        showNotify(true);
      }

      // Navigate back to the todo-list route
      router.push({ name: "todo-list" });
    };

    const restructureTaskSet = (taskSet) => {
      const restructuredTaskSet = {
        checked: false,
        title: taskSet.title,
        todos: taskSet.keyResults.map((result) => ({
          name: result.todo.name,
          checked: false,
        })),
        selectedTimes: taskSet.keyResults.map((result) => result.selectedTime),
      };

      return restructuredTaskSet;
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
          ? `<div class="text-bold">Successfully Updated!</div> New To-Do List has been updated successfully`
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
      tempArray,
      updateTask,
      updateArray,
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
