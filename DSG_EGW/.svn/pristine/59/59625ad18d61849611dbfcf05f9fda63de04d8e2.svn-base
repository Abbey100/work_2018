/********************************************************************
 * common variable
 ********************************************************************/
var start_menu;
var showOrHide = true;
/********************************************************************/

/********************************************************************
 * Document READY
 ********************************************************************/
$(function() {
	start_menu = top.frames['Start'].location.href;
	
	if(bGPRelate) {
		makeBmsSession(szKEY);
	}
});
/********************************************************************/

/********************************************************************
 * Normal Functions
 ********************************************************************/
function toggle_menu_bg(select_id, parent_ui_id){
	$("#"+parent_ui_id+" li a").each(function(i){
		if($(this).attr("id") == select_id)
			$(this).parent().addClass('link_selct');
		else 
			$(this).parent().removeClass('link_selct');
	});
}

function clear_menu_bg(){
	$("div.nav_area ul.menu li a").each(function(i){
		$(this).parent().removeClass('menu_on');
	});
}

function switch_main(url){
	top.frames['Start'].location=url;
	if(url == '/jsp/main/main.jsp'){
		clear_menu_bg();
		top.frames['Comz'].getRecently();
		
		if($('#normal_menu').is(':hidden')){
			switch_menu('normal_menu');
		}
	}
}
/*
function switch_menu(show_menu){
	$('.nav_area ul').each(function(i, el) {
		if(el.id){
			if(el.id == show_menu){
				if($(this).is(':hidden')){
					$('#normal_menu').hide();
					$(this).slideDown();
				} else {
					$(this).hide();
					$('#normal_menu').slideDown();
				}
			} else {
				$(this).hide();
			}
		}
	});
}
*/
function logout() {
	$.ajax({
		async : false,
		url : '/jsp/org/login/LogOutEx.jsp',
		type : 'POST',
		data : {
			K : szKEY
		}
	});
	
	if(typeof use_cop != 'undefined' && use_cop){
    	$.ajax({
			async : false,
			url : '/hcop/portal/sso.psml',
			type : 'POST',
			data : {
				acton : 'SSO_OUT',
				EMP : emp_code
			}
		});
    }

	//sns
	if(typeof use_sns != 'undefined' && use_sns)
	{
		$.ajax(
		{
			async : false,
			url : '/sns/logout_so.action',
			type : 'GET',
			data : {}
		});
	}
	
	deletePreCookies();

	top.location.href = '/index.html';
}

function changeAdditionalUser(UID){
	deletePreCookies();

	//겸직일 경우 : sns session delete
	if(typeof use_sns != 'undefined' && use_sns)
	{
		$.ajax(
		{
			async : false,
			url : '/sns/logout_so.action',
			type : 'get',
			data : {},
			success : function(){}
		});
	}
	if(typeof GWLANG != 'undefined'){
		setCookie("GWLANG", GWLANG, false, "/");
	}

	top.location='/jsp/org/login/LoginOtherOfficer.jsp?K='+szKEY +'&UID='+UID;
}

function deleteCookie(name, path, domain) {
	if (getCookie(name)) {
		document.cookie = name + "=" + ((path) ? "; path=" + path : "")
				+ ((domain) ? "; domain=" + domain : "")
				+ "; expires=Thu, 01-Jan-1970 00:00:01 GMT";
	}
}

function deletePreCookies() {
	deleteCookie("key", "/");
	deleteCookie("userID", "/");
}

function setCookie(name, value, expires, path, domain, secure) {
	var curCookie = name + "=" + escape(value)
			+ ((expires) ? "; expires=" + expires.toGMTString() : "")
			+ ((path) ? "; path=" + path : "")
			+ ((domain) ? "; domain=" + domain : "")
			+ ((secure) ? "; secure" : "");
	document.cookie = curCookie;
}

