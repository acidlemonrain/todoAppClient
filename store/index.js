export const state = () => ({
	token: ''
});

export const mutations = {
	settoken(state, x) {
		state.token = x;
	}
};
