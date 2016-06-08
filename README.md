Internet Of Things(IoT) DASHBOARD
=================================

A node.js project to get real time data from the sensors and to display that on the Dashboard.This Project includes real time graph generation.
	
	To learn more about Internet Of Things click <a href="https://en.wikipedia.org/wiki/Internet_of_things">here</a>.


Installation
============

* In the main folder, run: `npm install`.That will install all dependencies.

* You also need to change the following files:

 	>> `app.js` - change mongodb url accordingly, in order to have data persistence;
			    - change mysql password accordingly;


To Run The Application
======================

* Go to main folder from the command line;
* run : node app.js;
* Server will be started at http://localhost:3000


External Libraries Used
=======================

<ul>
<li><a href = ' http://c3js.org/'>EON Charts</a></li> 

<li><a href = ' https://www.pubnub.com/developers/eon/'>C3 Charts</a></li>

<li><a href = ' https://www.amcharts.com/'>AM Charts</a></li> 

<li><a href = ' https://www.amcharts.com/'>Passport(For Authentication)</a></li> 
</ul>