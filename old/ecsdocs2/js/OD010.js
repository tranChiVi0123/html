function setErrMsg(errMsg){
	$("#errmsg").html(errMsg);
	if (errMsg != ''){
		location.hash = "errMsg";
	}
}

function lockButtons(){
	$("input[type=button]").each(function(i,obj){
		$(obj).attr('btnStatus',$(obj).attr("disabled"));
		$(obj).attr("disabled",true);
	});
}

function unlockButtons(){
	$("input[type=button]").each(function(i,obj){
		if($(obj).attr("btnStatus") == "false"){
			$(obj).removeAttr("disabled");
		};
		$(obj).removeAttr("btnStatus");
	});
}

function showPopup(event,id,idHid) {
	
	var showMemo = $("#"+idHid).val();
	target = document.getElementById("popup");

	if (!event) var event = window.event;
	if (!event.pageX) px = event.clientX + document.body.scrollLeft; else px = event.pageX;
	if (!event.pageY) py = event.clientY + document.body.scrollTop; else py = event.pageY;
	target.innerHTML = "<pre>"+showMemo+"<pre>";
	target.style.left = px+10 + "px";
	target.style.top = py+5 + "px";
	target.style.visibility = "visible";
}

function hidePopup() {
	target = document.getElementById("popup");
	target.innerHTML = "";
	target.style.visibility = "hidden";
}
//�u���b�N�ڋq�֒ǉ� �{�^��2015.03.10 sakakibara
function showCC390(){
	$("#cc390_kokyakuNm1").val($("#kokyakuNm1").val());
	$("#cc390_kokyakuNm2").val($("#kokyakuNm2").val());
	$("#cc390_kokyakuKana1").val($("#kokyakuKana1").val());
	$("#cc390_kokyakuKana2").val($("#kokyakuKana2").val());
	$("#cc390_kokyakuZip").val($("#kokyakuZip1").val() + '-' + $("#kokyakuZip2").val());
	$("#cc390_kokyakuAddr1").val($("#kokyakuAddr1").val());
	$("#cc390_kokyakuAddr2").val($("#kokyakuAddr2").val());
	$("#cc390_kokyakuAddr3").val($("#kokyakuAddr3").val());
	$("#cc390_kokyakuTel1").val($("#kokyakuTel1").val());
	$("#cc390_kokyakuMail1").val($("#kokyakuMail1").val());

	var _searchWin;
	_searchWin = window.open("","CC390","width=600,height=720,menubar=no,location=no,status=yes,resizable=yes,scrollbars=yes");
	$("#formcc390").attr("action",urlBase + "/e_asproLogin/CC390BlackKokyakuEntry");
	$("#formcc390").attr("target","CC390");
	$("#formcc390").submit();
	_searchWin.focus();
}
//���[�����M �{�^��2015.03.10 sakakibara
//2015/04/10 URL��easproOrder�ɏC�� nakajima
function showOD090(){
	$("#od090_orderNo").val($("#orderNo").val());
	$("#od090_siteCd").val($("#siteCd").val());
	$("#od090_siteKbn").val($("#siteKbn").val());
	$("#od090_kokyakuNm1").val($("#kokyakuNm1").val());
	$("#od090_kokyakuNm2").val($("#kokyakuNm2").val());
	$("#od090_kokyakuMail1").val($("#kokyakuMail1").val());

	var _searchWin;
	_searchWin = window.open("","OD09","width=850,height=600,menubar=no,location=no,status=yes,resizable=yes,scrollbars=yes");
	$("#formod090").attr("action",urlBase + "/e_asproOrder/OD09SendMail");
	$("#formod090").attr("target","OD09");
	$("#formod090").submit();
	_searchWin.focus();
}

//�I�v�V�����\�� 2015.03.10 sakakibara
function showCC400(orderNo,orderLineNo){
	var _searchWin;
	var url= urlBase + "/e_asproLogin/CC400OptionSelect";
	url += "?orderNo="+orderNo;
	url += "&orderLineNo="+orderLineNo;
	_searchWin = window.open(url,"CC400","width=650,height=450,menubar=no,location=no,status=yes,resizable=yes,scrollbars=yes");
	_searchWin.focus();
}
//�Z���̏Z�����f�{�^������
function ajaxAddr(parentId,prefix){
	var zip1 = $("#"+parentId).find("[name="+prefix+"Zip1]").val();
	var zip2 = $("#"+parentId).find("[name="+prefix+"Zip2]").val();
	
	// �͐�̗X�֔ԍ������͂ŏZ�����f���N���b�N���ꂽ�ꍇ
	if (prefix == "tdk" && zip1 == "" && zip2 == "") {
		var parentObj = $("#"+parentId);
		//parentObj.find("[name="+prefix+"Addr1]").val("");
		//parentObj.find("[name="+prefix+"Addr2]").val("");
		//parentObj.find("[name="+prefix+"Addr3]").val("");
		//parentObj.find("[name="+prefix+"AddrCd]").val("");
		return;
	}
	
	var parentObjko = $("#"+parentId);
	//parentObjko.find("[name="+prefix+"Addr1]").val("");
	//parentObjko.find("[name="+prefix+"Addr2]").val("");
	//parentObjko.find("[name="+prefix+"Addr3]").val("");
	//parentObjko.find("[name="+prefix+"AddrCd]").val("");
	
	var url = urlBase + "/e_asproLogin/CC900PostalCheck";
	var parms = "processType="+ajaxProcessType;
		parms += "&kbn=0";
		parms += "&tdk_zip1="+zip1;
		parms += "&tdk_zip2="+zip2;
		parms += "&idx="+parentId+","+prefix;
		ExecuteAjax(url,parms);
}

//�Z������Ajax����ʖ߂�̏ꍇ�A�Z���𒼐ڐݒ�
//function setAddr(addr11, addr12,addr2,data, tenCd){
function setAddr(addr1,addr2,addr3,data,ken_cd, addr_cd){
	var parentId = "#"+data.split(",")[0];
	var prefix = data.split(",")[1];

	$(parentId).find("[name="+prefix+"KenCd]").val(ken_cd);
	$(parentId).find("[name="+prefix+"Addr1]").val(addr1);
	//$(parentId).find("[name="+prefix+"Addr2]").val(addr2);
	//$(parentId).find("[name="+prefix+"Addr3]").val(addr3);
//	$(parentId).find("[name="+prefix+"AddrCd]").val(addr_cd);
	var idx = (prefix=="tdk")?parentId.replace("#tdk",""):"0";
	getMea138WhCd(idx);
}

//�Z����������
function setAddrInfo(zip,addrCd,addr1,data){
	var parentId = "#"+data.split(",")[0];
	var prefix = data.split(",")[1];
	var add11;
	var add12;
	if(zip.length == 7){
		$(parentId).find("[name="+prefix+"Zip1]").val(zip.replace("-","").substring(0,3));
		$(parentId).find("[name="+prefix+"Zip2]").val(zip.replace("-","").substring(3));
	}
	//�����߂�̂Ƃ��ɏZ���͔��f���Ȃ��悤�ɏC�� 2014.12.04 sakakibara
	if(addr1.length > 20){
		add11 = addr1.substring(0,20);
		add12 = addr1.substring(20);
		$(parentId).find("[name="+prefix+"Addr1]").val(add11);
		//$(parentId).find("[name="+prefix+"Addr2]").val(add12);
	}else{
		$(parentId).find("[name="+prefix+"Addr1]").val(addr1);
		//$(parentId).find("[name="+prefix+"Addr2]").val("");
	} 
	//$(parentId).find("[name="+prefix+"Addr2]").val("");
	//$(parentId).find("[name="+prefix+"Addr3]").val("");
	//$(parentId).find("[name="+prefix+"AddrCd]").val(addrCd);
	
}

//�ڋq�Z������Ajax�������ʖ߂�̏ꍇ�A�����Open
function open_sub(_zip1,_zip2,_index,_kbn){
	var _searchWin;
	var url = urlBase + "/e_asproLogin/CC900PostalCheck";
	url += "?processType=1";
	url += "&tdk_zip1="+_zip1;
	url += "&tdk_zip2="+_zip2;
	url += "&idx="+_index;
	url += "&kbn="+_kbn;
	_searchWin = window.open(url,"CC900","width=720,height=650,menubar=no,location=no,status=yes,resizable=yes,scrollbars=yes");
	_searchWin.focus();
}

//�Z�������E�B���h�E
function showAddrSearch(parentId,prefix){
	var url= urlBase + "/e_asproLogin/CC901SearchAddress";
	url += "?jsName=setAddrInfo";
	url += "&giveYourIndex="+parentId+","+prefix;
	_searchWin = window.open(url,"CC901","width=700,height=500,menubar=no,location=no,status=yes,resizable=yes,scrollbars=yes");
	_searchWin.focus();
}
//����I��
		function showOD011(orderNo,orderLineNo){
			var _searchWin2;
			url= urlBase + "/e_asproOrder/OD011OrderHikiate";
			url += "?orderNo="+orderNo;
			url += "&orderLineNo="+orderLineNo;
			_searchWin2 = window.open(url,"OD011","width=750,height=200,menubar=no,location=no,status=yes,resizable=yes,scrollbars=yes");
			_searchWin2.focus();

		}
//����I��
function showCC030(flg){
	var _searchWin;
	var url= urlBase + "/e_asproLogin/CC030SearchCustomer";
	url += "?callsSrciptFuncName=setKokyakuInfo";
	url += "&index="+flg;
	url += "&orderKbn=1";
	_searchWin = window.open(url,"CC030","width=780,height=600,menubar=no,location=no,status=yes,resizable=yes,scrollbars=yes");
	_searchWin.focus();
}

