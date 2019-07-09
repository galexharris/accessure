function sendURL() {
    let url = document.getElementById('website-url').value;
    let json = JSON.stringify({ url: url});
    console.log(json);
    $.ajax({
        url: "/api/score/",
        type: "POST",
        data: json,
        contentType: "application/json",
        dataType: "json",
        success: function (data) {
            console.log(data);
        }
    });
}
