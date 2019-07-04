var urlid = $_GET("id");

window.addEventListener("load", async e => {
    let firstRunEverr = localStorage.getItem("fe1-firstRunEv1");

    if (firstRunEverr == null || firstRunEverr == undefined) {
        localStorage.setItem("fe1-local_data", "");
        //localStorage.setItem("fe1-fetchedData", "");
        localStorage.setItem("fe1-firstRunEv1", "1");
    }
    await updateData();
});

async function updateData() {}


function $_GET(param) {
    var vars = {};
    window.location.href.replace(location.hash, "").replace(
        /[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
        function(m, key, value) {
            // callback
            vars[key] = value !== undefined ? value : "";
        }
    );

    if (param) {
        return vars[param] ? vars[param] : null;
    }
    return vars;
}

var dataSource = JSON.parse(localStorage.getItem("questions"));

var dataModel = dataSource.map(obj => ({...obj, answered: "false"
}));

function getQuestionDataFromLs(ID) {
    const objArray = JSON.parse(localStorage.getItem("questions"));

    return objArray[ID];
}

var dataObj = getQuestionDataFromLs(urlid);

function setanswer(a, b, c) {

    var element = document.getElementById(a + "." + b);
    element.style.background = "#efefef";
    dataSource[a].questions[b].answered = dataSource[a].answers[c];

    localStorage.setItem("questions", JSON.stringify(dataSource));
    var complete = true;

    for (var i = 0; i < dataSource.length; i++) {
        for (var j = 0; j < dataSource[i].questions.length; j++) {
            if (dataSource[i].questions[j].answered == "false") {
                complete = false;
                break;
            }
        }
    }

    if (complete == true) {

        displayChart();

        console.log("finish");

        //send API
        var emptyArray = {}
        dataSource.map(
            (src) => {
                for (var j = 0; j < src.questions.length; j++) {
                    var string1 = "question_" + src.survey + "_" + j;
                    emptyArray[string1] = (src.questions[j].answered);
                }
            });

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://localhost:8000/languages/",
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
                "Accept": "*/*",
            },
            "processData": false,
            "data": JSON.stringify(emptyArray)
        }

        $.ajax(settings).done(function(response) {
            console.log(response);
        });



        for (var i = 0; i < dataSource.length; i++) {
            for (var j = 0; j < dataSource[i].questions.length; j++) {
                dataSource[i].questions[j].answered = "false"

            }
        }


        localStorage.setItem("questions", "")

    } //Complete=true

    updateButton()
    updateProgress()
}

function restart() {
    window.location.href = "index.html"
}

function postData(url = '', data = {}) {
    // Default options are marked with *
    return fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            accept: '*/*',
            mode: 'no-cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            // credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            // redirect: 'follow', // manual, *follow, error
            // referrer: 'no-referrer', // no-referrer, *client
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        })
        .then(response => response.json()); // parses JSON response into native Javascript objects 

}

var progCount;

