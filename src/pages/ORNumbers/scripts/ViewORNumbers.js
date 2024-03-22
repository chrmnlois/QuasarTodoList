import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";
import { useRoute, useRouter } from "vue-router";
import Filters from "../../../components/Filters.vue";
import Pagination from "../../../components/Pagination.vue";
import MainDialog from "../../../components/MainDialog.vue";
import { ToggleMainDialogState } from "../../../composables/Triggers.js";
import DeleteConfirmation from "../components/DeleteConfirmation.vue";
import MobileFilter from "../../../components/MobileFilter.vue";
import UserCard from "../components/UserCard.vue";
import {
  FetchORNumber,
  ORNumberDetails,
  GetORNumbers,
} from "../../../composables/ORNumber";
import { SearchList } from "../../../composables/Search";
export default {
  components: {
    Filters,
    Pagination,
    MainDialog,
    DeleteConfirmation,
    MobileFilter,
    UserCard,
  },
  setup() {
    const $q = useQuasar();
    const route = useRoute();
    const router = useRouter();
    const orID = ref(route.query.id);

    let listreceipt_type = ["General Fund", "Special Fund", "BIR", "Sample"];

    let dataDetails = ref({});
    const fetchData = () => {
      FetchORNumber(orID.value) // Using FetchAccountData to fetch account data
        .then((data) => {
          dataDetails.value = data;
          //   if(dataDetails.value.reci)
          switch (dataDetails.value.receipt_type) {
            case 1:
              //code block
              dataDetails.value.receipt_type = listreceipt_type[0];
              break;
            case 2:
              //code block;
              dataDetails.value.receipt_type = listreceipt_type[1];
              break;
            case 3:
              //code block
              dataDetails.value.receipt_type = listreceipt_type[2];
              break;
            case 4:
              //code block
              dataDetails.value.receipt_type = listreceipt_type[3];
              break;
            default:
            //code block
          }
          // Updating accountData with fetched data
          console.log("data: ", data);
        })
        .catch((error) => {
          console.error("Error fetching account data:", error);
        });
    };
    if (orID.value) {
      onMounted(fetchData);
    }

    return { fetchData, route, dataDetails, listreceipt_type };
  },
};
