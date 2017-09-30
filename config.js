/* Magic Mirror Config Sample
 *
 * By Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 */

var config = {
    port: 8080,
    ipWhitelist: ["192.168.0.11","192.168.0.6","0.0.0.0","127.0.0.1", "::ffff:127.0.0.1", "::1","localhost"], // Set [] to allow all IP addresses.

    language: "en-us",
    timeFormat: 12,
    units: "imperial",

    modules: [
        {
            module: "alert",
        },

        {
            module: "clock",
            position: "top_left"
        },
        {
            module: 'stocks',
            position: "bottom_right",
            config: {
                symbols: ['^SPX', '^VIX']
                
            }
        },
        {
            module: "newsfeed",
            position: "top_bar",	// This can be any of the regions. Best results in center regions.
            config: {
                // The config property is optional.
                // If no config is set, an example calendar is shown.
                // See 'Configuration options' for more information.

                feeds: [
                    {
                        title: "New York Times",
                        url: "http://www.nytimes.com/services/xml/rss/nyt/HomePage.xml",
                    },
                    {
                        title: "BBC",
                        url: "http://feeds.bbci.co.uk/news/video_and_audio/news_front_page/rss.xml?edition=uk",
                    },
                ]
            }
        },

        {
            module: "currentweather",
            position: "top_right",
            config: {
                location: "Lewisville",
                locationID: "4706057",  //ID from http://www.openweathermap.org/help/city_list.txt
                appid: "2e6711b8a9a8524acfa0a8af26396b5c"
            }
        },
        {
            module: "weatherforecast",
            position: "top_right",
            header: "Weather Forecast",
            config: {
                location: "Lewisville",
                locationID: "4706057",  //ID from http://www.openweathermap.org/help/city_list.txt
                appid: "2e6711b8a9a8524acfa0a8af26396b5c"
            }
        },
        {module: "portfolioMirror", position: "bottom_left"},
        {
            module: 'MMM-Chart',
            position: 'bottom_center',
            header: 'VIX Stochastic Oscillator',
            config: {
                name: "vix_oscillator",
                url: "http://localhost:3000",
                xaxisLabelTicks: true,
                maintainAspectRatio: false,
                showGraphLabels: false,
                graphLineColor0: "rgba(150, 150, 150, 1)",
		graphTickColor0: "rgba(200, 200, 200, 0.8)",
		graphFillColor0: "rgba(200, 200, 200, 0.4)",		
		graphFill0: true,
		graphLineColor1: "rgba(255, 255, 255, 1)",
		graphTickColor1: "rgba(100, 100, 100, 0.8)",
		graphFillColor1: "rgba(100, 100, 100, 0.4)",
                xaxisTimeUnit: "day",
                xaxisTimeFormatLabels: "M/D",
                graphScaleStepSize0: 100,
                graphScaleStepSize1: 100,   
            }
        }


    ]

};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
