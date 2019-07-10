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
            document.getElementById("pageStyle").setAttribute("href", "https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css");
            var video = document.getElementById("myvid");
            var mast = document.getElementById("mast");
            video.style.display = "none";
            mast.style.display = "none";
            document.getElementById("allContainers").style.display = "block"
        }
    });
}
