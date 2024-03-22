// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
state: () => ({
openCompilerModal: false,
}),
getters: {
isOpenCreateModal(state) {
return state.openCompilerModal;
}
},
actions: {
changeOpenCreateModal() {
this.openCompilerModal = !this.openCompilerModal;
}
}
})
