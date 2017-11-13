//todo move to plugin settings
var jfrogUrl = "jfrog-url";

mainCopyButton();

function mainCopyButton() {
  setTimeout(function() {
    document.getElementsByTagName('h2')[0]
      .addEventListener('mouseover', generateCopyButton2);
    }, 1500);
}

function generateCopyButton2() {
	document.getElementsByTagName('h2')[0].onclick = copyClick;
}

function copyClick() {

  var repositoryPath = getValueOfParametersWidget("Repository Path:");
  var repositoryPathAsArray = repositoryPath.split("/");

  var repositoryName = repositoryPathAsArray[0];
  var tagName = repositoryPathAsArray[repositoryPathAsArray.length - 2];

  var path = "";
  for (var i = 1; i < repositoryPathAsArray.length - 2; i++) {
    path += repositoryPathAsArray[i];
  	if (i !== repositoryPathAsArray.length - 3) {
  	  path += "/";
  	}
  }
  path += ":" + tagName;

  var port = "0000";
  var repositoriesJson = JSON.parse(getRepositoriesJson());
  for (var i = 0; i < repositoriesJson.length; i++) {
    var repository = repositoriesJson[i];
    if (repository.key === repositoryName) {
  	  port = repository.description;
  	}
  }
  var finalPath = jfrogUrl + ":" + port + "/" + path;
  copyToClipboard(finalPath);
}

function copyToClipboard(text) {
  window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
}

function getRepositoriesJson() {
  var repositoryInfoUrl = "https://" + jfrogUrl + "/api/repositories";
  var myRequest = new XMLHttpRequest();
  myRequest.open("GET", repositoryInfoUrl, false);
  myRequest.setRequestHeader("Cache-Control", "no-cache");
  myRequest.send();
  return myRequest.responseText;
}

function getValueOfParametersWidget(fieldName) {
  var elements = document.getElementsByClassName("ng-binding");
  for (var i = 0; i < elements.length; i++) {
    if (elements[i].innerText === fieldName)
	    return elements[i+1].innerText;
  }
}

function sleep(ms) {
  ms += new Date().getTime();
  while (new Date() < ms){}
}
