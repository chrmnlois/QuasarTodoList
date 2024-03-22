import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { isFileSet } from '../../../../composables/UploadFile';

import UploadFile from '../UploadFile.vue';
export default {
	props: {
		clear_import: String,
	},
	components: { UploadFile },
	setup(props) {
		const $q = useQuasar();
		const router = useRouter();

		/**Ref for uploadtask component */
		const uploadComponent = ref(null);

		const clearImport = () => {
			isFileSet.value = false;
			importFail.value = false;
			displayTaskId.value = null;
			successImport.value = null;
		};

		onMounted(() => {
			if (props.clear_import !== null) {
				if (props.clear_import === 'true') clearImport();
			}
		});

		let pagination = ref({
			rowsPerPage: 0,
		});

		const displayTaskId = ref(null);

		/**Call download template function to
		 * write data from db to excel file */
		const ExcelJS = require('exceljs');

		const downloadTemplate = async () => {
			const wb = new ExcelJS.Workbook();
			const saveAs = require('file-saver');

			/**Setting up the sheets */
			const task_sheet = wb.addWorksheet('Tasks');
			const projects_sheet = wb.addWorksheet('Projects & Milestones');
			const employees_sheet = wb.addWorksheet('Employees');
			const work_sheet = wb.addWorksheet('Work Types');

			/**Setting up the headers of each sheet */
			task_sheet.columns = [
				{ header: 'Project', key: 'pn', width: 25 },
				{ header: 'Milestone', key: 'mn', width: 25 },
				{ header: 'Task Name', key: 'tn', width: 25 },
				{ header: 'Personnel', key: 'psn', width: 25 },
				{ header: 'Evaluator', key: 'ev', width: 25 },
				{ header: 'Work Type', key: 'wt', width: 25 },
				{ header: 'Urgency Level', key: 'ul', width: 25 },
				{ header: 'Task Description', key: 'td', width: 25 },
				{ header: 'Estimated Hours', key: 'eh', width: 25 },
			];
			task_sheet.addRow([
				'List of Projects and Milestones can be found in the "Projects & Milestones" Sheet.',
				'',
				'Keep Task names simple, clear, and concise',
				'List of Employee Names can be found in the "Employees" Sheet.',
				'List of Employee Names can be found in the "Employees" Sheet.',
				'List of Work Types can be found in the "Work Types" Sheet.',
				'Urgency Levels are:\nNormal\nImportant\nUrgent Important',
				'You can input a task description and attach a link here\n\nNote: This is optional field',
				'You can input an estimated hours here\n\nNote: This is required field',
			]);
			task_sheet.mergeCells('A2:B2');

			projects_sheet.columns = [
				{ header: 'Project', key: 'pn', width: 25 },
				{ header: 'Milestone', key: 'pn', width: 25 },
			];

			employees_sheet.columns = [{ header: 'Name of Employees', key: 'en', width: 25 }];

			work_sheet.columns = [{ header: 'Work Types', key: 'wt', width: 25 }];

			/**Setting up the style for the headers */
			wb.eachSheet(function (sheet) {
				const header_row = sheet.getRow(1);
				header_row.eachCell(function (cell) {
					cell.alignment = {
						vertical: 'middle',
						horizontal: 'center',
					};
					cell.font = {
						size: 10,
						bold: true,
						color: { argb: 'FFFFFF' },
					};
					cell.fill = {
						type: 'pattern',
						pattern: 'solid',
						fgColor: { argb: 'C7293A' },
					};
					cell.border = {
						bottom: { style: 'thin' },
					};
				});
			});
			task_sheet.getRow(2).eachCell(function (cell) {
				cell.alignment = {
					vertical: 'middle',
					horizontal: 'center',
					wrapText: true,
				};
				cell.border = {
					top: { style: 'thin' },
					right: { style: 'thin' },
					left: { style: 'thin' },
					bottom: { style: 'thin' },
				};
				cell.font = {
					size: 10,
					color: { argb: 'FFFFFF' },
				};
				cell.fill = {
					type: 'pattern',
					pattern: 'solid',
					fgColor: { argb: 'E0384A' },
				};
			});

			/**Populate the sheets */
			// let data = [];
			// await FetchTemplateData().then((response) => {
			// 	data = response.data;
			// });
			// const milestone_data = data['milestones'];
			// const employee_data = data['employee_information'];
			// const work_data = data['work_types'];

			// milestone_data.forEach(function (record) {
			// 	projects_sheet.addRow([
			// 		record['project_name'] + ' - ' + record['project_id'],
			// 		record['milestone_name'] + ' - ' + record['id'],
			// 	]);
			// });

			// employee_data.forEach(function (record) {
			// 	employees_sheet.addRow([record['full_name'] + ' - ' + record['id']]);
			// });

			// work_data.forEach(function (record) {
			// 	work_sheet.addRow([record['work_name'] + ' - ' + record['id']]);
			// });

			/**Download file */
			wb.xlsx.writeBuffer().then(function (data) {
				const blob = new Blob([data], {
					type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
				});
				saveAs(blob, 'ImportTaskTemplate.xlsx');
			});
		};

		/**Store and Display uploaded task */
		let files = null;

		const validHeaders = [
			{
				name: 'project',
				align: 'left',
				label: 'Project',
				field: 'project',
			},
			{
				name: 'milestone',
				align: 'left',
				label: 'Milestone',
				field: 'milestone',
			},
			{
				name: 'task_name',
				align: 'left',
				label: 'Task Name',
				field: 'task_name',
			},
			{
				name: 'personnel',
				align: 'left',
				label: 'Personnel',
				field: 'personnel',
			},
			{
				name: 'evaluator',
				align: 'left',
				label: 'Evaluator',
				field: 'evaluator',
			},
			{
				name: 'work_type',
				align: 'left',
				label: 'Work Type',
				field: 'work_type',
			},
			{
				name: 'urgency_level',
				align: 'left',
				label: 'Urgency Level',
				field: 'urgency_level',
			},
			{
				name: 'task_description',
				align: 'left',
				label: 'Task Description',
				field: 'task_description',
			},
			{
				name: 'estimated_hours',
				align: 'left',
				label: 'Estimated Hours',
				field: 'estimated_hours',
			},
		];

		/**Store and process the uploaded tasks to array*/
		const storeUploadedTasks = async () => {
			uploadComponent.value.uploadBtn.click();
			files = uploadComponent.value.importFile;

			const workbook = new ExcelJS.Workbook();
			await workbook.xlsx.load(files[0]);
			const worksheet = workbook.worksheets[0];
		};

		/**Get value from the format of the cell eg "Employee Name - 2" */
		const getValue = (input) => {
			if (!input) return null;
			let inputArray = input.split(' - ');
			let outputValue = inputArray[inputArray.length - 1];
			if (!isNaN(outputValue)) {
				return Number(outputValue);
			} else {
				return null;
			}
		};

		/**Get value for urgency eg. Normal = 0 */
		const getUrgency = (input) => {
			if (input === 'Normal') return 0;
			else if (input === 'Important') return 1;
			else if (input === 'Urgent Important') return 2;
			else return null;
		};

		/**Validate each uploaded task
		 * If it is valid, import to database*/
		const importTaskForm = ref(null);
		let project_data = [];
		let milestone_data = [];
		let personnel_data = [];
		let evaluator_data = [];
		let work_data = [];
		let urgencyData = [
			{ label: 'Normal', value: 0 },
			{ label: 'Important', value: 1 },
			{ label: 'Urgent Important', value: 2 },
		];

		return {
			//For UI Toggles
			isFileSet,
			clearImport,
			displayTaskId,
			router,
			downloadTemplate,
			//For Upload Task
			uploadComponent,
			storeUploadedTasks,
			//For Validate Task
			importTaskForm,

			//For Import Task

			validHeaders,
		};
	},
};
