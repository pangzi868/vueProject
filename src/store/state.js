export default {
    get UserToken() {
        return localStorage.getItem('token')
    },
    set UserToken(value) {
        localStorage.setItem('token', value)
    },
    dialogVisible: false,
    dialogData: {},
    currentPro: '',
    amplification: {},
    visual: {}
}
