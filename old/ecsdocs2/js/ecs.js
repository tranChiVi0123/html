/*	ECS-Solution JavaScript framework, version 0.1.0
 *	(c) 2005-2008 DHK
 *	Author:LiHuan
/*--------------------------------------------------------------------------*/
window.onload = function() {
   var colorful = new ColorfulInput;
   colorful.set();
}
function setFirstFocus() {
	this.skip  = ["button","submit","hidden"];

	this.set = function() {
	  for (var i = 0; i < document.forms.length; i++) {
		 for (var f = 0; f < document.forms[i].length; f++) {
			var elm = document.forms[i][f];
			if(!this._checkSkip(elm)) continue;
			if(elm.disabled == true) continue;
			if(elm.readOnly == true) continue;
			if(elm.tabIndex == -1) continue;
			if (elm.style.display=='none') continue;
			try{elm.focus();}catch(e){continue;}
			return;
		 }
	  }
   }
   this._checkSkip = function(elm) {
	  for(var i in this.skip) {
		 if(elm.type == this.skip[i]) return false;
	  }
	  return true;
   }
}	

function ColorfulInput() {
   this.skip  = ["button","submit","checkbox","radio","select-one"];
   this.color = { 'blur': '', 'focus': '#ffcc99' };

   this.set = function() {
	  for (var i = 0; i < document.forms.length; i++) {
		 for (var f = 0; f < document.forms[i].length; f++) {
			var elm = document.forms[i][f];
			if(!this._checkSkip(elm)) continue;

			if (elm.type == "text" && elm.readOnly != "") continue;
			this._setColor(elm, 'focus');
			this._setColor(elm, 'blur');
			elm.onkeypress=function(){_chkInp();};
		 }
	  }
   }

   this._checkSkip = function(elm) {
	  for(var i in this.skip) {
		 if(elm.type == this.skip[i]) return false;
	  }
	  return true;
   }

   this._setColor = function(elm, type) { 
	  var color = this.color[type];
	  var event = function() { elm.style.backgroundColor = color; };

	  if(elm.addEventListener) {
		 elm.addEventListener(type, event, false); 
	  } else if(elm.attachEvent) {
		 elm.attachEvent('on'+type, event); 
	  } else {
		 elm['on'+type] = event;
	  }
   }
}

