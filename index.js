//index.js
var publickey = RSAUtils.getKeyPair("10001","","a8a02b821d52d3d0ca90620c78474b78435423be99da83cc190ab5cb5b9b922a4c8ba6b251e78429757cf11cde119e1eacff46fa3bf3b43ef68ceb29897b7aa6b5b1359fef6f35f32b748dc109fd3d09f3443a2cc3b73e99579f3d0fe6a96ccf6a48bc40056a6cac327d309b93b1d61d6f6e8f4a42fc9540f34f1c4a2e053445");
var logFlag = false;
//璁剧疆鐧诲綍鍑芥暟
$(document).ready(function(){
	//鍏憡
	$('#DialogNote').dialog({
		modal:true,
		title:'涓崡澶у涓婄綉娉ㄦ剰浜嬮」',
		iconCls:'icon-help',
		buttons:[
		    {
				text:'纭�  璁� ',
				handler:function()
				{
					$('#DialogNote').dialog('close');
				}
			}]
		});
	//鑾峰彇鍏憡鍐呭
	$.get('gonggao/usingNote.txt',function(data){$('#Notes').html(data)});

	//绂佺敤鍙抽敭
	$('body').bind('contextmenu', function() {
      return false;
    });

	$("#login_button").click(function(){

		if(true == logFlag)
		{
				alert("姝ｅ湪鎻愪氦鏈嶅姟鍣�,璇风◢鍚庯紒");
		    	return;
		}
		 if(("" == $("#account").val())||(""==$("#userPassword").val()))
		    {
		    	alert("璐﹀彿鎴栧瘑鐮佷笉鑳界┖");
		    	return;
		    }
//		    if(""==$('#validateCode').val())
//		    {
//		    	alert("鏍￠獙鐮佷笉鑳界┖");
//		    	return;
//		    }
		    if(($("#account").val().length>32)||($("#userPassword").val().length>32))
		    {
		    	alert("璐﹀彿鎴栧瘑鐮佽秴闀�");
		    	return;
		    }
		    if((""==$("#userIntranetAddress").val())||("null"==$("#userIntranetAddress").val()))
		    {
		    	alert('鏃犳硶鑾峰彇鎮ㄧ殑缃戠粶鍦板潃,璇疯緭鍏ヤ换鎰忓叾瀹冪綉绔欎粠缃戝叧澶勫鑸嚦鏈璇侀〉闈�');
		    	return;
		    }
		    if((""==$("#brasAddress").val())||("null"==$("#brasAddress").val()))
		    {
		    	alert('鏃犳硶鑾峰彇鎮ㄦ帴鍏ョ偣璁惧鍦板潃锛岃杈撳叆浠绘剰鍏跺畠缃戠珯浠庣綉鍏冲瀵艰埅鑷虫湰璁よ瘉椤甸潰');
		    	return;
		    }
		//璁剧疆閬垮厤閲嶅鎻愪氦
		logFlag = true ;
		$("#account").attr("readonly",true);
		$("#userPassword").attr("readonly",true);
		$.ajax({
			url:'AccessServices/login',
			data:{'accountID':$("#account").val()+'@zndx.inter',
				  'password':RSAUtils.encryptedString(publickey, encodeURIComponent($("#userPassword").val())),
//				  'validateCode':$('#validateCode').val(),
				  'brasAddress':$("#brasAddress").val(),
				  'userIntranetAddress':$("#userIntranetAddress").val()
		         },
			type:'post',
			dataType:'json',
			contentType:'application/x-www-form-urlencoded;charset=utf-8',
			cache:false,
			success:function(data){
				logFlag = false ;
				$("#account").attr("readonly",false);
				$("#userPassword").attr("readonly",false);
		        switch (data.resultCode){
		        case '0':
					window.location="main2.jsp";
		        	break;
		        case '1':
		        	if(data.resultDescribe == null || data.resultDescribe =="")
		        	{
		        		alert('鍏朵粬鍘熷洜璁よ瘉鎷掔粷');
		        	}
		        	else
		        	{
		        		alert(data.resultDescribe);
		        	}
		        	break;
		        case '2':
		        	alert('鐢ㄦ埛杩炴帴宸茬粡瀛樺湪');
		        	break;
		        case '3':
		        	alert('鎺ュ叆鏈嶅櫒鍔＄箒蹇欙紝绋嶅悗閲嶈瘯');
		        	break;
		        case '4':
		        	alert('鏈煡閿欒');
		        	break;
		        case '6':
		        	alert('璁よ瘉鍝嶅簲瓒呮椂');
		        	break;
		        case '7':
		        	alert('鎹曡幏鐢ㄦ埛缃戠粶鍦板潃閿欒');
		        	break;
		        case '8':
		        	alert('鏈嶅姟鍣ㄧ綉缁滆繛鎺ュ紓甯�');
		        	break;
		        case '9':
		        	alert('璁よ瘉鏈嶅姟鑴氭湰鎵ц寮傚父');
		        	break;
		        case '10':
		        	alert('鏍￠獙鐮侀敊璇�');
//		        	reloadValidateCode();
	        		break;
		        case '11':
		        	alert('鎮ㄧ殑瀵嗙爜鐩稿绠�鍗曪紝甯愬彿瀛樺湪琚洍椋庨櫓锛岃鍙婃椂淇敼鎴愬己搴﹂珮鐨勫瘑鐮�');
		        	window.location="main2.jsp";
	        		break;
		        case '12':
		        	alert('鏃犳硶鑾峰彇鎮ㄧ殑缃戠粶鍦板潃,璇疯緭鍏ヤ换鎰忓叾瀹冪綉绔欎粠缃戝叧澶勫鑸嚦鏈璇侀〉闈�');
	        		break;
		        case '13':
		        	alert('鏃犳硶鑾峰彇鎮ㄦ帴鍏ョ偣璁惧鍦板潃锛岃杈撳叆浠绘剰鍏跺畠缃戠珯浠庣綉鍏冲瀵艰埅鑷虫湰璁よ瘉椤甸潰');
	        		break;
	        	case '14':
		        	alert('鏃犳硶鑾峰彇鎮ㄥ椁愪俊鎭�');
	        		break;
	        	case '16':
		        	alert('璇疯緭鍏ヤ换鎰忓叾瀹冪綉绔欏鑸嚦鏈璇侀〉闈�,骞舵寜姝ｅ父PORTAL姝ｅ父娴佺▼璁よ瘉');
	        		break;
	        	case '17':
		        	alert('杩炴帴宸插け鏁堬紝璇疯緭鍏ヤ换鎰忓叾瀹冪綉绔欎粠缃戝叧澶勫鑸嚦鏈璇侀〉闈�');
	        		break;
		        default:
		        	alert('鏈煡閿欒');
		        	break;
		        }
			},
			error:function(xhr){
				logFlag = false ;
				$("#account").attr("readonly",false);
				$("#userPassword").attr("readonly",false);
				alert('缃戠粶寮傚父,鏈嶅姟鑴氭湰鎵ц寮傚父');
			}
		});
	});
});
//鏍￠獙鐮�
function reloadValidateCode(){
	var timeStr = "?time=" + (new Date()).getTime();
	var url = "./CodeServlet"+timeStr;
	document.getElementById("validateCodeImg").src = url;
}
//閲嶇疆
function resetVal()
{
	$("#account").val('');
	$("#userPassword").val('');
	return false;
}
//鍥介檯鍖�
function i18n(type)
{
	if('1'==type)
	{
		$("span[id=userid_span]").html("甯� 鍙�:");
		$("span[id=password_span]").html("瀵� 鐮�:");
		$("span[id=validateCode_span]").html("楠岃瘉鐮�:");
	}
	else if('2'==type)
	{
		$("span[id=userid_span]").html("Userid:");
		$("span[id=password_span]").html("Password:");
		$("span[id=validateCode_span]").html("ValidateCode:");
	}
}
