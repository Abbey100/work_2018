/* author DomFam */
$(document).ready(function(e) {
    MainCompntHeight();
    SquareBoxSize();
/* 기본 버튼 클릭 */
/*
var currentBtn = null;
$('.container_box>.btn_area .btns a').on('mousedown', function(){
    currentBtn = $(this);
    currentBtn.addClass('active');
    setTimeout(function(){
        console.log(currentBtn);
        currentBtn.removeClass('active');
    }, 200);
});
*/
/* 테이블 리스트 세로값 리사이징 가변 처리 */
if($('.content_lst').length > 0) { // .content_lst 클래스가 있을경우만 실행
    var tableListBoxMinusNum = null;
    var tableListHeight = null;
    $(window).resize(function(e) {
        fn_tableListHeight();
    });
    function fn_tableListHeight(){
        tableListBoxMinusNum = $('.detail_srch_wrap').outerHeight() + $('.title_area').outerHeight() + $('.contact_add_area').outerHeight() + $('.container_box>.btn_area').outerHeight() + $('.paginate_box').outerHeight() + $('.content_lst_head').outerHeight();
        tableListHeight = $('body').outerHeight() - tableListBoxMinusNum;
        $('.content_lst_body').css('height', tableListHeight);
    }
    fn_tableListHeight();
}


/* 나눠보기를 제외한 뷰페이지 컨텐츠 세로 사이즈 조절 */
if($('.view_body_contents').length > 0 && $('.mail_list_vertical').length == 0) {
    $(window).resize(function(e) {
        emailViewContHeight();
    });
    function emailViewContHeight(){
        $('.view_body_contents').css('height', $('body').outerHeight() - $('.container_box>.btn_area').outerHeight() - $('.title_area').outerHeight() - $('.detail_srch_wrap').outerHeight());
    }
    emailViewContHeight();
}

if($('.calendar_list_box').length > 0 ) {
    $(window).resize(function(e) {
        calendarViewContHeight();
    });
    function calendarViewContHeight(){
        $('.calendar_list_box').css('height', $('body').outerHeight() - $('.container_box>.btn_area').outerHeight() - $('.title_area').outerHeight() - $('.detail_srch_wrap').outerHeight());
    }
    calendarViewContHeight();
}



/* 메일 세로 보기 형태일때 세로 사이즈 조절 */
if($('.mail_list_vertical').length > 0) {
    emailVrtRightHeight();
    $(window).resize(function(e) {
        emailVrtRightHeight();
    });
    function emailVrtRightHeight(){
        $('.mail_list_vertical').css('height', $('.container_wrap_left').outerHeight());
        $('.view_body_contents').css('height', $('.container_wrap_left').outerHeight() - $('.container_box>.btn_area.type2').outerHeight());
    }
}


/*  협업룸 세로 보기 형태일때 세로 사이즈 조절 */
if($('.list_vertical').length > 0) {
    coworkVrtRightHeight();
    $(window).resize(function(e) {
        coworkVrtRightHeight();
    });
    function coworkVrtRightHeight(){
        $('.list_vertical').css('height', $('.container_wrap_left').outerHeight());
        $('.detail_area').css('height', $('.list_vertical').outerHeight() - $('.top_area').outerHeight()-               $('.detail_title').outerHeight()- 53);
    }
}



/********************************************************************/

/********************************************************************
 * portlet Height // 2017/01/10 by ek100@handysoft.co.kr
 ********************************************************************/

/********************************************************************/


function MainCompntHeight() { // 메인화면에서의 각 구성 요소(게시물~등)의 높이


    var $BodyCont = $('.body_contents'); // 가운데 영역

    var $LeftArea = $('.left');    // 가운데 왼쪽영역
    var $RightArea = $('.right');  // 가운데 오른쪽 영역

    var LSCount = $LeftArea.children('.box_area').length; // 가운데 왼쪽 영역 높이
    var RSCount = $RightArea.children('.box_area').length; // 가운데 오른쪽 영역 높이

    var LASTBox = $LeftArea.children('.last_cont'); // LAST 높이
    var SquareBox = $RightArea.children('.square'); // square 높이

    /* 가운데 영역 width 전체로 사용하는 요소 */
    var $Banner = $('.banner'); // 배너
    var $WeekCal = $('.w_cal_area'); // 주간일정
    var HasBanner = $BodyCont.children().hasClass('banner'); // 배너를 가지고 있음
    var HasWeek = $BodyCont.children().hasClass('w_cal_area'); //주간달력을 가지고 있음


    /* 윈도우에서 배너와 달력을 빼고 "보이는" 영역 */

    var TotalHeight;

    if (HasBanner){  // 배너가 있고,
        if (HasWeek) {  // 달력도 있다면,
            BHeight = $Banner.outerHeight();
            WHeight = $WeekCal.outerHeight();
        } else { // 달력은 없다면,
            BHeight = $Banner.outerHeight();
            WHeight = 0; console.log('되냐?');
        }
    } else {
        if (HasWeek) { // 달력만 있다면
            BHeight = 0;
            WHeight = $WeekCal.outerHeight();
        } else { // 아무것도 없다면
            BHeight = 0;
            WHeight = 0;
        }
    }
    TotalHeight = $BodyCont.outerHeight() - BHeight - WHeight; // 윈도우에서 배너, 달력 제외한 보이는 영역

    /* 컨텐츠 포틀릿 의 css 높이로 계산했을때의 왼쪽&오른쪽 영역 높이 */
    LeftContH = LSCount * 248 + LSCount * 10 ; // 왼쪽 영역 높이
    RightContH = RSCount * 248 + RSCount * 10 ; // 오른쪽 영역 높이

    if ( 768 < $(window).outerHeight() ){ // 윈도우의 크기가 768를 넘을 경우,

        if ( RSCount < LSCount ) { // 왼쪽 요소의 갯수가 더 많다면,
            $LeftArea.css('height', TotalHeight ); // 왼쪽은 보이는 면적만큼 늘리고
            $RightArea.css('height', $LeftArea.outerHeight()); // 오른쪽은 왼쪽에 맞춤

        } else if ( RSCount > LSCount ) { // 오른쪽 요소의 갯수가 더 많다면,
            $RightArea.css('height', TotalHeight ); // 오른쪽은 보이는 면적만큼 늘리고
            $LeftArea.css('height', $RightArea.outerHeight()); // 왼쪽은 오른쪽에 맞춤

        } else { // 같으면, 왼쪽 오른쪽 모두 보이는 면적에 맞춰 늘림
            $LeftArea.css('height',  TotalHeight );
            $RightArea.css('height', TotalHeight );
        }

        // LAST와 square 박스 모두, 형제요소 포틀릿의 높이를 제한 나머지 영역에 늘려 맞춤
        LASTBox.css('height', $LeftArea.height() - ( (LSCount - 1) * 248 ) -  ( (LSCount - 1)  * 10 ) - 18);
        SquareBox.css('height', $RightArea.height() - ( (RSCount - 1) * 248 ) -  ( (RSCount - 1)  * 10 ) - 18 );

    } else { // 768 보다 작을 경우,

        if (LeftContH < TotalHeight ){ // 768보다 작은데도, 보이는 면적이 포틀릿 기본 높이의 합보다 크다면(빈 공간이 있다면),

            $LeftArea.css('height',  TotalHeight ); // 왼쪽 영역은 보이는 면적만큼 키우고,
            if ( RightContH < TotalHeight) { // 오른쪽도 보이는 면적보다 작으면,
                $RightArea.css('height',  TotalHeight ); // 오른쪽도 보이는 영역에 맞추어 키움
            }
            // 각 LAST, square 박스는 영역의 나머지 영역 모두에 채워 늘림
            LASTBox.css('height', $LeftArea.height() - ( (LSCount - 1) * 248 ) -  ( (LSCount - 1)  * 10 ) - 18 );
            SquareBox.css('height', $RightArea.height() - ( (RSCount - 1) * 248 ) -  ( (RSCount - 1)  * 10 )- 18 );

        } else {  // 768 보다 작긴하지만 영역 요소의 합이 보이는 영역보다는 큰 경우,

        if ( RSCount < LSCount ) { // 왼쪽 요소의 갯수가 오른쪽 보다 많으면,
            $RightArea.css('height', $LeftArea.outerHeight()); // 오른 쪽은 왼쪽의 높이에 맞추고
            SquareBox.css('height', $RightArea.height() - ( (RSCount - 1) * 248 ) -  ( (RSCount - 1)  * 10 ) );
            //스퀘어는 늘림

        } else if ( RSCount > LSCount ) { // 오른쪽 요소의 갯수가 왼쪽보다 많으면,

            $LeftArea.css('height', $RightArea.outerHeight()); // 왼쪽은 오른쪽에 맞추고,
            LASTBox.css('height', $LeftArea.height() - ( (LSCount - 1) * 248 ) -  ( (LSCount - 1)  * 10 ) - 100 );
            // LAST를 늘림
        } else { // 양쪽의 요소가 같다면
            $LeftArea.css('height',  LSCount * 248 ); // 왼쪽, 오른쪽의 높이는 각 요소의 기본 높이 합으로 유지
            $RightArea.css('height',  RSCount * 248 );
        }

        }
    }


} MainCompntHeight();

/*  Square layerpop 위치 조절 */

      var layerLeft = $( '.btn_ttl_menu' ).outerWidth() + $( '.layer_pop.ttl_menu' ).outerWidth() + 15 ;
  $( document ).ready( function() {
        $( '.layer_pop.ttl_menu' ).offset( { left: layerLeft , top: 45 } );
      } );


/*  기안기 세로 사이즈 조절 */
if($('.pop_container').length > 0) {
    apprvlVrtRightHeight();
    $(window).resize(function(e) {
        apprvlVrtRightHeight();
    });
    function apprvlVrtRightHeight(){
        $('.pop_container').css('height', $(window).outerHeight() -
         $('.title_area').outerHeight() -
         $('.detail_btn_area').outerHeight() -
          $('.btn_area').outerHeight() - 17);
        $('.apprvl_write_lft').css('height', $('.pop_container').outerHeight() - $('.btn_flip_right').outerHeight() - 10);
        $('.filelist_table').css('height', $('.apprvl_write_rgt').outerHeight() -
          $('.fnt_bold.mg_lft_10').outerHeight() -
           $('.add_filebg').outerHeight() -
           $('.btn_box').outerHeight() -
            $('.wfw_file_box_popup').outerHeight() -
              $('.filelist_popup').outerHeight() -
               $('.content_lst.apprvl_write_tbl').outerHeight());
    }
}

    /*  업무상세정보 세로 사이즈 조절 */
if($('.pop_container').length > 0) {
    WorkViewHeight();
    $(window).resize(function(e) {
        WorkViewHeight();
    });
    function WorkViewHeight(){
        $('.pop_container').css('height', $(window).outerHeight() -
         $('.title_area').outerHeight() -
         $('.detail_btn_area').outerHeight() -
          $('.btn_area').outerHeight());
        $('.view_area').css('height', $('.pop_container').outerHeight() -
           $('.subj_box').outerHeight()) ;
        $('.popup_rgt .contents').css('height', $('.pop_container').outerHeight() -
           $('.tab_box').outerHeight() - $('.filter_area').outerHeight() - $('.search_area').outerHeight() - 26) ;
    }
}

/* 팝업 세로 사이즈 조절 */

if($('.tab_ctt').length > 0) {
    popHeight();
    $(window).resize(function(e) {
        popHeight();
    });
    function popHeight(){
        $('.tab_ctt').css('height', $(window).outerHeight() -
         $('.title_area').outerHeight() - $('.pop_contents>.tab_area').outerHeight() - $('.footer').outerHeight() - 18  );
    }
}

 /* 팝업 세로 사이즈 조절: popup_inner */

if($('.popup_inner').length > 0) {
    PopupInnerHeight();
    $(window).resize(function(e) {
        PopupInnerHeight();
    });
    function PopupInnerHeight(){
        $('.popup_inner').css('height', $(window).outerHeight() - $('.title_area').outerHeight()  );
    }
}


/* 메일 읽기 > 보낸사람 클릭시 트리거 */
var mailViewSenderBox = null;
$('.mail_sender .sender .btn_trig').on('click', function(){
    mailViewSenderBox = $(this).parents('.mail_sender');
    if(mailViewSenderBox.hasClass('on')){
        mailViewSenderBox.removeClass('on');
    }else {
        mailViewSenderBox.addClass('on');
    }
});

/* 메일읽기 > 파일첨부 클릭시 트리거 */
var mailViewFileListBox = null;
$('.add_file_list .btn_trig').on('click', function(){
    mailViewSenderBox = $(this).parents('.add_file_list');
    if(mailViewSenderBox.hasClass('on')){
        mailViewSenderBox.removeClass('on');
    }else {
        mailViewSenderBox.addClass('on');
    }
});


/*일정 체크박스*/
$('.calendar_tree li span:first-child').click(function(){

    var checkbox_off_h = "checkbox_off_h";
    var snb_todo_bg = "todo_color";

    if($(this)[0].childNodes[0].checked == true){
        $(this)[0].childNodes[0].checked = false;
        $(this).addClass(checkbox_off_h);
        if($(this).hasClass('snb_todo')){
            $(this).addClass(snb_todo_bg);
        }else {
            var toggle_className = $(this)[0].className.substring(3,10);
            $(this).addClass(toggle_className);
        }
    } else {
        $(this)[0].childNodes[0].checked =true;
        $(this).removeClass(checkbox_off_h);
        if($(this).hasClass('snb_todo')){
            $(this).removeClass(snb_todo_bg);
        }else {
            var toggle_className = $(this)[0].className.substring(3,10);
            $(this).removeClass(toggle_className);
        }
    }
});

/* 상단 상세 검색 */
$('.btn_detail_srch a').on('click', function(){
    $(this).parent().toggleClass('on');
    $('.detail_srch_wrap').toggleClass('on');
    if($('.content_lst').length > 0) { fn_tableListHeight() }
    if($('.mail_list_vertical').length > 0) { emailVrtRightHeight() }
    if($('.view_body_contents').length > 0 && $('.mail_list_vertical').length == 0) { emailViewContHeight() }
    if($('.calendar_list_box').length > 0 ) { calendarViewContHeight() }
})

$('.btn_detail_srch_flip').on('click', function(){
    $(this).toggleClass('on');
    $('.detail_srch_wrap').toggleClass('on');
    if($('.content_lst').length > 0) {  fn_tableListHeight() }
    /*
    if($('.mail_list_vertical').length > 0) { emailVrtRightHeight() }
    if($('.view_body_contents').length > 0 && $('.mail_list_vertical').length == 0) { emailViewContHeight() }
    if($('.calendar_list_box').length > 0 ) { calendarViewContHeight() }
    */
})

$('.btn_cal_srch a').on('click', function(){
    $(this).parent().toggleClass('on');
    $('.detail_srch_wrap').toggleClass('on');
    if($('.content_lst').length > 0) { fn_tableListHeight() }
    if($('.mail_list_vertical').length > 0) { emailVrtRightHeight() }
    if($('.view_body_contents').length > 0 && $('.mail_list_vertical').length == 0) { emailViewContHeight() }
    if($('.calendar_list_box').length > 0 ) { calendarViewContHeight() }
})

/* 스퀘어 컨텐츠 박스 height 설정 */
function SquareBoxSize() {
    $('.square .box_area_content').css('height', $('.square').outerHeight() - $('.title_area').outerHeight() - 25);
}SquareBoxSize();

}); // ready

