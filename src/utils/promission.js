export default  function getRole(data){
var role=window.sessionStorage.getItem('btn')
  if(role.indexOf(data)>-1){
      return true
  }else{
      return false
  }
}
