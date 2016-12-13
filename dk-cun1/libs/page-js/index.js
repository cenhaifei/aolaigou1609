var dkFrm = function(dkScope){
	var dkForElements = $('[dk-for]');
	if(!dkForElements[0]){
		return false;
	}
	$.each(dkForElements, function(_index, _element){
		var dkForAttr = $(_element).attr('dk-for'); // dkModels

		if(dkScope[dkForAttr]){
			// dkScope[dkForAttr] === dkScope.dkModels
			for(var i = 0; i < dkScope[dkForAttr].length; i++){
				var $obj = dkScope[dkForAttr][i];
				var $subNav = $obj['subNav'];
				console.log($subNav);
				//$('<a></a>').text($obj.title).attr('href', $obj.url).attr('flag', $obj.id).appendTo(dkForElements);
				var $clone = $(_element).clone().insertAfter($(_element));
				var $dkBind = $('[dk-bind]', $clone).attr('dk-bind'); // aa.a
				var $dkHref = $('[dk-href]', $clone).attr('dk-href');
				$('[dk-bind]', $clone).text($obj[$dkBind]);//$obj.title
				$('[dk-href]', $clone).attr('href', $obj[$dkHref]);//$obj.url
			}
			$(_element).remove();
		}			
	})
						
}

$(function(){
	var $dkHeader = $('dk-header');
	if($($dkHeader).attr('replace') === 'true'){
		$('<div></div>').load($dkHeader.attr('url') + '?_' + Math.random()).insertAfter($dkHeader);
		$dkHeader.remove();
	}else{
		$dkHeader.load($dkHeader.attr('url') + '?_' + Math.random());
	}


	// var uls = [1,1,1,1,1];
	//页面上的字符串变量和 js 定义的对象不能通信
	// var dk = {
		
	// }

	// $.get('libs/data/navs.txt?_=' + Math.random(), function(response){
	// 	dk.navs = window.eval('('+ response +')');
	// 	//通过属性选择器把选取目标对象
	// 	//jQuery 选择器返回的是 jQuery 数组对象
	// 	var $dkFors = $('[dk-for]'); 
	// 	$.each($dkFors, function(index, dkfor){
	// 		//$(dkfor) => 元素选择器
	// 		var $directive = $(dkfor).attr('dk-for').split(' ');
	// 		// uls, models
	// 		var $lastSet = $directive[$directive.length - 1];
	// 		var $firstSet = $directive[0];
	// 		// 如果属性名称不存在于对象则返回结果为 undefined
	// 		var $set = dk[$lastSet] //dk.uls;
	// 		if($set){
	// 			$.each($set, function(index){
	// 				var firstSet = $set[index];
	// 				console.log(firstSet);
	// 				$(dkfor).clone().appendTo($(dkfor).closest('div'));
	// 				// if(index >= $set.length - 2){
	// 				// 	return false;
	// 				// }
	// 			});
	// 			$(dkfor).remove();
	// 		}
	// 	})		
	// });

	
}) 