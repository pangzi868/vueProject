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
    },
    newAmplification(state, obj) {
        state.amplification = Object.assign({}, state.amplification, obj)
    },
    newVisual(state, obj) {
        state.visual = Object.assign({}, state.visual, obj)
    }
}
