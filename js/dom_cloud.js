window.onload = function() {

  var elCounter = {}; // this will be an objects of element/attribute keys and counter values {div: 5, head: 1}

  function getMyElements(node) {
    console.log("Let's get started: ");

    // Collect nodeName, send to counter
    if (!(elCounter[node.nodeName])) {
      elCounter[node.nodeName] = 1;
    } else {
      elCounter[node.nodeName]++;
    }

    // Collect attribute names, send to counter
    // NOTE: node.attributes is an OBJECT with a LENGTH
    for (var i=0; i < node.attributes.length; i++) {
      if (!(elCounter[node.attributes[i].name])) {
        elCounter[node.attributes[i].name] = 1;
      } else {
        elCounter[node.attributes[i].name]++;
      }
    }

    // Recurse: if child, go to first child, then next
    if (node.hasChildNodes()) {
      var child = node.firstChild;
      while (child) {
        if (child.nodeType === 1) {
          getMyElements(child);
          console.log('...unwinding...');
        }
        child = child.nextSibling;
      }
    }

  }
  console.log('unwinded');
  getMyElements(document.body);
  console.log(elCounter);

  var sortedCounters = []; // this will be an array of all captured elements and attributes

  for (var el in elCounter) {
    sortedCounters.push([el, elCounter[el]]); // ([element/attr name, counter])
  }

  // sort captured elements/attributes by counter, beginning with highest
  sortedCounters.sort(function(a, b) { return b[1] - a[1]; });
  console.log(sortedCounters);

  // smaller array of only the top twenty
  var topTwenty = sortedCounters.slice(0, 20);
  console.log(topTwenty);

  var domCloudContainer = document.getElementById('dom_cloud_container');
  topTwenty.forEach(function (item) {
    domCloudContainer.innerHTML += "<span style=\"font-size:" + item[1] + "\">" +
    "This page contains " +
    item[1] + " elements/attributes of the type \"" +
    item[0] + "\".</span><br>";
  });

};

/*
if (element.hasChildNodes()) {}; // returns true if element has at least one child

if (element.firstChild) {}; // returns true if element has at least one child

.attributes : returns a live collection of all attribute nodes registered to the specified node

.children

.nodeName & .tagName each return a string of a current node/element


*/