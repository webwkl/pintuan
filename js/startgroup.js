$(function(){
var shareNews = getQueryString('collageId');
var TheValue = parseFloat($('#num1').val())
if(TheValue != 0 ){
  $('.content').hide();
  $('.content8').show();
}
//自己开团
$('.btn5,.btn10').on('click',  function(event) {
	event.preventDefault();
	window.location.href = 'index.html';
});
//我要参团
var istrue = true;
$('.btn4').on('click', function(event) {
    event.preventDefault();
    if (istrue) {
        joinin(shareNews,function(res){
            if(res.errcode > 0){
                //参团成功
                if (parseFloat(res.errcode) == 1) {
                    $('.none').show();
                }else if (parseFloat(res.errcode) == 2 ) {
                    $('.none2').show();
                };
              
            }else if(res.errcode == -5){
                //拼团卡卷已经抢完，活动结束
                $('.content').hide();
                $('.content10').show();
            }else if(res.errcode == -2){
                alert('拼团已经完成，您来晚了一步')
                //拼团已经完成，您来晚了一步
            }else if(res.errcode == -3){
                alert('您已经加入了拼团')
                //您已经加入了拼团
            }else if(res.errcode == -4){
              //参团超过两次
                $('.none3').show();
            }else if (res.errcode == 403) {
              hrefLink('fightgroup.html?collageId='+ shareNews)
            }else{
              alert('参团失败')
            }
            istrue = false;
            setTimeout(function(){
                istrue = true;
            },1000)
        })
    };
    
});

//微信支付
var isClick = true;
$('.btn7').on('click', function(event) {
  	event.preventDefault();
  	pay(shareNews,function(res){
    		if (res.errcode == 2) {
              location.href = res.url;
              
        }else if (res.Success == 1) {
          	
            alert(res.Message);
            window.location.href = "https://benz.wx.fractalist.com.cn/html/Collage/firstgroup.html?collageId="+ shareNews;
              
        }else if(res.errcode  == -5 ) {
            $('.content').hide();
            $('.content10').show();
      	}else if (res.errcode == 403) {
      		hrefLink('fightgroup.html?collageId='+ shareNews)
      	}else{
      		alert('支付失败');
      	}
        isClick = false;
        setTimeout(function(){
            istrue = true;
        },1000)
  	})
});
$('.btn9').on('click', function(event) {
    //显示卡号卡密
  	event.preventDefault();
  	nums(shareNews,function(res){
    		if (res.errcode == 1) {
    			$('.content').hide();
    			$('.content8').show();
    			$('#num1').val(res.data.CardNo);
    			$('#num2').val(res.data.CardPwd)
    		}else if (res.errcode == 403) {
      		hrefLink('fightgroup.html?collageId='+ shareNews)
      	}
  	})
  });
})
function getQueryString(name) {
   var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); //定义正则表达式 
    var r = window.location.search.substr(1).match(reg);  
    if (r != null) return unescape(r[2]); 
    return null; 
}
function get_cookie(Name) {
   var search = Name + "="//查询检索的值
   var returnvalue = "";//返回值
   if (document.cookie.length > 0) {
     sd = document.cookie.indexOf(search);
     if (sd!= -1) {
        sd += search.length;
        end = document.cookie.indexOf(";", sd);
        if (end == -1)
         end = document.cookie.length;
         //unescape() 函数可对通过 escape() 编码的字符串进行解码。
        returnvalue=unescape(document.cookie.substring(sd, end))
      }
   } 
   return returnvalue;
}