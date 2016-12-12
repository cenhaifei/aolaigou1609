$(function() {
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

	// 加载尾部footer
	$('#footer').load('../footer.html?_=' + Math.random());

	$('.good_detail_r dd').mouseover(function() {
		$('a', this).addClass('aRed');
	}).mouseout(function() {
		$('a', this).removeClass('aRed');
	})
	
	//获取商品ID
	var good_id = location.search.substr( 1 ).split( '=' )[1];
	console.log( 'id=' + good_id );
	$.get( '../data/goods_list.json', function( resp ){
		console.log( resp.phone[0] );
		var get_good_img = "";
		var get_good_name = "";
		var get_good_price = "";
		for( var i=0; i<resp.phone.length; i++ ){
			if( resp.phone[i].good_id === good_id ){
				get_good_img = resp.phone[i].img;
				get_good_name = resp.phone[i].name;
				get_good_price = resp.phone[i].price;
			}
		}
		console.log( get_good_img );
		$( '.goodName' ).html( get_good_name );
		$( '.good_detail_img img' ).attr( 'src', '../img/goods_detail/list/' + get_good_img + '' );
		$( '.good_detail h4' ).html( get_good_name ).attr( 'goodID', good_id );
		$( '.good_detail_r .price' ).html( "￥" + get_good_price );
	});
	

	//请求数据，加载评论列表
	$.get('../data/comment.json', function(resp) {
		//每页多少个评论
		//		var every_page = 10;
		//评论总数量
		var commentCount = resp.goodName.length;
		$('.commentCount').html(commentCount);
		//分多少页
		//		var pageCount = Math.ceil( goodsCount / every_page );

		var comment_html = '';

		for(var i = 0; i < commentCount; i++) {
			comment_html += '<li> <div class="content_user fl"> <p><img src="../img/good_detail/' +
				resp.goodName[i].user_img + '" /></p> <p>' +
				resp.goodName[i].user_name + '</p> </div> <dl> <dt><span class="star" style="background-position:-109px -239px;"></span></dt> <dd><span>评价：</span> <font>' +
				resp.goodName[i].content + '</font> </dd> </dl> <div class="corner"></div> </li>';
		}
		$('#comment_content').append(comment_html);

	}, 'json');

	//修改购买数量 点击减号自减1
	$('.buyCount button:eq(0)').click(function() {
		console.log("-");
		var value = parseInt($('.buyCount input').val());
		if(value > 1) {
			var good_count = $('.buyCount input').val(value - 1);
		}
	})
	//点击减号自增1
	$('.buyCount button:eq(1)').click(function() {
			console.log("+");
			var value = parseInt($('.buyCount input').val());
			if(value < 100) {
				var good_count = $('.buyCount input').val(value + 1);
			}
		})
		//手动修改数量限制输入规则
	$('.buyCount input').keyup(function() {
		//判断输入是否正确，否则赋值为1；判断是否大于等于0，否则赋值为1.
		if($(this).val() <= 0 || /\D/gi.test($(this).val())) {
			$(this).val(1);
		}
	})

	//飞入购物车 动画效果
	function fly_good() {
		var flyer = $('.good_detail_img img').clone().css({
			'border-radius': '50%',
			'z-index': 9000,
			'width': 230,
			'height': 230,
		});
		$('body').append(flyer);
		
		var timer = window.setInterval( function(){
			$( window ).scrollTop( function(){
				var speed = $( window ).scrollTop()/8;
				$( window ).scrollTop( $( window ).scrollTop() - speed );
			} );
			if( $( window ).scrollTop() <= 0 ){
				window.clearInterval( timer );
			}
		}, 10)
		//弹窗插件
		flyer.fly({
			start: {
				top: $( '.good_detail_img img' ).offset().top, //开始位置（必填）
				left: $( '.good_detail_img img' ).offset().left, //开始位置（必填）#fly元素会被设置成position: fixed
			},
			end: {
				top: 190, //结束位置（必填）
				left: 1200, //结束位置（必填）
				width: 10, //结束时高度
				height: 10, //结束时高度
			},
			autoPlay: true, //是否直接运动,默认true
			speed: 1.2, //越大越快，默认1.2
			vertex_Rtop: -30, //运动轨迹最高点top值，默认20
			onEnd: function() {
				flyer.remove(); //移除dom
				//修改header购物车数量图标
				var goods_count = 0;
				var cart_json = JSON.parse( $.cookie( 'cart_menu' ) );
				for( var i=0; i<cart_json.length; i++ ){
					goods_count += Number( cart_json[i].good_count );
				}
				$( '.shopcarCount' ).html( goods_count );
			} //结束回调
		});
	}

	//加入购物车
	$('.addBtn img:first').click(function(e) {
		//保存购物车的json，检查cookie是否有用户购物车的信息
		if($.cookie('cart_menu')) {
			console.log("点击前cart_menu有信息！" + $.cookie('cart_menu'));
			var cart_json = JSON.parse($.cookie('cart_menu'));
		} else {
			console.log("点击前cart_menu没有信息！");
			//新建json
			var cart_json = [];
		}
		
	//飞入购物车效果 插件
	fly_good();

		var good_id = $('.good_detail_r h4').attr('goodID');
		var good_img = $('.good_detail_img img').attr('src');
		var good_name = $('.good_detail_r h4').html();
		var good_price = $('.price').html();
		var good_count = Number( $('.buyCount input').val() );
		console.log( 'choose count -> ' + good_count );

		var good_json = {
			good_id: good_id,
			good_img: good_img,
			good_name: good_name,
			good_price: good_price,
			good_count: good_count,
		}

		//遍历cookie中的购物清单，查看有没有这个id的商品
		var same_good = false;
		var same_good_index = 0;
		for(var i = 0; i < cart_json.length; i++) {
			if(good_id === cart_json[i].good_id) {
				same_good = true;
				same_good_index = i;
				console.log('有相同商品加入购物车');
			}
		}

		//判断购物车是否已经有该商品
		if(same_good) {
			//累加该商品的数量
			cart_json[same_good_index].good_count += good_count;
		} else {
			cart_json.push(good_json);
		}

		console.log("写入前cart_json的内容");
		console.log(cart_json);

		//写入cookie
		//将json转换为字符串
		var cart_json_cookie = JSON.stringify(cart_json);
		//写入Cookie，注册信息保存15天
		$.cookie('cart_menu', cart_json_cookie, { expires: 15 });

		//清空购物清单
		//		$.cookie( 'cart_menu', '', { expires: -1 } );

		console.log("写入后cart_json_cookie的内容");
		console.log($.cookie('cart_menu'));

		

	})

});