/* Input Text Box Check */
function _chkInp(){
	var regCh = /[\W\w]/;
	var regAll = /[\W\w]/;
	if(event == null ||event.srcElement == null) return;
	try{
		switch(event.srcElement.className){
			case "float": regCh = /[0-9.]/; regAll = /^[0-9.]*$/; break;
			case "code": regCh = /[0-9a-zA-Z-_*]/; regAll = /^[0-9a-zA-Z-_*]*$/; break;
			case "code2": regCh = /[0-9a-zA-Z-_\/*]/; regAll = /^[0-9a-zA-Z-_\/*]*$/; break;
			case "code3": regCh = /[0-9a-zA-Z-_ \/*]/; regAll = /^[0-9a-zA-Z- _\/*]*$/; break;
			case "numcode": regCh = /[0-9]/; regAll = /^[0-9]*$/; break;
			case "half": regCh = /\S/; regAll = /^\S*$/; break;
			case "int": regCh = /[0-9-]/; regAll = /^[0-9-]*$/; break;
			case "tel": regCh = /[0-9-]/; regAll = /^[0-9-]*$/; break;
			case "zip": regCh = /[0-9-]/; regAll = /^[0-9-]*$/; break;
			case "zip1": regCh = /[0-9]/; regAll = /^[0-9]*$/; break;
			case "zip2": regCh = /[0-9]/; regAll = /^[0-9]*$/; break;
			case "num": regCh = /[0-9]/; regAll = /^[0-9]*$/; break;
			case "en": regCh = /^[\x00-\xff]*$/; regAll = /^[\x00-\xff]*$/; break;
			case "ymd": eval("regCh = /[0-9/]/; regAll = /^[0-9/]*$/;"); break;
			case "ym": eval("regCh = /[0-9/]/; regAll = /^[0-9/]*$/;"); break;
			case "time": eval("regCh = /[0-9:]/; regAll = /^[0-9:]*$/;"); break;
			case "mail":  eval("regCh = /[0-9a-zA-Z-_@.*!#$%&'+/=?^`{|}~;]/; regAll = /^[0-9a-zA-Z-_@.*!#$%&'+/=?^`{|}~;]*$/; "); break;
			case "mail2": eval("regCh = /[0-9a-zA-Z-_@.*!#$%&'+/=?^`{|}~;]/; regAll = /^[0-9a-zA-Z-_@.*!#$%&'+/=?^`{|}~;]*$/; "); break;
			case "color": regCh = /[0-9a-fA-F#]/; regAll = /^[0-9a-fA-F#]*$/; break;
			default: break;
		}
		switch(event.type){
			case "keypress": event.returnValue = regCh.test(String.fromCharCode(event.keyCode)); break;
			case "paste" : event.returnValue = regAll.test(window.clipboardData.getData("text")); break;
			case "drop" : event.returnValue = regAll.test(event.dataTransfer.getData("text")); break;
			case "blur" : if(regAll.test(event.srcElement.vlaue)) alert("Input Error!"); return;
			default: break;
		}
		if(!event.returnValue && event.preventDefault){
			event.preventDefault();
		}
	}catch(e){
		
 }
}


//カンマ付与
function _toComma(checkString){
	if(checkString=="-"){
		return "";
	}
	checkString = reComma(new String(checkString).replace(/[ 　]/g, ""));
	
	if(checkString=="") return "";
	var newString = "";
	var flag = "";	// マイナスのとき"-"を格納
	var flg = 1;
	for (i=checkString.length-1; i>=0; i--) {
		ch = checkString.substring(i, i+1);
		if (ch == "-"&&i == 0) {	// 左端で "-"はマイナス記号
			flag = ch;
		} else if ((ch >= "0"&&ch <= "9")) {
			newString = ch + newString;
		} else if (flg == 1&&ch == ".") {
			newString = ch + newString;
			flg = 0;
		} else {
			return 0;
		}
	}
	//カンマ区切りにする
	cnt = 0;
	n	= "";
	
	//newString = eval(newString).toString(10);
	newString = parseFloat(newString)+"";
	
	for (i=newString.length-1; i>=0; i--)
	{
		ch = newString.substring(i, i+1);
		if(flg == 1) {
			if ((ch >= "0"&&ch <= "9")) {
				n = newString.charAt(i) + n;
				cnt++;
				if (((cnt % 3) == 0)&&(i != 0)) n = ","+n;
			}
		}
		else
		{
			n = newString.charAt(i) + n;
		}
		if(newString.charAt(i) == ".") {
			flg = 1;
		}
	}
	return (flag+n);
}

//カンマ削除
function _reComma(val){
	num = val.split(",");
	newstring = num.join("");
	return newstring;
}

//---------------Date Utils -----------------//
function _praseDate(DateString,Dilimeter_s,Dilimeter_r)
{
	if(!_isDate(DateString,Dilimeter_s)) return "";
	if (DateString==null) return "";

	var year="";
	var month="";
	var day="";
	var temparray;
	if (Dilimeter_s=="" || Dilimeter_s==null) 
	{
		if(DateString.length!=8) return "";
		year=DateString.substr(0,4);
		month=DateString.substr(4,2);
		day=DateString.substr(6,2);
	}
	else
	{
		temparray=DateString.split(Dilimeter_s);
		if (temparray.length!=3) return false;
		if (temparray[0].length==4) {
			year=temparray[0];
			month=temparray[1]<10?"0"+(temparray[1]*1):temparray[1];
			day=temparray[2]<10?"0"+(temparray[2]*1):temparray[2];
			
		}
		else {
			year=temparray[2];
			month=temparray[0]<10?"0"+(temparray[0]*1):temparray[0];
			day=temparray[1]<10?"0"+(temparray[1]*1):temparray[1];
		}
	}
	return	year +	Dilimeter_r + month + Dilimeter_r + day;
}
function _getLastDay(year,month) {
	var m = [31,28,31,30,31,30,31,31,30,31,30,31];
	if (month != 2) return m[month - 1];
	if (year%4 != 0) return m[1];
	if (year%100 == 0 && year%400 != 0) return m[1];
	return m[1] + 1;
} 

function _formateDate(obj,strErr)
{
	mc();
	var strDate = obj.value;
	if(strDate==null || strDate=="") return;
	if( (strDate.length <= 2 && strDate <= 31 && strDate >= 0) 
		|| (strDate == "99") 
		|| (strDate.length == 4 && strDate != "9999")
		|| (strDate.length == 5 && strDate != "99/99")){
		
		var strM;
		var strD;
		var myDate = new Date();

		if(strDate.length == 4){
			strM = strDate.substr(0,2);
			strD = strDate.substr(2,2);
		}else if(strDate.length == 5){
			strM = strDate.substr(0,2);
			strD = strDate.substr(3,2);
		}else{
			strM = myDate.getMonth() + 1
			strD = strDate;
		}
		
		var lastDay = _getLastDay(myDate.getYear(),strM);
		
		if(strD == "99"){
			strD = lastDay;
		}
		
		if(strD <= lastDay){
			
			var tempMonth = strM;
			var tempDate;
			if(strD != 0){
				tempDate = strD;
			}else{
				if(myDate.getDate()<=lastDay){
					tempDate = myDate.getDate();
				}else{
					tempDate = lastDay;
				}
			}
			if(tempMonth < 10){
				tempMonth = "0" + (tempMonth*1);
			}
			if(tempDate < 10){
				tempDate = "0" + (tempDate*1);
			}
			obj.value = myDate.getFullYear()+"/"+tempMonth+"/"+tempDate;
			return;
		}
	}

	if((strDate.length == 3 && strDate == "999")
	   || (strDate.length == 4 && strDate == "9999")
	   || (strDate.length == 5 && strDate == "99/99")
	   || (strDate.length == 8 && strDate == "99999999")
	   || (strDate.length == 10 && strDate == "9999999999")
	   ){
			obj.value = "9999/12/31";
			return;
	}

	if(!_chkDate(strDate))
	{
		m(strErr);
		//obj.focus();
		return;
	}

	if(strDate.indexOf("/")<0)
	{
		obj.value = _praseDate(strDate,"","/");
	}else{
		obj.value = _praseDate(strDate,"/","/");
	}
}
function _formateYM(obj,strErr){
	mc();
	var strDate = obj.value;
	if(strDate==null || strDate=="") return;
	
	if((strDate.indexOf("/") < 0 && strDate.length != 6)||(strDate.indexOf("/") > 0 && strDate.length != 7)) {
		m(strErr);
		//obj.focus();
		return;
	}
	
	var strY = "";
	var strM = "";
	if(strDate.indexOf("/")<0){
		strY = strDate.substr(0,4);
		strM = strDate.substr(4,2);
	}else{
		strY = strDate.substr(0,4);
		strM = strDate.substr(5,2);
	}
	//if(strY < 1900 || strY > 2100){
	if(strY < 1900){
		m(strErr);
		obj.focus();
		return;
	}
	
	if(strM < 0 || strM > 12){
		m(strErr);
		obj.focus();
		return;
	}
	
	obj.value = strY+"/"+strM;
}

function _isYm(obj){
	var strDate = obj.value;
	if(strDate==null || strDate=="") return true;
	
	if((strDate.indexOf("/") < 0 && strDate.length != 6)||(strDate.indexOf("/") > 0 && strDate.length != 7)) {
		return false;
	}
	
	var strY = "";
	var strM = "";
	
	if(strDate.indexOf("/")<0){
		strY = strDate.substr(0,4);
		strM = strDate.substr(4,2);
	}else{
		strY = strDate.substr(0,4);
		strM = strDate.substr(5,2);
	}
	//if(strY < 1900 || strY > 2100){
	if(strY < 1900){
		return false;
	}
	
	if(strM < 1 || strM > 12){
		return false;
	}
	return true;
}

function _isDate(DateString,Dilimeter)
{
	if (DateString==null) return false;
	var pattern;
	var year="";
	var month="";
	var day="";
	var temp="";
	var temparray=new Array();
	if (Dilimeter=="" || Dilimeter==null) 
	{
		//pattern = /^[1-2][0-9]{3}[0-1][0-9][0-3][0-9]$/;
		pattern = /^[1-9][0-9]{3}[0-1][0-9][0-3][0-9]$/;

		if(DateString.length!=8) return false;
		year=DateString.substr(0,4);
		month=DateString.substr(4,2);
		day=DateString.substr(6,2);
	}
	else
	{

		//pattern = /^[1-2][0-9]{3}[\/][0-1][0-9][\/][0-3][0-9]$/;
		pattern = /^[1-9][0-9]{3}[\/][0-1]?[0-9][\/][0-3]?[0-9]$/;
		temparray=DateString.split(Dilimeter);
		if (temparray.length!=3) return false;
		if (temparray[0].length==4) {
			year=temparray[0];
			month=temparray[1];
			day=temparray[2];
		}
		else {
			year=temparray[2];
			month=temparray[0];
			day=temparray[1];
		}
	}
	
	if (!pattern.test(DateString)){
		return false;
	}
	if (isNaN(Date.parse(month+"/"+day+"/"+year))) { 
		return false; 
	} 
	
	var dd = parseInt(day,10); 
	var mm = parseInt(month,10)-1; 
	var yy = parseInt(year,10); 
	var date = new Date(yy,mm,dd);
	//if (yy<1901 || yy>2100) {
	if (yy<1901) {
		return false;
	}
	 
	if (dd!=date.getDate() || mm!=date.getMonth() || yy!=date.getFullYear()) { 
		return false; 
	} 
	return true; 
}  

function _chkDate(strDate)
{
	if(strDate==null||strDate=="") return true;
	if(strDate.indexOf("/")>0)
	{	   
		return _isDate(strDate,"/");
	}else{ 
		return _isDate(strDate);
	}
}

function $$(element) {
  return document.getElementById(element);
}

// Ajax By JQuery
function _SendByAjax(_url,_param,_debug,_async){
	$.ajax({url : _url,
			type : 'post',
			dataType : 'html',
			data : _param,
			async : _async,
			timeout : 10000,
			error: function (xhr, desc, exceptionobj) {
				alert("Ajax post response error ! \nServer response data is:\n"+xhr.responseText);
  			},
			success: function(data,textStatus){
						if(_debug == "1"){
							alert(data);
						}
						try{
							eval(data);
						}catch(e){
							alert("Ajax javascript execute error ! \nServer response data is:\n"+data);
						}
					}
			});
}

//Menu Ajax By JQuery
function _MenuSendByAjax(_url,_param,_debug,_async){
	$.ajax({url : _url,
			type : 'post',
			dataType : 'html',
			data : _param,
			async : _async,
			timeout : 10000,
			error: function (xhr, desc, exceptionobj) {
				//try{alert("Ajax post response error ! \nServer response data is:\n"+xhr.responseText);}catch(e){}
				//alert("Ajax post response error ! \nServer response data is:\n"+xhr.responseText);
			},
			success: function(data,textStatus){
						if(_debug == "1"){
							alert(data);
						}
						try{
							eval(data);
						}catch(e){
							alert("Ajax javascript execute error ! \nServer response data is:\n"+data);
						}
					}
			});
}

//JQuery Page Init
function _PageInit(_table,_checkbox,_imagelink,_enter,_input,_focus){
	var firstFocus = new setFirstFocus;
	if(arguments.length >= 1){
		if(arguments.length >= 1 && _table == 1){_TableInit();_TableInit2();}
		if(arguments.length >= 2 && _checkbox == 1){_CheckBoxAllInit();}
		if(arguments.length >= 3 && _imagelink == 1){_ImageLinkInit();}
		if(arguments.length >= 4 && _enter == 1){_Enter2Tab();}
		if(arguments.length >= 5 && _input == 1){_InputInit();}
		if(arguments.length >= 6 && _focus == 1){firstFocus.set();}
	}else{
		_TableInit();
		_TableInit2();
		_CheckBoxAllInit();
		_ImageLinkInit();
		_Enter2Tab();
		_InputInit();
		firstFocus.set();
	}
}

function _InputInit(){
	$('input[@onkeypress]').each(function(i,text){this.onpaste = function(){_chkInp();};
												  this.ondrop = function(){_chkInp();};
												  $(text).unbind("blur"); 
												  $(text).bind("blur",function(){_forbiddenCharacterCheck(text);});
													});

	$('textarea').each(function(i,textarea){$(textarea).unbind("blur"); 
											$(textarea).bind("blur", function(){_forbiddenCharacterCheck(textarea);});
										});
	
	
}

//Table Init By JQuery
function _TableInit(){
	$(".lt").each(function(index,table){
			var rowSpan = $(this).find("tr:first-child").children().attr("rowSpan");
			//var rowSpan = $(this).find("tr:first").find("th:first").attr("rowSpan");
			var groupIndex = rowSpan + 1;
			var groupId = 1;
			$(this).find("tr").not(".head").each(
				function(i,row){
					var bgColor = "";
					if(this.style.backgroundColor != ""){
						bgColor = this.style.backgroundColor;
					}else{
						if( (i % (rowSpan*2)) < rowSpan){
							bgColor = "#ffffff";
						}else{
							bgColor = "#EEEEEE";
						}
					}
					if(groupIndex <= 1){
						groupIndex = rowSpan;
						groupId = groupId + 1;
					}else{
						groupIndex = groupIndex - 1;
					}
					this.style.backgroundColor = bgColor;
					this._groupId = groupId;
					$(this).find("input[@type=text][@readOnly]").each(function(i,inputText){ this.style.backgroundColor=bgColor;})
					/*
					$(this).hover(function(){_ChangeColor(table,row,"#FFFF66");},
								  function(){_ChangeColor(table,row,bgColor);});
					*/
				})
			
		});	
}//Table Init2 By JQuery
function _TableInit2(){
	$(".lt2").each(function(index,table){
			var rowSpan = $(this).find("tr:first-child").children().attr("rowSpan");
			//var rowSpan = $(this).find("tr:first").find("th:first").attr("rowSpan");
			var groupIndex = rowSpan + 1;
			var groupId = 1;
			$(this).find("tr").not(".head").each(
				function(i,row){
					var bgColor = "";
					if(this.style.backgroundColor != ""){
						bgColor = this.style.backgroundColor;
					}else{
						if( (i % 2) < 1){
							bgColor = "#ffffff";
						}else{
							bgColor = "#EEEEEE";
						}
					}
					if(groupIndex <= 1){
						groupIndex = rowSpan;
						groupId = groupId + 1;
					}else{
						groupIndex = groupIndex - 1;
					}
					this.style.backgroundColor = bgColor;
					this._groupId = groupId;
					$(this).find("input[@type=text][@readOnly]").each(function(i,inputText){ this.style.backgroundColor=bgColor;})
					/*
					$(this).hover(function(){_ChangeColor(table,row,"#FFFF66");},
								  function(){_ChangeColor(table,row,bgColor);});
					*/
				})
			
		});	
}
// Change Color By JQuery
function _ChangeColor(_table,_row,_color){
	$(_table).find("[_groupId="+ _row._groupId +"]").each(
		function(i){
			this.style.backgroundColor = _color;
			$(this).find("input[@type=text][@readOnly]").each(function(i,inputText){ this.style.backgroundColor=_color;});
		}
	);
}

