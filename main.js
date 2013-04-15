// main.js
var online=true;
var oldTime;
var logFlag = false;
//下线函数设置
$(document).ready(function(){
	$('body').bind('contextmenu', function() {
      return false;
    });

	oldTime = new Date();
	$("body").everyTime(1000,"onlineTimelen",showTimeLen);
	$("#logout_button").click(function(){
		if(true == logFlag)
		{
				alert("正在提交服务�????请稍后！");
		    	return;
		}
		//设置避免重�??????�交
		logFlag = true ;
		$.ajax({
			url:'AccessServices/logout?',
			data:{
				  'brasAddress':$("#brasAddress").val(),
				  'userIntranetAddress':$("#userIntranetAddress").val()
		         },
			type:'post',
			dataType:'json',
			contentType:'application/x-www-form-urlencoded;charset=utf-8',
			cache:false,
			success:function(data){
					logFlag = false;
		        	 switch (data.resultCode){
				        case '0':
				        	alert('下线成功');
				        	online = false;
				        	window.location="index.jsp";
				        	break;
				        case '1':
				        	alert('服务器拒绝�??????????);
				        	break;
				        case '2':
				        	alert('下线请求执�??????�败');
				        	break;
				        case '3':
					        alert('您已经下�????);
					        online = false;
					        window.location="index.jsp";
					        break;
				        case '4':
					        alert('服务器响应超�????);
					        break;
				        case '5':
					        alert('后台网络连接异常');
					        break;
				        case '6':
					        alert('服务脚本执�??????�常');
					        break;
				        case '7':
				        	alert('无法获取您的网络地址');
			        		break;
				        case '8':
				        	alert('无法获取您接入点设�??????�址');
			        		break;
			 			 case '9':
		        			alert('请输入任意其它网站�????????????�??????证页�????并按正常PORTAL正常流程认证');
	        			break;
					    default:
					    	alert('�??????错�????);
					    	break;
		        	 }
			},
			error:function(xhr){
				 logFlag = false;
				 alert('网络异常,服务脚本执�??????�常');
			}
		});
	});
});

//帐号认证成功后，页面 �??????��??????????function showTimeLen()
{
	var now = new Date();
	var timeLong = (now - oldTime);//得到相差的豪秒数

	var day= (timeLong/(1000*60*60*24) );
	var hour= (timeLong%(1000*60*60*24) ) /(1000*60*60);
	var min= ((timeLong%(1000*60*60*24) )%(1000*60*60) ) /(1000*60);
	var second = (((timeLong%(1000*60*60*24) )%(1000*60*60) )%(1000*60))/1000;

	var dayStr = Math.floor(day);
	var hourStr = Math.floor(hour);
	var minStr = Math.floor(min);
	var secondStr = Math.floor(second);
	if(hourStr < 10){
			timeStr = "0"+hourStr+":";
	}else{
			timeStr = hourStr+":";
	}
	if(minStr < 10){
			timeStr = timeStr + "0"+minStr+":";
	}else{
			timeStr = timeStr + minStr+":"
	}
	if(secondStr < 10){
			timeStr = timeStr +"0"+secondStr;
	}else{
			timeStr = timeStr + secondStr;
	}
	$("#timelen").html(timeStr);
}

window.onunload = function(){
	if(online){
		$.ajax({
			url:'AccessServices/logout?',
			data:{
				  'brasAddress':$("#brasAddress").val(),
				  'userIntranetAddress':$("#userIntranetAddress").val(),
				  'secretKey':$("#secretKey").val()
		         },
			type:'post',
			dataType:'json',
			contentType:'application/x-www-form-urlencoded;charset=utf-8',
			cache:false
		});
		online=false;
	}
};

window.onbeforeunload = function() {
	if (online) {
		return "(温馨提示：�??????�点击�??????��线�??????���??????常下线，若采用其它方式，请关�??????卡或电脑五分钟，�??????正常下网�????";
	}
};
