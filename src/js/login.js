$( function(){
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

//验证登录
$( '#submit' ).click( function( e ){
	//阻止浏览器默认事件
	e.preventDefault();
	console.log("login");
	//loginMesg的样式和内容设为空
	$( '#loginMesg' ).removeClass( 'mesgStyle' );
	$( '#loginMesg' ).html("");
	//判断用户名和密码是否为空，如果为空样式和内容
	if( $( '#username' ).val().length <= 0  ){
		console.log( "用户名为空" );
		$( '#loginMesg' ).addClass( 'mesgStyle' );
		$( '#loginMesg' ).html( "请输入邮箱/用户名/已验证手机" );
	}else if( $( '#password' ).val().length <= 0 ){
		console.log( "密码为空" );
		$( '#loginMesg' ).addClass( 'mesgStyle' );
		$( '#loginMesg' ).html( "请输入密码" );
	}else{
//			用户名和密码都不为空
		var hasName = false;
		var hasPwd = "";
		
		if( $.cookie( 'userInfo' ) ){
				//	将JSON字符串转换为对象
			var regInfo = JSON.parse( $.cookie( 'userInfo' ) );			
				//打印出获取到的用户名和密码
				console.log( "用户：" + regInfo.username + ",密码：" + regInfo.password );
				if( regInfo.username === $( '#username' ).val() ){
					hasName = true;
					hasPwd = regInfo.password;
				}if( !hasName ){
					$( '#loginMesg' ).addClass( 'mesgStyle' );
					$( '#loginMesg' ).html( "用户名不存在" );
				}else{
	//				用户名存在
					if( hasPwd === $( '#password' ).val() ){
						layer.load(2, {time: 1});
						window.setTimeout( function(){
							//调用登录方法							
							loginPass();
						}, 500)
					}else{
						$( '#loginMesg' ).addClass( 'mesgStyle' );
						$( '#loginMesg' ).html( "密码不正确" );
					}
				}
			
		}
	}
	
	function loginPass(){
		//把登录状态写入Cookie，当浏览器关闭时清除
		$.cookie( 'loginState', JSON.stringify( $( '#username' ).val() ) ,{path: '/'});
		console.log( "登录状态" + $.cookie( 'loginState' ) );
		//跳转到主页
		location.href = "../index.html";
		
	}
	
	
	
	
})
	
	
	
	
})
