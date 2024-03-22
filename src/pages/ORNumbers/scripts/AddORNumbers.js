import { ref, computed, onMounted } from "vue";
import { useQuasar } from "quasar";
import { useRoute, useRouter } from "vue-router";
import {
  InsertORNumber,
  FetchFormType,
  FetchFundType,
  FetchORNumber,
  UpdateOrNumber,
} from "../../../composables/ORNumber";
export default {
  setup() {
    const $q = useQuasar();
    const route = useRoute();
    const router = useRouter();
    const orID = ref(route.query.id);

    // const rowObject = JSON.parse(orID);
    const orData = ref({});
    const newData = ref({});

    // console.log("orID: ", orID.value[0]);
    orData.value = orID.value;

    let rows = ref();

    let form = ref({
      id: null,
      receipt_type: null,
      date: null,
      received_from: null,
      tin_number: null,
      address: null,
      amount: null,
    });

    /** Fetch fund type options from database */
    const fundTypes = ref([
      {
        value: 1,
        name: "General Fund",
      },
      {
        value: 2,
        name: "Special Fund",
      },
      {
        value: 3,
        name: "BIR",
      },
      {
        value: 4,
        name: "Sample",
      },
    ]);

    const fetchData = () => {
      FetchORNumber(orID.value) // Using FetchAccountData to fetch account data
        .then((data) => {
          newData.value = data;
          // Updating accountData with fetched data
          console.log("data: ", data);
          // Update the form with the fetched data
          form.value = {
            id: data.id,
            receipt_type: fundTypes.value.find(
              (type) => type.value === data.receipt_type
            )?.name,
            date: data.date,
            received_from: data.received_from,
            tin_number: data.tin_number,
            address: data.address,
            amount: data.amount,
          };
          // balanced.value =
        })
        .catch((error) => {
          console.error("Error fetching account data:", error);
        });
    };

    // Fetch data when the component is mounted
    if (orID.value) {
      onMounted(fetchData);
    }

    /**
     * Validates OR Range if match to the quantity
     */
    let isORRangeCorrect = ref(true);

    let btnLoadingState = ref(false);
    let newRangeForm = ref(null);
    const addNewRange = () => {
      InsertORNumber(form.value).then((success) => {
        if (success) {
          // Submit form if validated
          let status = true;
          $q.notify({
            position: $q.screen.width < 767 ? "top" : "bottom-right",
            classes: `${
              status ? "onboarding-success-notif" : "onboarding-error-notif"
            } q-px-lg q-pt-none q-pb-none`,
            html: true,
            message: status
              ? `<div class="text-bold">Success!</div> Data has been Inserted  .`
              : `<div class="text-bold">Failed!</div> Something went wrong.`,
          });
          // rows.value.push(form.value);
          router.push("or-numbers");
        }
      });
    };
    // bukas taka bukas
    const updateORNumbers = () => {
      UpdateOrNumber(form.value).then((success) => {
        console.log("forms value : ", success);
        if (success) {
          // Submit form if validated
          let status = true;
          $q.notify({
            position: $q.screen.width < 767 ? "top" : "bottom-right",
            classes: `${
              status ? "onboarding-success-notif" : "onboarding-error-notif"
            } q-px-lg q-pt-none q-pb-none`,
            html: true,
            message: status
              ? `<div class="text-bold">Success!</div> Data has been Updated.`
              : `<div class="text-bold">Failed!</div> Something went wrong.`,
          });
          // rows.value.push(form.value);
          router.push("or-numbers");
        }
      });
    };

    return {
      newRangeForm,
      fundTypes,
      form,
      isORRangeCorrect,
      addNewRange,
      route,
      btnLoadingState,
      updateORNumbers,
      newData,
    };
  },
};
