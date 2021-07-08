$(document).scroll(function () {
  if ($(document).scrollTop() >= 500) {
    $(".navbar").addClass("has-background-grey-dark");
    $(".navbar").addClass("has-shadow");
    $(".navbar").addClass("is-dark");
    $(".navbar").removeClass("is-light");
    $(".navbar-menu").addClass("has-background-grey-dark");
  } else {
    $(".navbar").removeClass("has-background-grey-dark");
    $(".navbar").removeClass("has-shadow");
    $(".navbar").removeClass("is-dark");
    $(".navbar").addClass("is-light");
    $(".navbar-menu").removeClass("has-background-grey-dark");
  }
});

bulmaCarousel.attach("#carousel-demo", {
  slidesToShow: 1,
  autoplay: true,
  loop: true,
  duration: 3000,
  navigation: false,
  pauseOnHover: false,
  navigationKeys: false,
  pagination: false,
});

$(document).ready(() => {
  // Hospital Records
  const patientInfo = $("#info-patient");
  const prescription = $("#prescription");
  const surgery = $("#surgery");
  // Modal
  const patientInfoModal = $("#patient-info-modal");
  const prescriptionModal = $("#prescription-modal");
  const surgeryModal = $("#surgery-modal");

  // Field Records
  const pcr = $("#pcr");
  const patrolNotes = $("#patrol-notes");
  const incidentReport = $("#incident-report");
  // Modal
  const pcrModal = $("#pcr-modal");
  const patrolNotesModal = $("#patrol-notes-modal");
  const incidentReportModal = $("#incident-report-modal");

  $("#copyright-years").html(new Date().getFullYear());

  const timer = () => {
    let timeAndDay = "";
    const date = new Date();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let day = days[date.getDay()];
    let month = months[date.getMonth()];
    let years = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    const format = (time) => {
      if (time < 10) return `0${time}`;
      else return time;
    };

    timeAndDay = `${day} ${month} ${date.getDate()}, ${years} ${format(hours)}:${format(minutes)}:${format(seconds)}`;

    $("#timer").html(timeAndDay);

    setTimeout(() => {
      timer();
    }, 1000);
  };

  timer();

  $(".navbar-burger").click(function () {
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
  });

  // Function
  const toggleModal = (element, modal) => {
    element.click(() => {
      modal.toggleClass("is-active");
    });
  };

  const copyResult = (btn, element) => {
    btn.innerHTML = "Copy";
    setTimeout(() => {
      element.select();
      element.setSelectionRange(0, 99999);

      document.execCommand("copy");
      btn.innerHTML = "Copied!";
    }, 1000);
  };

  toggleModal(patientInfo, patientInfoModal);
  toggleModal(prescription, prescriptionModal);
  toggleModal(surgery, surgeryModal);
  toggleModal(pcr, pcrModal);
  toggleModal(patrolNotes, patrolNotesModal);
  toggleModal(incidentReport, incidentReportModal);

  $(".delete").click((e) => {
    e.target.parentElement.parentElement.parentElement.classList.remove("is-active");
  });

  // Hospital Records
  $("#add_med").click((e) => {
    e.preventDefault();
    $("#container_med").append(`<div class="columns">
    <div class="column">
      <div class="select">
        <select id="medicine[]">
          <option selected disabled>Choose...</option>
          <option value="Arenipocetees 3.0">Arenipocetees 3.0</option>
          <option value="Krarouvitis Plus">Krarouvitis Plus</option>
          <option value="Lazulparilla 2.0">Lazulparilla 2.0</option>
          <option value="Nanophytum Acid">Nanophytum Acid</option>
          <option value="Olatsisymbrium 1.0">Olatsisymbrium 1.0</option>
          <option value="Pyosisymbrium Extra">Pyosisymbrium Extra</option>
        </select>
      </div>
    </div>
    <div class="column">
      <input type="number" id="medicine_num[]" class="input" min="0" max="10" placeholder="Amount" />
    </div>
    <div class="column">
      <button class="button is-danger" id="delete_med">Delete</button>
    </div>
  </div>`);
  });

  $("#container_med").on("click", "#delete_med", (e) => {
    e.target.parentElement.parentElement.remove();
  });

  $("#add_ss").click((e) => {
    e.preventDefault();
    $("#ss_container").append(`<div class="columns">
      <div class="column">
        <input class="input" type="text" id="screenshot_pc[]" placeholder="Screenshot image link ex: https://example.com/images.png" />
      </div>
      <div class="column">
        <button class="button is-danger" id="delete_ss">Delete</button>
      </div>
    </div>`);
  });

  $("#ss_container").on("click", "#delete_ss", (e) => {
    e.target.parentElement.parentElement.remove();
  });

  $("#add_ss_sr").click((e) => {
    e.preventDefault();
    $("#ss_container_sr").append(`<div class="columns">
      <div class="column">
        <input class="input" type="text" id="screenshot_sr[]" placeholder="Screenshot image link ex: https://example.com/images.png" />
      </div>
      <div class="column">
        <button class="button is-danger" id="delete_ss_sr">Delete</button>
      </div>
    </div>`);
  });

  $("#ss_container_sr").on("click", "#delete_ss_sr", (e) => {
    e.target.parentElement.parentElement.remove();
  });

  // Prescription
  $(document).on("click", "#generate-pc", () => {
    const medicine = $("select[id='medicine[]']")
      .map(function () {
        return $(this).val();
      })
      .get();

    const medicineAmount = $("input[id='medicine_num[]']")
      .map(function () {
        return $(this).val();
      })
      .get();

    let allMedicine = "";
    for (let i = 0; i < medicine.length; i++) {
      if (medicine[i] == medicine[medicine.length - 1]) {
        allMedicine = allMedicine + `${medicine[i]} (${medicineAmount[i]})`;
      } else {
        allMedicine = allMedicine + `${medicine[i]} (${medicineAmount[i]}) `;
      }
    }
    allMedicine = `${allMedicine}, ${$("#treatment-type").val()}`;

    const screenshot = $("input[id='screenshot_pc[]']")
      .map(function () {
        return $(this).val();
      })
      .get();

    let allScreenshot = "";
    for (let i = 0; i < screenshot.length; i++) {
      let ss = `[img]${screenshot[i]}[/img]\n`;
      allScreenshot = allScreenshot + ss;
    }

    let result = "";
    if ($("#district-pc").val() == "ASGH") {
      result = `[divbox=#BDEDBB][hr][/hr][left][font=calibri][size=85][i]All Saints General Hospital
1 All Saints Street, Los Santos
San Andreas, SA9981[/i][/size][/left] [hr][/hr][hr][/hr]

[center][u][b]${allMedicine}[/b][/u][/center]
[center][img]https://www.upload.ee/image/8551897/C3ienXZ.png[/img][/center]

[size=85]Repeat Dispensing[/size] [${$("#dispensing-pc").val()}][/${$("#dispensing-pc").val()}] - [b][u]0[/u][/b]
[hr][/hr][hr][/hr]
[size=85][b]Prescriber:[/b] [u]${$("#prescriber-pc").val()}[/u]
[b]Position Held:[/b] [u]${$("#position-pc").val()}[/u]
[b]Date:[/b] [u]${$("#date-pc").val()}[/u]
[b]Signature:[/b] [u][i]${$("#signature-pc").val()}[/i][/u]
[/size]

[altspoiler=SCREENSHOT]${allScreenshot}[/altspoiler][/divbox]`;
    } else {
      result = `[divbox=#BDEDBB][hr][/hr][left][font=calibri][size=85][i]County General Hospital
212 Jefferson Street, Los Santos
San Andreas, SA17023[/i][/size][/left] [hr][/hr][hr][/hr]

[center][u][b]${allMedicine}[/b][/u][/center]
[center][img]https://www.upload.ee/image/8551908/MIQgELi.png[/img][/center]

[size=85]Repeat Dispensing[/size] [${$("#dispensing-pc").val()}][/${$("#dispensing-pc").val()}] - [b][u]0[/u][/b]
[hr][/hr][hr][/hr]
[size=85][b]Prescriber:[/b] [u]${$("#prescriber-pc").val()}[/u]
[b]Position Held:[/b] [u]${$("#position-pc").val()}[/u]
[b]Date:[/b] [u]${$("#date-pc").val()}[/u]
[b]Signature:[/b] [u][i]${$("#signature-pc").val()}[/i][/u]
[/size]

[altspoiler=SCREENSHOT]${allScreenshot}[/altspoiler][/divbox]`;
    }

    $("#result-pc").html(result);
  });

  // Surgery Report
  $(document).on("click", "#generate-sr", () => {
    const screenshot = $("input[id='screenshot_sr[]']")
      .map(function () {
        return $(this).val();
      })
      .get();

    let allScreenshot = "";
    for (let i = 0; i < screenshot.length; i++) {
      let ss = `[img]${screenshot[i]}[/img]\n`;
      allScreenshot = allScreenshot + ss;
    }

    let result = `[divbox=white][center][img]https://i.postimg.cc/RFd9JsR5/safdjg-2020-resized-2.png[/img][/center]
[hr][/hr]
[center][b][u][size=150]P[/size][size=137]ATIENT[/size] [size=150]H[/size][size=137]ISTORY[/size][/u][/b][/center]

[u][size=140][b]P[/b][/size][size=125]HYSICIAN[/size] [size=140][b]I[/b][/size][size=125]NFORMATION[/size][/u]
[b][size=105]Name:[/size][/b] ${$("#name-sr").val()}
[b][size=105]Rank:[/size][/b] ${$("#rank-sr").val()}
[hr][/hr]
[u][size=140][b]P[/b][/size][size=125]ATIENT[/size] [size=140][b]I[/b][/size][size=125]NFORMATION[/size][/u]
[b][size=105]Name:[/size][/b] ${$("#patient-sr").val()}
[b][size=105]Age:[/size][/b] ${$("#age-sr").val()}
[b][size=105]Gender:[/size][/b] ${$("#gender-sr").val()}
[hr][/hr]

[u][size=140][b]A[/b][/size][size=125]SSESSMENT[/size] [size=140][b]I[/b][/size][size=125]NFORMATION[/size][/u]
[b][size=105]Type:[/size][/b] ${$("#type-sr").val()}
[b][size=105]Injury:[/size][/b] ${$("#injury-sr").val()}
[b][size=105]LOC on arrival:[/size][/b] ${$("#loc-sr").val()}

[b][size=105][u][u]Vitals on arrival[/u][/u][/size][/b]
[b]Circulation:[/b] ${$("#circulation-sr").val()}
[b]Airway:[/b] ${$("#airway-sr").val()}
[b]Breathing:[/b] ${$("#breathing-sr").val()}

[b][size=105]Medicines:[/size][/b] ${$("#medicine-sr").val()}
[b][size=105]Anesthesia:[/size][/b] ${$("#anethesia-type").val()} [size=85]${$("#anethesia-medicine").val()}[/size]
[b][size=105]Summary:[/size][/b] ${$("#summary-sr").val()}
[hr][/hr]
[u][size=140][b]F[/b][/size][size=125]INAL[/size] [size=140][b]I[/b][/size][size=125]NFORMATION[/size][/u]
[b][size=105]Recovery Status:[/size][/b] ${
      $("#recovery-sr").val() == "Improved" ? "[color=#00BF00][b]Improved[/b][/color]" : $("#recovery-sr").val() == "Worsened" ? "[color=#FF0000][b]Worsened[/b][/color]" : "[color=#800000][b]Deceased[/b][/color]"
    }
[right]${$("#date-sr").val()}[/right]
[right]${$("#signature-sr").val()}[/right]

[altspoiler=SCREENSHOT]${allScreenshot}[/altspoiler]
[/divbox]`;

    $("#result-sr").html(result);
  });

  // Field Records
  $(document).on("click", "#add-crew", (e) => {
    const div = document.createElement("div");
    div.id = "cr-member";
    div.innerHTML = `<input class="input" type="text" id="crew_member[]" placeholder="e.g Cadet Raphael Vincenzo" />
    <button type="button" class="button is-danger" id="delete-crew">Remove</button>`;
    e.target.parentElement.parentElement.append(div);
  });

  $(document).on("click", "#add-crew-ir", (e) => {
    const div = document.createElement("div");
    div.id = "cr-member-ir";
    div.innerHTML = `<input class="input" type="text" id="crew_member_ir[]" placeholder="e.g Cadet Raphael Vincenzo" />
    <button type="button" class="button is-danger" id="delete-crew-ir">Remove</button>`;
    e.target.parentElement.parentElement.append(div);
  });

  $(document).on("click", "#delete-crew", (e) => {
    e.target.parentElement.remove();
  });

  $(document).on("click", "#delete-crew-ir", (e) => {
    e.target.parentElement.remove();
  });

  $(document).on("click", "#copy-result", (e) => {
    copyResult(e.target, e.target.previousElementSibling);
  });

  // PCR
  $(document).on("click", "#generate-pcr", () => {
    const crew_member = $("input[id='crew_member[]']")
      .map(function () {
        return $(this).val();
      })
      .get();

    let crew_member1 = "";
    for (let x = 0; x < crew_member.length; x++) {
      let crew_member2 = `[*] ${crew_member[x]}\n`;
      crew_member1 = crew_member1 + crew_member2;
    }

    const resElem = document.getElementById("result-pcr");
    let result = "";
    result = `[divbox=white]
[center][img]https://i.postimg.cc/RFd9JsR5/safdjg-2020-resized-2.png[/img]
[size=150][b][font=times new roman]SAN ANDREAS FIRE DEPARTMENT[/font][/b][/size]
[font=times new roman]EMERGENCY AND OPERATIVE OPERATIONS OFFICE[/font] - [font=times new roman]FIELD RECORDS[/font]
[font=times new roman]CITY OF LOS SANTOS * 271 AIRPORT PERIMETER WAY* LOS SANTOS SA 52527[/font][/center]
[hr][/hr]
[center][size=140][b][font=times new roman]PATIENT CARE REPORT[/font][/b][/size][/center]
[hr][/hr]
[divbox=black][aligntable=right,0,0,0,0,0,transparent][img]https://i.postimg.cc/V6qpRTsK/SAFD-LOGO-MINI2.png[/img][/aligntable][size=140][b][color=white][font=times new roman]A — Personal Information[/font][/color][/b][/size][/divbox][list=none]

[b][color=#bf4000]A1.[/color] Full Name:[/b] ${$("#fullname-pcr").val()}
[b][color=#bf4000]A2.[/color] Position:[/b] ${$("#position-pcr").val()}
[b][color=#bf4000]A3.[/color] Employee #:[/b] ${$("#badge-number-pcr").val()}
[b][color=#bf4000]A4.[/color] Location of Incident:[/b] ${$("#location-pcr").val()}
[b][color=#bf4000]A5.[/color] Date of Incident:[/b] ${$("#date-pcr").val()}
[b][color=#bf4000]A6.[/color] Time of Incident:[/b] ${$("#time-pcr").val()}

[b][color=#bf4000]A7.[/color] Unit:[/b] ${$("#unit-pcr").val()}
[b][color=#bf4000]A8.[/color] Crew Member:[/b] [list]${crew_member1}[/list]
[/list]
[size=1].[/size]
[divbox=black][aligntable=right,0,0,0,0,0,transparent][img]https://i.postimg.cc/V6qpRTsK/SAFD-LOGO-MINI2.png[/img][/aligntable][size=140][b][color=white][font=times new roman]B — Victim Information[/font][/color][/b][/size][/divbox][list=none]

[b][color=#bf4000]B1.[/color] Full Name:[/b] ${$("#victim-pcr").val()}
[b][color=#bf4000]B2.[/color] Age:[/b] ${$("#age-pcr").val()}

[b][color=#bf4000]B3.[/color] Injuries:[/b] ${$("#injures-pcr").val()}
[b][color=#bf4000]B4.[/color] Vitals[/b]
[list][*][b][size=90]Pulse:[/b] ${$("#pulse-pcr").val()}[/size]
[*][b][size=90]Airway:[/b] ${$("#airway-pcr").val()}[/size]
[*][b][size=90]Breathing:[/b] ${$("#breath-pcr").val()}[/size]
[*][b][size=90]APVU:[/b] ${$("#avpu").val()}[/size][/list]

[/list]
[size=1].[/size]
[divbox=black][aligntable=right,0,0,0,0,0,transparent][img]https://i.postimg.cc/V6qpRTsK/SAFD-LOGO-MINI2.png[/img][/aligntable][size=140][b][color=white][font=times new roman]C — Incident Details[/font][/color][/b][/size][/divbox][list=none]

[quote]
${$("#incident-pcr").val()}
[/quote]

[b](( Images: ))[/b]
[spoiler][img]${$("#ss-health").val()}[/img][/spoiler]

[/list]
[hr][/hr]
[aligntable=right,0,0,0,0,0,transparent]
[b]FIRE OFFICER SIGNATURE[/b]


_____________________

[/aligntable]
[b]EMPLOYEE SIGNATURE[/b]

${$("#signature-pcr").val()}
______________________
${$("#fullname-pcr").val()}
[space][/space]
[/divbox]`;
    resElem.innerHTML = result;
  });

  // Patrol Notes
  $(document).on("click", "#generate-pn", (e) => {
    e.preventDefault();
    let result = `[divbox=white]
[center][img]https://i.postimg.cc/RFd9JsR5/safdjg-2020-resized-2.png[/img]
[size=150][b][font=times new roman]SAN ANDREAS FIRE DEPARTMENT[/font][/b][/size]
[font=times new roman]EMERGENCY AND OPERATIVE OPERATIONS OFFICE[/font] - [font=times new roman]FIELD RECORDS[/font]
[font=times new roman]CITY OF LOS SANTOS * 271 AIRPORT PERIMETER WAY* LOS SANTOS SA 52527[/font][/center]
[hr][/hr]
[center][size=140][b][font=times new roman]PATROL NOTES[/font][/b][/size][/center]
[hr][/hr]
[b]Name :[/b] ${$("#name-pn").val()}
[b]Position :[/b] ${$("#position-pn").val()}
[b]Employee #:[/b] ${$("#employee-pn").val()}

[b]Unit :[/b] ${$("#unit-pn").val()}
[b]Crew member :[/b] ${$("#crew-pn").val()}
[b]Date :[/b] ${$("#date-pn").val()}
[b]Total Duration :[/b] ${$("#duration-pn").val()}
[b]Start Patrol:[/b] ${$("#start-pn").val()}
[spoiler][img]${$("#start-img-pn").val()}[/img][/spoiler]
[b]RTB:[/b] ${$("#rtb-pn").val()}
[spoiler][img]${$("#rtb-img-pn").val()}[/img][/spoiler]

[b]DETAILS:[/b]
[quote]
${$("#details-pn").val()}
[/quote]
[space][/space]
[b]EMPLOYEE SIGNATURE[/b]
[img]${$("#signature-pn").val()}[/img]
______________________
${$("#name-pn").val()}
[/divbox]`;

    $("#result-pn").text(result);
  });

  // Incident Report
  $(document).on("click", "#generate-ir", () => {
    const crew_member = $("input[id='crew_member_ir[]']")
      .map(function () {
        return $(this).val();
      })
      .get();

    let crew_member1 = "";
    for (let x = 0; x < crew_member.length; x++) {
      let crew_member2 = `[*] ${crew_member[x]}\n`;
      crew_member1 = crew_member1 + crew_member2;
    }

    let result = "";
    result = `[divbox=white]
[center][img]https://i.postimg.cc/RFd9JsR5/safdjg-2020-resized-2.png[/img]
[size=150][b][font=times new roman]SAN ANDREAS FIRE DEPARTMENT[/font][/b][/size]
[font=times new roman]EMERGENCY AND OPERATIVE OPERATIONS OFFICE[/font] - [font=times new roman]FIELD RECORDS[/font]
[font=times new roman]CITY OF LOS SANTOS * 271 AIRPORT PERIMETER WAY* LOS SANTOS SA 52527[/font][/center]
[hr][/hr]
[center][size=140][b][font=times new roman]INCIDENT REPORT[/font][/b][/size][/center]
[hr][/hr]
[divbox=black][aligntable=right,0,0,0,0,0,transparent][img]https://i.postimg.cc/V6qpRTsK/SAFD-LOGO-MINI2.png[/img][/aligntable][size=140][b][color=white][font=times new roman]A — Service Information[/font][/color][/b][/size][/divbox][list=none]
[b][color=#bf4000]A1.[/color] Unit(s):[/b] ${$("#units-ir").val()}
[b][color=#bf4000]A2.[/color] Crew Member(s):[/b] [list]${crew_member1}[/list]
[b][color=#bf4000]A3.[/color] Location of Incident:[/b] ${$("#loc-ir").val()}
[b][color=#bf4000]A4.[/color] Date of Incident:[/b] ${$("#date-ir").val()}
[b][color=#bf4000]A5.[/color] Time of Incident:[/b] ${$("#time-ir").val()}
[b][color=#bf4000]A6.[/color] Situation:[/b] ${$("#situation-ir").val()}
[/list][hr][/hr]
[divbox=black][aligntable=right,0,0,0,0,0,transparent][img]https://i.postimg.cc/V6qpRTsK/SAFD-LOGO-MINI2.png[/img][/aligntable][size=140][b][color=white][font=times new roman]B — Summary of Incident[/font][/color][/b][/size][/divbox]
[quote]${$("#summary-ir").val()}[/quote]
[hr][/hr]
[divbox=black][aligntable=right,0,0,0,0,0,transparent][img]https://i.postimg.cc/V6qpRTsK/SAFD-LOGO-MINI2.png[/img][/aligntable][size=140][b][color=white][font=times new roman]C — Equipment Usage[/font][/color][/b][/size][/divbox][list=none]
Mark equipment used with ✔ within box:
[${$("#hb").prop("checked") == true ? "cbf" : "cb"}] Hose bridge
[${$("#pl").prop("checked") == true ? "cbf" : "cb"}] Personal line
[${$("#jl").prop("checked") == true ? "cbf" : "cb"}] Jaws of life
[${$("#cs").prop("checked") == true ? "cbf" : "cb"}] Circular saw
[${$("#cos").prop("checked") == true ? "cbf" : "cb"}] Cut-off saw
[${$("#fa").prop("checked") == true ? "cbf" : "cb"}] Fire axe
[${$("#ml").prop("checked") == true ? "cbf" : "cb"}] Mallet
[${$("#pp").prop("checked") == true ? "cbf" : "cb"}] Pick pole
[${$("#pab").prop("checked") == true ? "cbf" : "cb"}] Portable air blower
[${$("#hlb").prop("checked") == true ? "cbf" : "cb"}] Halligan bar
[${$("#ia").prop("checked") == true ? "cbf" : "cb"}] Inflatable airbags
[${$("#sr").prop("checked") == true ? "cbf" : "cb"}] Stabilization rods
[${$("#ch").prop("checked") == true ? "cbf" : "cb"}] Ceiling hook
[${$("#el").prop("checked") == true ? "cbf" : "cb"}] 24 ft. Extendable ladder
[${$("#jp").prop("checked") == true ? "cbf" : "cb"}] Jump pad
[${$("#hr").prop("checked") == true ? "cbf" : "cb"}] Hydraulic rams
[${$("#others").val() == "" ? "cb" : "cbf"}] Other - [i]${$("#others").val() == "" ? "Equipment name here..." : $("#others").val()}[/i]
[/list]
[divbox=black][aligntable=right,0,0,0,0,0,transparent][img]https://i.postimg.cc/V6qpRTsK/SAFD-LOGO-MINI2.png[/img][/aligntable][size=140][b][color=white][font=times new roman]D — Hoses and Fire Extingushier[/font][/color][/b][/size][/divbox][list=none]
Mark equipment used with ✔ within box:
[${$("#ll").prop("checked") == true ? "cbf" : "cb"}] Live line / Preconnect / Crosslay
[${$("#sl").prop("checked") == true ? "cbf" : "cb"}] Supply line / Relay line
[${$("#hp").prop("checked") == true ? "cbf" : "cb"}] Hose pack
[${$("#bl").prop("checked") == true ? "cbf" : "cb"}] Booster line
[${$("#25l").prop("checked") == true ? "cbf" : "cb"}] 2.5" line
[${$("#dg").prop("checked") == true ? "cbf" : "cb"}] Deluge gun / Deck gun / Master stream

[${$("#dp").prop("checked") == true ? "cbf" : "cb"}] Dry powder
[${$("#co2").prop("checked") == true ? "cbf" : "cb"}] Carbon dioxide (CO2)
[${$("#fm").prop("checked") == true ? "cbf" : "cb"}] Foam
[${$("#wtr").prop("checked") == true ? "cbf" : "cb"}] Water
[/list]
[divbox=black][aligntable=right,0,0,0,0,0,transparent][img]https://i.postimg.cc/V6qpRTsK/SAFD-LOGO-MINI2.png[/img][/aligntable][size=140][b][color=white][font=times new roman]E — Conclusion[/font][/color][/b][/size][/divbox]
[quote]${$("#conclusion-ir").val()}[/quote]
[list=none]
I ${$("#name-ir").val()} confirm all details contained within this report is true and correct to the best of my knowledge. I confirm the presence of all other employees mentioned within this report.

${$("#signature-ir").val()}[/list]
[/divbox]`;
    $("#result-ir").html(result);
  });
});
