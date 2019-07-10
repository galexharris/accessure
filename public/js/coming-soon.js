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
            document.getElementById('loading-img').style.visibility = "hidden";
            console.log(data);
            console.log(data[0]);
            document.getElementById("pageStyle").setAttribute("href", "https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css");
            var video = document.getElementById("myvid");
            var mast = document.getElementById("mast");
            video.style.display = "none";
            mast.style.display = "none";
            var i;
            document.getElementById("allContainers").style.display = "block"

            // for(i = 0; i < data.issues.length; i++){
            //               var listElem = document.createElement("LI");
            //   listElem.innerHTML = data.issues[i].message;
            //   document.getElementById("issues3").appendChild(listElem);
            // }

            document.getElementById("siteTitle").innerHTML = "Analyzed: "+url;
            document.getElementById("num5").innerHTML = data[0].num_errors + " Issues";
            document.getElementById("num2").innerHTML = data[1].num_errors + " Issues";
            document.getElementById("num1").innerHTML = data[2].num_errors + " Issues";
            document.getElementById("num3").innerHTML = data[3].num_errors + " Issues";
            document.getElementById("num4").innerHTML = data[4].num_errors + " Issues";


        }
    });
}
