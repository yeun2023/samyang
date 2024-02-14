$(function () {
    // gnb menu 
    /* 네비게이션 메뉴 제어 스크립트
    - 사용자가 메뉴에 마우스 올렸을때 하위 메뉴 활성화
    - 벗어났을때 비활성화 */
    let wrap = $('.gnbWrap');
    let menu = $('.gnbWrap > ul.gnb>li');
    // 각 페이지의 url주소 문자열을 그대로 가져옴
    let pageURL = location.href;
    let activeMenu; // 활성메뉴저장변수(선언만!)
    // mouseover - 마우스 올렸을때
    // mouseout - 마우스 벗어났을때
    menu.on({
        // 마우스를 대메뉴에 올렸을때 
        mouseover: function () {
            let tg = $(this); // 대메뉴
            menu.removeClass('on');
            tg.addClass('on');
            let th = 68 + tg.children('.sGnbArea').height();
            // gnbWrap 의 높이값 계산 
            wrap.stop().animate({
                height: th
                // wrap 에  높이 애니메이션 설정 
            });
        },
        // 마우스가 벗어났을때의 이벤트 
        mouseout: function () {
            let tg = $(this);
            tg.removeClass('on'); // on 클래스 제거 
            let th = 68; // 초기 Wrap 높이
            wrap.stop().animate({
                height: th
            }); // wrap의 높이에 애니메이션 설정
        }
    });

    menu.each(function (i) {
        let tg = $(this);
        let sub = tg.find('> .sGnbArea > ul > li');
        let menuURL = tg.children('a').attr('href');
        // 현재 메뉴의 링크 URL
        // .indexOf() - 요소의 위치를 찾는데 사용하는 메서드 (함수)
        let active = pageURL.indexOf(menuURL);
        if (active > -1) activeMenu = tg;
        /*let active = pageURL.indexOf(menuURL);: 
        현재 페이지의 URL에서 메뉴 아이템의 URL이 어디에 위치하는지를 active 변수에 저장

        if (active > -1) activeMenu = tg;: active 변수가 
        -1보다 크다면, 즉, 현재 페이지의 URL에서 메뉴 
        아이템의 URL이 일치하는 경우에만 아래의 코드를 실행합니다.
        이 경우, activeMenu 변수에 현재 메뉴 아이템을 할당*/


        sub.each(function (i) {
            let tg = $(this);
            // 현재 하위 메뉴
            let subURL = tg.children('a').attr('href');
            active = pageURL.indexOf(subURL);
            // 현재 페이지 URL에 하위 메뉴 URL 을 포함하고 있는지 확인
            if (active > -1) activeMenu = tg;
        });
        // 하위 메뉴 아이템에 대한 이벤트 핸들러 설정
        sub.on({
            // 마우스올렸을때
            mouseover: function () {
                let tg = $(this);
                sub.removeClass('on'); // 모든 서브메뉴 on제거
                tg.addClass('on'); // 현재서브 on추가
            },
            mouseout: function () {
                let tg = $(this);
                tg.removeClass('on'); // 현재하위요소 on제거
            }
        });
    });

    // 따라다니는 퀵메뉴
    $(window).scroll(function () {
        let scrollTopNum = $(document).scrollTop() + 200;
        // scrollTopNum이 200보다 크거나 같으면, 200으로 고정
        if (scrollTopNum <= 200) {
            scrollTopNum = 200;
        }
        // 애니메이션
        $("#quick").stop().animate({
            top: scrollTopNum
        }, 700); //0.7초
    });

    // 화살표 클릭시 최상단 
    $("#quick .arrow").on("click",function(){
        $("html,body").stop().animate({
            scrollTop:0 // 수직스크롤 위치
        },400);
    });

});