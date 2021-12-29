export default  function cutstr(str, len) {
 
    var str1 = 0;
 
    var str2 = 0;
 
    var str3 = new String();
 
    str2 = str.length;
 
    for (var i = 0; i < str2; i++) {
    var    a = str.charAt(i);
       
        str1++;
        if (escape(a).length > 4) {
            //中文字符的长度经编码之后大于4  
           
            str1++;
        }
       
        str3 = str3.concat(a);
       
        if (str1 >= len) {
           
            str3 = str3.concat("...");
           
            return str3;
        }
    }
    //如果给定字符串小于指定长度，则返回源字符串； 
   0 
    if (str1 < len) {
        return str;
    }
}