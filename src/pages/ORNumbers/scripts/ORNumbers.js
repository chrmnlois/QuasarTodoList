import { provide, ref } from "vue";
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
  FetchORNumbers,
  ORNumberDetails,
  GetORNumbers,
  DeleteORNumber,
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

    // For table row
    let row = ref();
    // For page loading
    let pageLoadingState = ref(false);

    // For pagination
    let pagination = ref({
      sortBy: "desc",
      descending: false,
      page: 1,
      rowsPerPage: 10,
    });
    //
    // For table column
    let labelOptions = ["General Fund", "Special Fund", "BIR", "Sample"];

    let columns = [
      {
        name: "receipt_type",
        required: true,
        label: "Receipt Type",
        align: "left",
        field: "receipt_type",
        sortable: true,
      },
      {
        name: "date",
        align: "left",
        label: "Date",
        field: "date",
      },
      {
        name: "received_from",
        align: "left",
        label: "Received From",
        field: "received_from",
      },
      {
        name: "tin_number",
        align: "left",
        label: "Tin Number",
        field: "tin_number",
      },

      {
        name: "address",
        align: "left",
        label: "Address",
        field: "address",
      },
      {
        name: "amount",
        align: "left",
        label: "Amount",
        field: "amount",
      },
      {
        name: "action",
        align: "left",
        label: "",
        field: "action",
        style: "width: 10%",
      },
    ];
    const editORNumber = (row) => {
      console.log("rows: ", row.id);
      router.push({
        path: "add-or-numbers",
        query: { id: row.id }, // Pass the row ID as a query parameter
      });
    };

    const onRowClick = (event, props) => {
      // console.log(ORNumberDetails)
      const rowId = props.id;
      router.push({
        path: "view-or-numbers",
        query: { id: rowId }, // Pass the row ID as a query parameter
      });
    };

    FetchORNumbers().then((response) => {
      ORNumberDetails.value = response;
      console.log(response);
    });

    // Delete function
    let ids = ref();
    const deleteORNumber = (row) => {
      ids.value = row;
      ToggleMainDialogState();
    };

    const deleteOR = () => {
      ids.value = ids.value - 1;
      const indexToDelete = ids.value;
      DeleteORNumber({
        id: ORNumberDetails.value[indexToDelete].id,
      }).then((response) => {
        if (response) {
          let status = true;
          console.log("response: ", response);
          $q.notify({
            position: $q.screen.width < 767 ? "top" : "bottom-right",
            classes: `${
              status ? "onboarding-success-notif" : "onboarding-error-notif"
            } q-px-lg q-pt-none q-pb-none`,
            html: true,
            message: status
              ? `<div class="text-bold">Success!</div> Data has been Deleted.`
              : `<div class="text-bold">Failed!</div> Something went wrong.`,
          });
        }
      });
      ToggleMainDialogState();
      ORNumberDetails.value.splice(indexToDelete, 1);
    };

    provide("deleteOR", deleteOR);
    // Fectch Function

    return {
      pagination,
      columns,
      editORNumber,
      pageLoadingState,
      deleteOR,
      labelOptions,
      onRowClick,
      row,
      ORNumberDetails,
      deleteORNumber,
      GetORNumbers,
    };
  },
};
