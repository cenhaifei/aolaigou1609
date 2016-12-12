$(function(){

	// 加载头部header
	$('#header').load('../heard.html?_=' + Math.random(), function() {
		$('.sidebar').remove();

		if( ( $.cookie( 'loginState' ) !=  'null' ) && ( $.cookie( 'loginState' ) != null ) ){
            //layer.msg( $.cookie( 'loginState' ) + '，欢迎登录 奥莱购');
            $(".sy:eq(0)").html(JSON.parse($.cookie( 'loginState' ) )+ '，欢迎登录 奥莱购')
            $(".sy:eq(1)").html("退出");
            $(".sy:eq(1)").click(function(){
                $.cookie("loginState", "", { expires: -1 });
                $(".sy:eq(0)").html("<a href='login.html'>登录</a>");
                $(".sy:eq(1)").html("<a href='signup.html'>立即注册</a>");
            })
        }
	});




	$('#footer').load('../footer.html?_=' + Math.random());
})
$(document).ready(function(evt){
	$(".jqzoom").imagezoom();
	
	$("#thumblist li a").click(function(){
		$(this).parents("li").addClass("tb-selected").siblings().removeClass("tb-selected");
		$(".jqzoom").attr('src',$(this).find("img").attr("mid"));
		$(".jqzoom").attr('rel',$(this).find("img").attr("big"));
	});

});