function _ImageLinkInit(){
	$('a[class^=img]').each(function(i,link){this.tabIndex=-1;});
	$('a[class=but039]').each(function(i,link){this.tabIndex=-1;});
}

function _CheckBoxAllInit(){
	$("input[@_target]").each(
		function(i,checkboxAll){
			$(checkboxAll).click(function(){_CheckAllChecked(checkboxAll)});
			$("input[@name="+ $(checkboxAll).attr("_target")+"]",$$(checkboxAll._targetForm)).each(
				function(j,checkbox){
					$(checkbox).click(function(){_Checked(checkboxAll)});
				}
			);
			_Checked(checkboxAll);
		}
	);
}

function _Checked(checkboxAll){
	var checkedLength = $("input[@name="+ $(checkboxAll).attr("_target") + "]",$$(checkboxAll._targetForm)).length;
	if(checkedLength == 0){
		return ;
	}
	if(checkedLength == $("input[@name="+ $(checkboxAll).attr("_target") +"][@checked]",$$(checkboxAll._targetForm)).length){
		checkboxAll.checked = true;
	}else{
		checkboxAll.checked = false;
	}
}

function _CheckAllChecked(checkboxAll){
	$("input[@name="+ $(checkboxAll).attr("_target") +"]",$$(checkboxAll._targetForm)).each(
		function(j,checkbox){
			checkbox.checked = checkboxAll.checked;
		}
	);
}

// Change Display Div By JQuery
function _ChangePageDivSize(_select,_divId,_rowspan,_rowHeight){
	var _span = 0;
	if(_rowspan >1){
		_span = 1;
	}
	if($$(_divId).scrollHeight > (_select.value * (_rowspan <= 1? 1 : _rowspan) * _rowHeight)){
		$("#"+_divId).css("height", ((_select.value * (_rowspan <= 1? 1 : _rowspan) * _rowHeight)+_span)+"px");
	}else{
		$("#"+_divId).css("height", "auto");
	}
	$("#"+_divId).css("max-height", ((_select.value * (_rowspan <= 1? 1 : _rowspan) * _rowHeight)+_span)+"px");
	try{
		$.cookie(_select.id, _select.value);
	}catch(e){
	}
}

function _Enter2Tab(){
	document.body.onkeydown=function(){
		try{
			if(event.srcElement.type == "file" && event.keyCode==13){
				return false;
			};
			if(event.srcElement.value == "新規登録" && event.keyCode==13){
				event.keyCode = 9;
				return;
			};
			if(event.srcElement.type == "textarea" && event.keyCode==13){
				return;
			};
			if (!(event.srcElement.type == "button" || event.srcElement.type == "submit")){
				if (event.keyCode == 13){
					event.keyCode = 9;
				}
			}
			} catch(e) {
		}
	};
}

function _InitPageDiv(v_id){
	var pageSize = 10;
	try{
		if($.cookie(v_id) == "" || $.cookie(v_id) == null || $.cookie(v_id) == "null"){
		}else{
			pageSize = $.cookie(v_id);
		}
	}catch(e){
	
	}
	try{
		$$(v_id).value = pageSize;
		$($$(v_id)).change();
	}catch(e){
	}
}
//	Hyper Message Box
function mc(){
	mheadHide();
	if($(".error_strings").length > 0){
		$(".error_strings").eq(0).html("");
		document.body.style.backgroundColor = _ok_color;
	}
}
function m(_msg){
	if($(".error_strings").length > 0){
		mheadShow();
		$(".error_strings").eq(0).html("");
		$(".error_strings").eq(0).append("<ul><li>"+_msg+"</li></ul>");
		document.body.style.backgroundColor = _error_color;
	}else{
		alert("@"+_msg+"@");
	}
}
function m2(_msg){
	if(_msg == "") return;
	if($(".error_strings").length > 0){
		mheadShow();
		var _errorDiv = $(".error_strings").eq(0);
		if($(_errorDiv).find("ul").length == 0){
			$(_errorDiv).append("<ul></ul>");
		}
		$(_errorDiv).find("ul").append("<li>"+_msg+"</li>");
		document.body.style.backgroundColor = _error_color;
	}else{
		alert("@"+_msg+"@");
	}
	
	if($('.error_strings').text().indexOf('ERROR') > 0){
		mheadShow();
	} else {
		mheadHide();
	}
}
function mheadShow() {
	var obj = document.getElementById("tipDiv");
	if(obj == null){
	} else {
		sc2();
		obj.style.display = "";
	}
}
function mheadHide() {
	var obj = document.getElementById("tipDiv");
	if(obj == null){
	} else {
		obj.style.display = "none";
	}
} 
function sc2(){
	document.getElementById('tipDiv').style.top = document.body.scrollTop;
	document.getElementById('tipDiv').style.left = document.body.scrollLeft + document.body.clientWidth - 330;
}

