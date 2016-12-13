function CreateElement(_bDom,_obj){
	var _navs = {
		url:_obj,
		data:null
	}
	var $bDom = $(_bDom);

	$.get(_navs.url, function(_response){
		var _data = null;
		if(typeof _response == "string"){
			_data = window.eval('('+_response+')');
		}else if(typeof _response == "object"){
			_data = _response;
		}else{
			return false;
		}
		
		if(_data && typeof _data == "object"){
			_navs.data = _data instanceof Array ? _data : [_data];
		}
		
		$.each(_navs.data, function(_index, _element){
			if($bDom.attr('dk-for') === 'true'){
				var $cloneBDom = $bDom.clone(true).appendTo($bDom.parent());
				var $forli = $('[dk-forli]',$cloneBDom);
				$.each(_element[$bDom.attr('dk-bind')], function(_fInd,_fEle) {					
					if($forli.attr('dk-forli') === 'true'){
						var $cloneForli = $forli.clone(true).appendTo($forli.parent());
						var $findBind = $('[dk-bind]',$cloneForli);
						$.each($findBind,function(_bInd,_bEle){
							$(_bEle).text(_fEle[$(_bEle).attr('dk-bind')]);
							$(_bEle).attr('href',_fEle[$(_bEle).attr('dk-href')])
						})
					}else{
						return false;
					}
				});
				$forli.remove();
			}else{
				return false;
			}
		})
		$bDom.remove();
	})
}