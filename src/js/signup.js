// 会员注册
$(function() {
	// 加载头部header
	$('#header').load('../heard.html?_=' + Math.random(), function() {
		$('.soho').remove();
		$('#main').remove();
		$('#header').css("height",'35px')
		$(".sy:eq(0)").click(function(){
			$(".sy:eq(0) a").attr("href","login.html")
		})
		$(".sy:eq(1)").click(function(){
			$(".sy:eq(1) a").attr("href","signup.html")
		})	
	});

	// 表单验证插件
	$("#regForm").validate({
		rules: {
			username: { rangelength:[6,20], },
			password: { rangelength:[6,12], },
			repassword: { equalTo: "#password", },
			codeCheck: { equalTo: "#code", },


		},
		messages: {
			phone:{ 
				required:"请输入手机号" , 
				isMobile:"请输入正确的手机号"
			},
			password: {
				required: '请输入密码',
				rangelength: jQuery.validator.format("密码长度只能在6-12位字符之间"),
			},
			repassword: {
				required: '请输入重复密码',
			},
			codeCheck: {
				required: '请输入验证码',
			}
		},
	});
	
	//对错图标提示功能
	$( 'input[name="username"' ).blur( function(){
		console.log( "用户名=" + $( 'input[name="username"' ).valid() );
		if( $( this ).valid() ){
			$( this ).nextAll('i').attr( 'class', 'fa fa-check' ).css( 'color', '#7ABD54');
		}else{
			$( this ).nextAll('i').attr( 'class', 'fa fa-close' ).css( 'color', '#F00');
		}
	})
	$( 'input[name="password"' ).blur( function(){
		console.log( "密码=" + $( 'input[name="password"' ).valid() );
		if( $( this ).valid() ){
			$( this ).nextAll('i').attr( 'class', 'fa fa-check' ).css( 'color', '#7ABD54');
		}else{
			$( this ).nextAll('i').attr( 'class', 'fa fa-close' ).css( 'color', '#F00');
		}
	})
	$( 'input[name="repassword"' ).blur( function(){
		console.log( "重复密码=" + $( 'input[name="repassword"' ).valid() );
		if( $( this ).valid() ){
			$( this ).nextAll('i').attr( 'class', 'fa fa-check' ).css( 'color', '#7ABD54');
		}else{
			$( this ).nextAll('i').attr( 'class', 'fa fa-close' ).css( 'color', '#F00');
		}
	})
	
	//点击数字验证码，更换一个新的4位数字
	emergeCode();//加载网页时运行一次
	$( '#changeCode' ).click( function(){
		var arr = emergeCode();
		$( '#code' ).val();
	})
	
	function emergeCode(){
		var str = "";
		for( var i=0; i<4; i++ ){
			var ran = parseInt( Math.random()*62 );
			if( ran <= 9 ){
				str += ran;
			}else if( ran > 9 && ran < 36 ){
				str += String.fromCharCode( ran + 55 );
			}else if( ran >= 36 && ran < 62 ){
				str += String.fromCharCode( ran + 61 );
			}
		}
		$( '#code' ).val( str )
		return str;
	}
	
	
	//保存注册信息的json，检查cookie是否有用户信息
	if( $.cookie( 'userInfo' ) ){
		console.log( "cookie有信息！" + $.cookie( 'userInfo' ) );
		//把字符串转换成对象
		var regInfo = JSON.parse( $.cookie( 'userInfo' ) );
	}else{
		console.log( "cookie没有信息！");
		var  regInfo = {};
	}
	
//	立即注册按钮
	$('#submit').click(function( e ) {
		e.preventDefault();
		//closest从#submit开始，向上找form，并返回
		if( $(this).closest('form').valid() && !$( '#checkbox' ).get(0).checked ){
			//正上方弹窗
			layer.msg('请勾选：我已阅读并同意《奥莱购会员协议》', {
				offset: '120px',
				shift: 6
			});
		}
		if( $(this).closest('form').valid() && $( '#checkbox' ).get(0).checked ) {
//		注册成功事件	
			var username = $( 'input[name="username"' ).val();
			var password = $( 'input[name="password"' ).val();
			//新增用户信息
			//regInfo[ username ] = password;
			var obj = {
				username : username,
				password : password
			}
			//将json转换为字符串
			var jsonCookie = JSON.stringify( obj );
			//写入Cookie，expires注册信息保存15天
			$.cookie( 'userInfo', jsonCookie, { expires: 15 } );
			//注册成功弹窗提示
			layer.msg('注册成功！&nbsp;用户名：' + username, {
			  	time: 20000, //20s后自动关闭
			  	icon: 1,
			  	skin: 'layui-layer-rim', //加上边框
			  	btn: ['立即登录', '返回'],
			  	yes: function(index){
				    layer.close(index);
				    //把登录状态写入Cookie，当浏览器关闭时清除
					// $.cookie( 'loginState', username );
					// console.log( "登录状态" + $.cookie( 'loginState' ) );
					//跳转到主页
					location.href = "login.html?"+Math.random();
				}

			});
			
		} else {
			console.log("注册失败！")
		}
		 console.log(username+"  "+password);
	})
	// console.log(username+password);
	
	for( var k in regInfo ){
		console.log( "用户：" + regInfo[k]   );
	}
	
})