function btnDisabled() {
	$("input[@type=button]").each(function() {
		this.disabled = "disabled";
	});
}
function btnAbled() {
	$("input[@type=button]").each(function() {
		this.disabled = false;
	});
}
function isNull(str){
	if(str.Trim()==""){
		return true;
	}
	else{
		return false;
	}
}
//check string can change to negative integer or positive integer;
//intstring:be checked string,sign:'+' or '-'
function isInteger(intstring,sign) {
	var integer;
	if (sign!=null && sign!="-" && sign!="+") return false;
	integer=parseInt(intstring);
	if (isNaN(integer)) return false;
	if (integer.toString().length==intstring.length) {
		if ((sign==null) || (sign=="-" && integer<0) || (sign=="+" && integer>0)) {
			return true;
		}
		else {
			return false;
		}
	}
	else {
		return false;
	}
}

//check decimail digits float
//len:float max length
//dec_digits:decimal digits
function isFloat(floatStr,len,dec_digits) {
	if (isNaN(parseFloat(floatStr))) 
		return false;
	
	var pattern;
	var pattern_str = '';
	var step_num;
	for (var i=len-dec_digits;i>0;i-=3) {
		if ((i / 3) > 1) {
			step_num = 3;
			pattern_str =  '(' + pattern_str + '(,?[0-9]{1,' +step_num+ '})?)';
		}
		else {
			step_num = i%3;
			if (step_num == 0)
				step_num = 3;
			pattern_str = '(([0-9]{1,'+step_num+'})?' + pattern_str + ')';
		}
	}
	
	pattern_str = '/^' +pattern_str + '([.][0-9]{1,' + dec_digits + '})?$/';
	//document.write(pattern_str);
	eval('pattern = ' + pattern_str);
	if (pattern == null){
		return false;
	}
	else{
		if (!pattern.test(floatStr)){
			return false;
		}
	}
	return true;
}

function isMail(strValue) {
	//var reg = /^[^\d\-_][\w\-]*[^\-_]@[^\-][a-zA-Z\d\-]*[^\-](\.[^\-][a-zA-Z\d\-]*[^\-])*\.[a-zA-Z]{3}(\.[a-zA-Z]{2})?$/;
	var reg = /^([\w-\.])+@([\w-])+(\.[\w-])+/;
	if(!reg.test(strValue)){
		return false;
	}
	return true;
}

function isZip(strValue) {
	var reg = /^[0-9\-]{1,10}$/;
	if(!reg.test(strValue)){
			return false;
	}
	return true;
}

function isTel(strValue) {
	var reg = /^[0-9\-]{1,20}$/;
	if(!reg.test(strValue)){
		return false;
	}
		return true;
}

function isDate(DateString,Dilimeter){
	_isDate(DateString,Dilimeter);
}

function isCode(SpecialStr) {
	var strFormat = /^[0-9a-zA-Z\-]*$/;
	if (strFormat.test(SpecialStr)){
		return true;
	}else{
		return false;
	}
}

//Trim,LTrim,RTrim method add to String object;
String.prototype.Trim = function() 
{ 
	return this.replace(/(^ *)|( *$)/g, ""); 
};

String.prototype.LTrim = function() 
{ 
	return this.replace(/(^ *)/g, ""); 
};

String.prototype.RTrim = function() 
{ 
	return this.replace(/( *$)/g, "");
};

function bindCalender(objText,objLink,strNewId){
	objText.id = strNewId;
	objLink.id = objText.id + '_calendar_link_id';
	Calendar.setup({inputField:objText.id,ifFormat:'%Y/%m/%d',showsTime:false,weekNumbers:false,button: objLink.id,singleClick : true,step:1});
}

/**
 * 半角カナであるかをチェックします。
 * 
 * @param チェックする値
 * @return ture : 半角カナ / flase : 半角カナ以外
 */
function isHankakuKana(value) {
  for (var i = 0; i < value.length; ++i) {
	var c = value.charCodeAt(i);
	//	半角カタカナは不許可
	if (c >= 0xff61 && c <= 0xff9f) {
	  return true;
	}
  }
  return false;
}

/**
 * 全角であるかをチェックします。
 * 
 * @param チェックする値
 * @return ture : 全角 / flase : 全角以外
 */
function isZenkaku(value) {
  for (var i = 0; i < value.length; ++i) {
	var c = value.charCodeAt(i);
	//	半角カタカナは不許可
	if (c < 256 || (c >= 0xff61 && c <= 0xff9f)) {
	  return false;
	}
  }
  return true;
}

/**
 * 文字列のバイト数を取得する。
 * 全角を2バイト、半角を1バイトとしてカウントします。
 * 
 * @param バイトを取得する値
 * @return 取得したバイト数
 */
function getByteCount(value) {
  var count = 0;
  for ( var i = 0; i < value.length; ++i ) {
	var sub = value.substring(i, i + 1);
	//全角の場合２バイト追加。
	if( isZenkaku(sub) ){
	  count += 2;
	} else {
	  count += 1;
	}
  }
  return count;
}

function errorShow(){
	document.body.scrollTop = document.body.scrollHeight;
}

function InputToComma(obj){
	try{
		if(obj.value.indexOf(",") < 0){
			return;
		}
		obj.value=reComma(obj.value);
	}catch(e){}
}

function InputReComma(obj){
	try{
		if(obj.value.length <= 3){
			return;
		}
		obj.value=toComma(obj.value);
	}catch(e){}
}