//����E�C���h�E����̖߂�
function setKokyakuInfo(
	koNo,koCd,gaibu,
	koNm1,koNm2,koKana1,koKana2,koZip,koKen,
	koAdr1,koAdr2,koAdr3,koTel1,koTel2,koFax,index,
	kogaibu_cd,komail1,komail2,kofirst_buy_date,kojob_kbn,
	korank_kbn,korank_type,kosyokai_cd,koremarks,kokijiran1,kosouko_siji,kokokyaku_birth,kokokyaku_sex_kbn,kokyaku_addr_cd){

		$("#kokyakuIndexInfo").val(koKana1+koKana2+koNm1+koNm2+koZip.replace("-","")+kokyaku_addr_cd+koAdr1+koAdr2+koAdr3+koTel1+koTel2+kokokyaku_sex_kbn+kokokyaku_birth);
		$("#kokyakuNo").val(koNo);
		$("#kokyakuCd").val(koCd);
		$("#kokyakuCdDisp").html(koCd);
		$("#gaibuCd").val(gaibu);
		$("#kokyakuKana1").val(koKana1);
		$("#kokyakuKana2").val(koKana2);
		$("#kokyakuNm1").val(koNm1);
		$("#kokyakuNm2").val(koNm2);
		$("#kokyakuKen").val(koKen);
		$("#kokyakuZip1").val(koZip.replace("-","").substr(0,3));
		$("#kokyakuZip2").val(koZip.replace("-","").substr(3));
		$("#kokyakuAddr1").val(koAdr1);
		$("#kokyakuAddr2").val(koAdr2);
		$("#kokyakuAddr3").val(koAdr3);
		$("#kokyakuTel1").val(koTel1);
		$("#kokyakuTel2").val(koTel2);
		$("#kokyakuFax").val(koFax);
		$("#kokyakuMail1").val(komail1);
		$("#kokyakuMail2").val(komail2);
		$("[name=kokyakuSexKbn][value="+kokokyaku_sex_kbn+"]").attr("checked",true);
		$("#kokyakuBirth").val(kokokyaku_birth);
		$("#kokyakuJobKbn").val(kojob_kbn);
		$("#kokyakuRankKbn").val(korank_kbn);
		$("#firstBuyDate").val(kofirst_buy_date);
		$("#kokyakuFirstBuyDateDisp").html(kofirst_buy_date);
		$("#remarks").val(koremarks);
		$("#sinkiKokyakuFlg").val("0");
		getKokyakuOtherInfo();
}
//�L�����y�[���������i�����j�^�⍇�������i�����j���擾����B
//�ڋq��Ԃ̍w�������^�ڋq��Ԃ��擾����B
function getKokyakuOtherInfo(){
	if($("#kokyakuNo").val() != "-1"){
		var url = urlBase + "/e_asproOrder/OD010OrdersNew";
		var parms = "processType="+ajaxProcessType;
			parms += "&ajaxKbn=1";
			parms += "&kokyakuNo="+$("#kokyakuNo").val();
			ExecuteAjax(url,parms);
	}
}
function setKokyakuOtherInfo(gaibu,sex,birth,age,fax,
	mail1,mail2,jobKbn,rankType,joutai,firstBuyDate,buyCnt,buySumKin,campaign,dm,point,kanouPoint
	){
		//$("#kokyakuAge").html(age);
		calcAge("#kokyakuBirth","#kokyakuAge",null,null,null,false);
		$("#kokyakuBuyCountDisp").html(toComma(buyCnt));
		$("#buyCount").val(buyCnt);
		$("#kokyakuBuySumKinDisp").html(toComma(buySumKin));
		$("#buySumKin").val(buySumKin);
		$("#kokyakuCampaignRirekiNumDisp").html(toComma(campaign));
		$("#campaignRirekiNum").val(campaign);
		$("#kokyakuDmNumDisp").html(toComma(dm));
		$("#dmNum").val(dm);
		$("#kokyakuPointDisp").html(toComma(point));
		$("#pointRirekiNum").val(point);
		$("#kokyakuKanouPointDisp").html(toComma(kanouPoint));
		$("#pointNum").val(kanouPoint);
		$("#kokyakuJoutai").val(joutai);

		if (buyCnt == "0"){
			$$("btnKokyakuBuyCountDisp").style.display = "none";
		}else{
			$$("btnKokyakuBuyCountDisp").style.display = "inline";
		}
		if (point == "0"){
			$$("btnKokyakuPointNumDisp").style.display = "none";
		}else{
			$$("btnKokyakuPointNumDisp").style.display = "inline";
		}
		if (campaign == "0"){
			$$("btnKokyakuCampaignRirekiNumDisp").style.display = "none";
		}else{
			$$("btnKokyakuCampaignRirekiNumDisp").style.display = "inline";
		}
		if (dm == "0"){
			$$("btnKokyakuDmNumDisp").style.display = "none";
		}else{
			$$("btnKokyakuDmNumDisp").style.display = "inline";
		}
}
//�w������
function showCC060(){
	var _searchWin;
	var url= urlBase + "/e_asproLogin/CC060KounyuHistory";
	url += "?callsSrciptFuncName=";
	url += "&kokyakuNo="+$("#kokyakuNo").val();
	url += "&syoriKbn=0";
	url += "&index=";
	_searchWin = window.open(url,"CC060","width=1060,height=600,menubar=no,location=no,status=yes,resizable=yes,scrollbars=yes");
	_searchWin.focus();
}
//�͐於�i�w�������j�{�^������
function showTdkCC060(tdkIndex){
	var _searchWin;
	var url= urlBase + "/e_asproLogin/CC060KounyuHistory";
	url += "?callsSrciptFuncName=setTdkInfo";
	url += "&kokyakuNo="+$("#kokyakuNo").val();
	url += "&syoriKbn=1";
	url += "&index="+tdkIndex;
	_searchWin = window.open(url,"CC060","width=1060,height=600,menubar=no,location=no,status=yes,resizable=yes,scrollbars=yes");
	_searchWin.focus();
}
//�͂����񔽉f
function setTdkInfo(tdkNm1,tdkNm2,tdkKana1,tdkKana2,tdkZip,tdkKenCd,tdkAddr1,tdkAddr2,tdkAddr3,tdkTel1,tdkTel2,tdkIndex){
	$("#tdk"+tdkIndex).find("[name=tdkNm1]").val(tdkNm1);
	$("#tdk"+tdkIndex).find("[name=tdkNm2]").val(tdkNm2);
	$("#tdk"+tdkIndex).find("[name=tdkKana1]").val(tdkKana1);
	$("#tdk"+tdkIndex).find("[name=tdkKana2]").val(tdkKana2);

	
	if(tdkZip.replace("-","").length == 7){
		$("#tdk"+tdkIndex).find("[name=tdkZip1]").val(tdkZip.replace("-","").substr(0,3));
		$("#tdk"+tdkIndex).find("[name=tdkZip2]").val(tdkZip.replace("-","").substr(3));
	}
	$("#tdk"+tdkIndex).find("[name=tdkAddr1]").val(tdkAddr1);
	$("#tdk"+tdkIndex).find("[name=tdkAddr2]").val(tdkAddr2);
	$("#tdk"+tdkIndex).find("[name=tdkAddr3]").val(tdkAddr3);
	$("#tdk"+tdkIndex).find("[name=tdkTel1]").val(tdkTel1);
}
//�L�����y�[������
function showCC063(){
	var _searchWin;
	var url = urlBase + "/e_asproLogin/CC063PromoHistory";
	url += "?kokyakuNo="+$("#kokyakuNo").val();
	url += "&syoriKbn=0";
	url += "&index=";
	_searchWin = window.open(url,"CC063","width=1000,height=600,menubar=no,location=no,status=yes,resizable=yes,scrollbars=yes");
	_searchWin.focus();
}
//�|�C���g�Ɖ�
function showCC064(){
	var _searchWin;
	var url = urlBase + "/e_asproLogin/CC064PointHistory";
	url += "?kokyakuCd="+$("#kokyakuCd").val();
	if (url != ''){
		_searchWin = window.open(url,"CC064","width=1040,height=600,menubar=no,location=no,status=yes,resizable=yes,scrollbars=yes");
		_searchWin.focus();
	}
}
//DM����
function showCC065(){
	var _searchWin;
	var url = urlBase + "/e_asproLogin/CC065DmHistory";
	url += "?kokyakuNo="+$("#kokyakuNo").val();
	if (url != ''){
		_searchWin = window.open(url,"CC065","width=600,height=600,menubar=no,location=no,status=yes,resizable=yes,scrollbars=yes");
		_searchWin.focus();
	}
}
//�L�����y�[�����T�Q��
function showCC067(){
	var url= urlBase + "/e_asproLogin/CC067PromoHistory";
	_searchWin = window.open(url,"CC067","width=700,height=500,menubar=no,location=no,status=yes,resizable=yes,scrollbars=yes");
	_searchWin.focus();
}

