const radio = document.getElementById("radiolink"); //Your radio/audio id:

const refreshbtn = document.getElementById("refreshbtn"); //refreshbtn id:
const tstbtn = document.getElementById("tstbtn"); //tstbtn id:

const importbtn = document.getElementById("importbtn"); 

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

// stationlist=[]and stations={} are declared in defaults.js

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


importbtn.onclick = function(){
    console.log("Import");
    var files = document.getElementById('selectFiles').files;
    // console.log(files);
    if (files.length <= 0) {
      return false;
    }
  
    var fr = new FileReader();
  
    fr.onload = function(e) { 
        // console.log(e);
        var result = JSON.parse(e.target.result);
        // var formatted = JSON.stringify(result, null, 2);
        // document.getElementById('result').value = formatted;
        // console.log(formatted);
        process_filedata(result);
    }
    fr.readAsText(files.item(0));


}

function populate_table(){

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

    populate_table();

})




// setInterval(volumef, 100); //runs volumef function  every 100ms
