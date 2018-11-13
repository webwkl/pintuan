$(function(){
	$('.btn').on('click', function(event) {
		event.preventDefault();
		window.location.href = 'index.html'
	});
	record(function(res){
		if ( res.errcode == 1) {

			
			var theLength = res.data.length;
			if (theLength != 0) {

				$('.norecord').hide();
				$('.box').show();
				var str = ''; 
				for (var i = 0; i < theLength; i++) {
					str += '<li class="list">';
					if(res.data[i].PayState == -1){

						str += '<img src="img/list3.png" >';

					}else if (res.data[i].PayState == 1 || res.data[i].PayState == 0) {

						str += '<img src="img/list2.png" >';

					}else if (res.data[i].PayState == 2) {

						str += '<img src="img/list1.png" >';

					}
					str += '<p class="time">开团时间：<span class="times">'+ js_date_time(res.data[i].CreateTime) +'</span></p>';
					str += "<a class='look' href='https://benz.wx.fractalist.com.cn/Collage/Index?pageName=fightgroup.html?collageId="+ res.data[i].Id +"'>查看详情</a>";
					str += '</li>';
					$('.box').html(str);
							
					
				};
				
			}else{
				$('.box').hide();
				$('.norecord').show();
			}
			
			
			
		}else if(res.errcode == 403){
			hrefLink('record.html');
		}else{
			$('.box').hide();
			$('.norecord').show();
		}
	})
	
})
function js_date_time(val) {
  var date = new Date(parseInt(val.replace("/Date(", "").replace(")/", ""), 10));
  //月份为0-11，所以+1，月份小于10时补个0
  var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
  var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  var dd = date.getFullYear() + "年" + month + "月" + currentDate + "日" + checkTime(hour) + ":" + checkTime(minute) ;

  return dd;
}
function checkTime(i) { //将0-9的数字前面加上0，例1变为01
    if (i < 10) {
        i = "0" + i;
    }
    return i;
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