function _forbiddenCharacterCheck(inputObj) {
  // 入力値チェック
  var text = $(inputObj).val();
  var className = $(inputObj).attr('className'); 
  var readonly = $(inputObj).attr('readonly');
  if(text == ""){return true;}
  if(className == "num" || className == "float" || className == "int" || className == "disp"){return true;}
  if(readonly == true){return true;}
  
  //「,」「'」と第三・第四水準漢字は禁止
  if (!text.match(/(^[\t\n\r !"#\$%&\(\)\*\+\-\.\/0123456789:;<=>\?@ABCDEFGHIJKLMNOPQRSTUVWXYZ\[\\\]\^_`abcdefghijklmnopqrstuvwxyz\{\|\}~｡｢｣､･ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝﾞﾟ｡｢｣､･ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝﾞSﾟ　、。，．・：；？！゛゜´｀¨＾￣＿ヽヾゝゞ〃仝々〆〇ー―‐／＼～∥｜…‥‘’“”（）〔〕［］｛｝〈〉《》「」『』【】＋－±×÷＝≠＜＞≦≧∞∴♂♀°′″℃￥＄￠￡％＃＆＊＠§☆★○●◎◇◆□■△▲▽▼※〒→←↑↓〓∈∋⊆⊇⊂⊃∪∩∧∨￢⇒⇔∀∃∠⊥⌒∂∇≡≒≪≫√∽∝∵∫∬Å‰♯♭♪†‡¶◯０１２３４５６７８９ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚぁあぃいぅうぇえぉおかがきぎくぐけげこごさざしじすずせぜそぞただちぢっつづてでとどなにぬねのはばぱひびぴふぶぷへべぺほぼぽまみむめもゃやゅゆょよらりるれろゎわゐゑをんァアィイゥウェエォオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモャヤュユョヨラリルレロヮワヰヱヲンヴヵヶΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρστυφχψωАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя─│┌┐┘└├┬┤┴┼━┃┏┓┛┗┣┳┫┻╋┠┯┨┷┿┝┰┥┸╂①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳ⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩ㍉㌔㌢㍍㌘㌧㌃㌶㍑㍗㌍㌦㌣㌫㍊㌻㎜㎝㎞㎎㎏㏄㎡㍻〝〟№㏍℡㊤㊥㊦㊧㊨㈱㈲㈹㍾㍽㍼≒≡∫∮∑√⊥∠∟⊿∵∩∪ⅰⅱⅲⅳⅴⅵⅶⅷⅸⅹ￢￤＇＂亜唖娃阿哀愛挨姶逢葵茜穐悪握渥旭葦芦鯵梓圧斡扱宛姐虻飴絢綾鮎或粟袷安庵按暗案闇鞍杏以伊位依偉囲夷委威尉惟意慰易椅為畏異移維緯胃萎衣謂違遺医井亥域育郁磯一壱溢逸稲茨芋鰯允印咽員因姻引飲淫胤蔭院陰隠韻吋右宇烏羽迂雨卯鵜窺丑碓臼渦嘘唄欝蔚鰻姥厩浦瓜閏噂云運雲荏餌叡営嬰影映曳栄永泳洩瑛盈穎頴英衛詠鋭液疫益駅悦謁越閲榎厭円園堰奄宴延怨掩援沿演炎焔煙燕猿縁艶苑薗遠鉛鴛塩於汚甥凹央奥往応押旺横欧殴王翁襖鴬鴎黄岡沖荻億屋憶臆桶牡乙俺卸恩温穏音下化仮何伽価佳加可嘉夏嫁家寡科暇果架歌河火珂禍禾稼箇花苛茄荷華菓蝦課嘩貨迦過霞蚊俄峨我牙画臥芽蛾賀雅餓駕介会解回塊壊廻快怪悔恢懐戒拐改魁晦械海灰界皆絵芥蟹開階貝凱劾外咳害崖慨概涯碍蓋街該鎧骸浬馨蛙垣柿蛎鈎劃嚇各廓拡撹格核殻獲確穫覚角赫較郭閣隔革学岳楽額顎掛笠樫橿梶鰍潟割喝恰括活渇滑葛褐轄且鰹叶椛樺鞄株兜竃蒲釜鎌噛鴨栢茅萱粥刈苅瓦乾侃冠寒刊勘勧巻喚堪姦完官寛干幹患感慣憾換敢柑桓棺款歓汗漢澗潅環甘監看竿管簡緩缶翰肝艦莞観諌貫還鑑間閑関陥韓館舘丸含岸巌玩癌眼岩翫贋雁頑顔願企伎危喜器基奇嬉寄岐希幾忌揮机旗既期棋棄機帰毅気汽畿祈季稀紀徽規記貴起軌輝飢騎鬼亀偽儀妓宜戯技擬欺犠疑祇義蟻誼議掬菊鞠吉吃喫桔橘詰砧杵黍却客脚虐逆丘久仇休及吸宮弓急救朽求汲泣灸球究窮笈級糾給旧牛去居巨拒拠挙渠虚許距鋸漁禦魚亨享京供侠僑兇競共凶協匡卿叫喬境峡強彊怯恐恭挟教橋況狂狭矯胸脅興蕎郷鏡響饗驚仰凝尭暁業局曲極玉桐粁僅勤均巾錦斤欣欽琴禁禽筋緊芹菌衿襟謹近金吟銀九倶句区狗玖矩苦躯駆駈駒具愚虞喰空偶寓遇隅串櫛釧屑屈掘窟沓靴轡窪熊隈粂栗繰桑鍬勲君薫訓群軍郡卦袈祁係傾刑兄啓圭珪型契形径恵慶慧憩掲携敬景桂渓畦稽系経継繋罫茎荊蛍計詣警軽頚鶏芸迎鯨劇戟撃激隙桁傑欠決潔穴結血訣月件倹倦健兼券剣喧圏堅嫌建憲懸拳捲検権牽犬献研硯絹県肩見謙賢軒遣鍵険顕験鹸元原厳幻弦減源玄現絃舷言諺限乎個古呼固姑孤己庫弧戸故枯湖狐糊袴股胡菰虎誇跨鈷雇顧鼓五互伍午呉吾娯後御悟梧檎瑚碁語誤護醐乞鯉交佼侯候倖光公功効勾厚口向后喉坑垢好孔孝宏工巧巷幸広庚康弘恒慌抗拘控攻昂晃更杭校梗構江洪浩港溝甲皇硬稿糠紅紘絞綱耕考肯肱腔膏航荒行衡講貢購郊酵鉱砿鋼閤降項香高鴻剛劫号合壕拷濠豪轟麹克刻告国穀酷鵠黒獄漉腰甑忽惚骨狛込此頃今困坤墾婚恨懇昏昆根梱混痕紺艮魂些佐叉唆嵯左差査沙瑳砂詐鎖裟坐座挫債催再最哉塞妻宰彩才採栽歳済災采犀砕砦祭斎細菜裁載際剤在材罪財冴坂阪堺榊肴咲崎埼碕鷺作削咋搾昨朔柵窄策索錯桜鮭笹匙冊刷察拶撮擦札殺薩雑皐鯖捌錆鮫皿晒三傘参山惨撒散桟燦珊産算纂蚕讃賛酸餐斬暫残仕仔伺使刺司史嗣四士始姉姿子屍市師志思指支孜斯施旨枝止死氏獅祉私糸紙紫肢脂至視詞詩試誌諮資賜雌飼歯事似侍児字寺慈持時次滋治爾璽痔磁示而耳自蒔辞汐鹿式識鴫竺軸宍雫七叱執失嫉室悉湿漆疾質実蔀篠偲柴芝屡蕊縞舎写射捨赦斜煮社紗者謝車遮蛇邪借勺尺杓灼爵酌釈錫若寂弱惹主取守手朱殊狩珠種腫趣酒首儒受呪寿授樹綬需囚収周宗就州修愁拾洲秀秋終繍習臭舟蒐衆襲讐蹴輯週酋酬集醜什住充十従戎柔汁渋獣縦重銃叔夙宿淑祝縮粛塾熟出術述俊峻春瞬竣舜駿准循旬楯殉淳準潤盾純巡遵醇順処初所暑曙渚庶緒署書薯藷諸助叙女序徐恕鋤除傷償勝匠升召哨商唱嘗奨妾娼宵将小少尚庄床廠彰承抄招掌捷昇昌昭晶松梢樟樵沼消渉湘焼焦照症省硝礁祥称章笑粧紹肖菖蒋蕉衝裳訟証詔詳象賞醤鉦鍾鐘障鞘上丈丞乗冗剰城場壌嬢常情擾条杖浄状畳穣蒸譲醸錠嘱埴飾拭植殖燭織職色触食蝕辱尻伸信侵唇娠寝審心慎振新晋森榛浸深申疹真神秦紳臣芯薪親診身辛進針震人仁刃塵壬尋甚尽腎訊迅陣靭笥諏須酢図厨逗吹垂帥推水炊睡粋翠衰遂酔錐錘随瑞髄崇嵩数枢趨雛据杉椙菅頗雀裾澄摺寸世瀬畝是凄制勢姓征性成政整星晴棲栖正清牲生盛精聖声製西誠誓請逝醒青静斉税脆隻席惜戚斥昔析石積籍績脊責赤跡蹟碩切拙接摂折設窃節説雪絶舌蝉仙先千占宣専尖川戦扇撰栓栴泉浅洗染潜煎煽旋穿箭線繊羨腺舛船薦詮賎践選遷銭銑閃鮮前善漸然全禅繕膳糎噌塑岨措曾曽楚狙疏疎礎祖租粗素組蘇訴阻遡鼠僧創双叢倉喪壮奏爽宋層匝惣想捜掃挿掻操早曹巣槍槽漕燥争痩相窓糟総綜聡草荘葬蒼藻装走送遭鎗霜騒像増憎臓蔵贈造促側則即息捉束測足速俗属賊族続卒袖其揃存孫尊損村遜他多太汰詑唾堕妥惰打柁舵楕陀駄騨体堆対耐岱帯待怠態戴替泰滞胎腿苔袋貸退逮隊黛鯛代台大第醍題鷹滝瀧卓啄宅托択拓沢濯琢託鐸濁諾茸凧蛸只叩但達辰奪脱巽竪辿棚谷狸鱈樽誰丹単嘆坦担探旦歎淡湛炭短端箪綻耽胆蛋誕鍛団壇弾断暖檀段男談値知地弛恥智池痴稚置致蜘遅馳築畜竹筑蓄逐秩窒茶嫡着中仲宙忠抽昼柱注虫衷註酎鋳駐樗瀦猪苧著貯丁兆凋喋寵帖帳庁弔張彫徴懲挑暢朝潮牒町眺聴脹腸蝶調諜超跳銚長頂鳥勅捗直朕沈珍賃鎮陳津墜椎槌追鎚痛通塚栂掴槻佃漬柘辻蔦綴鍔椿潰坪壷嬬紬爪吊釣鶴亭低停偵剃貞呈堤定帝底庭廷弟悌抵挺提梯汀碇禎程締艇訂諦蹄逓邸鄭釘鼎泥摘擢敵滴的笛適鏑溺哲徹撤轍迭鉄典填天展店添纏甜貼転顛点伝殿澱田電兎吐堵塗妬屠徒斗杜渡登菟賭途都鍍砥砺努度土奴怒倒党冬凍刀唐塔塘套宕島嶋悼投搭東桃梼棟盗淘湯涛灯燈当痘祷等答筒糖統到董蕩藤討謄豆踏逃透鐙陶頭騰闘働動同堂導憧撞洞瞳童胴萄道銅峠鴇匿得徳涜特督禿篤毒独読栃橡凸突椴届鳶苫寅酉瀞噸屯惇敦沌豚遁頓呑曇鈍奈那内乍凪薙謎灘捺鍋楢馴縄畷南楠軟難汝二尼弐迩匂賑肉虹廿日乳入如尿韮任妊忍認濡禰祢寧葱猫熱年念捻撚燃粘乃廼之埜嚢悩濃納能脳膿農覗蚤巴把播覇杷波派琶破婆罵芭馬俳廃拝排敗杯盃牌背肺輩配倍培媒梅楳煤狽買売賠陪這蝿秤矧萩伯剥博拍柏泊白箔粕舶薄迫曝漠爆縛莫駁麦函箱硲箸肇筈櫨幡肌畑畠八鉢溌発醗髪伐罰抜筏閥鳩噺塙蛤隼伴判半反叛帆搬斑板氾汎版犯班畔繁般藩販範釆煩頒飯挽晩番盤磐蕃蛮匪卑否妃庇彼悲扉批披斐比泌疲皮碑秘緋罷肥被誹費避非飛樋簸備尾微枇毘琵眉美鼻柊稗匹疋髭彦膝菱肘弼必畢筆逼桧姫媛紐百謬俵彪標氷漂瓢票表評豹廟描病秒苗錨鋲蒜蛭鰭品彬斌浜瀕貧賓頻敏瓶不付埠夫婦富冨布府怖扶敷斧普浮父符腐膚芙譜負賦赴阜附侮撫武舞葡蕪部封楓風葺蕗伏副復幅服福腹複覆淵弗払沸仏物鮒分吻噴墳憤扮焚奮粉糞紛雰文聞丙併兵塀幣平弊柄並蔽閉陛米頁僻壁癖碧別瞥蔑箆偏変片篇編辺返遍便勉娩弁鞭保舗鋪圃捕歩甫補輔穂募墓慕戊暮母簿菩倣俸包呆報奉宝峰峯崩庖抱捧放方朋法泡烹砲縫胞芳萌蓬蜂褒訪豊邦鋒飽鳳鵬乏亡傍剖坊妨帽忘忙房暴望某棒冒紡肪膨謀貌貿鉾防吠頬北僕卜墨撲朴牧睦穆釦勃没殆堀幌奔本翻凡盆摩磨魔麻埋妹昧枚毎哩槙幕膜枕鮪柾鱒桝亦俣又抹末沫迄侭繭麿万慢満漫蔓味未魅巳箕岬密蜜湊蓑稔脈妙粍民眠務夢無牟矛霧鵡椋婿娘冥名命明盟迷銘鳴姪牝滅免棉綿緬面麺摸模茂妄孟毛猛盲網耗蒙儲木黙目杢勿餅尤戻籾貰問悶紋門匁也冶夜爺耶野弥矢厄役約薬訳躍靖柳薮鑓愉愈油癒諭輸唯佑優勇友宥幽悠憂揖有柚湧涌猶猷由祐裕誘遊邑郵雄融夕予余与誉輿預傭幼妖容庸揚揺擁曜楊様洋溶熔用窯羊耀葉蓉要謡踊遥陽養慾抑欲沃浴翌翼淀羅螺裸来莱頼雷洛絡落酪乱卵嵐欄濫藍蘭覧利吏履李梨理璃痢裏裡里離陸律率立葎掠略劉流溜琉留硫粒隆竜龍侶慮旅虜了亮僚両凌寮料梁涼猟療瞭稜糧良諒遼量陵領力緑倫厘林淋燐琳臨輪隣鱗麟瑠塁涙累類令伶例冷励嶺怜玲礼苓鈴隷零霊麗齢暦歴列劣烈裂廉恋憐漣煉簾練聯蓮連錬呂魯櫓炉賂路露労婁廊弄朗楼榔浪漏牢狼篭老聾蝋郎六麓禄肋録論倭和話歪賄脇惑枠鷲亙亘鰐詫藁蕨椀湾碗腕弌丐丕个丱丶丼丿乂乖乘亂亅豫亊舒弍于亞亟亠亢亰亳亶从仍仄仆仂仗仞仭仟价伉佚估佛佝佗佇佶侈侏侘佻佩佰侑佯來侖儘俔俟俎俘俛俑俚俐俤俥倚倨倔倪倥倅伜俶倡倩倬俾俯們倆偃假會偕偐偈做偖偬偸傀傚傅傴傲僉僊傳僂僖僞僥僭僣僮價僵儉儁儂儖儕儔儚儡儺儷儼儻儿兀兒兌兔兢竸兩兪兮冀冂囘册冉冏冑冓冕冖冤冦冢冩冪冫决冱冲冰况冽凅凉凛几處凩凭凰凵凾刄刋刔刎刧刪刮刳刹剏剄剋剌剞剔剪剴剩剳剿剽劍劔劒剱劈劑辨辧劬劭劼劵勁勍勗勞勣勦飭勠勳勵勸勹匆匈甸匍匐匏匕匚匣匯匱匳匸區卆卅丗卉卍凖卞卩卮夘卻卷厂厖厠厦厥厮厰厶參簒雙叟曼燮叮叨叭叺吁吽呀听吭吼吮吶吩吝呎咏呵咎呟呱呷呰咒呻咀呶咄咐咆哇咢咸咥咬哄哈咨咫哂咤咾咼哘哥哦唏唔哽哮哭哺哢唹啀啣啌售啜啅啖啗唸唳啝喙喀咯喊喟啻啾喘喞單啼喃喩喇喨嗚嗅嗟嗄嗜嗤嗔嘔嗷嘖嗾嗽嘛嗹噎噐營嘴嘶嘲嘸噫噤嘯噬噪嚆嚀嚊嚠嚔嚏嚥嚮嚶嚴囂嚼囁囃囀囈囎囑囓囗囮囹圀囿圄圉圈國圍圓團圖嗇圜圦圷圸坎圻址坏坩埀垈坡坿垉垓垠垳垤垪垰埃埆埔埒埓堊埖埣堋堙堝塲堡塢塋塰毀塒堽塹墅墹墟墫墺壞墻墸墮壅壓壑壗壙壘壥壜壤壟壯壺壹壻壼壽夂夊夐夛梦夥夬夭夲夸夾竒奕奐奎奚奘奢奠奧奬奩奸妁妝佞侫妣妲姆姨姜妍姙姚娥娟娑娜娉娚婀婬婉娵娶婢婪媚媼媾嫋嫂媽嫣嫗嫦嫩嫖嫺嫻嬌嬋嬖嬲嫐嬪嬶嬾孃孅孀孑孕孚孛孥孩孰孳孵學斈孺宀它宦宸寃寇寉寔寐寤實寢寞寥寫寰寶寳尅將專對尓尠尢尨尸尹屁屆屎屓屐屏孱屬屮乢屶屹岌岑岔妛岫岻岶岼岷峅岾峇峙峩峽峺峭嶌峪崋崕崗嵜崟崛崑崔崢崚崙崘嵌嵒嵎嵋嵬嵳嵶嶇嶄嶂嶢嶝嶬嶮嶽嶐嶷嶼巉巍巓巒巖巛巫已巵帋帚帙帑帛帶帷幄幃幀幎幗幔幟幢幤幇幵并幺麼广庠廁廂廈廐廏廖廣廝廚廛廢廡廨廩廬廱廳廰廴廸廾弃弉彝彜弋弑弖弩弭弸彁彈彌彎弯彑彖彗彙彡彭彳彷徃徂彿徊很徑徇從徙徘徠徨徭徼忖忻忤忸忱忝悳忿怡恠怙怐怩怎怱怛怕怫怦怏怺恚恁恪恷恟恊恆恍恣恃恤恂恬恫恙悁悍惧悃悚悄悛悖悗悒悧悋惡悸惠惓悴忰悽惆悵惘慍愕愆惶惷愀惴惺愃愡惻惱愍愎慇愾愨愧慊愿愼愬愴愽慂慄慳慷慘慙慚慫慴慯慥慱慟慝慓慵憙憖憇憬憔憚憊憑憫憮懌懊應懷懈懃懆憺懋罹懍懦懣懶懺懴懿懽懼懾戀戈戉戍戌戔戛戞戡截戮戰戲戳扁扎扞扣扛扠扨扼抂抉找抒抓抖拔抃抔拗拑抻拏拿拆擔拈拜拌拊拂拇抛拉挌拮拱挧挂挈拯拵捐挾捍搜捏掖掎掀掫捶掣掏掉掟掵捫捩掾揩揀揆揣揉插揶揄搖搴搆搓搦搶攝搗搨搏摧摯摶摎攪撕撓撥撩撈撼據擒擅擇撻擘擂擱擧舉擠擡抬擣擯攬擶擴擲擺攀擽攘攜攅攤攣攫攴攵攷收攸畋效敖敕敍敘敞敝敲數斂斃變斛斟斫斷旃旆旁旄旌旒旛旙无旡旱杲昊昃旻杳昵昶昴昜晏晄晉晁晞晝晤晧晨晟晢晰暃暈暎暉暄暘暝曁暹曉暾暼曄暸曖曚曠昿曦曩曰曵曷朏朖朞朦朧霸朮朿朶杁朸朷杆杞杠杙杣杤枉杰枩杼杪枌枋枦枡枅枷柯枴柬枳柩枸柤柞柝柢柮枹柎柆柧檜栞框栩桀桍栲桎梳栫桙档桷桿梟梏梭梔條梛梃檮梹桴梵梠梺椏梍桾椁棊椈棘椢椦棡椌棍棔棧棕椶椒椄棗棣椥棹棠棯椨椪椚椣椡棆楹楷楜楸楫楔楾楮椹楴椽楙椰楡楞楝榁楪榲榮槐榿槁槓榾槎寨槊槝榻槃榧樮榑榠榜榕榴槞槨樂樛槿權槹槲槧樅榱樞槭樔槫樊樒櫁樣樓橄樌橲樶橸橇橢橙橦橈樸樢檐檍檠檄檢檣檗蘗檻櫃櫂檸檳檬櫞櫑櫟檪櫚櫪櫻欅蘖櫺欒欖鬱欟欸欷盜欹飮歇歃歉歐歙歔歛歟歡歸歹歿殀殄殃殍殘殕殞殤殪殫殯殲殱殳殷殼毆毋毓毟毬毫毳毯麾氈氓气氛氤氣汞汕汢汪沂沍沚沁沛汾汨汳沒沐泄泱泓沽泗泅泝沮沱沾沺泛泯泙泪洟衍洶洫洽洸洙洵洳洒洌浣涓浤浚浹浙涎涕濤涅淹渕渊涵淇淦涸淆淬淞淌淨淒淅淺淙淤淕淪淮渭湮渮渙湲湟渾渣湫渫湶湍渟湃渺湎渤滿渝游溂溪溘滉溷滓溽溯滄溲滔滕溏溥滂溟潁漑灌滬滸滾漿滲漱滯漲滌漾漓滷澆潺潸澁澀潯潛濳潭澂潼潘澎澑濂潦澳澣澡澤澹濆澪濟濕濬濔濘濱濮濛瀉瀋濺瀑瀁瀏濾瀛瀚潴瀝瀘瀟瀰瀾瀲灑灣炙炒炯烱炬炸炳炮烟烋烝烙焉烽焜焙煥煕熈煦煢煌煖煬熏燻熄熕熨熬燗熹熾燒燉燔燎燠燬燧燵燼燹燿爍爐爛爨爭爬爰爲爻爼爿牀牆牋牘牴牾犂犁犇犒犖犢犧犹犲狃狆狄狎狒狢狠狡狹狷倏猗猊猜猖猝猴猯猩猥猾獎獏默獗獪獨獰獸獵獻獺珈玳珎玻珀珥珮珞璢琅瑯琥珸琲琺瑕琿瑟瑙瑁瑜瑩瑰瑣瑪瑶瑾璋璞璧瓊瓏瓔珱瓠瓣瓧瓩瓮瓲瓰瓱瓸瓷甄甃甅甌甎甍甕甓甞甦甬甼畄畍畊畉畛畆畚畩畤畧畫畭畸當疆疇畴疊疉疂疔疚疝疥疣痂疳痃疵疽疸疼疱痍痊痒痙痣痞痾痿痼瘁痰痺痲痳瘋瘍瘉瘟瘧瘠瘡瘢瘤瘴瘰瘻癇癈癆癜癘癡癢癨癩癪癧癬癰癲癶癸發皀皃皈皋皎皖皓皙皚皰皴皸皹皺盂盍盖盒盞盡盥盧盪蘯盻眈眇眄眩眤眞眥眦眛眷眸睇睚睨睫睛睥睿睾睹瞎瞋瞑瞠瞞瞰瞶瞹瞿瞼瞽瞻矇矍矗矚矜矣矮矼砌砒礦砠礪硅碎硴碆硼碚碌碣碵碪碯磑磆磋磔碾碼磅磊磬磧磚磽磴礇礒礑礙礬礫祀祠祗祟祚祕祓祺祿禊禝禧齋禪禮禳禹禺秉秕秧秬秡秣稈稍稘稙稠稟禀稱稻稾稷穃穗穉穡穢穩龝穰穹穽窈窗窕窘窖窩竈窰窶竅竄窿邃竇竊竍竏竕竓站竚竝竡竢竦竭竰笂笏笊笆笳笘笙笞笵笨笶筐筺笄筍笋筌筅筵筥筴筧筰筱筬筮箝箘箟箍箜箚箋箒箏筝箙篋篁篌篏箴篆篝篩簑簔篦篥籠簀簇簓篳篷簗簍篶簣簧簪簟簷簫簽籌籃籔籏籀籐籘籟籤籖籥籬籵粃粐粤粭粢粫粡粨粳粲粱粮粹粽糀糅糂糘糒糜糢鬻糯糲糴糶糺紆紂紜紕紊絅絋紮紲紿紵絆絳絖絎絲絨絮絏絣經綉絛綏絽綛綺綮綣綵緇綽綫總綢綯緜綸綟綰緘緝緤緞緻緲緡縅縊縣縡縒縱縟縉縋縢繆繦縻縵縹繃縷縲縺繧繝繖繞繙繚繹繪繩繼繻纃緕繽辮繿纈纉續纒纐纓纔纖纎纛纜缸缺罅罌罍罎罐网罕罔罘罟罠罨罩罧罸羂羆羃羈羇羌羔羞羝羚羣羯羲羹羮羶羸譱翅翆翊翕翔翡翦翩翳翹飜耆耄耋耒耘耙耜耡耨耿耻聊聆聒聘聚聟聢聨聳聲聰聶聹聽聿肄肆肅肛肓肚肭冐肬胛胥胙胝胄胚胖脉胯胱脛脩脣脯腋隋腆脾腓腑胼腱腮腥腦腴膃膈膊膀膂膠膕膤膣腟膓膩膰膵膾膸膽臀臂膺臉臍臑臙臘臈臚臟臠臧臺臻臾舁舂舅與舊舍舐舖舩舫舸舳艀艙艘艝艚艟艤艢艨艪艫舮艱艷艸艾芍芒芫芟芻芬苡苣苟苒苴苳苺莓范苻苹苞茆苜茉苙茵茴茖茲茱荀茹荐荅茯茫茗茘莅莚莪莟莢莖茣莎莇莊荼莵荳荵莠莉莨菴萓菫菎菽萃菘萋菁菷萇菠菲萍萢萠莽萸蔆菻葭萪萼蕚蒄葷葫蒭葮蒂葩葆萬葯葹萵蓊葢蒹蒿蒟蓙蓍蒻蓚蓐蓁蓆蓖蒡蔡蓿蓴蔗蔘蔬蔟蔕蔔蓼蕀蕣蕘蕈蕁蘂蕋蕕薀薤薈薑薊薨蕭薔薛藪薇薜蕷蕾薐藉薺藏薹藐藕藝藥藜藹蘊蘓蘋藾藺蘆蘢蘚蘰蘿虍乕虔號虧虱蚓蚣蚩蚪蚋蚌蚶蚯蛄蛆蚰蛉蠣蚫蛔蛞蛩蛬蛟蛛蛯蜒蜆蜈蜀蜃蛻蜑蜉蜍蛹蜊蜴蜿蜷蜻蜥蜩蜚蝠蝟蝸蝌蝎蝴蝗蝨蝮蝙蝓蝣蝪蠅螢螟螂螯蟋螽蟀蟐雖螫蟄螳蟇蟆螻蟯蟲蟠蠏蠍蟾蟶蟷蠎蟒蠑蠖蠕蠢蠡蠱蠶蠹蠧蠻衄衂衒衙衞衢衫袁衾袞衵衽袵衲袂袗袒袮袙袢袍袤袰袿袱裃裄裔裘裙裝裹褂裼裴裨裲褄褌褊褓襃褞褥褪褫襁襄褻褶褸襌褝襠襞襦襤襭襪襯襴襷襾覃覈覊覓覘覡覩覦覬覯覲覺覽覿觀觚觜觝觧觴觸訃訖訐訌訛訝訥訶詁詛詒詆詈詼詭詬詢誅誂誄誨誡誑誥誦誚誣諄諍諂諚諫諳諧諤諱謔諠諢諷諞諛謌謇謚諡謖謐謗謠謳鞫謦謫謾謨譁譌譏譎證譖譛譚譫譟譬譯譴譽讀讌讎讒讓讖讙讚谺豁谿豈豌豎豐豕豢豬豸豺貂貉貅貊貍貎貔豼貘戝貭貪貽貲貳貮貶賈賁賤賣賚賽賺賻贄贅贊贇贏贍贐齎贓賍贔贖赧赭赱赳趁趙跂趾趺跏跚跖跌跛跋跪跫跟跣跼踈踉跿踝踞踐踟蹂踵踰踴蹊蹇蹉蹌蹐蹈蹙蹤蹠踪蹣蹕蹶蹲蹼躁躇躅躄躋躊躓躑躔躙躪躡躬躰軆躱躾軅軈軋軛軣軼軻軫軾輊輅輕輒輙輓輜輟輛輌輦輳輻輹轅轂輾轌轉轆轎轗轜轢轣轤辜辟辣辭辯辷迚迥迢迪迯邇迴逅迹迺逑逕逡逍逞逖逋逧逶逵逹迸遏遐遑遒逎遉逾遖遘遞遨遯遶隨遲邂遽邁邀邊邉邏邨邯邱邵郢郤扈郛鄂鄒鄙鄲鄰酊酖酘酣酥酩酳酲醋醉醂醢醫醯醪醵醴醺釀釁釉釋釐釖釟釡釛釼釵釶鈞釿鈔鈬鈕鈑鉞鉗鉅鉉鉤鉈銕鈿鉋鉐銜銖銓銛鉚鋏銹銷鋩錏鋺鍄錮錙錢錚錣錺錵錻鍜鍠鍼鍮鍖鎰鎬鎭鎔鎹鏖鏗鏨鏥鏘鏃鏝鏐鏈鏤鐚鐔鐓鐃鐇鐐鐶鐫鐵鐡鐺鑁鑒鑄鑛鑠鑢鑞鑪鈩鑰鑵鑷鑽鑚鑼鑾钁鑿閂閇閊閔閖閘閙閠閨閧閭閼閻閹閾闊濶闃闍闌闕闔闖關闡闥闢阡阨阮阯陂陌陏陋陷陜陞陝陟陦陲陬隍隘隕隗險隧隱隲隰隴隶隸隹雎雋雉雍襍雜霍雕雹霄霆霈霓霎霑霏霖霙霤霪霰霹霽霾靄靆靈靂靉靜靠靤靦靨勒靫靱靹鞅靼鞁靺鞆鞋鞏鞐鞜鞨鞦鞣鞳鞴韃韆韈韋韜韭齏韲竟韶韵頏頌頸頤頡頷頽顆顏顋顫顯顰顱顴顳颪颯颱颶飄飃飆飩飫餃餉餒餔餘餡餝餞餤餠餬餮餽餾饂饉饅饐饋饑饒饌饕馗馘馥馭馮馼駟駛駝駘駑駭駮駱駲駻駸騁騏騅駢騙騫騷驅驂驀驃騾驕驍驛驗驟驢驥驤驩驫驪骭骰骼髀髏髑髓體髞髟髢髣髦髯髫髮髴髱髷髻鬆鬘鬚鬟鬢鬣鬥鬧鬨鬩鬪鬮鬯鬲魄魃魏魍魎魑魘魴鮓鮃鮑鮖鮗鮟鮠鮨鮴鯀鯊鮹鯆鯏鯑鯒鯣鯢鯤鯔鯡鰺鯲鯱鯰鰕鰔鰉鰓鰌鰆鰈鰒鰊鰄鰮鰛鰥鰤鰡鰰鱇鰲鱆鰾鱚鱠鱧鱶鱸鳧鳬鳰鴉鴈鳫鴃鴆鴪鴦鶯鴣鴟鵄鴕鴒鵁鴿鴾鵆鵈鵝鵞鵤鵑鵐鵙鵲鶉鶇鶫鵯鵺鶚鶤鶩鶲鷄鷁鶻鶸鶺鷆鷏鷂鷙鷓鷸鷦鷭鷯鷽鸚鸛鸞鹵鹹鹽麁麈麋麌麒麕麑麝麥麩麸麪麭靡黌黎黏黐黔黜點黝黠黥黨黯黴黶黷黹黻黼黽鼇鼈皷鼕鼡鼬鼾齊齒齔齣齟齠齡齦齧齬齪齷齲齶龕龜龠堯槇遙瑤凜熙]+$)/)) {
	alert("禁則文字が入力されています。");	
	inputObj.focus();
	return false;
  }
  
  return true;
}