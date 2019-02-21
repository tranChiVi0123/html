$().ready(function() {
    mbCommon.focusSensiBind();
});

var mbCommon = function(){
    var ret = {};
    var trim = function(strValue) {
        return strValue.replace(/(^\s+)|(\s+$)/g, "");
    };
    
    ret.focusSensiBind = function() {
        $('.focusSensi').bind('focus', function(){
            $(this).removeClass("errInput");
	        $(this).addClass("focusInput");
        });
        $('.focusSensi').bind('blur', function(){
	        $(this).removeClass("focusInput");
        });
    };
    
    ret.stopEnter = function() {
        return !(window.event.keyCode == 13);
    };

    return ret;
}();


/* Input Text Box Check */
function _chkInp(){
	var regCh = /[\W\w]/;
	var regAll = /[\W\w]/;
	
	var event = window.event || arguments.callee.caller.arguments[0];
	//if(event == null ||event.srcElement == null) return;
	
	if (document.all){
		//ie,chrome,safari
		val = event.srcElement.className;
	} else {
		//firefox				
		val = event.target.className;
	}
	
	try{
		switch(val){
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
			case "mail": regCh = /[0-9a-zA-Z-_@.*]/; regAll = /^[0-9a-zA-Z-_@.*]*$/; break;
			case "color": regCh = /[0-9a-fA-F#]/; regAll = /^[0-9a-fA-F#]*$/; break;
			default: break;
		}
		
		switch(event.type){
		//	case "keypress": event.returnValue = regCh.test(String.fromCharCode(event.keyCode)); break;
			case "keypress": if (document.all){
								event.returnValue = regCh.test(String.fromCharCode(event.keyCode));
							 }else{
							 	if(8 != event.which && 0 != event.which){
								 	if(!regCh.test(String.fromCharCode(event.which))){
								 		event.preventDefault();
								 	} else {
								 		event.stopPropagation();
									}
								}
							 } 
							 break;
			case "paste" : event.returnValue = regAll.test(window.clipboardData.getData("text")); break;
			case "drop" : event.returnValue = regAll.test(event.dataTransfer.getData("text")); break;
			case "blur" : if(regAll.test(event.srcElement.vlaue)) alert("Input Error!"); return;
			default: break;
		}
	}catch(e){
		
 }
}

function toComma(Value)
{
	if(Value == ""){return Value;}
	var eValue = Value.toString();
	var intPart = "";
	var decPart = "";
	if (eValue.indexOf(",")>=0)
	{
		eValue=eValue.replace(/,/g,"");
	}
	
	if (eValue.indexOf(".")>=0)
	{
		intPart=eValue.split(".")[0];
		intPart=parseInt(intPart,10);
		decPart=eValue.split(".")[1];
		decPart=parseInt(decPart,10);
	}
	else
	{
		intPart = eValue;
		intPart=parseInt(eValue,10);
	}
	var num  = intPart+"";
	var re=/(-?\d+)(\d{3})/
	while(re.test(num))
	{
		num=num.replace(re,"$1,$2");
	}
	if (eValue.indexOf(".")>=0)
	{
		eValue=num + "." + decPart;
	}
	else
	{
		eValue=num;
	}

	return eValue;
}
	
function reComma(eValue){
	return eValue.toString().replace(/,/g,"");
}
	
function InputToComma(obj){
	try{
		obj.value=reComma(obj.value);
	}catch(e){}
}

function InputReComma(obj){
	try{
		obj.value=toComma(obj.value);
	}catch(e){}
}

function go_pcsite(){
	document.cookie='pcsiteflg=1;max-age=3600;path=/ttc/ecsite;';
	location.href="../";
}
