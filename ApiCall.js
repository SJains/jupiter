var apiBaseUrl = 'https://cq.webomates.com/ci-cd/v1/cycle/';
var productId = "95";
var suiteName = "Mini";
var suiteType = "MINI";
var environment = "Staging";
var executionFocus = "ACCURACY_WITH_NO_REVIEW";
var browserMode = "HEADLESS_EXECUTION";
var basicAuthCred = "Basic c3VoYW5pOnN1aEBuMWphaW4=";
var cycleIdNumber = postCall();
while(getCall(cycleIdNumber).split(" ")[1] === "IN_PROGRESS") {
	console.log(getCall(cycleIdNumber).split(" ")[0] + " Cycle is In-Progress");
	console.log("Cycle is " + getCall(cycleIdNumber).split(" ")[2] + "% completed");
}

function postCall() {
	var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
	var request = new XMLHttpRequest();
	var cycleIdentification;
	request.open('POST', apiBaseUrl, false)
	request.setRequestHeader("Authorization", basicAuthCred);
	request.setRequestHeader("Accept","application/json");
	request.setRequestHeader("Content-Type","application/json");
	request.onload = ()=> {
		if(request.status === 201) {
			var data = JSON.parse(request.responseText);
			console.log("Cycle is successfully created with cycle id: " + data.cycleId);
			cycleIdentification = data.cycleId;
		}
	}
	var requestBody = "{\r\n" +
	"\"productId\": 29,\r\n" +
	"\"scope\": {\r\n" +
	"\"suiteName\": \"Mini\",\r\n" +
	"\"suiteType\": \"MINI\"\r\n" +
	"},\r\n" +
	"\"environment\": \"Prod\",\r\n" +
	"\"executionFocus\": \"ACCURACY_WITH_NO_REVIEW\",\r\n" +
	"\"browserMode\": \"HEADLESS_EXECUTION\"\r\n" +
	"}";
	request.send(requestBody);
	return cycleIdentification;
}

function getCall(cycleId) {
	var status1;
	var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
	var request = new XMLHttpRequest();
	console.log(apiBaseUrl + cycleId + '/status');
	request.open('GET', apiBaseUrl + cycleId + '/status', false)
	request.setRequestHeader("Authorization", basicAuthCred);
	request.onload = ()=> {
		if(request.status === 200) {
			console.log(request.responseText);
			var data = JSON.parse(request.responseText);
			status1 = data.cycleId + " " + data.cycleStatus + " " + data.completionPercentage.execute;
		}
	}
	request.send();
	return status1;
}	