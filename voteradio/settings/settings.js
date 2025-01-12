
const refreshbtn = document.getElementById("refreshbtn"); //refreshbtn id:
const tstbtn = document.getElementById("tstbtn"); //tstbtn id:



// const savebtn = document.getElementById("savebtn"); 
const resetbtn = document.getElementById("resetbtn"); 

const importbtn = document.getElementById("importbtn"); 
const exportbtn = document.getElementById("exportbtn"); 

// declared in ../defaults.js
// var stations = {};
// var stationlist = [];

function refresh(){
    window.location.reload();
    return false;
}


refreshbtn.onclick = function(){
    refresh();
}
tstbtn.onclick = function(){
    console.log("TEST");
    cookieREAD();
}


// savebtn.onclick = function(){
//     console.log("Save");
//     //Save a cookie or smth
//     var data = prepare_jsondata();
//     cookieSAVE(data);
// }

resetbtn.onclick = function(){
    console.log("Reset");
    window.location.reload();
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

function prepare_jsondata(){
    var arr = [];
    var table = document.getElementById("allstationstable");
    for (var i = 1, row; row = table.rows[i]; i++) {
        var checkbox = row.cells[0].children[0].children[0].children[0];
        theKey = checkbox.name;

        arr.push( stations[theKey] );
        arr[arr.length-1]['key'] = theKey;
        arr[arr.length-1]['checked'] = checkbox.checked;
    }
    return arr
}

exportbtn.onclick = function(){
    console.log("Export");

    //populate the out arr
    var arr = prepare_jsondata()
    // var out = JSON.stringify(arr);
    // console.log(out);
    saveJSON(arr,"stations.json");
}

    // from Maia at https://stackoverflow.com/questions/19721439/download-json-object-as-a-file-from-browser
const saveJSON = (data, filename) => {
        const blob = new Blob([JSON.stringify(data,undefined,4)], { type: "text/json" });
        const link = document.createElement("a");
    
        link.download = filename;
        link.href = window.URL.createObjectURL(blob);
        link.dataset.downloadurl = ["text/json", link.download, link.href].join(":");
    
        const evt = new MouseEvent("click", {
            view: window,
            bubbles: true,
            cancelable: true,
        });
    
        link.dispatchEvent(evt);
        link.remove()
    };



function cookieSAVE(data) { // well this doesnt work
    var out = JSON.stringify(data);
    document.cookie = "stations="+out+
        "; domain=." + 
        location.hostname.split('.').reverse()[1] + "." + 
        location.hostname.split('.').reverse()[0] + "; path=/"
    console.log("stations="+out+
        "; domain=." + 
        location.hostname.split('.').reverse()[1] + "." + 
        location.hostname.split('.').reverse()[0] + "; path=/");

}

function cookieREAD(){
    var data = Cookie.get('stations');
    console.log(data);
}

function updateShowStationlist(){
    console.log(stationlist);
    var listdiv = document.getElementById("showstationlist");
    
    listdiv.innerHTML = "<b>"+stationlist.length+":</b> "+stationlist.join(', ');

}


function array_move(arr, old_index, new_index) { // From Reid at https://stackoverflow.com/questions/5306680/move-an-array-element-from-one-array-position-to-another
    if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    arr.filter(item => item);
    return arr; // for testing
};

function find_checked_index_in_table(theKey){
    // find index in table if only counting the checked.
    var cnt = 0;
    var table = document.getElementById("allstationstable");
    for (var i = 1, row; row = table.rows[i]; i++) {
        var checkbox = row.cells[0].children[0].children[0].children[0];
        if (checkbox.name == theKey){break;}
        if (checkbox.checked){cnt = cnt + 1;}
    }
    return cnt
}

function onRowChange(currRow){
    // 1) need to check the order when creating table. 2) need to check where to change the new ind to.
    var checkbox = currRow.cells[0].children[0].children[0].children[0];
    var theKey = checkbox.name;
    if (checkbox.checked){
        array_move(stationlist,stationlist.indexOf(theKey),find_checked_index_in_table(theKey));
    }
    updateShowStationlist();
}

function toggleCheckbox(element)
 {
    // element.checked = !element.checked; // this was for onchange but somehow that failed
    if (element.checked){ // insert in stationlist
        stationlist.splice(find_checked_index_in_table(element.name), 0, element.name);
    } else { // rid of it
        stationlist.splice(find_checked_index_in_table(element.name),1);
    }
    updateShowStationlist();
 }

function populate_table(){
    var stationKeys = Object.keys(stations).sort();

    var theOrder = JSON.parse(JSON.stringify(stationlist));//stationlist;
    for (let i = 0; i < stationKeys.length; i++) {
        if(!theOrder.includes(stationKeys[i])){
            theOrder.push(stationKeys[i]);
        }
    }
    // console.log(theOrder);

    var out = "";
    for (let i = 0; i < theOrder.length; i++) {
        var theKey = theOrder[i];
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

    // The checkboxes
    for (let i = 0; i < theOrder.length; i++) {
        var theKey = theOrder[i];
        var thestationinfo = stations[theKey];
        var divlabel = "checkdiv"+theKey;
        // and now for the checkbox..
        var label= document.createElement("label");
        // var description = document.createTextNode(theKey);
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";    // make the element a checkbox
        checkbox.name = theKey;      // give it a name we can check on the server side
        checkbox.id = "check"+theKey;      // give it a name we can check on the server side
        checkbox.setAttribute("onclick","toggleCheckbox(this)");
        
        if ( stationlist.includes(theKey) ){ checkbox.checked = true;
        } else { checkbox.checked = false; }
        // checkbox.value = thestationinfo['name'];         // make its value "pair"
        
        label.appendChild(checkbox);   // add the box to the element
        // label.appendChild(description);// add the description to the element
        
        // add the label element to your div
        document.getElementById(divlabel).innerHTML = ''; // clear it first
        document.getElementById(divlabel).appendChild(label);
    }
}


window.addEventListener('load', function () { // when loading page, setup stations etc

    console.log("Radio on load");
    updateShowStationlist();
    
    // changesource(0);
    // not allowed
    // radio.muted = !radio.muted; /
    // radio.play();

    // get defaults
    // fetch('../defaults.json')
    // .then((response) => response.json())
    // .then((json) => console.log(json));

    populate_table();
    
})





