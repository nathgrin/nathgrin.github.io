
const refreshbtn = document.getElementById("refreshbtn"); //refreshbtn id:
const tstbtn = document.getElementById("tstbtn"); //tstbtn id:



let stationlist = ["serenaderadio",
            "beats2dancehouse",
            "happyam",
            "pinguinblues","pinguinfiesta","pinguinaardschok",
            "somafmsonicuniverse","somafmraggae","somafmsoul",
            "KCSM",
            "radioswissclassic",
            "tropicalisimasalsa","tropicalisimacumbia",
            "grolloo",
            "isekoi",
            ];
// stationlist = ["pinguinaardschok","pinguinaardschok","pinguinaardschok","pinguinaardschok","pinguinaardschok","pinguinaardschok","pinguinaardschok","pinguinaardschok","pinguinaardschok","pinguinaardschok","pinguinaardschok","pinguinaardschok","pinguinaardschok"];
let stations = {
    "grolloo":{
        "name":"Grolloo",
        "src": "https://uk1.streamingpulse.com/ssl/grollooradio",
        "genres": ["blues","americana","soul","pop"],
        "description": "Grolloo Radio, gestart op 1 mei 2020 als stichting ter bevordering van kwaliteitsmuziek, is een verfrissende toevoeging aan het radiolandschap. Met een focus op genres als blues, americana, soul en pop, biedt Grolloo Radio een unieke luisterervaring.",
        "url": "https://grollooradio.nl",
    },
    "beats2dancehouse":{
        "name":"Beats2Dance House",
        "src": "https://mediaserv38.live-streams.nl:18002/house",
        "genres": ["house"],
        "description": "",
        "url": "https://beats2dance.com/",
    },
    "beats2dancetrance":{
        "name":"Beats2Dance Trance",
        "src": "https://mediaserv38.live-streams.nl:18002/trance",
        "genres": ["trance"],
        "description": "",
        "url": "https://beats2dance.com/",
    },
    "beats2dancetechno":{
        "name":"Beats2Dance Techno",
        "src": " 	https://mediaserv38.live-streams.nl:18002/techno",
        "genres": ["techno"],
        "description": "",
        "url": "https://beats2dance.com/",
    },
    "happyam":{
        "name":"Happy AM",
        "src": "http://15676.cloudrad.io:9296/live",
        "genres": ["pop"],
        "description": "",
        "url": "https://happyradionetwork.nl/",
    },
    "pinguinblues":{
        "name":"Pinguin Blues",
        "src": "https://14223.live.streamtheworld.com/SP_R2406394_SC",
        "genres": ["blues"],
        "description": "",
        "url": "https://pinguinradio.com/",
    },
    "pinguinfiesta":{
        "name":"Pinguin Fiesta",
        "src": "https://14223.live.streamtheworld.com/SP_R2292843_SC",
        "genres": ["jazz"],
        "description": "",
        "url": "https://pinguinradio.com/",
    },
    "pinguinaardschok":{
        "name":"Pinguin Aardschok",
        "src": "https://streams.pinguinradio.com/Aardschok192.mp3",
        "genres": ["metal"],
        "description": "",
        "url": "https://pinguinradio.com/",
    },
    "kexp":{
        "name":"KEXP",
        "src": "https://kexp.streamguys1.com/kexp160.aac",
        "genres": [""],
        "description": "",
        "url": "https://www.kexp.org/",
    },
    "somafmsonicuniverse":{
        "name":"SomaFM Sonic Universe",
        "src": "https://ice4.somafm.com/sonicuniverse-128-mp3",
        "genres": ["jazz"],
        "description": "Transcending the world of jazz with eclectic, avant-garde takes on tradition.",
        "url": "https://somafm.com/",
    },
    "somafmraggae":{
        "name":"SomaFM Heavyweight Raggae",
        "src": "https://ice4.somafm.com/reggae-256-mp3",
        "genres": ["raggae","ska"],
        "description": "Reggae, Ska, Rocksteady classic and deep tracks.",
        "url": "https://somafm.com/",
    },
    "somafmsoul":{
        "name":"SomaFM Seven Inch Soul",
        "src": "https://ice4.somafm.com/7soul-128-mp3",
        "genres": ["soul"],
        "description": "Vintage soul tracks from the original 45 RPM vinyl.",
        "url": "https://somafm.com/",
    },
    "somafmfluid":{
        "name":"SomaFM Fluid",
        "src": "https://ice4.somafm.com/fluid-128-mp3",
        "genres": ["hip-hop"],
        "description": "Drown in the electronic sound of instrumental hiphop, future soul and liquid trap.",
        "url": "https://somafm.com/",
    },
    "bbc3classical":{ // doesnt work
        "name":"BBC radio 3",
        "src": "http://as-hls-ww-live.akamaized.net/pool_904/live/ww/bbc_radio_three/bbc_radio_three.isml/bbc_radio_three-audio=320000.m3u8",
        "genres": ["classical"],
        "description": "",
        "url": "https://www.bbc.co.uk/sounds/play/live:bbc_radio_three",
    },
    "radioswissclassic":{
        "name":"Radio Swiss Classic",
        "src": "https://stream.srg-ssr.ch/m/rsc_de/mp3_128",
        "genres": ["classical"],
        "description": "",
        "url": "https://www.radioswissclassic.ch/",
    },
    "tropicalisimasalsa":{
        "name":"Tropicalisima Salsa",
        "src": "https://tropicalisimafm.org:8420/;",
        "genres": ["salsa"],
        "description": "",
        "url": "https://www.tropicalisima.fm/;",
    },
    "tropicalisimacumbia":{
        "name":"Tropicalisima Cumbia",
        "src": "https://tropicalisimafm.org:8440/;",
        "genres": ["cumbia", "salsa"],
        "description": "",
        "url": "https://www.tropicalisima.fm/",
    },
    "serenaderadio":{
        "name":"Serenade Radio",
        "src": "https://stream.rcast.net/14861",
        "genres": ["oldies"],
        "description": "The music on Serenade Radio is the best in easy listening, with a nostalgic leaning. Given the preponderance of “oldies” stations these days we generally tend to steer away from the chart hits of the 60s and 70s. A great deal of the music on Serenade Radio cannot be heard anywhere else.",
        "url": "https://www.serenade-radio.com/",
    },
    "isekoi":{
        "name":"ISEKOI Radio",
        "src": "https://isekoi-radio.com/listen/isekoi/radio.mp3",
        "genres": ["Electronic","Dubstep","Drum and bass"],
        "description": "",
        "url": "https://isekoi-radio.com/public/isekoi",
    },
    "KCSM":{
        "name":"KCSM",
        "src": "http://ice7.securenetsystems.net/KCSM2",
        "genres": ["jazz"],
        "description": "",
        "url": "https://kcsm.org/",
    },
}

