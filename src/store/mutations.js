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
    },

    // 管理产品切换
    newShiJudge(state, data) {
        state.shiJudge = data
    },
    newWholeJudge(state, data) {
        state.wholeJudge = data
    },
    newMiddleJudge(state, data) {
        state.middleJudge = data
    },

    // 存储一屏数据
    newScreenFirstData(state, data) {
        state.screenFirstData = data
    },
    newLeftSecAux(state, data) {
        state.leftSecAux = data
    },
    newProjectCondition(state, data) {
        state.projectCondition = Object.assign({}, state.projectCondition, data)
    }
}
