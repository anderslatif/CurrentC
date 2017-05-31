function logOut() {
    socket.disconnect();
    $.get("/logout").done(function (data) {
        window.location = "/";
    });
}

var peerinfo = [];

$.get("/getpeerinfo", function (data) {

    JSON.parse(data).forEach( function (peerconnection) {
        var peer = {};
        peer.ipaddress = peerconnection.addr;
        peer.lastsend = timeConverter(peerconnection.lastsend);
        peer.lastreceived = timeConverter(peerconnection.lastrecv);
        peer.bytessent = peerconnection.bytessent;
        peer.bytesreceived = peerconnection.bytesrecv;
        peer.protocolversion = peerconnection.version;
        peer.subversion = peerconnection.subver.slice(1, -1);
        peerinfo.push(peer);
    });
    $('#peertable').bootstrapTable({
        data: peerinfo
    });
});

$.get("/getinfo", function(data) {

    var info = JSON.parse(data);
    $("#balance").html(info.balance);
    $("#blocks").html(info.blocks);
    $("#connections").html(info.connections);
    $("#difficulty").html(info.difficulty);
    $("#keypoolsize").html(info.keypoolsize);

});



function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
}