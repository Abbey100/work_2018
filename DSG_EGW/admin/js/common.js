//layout_setting ********************************************/
var layout_setting = {
	init:function(){//초기 셋팅에 필요한 설정이나 실행 함수 모음
		layout_setting.role_fixed_btn();

		$(window).resize(function(){
			layout_setting.role_fixed_btn();
		});
	},
	role_fixed_btn:function(){//쓰기버튼 영역의 위치 셋팅
		var vs_height = layout_setting.vs_browser_doc();

		if(vs_height){
			layout_setting.set_fixed_btn();
		}

		$(".body").scroll(function(){
			if ($(".body").scrollTop() >=  ($(".container_area").height() - $(window).height() - 55)) { 
				console.log('End of Window'); 
				layout_setting.set_flow_btn();
			}else{
				layout_setting.set_fixed_btn();
			}
		});

	},
	set_fixed_btn:function(){
		var set_width, set_padding, set_left; 


		if ($(".left_area").length > 0){
			set_left = 255	;				
			set_padding ='10px 40px 10px 255px';	
			set_width = $(document).width()-$('.header').width() - set_left;

			if (set_width < 765){
				set_width = 765;
			}

		}else{			
			set_padding ='10px 40px 10px 40px';
			set_left = 40;
			set_width = $(document).width()-$('.header').width();

			if (set_width < 980){
				set_width = 980;
			}
		}

		$(".role_fixed_btn").css({
			'position':'fixed',
			'left':$('.header').width(),
			'bottom':0,
			'z-index':'2',
			'width':set_width+'px',
			'padding':set_padding

		});

		$(".role_fixed_btn a.btn_list").css({
			'left':set_left+'px'
		});	 
	},
	set_flow_btn:function(){
		$(".role_fixed_btn").css({
			'position':'relative',
			'left':'auto',
			'bottom':'auto',
			'z-index':'1',
			'width':'auto',
			'padding':'10px 0 0 0'
		});

		$(".role_fixed_btn a.btn_list").css({
			'left':0
		});
	},
	vs_browser_doc:function(){
		var w_height = $(window).height();
		var d_height = $(".container_area").height();

		if (w_height < d_height && 50 < (d_height - w_height)){
			return true;			
		}else {
			return false;
		}
	}



};
//*/layout_setting ********************************************/

$(document).ready(function() {	

	// 셀렉트 라이브러리
	$('.selectbox select').selectmenu({
		create: function(event, ui) {
			$(this).selectmenu("option", "appendTo", $(this).parent('.selectbox'));
		},
		open: function(event) {
			var openid = "#"+$(this).attr("id");
			var selectbutton = openid+"-button";
			var selectid = $(selectbutton).attr("aria-labelledby");

			var selectmenu = openid+"-menu";
			$(selectmenu).find(".ui-menu-item-wrapper").removeClass("selected");
			$(selectmenu).find("#"+selectid).addClass("selected");
		}
	});	
	
	$('.board_num select').selectmenu({		
		position: {	my: "bottom-14" }
	});

/* 셀렉트 width */
	$('.selectbox').each(function SelectWidth() {
		
		var selectboxW = $(this).outerWidth();
		
		if( $(this).css('width') !== null ){
			$(this).children('select').selectmenu({ 
				width: selectboxW
			});
		}
	}) 


	//체크박스, 라디오버튼
	//$('input').customInput();

	//GNB메뉴
	$(".gnb_menu.second ul li.drop_down:has(ul)");
	$(".gnb_menu.second ul li.drop_down ul.gnb_menu.third li:has(a.current)").parent().addClass("open");
	$(".gnb_menu.second ul li.drop_down a.second_ttl").each(function() {
		$(this).click(function() {
			$(this).parent().toggleClass("open");
		})
	});

	//LNB메뉴
	$(".lnb_area ul li:has(ul)").addClass("drop_down");
	$(".lnb_area ul ul li:has(.current)").parent().addClass("open");
	$(".lnb_area ul li a.first_ttl").each(function() {
		$(this).click(function() {
			$(this).parent().toggleClass("open");
		})
	});

	//browser height 에 따른 버튼 위치조정 - 요건 정리 시까지 보류
	//layout_setting.init();

	/* 테이블 리스트 세로값 리사이징 가변 처리 */
	if($('.scroll_area_board').length > 0) { // .scroll_area_board 에서만 실행
		var tableListMinusNum = null;
		var tableListHeight = null;
		$(window).resize(function(e) {
			fn_tableListHeight();
		});
		$('.btn_srch_detail').click(function(e) {
			fn_tableListHeight();
		});
		function fn_tableListHeight(){       

			tableListMinusNum = $('.tab_area').outerHeight() +
				$('.srch_statistics').outerHeight(true) + 
				parseInt($('.list_btn_area').css('padding-bottom')) + 
				/*$('.list_btn_area').outerHeight(true) +*/ $('.cont_srch_area.open').outerHeight() + $('.board_list_table').not($('.scroll_area_board')).outerHeight() + $('.paginate_area').outerHeight();
			tableListHeight = $('.content_area').outerHeight() - tableListMinusNum;
			$('.scroll_area_board').css('height', tableListHeight);
		}
		fn_tableListHeight();
	}




});

//게시판 목록 상단 필터 ********************************************/
function toggleLayer(test_layer_filter){
	var objDisplay = document.getElementById(test_layer_filter).style.display;
	if( objDisplay == 'block' ){
		document.getElementById(test_layer_filter).style.display = 'none';
	} else {
		document.getElementById(test_layer_filter).style.display = 'block';
	}
}
//*/게시판 목록 상단 필터 ********************************************/

//게시판 목록 상단 검색 ********************************************/
function toggleLayer(test_layer_srch){

	var objDisplay = document.getElementById(test_layer_srch).style.display;

	if( objDisplay == 'block' ){
		document.getElementById(test_layer_srch).style.display = 'none';
	} else {
		document.getElementById(test_layer_srch).style.display = 'block';
		$(".select_group", $("#"+test_layer_srch)).css({
			'width':'auto'
		});
	}

}
//*/게시판 목록 상단 검색 ********************************************/

//레이어 팝업 닫기버튼 ********************************************/
function popup_close() {
	$('.popup_layer').hide();
}

//상세 서브탭 컨텐츠 show hide ********************************************/
function cu(stat){
	if (stat == 1){ 
		document.all.cu1.style.display = "block"; 
		document.all.cu2.style.display = "none"; 
		document.all.cu3.style.display = "none"; 
	} else if (stat == 2){  
		document.all.cu1.style.display = "none"; 
		document.all.cu2.style.display = "block"; 
		document.all.cu3.style.display = "none"; 
	} else if (stat == 3){  
		document.all.cu1.style.display = "none"; 
		document.all.cu2.style.display = "none"; 
		document.all.cu3.style.display = "block"; 
	} 
}