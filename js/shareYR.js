//����΢���ļ�
document.write("<script src='https://res.wx.qq.com/open/js/jweixin-1.0.0.js'></script>");
$(function () {
    pengyouquanTitle = "˫ʮһԤ�ȣ��һ�������Ϯ";
    wxtitle = "˫ʮһԤ�ȣ��һ�������Ϯ";
    wxdesc = "÷����˹-��������ó�����˫ʮһ��ϲ�һݣ�ֻ��������";
    wxlink = "https://benz.wx.fractalist.com.cn/Collage/Article";
    wximgUrl = "https://benz.wx.fractalist.com.cn/html/Collage/img/shareYR.png";
    onloadFun();
});

function onloadFun() {
    $.ajax({
        async: false,
        url: 'https://benz.wx.fractalist.com.cn/wxapi/wxjsconfig?Url=' + encodeURIComponent(window.location.href.split('#')[0]),
        type: "GET",
        dataType: 'json',
        timeout: 5000,
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
                        //RecordShare("����", JSON.stringify(res));
                    },
                    cancel: function (res) {
                    },
                    fail: function (res) {
                    }
                });

                wx.onMenuShareTimeline({
                    title: pengyouquanTitle,
                    link: wxlink,
                    desc: wxdesc,
                    imgUrl: wximgUrl,
                });
            });
        },
    });
}