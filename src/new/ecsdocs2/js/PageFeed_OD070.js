//function popJump2(selOBJ){
//  n = selOBJ.selectedIndex;
//  page_size = selOBJ.options[n].value;
//  var formnum =  document.getElementsByName("formx");
//  var len = formnum.length
//  if(page_size != -1){
//    document.formx[0].pageSize.value = page_size;
//    document.formx[0].pageNo.value = 1;
//    document.formx[0].submit();
//  }
//}
//
//function goto_p2(_value,callbackFunc) {
//  page_submit(_value,callbackFunc);
//}

function toHanNum2(motoTxt){
    var motoText = motoTxt.toString();
    han = "0123456789.,-+";
    zen = "ÇOÇPÇQÇRÇSÇTÇUÇVÇWÇXÅDÅCÅ|Å{";
    str = "";
    for (i=0; i<motoText.length; i++)
    {
        c = motoText.charAt(i);
        n = zen.indexOf(c,0);
        if (n >= 0) c = han.charAt(n);
        str += c;
    }
    return str;
}
function page_submit2(page) { 
	var page_n = toHanNum2(page);
	if (isNaN(page_n))
	page_n = 1;
	document.form2.intPageNo.value = page_n;
	document.form2.submit();
}
//	function goto_p2() {
//	  page_submit2(document.getElementById("go_page2").value);
//	}
function goto_p_pull2() {
  page_submit2(document.getElementById("go_page_pull2").value);
}
