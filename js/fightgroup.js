$(function(){
  $('.close').on('click', function(event) {
    event.preventDefault();
    window.location.reload(); 
  });
  $('.close1').on('click', function(event) {
    event.preventDefault();
    $('.none1').hide();
    
  });
  $('.close2').on('click', function(event) {
    event.preventDefault();
    $('.none2').hide();
    window.location.reload(); 
  });
  $('.close3').on('click', function(event) {
    event.preventDefault();
    $('.none3').hide();
  });
  $('.rule').on('click',  function(event) {
    event.preventDefault();
    $('.none4').show();
  });
  $('.close4').on('click', function(event) {
    event.preventDefault();
    $('.none4').hide();
  });
  $('.close6').on('click',  function(event) {
      event.preventDefault();
      $('.none6').hide();
      $('.content1').hide();
      $('.content2').show();
      
  });
  $('.close7').on('click',  function(event) {
      event.preventDefault();
      $('.none7').hide();
      $('.content1').hide();
      $('.content2').show();
      
  });

  var istrue = true;
  //我要开团
  $('.btn').on('click', function(event) {
      event.preventDefault();
      if (istrue) {

          startin(function(res){

              var script=document.createElement("script"); 
              script.setAttribute("type", "text/javascript"); 
              script.setAttribute("src", "js/share.js"); 
              var heads = document.getElementsByTagName("head"); 
              if(heads.length) 
                  heads[0].appendChild(script); 
              else 
                  document.documentElement.appendChild(script);

              if(res.errcode > 0) {
              //开团成功
                  $('#collageId').val(res.errcode);
                  if (parseFloat(res.errmsg) == 1) {
                      $('.none6').show();
                  }else if (parseFloat(res.errmsg) == 2 ) {
                      $('.none7').show();
                  };
                  
                  var first_person = get_cookie("CollageHeadimgurl");
                  $('.person .person_list img.img1').attr({
                      src: first_person,
                  });
              }else if(res.errcode  == -5 ) { 
              //活动结束
                  $('.content').hide();
                  $('.content10').show();
              }else if (res.errcode == 403) {
              //没有授权
                  hrefLink('fightgroup.html?collageId='+ shareNews)
              }else if(res.errcode == -4){
              //参团超过两次
                  $('.none3').show()
              }
              istrue = false;
              setTimeout(function(){
                istrue = true;
              },1000)
          });
      };

  });

  //开团记录
  reloads();
  
  
  //邀请好友
  $('.btn1').on('click', function(event) {
    event.preventDefault();
    $('.none5').show();
    
  });

  //指引分享弹框关闭
  $('.none5').on('click',  function(event) {
    event.preventDefault();
    $('.none5').hide();
  });

    //copy卡号
    // var clipboard = new ClipboardJS('.right1');
    var clipboard = new ClipboardJS('.right1', {
        text: function () {
            return $("#num1").val() + " " + $("#num2").val();
        }
    });
    clipboard.on('success', function(e) {    
          
        alert("已复制好，可贴粘。");    

        e.clearSelection();    
    }); 
})



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

  
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); //定义正则表达式 
    var r = window.location.search.substr(1).match(reg);  
    if (r != null) return unescape(r[2]); 
    return null; 
}


function set_Cookie(name, value, liveMinutes) {  
  if (liveMinutes == undefined || liveMinutes == null) {
    liveMinutes = 60 * 2;
  }
  if (typeof (liveMinutes) != 'number') {
    liveMinutes = 60 * 2;//默认120分钟
  }
  var minutes = liveMinutes * 60 * 1000;
  var exp = new Date();
  exp.setTime(exp.getTime() + minutes + 8 * 3600 * 1000);
  //path=/表示全站有效，而不是当前页
  document.cookie = name + "=" + value + ";path=/;expires=" + exp.toUTCString();
}

