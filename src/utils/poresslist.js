export default  function getList (data){
    var list=window.sessionStorage.getItem('list')
      if(list.indexOf(data)>-1){
          return true
      }else{
          return false
      }
    }
    