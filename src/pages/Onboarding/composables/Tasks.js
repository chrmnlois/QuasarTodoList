import { ref } from "vue";

let inProgress = ref([]);
let MyTasks = ref([]);
let DoneTasks = ref([]);
let SampleTasks = ref([]);

SampleTasks.value = [
  {
    title: "To-Do List",
    todo: "Make To-Do List Design",
    selectedTime: "8:00 AM",
    checked: false,
  },
  {
    title: "To-Do List",
    todo: "Fill Up OJT Evaluation Form",
    selectedTime: "12:00 PM",
    checked: false,
  },
  {
    title: "To-Do List",
    todo: "Update SOP for OJT Tardiness",
    selectedTime: "1:00 PM",
    checked: false,
  },
  {
    title: "To-Do List",
    todo: "Check BDD User Story",
    selectedTime: "5:00 PM",
    checked: false,
  },
  {
    title: "To-Do List",
    todo: "Continuation of JuanHR Presentation",
    selectedTime: "5:00 PM",
    checked: true,
  },
];

export { MyTasks, DoneTasks, SampleTasks, inProgress };
