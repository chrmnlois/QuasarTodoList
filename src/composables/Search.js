import { httpGet } from 'boot/axios';
import { ref, readonly } from 'vue';
let Search = ref([]);
let SearchList = readonly(Search);
let SearchedParams = ref(null);
let GetSearchResult = (payload) => {
	return new Promise((resolve, reject) => {
		httpGet(
			`polanguiTreasury/${payload.endpoint}`,
			{
				success(response) {
					response.data.status === 'success' && (Search.value = response.data.data);
					resolve(response.data);
				},
				catch(response) {
					reject(response);
				},
			},
			payload.params
		);
	});
};

export { SearchList, Search, GetSearchResult, SearchedParams };
