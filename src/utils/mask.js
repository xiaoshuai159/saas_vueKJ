// 全部掩码规则
 
// 用户姓名（限定：文字必须≥2）：仅显示姓名中的最后一个汉字，其余文字使用 *（根据实际字数）代替。
export function nameMask (value) {
    if (value && value.length >= 2) {
      return "*".repeat(value.length-1) + value.substr(value.length - 1)
    } else {
      return value
    }
  }
 
  // 手机号：仅显示前三位与后两位数字，其余数字使用 *（根据实际位数） 代替。
  export function numberMask (value) {
    if (value) {
      return value.substr(0, 5) + "*".repeat(value.length-5)
    } else {
      return value
    }
  }
 
  // 地址名称：仅显示头、尾各两个文字，其余字符统一使用6位 * 代替。
  export function companyMask (value) {
    if (value && value.length > 5) {
      return value.substr(0, 4) + "*".repeat(value.length-4)
    }else if(value && value.length <= 5){
      return value.substr(0, 2) + "*".repeat(value.length-2)
    } 
    else {
      return value
    }
  }