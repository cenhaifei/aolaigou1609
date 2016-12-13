
function CreateHtml(_baseDom){
	var _defaluts = {
		url:'',
		data:null,
	};
	var $dom = $(_baseDom);
	// var _response = [
	// 	{"caption":'农资',"url":'jd.com',"id":1},
	// 	{"caption":'家居',"url":'jd.com',"id":2},
	// 	{"caption":'家具',"url":'jd.com',"id":3},
	// 	{"caption":'家装',"url":'jd.com',"id":4},
	// 	{"caption":'厨具',"url":'jd.com',"id":5},
	// ];
	$.get(_defaluts.url,function(_response){

		console.log(typeof _response);
		var _data = null;
		if (typeof _response == 'string') {
			_data = window.eval('('+ _response +')');
		}else if (typeof _response == 'object') {
			_data = _response;
		}else{
			return false;
		}
		if (_data && typeof _data == 'object') {
			_defaluts.data = _data instanceof Array ? _data : [_data];
		}

		$.each(_defaluts.data,function(_index,_ele){
			if($dom.attr('dk-for') === 'true'){
				var $cloneDom = $dom.clone(true).appendTo($dom.parent());
				var $Li = $('[dk-forli]',$cloneDom);
				$.each(_ele[$dom.attr('dk-bind')],function(find,fle){
					if($Li.attr('dk-forli') === 'true'){
						var $cloneForli = $Li.clone(true).appendTo($Li.parent());
						var $fiBind = $('[dk-bind]',$cloneForli);
						$.each($fiBind,function(bind,ble){
							$(ble).text(fle[$(ble).attr('dk-bind')]);
							$(ble).attr('href',fle[$(ble).attr('dk-href')])
						})
					}else{
						return false;
					}
				});
				$Li.remove();
			}else{
				return false;
			}
	
		})
		$dom.remove();
	})
}





























// var dkFrm = function(dkScope){
// 	var dkForElements = $('[dk-for]');
// 	if(!dkForElements[0]){
// 		return false;
// 	}
// 	$.each(dkForElements, function(_index, _element){
// 		var dkForAttr = $(_element).attr('dk-for'); // dkModels
// 		if(dkScope[dkForAttr]){
// 			// dkScope[dkForAttr] === dkScope.dkModels
// 			for(var i = 0; i < dkScope[dkForAttr].length; i++){
// 				var $obj = dkScope[dkForAttr][i];
// 				var $subNav = $obj['subNav'];
// 				console.log($subNav);
// 				//$('<a></a>').text($obj.title).attr('href', $obj.url).attr('flag', $obj.id).appendTo(dkForElements);
// 				var $clone = $(_element).clone().insertAfter($(_element));
// 				var $dkBind = $('[dk-bind]', $clone).attr('dk-bind'); // aa.a
// 				var $dkHref = $('[dk-href]', $clone).attr('dk-href');
// 				$('[dk-bind]', $clone).text($obj['aa.a']);//$obj.title
// 				$('[dk-href]', $clone).attr('href', $obj[$dkHref]);//$obj.url
// 			}
// 			$(_element).remove();
// 		}			
// 	})
						
// }

$(function(){
	var $dkHeader = $('dk-header');
	if($($dkHeader).attr('replace') === 'true'){
		$('<div></div>').load($dkHeader.attr('url') + '?_' + Math.random()).insertAfter($dkHeader);
		$dkHeader.remove();
	}else{
		$dkHeader.load($dkHeader.attr('url') + '?_' + Math.random());
	}
	
}) 