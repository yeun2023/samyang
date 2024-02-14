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
    $("#quick .arrow").on("click", function () {
        $("html,body").stop().animate({
            scrollTop: 0 // 수직스크롤 위치
        }, 400);
    });


    

    // 인디케이터 
    var slides = $(".product-new  ul  li"); // 슬라이드 이미지
    var indicators = $(".newPro3ea .inds .indicator");
    // 자동슬라이드 간격 설정 
    var autoSlideIntervalIdProduct;
    var currentSlideIndexProduct = 0;

    // 슬라이드 지정된 인덱스로 이동하는 함수
    function moveToSlideProduct(index) {
        // 슬라이드로 도달하면 아무것도 하지 않음
        if (currentSlideIndexProduct === index) return;
        // 슬라이드 너비 가져와 계산
        var slideWidth = slides.width();
        var offset = -index * slideWidth;

        // 애니메이션 - 슬라이드전환효과
        $(".newPro3ea > ul").animate({
            left: offset + "px"
        }, 500, function () {
            // 현제슬라이드클래스 제거하고 새로운 슬라이드에 클래스 추가
            slides.removeClass("on");
            slides.eq(index).addClass("on");
        });
        // 함수 호출시마다 인디케이터 업데이트
        currentSlideIndexProduct = index;
        // 현재 보여지고있는 인덱스를 index값으로 업데이트
        updateIndicatorsProduct(index);
    }
    // updateIndicatorsProduct 함수를 호출하여 인디케이터 업데이트
    // index는 현재 보여지고있는 슬라이드임

    // 슬라이드업데이트 함수
    function updateIndicatorsProduct(index) {
        indicators.removeClass("active");
        indicators.eq(index).addClass("active");
    }
    // 자동슬라이드 시작 함수
    function startAutoSlideProduct() {
        // setInterval - 일정시간동안 반복하여 실행
        autoSlideIntervalIdProduct = setInterval(function () {
            // 다음 슬라이드 인덱스 계산
            var nextSlideIndexProduct = currentSlideIndexProduct + 1;
            // 마지막 슬라이드에 도달하면 처음 슬라이드로 다시 시작
            if (nextSlideIndexProduct === slides.length) {
                nextSlideIndexProduct = 0;
                // 위의 조건이 맞으면,
                // 처음 슬라이드 (0)으로 돌아가게 해주는 구조 
            }
            // nextSlideIndexProduct === slides.langth 
            // 다음에 표시할 슬라이드 인덱스가 제품 자체의 길이와 같은지 확인
            moveToSlideProduct(nextSlideIndexProduct);
        }, 2000); // 2초 간격으로 슬라이드 변경됨
        // 2초 간격으로 moveToSlideProduct 함수가 호출되어 자동전환
    }
    // 수동 슬라이드 변경
    function changeSlideProduct(index) {
        // 슬라이드 인터발 제거
        clearInterval(autoSlideIntervalIdProduct);
        // 원하는 슬라이드로 이동
        moveToSlideProduct(index);
        // 자동슬라이드 재시작
        startAutoSlideProduct();
    }

    // 인디케이터 클릭 이벤트 
    indicators.click(function () {
        var index = $(this).index();
        // 클릭한 인디케이터로 슬라이드 변경
        changeSlideProduct(index);
    });

});