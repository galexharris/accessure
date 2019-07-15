function sendURL() {
    let url = document.getElementById('website-url').value;
    let json = JSON.stringify({ url: url});
    document.getElementById('loading-img').style.visibility = "visible";
    console.log(json);
    $.ajax({
        url: "/api/score/",
        type: "POST",
        data: json,
        contentType: "application/json",
        dataType: "json",
        success: function (data) {
            console.log(data);

            //switch bootstrap stylesheets after we get the API call (sorry)
            document.getElementById("pageStyle").setAttribute("href", "https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css");

            //hide the front page
            document.getElementById('loading-img').style.visibility = "hidden";
            var video = document.getElementById("myvid");
            var mast = document.getElementById("mast");
            video.style.display = "none";
            mast.style.display = "none";

            document.getElementById("allContainers").style.display = "block"

            //loop through problems for each persona
            for(issueNum = 0; issueNum < 5; issueNum++){

              //if a persona has 0 problems, replace w/ None!
              if(data[issueNum].num_errors == 0){
                var newEl = document.createElement('p');
                newEl.innerHTML = '<b>None!</b>';
                var table = document.getElementById("issues"+issueNum);
                table.parentNode.replaceChild(newEl, table);
              }

              //else add issues + context to table
              for(i = 0; i < data[issueNum].num_errors; i++){
                var table = document.getElementById("issues"+issueNum);
                  var row = table.insertRow(-1);
                  var cell1 = row.insertCell(0);
                  var cell2 = row.insertCell(1);
                  cell1.innerHTML = data[issueNum].errors[i].message;
                  cell2.innerHTML = data[issueNum].errors[i].selector;
              }
            }

            //Replace front page issue counts
            document.getElementById("siteTitle").innerHTML = "Analyzed: "+url;
            document.getElementById("num5").innerHTML = data[0].num_errors + " Issues";
            document.getElementById("num2").innerHTML = data[1].num_errors + " Issues";
            document.getElementById("num1").innerHTML = data[2].num_errors + " Issues";
            document.getElementById("num3").innerHTML = data[3].num_errors + " Issues";
            document.getElementById("num4").innerHTML = data[4].num_errors + " Issues";
        }
    });
}
