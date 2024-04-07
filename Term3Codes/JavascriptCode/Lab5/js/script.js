const batteryLevel = document.getElementById("batteryLevel");
const imageContainer = document.getElementById("roboHashImg");

navigator.getBattery().then(battery => {
    batteryLevel.textContent = battery.level;
    imageContainer.setAttribute("src", `https://robohash.org/${battery.level}.png`)
    console.log(battery);
    battery.addEventListener("levelchange", batteryChanged);
});

function batteryChanged(ev){
    imageContainer.setAttribute("src", `https://robohash.org/${ev.level}.png`)
    batteryLevel.textContent = ev.level;
}