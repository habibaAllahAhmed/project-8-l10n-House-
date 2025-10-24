
function goToTopOfSection(link){
    let sectionName = link.attr("href"),
        currentSection = $(`${sectionName}`),
        topOfCurrentSection = currentSection.offset().top;
    $(window).scrollTop(topOfCurrentSection - heightOfNav + 32);
}

function prepareDes(des){
    let htmlName =  "<span class='firstColor'>L10N</span> <span class='secondColor'>House</span>";

    const regex = /\bL10N House\b/gm;

    return des.replace( regex , htmlName);
}   

function preparePoints(points){
        let htmlContent =``;
    points.forEach(function(point){
            htmlContent +=`
            <li>${point}</li>
            `;
    });

    return htmlContent;
}

function prepareLanguages(Languages){
        let htmlContent =``;
    Languages.forEach(function(Language){
            htmlContent +=`
            <li><i class="fa-regular fa-circle-dot me-3"></i>${Language}</li>
            `;
    });

    return htmlContent;
}

function prepareSections(sections){
    let htmlContent =``;
    sections.forEach(function(section){
    htmlContent +=`
    <div class="section">
                        <div class="section-title">
                            <h3 class="fs-2">${section.title}</h3>
                        </div>
                        <div class="section-points">
                            <ol>
                                ${preparePoints(section.points)}
                            </ol>
                        </div>
    `;
    });

    return htmlContent;
}

function showServices(index){
    
    let currentService = services[index];

    $(".popup[data-popup-name='services'] .box").html(`
        <div class="head">
                <h5 class="fs-4 fw-bold">Services</h5>
                <i class="fa-solid fa-xmark fs-4" onclick="closePopup('services')"></i>
            </div>
            <hr class="p-0 m-0">
            <div class="body">
                <h2 class="secondColor text-center fs-1 fw-bold pb-5">${currentService.title}</h2>
                <div class="row mb-5">
                    <div class="col-lg-6  mb-4 mb-lg-0">
                        <div class="item">
                            <p>
                            ${prepareDes(currentService.description)}
                            </p>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="item">
                            <img src="images/${currentService.img}" alt="" class="img-fluid rounded-3">
                        </div>
                    </div>
                </div>
                <div class="sections">
                ${prepareSections(currentService.sections)}
                    </div>
                </div>
            </div>
        `);

        openPopup("services");
}

function openPopup(popupName){
    if(popupName == "video"){
        $(`.popup[data-popup-name='${popupName}']`).addClass("d-flex").hide().fadeIn(1000);
    }else{
        $(`.popup[data-popup-name='${popupName}']`).fadeIn(1000, function(){
            $(this).find(".box").css( "transform" , "translateX(0%)");
        });
    }
}

function closePopup(popupName){
    
    if(popupName == 'language'){
        $(`.popup[data-popup-name='${popupName}'] .box`).css( "transform" , "translateX(100%)").parent().delay(1000).fadeOut(1000);
    }else if(popupName == "video"){
        $(`.popup[data-popup-name='${popupName}']`).fadeOut(1000).delay(1000 , function(){
            $(this).removeClass("d-flex");
        });
    }else{
        $(`.popup[data-popup-name='${popupName}']`).fadeOut(1000);
    }
}

$(".popup .box").click(function(e){
    e.stopPropagation();
});



