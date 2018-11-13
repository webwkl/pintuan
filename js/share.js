

//引入微信文件
// document.write("<script src='https://res.wx.qq.com/open/js/jweixin-1.0.0.js'></script>");
//记录分享信息

//根据QueryString参数名称获取值
function getQueryStringByName(name) {
    var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
    if (result == null || result.length < 1) {
        return "";
    }
    return result[1];
}
function _AddPageView(App, URL, OpenID, Remark) {

    var paras = $.param({
        App: App,
        OpenID: OpenID,
        GUID: _GUID,
        URL: document.URL,
        UrlReferrer: document.referrer,
        Src: getQueryStringByName("src"),
        Remark: Remark
    });

    $.ajax({
        type: "post",
        url: URL,
        data: paras,
        dataType: "json",
        success: function (data) {
            if (data.Success) {
                console.log(true);
            } else {
                console.log(false);
            }
        },
        error: function (xhr, textStatus) {
            console.log(xhr);
            //alert(textStatus);
        }
    });
}
//JS操作cookies方法!
//写cookies
function setCookie(name, value) {
    var Days = 1;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}
//获取cookies
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null
}
//生成guid
function CreateGUID() {
    var guid = "";
    for (var i = 1; i <= 32; i++) {
        var n = Math.floor(Math.random() * 16.0).toString(16);
        guid += n;
        if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
            guid += "-";
    }
    return guid;
}

//记录日志的URL
_LogURL = "https://zw.benz.wx.fractalist.com.cn/SystemCommon/Log"
_PVURL = "https://zw.benz.wx.fractalist.com.cn/SystemCommon/PageView";
// 改
_App = "拼团活动";
_GUID = getCookie("_GUID");
console.log("_GUID:" + _GUID);
if (_GUID == "" || _GUID == null) {
    //生成一个guid
    _GUID = CreateGUID();
    //保存到cookie中
    setCookie("_GUID", _GUID);
}
//没有openid 的时可以使用guid 作为用户id 统计uv
_OpenID = getCookie("BenzOpenIDCollage");
//_OpenID = _GUID;
_Mobile = "",
_Type = "";
_SubType = "";
_Method = "";
_Parameter = document.URL;
_Content = "";
_Remark = "";
//记录pv_uv
_AddPageView(_App, _PVURL, _OpenID, _Remark);


function _Log(URL, App, OpenID, Mobile, Type, SubType, Method, Parameter, Content, Remark) {

    var paras = $.param({
        App: App,
        OpenID: OpenID,
        Guid: _GUID,
        Mobile: Mobile,
        Type: Type,
        SubType: SubType,
        Method: Method,
        Parameter: Parameter,
        Content: Content,
        Remark: Remark
    });
    $.ajax({
        type: "post",
        url: URL,
        data: paras,
        dataType: "json",
        success: function (data) {
            if (data.Success) {
                console.log(true);
            } else {
                console.log(false);
            }
        },
        error: function (xhr, textStatus) {
            console.log(xhr);
            //alert(textStatus);
        }
    });
}
//分享后记录数据
function RecordShare(type, remark) {
    _SubType = type;
    _Remark = remark;
    _Log(_LogURL, _App, _OpenID, _Mobile, "分享", _SubType, _Method, _Parameter, _Content, _Remark);
}

//朋友圈分享
function share(pengyouquanTitle, wxtitle, wxdesc, wxlink, wximgUrl) {
    pengyouquanTitle = pengyouquanTitle;
    wxtitle = wxtitle;
    wxdesc = wxdesc;
    wxlink = wxlink;
    wximgUrl = wximgUrl;
    onloadFun();
}

$(function () {
    

    var collageId = $('#collageId').val();
    if (collageId == '') {

        collageId = getQueryString('collageId');
    }
    //alert(collageId)
    pengyouquanTitle = "一起拼团吧~";
    wxtitle = "一起拼团吧~";
    wxdesc = "限时专享！梅赛德斯-奔驰礼宾用车服务双十一128元超低价，等你参团。";
    wxlink = "https://benz.wx.fractalist.com.cn/Collage/Index?pageName=fightgroup.html?collageId="+ collageId ;
    wximgUrl = "https://benz.wx.fractalist.com.cn/html/Collage/img/shareYR.png";

    share(pengyouquanTitle, wxtitle, wxdesc, wxlink, wximgUrl);
});
function onloadFun() {
    $.ajax({
        async: false,
        url: 'https://benz.wx.fractalist.com.cn/wxapi/wxjsconfig?Url=' + encodeURIComponent(window.location.href.split('#')[0]),
        type: "GET",
        dataType: 'json',
        timeout: 5000,
        beforeSend: function () {
        },
        success: function (json) {
            console.log(json);
            wx.config({
                debug: false,
                appId: json["appId"],
                timestamp: json["timestamp"],
                nonceStr: json["nonceStr"],
                signature: json["signature"],
                jsApiList: [
                       'checkJsApi',
                       'onMenuShareTimeline',
                       'onMenuShareAppMessage',
                       'scanQRCode',
                       'chooseWXPay'
                ]
            });

            wx.ready(function () {
                wx.onMenuShareAppMessage({
                    title: wxtitle,
                    desc: wxdesc,
                    link: wxlink,
                    imgUrl: wximgUrl,
                    trigger: function (res) {

                    },
                    success: function (res) {
                        RecordShare("好友", JSON.stringify(res));
                        var collageId = $('#collageId').val();
                        if (collageId == '') {

                            collageId = getQueryString('collageId');
                        }
                        window.location.href = "https://benz.wx.fractalist.com.cn/Collage/Index?pageName=fightgroup.html?collageId="+ collageId ;
                        // $('.none5').hide();
                        // $('.content2').hide();
                        // $('.content6').show();


                    },
                    cancel: function (res) {
                        // alert("cancel");
                    },
                    fail: function (res) {
                        alert(2)
                    }
                });

                wx.onMenuShareTimeline({
                    title: pengyouquanTitle,
                    link: wxlink,
                    desc: wxdesc,
                    imgUrl: wximgUrl,
                    trigger: function (res) {
                    },
                    success: function (res) {
                        RecordShare("朋友圈", JSON.stringify(res));
                    },
                    cancel: function (res) {
                        // alert("cancel");
                    },
                    fail: function (res) {
                        // alert("fail");
                    }
                });
                



            });
        },
        complete: function (XMLHttpRequest, textStatus) {
                
        },
        error: function (xhr, textStatus) {
            // alert(textStatus);
            console.info(xhr);
        }
    });
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
