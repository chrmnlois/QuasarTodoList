import { ref } from 'vue';
import { useStore } from 'vuex';
import { useQuasar } from 'quasar';
import { ToggleMainDialogState } from '../../../../composables/Triggers.js';
import { isFileSet } from '../../../../composables/UploadFile.js';
export default {
	setup() {
		const $q = useQuasar();
		const store = useStore();
		let btnLoadingState = ref(false);
		const closeDialog = () => {
			ToggleMainDialogState();
		};

		//set to false on creation
		isFileSet.value = false;

		/**Ref for hidden clear and upload button*/
		const clearBtn = ref(null);
		const uploadBtn = ref(null);

		/**Store file from q-uploader to a variable*/
		const importFile = ref(null);

		const UploadTask = (files) => {
			importFile.value = files;
		};

		return {
			btnLoadingState,
			closeDialog,
			UploadTask,
			isFileSet,
			clearBtn,
			uploadBtn,
			importFile,
		};
	},
};
