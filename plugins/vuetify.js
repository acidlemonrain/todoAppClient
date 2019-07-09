import Vue from 'vue';
import Vuetify, { VSnackbar, VBtn, VIcon } from 'vuetify/lib';
import VuetifyToast from 'vuetify-toast-snackbar';

Vue.use(Vuetify, {
	components: {
		VSnackbar,
		VBtn,
		VIcon
	}
});

Vue.use(VuetifyToast, {
	color: 'green',
	y: 'top',
	x: 'middle',
	timeout: 1000,
	dismissable: true,
	queueable: true
});
