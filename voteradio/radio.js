const radio = document.getElementById("radiolink"); //Your radio/audio id:

const refreshbtn = document.getElementById("refreshbtn"); //refreshbtn id:
const tstbtn = document.getElementById("tstbtn"); //tstbtn id:


const BTreadWinnerbtn = document.getElementById("BTreadWinner"); //
const BTstartNotificationsbtn = document.getElementById("BTstartNotifications"); //
const BTstopNotificationsbtn = document.getElementById("BTstopNotifications"); //
const BTresetbtn = document.getElementById("BTreset"); //

BTreadWinnerbtn.onclick = onBTreadWinnerButtonClick;
BTstartNotificationsbtn.onclick = onBTstartNotificationsButtonClick;
BTstopNotificationsbtn.onclick = onBTstopNotificationsButtonClick;
BTresetbtn.onclick = onBTresetButtonClick;

const UUid = "69a513e7-ab5a-407b-b467-6444b2704cf5";


var bluetoothDevice;
var winnerCharacteristic;


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
        "src": "https://mediaserv38.live-streams.nl:18002/techno",
        "genres": ["techno"],
        "description": "",
        "url": "https://beats2dance.com/",
    },
    "happyam":{
        "name":"Happy AM",
        "src": "https://15676.cloudrad.io:9296/live",
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
        "src": "https://as-hls-ww-live.akamaized.net/pool_904/live/ww/bbc_radio_three/bbc_radio_three.isml/bbc_radio_three-audio=320000.m3u8",
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
    "KCSM":{
        "name":"KCSM",
        "src": "https://ice7.securenetsystems.net/KCSM2",
        "genres": ["Jazz"],
        "description": "",
        "url": "https://kcsm.org/",
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



// BT functions
function onBTreadWinnerButtonClick() {
    return (bluetoothDevice ? Promise.resolve() : requestDevice())
    .then(connectDeviceAndCacheCharacteristics)
    .then(_ => {
      console.log('Reading Winner...');
      return winnerCharacteristic.readValue();
    })
    .catch(error => {
      console.log('onreadwinner Argh! ' + error);
    });
  }

function requestDevice() {
console.log('Requesting any Bluetooth Device...');
return navigator.bluetooth.requestDevice({
    filters: [{services: [UUid]}],// <- Prefer filters to save energy & show relevant devices.
    // acceptAllDevices: true,
    services: [UUid]})
.then(device => {
    bluetoothDevice = device;
    bluetoothDevice.addEventListener('gattserverdisconnected', onDisconnected);
});
}

function connectDeviceAndCacheCharacteristics() {
    if (bluetoothDevice.gatt.connected && winnerCharacteristic) {
      return Promise.resolve();
    }
  
    console.log('Connecting to GATT Server...');
    return bluetoothDevice.gatt.connect()
    .then(server => {
      console.log('Getting Winner Service...');
      return server.getPrimaryService(UUid);
    })
    .then(service => {
      console.log('Getting Winner Level Characteristic...');
      return service.getCharacteristic(UUid);
    })
    .then(characteristic => {
      winnerCharacteristic = characteristic;
      winnerCharacteristic.addEventListener('characteristicvaluechanged',
          handleWinnerChanged);
      document.querySelector('#BTstartNotifications').disabled = false;
      document.querySelector('#BTstopNotifications').disabled = true;
    });
  }


  /* This function will be called when `readValue` resolves and
 * characteristic value changes since `characteristicvaluechanged` event
 * listener has been added. */
function handleWinnerChanged(event) {
    let winner = event.target.value.getUint8(0);
    console.log('> Winner is ' + winner);
    changesource(winner);
  }
  
function onBTstartNotificationsButtonClick() {
console.log('Starting Winner Notifications...');
winnerCharacteristic.startNotifications()
.then(_ => {
    console.log('> Notifications started');
    document.querySelector('#BTstartNotifications').disabled = true;
    document.querySelector('#BTstopNotifications').disabled = false;
})
.catch(error => {
    console.log('onstart Argh! ' + error);
});
}

  
function onBTstopNotificationsButtonClick() {
console.log('Stopping Winner Notifications...');
winnerCharacteristic.stopNotifications()
.then(_ => {
    console.log('> Notifications stopped');
    document.querySelector('#BTstartNotifications').disabled = false;
    document.querySelector('#BTstopNotifications').disabled = true;
})
.catch(error => {
    console.log('onstop Argh! ' + error);
});
}


function onBTresetButtonClick() {
    if (winnerCharacteristic) {
      winnerCharacteristic.removeEventListener('characteristicvaluechanged',
          handleWinnerChanged);
      winnerCharacteristic = null;
    }
    // Note that it doesn't disconnect device.
    bluetoothDevice = null;
    console.log('> Bluetooth Device reset');
  }


function onDisconnected() {
    console.log('> Bluetooth Device disconnected');
    connectDeviceAndCacheCharacteristics()
    .catch(error => {
        console.log('ondisconnect Argh! ' + error);
    });
}

// Voteradio functions
function changesource(winner){
    
    var thestation = stationlist[winner];

    var thestationinfo = stations[thestation];


    console.log("Change source:",thestation);
    console.log(thestationinfo);
    radio.src = thestationinfo['src'];

    document.getElementById("current-name").innerHTML = thestationinfo['name'];
    document.getElementById("current-genres").innerHTML = thestationinfo['genres'].join(", ");
    document.getElementById("current-descr").innerHTML = thestationinfo['description'];
    document.getElementById("current-url").innerHTML = "<a href=\""+thestationinfo['url']+"\">"+thestationinfo['url']+"</a>";
    

    // refresh();
    radio.play();
}

window.addEventListener('load', function () { // when loading page, setup stations etc

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
        out += "<td>"+thestationinfo['genres'].join(", ")+"</td>";
        out += "<td>"+thestationinfo['description']+"</td>";
        out += "<td>"+"<a href=\""+thestationinfo['url']+"\">"+thestationinfo['url']+"</a>"+"</td>";
        out += "</tr>"
    }
    // console.log(out);
    document.getElementById("stationsinfotbody").innerHTML = out;
    
})




// setInterval(volumef, 100); //runs volumef function  every 100ms
