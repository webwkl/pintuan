var time='2018-11-12 00:00:00';
var day = new Date(time);
//方案
var day1 = new Date(time1);
var time1 = time.replace(/-/g,"/");
//方案拓展
//var day2 = new Date(time1);
//var day3 = eval("new Date("+ time1.replace(/\D+/g,",")+")").getTime();
//console.log(day1)
//console.log(day2)
//console.log(time1)
timer(time1);

/**
 * 入参第一个为时间字符串，第二个参数为模式选择，如果传入'day'，按天数倒计时到秒，不传值，按小时精确到秒
 * @param timeStr
 * @param item
 */

function timer(timeStr){
    setInterval(function(){
        let nowTime = new Date(timeStr) - new Date();
        let minutes = parseInt(nowTime / 1000 / 60 % 60, 10);//计算剩余的分钟
        let seconds = parseInt(nowTime / 1000 % 60, 10);//计算剩余的秒数
        //console.log(typeof(seconds))
        minutes = checkTime(minutes);
        seconds = checkTime(seconds);
        let hours = parseInt(nowTime / ( 1000 * 60 * 60), 10); //计算剩余的小时
            hours = checkTime(hours);

            $(".joinh").html(hours);
            $(".joinm").html(minutes);
            $(".joins").html(seconds);
        if( new Date(timeStr) < new Date()){
            $(".joinh").html('00');
            $(".joinm").html('00');
            $(".joins").html('00');
            clearTimeout(timer)
        }
    },1000);

}
function checkTime(i) { //将0-9的数字前面加上0，例1变为01
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}