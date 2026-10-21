// const IMG = new Image();
// const EMAIL_PATTERNS = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

var portfolioIds = ["all", "aspnet", "angular", "wordpress"];

// getPlatformName = (s) => console.log(s[0].link);

// data
(async () => {

  let inner = '';

  //#region cloud data
  // const response = await fetch('https://api.perspective-v.com/graph/resume', {
  //     method: 'POST',
  //     headers: {
  //         "Content-Type": "application/json",
  //         "Accept": "*/*",
  //     },
  //     body: JSON.stringify({
  //         query: `query getMyResume($token:String!){
  //             getByAccessToken(accesToken:$token){
  //                   name,
  //                   htmlTemplate,
  //                   jsonData
  //                 }
  //               }`,
  //         variables: {
  //             token: 'oN6XTVOnUk2R5HQgW90cOg=='
  //         }
  //     })
  // });
  // const body = await response.json();
  // var data = JSON.parse(body.data.getByAccessToken.jsonData);
  //#endregion cloud data

  //#region local data
  $.getJSON("./assets/data/data.json", (data) => {

    //#region basic info
    $(".navbar-brand, .name").append(data.fullName);
    $(".category").append(data.profession);
    document.querySelector(".profile-image").src = data.profileImageUrl;
    // document.querySelector('.linkedIn_pdf').href = getPlatformName(data.socailLinks);
    $(".aboutMe").append(data.about);
    // $(".miniIntro").append();
    var basicInformationheadings = [
      // "Mobile",
      "Email",
      "Address",
      "Industry",
      "Languages",
    ];
    $.each(basicInformationheadings, (i, heading) => {
      $(".pInfo .text-uppercase").append(heading + ":" + "<br><br>");
    });
    $.each(data.basicInfo, (i, value) => {
      $(".pInfoValue").append(
        value != null && value === `${/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/g}`
          ? `<a href="mailto:${value}">${value}</a><br><br>`
          : value + "<br><br>"
      );
    });
    //#endregion basic info

    //#region skills
    $.each(data.skills, (i, skill) => {
      $(".skills").append(`
            <div class="col-md-4 skill">
                <div class="progress-container progress-primary"><span class="progress-badge">${skill.name}</span>
                    <div class="progress">
                        <div class="progress-bar progress-bar-primary" data-aos="progress-full" data-aos-offset="10"
                            data-aos-duration="2000" role="progressbar" aria-valuenow="60" aria-valuemin="0"
                            aria-valuemax="100" style="width: ${skill.percentage}%"></div><span class="progress-value">${skill.percentage}%</span>
                    </div>
                </div>
            </div>
        `);
    });
    //#endregion skills

    //#region portfolio
    $.each(data.portfolioHeadings, (i, ph) => {
      $(".portfolio-heading").append(`
        <li class="nav-item ${ph.link}"><a class="nav-link ${ph.active}" data-toggle="tab" href="#${ph.link}" role="tablist">${ph.name}</a></li>
      `);
    });

    $.each(portfolioIds, (i, portfolioId) => {
      inner += `<div class="row" id="${portfolioId}"></div>`;
    });

    $(`#portfolios .container`).append(`
      <div class="tab-pane">
        ${inner}
      </div>
    `);

    $.each(data.portfolios, (i, p) => {
      Portfolios(p);
    });
    //#endregion portfolio

    //#region experiences
    $.each(data.experiences, (i, exp) => {
      $(".experiences-list").append(`
                <div class="card">
                    <div class="row education">
                        <div class="col-md-3 bg-primary" data-aos="fade-right" data-aos-offset="50" data-aos-duration="500">
                            <div class="card-body cc-education-header">
                                <p>${exp.duration}</p>
                                <div class="h5">${exp.profession}</div>
                            </div>
                        </div>
                        <div class="col-md-9" data-aos="fade-left" data-aos-offset="50" data-aos-duration="500">
                            <div class="card-body">
                                <div class="h5">${exp.company}</div>
                                <p class="category"></p>
                                <p>${exp.description.replace(/\n/g, "<br>")}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `);
    });
    //#endregion experiences

    //#region education
    $.each(data.education, (i, edu) => {
      $(".education-list").append(`
            <div class="card">
                <div class="row education">
                    <div class="col-md-3 bg-primary" data-aos="fade-right" data-aos-offset="50" data-aos-duration="500">
                        <div class="card-body cc-education-header">
                            <p>${edu.yearOfGraduation}</p>
                            <div class="h5">${edu.degree}</div>
                        </div>
                    </div>
                    <div class="col-md-9" data-aos="fade-left" data-aos-offset="50" data-aos-duration="500">
                        <div class="card-body">
                            <div class="h5">${edu.subject}</div>
                            <p class="category">${edu.institution}</p>
                            <p>${edu.summary}</p>
                        </div>
                    </div>
                </div>
            </div>
        `);
    });
    //#endregion education

    //#region testimonials
    $.each(data.testimonials, (i, t) => {
      $(".carousel-indicators").append(
        `<li class="carousel-indicator" data-target="#cc-Indicators" dataSlideTo="0"></li>`
      );
      if (i == 0) {
        $(".carousel-indicator").addClass("active");
        $(".carousel-inner").append(`<div class="carousel-item active">
                <div class="row testimonial">
                    <div class="col-lg-2 col-md-3 cc-reference-header">
                        <a target="_blank">
                            <img src="${t.imageUrl}" alt="${t.name}'s Image" />
                        </a>
                        <div class="h5 pt-2">${t.name}</div> <p class="category">${t.country}</p> </div>
                    <div class="col-lg-10 col-md-9"> <p>${t.review}</p> </div>
                </div>
            </div>`);
      } else {
        $(".carousel-indicator").removeClass("active");
        $(".carousel-inner").append(`<div class="carousel-item">
                <div class="row testimonial">
                    <div class="col-lg-2 col-md-3 cc-reference-header">
                        <a target="_blank">
                            <img src="${t.imageUrl}" alt="${t.name}'s Image" />
                        </a>
                        <div class="h5 pt-2">${t.name}</div> <p class="category">${t.country}</p> </div>
                    <div class="col-lg-10 col-md-9"> <p>${t.review}</p> </div>
                </div>
            </div>`);
      }
    });
    //#endregion testimonials

    //#region pdf data
    $(".username_pdf").append(`<strong style="display: block; text-align: center; line-height: 1.5;">${data.fullName}</strong>`);
    $(".profession_pdf").append(`<strong style="display: block; text-align: center; line-height: 1.5;">${data.profession}</strong>`);
    $(".address_pdf").append(`<strong style="display: block; text-align: center; line-height: 1.5;">${data.basicInfo.address}</strong>`);
    $(".mailAndMobile_pdf").append(`<strong style="display: block; text-align: center; line-height: 1.5;">${data.basicInfo.email}</strong>`);
    // doc.textWithLink(text, {url: getPlatformName(data.links) });
    // document.querySelector(".linkedIn_pdf").href = getPlatformName(
    //   data.socialLinks
    // );
    $(".about_pdf").append(`<span style="font-size: 11px;">${data.about}</span>`);
    $.each(data.skills, (i, skill) =>
      $(".skill_pdf").append(`<span style="font-size: 11px;">${skill.name}, </span>`)
    );
    $.each(data.experiences, (i, exp) => {
      $(".experience_pdf").append(
        `<p style="font-size: 11px;"><b>${exp.profession} - ${exp.company}</b><br>${exp.duration}<br>${exp.description}</p>`
      );
    });
    $.each(data.education, (i, edu) =>
      $(".education_pdf").append(
        `<p style="font-size: 11px; line-height: 1.2px;">${edu.institution} - ${edu.subject} (${edu.yearOfGraduation})</p>`
      )
    );
    //#endregion pdf data

    //#region generate pdf
    const { jsPDF } = window.jspdf;
    const DOC = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });
    const PAGE_MARGIN = 20;
    const CONTENT_WIDTH = DOC.internal.pageSize.getWidth() - PAGE_MARGIN * 2;

    $(document).on("click", "#gpdf", (event) => {
      event.preventDefault();
      $("#pdf").css("width", `${CONTENT_WIDTH}px`);
      DOC.html(document.querySelector("#pdf"), {
        margin: [10, PAGE_MARGIN, 10, PAGE_MARGIN],
        width: CONTENT_WIDTH,
        windowWidth: CONTENT_WIDTH,
        html2canvas: {
          onclone: (clonedDocument) => {
            const clonedPdf = clonedDocument.querySelector("#pdf");
            clonedPdf.style.position = "static";
            clonedPdf.style.left = "0";
            clonedPdf.style.top = "0";
            clonedPdf.style.textAlign = "left";
          },
        },
        autoPaging: "text",
        callback: (doc) => {
          doc.save(`${data.fullName}'s Resume.pdf`);
        },
      });
    });
    //#endregion generate pdf
  }).fail(function (jqXHR, textStatus, errorThrown) {
    console.error("Could not load data.json:", textStatus, errorThrown);
  });
  //#endregion local data
})();

