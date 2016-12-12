$(function() {
	// 加载头部header
	$('#header').load('../heard.html?_=' + Math.random(), function() {
		
		$('.sidebar').remove();
		$('#header').css("height",'245px')		
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

		//计算商品数量,决定购物车是否为空，显示对应的图片
		if(Number($('.shopcarCount').html()) > 0) {
			console.log("大于0")
			$('.cart_over img').attr('src', '../images/list/cart_full_count.png');
			$('.cart_over .show_count').html(Number($('.shopcarCount').html()));
		}
	});

	// 加载尾部footer
	$('#footer').load('../footer.html?_=' + Math.random());


	if($.cookie('one_page_goods') == null) {
		//每页多少个商品
		var every_page = 16;
	} else {
		var every_page = $.cookie('one_page_goods');
	}

	//点击价格排序
	$('.goods_sort button:eq(2)').click(function() {
		var sort_up_boolen = false;
		if( $( 'span', this ).prop( 'class' ) == 'glyphicon glyphicon-chevron-down' ){
			sort_up_boolen = true;
			$( 'span', this ).removeClass( 'glyphicon-chevron-down' ).addClass( 'glyphicon-chevron-up' );
		}else{
			$( 'span', this ).removeClass( 'glyphicon-chevron-up' ).addClass( 'glyphicon-chevron-down' );
		}
		$.get('../data/goods_list.json', function( _data ) {
			$( '.good' ).remove();
			$( '.page' ).remove();
			if( sort_up_boolen ){
				console.log( 'sort_up' );
				get_json( sort_up( _data ) );
			}else{
				console.log( 'sort_down' );
				get_json( sort_down( _data ) );
			}
			//排序，参1：需要排序的对象，参2：根据什么项目排序
			function sort_up( _data ) {
				console.log( _data.phone.length );
				var i = _data.phone.length, j;
				var temp;
				while(i > 0) {
					for(j = 0; j < i - 1; j++) {
						if( Number( _data.phone[j].price ) > Number( _data.phone[j+1].price ) ) {
							temp = _data.phone[j];
							_data.phone[j] = _data.phone[j+1];
							_data.phone[j+1] = temp;
						}
					}
					i--;
				}
				return _data;
			}
			function sort_down( _data ) {
				console.log( _data.phone.length );
				var i = _data.phone.length, j;
				var temp;
				while(i > 0) {
					for(j = 0; j < i - 1; j++) {
						if( Number( _data.phone[j].price ) < Number( _data.phone[j+1].price ) ) {
							temp = _data.phone[j];
							_data.phone[j] = _data.phone[j+1];
							_data.phone[j+1] = temp;
						}
					}
					i--;
				}
				return _data;
			}
			
		}, 'json');
	})
	

	//请求数据，加载商品列表
	$.get('../data/goods_list.json', function(_data) {
		get_json(_data);
	}, 'json');

	function get_json(resp) {
		//商品总数量
		var goodsCount = resp.phone.length;
		$('.goodsCount_info').html(goodsCount);
		//分多少页 every_page每页多少个商品
		var pageCount = Math.ceil(goodsCount / every_page);

		$('.pageCount_info').html(pageCount);
		console.log('pageCount=' + pageCount);
		var btn_html = "";
		for(var i = 1; i <= pageCount; i++) {
			btn_html += '<button type="button" class="btn btn-default page">' + i + '</button>';
		}
		$('.goods_page .btn-group button:first').after(btn_html);

		//当前页码
		var index = 1;
		$('.page_info').html(index);
		//显示第一页
		show_page(index, resp, pageCount, goodsCount, every_page);
		//		$( '.goods_page .btn-group button:first' ).addClass( 'disabled' );

		//点击上下页功能
		$('.search_right .prev').click(function() {
			$('.good').remove();
			if(index > 1) {
				index--;
			}
			console.log('当前页码：' + index);
			$('.page_info').html(index);
			show_page(index, resp, pageCount, goodsCount, every_page);
		})
		$('.search_right .next').click(function() {
				$('.good').remove();
				if(index != pageCount) {
					index++;
					$('.goods_page .btn-group button:first').removeClass('disabled');
				}
				console.log('当前页码：' + index);
				$('.page_info').html(index);
				show_page(index, resp, pageCount, goodsCount, every_page);
			})
			//取消按钮有效性
		$('.goods_page .btn-group .btn').click(function() {
				//点击上下页，滚动到列表顶部
				if($(window).scrollTop() >= 500) {
					var timer = window.setInterval(function() {
						$(window).scrollTop(function() {
							var speed = $(window).scrollTop() / 8;
							$(window).scrollTop($(window).scrollTop() - speed);
						});
						if($(window).scrollTop() <= 440) {
							window.clearInterval(timer);
						}
					}, 30)
				}

			})
			//点击上下页，滚动到列表顶部
		$('.goods_sort ul a').click(function(e) {
			e.preventDefault();
			if($(window).scrollTop() < 430) {
				console.log('up');
				var timer = window.setInterval(function() {
					$(window).scrollTop(function() {
						$(window).scrollTop($(window).scrollTop() + 10);
						if($(window).scrollTop() >= 430) {
							window.clearInterval(timer);
						}
					});
				}, 1)
			}
		})
	}

	//显示第几页的商品
	function show_page(page, resp, pageCount, goodsCount, every_page) {
		//最后一个的商品个数 = 总商品数 - （ 总页数-1）*每页商品数量
		var one_page_count = 0;
		if(page == pageCount) {
			//如果是最后一个的话，商品数量是多少
			one_page_count = goodsCount - (pageCount - 1) * every_page;
		} else {
			one_page_count = every_page;
		}
		console.log('当前页的商品数量：' + one_page_count);
		for(var j = 0; j < one_page_count; j++) {
			var index = j + one_page_count * (page - 1);
			show_good(resp.phone[index].good_id, resp.phone[index].img, resp.phone[index].name, resp.phone[index].price);
		}
		//点击对应商品,加入购物车
		$('.btn-xs').click(function(e) {
			e.stopPropagation();

			//加入购物车cookie
			//保存购物车的json，检查cookie是否有用户购物车的信息,如果有，将购物车写入cookie
			if($.cookie('cart_menu')) {
				console.log("点击前cart_menu有信息！" + $.cookie('cart_menu'));
				var cart_json = JSON.parse($.cookie('cart_menu'));
			} else {
				console.log("点击前cart_menu没有信息！");
				//新建json
				var cart_json = [];
			}

			//飞入购物车效果 插件
			fly_good(this);

			var good_id = $(this).closest('.good').attr('good_id');
			var good_img = $(this).closest('.good').find('img').attr('src');
			var good_name = $(this).closest('.good').find('p').html();
			var good_price = $(this).prev().find('b').html();
			console.log('good_id=' + good_id);

			var good_json = {
				good_id: good_id,
				good_img: good_img,
				good_name: good_name,
				good_price: good_price,
				good_count: 1,
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
				cart_json[same_good_index].good_count++;
			} else {
				console.log('有不同的商品加入购物车');
				cart_json.push(good_json);
			}

			console.log("写入前cart_json的内容");
			console.log(cart_json);

			//写入cookie
			//将json转换为字符串
			var cart_json_cookie = JSON.stringify(cart_json);
			//写入Cookie，注册信息保存15天
			$.cookie('cart_menu', cart_json_cookie, {
				expires: 15
			});

			//清空购物清单
			//$.cookie( 'cart_menu', '', { expires: -1 } );

			console.log("写入后cart_json_cookie的内容");
			console.log($.cookie('cart_menu'));

			//动态显示购物车数量
			var goods_count = 0;
			var cart_json = JSON.parse($.cookie('cart_menu'));
			for(var i = 0; i < cart_json.length; i++) {
				goods_count += Number(cart_json[i].good_count);
			}
			$('.shopcarCount').html(goods_count);

			//飞入购物车 动画效果
			function fly_good(self) {
				var flyer = $(self).closest('.good').find('img').clone().css({
					'border-radius': '50%',
					'z-index': 9000,
					'width': 195,
					'height': 195,
				});
				$('body').append(flyer);

			}
		});
	/*************************************************************/
		// 点击对应商品,跳转到对应商品的详情页面
		$('.good').click(function() {
			var good_id = $(this).attr('good_id');
			location.href = 'detail.html?goodID=' + good_id;
		})

	}

	//加载一个商品的方法
	function show_good(id, src, name, price) {
		var goods_html = '<div class="good fl" good_id="' +
			id + '"> <img src="../img/goods_detail/list/' +
			src + '" /> <p style="color: #777;">' +
			name + '</p> <p> <span class="price">商城价：<b>￥' +
			price + '</b></span> <button type="button" class="btn btn-default btn-xs">加入购物车</button> </p> </div>';

		$('.goods_list').append(goods_html);

	}

	/*自动滚动的购物车图标*/
	$(window).scroll(function() {
		var scrollTop = $(window).scrollTop();
		var clientHeight = $(window).height() * 0.8;

		$('.cart_over').animate({
			top: scrollTop + clientHeight,
		}, 26);

	})

})