function getCookie(name) {
	var dc = document.cookie;
	var prefix = name + "=";
	var begin = dc.indexOf("; " + prefix);
	if (begin == -1) {
		begin = dc.indexOf(prefix);
		if (begin != 0)
			return null;
	} else
		begin += 2;
	var end = document.cookie.indexOf(";", begin);
	if (end == -1)
		end = dc.length;
	return unescape(dc.substring(begin + prefix.length, end));
}
/*
function toggle_hide_memu() {
	$('li.rim_hidden').each(function() {
		$(this).toggle(200);
	});
}
*/
function NotifyClicknView ( nType , szOpenUrl )
{
	var url_usu_start = szOpenUrl.indexOf('USU=');
	if (url_usu_start != -1)
	{
		var url_usu_end = szOpenUrl.indexOf('&', url_usu_start);
		var url_usu = szOpenUrl.substring(url_usu_start + 4, url_usu_end);
		if(UserID != url_usu) {
			//alert('사용자 정보가 동일하지 않습니다.');
			return;
		}
	}
    var width  = 810;
    var height = 510;
    var winName = 'NotifyClickView';
    this.focus() ;
    // belows are added by qlink 2002.07.20
    var gpType = new Array("300","400","410","420","500","600","610","620","630","640");
    var baseUrl = '';

    for(var index=0; index < gpType.length; index++)
    {
        if(gpType[index] == nType)
        {
        baseUrl = BWURL;
        break;
        }
    }
    szOpenUrl = baseUrl + szOpenUrl;
    /////////////////////////////////////////////////////////////////////////////
    NotifyClicknViewCommon ( nType , szOpenUrl, width, height, winName );
}

function NotifyClicknViewCommon ( nType , szOpenUrl, width, height, winName )
{
    if (nType == '1')//게시판인경우
    {
        width = 774;
        height = 610;
    }
    var left = screen.width/2 - width/2;
    var top  = screen.height/2 - height/2;

    if(szOpenUrl.indexOf("hstcltex.mwf")>=0)
    {
        left=2000;
        width=1;
        height=1;
    }

    // 2006.3.10 GW개발팀의 요청으로 추가
    if (szOpenUrl.indexOf("hcltex.jsp")>=0)
    {
        var idx = szOpenUrl.indexOf("APPRDEPTID");
        if(idx>=0){
            szOpenUrl = getReplaceArgURL(szOpenUrl, 'APPRDEPTID=' + '65537.' + UserDeptID, 'APPRDEPTID=','&');
        } else {
            szOpenUrl = szOpenUrl + "&APPRDEPTID=" + "65537." + UserDeptID;
        }
    }

    //2005.4.15 중복호출 방지
    if (!getCookie("ClickView")){
        nm1 = "notifyview = window.open('"+szOpenUrl+"&K=" + szKEY+"','"+ winName + ((new Date()).getTime()) +"','top=" + top + ",left=" + left + ",width=" + width + ",height=" + height + ",scrollbars=yes,resizable=yes,menubar=no');  if ( notifyview != null ) notifyview.focus();" ;
        setTimeout(nm1,100);

        setCookie("ClickView", szOpenUrl+"&K="+szKEY);
        var remove = "deleteCookie('ClickView');";
        setTimeout(remove, 500);
    }
}
/********************************************************************
 * Menu Functions
 ********************************************************************/
function popup_link(url, win_name, width, height) {
	var left = screen.width / 2 - width / 2;
	var top = screen.height / 2 - height / 2;
	var popup_win = window.open(url, win_name, 'left=' + left + ',top=' + top + ',width=' + width + ',height=' + height + ',scrollbars=yes, resizable=yes, menubar=yes');
	if (popup_win) popup_win.focus();
}
/********************************************************************/

function makeBmsSession(K) {
	
	var dataValue = {"K":K};
	var url = "/bms/login.cmmn";	
	jQuery.ajax({
		type:"post",
		cache:false,
		async:false,
		url:url,
		data:dataValue,
		success: function(data, status){
			isWorking = false
		}
	});
}

var cur_menu_page = 1;
var link_flag = false;	
var more_flag = true;
var admin_flag = false;
var defultEnableMenu = "menu_area";
function toggleMenu(menuClass){
	var enableMenu = false;
	var visible = false;
	$(".toggle_menu_group").each(function(){
		if($(this).hasClass(menuClass)){
			visible = $(this).toggle().is(":visible");
			enableMenu = this;
		}else{
			$(this).hide();
		}
	});
	if(!visible){
		enableMenu = $(".toggle_menu_group."+defultEnableMenu); 
		$(enableMenu).show();
	}
	arrangeMenu(enableMenu);
	
	return enableMenu;
}
function getEnabledMenu(){
	var enableMenu = false;
	$(".toggle_menu_group").each(function(){
		if($(this).is(":visible")){
			enableMenu = this;
			return;
		}
	});
	return enableMenu;
}
function arrangeMenu(enableMenu){
	var menu_w = $('ul', enableMenu).outerWidth(); // 현재 메뉴 전체 width
	var header_w = $("#header").outerWidth();	//전체
	var logo_w = $("#header h1").outerWidth();	//로고
	var info_w = $(".info_wrap").outerWidth();	//info_wrap
	var more_w = $(".menu_more", enableMenu).outerWidth(); // more width
	var cur_menu_left = getPixelForInt($('ul', enableMenu).css('left')); // 현재 메뉴 left 값
	var menu_view_w = header_w - logo_w - info_w;
	
	var more_obj = $(".menu_more", enableMenu);
if(window.console)window.console.log("arrangeMenu menu_w["+menu_w+"], menu_view_w["+menu_view_w+"], more_w["+more_w+"]");		
	if(cur_menu_left > -1 && menu_w < menu_view_w){
		$(more_obj).hide();
	}else{
		$(more_obj).css("left", menu_view_w - more_w);
		$(more_obj).show();
	}
}
$(document).ready(function(){
	var enableMenu = toggleMenu("menu_area");
	
	arrangeMenu(enableMenu);
});			