//�w�������{�^������
function showBuyCount(){
	var kokyakuNo = $("#kokyakuNo").val();		//�ڋqNo
	var url= urlBase + "/e_asproLogin/CC060KounyuHistory?";
	url += "&kokyakuNo="+kokyakuNo;				//�ڋqNo
	var _searchWin = window.open(url,"CC060","width=960,height=600,menubar=no,location=no,status=yes,resizable=yes,scrollbars=yes");
	_searchWin.focus();
}
//��ƑI��
function showCC037(flg,tdkIndex){
	var _searchWin;
	var url= urlBase + "/e_asproLogin/CC037SearchSagyo";
	url += "?callsSrciptFuncName=setSagyoInfo";
	url += "&index="+tdkIndex;
	url += "&sagyoKbn="+flg;
	_searchWin = window.open(url,"CC037","width=640,height=500,menubar=no,location=no,status=yes,resizable=yes,scrollbars=yes");
	_searchWin.focus();
}
function setSagyoInfo(sagyoCd,sagyoNm,sagyoKbn,index) {
	$("#sagyoCd"+sagyoKbn+"_"+index).val(sagyoCd);
	var sagyoText = $("#sagyoNm"+"_"+index).val();
	$("#sagyoNm"+"_"+index).val(sagyoText+(sagyoText!=""?" ":"")+sagyoNm);
}
function getSagyoInfo(sagyoKbn,sagyoCd,index) {
	var url = urlBase + "/e_asproOrder/OD010OrdersNew";
	var parms = "processType="+ajaxProcessType;
		parms += "&ajaxKbn=2";
		parms += "&kbn="+sagyoKbn;
		parms += "&cd="+sagyoCd;
		parms += "&tdkIndex="+index;
		ExecuteAjax(url,parms);
}

//�X�֋ǑI��
function showCC213(tdkIndex){
	var _searchWin;
	var url= urlBase + "/e_asproLogin/CC213SearchPosteRestante";
	url += "?callsSrciptFuncName=setUketoriZip";
	url += "&index="+tdkIndex;
	_searchWin = window.open(url,"CC213","width=660,height=500,menubar=no,location=no,status=yes,resizable=yes,scrollbars=yes");
	_searchWin.focus();
}
function setUketoriZip(cd,nm,index) {
	if ($("#tomeFlg_"+index).val() == "1"){
		$("#uketoriZip_"+index).val(cd);
		$("#uketoriZipNm_"+index).html(nm);
	}
}
function getUketoriZip(cd,index) {
	var url = urlBase + "/e_asproOrder/OD010OrdersNew";
	var parms = "processType="+ajaxProcessType;
		parms += "&ajaxKbn=3";
		parms += "&cd="+cd;
		parms += "&tdkIndex="+index;
		ExecuteAjax(url,parms);
}

//�N��
function calcAge(birthId,toshiId,gatsuId,toshiStr,gatsuStr,miFlg){	
	var strDate = $(birthId).val();
	var toshi;
	var gatsu;
	var flg = false;
	
	if(!toshiStr){
		toshiStr = "��";
	}
	if(!gatsuStr){
		gatsuStr = "����";
	}
	
	if(!_chkDate(strDate) || strDate == ""){
		if(gatsuId){
			$(gatsuId).html("");
		}
		$(toshiId).html("");
		return;
	}
	if(strDate.indexOf("/")<0)
	{
		strDate = _praseDate(strDate,"","/");
	}else{
		strDate = _praseDate(strDate,"/","/");
	}
	var b=new Date(strDate); 
	var d=new Date(); 
	if(d > b){
		if(d.getMonth() < b.getMonth() || (d.getMonth()==b.getMonth() && d.getDate()<b.getDate())){
			flg = true;
		}
		toshi = d.getFullYear()-b.getFullYear()-(flg?1:0);
		
		if(d.getMonth() > b.getMonth()){
			gatsu = d.getMonth() - b.getMonth() - (d.getDate()>=b.getDate()?0:1);
		}else if(d.getMonth() < b.getMonth()){
			gatsu	= 12 + (d.getMonth() - b.getMonth() - (d.getDate()>=b.getDate()?0:1) );
		}else{
			gatsu = d.getDate() >= b.getDate()?0:11;
		}
		
		
	}else{
		toshi = 0;
		gatsu = 0;
	}
	
	$(toshiId).html(toshi + toshiStr);
	if(miFlg && (toshi < miseinenAge)){
		$(toshiId).append("&nbsp;<span class=\"errMsg\">�����N</span>");
	}
	if(gatsuId){
		$(gatsuId).html(gatsu + gatsuStr);
	}
}
//���ϕ��@
function changeKessaiCd(){
	var data = $("#kessaiCdSelect").val().split(",");
	$("#kessaiCd").val(data[0]);
	$("#kessaiKbn").val(data[1]).next().html(data[1]=="0"?"����":"���");
	$("#realAuthoriFlg").val(data[3]);
	$("#kessaiNm").val($("#kessaiCdSelect option:selected").text());

	//�萔�����Z�b�g
	var changeFlg = 0;
	if(kinTypeDaibiki!=""){
		if ($("#"+kinTypeDaibiki).val() != "0") {
			$("#"+kinTypeDaibiki).val("0");
			changeFlg = 1;
		}
	}
	if(kinTypeHaraikomi!=""){
		if ($("#"+kinTypeHaraikomi).val() != "0") {
			$("#"+kinTypeHaraikomi).val("0");
			changeFlg = 1;
		}
	}
	if (changeFlg == 1) {
		//�ύX����������Čv�Z
		var tmp;
		var total = 0;
		//���i���v���z(�Ŕ���)
		tmp = parseInt(reComma($("#orderSubtotalKin").val()),10);
		total += (isNaN(tmp)?0:tmp);
		//�����
		tmp = parseInt(reComma($("#orderTotalZeiKin").val()),10);
		total += (isNaN(tmp)?0:tmp);
		//�ύ��ڂ��ׂăZ�b�g
		for (var i=0; i<15; i++){
			var sign = parseInt(($("#orderTotalKinSign"+(i+1)).val()=="-1"?-1:1),10);
			total+=parseInt(reComma($("#orderTotalKin"+(i+1)).val()),10)*sign;
		}
		$("#orderSeikyuuZeiKKin").val(toComma(total));				//[���v]�������z
	}
}

