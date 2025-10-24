let services = null,
    heightOfNav = $("nav").outerHeight(true);

new WOW({
    animateClass: "animate__animated",
}).init();

window.addEventListener("DOMContentLoaded", function () {
    $(".loading").fadeOut(1000);
});

$(window).scroll(function () {
    if ($(window).scrollTop() > 200) {
        $(".arrow").addClass("show");
    } else {
        $(".arrow").removeClass("show");
    }

    if ($(window).scrollTop() > 1) {
        $("nav").addClass("scrolled");
    } else {
        $("nav").removeClass("scrolled");
    }

    $("nav .nav-link").each(function (index, element) {
        let sectionName = $(element).attr("href"),
            topOfSection = $(`${sectionName}`).offset().top - heightOfNav +2;
        if ($(window).scrollTop() >= topOfSection) {
            $(`nav .nav-link[href='${sectionName}']`)
                .addClass("active")
                .parent()
                .siblings()
                .children()
                .removeClass("active");
        }
    });
});

$("nav .nav-link[href]").click(function (e) {
    e.preventDefault();
    goToTopOfSection($(this));
});

$("#Home .container .part1 .box a").click(function(e){
    e.preventDefault();
    goToTopOfSection($(this));
})

$("#Home .next a").click(function(e){
    e.preventDefault();
    goToTopOfSection($(this));
});

$("nav .nav-link").click(function (e) {
    e.preventDefault();
    $("nav .nav-link.active").removeClass("active");
    $(this).addClass("active");
});

$("nav .navbar-toggler").click(function(){
    $("nav .collapse").toggleClass("show");
});

(function () {
    fetch("https://semicode.tech/api/v1/l10nhouse/services")
        .then((response) => response.json())
        .then(function (data) {
            services = data;

            services.forEach(function (service, index) {
                $("#Services .container .row ").append(`
                    <div class="col-md-6 wow ${(index + 1) % 2 == 0
                        ? "animate__zoomInRight"
                        : "animate__backInLeft"
                    }" data-wow-duration="1s" data-wow-delay="${index * 0.2}s">
                    <div class="item  m-auto mb-4">
                        <img src="images/${service.icon
                    }" alt="" class="img-fluid">
                        <h4 class="text-dark py-4 fs-2">${service.title}</h4>
                        <p>${prepareDes(
                        service.description.substr(0, 150)
                    )}...<span class="firstColor read-more-btn fw-bold" onclick="showServices(${index})">Read More</span>
                        </p>
                    </div>
                </div>
                `);
            });
        });

    fetch("https://semicode.tech/api/v1/l10nhouse/sectors")
        .then((response) => response.json())
        .then(function (data) {
            sectors = data;

            sectors.forEach(function (sector, index) {
                $(".popup[data-popup-name='Sector'] .row ").append(`
                    <div class="part col-sm-6 col-md-4 col-lg-3  mb-4">
                        <div class="item me-3 mb-2 text-center">
                            <img src="images/sec/${sector.icon}" alt="" class="img-fluid mb-4">
                            <h6>${sector.name}</h6>
                        </div>
                    </div>
                `);
            });
        });

    fetch("https://semicode.tech/api/v1/l10nhouse/languages")
        .then((response) => response.json())
        .then(function (data) {
            languages = data;

            languages.forEach(function (language, index) {
                $(".popup[data-popup-name='language'] .box").append(`
                <div class="language-section mb-4">
                    <h4 class="mb-4">${language.continent}</h4>
                    <ul type="none" class="p-0">
                        ${prepareLanguages(language.languages)}
                    </ul>
                </div>
                `);
            });
        });
})();

$(".owl-carousel").owlCarousel({
    loop: false,
    margin: 10,
    nav: false,
    responsive: {
        0: {
            items: 1,
        },
        600: {
            items: 3,
        },
        1000: {
            items: 5,
        },
    },
});