$(window).bind('resize', function(){
	var enabledMenu = getEnabledMenu();
	
	arrangeMenu(enabledMenu);
}); 
function getPixelForInt(pixel){
if(window.console)window.console.log("getPixelForInt pixel["+pixel+"]");	
	if(pixel && pixel.indexOf("px") > -1){
		return parseInt(pixel.replace("px",""), 10);
	}
	return 0;
}
function moremenu_open(){			
	var enabledMenu = getEnabledMenu();
	var header_w = $("#header").outerWidth();	//전체
	var logo_w = $("#header h1").outerWidth();	//로고
	var info_w = $(".info_wrap").outerWidth();	//info_wrap
	var menu_w = $("ul", enabledMenu).outerWidth(); // 현재 메뉴 전체 width
	var menu_length = $("li", enabledMenu).length; // 전체 메뉴 갯수
	var more_w = $(".menu_more", enabledMenu).outerWidth(); // more width
	var menu_view_w = header_w - logo_w - info_w; // 메뉴가 보여질수 있는 영역
if(window.console)window.console.log("moremenu_open header_w["+header_w+"], logo_w["+logo_w+"], info_w["+info_w+"], menu_w["+menu_w+"],menu_length["+menu_length+"], more_w["+more_w+"], menu_view_w["+menu_view_w+"]");
	var cur_menu_left = getPixelForInt($('ul', enabledMenu).css('left')); // 현재 메뉴 left 값
	var more_left = getPixelForInt($(".menu_more", enabledMenu).css("left")); // 현재 more 버튼 left 값
if(window.console)window.console.log("moremenu_open cur_menu_left["+cur_menu_left+"], more_left["+more_left+"]");	
	var move_left = 0;
	var menu_l = 0;
	var rest_menu_w = menu_w - Math.abs(cur_menu_left);
if(window.console)window.console.log("moremenu_open rest_menu_w["+rest_menu_w+"], menu_w["+menu_w+"], Math.abs(cur_menu_left)["+Math.abs(cur_menu_left)+"]");
	if(rest_menu_w < more_left){
		menu_l = 0;
		$(enabledMenu).removeClass("more_right");
	}else{
		//menu_l = Math.abs(cur_menu_left);
		menu_l = 0;
if(window.console)window.console.log("moremenu_open cur_menu_left["+cur_menu_left+"], more_left["+more_left+"], move_left["+move_left+"], menu_l["+menu_l+"]");	
		for(var i=0; i<menu_length; i++){
			var offsetWith = $('li', enabledMenu)[i].offsetWidth;
if(window.console)window.console.log("moremenu_open move_left["+move_left+"], cur_menu_left["+cur_menu_left+"], more_left["+more_left+"], offsetWith["+offsetWith+"], "+$($('li', enabledMenu)[i]).attr("class"));		
			if((move_left + cur_menu_left + offsetWith) > more_left){
				break;
			}
			move_left += offsetWith;
			menu_l += offsetWith;
if(window.console)window.console.log("moremenu_open move_left["+move_left+"], menu_l["+menu_l+"], offsetWith["+offsetWith+"]");		
		}
		$(enabledMenu).addClass("more_right");
	}
if(window.console)window.console.log("moremenu_open menu_l["+menu_l+"]");
	$itemsBox = $('ul', enabledMenu);
	$itemsBox.animate(
			{'left' : '-' + menu_l + 'px' }
			,300							
		);
}

function link_on(){
	toggleMenu("link_menu_area");
}
function admin_link_on(){
	toggleMenu("admin_menu_area");
}