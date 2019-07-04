var myText = document.getElementById("main-content");

async function doSomething() {
    var results = await fetch(`./data1.json`);

    await console.log("results", results)
    await console.log("results stringify", JSON.stringify(results))
    await localStorage.setItem(`fe1-fetchedData`, JSON.stringify(results))

}

window.addEventListener('load', async e => {

    let firstRunEverr = localStorage.getItem("fe1-firstRunEv1");

    if ((firstRunEverr == null) || (firstRunEverr == undefined)) {
        localStorage.setItem("fe1-local_data", "");
        
        localStorage.setItem("fe1-firstRunEv1", "1");
    }
    await updateData();

});

async function updateData() {
    //res means result
    var res = await fetch(`./questions.json`);
    var localInfo = await res.json();
    await localStorage.setItem(`questions`, JSON.stringify(localInfo))

    




    myText.innerHTML += `  
    <div class="container pt-5 text-center"> 
     <a href="detail.html?id=0"><button id="start-button" class="btn btn-success btn-lg">Take Survey
     </button></a>
     <div class="row disclaimer-text">
     <h1>Disclaimer: All questions will submit automatically once the survey is complete</h1>
    </div>
    </div>
    `
}

myText.innerHTML += `</div></div>
`