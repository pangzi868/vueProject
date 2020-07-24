export default {
    newFirstScreenData(state, data) {
        state.firstScreenData = data || {}
    },
    newDialogVisible(state, judge) {
        state.dialogVisible = judge
    },
    newDialogData(state, data) {
        state.dialogData = data
    },
    newCurrentPro(state, pro) {
        state.currentPro = pro
    }
}
