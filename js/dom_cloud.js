// window.onload = function() {

  var elCounter = {}; // this will be an objects of element/attribute keys and counter values {div: 5, head: 1}

  function getMyElements(node) {
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
        }
        child = child.nextSibling;
      }
    }

  }
  getMyElements(document.body);

  var sortedCounters = []; // this will be an array of all captured elements and attributes

  for (var el in elCounter) {
    sortedCounters.push([el, elCounter[el]]); // ([element/attr name, counter])
  }

  // sort captured elements/attributes by counter, beginning with highest
  sortedCounters.sort(function(a, b) { return b[1] - a[1]; });

  // smaller array of only the top twenty
  var topTwenty = sortedCounters.slice(0, 20);

  // send information to the domCloudContainer. Font-size is relative to the incidence of the respective element/attribute.
  var thisBody = document.getElementsByTagName('body');
  topTwenty.forEach(function (item) {

    thisBody.appendChild("<span style=\"font-size:" + item[1] + "\">" +
    "This page contains " +
    item[1] + " elements/attributes of the type \"" +
    item[0] + "\".</span><br>");
  });

// };
