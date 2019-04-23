Layout = function () {
    topBanner.init()
};

topBanner = {
    init: function () {
        this._set();
    },
    _set: function () {
        console.log('Top Banner Set');
        this.bannerCheckClose();
    },
    bannerCheckClose: function () {
        var $topBanner = $('#top_banner');
        var $topBannerFunction = $topBanner.find('.function label');

        if ($topBanner.length <= 0) {
            return;
        }

        $topBanner.find('.close').on('click', function (e) {
            e.preventDefault();
            $topBanner.stop().slideUp(300);
        });

        $topBannerFunction.attr('aria-select', 'false');
        $topBannerFunction.on('click', function () {
            if ($topBannerFunction.attr('aria-select') === 'false') {
                $topBannerFunction.attr('aria-select', 'true');
                console.log('Top Banner open');
            } else {
                $topBannerFunction.attr('aria-select', 'false');
                console.log('Top Banner clsee');
            }
        });
    }
};

Layout();


// SS
SS = {
    COMMX: {}
}

SS.COMMX.header = function () {
    var method = {};
    method.init = function () {
        console.log('top header init');
    };
    method.util = function () {
        var $util = $('.util');
        var $utilLevel = $util.find('.level1');
        var $utilLevelBtn = $utilLevel.find('>a');

        $utilLevelBtn.on('mouseenter focus', function () {
            utilHide();

            $(this).closest('li').addClass('on');
            $(this).next('.level2').fadeIn(150);
        });

        $utilLevel.on('mouseleave', function () {
            utilHide();
        });

        function utilHide() {
            $util.find('.level1').removeClass('on');
            $util.find('.level2').hide();
        }

    };
    method.gnb = function () {
        var $gnb = $('.gnb');
        var $gnblLevel = $gnb.find('.level1');
        var $gnbLevelBtn = $gnblLevel.find('.child');
        var $gnbBg = $gnb.find('.bg');
        var $gnbBgKeyword = $gnbBg.find('.keyword');

        $gnbLevelBtn.on('mouseenter focus', function (e) {
            var $gnbEl;

            if (e.currentTarget === undefined) {
                $gnbEl = e;
            } else {
                $gnbEl = $(e.currentTarget);
            }

            var $gnblLevel2 = $gnbEl.closest('li').find('.level2');

            var $level2Height = $(this).next('.level2').innerHeight();
            var $gnbBgKeywordHeight = $gnbBgKeyword.height();

            console.log($level2Height , $gnbBgKeywordHeight);

            var isVisibleEl = $gnbLevelBtn.filter(function () {
                return ($(this).attr('aria-selected') === 'true');
            });

            $gnb.find('>ul>li>a').attr('aria-selected', 'false');
            $gnb.find('.level1').removeClass('on');
            $(this).closest('li').addClass('on');
            $(this).attr('aria-selected', 'true');

            if (isVisibleEl.length === 0) {
                $gnblLevel2.hide();
                $(this).next('.level2').stop().slideDown(400, function () {
                    $(this).removeAttr('style');
                });
            }
            TweenMax.to($gnbBg, 0.2, { height: $level2Height + $gnbBgKeywordHeight, display: 'block' });
            TweenMax.to($gnbBgKeyword, 0.3, {autoAlpha: 1});            
        });

        $gnb.on('mouseleave', function () {
            $gnb.find('>ul>li>a').removeAttr('aria-selected');
            $(this).find('.level1').removeClass('on');
            if ($('.level2:visible').length > 0) {
                $('.level2').fadeOut(300, function () {
                    $('.level2').removeAttr('style');
                });
            };
            TweenMax.to($gnbBg, 0.3, {
                height: 0, display: 'none', onComplete: function () {
                    $gnbBg.removeAttr('style');
                }
            });
            TweenMax.to($gnbBgKeyword, 0.1, {autoAlpha: 0, onComplete:function () {
                $gnbBgKeyword.removeAttr('style');
            }});
        });

    };
    return {
        init: method.init,
        util: method.util,
        gnb: method.gnb
    }
}();

SS.COMMX.main = function () {
    var method = {};
    method.init = function () {
        console.log('top main init');

        var $mainKeyVisual = $('.main_ .keyvisual');
        var $mainKeyVisualSeen = $mainKeyVisual.find('.seen');
        var $mainKeyVisualPalyPause = $mainKeyVisual.find('.function button');
        var slideshow = $mainKeyVisualSeen;

        $mainKeyVisualSeen.cycle({
            slides: '.item',
            swipe: true,
            fx: 'scrollHorz',
            easing: 'easeInOutExpo',
            prev: '#prev',
            next: '#next',
            pager: '#pagerMainKeyvisual',
            pagerTemplate: '<button type="button"><span>{{slideNum}}</span></button>',
            caption: '#captionMainKeyvisual',
            captionTemplate: '<strong>{{slideNum}}</strong> / <span>{{slideCount}}</span>'
        });

        $mainKeyVisualPalyPause.on('click', function () {
            if (slideshow.is('.cycle-paused')) {
                $mainKeyVisualSeen.cycle('resume');
                $(this).text('Resume');
            } else {
                $mainKeyVisualSeen.cycle('pause');
                $(this).text('Play');
            }
        });
    };
    return {
        init: method.init
    }
}();

SS.COMMX.footer = function () {
    var method = {};
    method.init = function () {
        console.log('top footer init');
    };
    return {
        init: method.init
    }
}();

$(document).ready(function () {
    SS.COMMX.header.init();
    SS.COMMX.header.util();
    SS.COMMX.header.gnb();
    SS.COMMX.main.init();
    SS.COMMX.footer.init();
});