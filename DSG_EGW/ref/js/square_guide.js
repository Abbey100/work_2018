/* written by ek100@handysoft.co.kr & last update on Dec.2nd.16 */
$(document).ready(function(){

fn_sumnails();
fn_ImgSize();

/*** Sumnail Slide ***/
function fn_sumnails(){

    /** 기본 요소 **/
    var sum_area = $('.sum_wrap').outerWidth(); // 썸네일 영역 넓이
    var $sumnail = $('.sumnail'); // 썸네일


    /** 썸네일 관련 **/
    var sumnail_w = 162; // 기본 썸네일 낱개의 넓이 (154 + 8)
    var sumnail_length = $('.contents_area .sumnail').length; // 전체 썸네일 갯수
    var sumnail_total_w = sumnail_length * sumnail_w; // 썸네일 각각을 더한 전체에 대한 넓이

    var sum_count =  Math.floor(sum_area/162); // sum_area 에 잘리지 않고 들어가는 sumnail 갯수
    var sumnail_view =  sum_count * 162; // sum_area 영역 안에 잘리지 않고 들어가는 sumnail의 넓이
    var space = sumnail_w-(sum_area - sumnail_view) - 8; // 잔여 공간


    /** 넘기기 관련 **/
    var $Next = $('.btn.next'); //
    var $Pre = $('.btn.pre'); //


    /** 기본 **/

    var next_sum = sumnail_length - sum_count; // 화면 뒤 썸네일 갯수
    var pre_sum = 0; // 화면 앞 썸네일 갯수


    if(sumnail_total_w < sum_area) { // 전체 넓이가 썸네일 영역보다 짧으면,
        $Next.css('display', 'none'); // 뒤로 버튼 감추기
        $Pre.css('display', 'none'); // 앞으로 버튼 감추기
    }
    else { // 전체 넓이가 썸네일 영역을 넘칠 경우,

        // 최초 셋팅
        $Pre.css('display', 'none'); // 앞으로는 없음
        $Next.removeAttr('style'); // 뒤로는 있음

        // 뒤로 버튼을 누르면,
        $Next.click(function(){

            if(next_sum > 1){ // 마지막 페이지 전까지는 한 개씩 넘기기
             $('.sumnails').animate({
            'left' : '-=' + sumnail_w
            }
            ,400
            ,'swing');
            $Pre.removeAttr('style'); // 최초 넘기는 순간부터는 앞으로 버튼 활성
            next_sum--;  // 뒷 갯수는 줄이고,
            pre_sum++;   // 앞 갯수는 늘리고.
                console.log(sumnail_length);
                console.log(sum_count);
                console.log(next_sum);
            }
            else if (next_sum == 1) { // 마지막 페이지에 도달하면,
                $('.sumnails').animate({
            'left' : '-=' + space // 잔여 공간만큼만 뒤로
            }
            ,400
            ,'swing');
            next_sum--;
            pre_sum++;
            $Next.css('display', 'none'); // 뒤로 버튼은 숨기기
            }
        });
        // 앞으로 버튼을 누르면,
        $Pre.click(function(){

            if(pre_sum > 1){ // 마지막 페이지 전까지는 한 개씩 넘기기
             $('.sumnails').animate({
            'left' : '+=' + sumnail_w
            }
            ,400
            ,'swing');
            $Next.removeAttr('style'); // 최초 넘기는 순간부터는 앞으로 버튼 활성
            next_sum++;  // 뒷 갯수는 줄이고,
            pre_sum--;   // 앞 갯수는 늘리고.
            }
            else if (pre_sum == 1) { // 마지막 페이지에 도달하면,
                $('.sumnails').animate({
            'left' : 0 // 잔여 공간만큼만 뒤로
            }
            ,400
            ,'swing');
            next_sum++;
            pre_sum--;
            $Pre.css('display', 'none'); // 뒤로 버튼은 숨기기
            }
        });

    }




} // fn_sumnails FINISHED



/*** Sumnail Size ***/

function fn_ImgSize(){

      var ImgSpans = document.querySelectorAll('.sumnail > .sumnail_box');
  for (var i = 0; i < ImgSpans.length; ++i) {
    var span = ImgSpans[i];
    var spanExtent = span.offsetHeight / span.offsetWidth;

    var img = span.querySelector('img');
    var imgExtent = img.height / img.width;

    if (imgExtent <= spanExtent) {
      // 이미지가 span보다 납작한 경우 세로를 span에 맞추고 가로는 잘라낸다
      var imgWidthActual = span.offsetHeight / imgExtent;
      var imgWidthToBe = span.offsetHeight / spanExtent;
      var marginLeft = -Math.round((imgWidthActual - imgWidthToBe) / 2)
      img.style.cssText = 'width: auto; height: 100%; margin-left: '
                      + marginLeft + 'px;'
    } else {
      // 이미지가 span보다 길쭉한 경우 가로를 span에 맞추고 세로를 잘라낸다
      img.style.cssText = 'width: 100%; height: auto; margin-left: 0;';
    }
  }




 };

 /* 스퀘어 플러스 관리자 테이블 리스트 세로값 리사이징 가변 처리 */
 if($('.sq_plus .admin .content_lst').length > 0) { // .content_lst 클래스가 있을경우만 실행
     var squareAdmintableListBoxMinusNum = null;
     var squareAdmintableListHeight = null;
     $(window).resize(function(e) {
         fn_squareAdmintableListHeight();
     });
     function fn_squareAdmintableListHeight(){
         squareAdmintableListBoxMinusNum = $('.title_area').outerHeight() + $('.container_box>.btn_area').outerHeight() + $('.paginate_box').outerHeight() + $('.content_lst_head').outerHeight();
         squareAdmintableListHeight = $('body').outerHeight() - squareAdmintableListBoxMinusNum;
         $('.content_lst_body').css('height', squareAdmintableListHeight);
     }
     fn_squareAdmintableListHeight();
 };




});