//���i�R�[�h�ύX
function getItemInfo(tdkIndex,itemIndex){
	//���i�N���A
	clearItemInfo(tdkIndex,itemIndex,1);
	
	//�������N���A
	changeKariHikiate(tdkIndex,itemIndex,1);
	
	$("#itemQty_"+tdkIndex+"_"+itemIndex).attr("readonly","readonly").addClass("readonly");
	var ymd = $("#orderYmd").val();
	var url = urlBase + "/e_asproOrder/OD010OrdersNew";
	var parms = "processType="+ajaxProcessType;
		parms += "&ajaxKbn=4";
		parms += "&cb=setItemInfo";
		parms += "&itemNo="+$("#itemNo_"+tdkIndex+"_"+itemIndex).val();
		parms += "&colorCd="+$("#itemColorCd_"+tdkIndex+"_"+itemIndex).val();
		parms += "&sizeCd="+$("#itemSizeCd_"+tdkIndex+"_"+itemIndex).val();
		parms += "&ymd="+$("#orderYmd").val().replace(/\//g,"");
		parms += "&tnkDspKbn="+$("#tnkDspKbn").val();
		parms += "&tdkIndex="+tdkIndex;
		parms += "&itemIndex="+itemIndex;
		parms += "&orderNo="+$("#orderNo").val();
		parms += "&henpinCd="+$("#henpinCd").val();

		ExecuteAjax(url,parms);
}
//�̔����i���P �̔����i���Q �̔����i�i�Ŕ����j �̔����i�i�ō��݁j����� �̔����i���� �q��cd �q�ɖ��P �z���Ǝҋ敪 �z���Ǝ�  �݌ɏ�,���i��Ǝw��,���i��Ɩ�
function setItemInfo(itemNm1,itemNm2,sitemNo,tnk,zeiktnk,zeiTnk,memo,whCd,whNm,transKbn,transNm,hikiate,sagyoCd4,sagyoNm,
		tdkIndex,itemIndex){
	var tnk0Flg = "0";
	var present = $("#itemPresentFlg_"+tdkIndex+"_"+itemIndex).val();
	if(syukkaFlg =="1") tnk0Flg = 1;
	if(present =="1") tnk0Flg = 1;
	var nebiki = $("#itemNebikiTnk_"+tdkIndex+"_"+itemIndex).val();
	var dspTnk = (tnk0Flg==1?0:parseInt(zeiktnk,10) - parseInt(nebiki,0));
	var whNmDsp = (whNm=="")?$("#mea138WhNm_"+tdkIndex).val():whNm;
	$("#sitemNo_"+tdkIndex+"_"+itemIndex).val(sitemNo);					//�����p���i�R�[�h
	$("#itemNm1_"+tdkIndex+"_"+itemIndex).val(itemNm1);					//�̔����i��1
	$("#itemNm2_"+tdkIndex+"_"+itemIndex).val(itemNm2);					//�̔����i��2
	$("#itemNm1Disp_"+tdkIndex+"_"+itemIndex).html(itemNm1);			//�̔����i��1
	$("#itemNm2Disp_"+tdkIndex+"_"+itemIndex).html(itemNm2);			//�̔����i��2
	$("#itemWhCd_"+tdkIndex+"_"+itemIndex).val(whCd);					//�q��CD
	$("#itemWhNm_"+tdkIndex+"_"+itemIndex).val(whNmDsp);				//�q�ɖ�
	$("#itemWhNmDisp_"+tdkIndex+"_"+itemIndex).html(whNmDsp);			//�q�ɖ�
	$("#itemSaleTnk_"+tdkIndex+"_"+itemIndex).val(tnk0Flg==1?"0":toComma(tnk));		//�̔����i�i�Ŕ����j
	$("#itemSaleZeiKTnk_"+tdkIndex+"_"+itemIndex).val(toComma(dspTnk));	//�̔����i�i�\���p�j
	$("#itemOrderMemo_"+tdkIndex+"_"+itemIndex).val(memo);				//�̔����i����
	$("#itemOrderMemoDisp_"+tdkIndex+"_"+itemIndex).html("<nobr>" + memo.split("\n").join(" ") + "</nobr>");			//�̔����i����
	$("#itemTransCoKbnNm_"+tdkIndex+"_"+itemIndex).val(transNm);		//�z���Ǝ�
	$("#itemTransCoKbnNmDisp_"+tdkIndex+"_"+itemIndex).html(transNm);	//�z���Ǝ�
	$("#itemHikiateFlg_"+tdkIndex+"_"+itemIndex).val(toComma(hikiate));		//�݌ɏ�
	$("#itemHikiateFlgNm_"+tdkIndex+"_"+itemIndex).val(toComma(hikiate));	//�݌ɏ�
	$("#sagyoCd4_"+tdkIndex+"_"+itemIndex).val(sagyoCd4);		//���i��Ǝw��CD
	$("#sagyoNm_"+tdkIndex+"_"+itemIndex).val(sagyoNm);	//���i��Ǝw����
	
	$("#itemQty_"+tdkIndex+"_"+itemIndex).removeAttr("readonly").removeClass("readonly");

	//���אŋ�
	$("#itemMeiZeiTnk_"+tdkIndex+"_"+itemIndex).val(tnk0Flg==1?0:zeiTnk);
	//���i���� 
	if ($("#itemOrderMemo_"+tdkIndex+"_"+itemIndex).val()!=""){
		$("#tdOrderMemo_"+tdkIndex+"_"+itemIndex).attr("title","�S����\������ꍇ�̓N���b�N���ĉ������B");
		$("#tdOrderMemo_"+tdkIndex+"_"+itemIndex).attr("style","cursor:hand");
	}
}
//�͐�̉ύ��ڂ����Z�b�g����
var resetKahenFlg = 0;
function resetTdkKahen(){
	var tmp					= 0,
		orderItemQty		= 0,	//[���v]���i���v����
		subtotalKin			= 0,	//[���v]���i���v���z(�Ŕ�)
		totalZeiKin			= 0,	//[���v]�����
		seikyuuZeiKKin		= 0,	//[���v]�������z
		sign 				= 0
	;
	var totalKinArray = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

	var tdkcount1=tdkcnt;
	for (var tdkIndex = 1; tdkIndex<=tdkcount1; tdkIndex++){
		var tdk = $("#tdk"+tdkIndex);
		if(tdk.length == 0)continue;
		var tdkDelFlg = $("#tdkDeleteFlg_"+tdkIndex).val();						//�͐�폜(�o�^��)
		if(tdkDelFlg == 1)continue;
		//���i���v���z(�Ŕ���)
		tmp = parseInt(reComma($("#tdkSubtotalKin_"+tdkIndex).val()),10);
		subtotalKin += (isNaN(tmp)?0:tmp);
		//�����
		tmp = parseInt(reComma($("#tdkTotalZeiKin_"+tdkIndex).val()),10);
		totalZeiKin += (isNaN(tmp)?0:tmp);
		//�������z �Ŕ�+�����
		$("#tdkSeikyuuZeiKKin_"+tdkIndex).val(toComma(subtotalKin+totalZeiKin));
		//�ύ��ڂ��ׂăN���A
		for (i=0; i<15; i++){
			$("#tdkTotalKin"+(i+1)+"_"+tdkIndex).val("0");
		}
	}
	resetKahenFlg = 1;
}
//�L�����y�[���p��������
function campaignHikiate(tdkIndex,itemIndex){
	//������
	changeKariHikiate(tdkIndex,itemIndex);
	
	$("#itemQty_"+tdkIndex+"_"+itemIndex).attr("readonly","readonly").addClass("readonly");
	var ymd = $("#orderYmd").val();
	var url = urlBase + "/e_asproOrder/OD010OrdersNew";
	var parms = "processType="+ajaxProcessType;
		parms += "&ajaxKbn=4";
		parms += "&cb=setItemInfo";
		parms += "&itemNo="+$("#itemNo_"+tdkIndex+"_"+itemIndex).val();
		parms += "&colorCd="+$("#itemColorCd_"+tdkIndex+"_"+itemIndex).val();
		parms += "&sizeCd="+$("#itemSizeCd_"+tdkIndex+"_"+itemIndex).val();
		parms += "&ymd="+$("#orderYmd").val().replace(/\//g,"");
		parms += "&tnkDspKbn="+$("#tnkDspKbn").val();
		parms += "&tdkIndex="+tdkIndex;
		parms += "&itemIndex="+itemIndex;

		ExecuteAjax(url,parms);
}
//�L�����y�[�����𖾍ׂɔ��f����F�v���[���g
function setCampaignPresent(toku_item_no,color,size,toku_item_qty) {
	//�v���[���g�̏ꍇ
	var tdkIndex = "1";
	//1���ڂ̓͂���ɕt�^
	var items = $("#itemInfo_"+tdkIndex);
	var itemMax = parseInt($("#itemCnt_"+tdkIndex).val(),10)+1;
	//�󂫍s��T��
	var itemIndex = 0;
	for (var i = 0; i<itemMax; i++){
		if($("#itemNo_"+tdkIndex+"_"+i).val() == ""){
			itemIndex = i;
			break;
		}
	}
	if (itemIndex == 0) {
		addItemRows(tdkIndex,5);
		itemIndex = itemMax;
	}
	//�v���[���g���Z�b�g
	$("#sitemNo_"+tdkIndex+"_"+itemIndex).val(toku_item_no+color+size);
	$("#itemNo_"+tdkIndex+"_"+itemIndex).val(toku_item_no);
	$("#itemColorCd_"+tdkIndex+"_"+itemIndex).val(color);
	$("#itemSizeCd_"+tdkIndex+"_"+itemIndex).val(size);
	$("#itemQty_"+tdkIndex+"_"+itemIndex).val(toku_item_qty);
	$("#itemPresentFlg_"+tdkIndex+"_"+itemIndex).val("1");
	$("#itemNebikiTnk_"+tdkIndex+"_"+itemIndex).val("0");
	
	//getItemInfo(tdkIndex,itemIndex)
	 campaignHikiate(tdkIndex,itemIndex);
}
//�L�����y�[�����𖾍ׂɔ��f����F�P���l����
function setCampaignNebiki(sitem_no,toku_nebiki_tnk) {
	//�Y�����鏤�i��T��
	for (var tdkIndex = 1; tdkIndex<=tdkcnt; tdkIndex++){
		var tdk = $("#tdk"+tdkIndex);
		if(tdk.length == 0)continue;
		var tdkDelFlg = $("#tdkDeleteFlg_"+tdkIndex).val();						//�͐�폜(�o�^��)
		if(tdkDelFlg == 1)continue;
		
		var items = $("#itemInfo_"+tdkIndex);
		var itemMax = parseInt($("#itemCnt_"+tdkIndex).val(),10)+1;
		for (var itemIndex = 1; itemIndex<itemMax; itemIndex++){
			if($("#sitemNo_"+tdkIndex+"_"+itemIndex).val() == sitem_no){
				$("#itemNebikiTnk_"+tdkIndex+"_"+itemIndex).val(toku_nebiki_tnk);
				//getItemInfo(tdkIndex,itemIndex)
				 campaignHikiate(tdkIndex,itemIndex);
			}
		}
	}
}

//����
function changeQty(tdkIndex,itemIndex){
	if (resetKahenFlg == 0) {
		//�͐�̉ύ��ڂ����Z�b�g
		resetTdkKahen();
	}

	if($("#itemNo_"+tdkIndex+"_"+itemIndex).val() == ""){
		return;
	}

	var qty = parseInt(reComma($("#itemQty_"+tdkIndex+"_"+itemIndex).val(),10));		//����
	if(isNaN(qty)){
		//������ 
		//changeKariHikiate(tdkIndex,itemIndex,1);
		$("#itemQty_"+tdkIndex+"_"+itemIndex).val("");									//����
		$("#itemMeisaiKei_"+tdkIndex+"_"+itemIndex).val("").next().html("&nbsp;");		//���׌v
		$("#itemZeiTnk_"+tdkIndex+"_"+itemIndex).val("").next().html("&nbsp;");			//�����
		$("#itemHikiateFlg_"+tdkIndex+"_"+itemIndex).val("");							//�󒍏��
		$("#itemHikiateFlgNm_"+tdkIndex+"_"+itemIndex).val("").next().html("&nbsp;");	//�󒍏��

		return;
	}
	
	$("#itemHikiateFlg_"+tdkIndex+"_"+itemIndex).val("");							//�󒍏��
	$("#itemHikiateFlgNm_"+tdkIndex+"_"+itemIndex).val("").next().html("&nbsp;");	//�󒍏��
	
	//������ 
	changeKariHikiate(tdkIndex,itemIndex);
	
	var tnk = parseInt(reComma($("#itemSaleZeiKTnk_"+tdkIndex+"_"+itemIndex).val()),10);	//�̔����i�i�ō��݁j
	var nebiki = parseInt(reComma($("#itemNebikiTnk_"+tdkIndex+"_"+itemIndex).val()),10);	//�l����
	var zeiTnk = parseInt($("#itemMeiZeiTnk_"+tdkIndex+"_"+itemIndex).val(),10);			//���אŋ�
	
	//���׌v(�v�Z�F�̔����i������)
	if(!isNaN(tnk) && !isNaN(nebiki) && !isNaN(qty)){
		$("#itemMeisaiKei_"+tdkIndex+"_"+itemIndex).val((tnk-nebiki) * qty).next().html(toComma((tnk-nebiki) * qty).toString());
		//�����(�v�Z�F�󒍖���.���אŋ�������)
		$("#itemZeiTnk_"+tdkIndex+"_"+itemIndex).val(zeiTnk * qty).next().html(toComma(zeiTnk * qty).toString());
		//����(For Javascript)
		$("#itemCount_"+tdkIndex+"_"+itemIndex).val(qty);
	}else{
		$("#itemMeisaiKei_"+tdkIndex+"_"+itemIndex).val("");
		//�����(�v�Z�F�󒍖���.���אŋ�������)
		$("#itemZeiTnk_"+tdkIndex+"_"+itemIndex).val("");
		//����(For Javascript)
		$("#itemCount_"+tdkIndex+"_"+itemIndex).val("");
	}
}
//���i���N���A
//flg = 1 :�̔����iCD�^�̔����i�J���[CD�^�̔����i�T�C�YCD�̓N���A���Ȃ��B
//flg = 2 :�̔����iCD�^�̔����i�J���[CD�^�̔����i�T�C�YCD/���ʂ̓N���A���Ȃ��B
function clearItemInfo(tdkIndex,itemIndex,flg){
	//$("#tdk"+tdkIndex).find(".itemName"+itemIndex).html("&nbsp;");	//�̔����i��
	$("#itemNm1Disp_"+tdkIndex+"_"+itemIndex).html("&nbsp;");	//�̔����i��1
	$("#itemNm2Disp_"+tdkIndex+"_"+itemIndex).html("&nbsp;");	//�̔����i��2
	
	$("#itemNm1_"+tdkIndex+"_"+itemIndex).val("");					//�̔����i��1
	$("#itemNm2_"+tdkIndex+"_"+itemIndex).val("");					//�̔����i��2
	$("#itemSaleZeiKTnk_"+tdkIndex+"_"+itemIndex).val("");			//�̔����i�i�ō��݁j
	$("#itemPresentFlg_"+tdkIndex+"_"+itemIndex).val("0");			//�v���[���g�t���O
	$("#itemNebikiTnk_"+tdkIndex+"_"+itemIndex).val("0");			//�l���P��
	$("#itemMeisaiKei_"+tdkIndex+"_"+itemIndex).val("").next().html("&nbsp;");	//���׌v
	$("#itemMeiZeiTnk_"+tdkIndex+"_"+itemIndex).val("");						//���אŋ�
	$("#itemZeiTnk_"+tdkIndex+"_"+itemIndex).val("").next().html("&nbsp;");		//�����
	
	$("#itemOrderMemo_"+tdkIndex+"_"+itemIndex).val("");					//�̔����i����
	$("#itemOrderMemoDisp_"+tdkIndex+"_"+itemIndex).html("&nbsp;");			//�̔����i����
	
	$("#itemTransCoKbnNm_"+tdkIndex+"_"+itemIndex).val("");					//�z���ƎҖ�
	$("#itemTransCoKbnNmDisp_"+tdkIndex+"_"+itemIndex).html("&nbsp;");		//�z���ƎҖ�
	
	if(flg != 2){
		$("#itemQty_"+tdkIndex+"_"+itemIndex).val("");						//����
		$("#itemCount_"+tdkIndex+"_"+itemIndex).val("0");					//����(For Javascript)
	}
	if($("#itemNo_"+tdkIndex+"_"+itemIndex).val() == ""){
		$("#itemQty_"+tdkIndex+"_"+itemIndex).removeAttr("readonly").removeClass("readonly");
	}
	$("#itemMeiZeiTnk_"+tdkIndex+"_"+itemIndex).val("");					//���׌v

	$("#itemHikiateFlg_"+tdkIndex+"_"+itemIndex).val("");							//�݌ɏ�
	$("#itemHikiateFlgNm_"+tdkIndex+"_"+itemIndex).val("").next().html("&nbsp;");	//�݌ɏ�
	
	$("#itemWhNm_"+tdkIndex+"_"+itemIndex).val("");								//�q�ɖ�
	$("#itemWhNmDisp_"+tdkIndex+"_"+itemIndex).html("");						//�q�ɖ�

	$("#sagyoCd4_"+tdkIndex+"_"+itemIndex).val("");								//���i��Ǝw��
	$("#sagyoNm_"+tdkIndex+"_"+itemIndex).html("");						//���i��Ǝw����

	//tableRePainting(tdkIndex,itemIndex);
	
	if(flg > 0){
		return;
	}
	//Clear
	$("#itemNo_"+tdkIndex+"_"+itemIndex).val("");			//���i�R�[�h
	$("#itemColorCd_"+tdkIndex+"_"+itemIndex).val("");
	$("#itemSizeCd_"+tdkIndex+"_"+itemIndex).val("");

}
//������ flg = 1 :clear 
function changeKariHikiate(tdkIndex,itemIndex,flg){
	var url = urlBase + "/e_asproOrder/OD010OrdersNew";
	var parms = "processType="+ajaxProcessType;
	parms += "&tdkIndex="+tdkIndex;
	parms += "&itemIndex="+itemIndex;
	if("1" == flg){
		parms += "&ajaxKbn=9"; //�������N���A ���i�R�[�h�ύX
	}else{
		parms += "&ajaxKbn=8"; //������
		parms += "&itemNo="+$("#itemNo_"+tdkIndex+"_"+itemIndex).val()
			+$("#itemColorCd_"+tdkIndex+"_"+itemIndex).val()
			+$("#itemSizeCd_"+tdkIndex+"_"+itemIndex).val()
		parms += "&mall="+mallFlg
		parms += "&qty="+$("#itemQty_"+tdkIndex+"_"+itemIndex).val();
		parms += "&qty_def="+$("#itemQty_Def_"+tdkIndex+"_"+itemIndex).val();
		parms += "&nebiki="+$("#itemNebikiTnk_"+tdkIndex+"_"+itemIndex).val();
		parms += "&present="+$("#itemPresentFlg_"+tdkIndex+"_"+itemIndex).val();
		parms += "&insKbn="+syukkaFlg;
		parms += "&mea138WhCd="+$("#mea138WhCd_"+tdkIndex).val();
	}
	parms += "&orderYmd="+$("#orderYmd").val().replace(/\//g,"")+$("#orderHh").val()+$("#orderMi").val();
	parms += "&taxCalcKbn="+$("#taxCalcKbn").val().replace(/\//g,"");
	parms += "&taxrt="+$("#taxRt").val().replace(/\//g,"");
	parms += "&site="+($("#siteHaibunFlg").val()=="1"?$("#siteCd").val():"");
	parms += "&orderNo="+$("#orderNo").val();
	parms += "&henpinCd="+$("#henpinCd").val();
	ExecuteAjax(url,parms);
}

//��������
function setItemSaleJoutai(retcd,whNm,tdkIndex,itemIndex){
	if(retcd == "90"){
		alert("�݌Ɉ����ł��܂���ł����B");
		return;
	}
	if(retcd == "CANCEL"){
		return;
	}
	if(retcd == "2"){
		return;
	}
	
	$("#itemNo_"+tdkIndex+"_"+itemIndex).removeAttr("readonly");			//���i�R�[�h
	$("#itemColorCd_"+tdkIndex+"_"+itemIndex).removeAttr("readonly");
	$("#itemSizeCd_"+tdkIndex+"_"+itemIndex).removeAttr("readonly");
	$("#itemQty_"+tdkIndex+"_"+itemIndex).removeAttr("readonly");
	$("#btnShowItemSearch_"+tdkIndex+"_"+itemIndex).show();
	$("#itemWhNm_"+tdkIndex+"_"+itemIndex).val(whNm);				//�q�ɖ�
	$("#itemWhNmDisp_"+tdkIndex+"_"+itemIndex).html(whNm);			//�q�ɖ�

	//���� or �݌ɕs��
	if(retcd == "0" || retcd == "1"){
		$("#itemHikiateFlg_"+tdkIndex+"_"+itemIndex).val(retcd);			//�󒍏��
		$("#itemHikiateFlgNm_"+tdkIndex+"_"+itemIndex).val(retcd=="1"?"����":"�݌ɕs��").next().html(retcd=="1"?"����":"�݌ɕs��");	//�󒍏�Ԗ�
	}
}
//���\�̉��P(CalcItemInfo -> CalcItemInfo2)
//�v�Z����(�͐�) (ItemChange)
function CalcItemInfo2(tdkIndex,tdkQty,tdkShoukei,tdkTax,hikiateFuka,horyu,itemIndex,itemSaleTnk,itemMeiZeiTnk){
	var tdk = $("#tdk"+tdkIndex);
	if(tdk.length == 0){return;}
	//�������̂�
	if(arguments.length >= 7){
		//tnkDspKbn 1:�ō� 2:�Ŕ�
		var tnk = ($("#tnkDspKbn").val()=="1"?parseInt(itemSaleTnk,10)+parseInt(itemMeiZeiTnk,10):parseInt(itemSaleTnk,10));				//�̔����i �\���p
		if ($("#itemNebikiTnk_"+tdkIndex+"_"+itemIndex).val()!="0") tnk=parseInt(tnk)-parseInt(reComma($("#itemNebikiTnk_"+tdkIndex+"_"+itemIndex).val()));
		if ($("#itemPresentFlg_"+tdkIndex+"_"+itemIndex).val()=="1") tnk=0;
		$("#itemSaleTnk_"+tdkIndex+"_"+itemIndex).val(toComma(itemSaleTnk));		//�̔����i �Ŕ�
		$("#itemSaleZeiKTnk_"+tdkIndex+"_"+itemIndex).val(toComma(tnk));			//�̔����i �\���p
		$("#itemMeiZeiTnk_"+tdkIndex+"_"+itemIndex).val(toComma(itemMeiZeiTnk));	//�����
		var zeiTnk = parseInt(itemMeiZeiTnk,10);									//���אŋ�
		var qty = parseInt(reComma($("#itemQty_"+tdkIndex+"_"+itemIndex).val(),10));		//����
		//���׌v(�v�Z�F�̔����i������)
		if(!isNaN(tnk) && !isNaN(qty)){
			var zeiktnk = parseInt(itemSaleTnk,10)+parseInt(itemMeiZeiTnk,10);
			$("#itemMeisaiKei_"+tdkIndex+"_"+itemIndex).val(zeiktnk * qty).next().html(toComma(zeiktnk * qty).toString());
		}

		//�����(�v�Z�F�󒍖���.���אŋ�������)
		if(!isNaN(qty)){
			$("#itemZeiTnk_"+tdkIndex+"_"+itemIndex).val(zeiTnk * qty).next().html(toComma(zeiTnk * qty).toString());
			//����(For Javascript)
			$("#itemCount_"+tdkIndex+"_"+itemIndex).val(qty);
		}
	}
	//[�͐�]���i���v���ʁi���v�j
	$("#tdkItemCount_"+tdkIndex).val(tdkQty);
	//[�͐�]���i���v���z(�Ŕ�)
	$("#tdkSubtotalKin_"+tdkIndex).val(toComma(parseInt(tdkShoukei,10)).toString());
	//[�͐�]���i���v���z(�ō�)
	$("#tdkSubtotalZeiKKin_"+tdkIndex).val(toComma(parseInt(tdkShoukei,10)+parseInt(tdkTax,10)).toString());
	//[�͐�]����ō��v
	$("#tdkTotalZeiKin_"+tdkIndex).val(toComma(parseInt(tdkTax,10)).toString());
	$("#tdkSeikyuuZeiKKin_"+tdkIndex).val(toComma(parseInt(tdkShoukei,10)+parseInt(tdkTax,10)).toString());
	$("#hikiateFukaFlg").val(hikiateFuka);						//�����s��
	$("#horyuKbn").val(horyu);									//�ۗ�

	CalcTdkInfo(tdkIndex);
}
function CalcTdkInfo(tdkIndex){
	var tmp						= 0,
		tdkSubtotalKin			= 0,	//[�͐�]���v���i���v�i�Ŕ��j
		tdkTotalZeiKin			= 0,	//[�͐�]���v�����
		tdkSeikyuuZeiKKin		= 0;	//[�͐�]�������z
	var sign = 0;
	//[�͐�]���i���v���z�i�Ŕ����j
	tdkSubtotalKin = parseInt(reComma($("#tdkSubtotalKin_"+tdkIndex).val()),10);
	//[�͐�]����ō��v
	tdkTotalZeiKin = parseInt(reComma($("#tdkTotalZeiKin_"+tdkIndex).val()),10);
	//�������z
	tdkSeikyuuZeiKKin = tdkSubtotalKin+tdkTotalZeiKin;
	//�ύ��ڂ��ׂďW�v
	for (var i=0; i<15; i++){
		tmp = parseInt(reComma($("#tdkTotalKin"+(i+1)+"_"+tdkIndex).val()),10);
		sign = parseInt(reComma($("#tdkTotalKinSign"+(i+1)+"_"+tdkIndex).val()),10);
		tmp = isNaN(tmp)?0:tmp;

		tdkSeikyuuZeiKKin	+= tmp*sign;
	}

	//[�͐�]�������z�i���v�j
	$("#tdkSeikyuuZeiKKin_"+tdkIndex).val(toComma(parseInt(tdkSeikyuuZeiKKin,10)).toString());
	CalcOrderInfo();

}
function CalcOrderInfo(){
	var tmp					= 0,
		orderItemQty		= 0,	//[���v]���i���v����
		subtotalKin			= 0,	//[���v]���i���v���z(�Ŕ�)
		totalZeiKin			= 0,	//[���v]�����
		seikyuuZeiKKin		= 0,	//[���v]�������z
		sign 				= 0
	;
	var totalKinArray = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

	var tdkcount1=tdkcnt;
	for (var tdkIndex = 1; tdkIndex<=tdkcount1; tdkIndex++){
		var tdk = $("#tdk"+tdkIndex);
		if(tdk.length == 0)continue;
		var tdkDelFlg = $("#tdkDeleteFlg_"+tdkIndex).val();						//�͐�폜(�o�^��)
		if(tdkDelFlg == 1)continue;
		//���i���v����
		tmp = parseInt($("#tdkItemCount_"+tdkIndex).val(),10);
		orderItemQty += (isNaN(tmp)?0:tmp);
		//���i���v���z(�Ŕ���)
		tmp = parseInt(reComma($("#tdkSubtotalKin_"+tdkIndex).val()),10);
		subtotalKin += (isNaN(tmp)?0:tmp);
		//�����
		tmp = parseInt(reComma($("#tdkTotalZeiKin_"+tdkIndex).val()),10);
		totalZeiKin += (isNaN(tmp)?0:tmp);
		//�������z
		tmp = parseInt(reComma($("#tdkSeikyuuZeiKKin_"+tdkIndex).val()),10);
		seikyuuZeiKKin += (isNaN(tmp)?0:tmp);
	}

	$("#orderItemCount").val(toComma(orderItemQty));				//[���v]���i���v����
	$("#orderSubtotalKin").val(toComma(subtotalKin));				//[���v]���i���v���z(�Ŕ�)
	$("#orderSubtotalZeiKKin").val(toComma(subtotalKin+totalZeiKin));				//[���v]���i���v���z(�Ŕ�)
	$("#orderTotalZeiKin").val(toComma(totalZeiKin));				//[���v]�����
	var seikyuu=subtotalKin+totalZeiKin;
	//�ύ��ڂ��ׂăZ�b�g
	for (i=0; i<15; i++){
		var sign = parseInt(($("#orderTotalKinSign"+(i+1)).val()=="-1"?-1:1),10);
		var kgk = reComma($("#orderTotalKin"+(i+1)).val());
		if (kgk == ""){
			$("#orderTotalKin"+(i+1)).val("0");
		}else{
			seikyuu+=parseInt(reComma($("#orderTotalKin"+(i+1)).val()),10)*sign;
		}
		if (kinTypeJiPoint !="" && kinTypeJiPoint == "#orderTotalKin"+(i+1)) {
			$("pointRiyou").val(reComma($("#orderTotalKin"+(i+1)).val()));
		}
	}
	$("#orderSeikyuuZeiKKin").val(toComma(seikyuu));				//[���v]�������z
}
//�u�L�����Z���v�ύX
function changeItemOrderJokyoKbn(tdkIndex,itemIndex){
	if($("#itemOrderJokyoKbn_"+tdkIndex+"_"+itemIndex).val() == "0"){
		//(�L�����Z�� -> �ʏ�)
		$("#itemQty_"+tdkIndex+"_"+itemIndex).val("");								//����
		$("#itemMeisaiKei_"+tdkIndex+"_"+itemIndex).val("").next().html("&nbsp;");	//���׌v
		$("#itemZeiTnk_"+tdkIndex+"_"+itemIndex).val("").next().html("&nbsp;");		//�����
		$("#itemHikiateFlg_"+tdkIndex+"_"+itemIndex).val("");							//�󒍏��
		$("#itemHikiateFlgNm_"+tdkIndex+"_"+itemIndex).val("").next().html("&nbsp;");	//�󒍏��
		
		$("#itemNo_"+tdkIndex+"_"+itemIndex).removeAttr("readonly");			//���i�R�[�h
		$("#itemColorCd_"+tdkIndex+"_"+itemIndex).removeAttr("readonly");
		$("#itemSizeCd_"+tdkIndex+"_"+itemIndex).removeAttr("readonly");
		$("#itemQty_"+tdkIndex+"_"+itemIndex).removeAttr("readonly");
		
		$("#itemNo_"+tdkIndex+"_"+itemIndex).removeClass("readonly");
		$("#itemColorCd_"+tdkIndex+"_"+itemIndex).removeClass("readonly");
		$("#itemSizeCd_"+tdkIndex+"_"+itemIndex).removeClass("readonly");
		$("#itemQty_"+tdkIndex+"_"+itemIndex).removeClass("readonly");
		
		$("#btnShowItemSearch_"+tdkIndex+"_"+itemIndex).show();
		$("#btnShowItemInfo_"+tdkIndex+"_"+itemIndex).show();
		
	}else{
		//(�ʏ� -> �L�����Z��)
		//������
		changeKariHikiate(tdkIndex,itemIndex,1);
		//���
		$("#itemSagyoCd_"+tdkIndex+"_"+itemIndex).attr("readonly","readonly").addClass("readonly");
		//���
		$("#itemSagyoNm_"+tdkIndex+"_"+itemIndex).attr("readonly","readonly").addClass("readonly");

		$("#itemNo_"+tdkIndex+"_"+itemIndex).attr("readonly","readonly").addClass("readonly");			//���i�R�[�h
		$("#itemColorCd_"+tdkIndex+"_"+itemIndex).attr("readonly","readonly").addClass("readonly");
		$("#itemSizeCd_"+tdkIndex+"_"+itemIndex).attr("readonly","readonly").addClass("readonly");
		$("#itemQty_"+tdkIndex+"_"+itemIndex).attr("readonly","readonly").addClass("readonly");
		$("#btnShowItemSearch_"+tdkIndex+"_"+itemIndex).hide();
		$("#btnShowItemInfo_"+tdkIndex+"_"+itemIndex).hide();
	}
	
}
//�����萔���v�Z
function getSoryo(){
	if($("#orderYmd").val() == ""){
		$("#orderYmd").css("background-color","#ffcccc");
		alert("�������͕K�{�ł��B");
		return;
	}else if(!_chkDate($("#orderYmd").val())){
		$("#orderYmd").css("background-color","#ffcccc");
		alert("�������͎��ۂɑ��݂�����t����͂��ĉ������B");
		return;
	}
	if($("#kessaiCd").val() == ""){
		$("#kessaiCdSelect").css("background-color","#ffcccc");
		alert(msgSouryou);
		return;
	}
	if($("#siteCd").val() == ""){
		$("#siteCd").css("background-color","#ffcccc");
		alert("�T�C�g���͕K�{�ł��B");
		return;
	}
	//�X�֔ԍ��`�F�b�N
	var arrtdkIndex=document.getElementsByName('tdkIndex');
	var tdkcount1=arrtdkIndex.length;
	var koZip1 = $("#kokyakuZip1").val();
	var koZip2 = $("#kokyakuZip2").val();
	for (var tdkIndex = 0; tdkIndex<tdkcount1; tdkIndex++){
		//var tdk = $("#tdk"+tdkIndex);
		var tdk = $("#tdk"+arrtdkIndex[tdkIndex].value);
		if(tdk.length == 0)continue;
		var tdkDelFlg = tdk.find("[name=tdkDeleteFlg]").val();						//�͐�폜(�o�^��)
		if(tdkDelFlg == "1")continue;
		var tdkOrdKakuteiFlg = tdk.find("[name=tdkOrdKakuteiFlg]").val();
		if(tdkOrdKakuteiFlg == "1")continue;
		var tdkidx = tdk.find("[name=tdkIndex]").val();
		var tdkFlg = $("#tdkFlg_"+tdkidx).val();
		var tdkZip1 = tdk.find("[name=tdkZip1]").val();
		var tdkZip2 = tdk.find("[name=tdkZip2]").val();
		if (tdkFlg=="1") {
			if (!koZip1||!koZip2) {
				if (!koZip1) $("#kokyakuZip1").css("background-color","#ffcccc");
				if (!koZip2)$("#kokyakuZip2").css("background-color","#ffcccc");
				alert("�����҂̗X�֔ԍ�����͂��Ă��������B");
				return;
			}
		}else if (!tdkZip1 || !tdkZip2){
			if (!tdkZip1) tdk.find("[name=tdkZip1]").css("background-color","#ffcccc");
			if (!tdkZip2) tdk.find("[name=tdkZip2]").css("background-color","#ffcccc");
			alert((tdkIndex+1)+"���ڂ̓͂���̗X�֔ԍ�����͂��Ă��������B");
			return;
		}
	}
	$("#btnSubmit").attr("disabled","disabled");
	$("#btnSubmitFlg").val("0");

	var orderYmd = $("#orderYmd").val().substring(0,4) + $("#orderYmd").val().substring(5,7) + $("#orderYmd").val().substring(8,10)+$("#orderHh").val()+$("#orderMi").val();
	var kokyakuBirth = $("#kokyakuBirth").val().substring(0,4) + $("#kokyakuBirth").val().substring(5,7) + $("#kokyakuBirth").val().substring(8,10);

	//�v���[���g���Z�b�g
	var itemMax = parseInt($("#itemCnt_1").val(),10)+1;
	//�����̃v���[���g���폜
	for (var i = 0; i<itemMax; i++){
		if($("#itemPresentFlg_1_"+i).val() == "1"){
			$("#itemNo_1_"+i).val("");
			clearItemInfo(1,i,0);
		}
	}
	var arrtdkIndex=document.getElementsByName('tdkIndex');
	var tdkcount1=arrtdkIndex.length;
	var url = urlBase + "/e_asproOrder/OD010OrdersNew";
	var parms = "processType="+ajaxProcessType;
	parms += "&ajaxKbn=10"; //�����萔���v�Z
	parms += "&binsyuCd="+$("#binsyuCd").val();
	for (var tdkIndex = 0;tdkIndex<tdkcount1;tdkIndex++){
		
		var tdk = $("#tdk"+arrtdkIndex[tdkIndex].value);
		if(tdk.length == 0)continue;
		var tdkDelFlg = tdk.find("[name=tdkDeleteFlg]").val();						//�͐�폜(�o�^��)
		if(tdkDelFlg == "1")continue;		
		var tdkOrdKakuteiFlg = tdk.find("[name=tdkOrdKakuteiFlg]").val();
		if(tdkOrdKakuteiFlg == "1")continue;
		var tdkidx = tdk.find("[name=tdkIndex]").val();
		var tdkFlg = $("#tdkFlg_"+tdkidx).val();
		var tdkZip = (tdkFlg=="1")?(koZip1+koZip2):(tdk.find("[name=tdkZip1]").val()+tdk.find("[name=tdkZip2]").val());

		parms += "&tdkIndexArr="+arrtdkIndex[tdkIndex].value;
		parms += "&zipArr="+tdkZip;
	}
	var kahen = 0;
	//�ύ��v�̍��v(�����A�萔���A�L�����y�[���l���ȊO�{����ō��v
	for (var i=1; i<=15; i++){
		if (("orderTotalKin"+i) != kinTypeSoryo && ("orderTotalKin"+i) != kinTypeDaibiki && ("orderTotalKin"+i) != kinTypeHaraikomi && ("orderTotalKin"+i) != kinTypeCampaign) {
			var kahenTxt = reComma($("#orderTotalKin"+i).val());
			var kahenSign = reComma($("#orderTotalKinSign"+i).val());
			kahen += parseInt((kahenTxt==""?"0":kahenTxt),10) * parseInt((kahenSign==""?"1":kahenSign),10);
		}
	}
	//����ō��v�����Z
	kahen += parseInt(reComma($("#orderTotalZeiKin").val()),10);
	parms += "&riyou="+kahen;
	parms += "&kessaiCd="+$("#kessaiCd").val();
	parms += "&ymd="+orderYmd;
	parms += "&site="+$("#siteCd").val();
	parms += "&kokyakuNo="+$("#kokyakuNo").val();
	parms += "&birth="+kokyakuBirth;
	parms += "&rank="+$("#kokyakuRankKbn").val();
	parms += "&no="+$("#orderNoTypical").val();
	parms += "&sinki="+$("#sinkiKokyakuFlg").val();
	ExecuteAjaxSync(url,parms);
}
//�����萔�� ����萔�� �N�[���萔�� �L�����y�[���l���z
function setSoryo(soryo,tesuuryo,tesuuKbn,campaign,point,tdkIndex,retCd){
	if(retCd == "0"){
		if (kinTypeSoryo!=""){
			$("#"+kinTypeSoryo).val(toComma(parseInt(soryo,10)).toString());
		}
		if(tesuuKbn=="1" && kinTypeDaibiki!=""){
			$("#"+kinTypeDaibiki).val(toComma(parseInt(tesuuryo,10)).toString());
		}else if(tesuuKbn=="2" && kinTypeHaraikomi!=""){
			$("#"+kinTypeHaraikomi).val(toComma(parseInt(tesuuryo,10)).toString());
		}
		if (kinTypeCampaign!=""){
			$("#"+kinTypeCampaign).val(toComma(parseInt(campaign,10)).toString());
		}
		$("#pointPlus").val(toComma(parseInt(point,10)).toString());
		$("#btnSubmit").removeAttr("disabled");
				$("#od090button").removeAttr("disabled");
		$("#btnSubmitFlg").val("1");
		CalcOrderInfo(tdkIndex);
		
	}else if(retCd.substr(0,2) =="10"){
		var idx = retCd.substr(2);
		if (idx == "") idx = 1;
		if (idx == 1 && $("#tdkFlg_1").val() == "1") {
			$("#kokyakuZip1").css("background-color","#ffcccc");
			$("#kokyakuZip2").css("background-color","#ffcccc");
		}else{
			$("#tdkZip1_"+idx).css("background-color","#ffcccc");
			$("#tdkZip2_"+idx).css("background-color","#ffcccc");
		}
		$("#btnSubmit").attr("disabled","disabled");
		$("#btnSubmitFlg").val("0");
		alert("�Y���̗X�֔ԍ�������܂���B");

	}else if(retCd =="20"){
		$("#orderYmd").css("background-color","#ffcccc");
		$("#btnSubmit").attr("disabled","disabled");
		$("#btnSubmitFlg").val("0");
		alert("�������͎��ۂɑ��݂�����t����͂��ĉ������B");

	}else if(retCd =="30"){
		$("#itemNo_1_1").css("background-color","#ffcccc");
		$("#itemQty_1_1").css("background-color","#ffcccc");
		$("#btnSubmit").attr("disabled","disabled");
		$("#btnSubmitFlg").val("0");
		alert("���ׂ���͂��Ă��������B");
		
	}else if(retCd =="90"){
		alert("���͒l���s���Ȃ��ߏ����𑱍s�ł��܂���ł����B���N�����Ȃǂ̓��͒l�����m�F���������B");
		$("#btnSubmit").attr("disabled","disabled");
		$("#btnSubmitFlg").val("0");
	}else{
		$("#btnSubmit").attr("disabled","disabled");
		$("#btnSubmitFlg").val("0");
	}
}
//���i�����{�^������
function showItemSearch(tdkIndexAndItemIndex){
	var _searchWin;
	var url= urlBase+"/e_asproLogin/CC021SearchProduct";
	url += "?callsSrciptFuncName=setProductCd";
	url += "&index="+tdkIndexAndItemIndex;
	url += "&strToolbarX=110";
	_searchWin = window.open(url,"CC021","width=680,height=500,menubar=no,location=no,status=yes,resizable=yes,scrollbars=yes");
	_searchWin.focus();
}
//���i�����{�^������ ����
function setProductCd(cd,color,size,itemNm,std_zei_k_tnk,sale_zei_k_tnk,tdkIndexAndItemIndex){
	var tdkIndex = tdkIndexAndItemIndex.split(",")[0];
	var itemIndex = tdkIndexAndItemIndex.split(",")[1];
	
	$("#itemNo_"+tdkIndex+"_"+itemIndex).val(cd);
	$("#itemColorCd_"+tdkIndex+"_"+itemIndex).val(color);
	$("#itemSizeCd_"+tdkIndex+"_"+itemIndex).val(size);
	getItemInfo(tdkIndex,itemIndex);
}
//�͂���`�F�b�N��
function setTdkFlg(obj,tdkIndex){
	$("#tdkFlg_"+tdkIndex).val((obj.checked)?"1":"0");
	$("#tdkZip1_"+tdkIndex).css("background-color","");
	$("#tdkZip2_"+tdkIndex).css("background-color","");
	getMea138WhCd(tdkIndex);
}
//�Ǘ��߃`�F�b�N��
function setTomeFlg(obj,tdkIndex){
	$("#tomeFlg_"+tdkIndex).val((obj.checked)?"1":"0");
		//���X�֋ǃ��Z�b�g
	$("#uketoriZip_"+tdkIndex).val("");
	$("#uketoriZipNm_"+tdkIndex).html("");
	
	if (!obj.checked) {
		$("#uketoriZip_"+tdkIndex).attr("readonly","readonly");
		$("#uketoriZip_"+tdkIndex).removeClass("code");
		$("#uketoriZip_"+tdkIndex).addClass("disp");
		$("#uketoriZipAnk_"+tdkIndex).attr("style","display:none");
		
	}else{
		$("#uketoriZip_"+tdkIndex).removeAttr("readonly");
		$("#uketoriZip_"+tdkIndex).removeAttr("style");
		$("#uketoriZip_"+tdkIndex).removeClass("disp");
		$("#uketoriZip_"+tdkIndex).addClass("code");
		$("#uketoriZipAnk_"+tdkIndex).removeAttr("style");
	}
}
//�͐�ǉ�
function addTdkInfo(){
	var tdk = $("#tdkTemplate").clone(true);
	tdk.html(tdk.html().replace(/_tdkIndex_/g,tdkcnt));
	tdk.attr('id','tdk'+ (tdkcnt));
	tdk.find("[name=tdkIndex]").val(tdkcnt);
	tdk.find("[name=itemCnt]").val(0);

	tdk.find('.itemLine1').remove();
	tdk.find('.itemLine2').remove();
	
	$("#tdkInfo").append(tdk);
	Calendar.setup({inputField:'syukkaYoteiYmd'+tdkcnt,ifFormat:'%Y/%m/%d',showsTime:false,weekNumbers:false,button: 'syukkaYoteiYmd'+tdkcnt+'_calendar_link_id',singleClick : true,step:1});
	Calendar.setup({inputField:'tdkYmd'+tdkcnt,ifFormat:'%Y/%m/%d',showsTime:false,weekNumbers:false,button: 'tdkYmd'+tdkcnt+'_calendar_link_id',singleClick : true,step:1});

	//�J�i��������
	var auto_kana_add2 = new AutoKana('tdkNm1_'+tdkcnt, 'tdkKana1_'+tdkcnt, {katakana:true, toggle:false});
	var auto_kana_add2 = new AutoKana('tdkNm2_'+tdkcnt, 'tdkKana2_'+tdkcnt, {katakana:true, toggle:false});

	var itemCnt = tdk.find("input[name=itemCnt]");
	itemCnt.attr("id","itemCnt_" + tdkcnt);
	
	addItemRows('#tdk'+ tdkcnt,5);
	tdk.show();
	tdkcnt++;
	
	var colorful = new ColorfulInput;
	colorful.set();
	
	//�֑������`�F�b�N
	_InputInit();

	$('#tdkCnt').val(tdkcnt-1);
	$$("goukeiArea").style.display = "block";
}
//�͐悲�Ƃ̕��ʕʑq�ɐݒ�
function getMea138WhCd(index){
	var zip;
	if ($("#tdkFlg_"+index).val() == "1") {
		zip = $("#kokyakuZip1").val() + $("#kokyakuZip2").val();
	}else{
		zip = $("#tdkZip1_"+index).val() + $("#tdkZip2_"+index).val();
	}
	if (zip.length == 7){
		var url = urlBase + "/e_asproOrder/OD010OrdersNew";
		var parms = "processType="+ajaxProcessType;
			parms += "&ajaxKbn=6";
			parms += "&zip="+zip;
			parms += "&tdkIndex="+index;
			ExecuteAjax(url,parms);
	}else{	
//		setMea138WhCd("","",index);
	}
}
function setMea138WhCd(cd,nm,index) {
	var moto = $("#mea138WhCd_"+index).val();
	if (moto != cd) {
		$("#mea138WhCd_"+index).val(cd);
		$("#mea138WhNm_"+index).val(nm);

		//��������
		var items = $("#itemInfo_"+index);
		var itemMax = parseInt($("#itemCnt_"+index).val(),10)+1;
		for (var i = 1; i<itemMax; i++){
			//������ �Čv�Z
			if ($("#itemNo_"+index+"_"+i).val() == "" || $("#itemQty_"+index+"_"+i).val() == "") {
			}else{
				changeKariHikiate(index,i);
			}
		}
	}
}

//5�s�ǉ�
var _cloneLine1 = null;
var _cloneLine2 = null;
var _cloneGift = null;
var _cloneKakou = null;
function addItemRows(tdkId,cnt){
	var tdkIndex = tdkId.replace("#tdk","");
	var items = $("#itemInfo_"+tdkIndex);
	var itemCntHidden = $("#itemCnt_"+tdkIndex);
	var itemIndex = parseInt(itemCntHidden.val(),10)+1;
	var orderNo = $("#tdkOrderNo_"+tdkIndex).val();
	if(_cloneLine1 == null) {
		_cloneLine1 = $("#itemRow1__tdkIndex___itemIndex_");
		_cloneLine2 = $("#itemRow2__tdkIndex___itemIndex_");
	}
	
	for (var i = 0;i< cnt;i++){
		var itemLine1 = _cloneLine1.clone(true).attr("id","itemRow1_"+tdkIndex+"_"+(itemIndex + i));
		var itemLine2 = _cloneLine2.clone(true).attr("id","itemRow2_"+tdkIndex+"_"+(itemIndex + i));

		itemLine1.html(itemLine1.html().replace(/_tdkIndex_/g,tdkIndex).replace(/_itemIndex_/g,(itemIndex + i)));
		itemLine2.html(itemLine2.html().replace(/_tdkIndex_/g,tdkIndex).replace(/_itemIndex_/g,(itemIndex + i)));

		items.append(itemLine1);
		items.append(itemLine2);
		if (orderNo == "") {
			$$("tdkItemOrderJokyoKbn_"+tdkIndex+"_"+(itemIndex+i)).style.display = "none";
		}else{
			$$("tdkItemOrderJokyoKbn_"+tdkIndex+"_"+(itemIndex+i)).style.display = "block";
		}
	}

	var colorful = new ColorfulInput;
	colorful.set();
	itemCntHidden.val(itemIndex + cnt - 1);
	
	//�֑������`�F�b�N
	_InputInit();
}

//�͐�폜
function FuncRemoveTdkInfo(tdkid,msg){
	if(confirm(msg)){
		changeKariHikiate($("#"+tdkid).find("[name=tdkIndex]").val(),"",1);	//������
		$("#"+tdkid).remove();
		$('#tdkCnt').val(parseInt($('#tdkCnt').val(),10)-1);
		if ($('#tdkCnt').val() == "1") {
			$$("goukeiArea").style.display = "none";
		}
		//�v�Z����
		CalcOrderInfo();
	}
}
//�͐�폜(�o�^��)
function FuncRemoveOrderTdkInfo(tdkid,msg){
	if(confirm(msg)){
		changeKariHikiate($("#"+tdkid).find("[name=tdkIndex]").val(),"",1);	//������
		$("#"+tdkid).find("[name=tdkDeleteFlg]").val("1");
		$("#"+tdkid).hide();
		//�v�Z����
		CalcOrderInfo();
	}
}
