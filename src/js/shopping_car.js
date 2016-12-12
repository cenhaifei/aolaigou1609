$( function(){
	// 加载头部header
	$('#header').load('../heard.html?_=' + Math.random(), function() {
		$('#main').remove();
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

	// 加载尾部footer
	$('#footer').load('../footer.html?_=' + Math.random());
	$( '.cart_body .panel-body' ).html( "" );
	var no_good_html = '<p style="font-size: 16px; text-align: center; color: #C2302C; font-weight: bold;">亲，您的购物车还没有商品哦！赶快扫货吧。</p>';
	
	//加载购物清单
	if( ($.cookie('cart_menu') != 'null') && ($.cookie('cart_menu') != null) ) {	//判断购物车是否有商品
		var cart_cookie = $.cookie( 'cart_menu' );
		//JSON.parse字符串转换为对象
		var cart_json = JSON.parse( cart_cookie );
		var cart_good_count = cart_json.length;
		if( cart_good_count <= 0 ){
			$( '.cart_body .panel-body' ).append( no_good_html );
		}
		var cart_html = "";
		for( var i=0; i<cart_good_count; i++ ){
			cart_html += '<ul> <li><img src="' + 
			cart_json[i].good_img + '" /></li> <li>' + 
			cart_json[i].good_name + '</li> <li>' + 
			cart_json[i].good_price + '</li> <li> <div class="input-group"> <span class="input-group-btn"> <button class="btn btn-default minusBtn change_num" type="button">-</button> </span> <input type="text" class="form-control good_price"  maxlength="2" value="' + 
			cart_json[i].good_count + '" style="width: 50px;"> <span class="input-group-btn"> <button class="btn btn-default addBtn change_num" type="button">+</button> </span> </div> </li> <li class="subtotal">￥0.00</li> <li>226</li> <li> <span class="red delete_good" style="cursor: pointer;">清除</span> </li> </ul>';
		}
		$( '.cart_body .panel-body' ).append( cart_html );
		
		//计算商品数量
		count_goods();
		
		//用户操作
		//用户点击修改购买数量
		$( '.minusBtn' ).click( function(){
			var value = parseInt( $( this ).parent().next().val() );
			if( value > 1 ){
				$( this ).parent().next().val( value - 1 );
			}
		})
		$( '.addBtn' ).click( function(){
			var value = parseInt( $( this ).parent().prev().val() );
			if( value < 100 ){
				$( this ).parent().prev().val( value + 1 );
			}
		})
		//手动修改input数量
		$( '.good_price' ).keyup( function(){
			//判断输入是否正确，否则赋值为1；判断是否大于等于0，否则赋值为1.
			if( $( this ).val() <= 0 || /\d/gi.test( $( this ).val() ) ){
				$( this ).val( 1 );
			}
		})
		
		
		//js操作
			//加载前计算好价格
		$( '.change_num' ).each( function(){
			var good_price = Number( $( this ).closest('li').prev().html().split('￥')[1] );
			var good_count = $( this ).closest('li').find('input').val();
			$( this ).closest('li').next().html( '￥' + good_price * good_count + '.00' );
		})
			//定义总价变量
		count_total();
		function count_total(){
			var total_price = 0;
			$( '.subtotal' ).each( function(){
				total_price += Number( $( this ).html().split('￥')[1] );
				$( this ).next().html( Math.floor( Number( $( this ).html().split('￥')[1] ) / 10 ) );
			})
//			console.log( '总价：' + total_price );
			//修改总价显示
			$( '.cart_price' ).html( total_price + '.00' );
		}
		
		//点击加减
		$( '.change_num' ).click( function(){
			after_chang_count( this );
		})
		
		//手动修改input数量
		$( '.good_price' ).blur( function(){
			console.log( '修改后的数量：' + $( this ).val() );
			after_chang_count( this );
		})
		
		//封装，改变数量后，动态计算小计、积分和总价
		function after_chang_count( self ){
//			console.log("修改小计数额：");
			var good_price = Number( $( self ).closest('li').prev().html().split('￥')[1] );
//			console.log( good_price );
			var good_count = $( self ).closest('li').find('input').val();
//			console.log( good_count );
			$( self ).closest('li').next().html( '￥' + good_price * good_count + '.00' );
			$( self ).closest('li').next().next().html( Math.floor( good_price * good_count / 10 ) );
			count_total();
		}
		
		//点击删除商品，修改cookie购物单
		$(".cart_body .delete_good").bind("click", function() {
		     var good_index = $(".cart_body .delete_good").index( this );
		     layer.msg('确定删除：' + cart_json[good_index].good_name, {
			  	time: 20000, //20s后自动关闭
			  	icon: 3,
			  	skin: 'layui-layer-rim', //加上边框
			  	btn: ['删除', '且慢']
			  	,yes: function(index){
				    layer.close(index);
					//移除html
					$( '.cart_body ul:eq( ' + good_index + ' )' ).remove();
	
				    //删除商品修改Cookie
					cart_json.splice( good_index, 1 );
					console.log( cart_json );
					//写入cookie
						//将json转换为字符串
					var cart_json_cookie = JSON.stringify( cart_json );
						//写入Cookie，注册信息保存15天
					$.cookie( 'cart_menu', cart_json_cookie, { expires: 15 } );
					console.log( $.cookie( 'cart_menu' ) );
					
					//如果删除所有商品后，显示购物车为空的提示
					if( JSON.parse( $.cookie( 'cart_menu' ) ).length <= 0 ){
						$( '.cart_body .panel-body' ).append( no_good_html );
					}
					//重新计算总价
					count_total();
					//计算商品数量
					count_goods();
					
				}
			});
		});
		
		//点击增加减少商品数量，同时修改cookie
		$(".cart_body .change_num").bind("click", function() {
			var good_index = Math.floor( $(".cart_body .change_num").index( this ) / 2 );
			console.log( 'btn:' + good_index );
			var good_count = $( this ).closest( 'li' ).find( 'input' ).val();
			console.log( 'btnValue:' + good_count );
			
			cart_json[good_index].good_count = good_count;
			console.log( "写入后cart_json的内容");
			console.log( cart_json[good_index] );
			//写入cookie
				//将json转换为字符串
			var cart_json_cookie = JSON.stringify( cart_json );
				//写入Cookie，注册信息保存15天
			$.cookie( 'cart_menu', cart_json_cookie, { expires: 15 } );
			console.log( $.cookie( 'cart_menu' ) );
			
			//计算商品数量
			count_goods();
			
		});
		
		//修改input商品数量，同时修改cookie
		//bind为一个元素绑定一个事件处理程序
		$(".cart_body .good_price").bind("blur", function() {
			var good_index = $(".cart_body .good_price").index( this );
			console.log( 'input:' + good_index );
			var good_count = $( this ).val();
			console.log( 'btnValue:' + good_count );
			
			cart_json[good_index].good_count = good_count;
			console.log( "写入后cart_json的内容");
			console.log( cart_json[good_index] );
//			//写入cookie
//				//将json转换为字符串
			var cart_json_cookie = JSON.stringify( cart_json );
//				//写入Cookie，注册信息保存15天
			$.cookie( 'cart_menu', cart_json_cookie, { expires: 15 } );
			console.log( $.cookie( 'cart_menu' ) );
			
			//计算商品数量
			count_goods();
		});
		
		
		
	}else{
		$( '.cart_body .panel-body' ).append( no_good_html );
	}
	
	//点击 继续购物 跳转到首页
	$( '.cart_body .panel:last button:first' ).click( function(){
		location.href = "../index.html";
	})
	
	//计算商品数量
	function count_goods(){
		var goods_count = 0;
		//使用each遍历，判断当前商品的数量
		$( '.cart_menu input' ).each( function(){
			goods_count += Number( $( this ).val() );
		});
		console.log( '计算商品数量' + goods_count );
		$( '.cart_count' ).html( goods_count );
	}
	
	
})