let stationKeys = Object.keys(stations);

function refresh(){
    window.location.reload();
    return false;
}


refreshbtn.onclick = function(){
    refresh();
}
tstbtn.onclick = function(){
    console.log("TEST");


}


function array_move(arr, old_index, new_index) { // From Reid at https://stackoverflow.com/questions/5306680/move-an-array-element-from-one-array-position-to-another
    if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr; // for testing
};


function onRowChange(row,newInd){
    // 1) need to check the order when creating table. 2) need to check where to change the new ind to.
    var checkbox = row.cells[0].children[0].children[0].children[0];
    var theKey = checkbox.name;
    console.log(stationlist );
    console.log(newInd);
    console.log(row.cells[0].children[0].children[0].children[0]);
    if (checkbox.checked){
        array_move(stationlist,stationlist.indexOf(theKey),newInd-1);
    }
    console.log(stationlist );
}


window.addEventListener('load', function () { // when loading page, setup stations etc

    console.log("Radio on load");
    
    // changesource(0);
    // not allowed
    // radio.muted = !radio.muted; /
    // radio.play();


    var out = "";
    for (let i = 0; i < stationKeys.length; i++) {
        var theKey = stationKeys[i];
        var thestationinfo = stations[theKey];
        var divlabel = "checkdiv"+theKey;
        out += "<tr>";
        out += "<td><div id='"+divlabel+"'></div></td>";
        out += "<td>"+thestationinfo['name']+"</td>";
        out += "<td>"+thestationinfo['genres'].join(", ")+"</td>";
        out += "<td>"+thestationinfo['description']+"</td>";
        out += "<td>"+"<a href=\""+thestationinfo['url']+"\">"+thestationinfo['url']+"</a>"+"</td>";
        out += "</tr>"

        
    }
    // console.log(out);
    document.getElementById("stationsinfotbody").innerHTML = out;

    
    for (let i = 0; i < stationKeys.length; i++) {
        var theKey = stationKeys[i];
        var thestationinfo = stations[theKey];
        var divlabel = "checkdiv"+theKey;
        // and now for the checkbox..
        var label= document.createElement("label");
        // var description = document.createTextNode(theKey);
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";    // make the element a checkbox
        checkbox.name = theKey;      // give it a name we can check on the server side
        checkbox.id = "check"+theKey;      // give it a name we can check on the server side
        
        if ( stationlist.includes(theKey) ){ checkbox.checked = true;
        } else { checkbox.checked = false; }
        // checkbox.value = thestationinfo['name'];         // make its value "pair"
        
        label.appendChild(checkbox);   // add the box to the element
        // label.appendChild(description);// add the description to the element
        
        // add the label element to your div
        document.getElementById(divlabel).innerHTML = ''; // clear it first
        document.getElementById(divlabel).appendChild(label);
    }
    
})





