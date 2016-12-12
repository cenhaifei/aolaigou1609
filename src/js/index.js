$(function(){
	//加载头部公共样式
	$( '#header' ).load( 'heard.html?_=' + Math.random() ,function(){
        if( ( $.cookie( 'loginState' ) !=  'null' ) && ( $.cookie( 'loginState' ) != null ) ){
            //layer.msg( $.cookie( 'loginState' ) + '，欢迎登录 奥莱购');
            //查看当前是否处于登录状态，如果是改变header登录信息
            $(".sy:eq(0)").html(JSON.parse($.cookie( 'loginState' ) )+ '，欢迎登录 奥莱购')
            $(".sy:eq(1)").html("退出");
            $(".sy:eq(1)").click(function(){
                $.cookie("loginState", "", { expires: -1 });
                $(".sy:eq(0)").html("<a href='html/login.html'>登录</a>");
                $(".sy:eq(1)").html("立即注册");
            })
        }

        $('.giff a img').attr('src','images/index/gif.gif');
        $('.logo a img').attr('src','images/index/logo.jpg');
        $('.gi a img').attr('src','images/index/gif123.gif');

        $('.carval').click(function(){
            $('.carval a').attr('href','html/shopping_car.html');
        })
        $('.former').click(function(){
            $('.former button a').attr('href','html/list.html');
        })
    });
    $( '#footer' ).load( 'footer.html?_=' + Math.random() );




//侧边栏



$('.ce_li8').click(function(){
    $('.ceb').hide();
})

$('.ce_li2').click(function(){
    $('.ce_b3 a img').css('display','none');
    // $('.ceb').css({'width':'310px','right':'270px'})
    $('.ceb').animate({'width':'310px','right':'270px'},2000)
    $('.ce_b2 a img').css({'display':'block','position':'fixed','top':'0','right':'0'})
})
$('.ce_li3').click(function(){
    $('.ce_b2 a img').css('display','none');
    $('.ceb').animate({'width':'310px','right':'270px'},2000)
    $('.ce_b3 a img').css({'display':'block','position':'fixed','top':'0px','right':'0'})
})
$('.ce_li9').click(function(){
    $('.ceb').animate({'width':'40px','right':'270px'},2000,function(){
            $('.ce_b2 a img').css({'display':'none'})
            $('.ce_b3 a img').css({'display':'none'})
    })

})
$('.ce_li8').click(function(){
    document.scrollTop(0);
})





//轮播图
	$('.carousel').carousel()

// 倒计时1
    $.extend($.fn,{

        fnTimeCountDown:function(d){
            this.each(function(){
                var $this = $(this);
                var o = {
                    hm: $this.find(".hm"),
                    sec: $this.find(".sec"),
                    mini: $this.find(".mini"),
                    hour: $this.find(".hour"),
                    day: $this.find(".day"),
                    month:$this.find(".month"),
                    year: $this.find(".year")
                };
                var f = {
                    haomiao: function(n){
                        if(n < 10)return "00" + n.toString();
                        if(n < 100)return "0" + n.toString();
                        return n.toString();
                    },
                    zero: function(n){
                        var _n = parseInt(n, 10);//解析字符串,返回整数
                        if(_n > 0){
                            if(_n <= 9){
                                _n = "0" + _n
                            }
                            return String(_n);
                        }else{
                            return "00";
                        }
                    },
                    dv: function(){
                        //d = d || Date.UTC(2050, 0, 1); //如果未定义时间，则我们设定倒计时日期是2050年1月1日
                        var _d = $this.data("end") || d;
                        var now = new Date(),
                            endDate = new Date(_d);
                        //现在将来秒差值
                        //alert(future.getTimezoneOffset());
                        var dur = (endDate - now.getTime()) / 1000 , mss = endDate - now.getTime() ,pms = {
                            hm:"000",
                            sec: "00",
                            mini: "00",
                            hour: "00",
                            day: "00",
                            month: "00",
                            year: "0"
                        };
                        if(mss > 0){
                            pms.hm = f.haomiao(mss % 1000);
                            pms.sec = f.zero(dur % 60);
                            pms.mini = Math.floor((dur / 60)) > 0? f.zero(Math.floor((dur / 60)) % 60) : "00";
                            pms.hour = Math.floor((dur / 3600)) > 0? f.zero(Math.floor((dur / 3600)) % 24) : "00";
                            pms.day = Math.floor((dur / 86400)) > 0? f.zero(Math.floor((dur / 86400)) % 30) : "00";
                            //月份，以实际平均每月秒数计算
                            pms.month = Math.floor((dur / 2629744)) > 0? f.zero(Math.floor((dur / 2629744)) % 12) : "00";
                            //年份，按按回归年365天5时48分46秒算
                            pms.year = Math.floor((dur / 31556926)) > 0? Math.floor((dur / 31556926)) : "0";
                        }else{
                            pms.year=pms.month=pms.day=pms.hour=pms.mini=pms.sec="00";
                            pms.hm = "000";
                            //alert('结束了');
                            return;
                        }
                        return pms;
                    },
                    ui: function(){
                        if(o.hm){
                            o.hm.html(f.dv().hm);
                        }
                        if(o.sec){
                            o.sec.html(f.dv().sec);
                        }
                        if(o.mini){
                            o.mini.html(f.dv().mini);
                        }
                        if(o.hour){
                            o.hour.html(f.dv().hour);
                        }
                        if(o.day){
                            o.day.html(f.dv().day);
                        }
                        if(o.month){
                            o.month.html(f.dv().month);
                        }
                        if(o.year){
                            o.year.html(f.dv().year);
                        }
                        setTimeout(f.ui, 1);
                    }
                };
                f.ui();
            });
        }
    });	
	$("#fnTimeCountDown").fnTimeCountDown("2018/07/08 18:45:13");
//	加载页面的时候给最中间的图片设置成放大效果
	$('.indbox2').css({width: "398px",height: "520px"}).find('.boximg').css({width: "398px",height:"880px",overflow: "hidden"});

	$('.indbox1').on('mouseenter',function(){
		//鼠标经过indbox2时，给div和图片都设置成放大效果，宽度增加，高度不变，溢出隐藏
		$('.indbox2').css({width: "200px",height: "520px"}).find('.boximg').css({width: "200px",height:"520px",overflow: "hidden"});
		//鼠标经过div时给div和图片都设置成放大效果，宽度增加，高度不变，溢出隐藏
		$(this).css({width: "398px",height: "520px"}).find('.boximg').css({width: "398px",height:"880px",overflow: "hidden"});
		
		//鼠标经过div时，隐藏下边的图片，显示另一个带有文字的div
		$(this).find('.baiye-xiao').css({display:"none"});
		
		$(this).find('.baiye-da').css({display:"block"});

	}).on('mouseleave',function(){
		//鼠标移出时，宽度减小回之前的大小，高度不变
		$(this).css({width: "200px",height: "520px"}).find('.boximg').css({width: "200px",height:"520px"});
		//鼠标移出indbox2时，给div和图片都设置成放大效果，宽度增大，高度不变，溢出隐藏
		$('.indbox2').css({width: "398px",height: "520px"}).find('.boximg').css({width: "398px",height:"880px",overflow: "hidden"});
		//鼠标移出时，显示图片，把带有文字内容的div隐藏
		$(this).find('.baiye-xiao').css({display:"block"});
		$(this).find('.baiye-da').css({display:"none"});
	})

})


