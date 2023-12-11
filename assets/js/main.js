const lenis = new Lenis();

gsap.registerPlugin(CustomEase);
lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);
/*************************************************/

//loading
const numList = document.querySelectorAll(".loading .num-box .num:first-child");

ldTl = gsap.timeline();

$(".loading .text-box .text span").each(function (index) {
    ldTl.to($(this), {
        y: 0,
        duration: 0.5,
        delay: index * 0.01,
    });
});

gsap.from(numList, {
    textContent: 0,
    duration: 3,
    snap: { textContent: 1 },
    stagger: 0.1,
    onComplete: () => {
        gsap.to(".loading .text-area", {
            duration: 0.5,
            opacity: 0,
            ease: "power4.easeInOut",
        });

        gsap.to(".loading", {
            duration: 0.5,
            top: "-100%",
            delay: 0.8,
            ease: "power4.easeInOut",
        });

        gsap.from(".sc-main .title span .char", {
            yPercent: 100,
            stagger: {
                from: "random",
                each: 0.1,
            },
            onComplete: () => {
                gsap.to($(".sc-main .text-inner .title span:nth-child(2)"), {
                    "--width": "100%",
                    ease: "power4.easeInOut",
                });
            },
            delay: 1, // 1초 뒤에 실행
        });
    },
});

const headTxt = new SplitType(".sc-main .title span", {
    types: "words, chars",
});

// header

scrollTl = gsap.timeline();
scrollTl.fromTo(
    ".sc-main .scroll span:nth-child(1)",
    {
        yPercent: 0,
    },
    {
        duration: 2,
        yPercent: 150,
        ease: "none",
        repeat: -1,
    },
    "a"
);
scrollTl.fromTo(
    ".sc-main .scroll span:nth-child(2)",
    {
        yPercent: -250,
    },
    {
        duration: 2,
        yPercent: -100,
        ease: "none",
        repeat: -1,
    },
    "a"
);

function scrollToMenu(menuSelector) {
    var conHeight = $(menuSelector).offset().top;
    console.log(menuSelector);
    $("html, body").animate({ scrollTop: conHeight }, 500);
}
$("[data-menu]").each(function () {
    $(this).click(function (e) {
        e.preventDefault();
        var dataValue = $(this).data("menu");
        scrollToMenu(dataValue);
        $(this).addClass("on").siblings().removeClass("on");
    });
});

// .sc-project - Poject title up

$(".sc-project .con-project>a").each(function () {
    var linkElement = $(this);

    linkElement.hover(
        function () {
            gsap.to(linkElement.find(".title"), {
                y: -50,
                ease: "power4.easeInOut",
            });
        },
        function () {
            gsap.to(linkElement.find(".title"), {
                y: 0,
                ease: "power4.easeInOut",
            });
        }
    );
});

// project content after

let contentm = gsap.matchMedia();

contentm.add("(min-width: 800px)", () => {
    $(".sc-project .content-box").each(function () {
        ScrollTrigger.create({
            trigger: this,
            start: "50% 50%",
            end: "50% 50%",
            onEnter: () => {
                gsap.to(this, {
                    "--left": "0%",
                });
            },
            onLeaveBack: () => {
                gsap.to(this, {
                    "--left": "100%",
                });
            },
        });
    });
});

// arrow-text

$(".sc-project .arrow").each(function () {
    $(this).hover(
        function () {
            gsap.to($(this).find(".arrow-text"), {
                scale: 1,
                ease: "power4.easeInOut",
            });
            gsap.to($(this).find(".arrow-text .desc"), {
                delay: 0.3,
                opacity: 1,
            });
        },
        function () {
            gsap.to($(this).find(".arrow-text"), {
                scale: 0,
                ease: "power4.easeInOut",
            });
            gsap.to($(this).find(".arrow-text .desc"), {
                opacity: 0,
            });
        }
    );
});

// 스크롤 하면 타이틀명 & after

$(".showw").each(function (index, element) {
    const triggerOptions = {
        trigger: element,
        start: "0% 50%",
        end: "0% 50%",
    };
    const titleBox = $(element).find(".line");
    const titleSpan = $(element).find(".title span");
    const showElement = $(element).find(".show");

    gsap.to(titleBox, {
        scrollTrigger: triggerOptions,
        "--left": "0%",
    });
    gsap.to(titleSpan, {
        scrollTrigger: triggerOptions,
        y: 0,
    });
    gsap.to(showElement, {
        scrollTrigger: triggerOptions,
        y: 0,
        opacity: 1,
    });
});
