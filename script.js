window.addEventListener('load', () => {
    let lat,long;
    let locationTimezone = document.querySelector(".location-timezone");
    let tempDegree = document.querySelector(".temp-deg");
    let tempDescription = document.querySelector(".temp-desc");
    let degreeSection = document.querySelector(".degree-section");
    let degreeSectionSpan = document.querySelector(".degree-section span");
    

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            lat = position.coords.latitude;
            long = position.coords.longitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/f227b018ff73e63e2164145604794a9e/${lat},${long}`
            
            fetch(api)
            .then(response => {return response.json()})
            .then(data => {
                const { temperature, summary, icon } = data.currently;

                // Set DOM elements from the API
                tempDegree.textContent = temperature;
                tempDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;

                // Calculate celsius
                celsius = (temperature - 32)* (5/9);

                // set icon
                setIcons(icon, document.querySelector(".icon"));

                // change temperature to Celsius/Fahrenheit
                degreeSection.addEventListener('click', () => {
                    if(degreeSectionSpan.textContent === "F"){
                        degreeSectionSpan.textContent = "C";
                        tempDegree.textContent = Math.floor(celsius);
                    } else {
                        degreeSectionSpan.textContent = "F";
                        tempDegree.textContent = temperature;
                    }
                }); 
            });
        });
        
    } 
    else {
        document.write("Please allow location access for your browser");
    }

    // Icons for our app
    function setIcons(icon, iconID) {
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
    
});