/*왼쪽메뉴 접었다펴기*/
function toggle_div(ttl, divName){
    if(divName){
        var contentBox =$("#"+divName);
    }

    if($(ttl).hasClass('minicalendar')){
    	$('.minicalendaron').css("display","none");
    	$('.minicalendaroff').css("display","block");

    }else if($(ttl).hasClass('minicalendaroff')){
    	$('.minicalendaron').css("display","block");
    	$('.minicalendaroff').css("display","none");

    }else if($(ttl).hasClass('tree_off')){
      	$(ttl).removeClass('tree_off');
      	contentBox.css("display","block");

    }else {
    	$(ttl).addClass('tree_off');
        contentBox.css("display","none");
    }

}

/* frame:right 접었다펴기*/
        var right_btn = close;

    function toggle_RFrame() {
        if (right_btn == close) {
            top.parent.document.getElementById('main').cols = '*, 0';
            right_btn = open;
        }
        else {
            top.parent.document.getElementById('main').cols = '*,241';
            right_btn = close;
        }
    }

 // frame:right

/* frame:left 접었다펴기*/
       var left_btn = close;

function toggle_LFrame() {
    if (left_btn == close) {
        parent.document.body.cols = "0, *";
        left_btn = open;
    }
    else {
        parent.document.body.cols = "221, *";
        left_btn = close;
    }
}
// frame:left
