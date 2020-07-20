const isNullOrEmpty = function(val) {
    if (val == null || val == "" || typeof(val) == undefined) {
        return true;
    } else {
        return false;
    }
}
const numFormat = function (params) {
    if (params === null || params === undefined) {
        return null
      } else if (isNaN(params)) {
        return 'NaN'
      } else {
        let num = params.toString()
        if (/^-?\d+\.?\d+$/.test(num)) {
          if (/^-?\d+$/.test(num)) {
            num = num.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
          } else {
            let numarray = num.split('.')
            let numbefore = numarray[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
            num = numbefore + '.' + numarray[1]
          }
        }
        return num
      }
}
const toBase64 = function (str) {
  return btoa(str)
}
const sortByValue = function(arr,value) {
  arr.sort(function(x,y) {
      let m = (value && x[value]) || x,
      n = (value && y[value]) || y;
      return n - m
  })
  return arr
}
 
export {
    isNullOrEmpty,
    numFormat,
    toBase64,
    sortByValue
}