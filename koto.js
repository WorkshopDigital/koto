var Crawler   = require("simplecrawler"),
		winston   = require('winston');

winston.setLevels( winston.config.npm.levels );
winston.addColors( winston.config.npm.colors );


var logger = new( winston.Logger )({
	transports: [
		new winston.transports.Console({
			silent: false,
			level: 'debug',
			prettyPrint: true,
			colorize: true
		})
	]
});


var myCrawler = new Crawler('www.workshopdigital.com');

myCrawler.initialProtocol = "https";
myCrawler.interval = 1000; // Ten seconds
myCrawler.maxConcurrency = 2;

myCrawler.on("fetchcomplete", function(queueItem, responseBuffer, response) {

  var gtmregex = /www.googletagmanager.com/;
	var body     = responseBuffer.toString();
	var hasGTM   = gtmregex.test(body);


  logger.debug("I just received %s (%d bytes)", {
  	url: queueItem.url, 
		foundGTM: hasGTM
  });

});

myCrawler.start();
