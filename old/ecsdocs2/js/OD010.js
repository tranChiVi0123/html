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
//ブラック顧客へ追加 ボタン2015.03.10 sakakibara
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
//メール送信 ボタン2015.03.10 sakakibara
//2015/04/10 URLをeasproOrderに修正 nakajima
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

//オプション表示 2015.03.10 sakakibara
function showCC400(orderNo,orderLineNo){
	var _searchWin;
	var url= urlBase + "/e_asproLogin/CC400OptionSelect";
	url += "?orderNo="+orderNo;
	url += "&orderLineNo="+orderLineNo;
	_searchWin = window.open(url,"CC400","width=650,height=450,menubar=no,location=no,status=yes,resizable=yes,scrollbars=yes");
	_searchWin.focus();
}
//住所の住所反映ボタン押下
function ajaxAddr(parentId,prefix){
	var zip1 = $("#"+parentId).find("[name="+prefix+"Zip1]").val();
	var zip2 = $("#"+parentId).find("[name="+prefix+"Zip2]").val();
	
	// 届先の郵便番号未入力で住所反映がクリックされた場合
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

//住所検索Ajax一つ結果戻るの場合、住所を直接設定
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

//住所検索結果
function setAddrInfo(zip,addrCd,addr1,data){
	var parentId = "#"+data.split(",")[0];
	var prefix = data.split(",")[1];
	var add11;
	var add12;
	if(zip.length == 7){
		$(parentId).find("[name="+prefix+"Zip1]").val(zip.replace("-","").substring(0,3));
		$(parentId).find("[name="+prefix+"Zip2]").val(zip.replace("-","").substring(3));
	}
	//検索戻りのときに住所は反映しないように修正 2014.12.04 sakakibara
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

//顧客住所検索Ajax複数結果戻るの場合、小画面Open
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

//住所検索ウィンドウ
function showAddrSearch(parentId,prefix){
	var url= urlBase + "/e_asproLogin/CC901SearchAddress";
	url += "?jsName=setAddrInfo";
	url += "&giveYourIndex="+parentId+","+prefix;
	_searchWin = window.open(url,"CC901","width=700,height=500,menubar=no,location=no,status=yes,resizable=yes,scrollbars=yes");
	_searchWin.focus();
}
//会員選択
		function showOD011(orderNo,orderLineNo){
			var _searchWin2;
			url= urlBase + "/e_asproOrder/OD011OrderHikiate";
			url += "?orderNo="+orderNo;
			url += "&orderLineNo="+orderLineNo;
			_searchWin2 = window.open(url,"OD011","width=750,height=200,menubar=no,location=no,status=yes,resizable=yes,scrollbars=yes");
			_searchWin2.focus();

		}
//会員選択
function showCC030(flg){
	var _searchWin;
	var url= urlBase + "/e_asproLogin/CC030SearchCustomer";
	url += "?callsSrciptFuncName=setKokyakuInfo";
	url += "&index="+flg;
	url += "&orderKbn=1";
	_searchWin = window.open(url,"CC030","width=780,height=600,menubar=no,location=no,status=yes,resizable=yes,scrollbars=yes");
	_searchWin.focus();
}

//会員ウインドウからの戻り
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
//キャンペーン履歴情報（件数）／問合履歴情報（件数）を取得する。
//顧客状態の購入履歴／顧客状態を取得する。
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
//購入履歴
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
//届先名（購入履歴）ボタン押下
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
//届け先情報反映
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
//キャンペーン履歴
function showCC063(){
	var _searchWin;
	var url = urlBase + "/e_asproLogin/CC063PromoHistory";
	url += "?kokyakuNo="+$("#kokyakuNo").val();
	url += "&syoriKbn=0";
	url += "&index=";
	_searchWin = window.open(url,"CC063","width=1000,height=600,menubar=no,location=no,status=yes,resizable=yes,scrollbars=yes");
	_searchWin.focus();
}
//ポイント照会
function showCC064(){
	var _searchWin;
	var url = urlBase + "/e_asproLogin/CC064PointHistory";
	url += "?kokyakuCd="+$("#kokyakuCd").val();
	if (url != ''){
		_searchWin = window.open(url,"CC064","width=1040,height=600,menubar=no,location=no,status=yes,resizable=yes,scrollbars=yes");
		_searchWin.focus();
	}
}
//DM履歴
function showCC065(){
	var _searchWin;
	var url = urlBase + "/e_asproLogin/CC065DmHistory";
	url += "?kokyakuNo="+$("#kokyakuNo").val();
	if (url != ''){
		_searchWin = window.open(url,"CC065","width=600,height=600,menubar=no,location=no,status=yes,resizable=yes,scrollbars=yes");
		_searchWin.focus();
	}
}
//キャンペーン特典参照
function showCC067(){
	var url= urlBase + "/e_asproLogin/CC067PromoHistory";
	_searchWin = window.open(url,"CC067","width=700,height=500,menubar=no,location=no,status=yes,resizable=yes,scrollbars=yes");
	_searchWin.focus();
}

//購入履歴ボタン押下
function showBuyCount(){
	var kokyakuNo = $("#kokyakuNo").val();		//顧客No
	var url= urlBase + "/e_asproLogin/CC060KounyuHistory?";
	url += "&kokyakuNo="+kokyakuNo;				//顧客No
	var _searchWin = window.open(url,"CC060","width=960,height=600,menubar=no,location=no,status=yes,resizable=yes,scrollbars=yes");
	_searchWin.focus();
}
//作業選択
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

//郵便局選択
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

//年齢
function calcAge(birthId,toshiId,gatsuId,toshiStr,gatsuStr,miFlg){	
	var strDate = $(birthId).val();
	var toshi;
	var gatsu;
	var flg = false;
	
	if(!toshiStr){
		toshiStr = "歳";
	}
	if(!gatsuStr){
		gatsuStr = "か月";
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
		$(toshiId).append("&nbsp;<span class=\"errMsg\">未成年</span>");
	}
	if(gatsuId){
		$(gatsuId).html(gatsu + gatsuStr);
	}
}
//決済方法
function changeKessaiCd(){
	var data = $("#kessaiCdSelect").val().split(",");
	$("#kessaiCd").val(data[0]);
	$("#kessaiKbn").val(data[1]).next().html(data[1]=="0"?"元払":"代引");
	$("#realAuthoriFlg").val(data[3]);
	$("#kessaiNm").val($("#kessaiCdSelect option:selected").text());

	//手数料リセット
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
		//変更があったら再計算
		var tmp;
		var total = 0;
		//商品小計金額(税抜き)
		tmp = parseInt(reComma($("#orderSubtotalKin").val()),10);
		total += (isNaN(tmp)?0:tmp);
		//消費税
		tmp = parseInt(reComma($("#orderTotalZeiKin").val()),10);
		total += (isNaN(tmp)?0:tmp);
		//可変項目すべてセット
		for (var i=0; i<15; i++){
			var sign = parseInt(($("#orderTotalKinSign"+(i+1)).val()=="-1"?-1:1),10);
			total+=parseInt(reComma($("#orderTotalKin"+(i+1)).val()),10)*sign;
		}
		$("#orderSeikyuuZeiKKin").val(toComma(total));				//[合計]請求金額
	}
}

//商品コード変更
function getItemInfo(tdkIndex,itemIndex){
	//商品クリア
	clearItemInfo(tdkIndex,itemIndex,1);
	
	//仮引当クリア
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
//販売商品名１ 販売商品名２ 販売価格（税抜き） 販売価格（税込み）消費税 販売商品メモ 倉庫cd 倉庫名１ 配送業者区分 配送業者  在庫状況,商品作業指示,商品作業名
function setItemInfo(itemNm1,itemNm2,sitemNo,tnk,zeiktnk,zeiTnk,memo,whCd,whNm,transKbn,transNm,hikiate,sagyoCd4,sagyoNm,
		tdkIndex,itemIndex){
	var tnk0Flg = "0";
	var present = $("#itemPresentFlg_"+tdkIndex+"_"+itemIndex).val();
	if(syukkaFlg =="1") tnk0Flg = 1;
	if(present =="1") tnk0Flg = 1;
	var nebiki = $("#itemNebikiTnk_"+tdkIndex+"_"+itemIndex).val();
	var dspTnk = (tnk0Flg==1?0:parseInt(zeiktnk,10) - parseInt(nebiki,0));
	var whNmDsp = (whNm=="")?$("#mea138WhNm_"+tdkIndex).val():whNm;
	$("#sitemNo_"+tdkIndex+"_"+itemIndex).val(sitemNo);					//検索用商品コード
	$("#itemNm1_"+tdkIndex+"_"+itemIndex).val(itemNm1);					//販売商品名1
	$("#itemNm2_"+tdkIndex+"_"+itemIndex).val(itemNm2);					//販売商品名2
	$("#itemNm1Disp_"+tdkIndex+"_"+itemIndex).html(itemNm1);			//販売商品名1
	$("#itemNm2Disp_"+tdkIndex+"_"+itemIndex).html(itemNm2);			//販売商品名2
	$("#itemWhCd_"+tdkIndex+"_"+itemIndex).val(whCd);					//倉庫CD
	$("#itemWhNm_"+tdkIndex+"_"+itemIndex).val(whNmDsp);				//倉庫名
	$("#itemWhNmDisp_"+tdkIndex+"_"+itemIndex).html(whNmDsp);			//倉庫名
	$("#itemSaleTnk_"+tdkIndex+"_"+itemIndex).val(tnk0Flg==1?"0":toComma(tnk));		//販売価格（税抜き）
	$("#itemSaleZeiKTnk_"+tdkIndex+"_"+itemIndex).val(toComma(dspTnk));	//販売価格（表示用）
	$("#itemOrderMemo_"+tdkIndex+"_"+itemIndex).val(memo);				//販売商品メモ
	$("#itemOrderMemoDisp_"+tdkIndex+"_"+itemIndex).html("<nobr>" + memo.split("\n").join(" ") + "</nobr>");			//販売商品メモ
	$("#itemTransCoKbnNm_"+tdkIndex+"_"+itemIndex).val(transNm);		//配送業者
	$("#itemTransCoKbnNmDisp_"+tdkIndex+"_"+itemIndex).html(transNm);	//配送業者
	$("#itemHikiateFlg_"+tdkIndex+"_"+itemIndex).val(toComma(hikiate));		//在庫状況
	$("#itemHikiateFlgNm_"+tdkIndex+"_"+itemIndex).val(toComma(hikiate));	//在庫状況
	$("#sagyoCd4_"+tdkIndex+"_"+itemIndex).val(sagyoCd4);		//商品作業指示CD
	$("#sagyoNm_"+tdkIndex+"_"+itemIndex).val(sagyoNm);	//商品作業指示名
	
	$("#itemQty_"+tdkIndex+"_"+itemIndex).removeAttr("readonly").removeClass("readonly");

	//明細税金
	$("#itemMeiZeiTnk_"+tdkIndex+"_"+itemIndex).val(tnk0Flg==1?0:zeiTnk);
	//商品メモ 
	if ($("#itemOrderMemo_"+tdkIndex+"_"+itemIndex).val()!=""){
		$("#tdOrderMemo_"+tdkIndex+"_"+itemIndex).attr("title","全文を表示する場合はクリックして下さい。");
		$("#tdOrderMemo_"+tdkIndex+"_"+itemIndex).attr("style","cursor:hand");
	}
}
//届先の可変項目をリセットする
var resetKahenFlg = 0;
function resetTdkKahen(){
	var tmp					= 0,
		orderItemQty		= 0,	//[合計]商品小計数量
		subtotalKin			= 0,	//[合計]商品小計金額(税抜)
		totalZeiKin			= 0,	//[合計]消費税
		seikyuuZeiKKin		= 0,	//[合計]請求金額
		sign 				= 0
	;
	var totalKinArray = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

	var tdkcount1=tdkcnt;
	for (var tdkIndex = 1; tdkIndex<=tdkcount1; tdkIndex++){
		var tdk = $("#tdk"+tdkIndex);
		if(tdk.length == 0)continue;
		var tdkDelFlg = $("#tdkDeleteFlg_"+tdkIndex).val();						//届先削除(登録済)
		if(tdkDelFlg == 1)continue;
		//商品小計金額(税抜き)
		tmp = parseInt(reComma($("#tdkSubtotalKin_"+tdkIndex).val()),10);
		subtotalKin += (isNaN(tmp)?0:tmp);
		//消費税
		tmp = parseInt(reComma($("#tdkTotalZeiKin_"+tdkIndex).val()),10);
		totalZeiKin += (isNaN(tmp)?0:tmp);
		//請求金額 税抜+消費税
		$("#tdkSeikyuuZeiKKin_"+tdkIndex).val(toComma(subtotalKin+totalZeiKin));
		//可変項目すべてクリア
		for (i=0; i<15; i++){
			$("#tdkTotalKin"+(i+1)+"_"+tdkIndex).val("0");
		}
	}
	resetKahenFlg = 1;
}
//キャンペーン用引当処理
function campaignHikiate(tdkIndex,itemIndex){
	//仮引当
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
//キャンペーン情報を明細に反映する：プレゼント
function setCampaignPresent(toku_item_no,color,size,toku_item_qty) {
	//プレゼントの場合
	var tdkIndex = "1";
	//1件目の届け先に付与
	var items = $("#itemInfo_"+tdkIndex);
	var itemMax = parseInt($("#itemCnt_"+tdkIndex).val(),10)+1;
	//空き行を探す
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
	//プレゼントをセット
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
//キャンペーン情報を明細に反映する：単価値引き
function setCampaignNebiki(sitem_no,toku_nebiki_tnk) {
	//該当する商品を探す
	for (var tdkIndex = 1; tdkIndex<=tdkcnt; tdkIndex++){
		var tdk = $("#tdk"+tdkIndex);
		if(tdk.length == 0)continue;
		var tdkDelFlg = $("#tdkDeleteFlg_"+tdkIndex).val();						//届先削除(登録済)
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

//数量
function changeQty(tdkIndex,itemIndex){
	if (resetKahenFlg == 0) {
		//届先の可変項目をリセット
		resetTdkKahen();
	}

	if($("#itemNo_"+tdkIndex+"_"+itemIndex).val() == ""){
		return;
	}

	var qty = parseInt(reComma($("#itemQty_"+tdkIndex+"_"+itemIndex).val(),10));		//数量
	if(isNaN(qty)){
		//仮引当 
		//changeKariHikiate(tdkIndex,itemIndex,1);
		$("#itemQty_"+tdkIndex+"_"+itemIndex).val("");									//数量
		$("#itemMeisaiKei_"+tdkIndex+"_"+itemIndex).val("").next().html("&nbsp;");		//明細計
		$("#itemZeiTnk_"+tdkIndex+"_"+itemIndex).val("").next().html("&nbsp;");			//消費税
		$("#itemHikiateFlg_"+tdkIndex+"_"+itemIndex).val("");							//受注状態
		$("#itemHikiateFlgNm_"+tdkIndex+"_"+itemIndex).val("").next().html("&nbsp;");	//受注状態

		return;
	}
	
	$("#itemHikiateFlg_"+tdkIndex+"_"+itemIndex).val("");							//受注状態
	$("#itemHikiateFlgNm_"+tdkIndex+"_"+itemIndex).val("").next().html("&nbsp;");	//受注状態
	
	//仮引当 
	changeKariHikiate(tdkIndex,itemIndex);
	
	var tnk = parseInt(reComma($("#itemSaleZeiKTnk_"+tdkIndex+"_"+itemIndex).val()),10);	//販売価格（税込み）
	var nebiki = parseInt(reComma($("#itemNebikiTnk_"+tdkIndex+"_"+itemIndex).val()),10);	//値引き
	var zeiTnk = parseInt($("#itemMeiZeiTnk_"+tdkIndex+"_"+itemIndex).val(),10);			//明細税金
	
	//明細計(計算：販売価格＊数量)
	if(!isNaN(tnk) && !isNaN(nebiki) && !isNaN(qty)){
		$("#itemMeisaiKei_"+tdkIndex+"_"+itemIndex).val((tnk-nebiki) * qty).next().html(toComma((tnk-nebiki) * qty).toString());
		//消費税(計算：受注明細.明細税金＊数量)
		$("#itemZeiTnk_"+tdkIndex+"_"+itemIndex).val(zeiTnk * qty).next().html(toComma(zeiTnk * qty).toString());
		//数量(For Javascript)
		$("#itemCount_"+tdkIndex+"_"+itemIndex).val(qty);
	}else{
		$("#itemMeisaiKei_"+tdkIndex+"_"+itemIndex).val("");
		//消費税(計算：受注明細.明細税金＊数量)
		$("#itemZeiTnk_"+tdkIndex+"_"+itemIndex).val("");
		//数量(For Javascript)
		$("#itemCount_"+tdkIndex+"_"+itemIndex).val("");
	}
}
//商品情報クリア
//flg = 1 :販売商品CD／販売商品カラーCD／販売商品サイズCDはクリアしない。
//flg = 2 :販売商品CD／販売商品カラーCD／販売商品サイズCD/数量はクリアしない。
function clearItemInfo(tdkIndex,itemIndex,flg){
	//$("#tdk"+tdkIndex).find(".itemName"+itemIndex).html("&nbsp;");	//販売商品名
	$("#itemNm1Disp_"+tdkIndex+"_"+itemIndex).html("&nbsp;");	//販売商品名1
	$("#itemNm2Disp_"+tdkIndex+"_"+itemIndex).html("&nbsp;");	//販売商品名2
	
	$("#itemNm1_"+tdkIndex+"_"+itemIndex).val("");					//販売商品名1
	$("#itemNm2_"+tdkIndex+"_"+itemIndex).val("");					//販売商品名2
	$("#itemSaleZeiKTnk_"+tdkIndex+"_"+itemIndex).val("");			//販売価格（税込み）
	$("#itemPresentFlg_"+tdkIndex+"_"+itemIndex).val("0");			//プレゼントフラグ
	$("#itemNebikiTnk_"+tdkIndex+"_"+itemIndex).val("0");			//値引単価
	$("#itemMeisaiKei_"+tdkIndex+"_"+itemIndex).val("").next().html("&nbsp;");	//明細計
	$("#itemMeiZeiTnk_"+tdkIndex+"_"+itemIndex).val("");						//明細税金
	$("#itemZeiTnk_"+tdkIndex+"_"+itemIndex).val("").next().html("&nbsp;");		//消費税
	
	$("#itemOrderMemo_"+tdkIndex+"_"+itemIndex).val("");					//販売商品メモ
	$("#itemOrderMemoDisp_"+tdkIndex+"_"+itemIndex).html("&nbsp;");			//販売商品メモ
	
	$("#itemTransCoKbnNm_"+tdkIndex+"_"+itemIndex).val("");					//配送業者名
	$("#itemTransCoKbnNmDisp_"+tdkIndex+"_"+itemIndex).html("&nbsp;");		//配送業者名
	
	if(flg != 2){
		$("#itemQty_"+tdkIndex+"_"+itemIndex).val("");						//数量
		$("#itemCount_"+tdkIndex+"_"+itemIndex).val("0");					//数量(For Javascript)
	}
	if($("#itemNo_"+tdkIndex+"_"+itemIndex).val() == ""){
		$("#itemQty_"+tdkIndex+"_"+itemIndex).removeAttr("readonly").removeClass("readonly");
	}
	$("#itemMeiZeiTnk_"+tdkIndex+"_"+itemIndex).val("");					//明細計

	$("#itemHikiateFlg_"+tdkIndex+"_"+itemIndex).val("");							//在庫状況
	$("#itemHikiateFlgNm_"+tdkIndex+"_"+itemIndex).val("").next().html("&nbsp;");	//在庫状況
	
	$("#itemWhNm_"+tdkIndex+"_"+itemIndex).val("");								//倉庫名
	$("#itemWhNmDisp_"+tdkIndex+"_"+itemIndex).html("");						//倉庫名

	$("#sagyoCd4_"+tdkIndex+"_"+itemIndex).val("");								//商品作業指示
	$("#sagyoNm_"+tdkIndex+"_"+itemIndex).html("");						//商品作業指示名

	//tableRePainting(tdkIndex,itemIndex);
	
	if(flg > 0){
		return;
	}
	//Clear
	$("#itemNo_"+tdkIndex+"_"+itemIndex).val("");			//商品コード
	$("#itemColorCd_"+tdkIndex+"_"+itemIndex).val("");
	$("#itemSizeCd_"+tdkIndex+"_"+itemIndex).val("");

}
//仮引当 flg = 1 :clear 
function changeKariHikiate(tdkIndex,itemIndex,flg){
	var url = urlBase + "/e_asproOrder/OD010OrdersNew";
	var parms = "processType="+ajaxProcessType;
	parms += "&tdkIndex="+tdkIndex;
	parms += "&itemIndex="+itemIndex;
	if("1" == flg){
		parms += "&ajaxKbn=9"; //仮引当クリア 商品コード変更
	}else{
		parms += "&ajaxKbn=8"; //仮引当
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

//引当結果
function setItemSaleJoutai(retcd,whNm,tdkIndex,itemIndex){
	if(retcd == "90"){
		alert("在庫引当できませんでした。");
		return;
	}
	if(retcd == "CANCEL"){
		return;
	}
	if(retcd == "2"){
		return;
	}
	
	$("#itemNo_"+tdkIndex+"_"+itemIndex).removeAttr("readonly");			//商品コード
	$("#itemColorCd_"+tdkIndex+"_"+itemIndex).removeAttr("readonly");
	$("#itemSizeCd_"+tdkIndex+"_"+itemIndex).removeAttr("readonly");
	$("#itemQty_"+tdkIndex+"_"+itemIndex).removeAttr("readonly");
	$("#btnShowItemSearch_"+tdkIndex+"_"+itemIndex).show();
	$("#itemWhNm_"+tdkIndex+"_"+itemIndex).val(whNm);				//倉庫名
	$("#itemWhNmDisp_"+tdkIndex+"_"+itemIndex).html(whNm);			//倉庫名

	//引当 or 在庫不足
	if(retcd == "0" || retcd == "1"){
		$("#itemHikiateFlg_"+tdkIndex+"_"+itemIndex).val(retcd);			//受注状態
		$("#itemHikiateFlgNm_"+tdkIndex+"_"+itemIndex).val(retcd=="1"?"引当":"在庫不足").next().html(retcd=="1"?"引当":"在庫不足");	//受注状態名
	}
}
//性能の改善(CalcItemInfo -> CalcItemInfo2)
//計算処理(届先) (ItemChange)
function CalcItemInfo2(tdkIndex,tdkQty,tdkShoukei,tdkTax,hikiateFuka,horyu,itemIndex,itemSaleTnk,itemMeiZeiTnk){
	var tdk = $("#tdk"+tdkIndex);
	if(tdk.length == 0){return;}
	//仮引当のみ
	if(arguments.length >= 7){
		//tnkDspKbn 1:税込 2:税抜
		var tnk = ($("#tnkDspKbn").val()=="1"?parseInt(itemSaleTnk,10)+parseInt(itemMeiZeiTnk,10):parseInt(itemSaleTnk,10));				//販売価格 表示用
		if ($("#itemNebikiTnk_"+tdkIndex+"_"+itemIndex).val()!="0") tnk=parseInt(tnk)-parseInt(reComma($("#itemNebikiTnk_"+tdkIndex+"_"+itemIndex).val()));
		if ($("#itemPresentFlg_"+tdkIndex+"_"+itemIndex).val()=="1") tnk=0;
		$("#itemSaleTnk_"+tdkIndex+"_"+itemIndex).val(toComma(itemSaleTnk));		//販売価格 税抜
		$("#itemSaleZeiKTnk_"+tdkIndex+"_"+itemIndex).val(toComma(tnk));			//販売価格 表示用
		$("#itemMeiZeiTnk_"+tdkIndex+"_"+itemIndex).val(toComma(itemMeiZeiTnk));	//消費税
		var zeiTnk = parseInt(itemMeiZeiTnk,10);									//明細税金
		var qty = parseInt(reComma($("#itemQty_"+tdkIndex+"_"+itemIndex).val(),10));		//数量
		//明細計(計算：販売価格＊数量)
		if(!isNaN(tnk) && !isNaN(qty)){
			var zeiktnk = parseInt(itemSaleTnk,10)+parseInt(itemMeiZeiTnk,10);
			$("#itemMeisaiKei_"+tdkIndex+"_"+itemIndex).val(zeiktnk * qty).next().html(toComma(zeiktnk * qty).toString());
		}

		//消費税(計算：受注明細.明細税金＊数量)
		if(!isNaN(qty)){
			$("#itemZeiTnk_"+tdkIndex+"_"+itemIndex).val(zeiTnk * qty).next().html(toComma(zeiTnk * qty).toString());
			//数量(For Javascript)
			$("#itemCount_"+tdkIndex+"_"+itemIndex).val(qty);
		}
	}
	//[届先]商品小計数量（合計）
	$("#tdkItemCount_"+tdkIndex).val(tdkQty);
	//[届先]商品小計金額(税抜)
	$("#tdkSubtotalKin_"+tdkIndex).val(toComma(parseInt(tdkShoukei,10)).toString());
	//[届先]商品小計金額(税込)
	$("#tdkSubtotalZeiKKin_"+tdkIndex).val(toComma(parseInt(tdkShoukei,10)+parseInt(tdkTax,10)).toString());
	//[届先]消費税合計
	$("#tdkTotalZeiKin_"+tdkIndex).val(toComma(parseInt(tdkTax,10)).toString());
	$("#tdkSeikyuuZeiKKin_"+tdkIndex).val(toComma(parseInt(tdkShoukei,10)+parseInt(tdkTax,10)).toString());
	$("#hikiateFukaFlg").val(hikiateFuka);						//引当不可
	$("#horyuKbn").val(horyu);									//保留

	CalcTdkInfo(tdkIndex);
}
function CalcTdkInfo(tdkIndex){
	var tmp						= 0,
		tdkSubtotalKin			= 0,	//[届先]合計商品小計（税抜）
		tdkTotalZeiKin			= 0,	//[届先]合計消費税
		tdkSeikyuuZeiKKin		= 0;	//[届先]請求金額
	var sign = 0;
	//[届先]商品小計金額（税抜き）
	tdkSubtotalKin = parseInt(reComma($("#tdkSubtotalKin_"+tdkIndex).val()),10);
	//[届先]消費税合計
	tdkTotalZeiKin = parseInt(reComma($("#tdkTotalZeiKin_"+tdkIndex).val()),10);
	//請求金額
	tdkSeikyuuZeiKKin = tdkSubtotalKin+tdkTotalZeiKin;
	//可変項目すべて集計
	for (var i=0; i<15; i++){
		tmp = parseInt(reComma($("#tdkTotalKin"+(i+1)+"_"+tdkIndex).val()),10);
		sign = parseInt(reComma($("#tdkTotalKinSign"+(i+1)+"_"+tdkIndex).val()),10);
		tmp = isNaN(tmp)?0:tmp;

		tdkSeikyuuZeiKKin	+= tmp*sign;
	}

	//[届先]請求金額（合計）
	$("#tdkSeikyuuZeiKKin_"+tdkIndex).val(toComma(parseInt(tdkSeikyuuZeiKKin,10)).toString());
	CalcOrderInfo();

}
function CalcOrderInfo(){
	var tmp					= 0,
		orderItemQty		= 0,	//[合計]商品小計数量
		subtotalKin			= 0,	//[合計]商品小計金額(税抜)
		totalZeiKin			= 0,	//[合計]消費税
		seikyuuZeiKKin		= 0,	//[合計]請求金額
		sign 				= 0
	;
	var totalKinArray = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

	var tdkcount1=tdkcnt;
	for (var tdkIndex = 1; tdkIndex<=tdkcount1; tdkIndex++){
		var tdk = $("#tdk"+tdkIndex);
		if(tdk.length == 0)continue;
		var tdkDelFlg = $("#tdkDeleteFlg_"+tdkIndex).val();						//届先削除(登録済)
		if(tdkDelFlg == 1)continue;
		//商品小計数量
		tmp = parseInt($("#tdkItemCount_"+tdkIndex).val(),10);
		orderItemQty += (isNaN(tmp)?0:tmp);
		//商品小計金額(税抜き)
		tmp = parseInt(reComma($("#tdkSubtotalKin_"+tdkIndex).val()),10);
		subtotalKin += (isNaN(tmp)?0:tmp);
		//消費税
		tmp = parseInt(reComma($("#tdkTotalZeiKin_"+tdkIndex).val()),10);
		totalZeiKin += (isNaN(tmp)?0:tmp);
		//請求金額
		tmp = parseInt(reComma($("#tdkSeikyuuZeiKKin_"+tdkIndex).val()),10);
		seikyuuZeiKKin += (isNaN(tmp)?0:tmp);
	}

	$("#orderItemCount").val(toComma(orderItemQty));				//[合計]商品小計数量
	$("#orderSubtotalKin").val(toComma(subtotalKin));				//[合計]商品小計金額(税抜)
	$("#orderSubtotalZeiKKin").val(toComma(subtotalKin+totalZeiKin));				//[合計]商品小計金額(税抜)
	$("#orderTotalZeiKin").val(toComma(totalZeiKin));				//[合計]消費税
	var seikyuu=subtotalKin+totalZeiKin;
	//可変項目すべてセット
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
	$("#orderSeikyuuZeiKKin").val(toComma(seikyuu));				//[合計]請求金額
}
//「キャンセル」変更
function changeItemOrderJokyoKbn(tdkIndex,itemIndex){
	if($("#itemOrderJokyoKbn_"+tdkIndex+"_"+itemIndex).val() == "0"){
		//(キャンセル -> 通常)
		$("#itemQty_"+tdkIndex+"_"+itemIndex).val("");								//数量
		$("#itemMeisaiKei_"+tdkIndex+"_"+itemIndex).val("").next().html("&nbsp;");	//明細計
		$("#itemZeiTnk_"+tdkIndex+"_"+itemIndex).val("").next().html("&nbsp;");		//消費税
		$("#itemHikiateFlg_"+tdkIndex+"_"+itemIndex).val("");							//受注状態
		$("#itemHikiateFlgNm_"+tdkIndex+"_"+itemIndex).val("").next().html("&nbsp;");	//受注状態
		
		$("#itemNo_"+tdkIndex+"_"+itemIndex).removeAttr("readonly");			//商品コード
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
		//(通常 -> キャンセル)
		//仮引当
		changeKariHikiate(tdkIndex,itemIndex,1);
		//作業
		$("#itemSagyoCd_"+tdkIndex+"_"+itemIndex).attr("readonly","readonly").addClass("readonly");
		//作業
		$("#itemSagyoNm_"+tdkIndex+"_"+itemIndex).attr("readonly","readonly").addClass("readonly");

		$("#itemNo_"+tdkIndex+"_"+itemIndex).attr("readonly","readonly").addClass("readonly");			//商品コード
		$("#itemColorCd_"+tdkIndex+"_"+itemIndex).attr("readonly","readonly").addClass("readonly");
		$("#itemSizeCd_"+tdkIndex+"_"+itemIndex).attr("readonly","readonly").addClass("readonly");
		$("#itemQty_"+tdkIndex+"_"+itemIndex).attr("readonly","readonly").addClass("readonly");
		$("#btnShowItemSearch_"+tdkIndex+"_"+itemIndex).hide();
		$("#btnShowItemInfo_"+tdkIndex+"_"+itemIndex).hide();
	}
	
}
//発送手数料計算
function getSoryo(){
	if($("#orderYmd").val() == ""){
		$("#orderYmd").css("background-color","#ffcccc");
		alert("注文日は必須です。");
		return;
	}else if(!_chkDate($("#orderYmd").val())){
		$("#orderYmd").css("background-color","#ffcccc");
		alert("注文日は実際に存在する日付を入力して下さい。");
		return;
	}
	if($("#kessaiCd").val() == ""){
		$("#kessaiCdSelect").css("background-color","#ffcccc");
		alert(msgSouryou);
		return;
	}
	if($("#siteCd").val() == ""){
		$("#siteCd").css("background-color","#ffcccc");
		alert("サイト名は必須です。");
		return;
	}
	//郵便番号チェック
	var arrtdkIndex=document.getElementsByName('tdkIndex');
	var tdkcount1=arrtdkIndex.length;
	var koZip1 = $("#kokyakuZip1").val();
	var koZip2 = $("#kokyakuZip2").val();
	for (var tdkIndex = 0; tdkIndex<tdkcount1; tdkIndex++){
		//var tdk = $("#tdk"+tdkIndex);
		var tdk = $("#tdk"+arrtdkIndex[tdkIndex].value);
		if(tdk.length == 0)continue;
		var tdkDelFlg = tdk.find("[name=tdkDeleteFlg]").val();						//届先削除(登録済)
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
				alert("注文者の郵便番号を入力してください。");
				return;
			}
		}else if (!tdkZip1 || !tdkZip2){
			if (!tdkZip1) tdk.find("[name=tdkZip1]").css("background-color","#ffcccc");
			if (!tdkZip2) tdk.find("[name=tdkZip2]").css("background-color","#ffcccc");
			alert((tdkIndex+1)+"件目の届け先の郵便番号を入力してください。");
			return;
		}
	}
	$("#btnSubmit").attr("disabled","disabled");
	$("#btnSubmitFlg").val("0");

	var orderYmd = $("#orderYmd").val().substring(0,4) + $("#orderYmd").val().substring(5,7) + $("#orderYmd").val().substring(8,10)+$("#orderHh").val()+$("#orderMi").val();
	var kokyakuBirth = $("#kokyakuBirth").val().substring(0,4) + $("#kokyakuBirth").val().substring(5,7) + $("#kokyakuBirth").val().substring(8,10);

	//プレゼントリセット
	var itemMax = parseInt($("#itemCnt_1").val(),10)+1;
	//既存のプレゼントを削除
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
	parms += "&ajaxKbn=10"; //発送手数料計算
	parms += "&binsyuCd="+$("#binsyuCd").val();
	for (var tdkIndex = 0;tdkIndex<tdkcount1;tdkIndex++){
		
		var tdk = $("#tdk"+arrtdkIndex[tdkIndex].value);
		if(tdk.length == 0)continue;
		var tdkDelFlg = tdk.find("[name=tdkDeleteFlg]").val();						//届先削除(登録済)
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
	//可変合計の合計(送料、手数料、キャンペーン値引以外＋消費税合計
	for (var i=1; i<=15; i++){
		if (("orderTotalKin"+i) != kinTypeSoryo && ("orderTotalKin"+i) != kinTypeDaibiki && ("orderTotalKin"+i) != kinTypeHaraikomi && ("orderTotalKin"+i) != kinTypeCampaign) {
			var kahenTxt = reComma($("#orderTotalKin"+i).val());
			var kahenSign = reComma($("#orderTotalKinSign"+i).val());
			kahen += parseInt((kahenTxt==""?"0":kahenTxt),10) * parseInt((kahenSign==""?"1":kahenSign),10);
		}
	}
	//消費税合計を加算
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
//発送手数料 代引手数料 クール手数料 キャンペーン値引額
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
		alert("該当の郵便番号がありません。");

	}else if(retCd =="20"){
		$("#orderYmd").css("background-color","#ffcccc");
		$("#btnSubmit").attr("disabled","disabled");
		$("#btnSubmitFlg").val("0");
		alert("注文日は実際に存在する日付を入力して下さい。");

	}else if(retCd =="30"){
		$("#itemNo_1_1").css("background-color","#ffcccc");
		$("#itemQty_1_1").css("background-color","#ffcccc");
		$("#btnSubmit").attr("disabled","disabled");
		$("#btnSubmitFlg").val("0");
		alert("明細を入力してください。");
		
	}else if(retCd =="90"){
		alert("入力値が不正なため処理を続行できませんでした。生年月日などの入力値をご確認ください。");
		$("#btnSubmit").attr("disabled","disabled");
		$("#btnSubmitFlg").val("0");
	}else{
		$("#btnSubmit").attr("disabled","disabled");
		$("#btnSubmitFlg").val("0");
	}
}
//商品検索ボタン押下
function showItemSearch(tdkIndexAndItemIndex){
	var _searchWin;
	var url= urlBase+"/e_asproLogin/CC021SearchProduct";
	url += "?callsSrciptFuncName=setProductCd";
	url += "&index="+tdkIndexAndItemIndex;
	url += "&strToolbarX=110";
	_searchWin = window.open(url,"CC021","width=680,height=500,menubar=no,location=no,status=yes,resizable=yes,scrollbars=yes");
	_searchWin.focus();
}
//商品検索ボタン押下 結果
function setProductCd(cd,color,size,itemNm,std_zei_k_tnk,sale_zei_k_tnk,tdkIndexAndItemIndex){
	var tdkIndex = tdkIndexAndItemIndex.split(",")[0];
	var itemIndex = tdkIndexAndItemIndex.split(",")[1];
	
	$("#itemNo_"+tdkIndex+"_"+itemIndex).val(cd);
	$("#itemColorCd_"+tdkIndex+"_"+itemIndex).val(color);
	$("#itemSizeCd_"+tdkIndex+"_"+itemIndex).val(size);
	getItemInfo(tdkIndex,itemIndex);
}
//届け先チェック時
function setTdkFlg(obj,tdkIndex){
	$("#tdkFlg_"+tdkIndex).val((obj.checked)?"1":"0");
	$("#tdkZip1_"+tdkIndex).css("background-color","");
	$("#tdkZip2_"+tdkIndex).css("background-color","");
	getMea138WhCd(tdkIndex);
}
//局留めチェック時
function setTomeFlg(obj,tdkIndex){
	$("#tomeFlg_"+tdkIndex).val((obj.checked)?"1":"0");
		//受取郵便局リセット
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
//届先追加
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

	//カナ自動入力
	var auto_kana_add2 = new AutoKana('tdkNm1_'+tdkcnt, 'tdkKana1_'+tdkcnt, {katakana:true, toggle:false});
	var auto_kana_add2 = new AutoKana('tdkNm2_'+tdkcnt, 'tdkKana2_'+tdkcnt, {katakana:true, toggle:false});

	var itemCnt = tdk.find("input[name=itemCnt]");
	itemCnt.attr("id","itemCnt_" + tdkcnt);
	
	addItemRows('#tdk'+ tdkcnt,5);
	tdk.show();
	tdkcnt++;
	
	var colorful = new ColorfulInput;
	colorful.set();
	
	//禁則文字チェック
	_InputInit();

	$('#tdkCnt').val(tdkcnt-1);
	$$("goukeiArea").style.display = "block";
}
//届先ごとの方面別倉庫設定
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

		//引当処理
		var items = $("#itemInfo_"+index);
		var itemMax = parseInt($("#itemCnt_"+index).val(),10)+1;
		for (var i = 1; i<itemMax; i++){
			//仮引当 再計算
			if ($("#itemNo_"+index+"_"+i).val() == "" || $("#itemQty_"+index+"_"+i).val() == "") {
			}else{
				changeKariHikiate(index,i);
			}
		}
	}
}

//5行追加
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
	
	//禁則文字チェック
	_InputInit();
}

//届先削除
function FuncRemoveTdkInfo(tdkid,msg){
	if(confirm(msg)){
		changeKariHikiate($("#"+tdkid).find("[name=tdkIndex]").val(),"",1);	//仮引当
		$("#"+tdkid).remove();
		$('#tdkCnt').val(parseInt($('#tdkCnt').val(),10)-1);
		if ($('#tdkCnt').val() == "1") {
			$$("goukeiArea").style.display = "none";
		}
		//計算処理
		CalcOrderInfo();
	}
}
//届先削除(登録済)
function FuncRemoveOrderTdkInfo(tdkid,msg){
	if(confirm(msg)){
		changeKariHikiate($("#"+tdkid).find("[name=tdkIndex]").val(),"",1);	//仮引当
		$("#"+tdkid).find("[name=tdkDeleteFlg]").val("1");
		$("#"+tdkid).hide();
		//計算処理
		CalcOrderInfo();
	}
}
