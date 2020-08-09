export default {
    get UserToken() {
        return localStorage.getItem('token')
    },
    set UserToken(value) {
        localStorage.setItem('token', value)
    },
    dialogVisible: false,
    dialogData: {},
    currentPro: '全省',
    amplification: {},
    visual: {},

    shiJudge: false,
    wholeJudge: true,
    middleJudge: false,

    // 存储一屏数据
    screenFirstData: {},
    leftSecAux: {},
    projectCondition: {}
}