function displayChart() {
    var options = {
        chart: {
            type: 'donut',
        },
        series: [44, 55, 41, 17, 15],
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200,
                    height: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    }




    $('#exampleModal').modal('show')



    var qOneScore = 0;
    var qTwoScore = 0;
    var qThreeScore = 0;
    var qFourScore = 0;


    for (var i = 0; i < dataSource.length; i++) {
        //Question 1 chart score
        var totalScore = 0;
        if (i == 0) {
            for (var j = 0; j < dataSource[i].questions.length; j++) {
                if (dataSource[i].questions[j].answered == "None of the time") {
                    qOneScore += 1;
                }
                if (dataSource[i].questions[j].answered == "Rarely") {
                    qOneScore += 2;
                }
                if (dataSource[i].questions[j].answered == "Some of the time") {
                    qOneScore += 3;
                }
                if (dataSource[i].questions[j].answered == "Often") {
                    qOneScore += 4;
                }
                if (dataSource[i].questions[j].answered == "All of the time") {
                    qOneScore += 5;
                }
            }

        }


        //Question 2 chart score
        if (i == 1) {
            for (var j = 0; j < dataSource[i].questions.length; j++) {
                if (dataSource[i].questions[j].answered == "Not at all") {
                    qTwoScore += 0;
                }
                if (dataSource[i].questions[j].answered == "Several days") {
                    qTwoScore += 1;
                }
                if (dataSource[i].questions[j].answered == "More than half the days") {
                    qTwoScore += 2;
                }
                if (dataSource[i].questions[j].answered == "Nearly every day") {
                    qTwoScore += 3;
                }
            }
        }

        //Question 3 chart score
        if (i == 2) {
            for (var j = 0; j < dataSource[i].questions.length; j++) {
                if (dataSource[i].questions[j].answered == "Not at all") {
                    qThreeScore += 0;
                }
                if (dataSource[i].questions[j].answered == "Several days") {
                    qThreeScore += 1;
                }
                if (dataSource[i].questions[j].answered == "More than half the days") {
                    qThreeScore += 2;
                }
                if (dataSource[i].questions[j].answered == "Nearly every day") {
                    qThreeScore += 3;
                }
            }
        }

        //Question 4 chart score
        if (i == 3) {

            for (var j = 0; j < dataSource[i].questions.length; j++) {
                if (j < 2) {
                    if (dataSource[i].questions[j].answered == "Yes") {
                        qFourScore += 1;
                    }
                    if (dataSource[i].questions[j].answered == "More or less") {
                        qFourScore += 1;
                    }
                    if (dataSource[i].questions[j].answered == "No") {
                        qFourScore += 0;
                    }
                }
                if (j >= 2) {
                    if (dataSource[i].questions[j].answered == "Yes") {
                        qFourScore += 0;
                    }
                    if (dataSource[i].questions[j].answered == "More or less") {
                        qFourScore += 1;
                    }
                    if (dataSource[i].questions[j].answered == "No") {
                        qFourScore += 1;
                    }
                }
            }
        }
    }

    //interpret chart scores
    var qOneLabel;
    var qTwoLabel;
    var qThreeLabel;
    var qFourLabel;

    if (qOneScore <= 40) {
        qOneLabel = "High risk of major depression, please seek help";
    } else if (qOneScore >= 41 && qOneScore <= 45) {
        qOneLabel = "High risk of psychological distress and increased risk of depression";
    } else if (qOneScore > 45) {
        qOneLabel = "Good level of mental well-being";
    }


    if (qTwoScore < 4) {
        qTwoLabel = "No Depression";
    } else if (qTwoScore >= 5 && qTwoScore <= 9) {
        qTwoLabel = "Mild Depression";
    } else if (qTwoScore >= 10 && qTwoScore <= 14) {
        qTwoLabel = "Moderate Depression";
    } else if (qTwoScore >= 15 && qTwoScore <= 19) {
        qTwoLabel = "Moderately Severe Depression";
    } else if (qTwoScore >= 20 && qTwoScore <= 27) {
        qTwoLabel = "Severe Depression";
    }

    if (qThreeScore < 5) {
        qThreeLabel = "No Anxiety";
    } else if (qThreeScore >= 5 && qThreeScore <= 9) {
        qThreeLabel = "Mild Anxiety";
    } else if (qThreeScore >= 10 && qThreeScore <= 14) {
        qThreeLabel = "Moderate Anxiety";
    } else if (qThreeScore >= 15) {
        qThreeLabel = "Severe Anxiety";
    }

    switch (qFourScore) {
        case 0:
            qFourLabel = "Not lovely";
            break;
        case 1:
            qFourLabel = "Not lovely";
            break;
        case 2:
            qFourLabel = "Moderate lonely";
            break;
        case 3:
            qFourLabel = "Moderate lonely";
            break;
        case 4:
            qFourLabel = "Severe lonely";
            break;
        case 5:
            qFourLabel = "Severe lonely";
            break;
        case 6:
            qFourLabel = "Very severe lonely";
            break;
        default:
            break;
    }

    //Format donut chart animation
    var qOneRemain = qOneScore - 70;
    var qTwoRemain = qTwoScore - 27;
    var qThreeRemain = qThreeScore - 21;
    var qFourRemain = qFourScore - 6;




    //dispaly chart1 
    var ctx = document.getElementById('myChart1').getContext('2d');

    var chart = new Chart(document.getElementById("myChart1"), {
        type: 'doughnut',
        data: {
            labels: [qOneLabel],
            datasets: [{
                label: qOneLabel,
                backgroundColor: ["#3e95cd"],
                // backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
                data: [qOneScore, qOneRemain]
            }]
        },
        options: {
            title: {
                display: true,
                text: `WEMWBS Level of mental wellbeing`
            }
        }
    });


    //Display chart 2
    var ctx = document.getElementById('myChart2').getContext('2d');
    var chart = new Chart(document.getElementById("myChart2"), {
        type: 'doughnut',
        data: {
            labels: [qTwoLabel],
            datasets: [{
                label: qTwoLabel,
                backgroundColor: ["#c45850"],
                data: [qTwoScore, qTwoRemain]
            }]
        },
        options: {
            title: {
                display: true,
                text: `PHQ-9 Level of depression`
            }
        }
    });


    //Display chart 3
    var ctx = document.getElementById('myChart3').getContext('2d');

    var chart = new Chart(document.getElementById("myChart3"), {
        type: 'doughnut',
        data: {
            labels: [qThreeLabel],
            datasets: [{
                label: qThreeLabel,
                backgroundColor: ["#8e5ea2"],
                data: [qThreeScore, qThreeRemain]
            }]
        },
        options: {
            title: {
                display: true,
                text: `GAD-7 Level of anxiety`
            }
        }
    });


    //Display chart 4
    var ctx = document.getElementById('myChart4').getContext('2d');

    var chart = new Chart(document.getElementById("myChart4"), {
        type: 'doughnut',
        data: {
            labels: [qFourLabel],
            datasets: [{
                label: qFourLabel,
                backgroundColor: ["#3cba9f"],
                data: [qFourScore, qFourRemain]
            }]
        },
        options: {
            title: {
                display: true,
                text: 'DJG-6 Level of lonliness'
            }
        }
    });

}