/*  轮播图  */

var t = n =0, count;

$(document).ready(function(){ 

count=$("#banner_list a").length;

$("#banner_list a:not(:first-child)").hide();

$("#banner_info").html($("#banner_list a:first-child").find("img").attr('alt'));

$("#banner_info").click(function(){window.open($("#banner_list a:first-child").attr('href'), "_blank")});

$("#banner li").click(function() {

var i = $(this).text() -1;//获取Li元素内的值，即1，2，3，4

n = i;

if (i >= count) return;

$("#banner_info").html($("#banner_list a").eq(i).find("img").attr('alt'));

$("#banner_info").unbind().click(function(){window.open($("#banner_list a").eq(i).attr('href'), "_blank")})

$("#banner_list a").filter(":visible").fadeOut(500).parent().children().eq(i).fadeIn(1000);

document.getElementById("banner").style.background="";

$(this).toggleClass("on");

$(this).siblings().removeAttr("class");

});

t = setInterval("showAuto()", 4000);

$("#banner").hover(function(){clearInterval(t)}, function(){t = setInterval("showAuto()", 4000);});

})



function showAuto(){

n = n >=(count -1) ?0 : ++n;

$("#banner li").eq(n).trigger('click');

}




var intDiff = parseInt(600000);//倒计时总秒数量

function timer(intDiff){
    window.setInterval(function(){
    var day=0,
        hour=0,
        minute=0,
        second=0;//时间默认值        
    if(intDiff > 0){
        day = Math.floor(intDiff / (60 * 60 * 24));
        hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
        minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
        second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
    }
    if (minute <= 9) minute = '0' + minute;
    if (second <= 9) second = '0' + second;
    $('.day_show').html(day+"天");
    $('.hour_show').html('<s id="h"></s>'+hour+'时');
    $('.minute_show').html('<s></s>'+minute+'分');
    $('.second_show').html('<s></s>'+second+'秒');
    intDiff--;
    }, 1000);
} 

$(function(){
    timer(intDiff);

}); 








