<h1>React Weather App</h1>
    <p>
      This project is a weather app built with React that displays the weather
      information of a user's location and provides an option to search for other
      locations as well.
    </p>
    <h2>Getting Started</h2>
    <p>
      To get started, clone this repository to your local machine and navigate
      into the project directory.
    </p>
    <pre>
      <code>
        git clone https://github.com/&lt;your-username&gt;/react-weather-app.git
        cd react-weather-app
      </code>
    </pre>
    <h2>Prerequisites</h2>
    <p>
      You will need to have Node.js and npm installed on your machine to run this
      project.
    </p>
    <h2>Installing</h2>
    <p>To install the dependencies, run:</p>
    <pre>
      <code>npm install</code>
    </pre>
    <h2>Environment Variables</h2>
    <p>
      This project requires an OpenWeather API key to fetch the weather data. You
      can get an API key by signing up on the OpenWeather website.
    </p>
    <p>
      Create a new file called .env.local in the project root directory and add
      the following line to it, replacing &lt;YOUR_OPEN_WEATHER_API_KEY&gt; with
      your actual API key:
    </p>
    <pre>
      <code>OPEN_WEATHER_API_KEY=&lt;YOUR_OPEN_WEATHER_API_KEY&gt;</code>
    </pre>
    <h2>Running the App</h2>
    <p>To start the app, run:</p>
    <pre>
      <code>npm start</code>
    </pre>
    <p>The app will be served on http://localhost:3000.</p>
    <h2>Features</h2>
    <ul>
      <li>Automatically fetches the weather information of the user's location on page load.</li>
      <li>Displays the weather information such as temperature, feels like temperature, humidity, and weather description.</li>
      <li>Provides a search bar to look up the weather information of any location.</li>
      <li>Provides a refresh button to update the weather information of the current location.</li>
    </ul>
    <h2>Built With</h2>
    <ul>
      <li>React</li>
      <li>Axios</li>
      <li>Tailwind CSS</li>
    </ul>
    <h2>Acknowledgments</h2>
    <ul>
      <li>OpenWeather for providing the weather API.</li>
    </ul>