//#region functions

async function loadFontAndInit() {
  const res = await fetch('assets/fonts/montserrat/montserrat-regular.ttf');
  console.log(res.status);
  const buf = await res.arrayBuffer();
  const b64 = btoa(String.fromCharCode(...new Uint8Array(buf)));
  DOC.addFileToVFS('assets/fonts/montserrat/montserrat-regular.ttf', b64);
  DOC.addFont('assets/fonts/montserrat/montserrat-regular.ttf', 'Montserrat', 'normal');
  DOC.setFont('Montserrat', 'normal');
}

function Show(id) {
  if (id == portfolioIds.at(0)) {
    $(`#${id}`).show();
    Hide(portfolioIds.at(1), portfolioIds.at(2));
    Hide(portfolioIds.at(3));
  } else {
    $(`#${id}`).show();
  }
}

function Hide(id, all) {
  $(`#${id}`).hide();
  $(`#${all}`).hide();
}

function ShowOrHidePortfoliosBasedOnCondition(id) {
  $.each(portfolioIds, (i, portfolioId) => {
    $(`.${portfolioIds.at(0)}`).click(() => Show(portfolioIds.at(0)));
    $(`.${portfolioId}`).click(() => (id == portfolioId ? Show(id) : Hide(id, portfolioIds.at(0))));
  });
}

function Portfolios(p) {
  PortfolioHtml(p, portfolioIds.at(0));
  Hide(p.hId, null);
  ShowOrHidePortfoliosBasedOnCondition(p.hId);
  PortfolioHtml(p, p.hId);
}

function PortfolioHtml(p, id) {
  $(`#${id}`).append(`
    <div class="tab-content gallery mt-5 col-md-4" style="padding-bottom: 20px">
      <div class="cc-porfolio-image img-raised" data-aos="fade-up" data-aos-anchor-placement="top-bottom">
        <a href="${p.link}" target="_blank">
          <figure class="cc-effect">
            <img src="${p.imageUrl}" id="${p.hId}-img" alt="${p.name}" />
              <figcaption>
                <div class="h4">${p.framework} <i class="fa fa-external-link" aria-hidden="true"></i></div>
                <p>${p.name}</p>
                <p>${p.description}</p>
            </figcaption>
          </figure>
        </a>
      </div>
    </div>  
  `);
}
//#endregion functions
