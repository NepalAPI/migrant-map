// use some code from D3 examples
var width = 1400,
  height = 1600;

var labelCountries = {
  'United Arab Emirates': 'संयुक्त अरब इमिरेट्स',
  'Saudi Arabia': 'साउदी अरब',
  'Nepal': 'नेपाल',
  'Malaysia': 'मलेशिया'
}

var projection = d3.geo.cylindricalEqualArea()
  .scale(800)
  .translate([-400, 840])
  .precision(0.0001);

var path = d3.geo.path()
  .projection(projection);

var svg = d3.select("body").append("svg")
  .attr("width", width)
  .attr("height", height);

d3.json("countries.geo.json", function(error, countries) {
  if (error) {
    throw error;
  }

  var highlighted = [];

  svg.selectAll("svg")
    .data(countries.features)
    .enter()
    .append("path")
    .attr("class", function(d) {
      if (labelCountries[d.properties.name]) {
        highlighted.push(d);
      } else {
        return "country";
      }
    })
    .attr("d", path);

    svg.selectAll("svg")
      .data(highlighted)
      .enter()
      .append("path")
      .attr("class", function(d) {
        if (d.properties.name === "Nepal") {
          return "country nepal";
        } else if (d.properties.name === "United Arab Emirates") {
            return "country uae";
        } else {
          return "country highlight";
        }
      })
      .attr("d", path);

  svg.selectAll(".subunit-label")
      .data(countries.features)
    .enter().append("text")
      .attr("class", "subunit-label")
      .attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
      .text(function(d) {
        return labelCountries[d.properties.name] || '';
      })
      .attr("dy", function(d) {
        if (d.properties.name === 'United Arab Emirates') {
          return '-50px';
        } else if (d.properties.name === 'Nepal') {
          return '-30px';
        }
        return '0px';
      });
});
