import { useEffect, useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [lat, setLat] = useState({});
  const [long, setLong] = useState({});

  const api = {
    key: "8126df913177649396b3db29b7231c55",
    base: "https://api.openweathermap.org/data/2.5",
  };

  const searchWeather = e => {
    if (e.key === "Enter" && query.length >= 0) {
      console.log(e);
      fetch(`${api.base}/weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(result => result.json())
        .then(data => {
          setWeather(data);
          setQuery("");
          // console.log(data);32
        });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
        // console.log(navigator.geolocation);
      });
      await fetch(
        `${api.base}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${api.key}`
      )
        .then(result => result.json())
        .then(data => {
          setWeather(data);
          console.log(data);
        })
        .catch(err => console.log("Something went wrong" + err));
    };
    fetchData();
  }, [long, lat]);

  const dateBuilder = d => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    let hour = d.getHours();
    let minutes = d.getMinutes();

    return `${day} ${date} ${month} ${year} `;
  };
  return (
    <div
      className={
        typeof weather.main !== "undefined"
          ? weather.main.temp > 16
            ? "app warm"
            : "app"
          : "app"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyPress={searchWeather}
          />
        </div>
        {typeof weather.main !== "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name},{weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                <div className="tempd">{Math.round(weather.main.temp)}°C</div>
                <div className="max-min">
                  <span className="max-temp">
                    H:{Math.floor(weather.main.temp_max)}°
                  </span>
                  <span className="min-temp">
                    L:{Math.floor(weather.main.temp_min)}°
                  </span>
                </div>
              </div>
              <div className="weather">{weather.weather[0].description}</div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
