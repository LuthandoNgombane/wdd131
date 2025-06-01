//LN - Calculate and display wind chill
function calculateWindChill(temp, windSpeed) 
{
    //LN - Ensure temperature is in Celsius and wind speed in km/h
    return (13.12 + 0.6215 * temp - 11.37 * Math.pow(windSpeed, 0.16) + 0.3965 * temp * Math.pow(windSpeed, 0.16)).toFixed(1);
}

//LN - Static weather data for Mthatha
const temperature = 22; 
const windSpeed = 10; 

//LN - Check if wind chill calculation is viable
if (temperature <= 10 && windSpeed > 4.8) 
{
    //LN - Calculate and display wind chill
    const windChill = calculateWindChill(temperature, windSpeed);
    document.getElementById('windchill').textContent = `${windChill}°C`;

} 
else 
{
    document.getElementById('windchill').textContent = "N/A";
}

//LN - Display current year
document.getElementById('currentyear').textContent = new Date().getFullYear();

//LN - Display last modified date
document.getElementById('lastmodified').textContent = document.lastModified;