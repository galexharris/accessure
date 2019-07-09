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
        }
    });
}
