
function process_filedata(data){
    stationlist = [];
    stations = {};
    for (let i = 0; i < data.length; i++) {
        var entry = data[i];
        if (entry['checked']){stationlist.push(entry['key']);}
        stations[entry['key']] = entry;
    }
    // clear and repopulate
    document.getElementById("stationsinfotbody").innerHTML = "";
    populate_table();


}