function updateButton() {
    var eNavButtons = document.getElementById('nav-buttons');
    var answeredCount = 0;
    var navButtons = dataSource
        .map(
            (src, index) => {
                var complete = true;
                answeredCount = 0;

                for (var j = 0; j < src.questions.length; j++) {
                    if (src.questions[j].answered == "false") {
                        complete = false;
                    } else {
                        answeredCount++;
                        progCount++;

                    }
                }

                return ` 
  <a href="detail.html?id=${index}"><button class="btn btn-${(complete) ? 'success' : 'secondary'}">Q:${index +
    1} 
    <span class="badge badge-light">${answeredCount}/${src.questions.length}</span> 
  </button></a> 
          `
            }
        )
        .join("");
    eNavButtons.innerHTML = navButtons;
}

function updateProgress() {
    var eProgressBar = document.getElementById('progress-bar');
    var progLength = dataSource[urlid].questions.length;
    progCount = 0;

    for (var i = 0; i < dataSource[urlid].questions.length; i++) {
        if (dataSource[urlid].questions[i].answered != "false") {
            progCount++;
        }
    }
    var progPercent = (progCount / progLength) * 100;


    var progCode = `<div class="progress-bar progress-bar-striped bg-success" style="width:${progPercent}%">Answered ${progCount}/${progLength} questions</div>`
    eProgressBar.innerHTML = progCode;
}



var subQuestions = dataObj.questions.map((question, index) => {
    var newAnswer = dataObj.answers
        .map(
            (answer, i) => `
  <div id="buttons-${urlid}-${index}" class="input-group funkyradio-success">
            <input onchange="setanswer(${urlid},${index},${i})" type="radio" name="radio-${index}" 
            id="radio-${urlid}-${index}-${i}" ${
        question.answered == dataSource[urlid].answers[i] ? "checked" : ""
      }/>
            <label for="radio-${urlid}-${index}-${i}">${answer}</label>
          </div>
  `
        )
        .join("");


    return `
<div id="${parseInt(urlid)}.${index}" class="card-body" ${
    question.answered == "false" ? "" : 'style="background: #efefef"'
  }>
<h5 class="card-title">Q:${parseInt(urlid) + 1}.${index + 1} ${
    question.text
  }</h5>
<div class="funkyradio text-left">
  ${newAnswer}

</div>
<p class="card-text">

</p>
</div>
`
}).join("</br>");

var navButtons = dataSource
    .map(
        (src, index) => {
            var complete = true;
            for (var j = 0; j < src.questions.length; j++) {
                if (src.questions[j].answered == "false") {
                    complete = false;
                    break;
                }
            }
            return ` 
  <a href="detail.html?id=${index}"><button class="btn btn-${(complete) ? 'success' : 'secondary'}">Q:${index +
      1} 
  </button></a> 
          `
        }
    )
    .join("");
var queueLength = dataObj.questions.map(
    (item, index) => `
<span id="badge-response-${index + 1}" class="badge badge-secondary">${index +
    1}</span>
`
);


var output = `
<nav class="navbar text-center fixed-top navbar-light bg-light">
<div id="nav-buttons" class="mx-auto">
${navButtons}
</div>
<div>
<div class="pt-3 w-100">
<h5>${dataObj.title}</h5>
</div>
<div id="progress-bar" class="progress">
</div>
</nav>
<div class="row">




  <div class="card text-center card-body">
  
    ${subQuestions}

  
  </div>
  </div>
`;
var div = document.getElementById("app");

div.innerHTML = output;
updateButton()
updateProgress()


