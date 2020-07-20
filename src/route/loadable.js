import Loading from '../components/loading.vue'

const loadable = (asyncFn) =>{
  const AsyncComponent = () => ({
    component:asyncFn(),
    loading:Loading
  })
  return {
    render(h) {
     return h(AsyncComponent)
    },
  }
}
export default loadable