import { ref, computed } from "vue";
import { useQuasar } from "quasar";
import { useRoute, useRouter } from "vue-router";
import {
  InsertNewRange,
  FetchFormType,
  FetchFundType,
  FetchORNumber,
  UpdateORRange,
} from "../../../composables/ORNumber";
export default {
  setup() {
    const $q = useQuasar();
    const route = useRoute();
    const router = useRouter();

    let rows = ref([]);

    let form = ref({
      fund_type_id: null,
      form_type: null,
    });

    let pageLoadingState = ref(false);

    /** Fetch fund type options from database */
    const fundTypes = ref([
      {
        id: 1,
        name: "General Fund",
      },
      {
        id: 2,
        name: "Special Fund",
      },
    ]);

    /**
     * Validates OR Range if match to the quantity
     */
    let isORRangeCorrect = ref(true);

    let btnLoadingState = ref(false);
    let newRangeForm = ref(null);
    const addNewRange = () => {
      InsertNewRange(newRangeForm.value).then((success) => {
        if (success) {
          // Submit form if validated
          rows.value.push(form.value);
        }
      });
    };

    return {
      newRangeForm,
      fundTypes,
      form,
      isORRangeCorrect,
      addNewRange,
      pageLoadingState,
      route,
      btnLoadingState,
    };
  },
};
