const radio = document.getElementById("radiolink"); //Your radio/audio id:

const refreshbtn = document.getElementById("refreshbtn"); //refreshbtn id:
const tstbtn = document.getElementById("tstbtn"); //tstbtn id:


const submitAddressbtn = document.getElementById("submitAddressbtn"); //submitadress id:
const defaultAddressbtn = document.getElementById("defaultAddressbtn"); //submitadress id:
const theAddressElement = document.getElementById("address");

let getWinnerAddress = "http://192.168.1.245/" // ip of arduino

theAddressElement.value = getWinnerAddress;

let currentstation = 0; // winner from arduino

let stationlist = ["serenaderadio",
            "beats2dancehouse",
            "happyam",
            "pinguinblues","pinguinfiesta","pinguinaardschok",
            "somafmsonicuniverse","somafmraggae","somafmsoul",
            "bbc3classical",
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
    "bbc3classical":{
        "name":"BBC radio 3",
        "src": "http://as-hls-ww-live.akamaized.net/pool_900/live/ww/bbc_radio_three/bbc_radio_three.isml/bbc_radio_three-audio%3d96000.norewind.m3u8",
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
        "genres": ["cumbia"],
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
}


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


submitAddressbtn.onclick = function(){
    getWinnerAddress = theAddressElement.value;
    console.log("New address: ",getWinnerAddress)
}
defaultAddressbtn.onclick = function(){
    getWinnerAddress = "http://192.168.1.245/";
    theAddressElement.value = getWinnerAddress
    console.log("Default address: ",getWinnerAddress)
}

function checkNewWinner(){
    console.log("Check new winner")
    httpGetAsync(getWinnerAddress,processResponse); // had to enable the thingy
    
}
setInterval(checkNewWinner, 10000); //runs volumef function  every 100ms

window.addEventListener('load', function () {

    console.log("Radio on load");
    
    changesource(0);
    // not allowed
    // radio.muted = !radio.muted; /
    // radio.play();


    var out = "";
    for (let i = 0; i < stationlist.length; i++) {
        var thestationinfo = stations[stationlist[i]];
        out += "<tr>";
        out += "<td>"+i+"</td>";
        out += "<td>"+thestationinfo['name']+"</td>";
        out += "<td>"+thestationinfo['genres']+"</td>";
        out += "<td>"+thestationinfo['description']+"</td>";
        out += "<td>"+"<a href=\""+thestationinfo['url']+"\">"+thestationinfo['url']+"</a>"+"</td>";
        out += "</tr>"
    }
    // console.log(out);
    document.getElementById("stationsinfotbody").innerHTML = out;
    


})

function httpGetAsync(theUrl, callback) // function to retrieve data from a server
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

function processResponse(responseText){
    console.log("processResponse")
    var parser=new DOMParser();
    var xmlDoc=parser.parseFromString(responseText,"text/xml");
    var winner = parseInt(xmlDoc.getElementById("winner").innerHTML);
    
    if (winner == currentstation){
        console.log("same Winner",winner)
        return true;
    }

    // console.log(responseText);
    console.log("new Winner:", winner);
    currentstation = winner;
    changesource(winner);
    return true;

}

function changesource(winner){
    
    var thestation = stationlist[winner];

    var thestationinfo = stations[thestation];


    console.log("Change source:",thestation);
    console.log(thestationinfo);
    radio.src = thestationinfo['src'];

    document.getElementById("current-name").innerHTML = thestationinfo['name'];
    document.getElementById("current-genres").innerHTML = thestationinfo['genres'];
    document.getElementById("current-descr").innerHTML = thestationinfo['description'];
    document.getElementById("current-url").innerHTML = "<a href=\""+thestationinfo['url']+"\">"+thestationinfo['url']+"</a>";
    

    // refresh();
    radio.play();
}




// setInterval(volumef, 100); //runs volumef function  every 100ms
