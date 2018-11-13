_host = "https://benz.wx.fractalist.com.cn/";

//我要开团
function startin (success) {
	var url = _host + "/Collage/ToCollage";
	var params = {};
	ajax(url,params,success);
}

//我要参团
function joinin(collageId,success) {
	var url = _host + "/Collage/JoinCollage";
	var params = {
		collageId :collageId
	};
	ajax(url,params,success);
}

//微信支付
function pay(collageId,success){
	var url = _host + "/Collage/payOrder";
	var params = {
		collageId : collageId
	};
	ajax(url,params,success);
}
//购买记录
function record (success) {
	var url = _host + "/Collage/LoadPurchaseRecord";
	var params = {};
	ajax(url,params,success);
}
//获取卡号卡密
function nums (collageId,success) {
	var url = _host + "/Collage/LoadOrderDetail";
	var params = {
		collageId : collageId
	};
	ajax(url,params,success);
}
//开团记录
function startRecord (collageId,success) {
	var url = _host + "/Collage/LoadCollage";
	var params = {
		collageId : collageId
	};
	ajax(url,params,success);
}

function hrefLink (num){
	window.location.href = 'https://benz.wx.fractalist.com.cn/Collage/Index?pageName='+ num;
}