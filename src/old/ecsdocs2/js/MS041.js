		//タブ切換え
		function change1(num){
			for (var tabNo = 1; tabNo <= intTabCnt; tabNo++){
				if (tabNo == num){
					document.all["div"+tabNo].style.display = 'block';
				}else{
					document.all["div"+tabNo].style.display = 'none';
				}
			}
		}
		
		//（共通画面のオプション）行追加
		function addRow(){
			var row = document.all("tempTable").rows[0].cloneNode(true);
			var idx = document.all("itemTable").rows.length;
			document.all("itemTable").children[0].appendChild(row);
			var index = idx-1;
			$$("_row_0").value =parseInt($$("_row_0").value) +1
			var _rowNo =$$("_row_0").value; 
			row.children[0].children[0].id="_option_nm_list_"+_rowNo;
			row.children[0].children[1].id="_opt_memo_"+_rowNo;
			row.children[0].children[1].value=0;
			row.children[0].children[2].id="_opt_no_h_"+_rowNo;
			row.children[0].children[2].value=idx;
			row.children[0].children[3].id="_kmk_no_h_"+_rowNo;
			row.children[0].children[4].id="_kmk_cnt_"+_rowNo;
			row.children[0].children[5].id="btn1_"+_rowNo;
			row.children[1].children[0].id="_kamoku_nm_list_"+_rowNo;
			row.children[1].children[1].id="_opt_no_m_"+_rowNo;
			row.children[1].children[1].value=idx;
			row.children[1].children[2].id="_kmk_no_m_"+_rowNo;
			row.children[1].children[3].id="btn2_"+_rowNo;
			row.children[1].children[4].id="addArea_"+_rowNo;
		}
		//項目追加処理
		function addItem(_obj){
			var objNm = _obj.id;
			var idx = objNm.replace("btn2_","");
			var objspan = document.getElementById('addArea_'+idx);
			var _idx = document.getElementById('_itemCnt').value;
			var _cnt = parseInt(_idx) +1;
			document.getElementById('_itemCnt').value = _cnt;
			objspan.innerHTML = objspan.innerHTML + 
				"<br id='tag_"+_cnt+"'><input type='text' value='' name='inKamokuNmList' id='_kamoku_nm_list_"+_cnt+"' size='25' maxlength='32' class='multi'>"+
				"<input type='hidden' name='hidOptNoM' value='"+(parseInt(idx)+1)+"' id='_opt_no_m_"+_cnt+"'>"+
				"<input type='hidden' name='hidKmkNoM' value='"+_cnt+"' id='_kmk_no_m_"+_cnt+"'>"+
				"<input type='button' value='削   除' onClick='delItem(this,"+idx+");' id='btn3_"+_cnt+"' style='margin-left: 14px;'>";

		}
		//行削除処理
		function removeRow(_obj){
			var idx = _obj.id.slice(5);
			var objTr = _obj.parentNode.parentNode;
			objTr.parentNode.deleteRow(objTr.sectionRowIndex);
		}
		//テキストボックス削除処理
		function delItem(_obj,_num){
		var _name1 = _obj.id;
		var delIdx = _name1.replace("btn3_","");
			var idx = _obj.id.slice(5);
			var objspan = $$("addArea_"+_num);
			var delbox = $$("_kamoku_nm_list_"+delIdx);
			var delbtn = $$("btn3_"+delIdx);
			var deltag = $$("tag_"+delIdx);
			var delhid1 = $$("_opt_no_m_"+delIdx);
			var delhid2 = $$("_kmk_no_m_"+delIdx);
			objspan.removeChild(delbox);
			objspan.removeChild(delbtn);
			objspan.removeChild(deltag);
			objspan.removeChild(delhid1);
			objspan.removeChild(delhid2);
		}
		function setValUse(_val,_kbn,_idx){
			if(_kbn =="c"){
				if($$("cBox_"+_idx).checked){
					$$("cUseFlg"+_idx).value = "1";
				}else{
					$$("cUseFlg"+_idx).value = "0";
				}
				//alert($$("cUseFlg"+_idx).value);
			}else{
				if($$("sBox_"+_idx).checked){
					$$("sUseFlg"+_idx).value = "1";
				}else{
					$$("sUseFlg"+_idx).value = "0";
				}
				//alert($$("sUseFlg"+_idx).value);
			}
		}
		
		function getItemPict(_fromId2,_idx,_pictNm,_site){
			var _dirId = "";
			var name1="";
			var objspan = document.getElementById(_fromId2);
			if(_site=="3"){
				_dirId=$$("c_path"+(parseInt(_idx)+1)).value;
			}else if(_site=="1"){
				name1=objspan.id.replace("r_method","");
				_dirId=$$("r_path"+name1).value;
			}else if(_site=="2"){
				name1=objspan.id.replace("y_method","");
				_dirId=$$("yy_path"+name1).value;
			}else if(_site=="0"){
				name1=objspan.id.replace("ec_method","");
				_dirId=$$("ec_path"+name1).value;
			}

			//画像セットファンクションを呼出し
			if(_pictNm==null||_pictNm==""){
				return false;
			}else{
				setItemPict(_pictNm,"","",_fromId2,_idx,"",_dirId,_site);
				return;
			}
		}
		///商品画像選択ｻﾌﾞｳｨﾝﾄﾞｳからの戻り
		function setItemPict(_pictNm,_pictPath,_fromId1,_fromId2,_idx,_kbn,_dirId,_site){
			var objspan = document.getElementById(_fromId2);
			var pictPath = $$("pictPath").value;
			pictPath = pictPath.replace(/\\/g,"/");
			//画像イメージリンクを追加
			if(_site=="0"){
				var name1= objspan.id.replace("ec_method","");
				var objBtn = $$("ec_btn"+name1);
				if ($$("ec_file"+name1).value!="") {
					//EC
					//削除してから追加
					var num = objspan.childNodes.length;
					var num2 = objBtn.childNodes.length;
					for(var i = 0; i < num; i++){
						objspan.removeChild(objspan.firstChild);
					}		
					for(var i = 0; i < num2; i++){
						objBtn.removeChild(objBtn.firstChild);
					}
					objspan.innerHTML = "<img src='"+docRoot+"/"+pictPath+_dirId+"/"+_pictNm+"' width='100' height='100'>";
					objBtn.innerHTML = "<input type='button' value='解　除' onClick='fileKaijo("+_fromId2+","+_idx+",0)' id='ec_btn"+_idx+"'>";
					$$("ec_path"+name1).value=_dirId;
					$$("ec_file"+name1).value=_pictNm;
				}else{
					objspan.innerHTML = "<img src='"+docRoot+"/"+pictPath+_dirId+"/"+_pictNm+"' width='100' height='100'>";
					objBtn.innerHTML = "<input type='button' value='解　除' onClick='fileKaijo("+_fromId2+","+_idx+",0)' id='ec_btn"+_idx+"'>";
					$$("ec_path"+name1).value=_dirId;
					$$("ec_file"+name1).value=_pictNm;
				}
			}else if (_site =="3"){
				var name1= objspan.id.replace("c_method","");
				var objBtn = $$("c_btn"+name1);
				if ($$("c_file"+name1).value!="") {
					//共通
					//削除してから追加
					var num = objspan.childNodes.length;
					var num2 = objBtn.childNodes.length;
					for(var i = 0; i < num; i++){
						objspan.removeChild(objspan.firstChild);
					}		
					for(var i = 0; i < num2; i++){
						objBtn.removeChild(objBtn.firstChild);
					}
					//objspan.innerHTML = "<img src='"+docRoot+"/<%=bean.getcPictPath()%>/"+_dirId+"/"+_pictNm+"' width='100' height='100'>";
					objspan.innerHTML = "<img src='"+docRoot+"/"+pictPath+_dirId+"/"+_pictNm+"' width='100' height='100'>";
					//alert(objspan.innerHTML);
					objBtn.innerHTML = "<input type='button' value='解　除' onClick='fileKaijo("+_fromId2+","+_idx+",3)' id='c_btn"+_idx+"'>";
					$$("c_path"+name1).value=_dirId;
					$$("c_file"+name1).value=_pictNm;
				}else{
					objspan.innerHTML = "<img src='"+docRoot+"/"+pictPath+_dirId+"/"+_pictNm+"' width='100' height='100'>";
					objBtn.innerHTML = "<input type='button' value='解　除' onClick='fileKaijo("+_fromId2+","+_idx+",3)' id='c_btn"+_idx+"'>";
					$$("c_path"+name1).value=_dirId;
					$$("c_file"+name1).value=_pictNm;
				}
			}else if (_site =="1"){
				var name1= objspan.id.replace("r_method","");
				var siteIdx = name1[1];
				var objBtn = $$("r_btn"+name1);
				if ($$("r_file"+name1).value!="") {
				//楽天
					var num = objspan.childNodes.length;
					var num2 = objBtn.childNodes.length;
					for(var i = 0; i < num; i++){
						objspan.removeChild(objspan.firstChild);
					}	
					for(var i = 0; i < num2; i++){
						objBtn.removeChild(objBtn.firstChild);
					}
					//objspan.innerHTML = "<img src='"+docRoot+"/<%=bean.getcPictPath()%>/"+_dirId+"/"+_pictNm+"' width='100' height='100'>";
					objspan.innerHTML = "<img src='"+docRoot+"/"+pictPath+_dirId+"/"+_pictNm+"' width='100' height='100'>";
					objBtn.innerHTML = "<input type='button' value='解　除' onClick='fileKaijo("+_fromId2+","+_idx+",1)' id='r_btn"+_idx+siteIdx+"'>";
					//alert(objspan.innerHTML);
					$$("r_path"+name1).value=_dirId;
					$$("r_file"+name1).value=_pictNm;
				}else{
					objspan.innerHTML = "<img src='"+docRoot+"/"+pictPath+_dirId+"/"+_pictNm+"' width='100' height='100'>";
					objBtn.innerHTML = "<input type='button' value='解　除' onClick='fileKaijo("+_fromId2+","+_idx+",1)' id='r_btn"+_idx+siteIdx+"'>";
					$$("r_path"+name1).value=_dirId;
					$$("r_file"+name1).value=_pictNm;
				}
			}else if (_site =="2"){
				var name1= objspan.id.replace("y_method","");
				var siteIdx = name1[1];
				var objBtn = $$("y_btn"+name1);
				if (_idx =="0") {
					//Yahoo
					var num = objspan.childNodes.length;
					var num2 = objBtn.childNodes.length;
					for(var i = 0; i < num; i++){
						objspan.removeChild(objspan.firstChild);
					}
					for(var i = 0; i < num2; i++){
						objBtn.removeChild(objBtn.firstChild);
					}
					//objspan.innerHTML = "<img src='"+docRoot+"/<%=bean.getcPictPath()%>/"+_dirId+"/"+_pictNm+"' width='100' height='100'>";
					objspan.innerHTML = "<img src='"+docRoot+"/"+pictPath+_dirId+"/"+_pictNm+"' width='100' height='100'>";
					objBtn.innerHTML = "<input type='button' value='解　除' onClick='fileKaijo("+_fromId2+","+_idx+",2)' id='y_btn"+_idx+siteIdx+"'>";
					$$("yy_path"+name1).value=_dirId;
					$$("y_file"+name1).value=_pictNm;
				}else if (_idx !="0") {
					//Yahoo
					var num = objspan.childNodes.length;
					var num2 = objBtn.childNodes.length;
					for(var i = 0; i < num; i++){
						objspan.removeChild(objspan.firstChild);
					}	
					for(var i = 0; i < num2; i++){
						objBtn.removeChild(objBtn.firstChild);
					}
					//objspan.innerHTML = "<img src='"+docRoot+"/<%=bean.getcPictPath()%>/"+_dirId+"/"+_pictNm+"' width='100' height='100'>";
					objspan.innerHTML = "<img src='"+docRoot+"/"+pictPath+_dirId+"/"+_pictNm+"' width='100' height='100'>";
					objBtn.innerHTML = 	"<input type='button' value='解　除' onClick='fileKaijo("+_fromId2+","+_idx+",2)' id='y_btn"+_idx+siteIdx+"'>";
					$$("yy_path"+name1).value=_dirId;
					$$("y_file"+name1).value=_pictNm;
				}else{
					var num = objspan.childNodes.length;
					var num2 = objBtn.childNodes.length;
					for(var i = 0; i < num; i++){
						objspan.removeChild(objspan.firstChild);
					}	
					for(var i = 0; i < num2; i++){
						objBtn.removeChild(objBtn.firstChild);
					}
					//objspan.innerHTML = "<img src='"+docRoot+"/<%=bean.getcPictPath()%>/"+_dirId+"/"+_pictNm+"' width='100' height='100'>";
					objspan.innerHTML = "<img src='"+docRoot+"/"+pictPath+_dirId+"/"+_pictNm+"' width='100' height='100'>";
					objBtn.innerHTML = objspan.innerHTML + "<input type='button' value='解　除' onClick='fileKaijo("+_fromId2+","+_idx+",2)' id='y_btn"+_idx+siteIdx+"'>";
					$$("yy_path"+name1).value=_dirId;
					$$("y_file"+name1).value=_pictNm;
				}
			}
		}
		function fileKaijo(_fromId,_idx,_kbn){
			var objspan = document.getElementById(_fromId);
			if(_kbn =="0"){
				//EC
				var name1= _fromId.id.replace("ec_method","");
				var objBtn = $$("ec_btn"+name1);
				var num = _fromId.childNodes.length;
				var num2 = objBtn.childNodes.length;
				for(var i = 0; i < num; i++){
					_fromId.removeChild(_fromId.firstChild);
				}
				for(var i = 0; i < num2; i++){
					objBtn.removeChild(objBtn.firstChild);
				}
				$$("ec_path"+name1).value="";
				$$("ec_file"+name1).value="";
			}else if(_kbn =="3"){
				//共通
				var name1= _fromId.id.replace("c_method","");
				var objBtn = $$("c_btn"+name1);
				var num = _fromId.childNodes.length;
				var num2 = objBtn.childNodes.length;
				for(var i = 0; i < num; i++){
					_fromId.removeChild(_fromId.firstChild);
				}
				for(var i = 0; i < num2; i++){
					objBtn.removeChild(objBtn.firstChild);
				}
				$$("c_path"+name1).value="";
				$$("c_file"+name1).value="";
				$$("c_memo"+name1).value="";
			}else if (_kbn =="1"){
				//楽天
				var name1= _fromId.id.replace("r_method","");
				var objBtn = $$("r_btn"+name1);
				var num = _fromId.childNodes.length;
				var num2 = objBtn.childNodes.length;
				for(var i = 0; i < num; i++){
					_fromId.removeChild(_fromId.firstChild);
				}
				for(var i = 0; i < num2; i++){
					objBtn.removeChild(objBtn.firstChild);
				}
				$$("r_path"+name1).value="";
				$$("r_file"+name1).value="";
				$$("r_memo"+name1).value="";
			}else if (_kbn =="2"){
				//Yahoo
				var name1= _fromId.id.replace("y_method","");
				var objBtn = $$("y_btn"+name1);
				var num = _fromId.childNodes.length;
				var num2 = objBtn.childNodes.length;
				for(var i = 0; i < num; i++){
					_fromId.removeChild(_fromId.firstChild);
				}
				for(var i = 0; i < num2; i++){
					objBtn.removeChild(objBtn.firstChild);
				}
				$$("yy_path"+name1).value="";
				$$("y_file"+name1).value="";
				if(_idx == "0"){
				}else{
				}
			}
		}
		//ブランドコード検索ウィンドウ戻り
		function setSearchYBrand(_brandCd,_formId){
			document.getElementById("brandCd_").value = _brandCd;
		}
		//おすすすめ_カート内検索ウィンドウ
		function SearchYItem(itemNoId,itemNmId){
			var url= urBase+"/e_asproLogin/CC038SearchYItem?callsSrciptFuncName=setSearchYItem&index=0"+"&formId1="+itemNoId+"&formId2="+itemNmId;
			_searchWin = window.open(url,"CC038","width=620,height=700,menubar=no,location=no,status=yes,resizable=yes,scrollbars=yes");
			_searchWin.focus();
		}
		//おすすすめ_カート内検索ウィンドウ戻り
		function setSearchYItem(_itemCd,_itemNm,_formId1,_formId2,_idx){
			document.getElementById(_formId1).value = _itemCd;
			document.getElementById(_formId2).value = _itemNm;
		}
		//ショップ別設定検索ウィンドウ
		function SearchDirProduct(vThis,_kbn){
			if (_kbn == "0"){
				var formId = "js_directoryId";
				var url= urBase+"/e_asproLogin/CC039SearchDirProduct?callsSrciptFuncName=setSearchDirProduct&index=&formId="+formId+"&kbn="+_kbn;
				_searchWin = window.open(url,"CC039","width=650,height=720,menubar=no,location=no,status=yes,resizable=yes,scrollbars=yes");
				_searchWin.focus();
			}else{
				var formId = "js_productCategory";
				var url= urBase+"/e_asproLogin/CC039SearchDirProduct?callsSrciptFuncName=setSearchDirProduct&index=&formId="+formId+"&kbn="+_kbn;
				_searchWin = window.open(url,"CC039","width=650,height=720,menubar=no,location=no,status=yes,resizable=yes,scrollbars=yes");
				_searchWin.focus();
			}
		}
		//ショップ別設定検索ウィンドウ戻り
		function setSearchDirProduct(_rtnId,_formId,_kbn){
			document.getElementById(_formId+"").value = _rtnId;
		}
		//在庫設定制御
		function setOnOff(_flg){
			if(_flg == "0"){
				$$("_koumoku_nm1").disabled=true;
				$$("_koumoku_nm2").disabled=true;
				$$("_koumoku_nm1").value="";
				$$("_koumoku_nm2").value="";
				
				$("select[name=rKoumokuZaikoFlg]").val("").attr("disabled", true);
			}else{
				$$("_koumoku_nm1").disabled=false;
				$$("_koumoku_nm2").disabled=false;

				$("select[name=rKoumokuZaikoFlg]").removeAttr("disabled");
			}
		}

		//ラジオボタンのクリア(楽天送料)
		function clearRb(_kbn){
			if (_kbn == "1"){
				var num = document.Form.rSoryoFlg.length;
				for(i=0;i<num;i++){
					document.Form.rSoryoFlg[i].checked=false;
				}
			}else if (_kbn == "2"){
				var num = document.Form.yZeiKbn.length;
				for(i=0;i<num;i++){
					document.Form.yZeiKbn[i].checked=false;
				}
			}else if (_kbn == "3"){
				var num = document.Form.ySoryoFlg.length;
				for(i=0;i<num;i++){
					document.Form.ySoryoFlg[i].checked=false;
				}
			}
		}
		//個別送料の入力制限
		function setOnOff2(){
		var _send1 = $$("_sendFlg1");
		var _send2 = $$("_sendFlg2");
		var _rsend1 = $$("_rSoryoFlg1");
		var _rsend2 = $$("_rSoryoFlg2");
		if (_rsend1.checked==false &&_rsend2.checked==false){
			if (_send1.checked==true&&_send2.checked==false){
				$$("_rSendFee").disabled=false;
			}else if(_send1.checked==false&&_send2.checked==true){
				$$("_rSendFee").disabled=true;
				$$("_rSendFee").value="";
			}
		}else{
			if (_send1.checked==true&& _send2.checked==false){
				if (_rsend1.checked==true&&_rsend2.checked==false){
					$$("_rSendFee").disabled=false;
				}else if(_rsend1.checked==false&&_rsend2.checked==true){
					$$("_rSendFee").disabled=true;
					$$("_rSendFee").value="";
				}
				}else if (_send1.checked==false&&_send2.checked==true){
					if (_rsend1.checked==true&&_rsend2.checked==false){
						$$("_rSendFee").disabled=false;
					}else if(_rsend1.checked==false&&_rsend2.checked==true){
						$$("_rSendFee").disabled=true;
						$$("_rSendFee").value="";
					}
				}
			}
			return;
		}
		//半角カタカナ入力チェック　選択肢項目1情報
		function hankanachkColor(text,gyo){
			if ( text.match(/[ｱ-ﾝﾞﾟ]+/) ){
			alert('選択肢項目1情報：' + gyo+ '行目：半角カタカナが入力されています');
			$$("in_color_cd_nam_list_"+gyo).focus();
			return;
			}
		}
		//半角カタカナ入力チェック　選択肢項目2情報
		function hankanachkSize(text,gyo){
			if ( text.match(/[ｱ-ﾝﾞﾟ]+/) ){
			alert('選択肢項目2情報：' + gyo+ '行目：半角カタカナが入力されています');
			$$("in_size_cd_nam_list_"+gyo).focus();
			return;
			}
		}
		//
		function setRValue(strNm){
			obj =document.getElementsByName(strNm);
			for (i=0; i<obj.length; i++){
				if (obj[i].checked == true){
					$$("js_"+strNm).value = obj[i].value;
					//alert(obj[i].value);
					return;
				}
			}
		}
		function setChkValue(chkNm){
			obj = $$(chkNm);
			if (obj.checked == true){
				$$("js_"+obj.id).value = obj.value;
			}else{
				$$("js_"+obj.id).value ="";
			}
			//alert($$("js_"+obj.id).value);
		}

		//Ajaxの戻り値をセット
		function setCate_list(str,kbn){
			$$("cate"+kbn).innerHTML=str;
		}
		//スペック値 Ajax
		//ブランドコード検索ウィンドウ
		function SearchYBrand(vThis){
			var formId = "brandCd_";
			var url= urBase+"/e_asproLogin/CC041SearchYBrand?callsSrciptFuncName=setSearchYBrand&index=&formId="+formId;
			_searchWin = window.open(url,"CC041","width=720,height=700,menubar=no,location=no,status=yes,resizable=yes,scrollbars=yes");
			_searchWin.focus();
		}

		//商品画像選択ｻﾌﾞｳｨﾝﾄﾞｳ
		function searchItemPicture(_form_id1,_form_id2,_idx,_kbn,_site){
			var formId1 = _form_id1;
			var formId2 = _form_id2;
			var url= urBase+"/e_asproLogin/CC040SearchItemPicture?callsSrciptFuncName=setItemPict&formId1="+formId1+"&formId2="+formId2+
				"&index="+_idx+"&kbn="+_kbn+"&site_kbn="+_site;
			_searchWin = window.open(url,"CC040","width=720,height=700,menubar=no,location=no,status=yes,resizable=yes,scrollbars=yes");
			_searchWin.focus();
		}
		//最大購入数入力制御
		function rimitOrderNumCon(value,numId){
			if(value == "1"){
				document.getElementById(numId).readOnly = "";
			}else{
				document.getElementById(numId).readOnly = "readonly";
				document.getElementById(numId).value="";
			}
		}
		//日付チェック
		function chkDate(dateNum){
			var id = "date_" + dateNum;
			var strDate = $$("sale_term_from").value;
			if(!_chkDate(strDate)){
				return;
			}
		}
		//時間入力の0埋め処理
		function chkTime(_obj){
			if (_obj.value !== '') {
				var _time = _obj.value;
				var _result = ("00" + _time).slice(-2);
				_obj.value = _result;
			}
		}
		
		//表示先カテゴリCD Ajax
		function getCateItem(cateSetvalue,cateId,siteCd){
			var url = urBase+"/e_asproMaster/MS041MallItemEntry";
			var parms = "processType="+pageAjax;
				parms = parms+"&ajaxKbn=cate";
				parms = parms+"&coNo="+coNo;
				parms = parms+"&setNo="+cateSetvalue;
				parms = parms+"&cateId="+cateId;
				parms = parms+"&siteCd="+siteCd;
				ExecuteAjax(url,parms);
		}
		//お勧め商品/カート内関連商品 Ajax
		//function getItemNm(_val,_idx,_kbn,_itemNoId,_itemNmId){
		//	if( _val ==""){
		//		$$(_itemNmId).value = "";
		//		//alert($$(itemNmId).value);
		//		return;
		//	}
		//	var url = urBase+"/e_asproMaster/MS041MallItemEntry";
		//	var parms = "processType="+pageAjax;
		//		parms = parms+"&ajaxKbn=item";
		//		parms = parms+"&coNo="+ coNo;
		//		parms = parms+"&itemNo="+_val;
		//		parms = parms+"&itemNoId="+_itemNoId;
		//		parms = parms+"&itemNmId="+_itemNmId;
		//		parms = parms+"&index="+_idx;
		//		parms = parms+"&kbn="+_kbn;
		//		//alert(parms);
		//		ExecuteAjax(url,parms);
		//}
		//スペック項目 Ajax
		function getSpecItemList(_val){
			//スペック値初期化
			var url = urBase+"/e_asproMaster/MS041MallItemEntry";
			var parms = "processType="+ pageAjax;
				parms = parms+"&ajaxKbn=spec_koumoku";
				parms = parms+"&coNo="+ coNo;
				parms = parms+"&pro_cate="+_val;
				parms = parms+"&koumokuId=js_ySpecKoumoku";
				parms = parms+"&koumokuValId=js_ySpecVal";
				parms = parms+"&siteCnt="+siteCnt;
				ExecuteAjax(url,parms);
		}
		function getSpec_item(spec,sItemId){
			//スペック値初期化
			var specList = $$(sItemId);
			var proCate = $$("js_productCategory").value;
			for(i = specList.length; i> 0; i--){ 
				specList.remove(i);
			}
			if( proCate ==""){
				return;
			}
			var url = urBase+"/e_asproMaster/MS041MallItemEntry";
			var parms = "processType="+pageAjax;
				parms = parms+"&ajaxKbn=spec";
				parms = parms+"&coNo="+ coNo;
				parms = parms+"&pro_cate="+proCate;
				parms = parms+"&spec="+spec;
				parms = parms+"&sItemId="+sItemId;
				ExecuteAjax(url,parms);
		}
		//ポイント倍率 Ajax
		function getPointItem(pointKbn,pointValId){
			var url = urBase+"/e_asproMaster/MS041MallItemEntry";
			var parms = "processType="+pageAjax;
				parms = parms+"&ajaxKbn=point";
				parms = parms+"&point_kbn="+pointKbn;
				parms = parms+"&pointValId="+pointValId;
				ExecuteAjax(url,parms);
		}

		function chgLabel(label,text){
			$$("id_label_"+label).innerText = text; 
		}
		