function reloads(){
  var shareNews = getQueryString('collageId');

  if( shareNews != null){
    startRecord(shareNews,function(res){
      if(res.errcode == 1) {
        $('.person .person_list img.img1').attr({
            src: res.data.FromAvatar,
        });
        $('.person .person_list img.img2').attr({
            src: res.data.FirstAvatar,
        });
        $('.person .person_list img.img3').attr({
            src: res.data.SecondAvatar,
        });

        if( res.data.FromIsPay == 1){ 
            $('.img1').parent().children('p').css({
                background: 'url(../Collage/img/tip1.png) no-repeat',
                backgroundSize: '100% 100%'
            });
        }
        if ( res.data.FirstIsPay == 1){ 
            $('.img2').parent().children('p').css({
                background: 'url(../Collage/img/tip1.png) no-repeat',
                backgroundSize: '100% 100%'
            });
        }
        if ( res.data.SecondIsPay == 1){ 
            $('.img3').parent().children('p').css({
                background: 'url(../Collage/img/tip1.png) no-repeat',
                backgroundSize: '100% 100%'
            });
        }
        
        var currentId = get_cookie('BenzOpenIDCollage');
        if (currentId == res.data.FromOpenId) { 
            //是开团人
            if( res.data.FromIsPay == 0 ){ 
                //未支付
                $('.content').hide();
                $('.content6').show();
                if (res.data.Status < 2 ) { 
                    //参团未满
                    $('.btn_no').show();
                }else { 
                    //参团满
                    $('.btn_no').hide();
                    $('.btn7').show();
                }
            }else {
                //已支付
                $('.content').hide();
                $('.content7').show();
                if (res.data.PayState < 2) { 
                    //所有人未支付完成
                    $('.btn8').show();
                      
                }else{ 
                    //所有人支付了
                    if (res.data.FromCardNo != '') {
                      $('.content').hide();
                      $('.content8').show();
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
                    }else{
                      $('.btn9').show();
                    } 
                }
            }
        }else  {
            //参团人
            if (currentId == res.data.FirstOpenId ) {
                //第一参团人
                if( res.data.FirstIsPay == 0 ){ 
                    //未支付
                    $('.content').hide();
                    $('.content6').show();
                    $('.content6').css({
                      background: 'url(../Collage/img/5.jpg) no-repeat',
                      backgroundSize: '100% 100%'
                    });
                    if (res.data.Status < 2 ) { 
                        //参团未满
                        $('.btn_no').show();
                    }else { 
                        //参团满
                        $('.btn_no').hide();
                        $('.btn7').show();
                    }
                }else {
                    //已支付
                    $('.content').hide();
                    $('.content7').show();
                    if (res.data.PayState < 2) { 
                        //所有人未支付完成
                        $('.btn8').show();
    
                    }else{ 
                        //所有人支付了
                        if (res.data.FirstCardNo != '') {
                            $('.content').hide();
                            $('.content8').show();
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
                        }else{
                            $('.btn9').show();
                        }
                        
                    }
                }

            }else if (currentId == res.data.SecondOpenId) {

                //二
                if( res.data.SecondIsPay == 0 ){ 
                    //未支付
                    $('.content').hide();
                    $('.content6').show();
                    $('.content6').css({
                      background: 'url(../Collage/img/5.jpg) no-repeat',
                      backgroundSize: '100% 100%'
                    });
                    if (res.data.Status < 2 ) { 
                        //参团未满
                        $('.btn_no').show();
                    }else { 
                        //参团满
                        $('.btn_no').hide();
                        $('.btn7').show();
                    }
                }else {
                    //已支付
                    $('.content').hide();
                    $('.content7').show();
                    if (res.data.PayState < 2) { 
                        //所有人未支付完成
                        
                        $('.btn8').show();
                       
                    }else{ 
                        //所有人支付了
                        if (res.data.SecondCardNo != '') {
                            $('.content').hide();
                            $('.content8').show();
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
                        }else{
                            $('.btn9').show();
                        }
                        
                    }
                }
            }else {
                //参团人数已满
                if ( res.data.Status == 2 ) { 
                    $('.btn4').hide();
                }else{
                    $('.content').hide();
                    $('.content4').show();
                }

            } 
        };
        if(res.data.PayState  == -1){ //活动结束或者券没有了
            $('.content').hide();
            $('.content10').show();
        }
      }else if (res.errcode == 403) {
        hrefLink('fightgroup.html?collageId='+ shareNews)
      };
    })
  }
}