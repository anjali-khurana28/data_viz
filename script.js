// Variables



var width = 700,
	height = 400,
	svg1 = d3.select("#map")
	.append("svg")
	.attr("width", width)
	.attr("height", height),
	data = d3.map(),
	projection = d3.geoMercator()
	.center([-92.03542, 41.69553])
	.scale(600)
	.translate([width / 2, height / 2]),
	path = d3.geoPath()
	.projection(projection);
	// tip = d3.tip()
	// .attr('class', 'd3-tip')
	// .offset([-20, 0])
	// .html(function(d) {
	// 	return "<strong>" + d.properties.abbr + " - </strong><span>" + data.get(d.properties.abbr) + " breweries per capita</span>"
//	.center([-92.03542, 41.69553]) 


	// }
 //  );
var colorScale = ['#ffcccb', '#8b0000'],
	color = d3.scaleLinear()
	.domain([1300, 4700])
	.range(colorScale);


var colorSc = ['#ADD8E6', '#191970'],
	color2 = d3.scaleLinear()
	.domain([1300, 4700])
	.range(colorSc);



// Load in my states data!

var datasc = d3.range(5);


var colors = d3.scaleLinear()
    .domain([0,5, 50])
    .range(["pink", "#8B0000"]);

var colorsv2 = d3.scaleLinear()
    .domain([0,5, 50])
    .range(["#ADD8E6", "#191970"]);
		
// var colors2 = d3.scaleLinear()
//     .domain([0,5, 50])
//     .range(["pink", "#8B0000"]);
		


var heat = 1;

var scale = d3.select(".cscale").append("svg");

var rects = scale.selectAll(".rects")
	.data(datasc)
	.enter()
	.append("rect")
// .attr("id","the_SVG_ID")
	.attr("y", 0)
	.attr("height", 30)
	.attr("x", (d,i)=>40 + i*40)
	.attr("width", 40)

	.attr("fill", function(d){
        if (heat==1){
          // console.log('oho')
         return colors(d);
        }
        if (heat==2){
      return colorsv2(d);
    }
        }
       
       )
	.attr("stroke", "gray");



var scale = d3.select(".cscale2").append("svg");

var rects2 = scale.selectAll(".rects2")
	.data(datasc)
	.enter()
	.append("rect")
	.attr("y", 0)
	.attr("height", 30)
	.attr("x", (d,i)=>40 + i*40)
	.attr("width", 40)
	.attr("fill", function(d){
        if (heat==2){
          // console.log('oho')
         return colors(d);
        }
        if (heat==1){
      return colorsv2(d);
    }
        }
       
       )
	.attr("stroke", "gray");   






 var compare = 0;
 var state = -1;

var update = function(a){
  if (compare == 1 && a==1){
    state = 0;
    console.log("state chaged")
    d3.select("#btn2").style("background-color","white");
    d3.select("#btn1").style("background-color","#00FFFF");
    
     }
  else if (compare == 1 && a==2){
    d3.select("#btn1").style("background-color","white");
    state = 1;
    d3.select("#btn2").style("background-color","#00FFFF");
  }
} 

d3.csv("https://raw.githubusercontent.com/anjali-khurana28/data_viz/main/crime_long_datav2.csv", function(data) {
  
  
d3.json("https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json", function(djson) {
  
// 
  
  
  
var states = topojson.feature(djson,djson.objects.states).features
// console.log(djson.objects.states.geometries[0].properties.name)
// console.log(states)
  
  var state_data = d3.nest()
		.key(function(data) { 
      // console.log(d.date)
      return data.state; })
		.entries(data);
 
    
  // console.log(sd)
  
 
  // console.log(stream_data)
  
 
  
  // console.log(savedata)
  // console.log(state_data);
  
  
  
  
     // console.log(sd)
  for (var i = 0; i < 52; i++) {
  
   var sd = state_data[i].values
   var stream_data = d3.nest()
  .key(function(sd) { 
      // console.log(sd)
      return sd.year; })
  .entries(sd);
  var savedata = stream_data.map(function(d){
    var obj = {
      month: new Date(d.key, 0, 1)
    }
    
   // console.log(mqpdata)
    d.values.forEach(function(v){
      obj[v.crime] = v.rate;
      // console.log(v.rate)
    })
    
    return obj;
  })
    
  
	// Grab State Name
	var dataState = state_data[i].values[0].state
	// var dataState =  data[i].state
   
  
  // console.log(state_data[0].values)
	// Grab data value 
	var dataValue = state_data[i].values[0].year_one;
    var dataValuev2 = state_data[i].values[0].year_two;
    
    
   // var dataValue = data[i].bpc
  // console.log(state_data[i].values[0].year_one)
	// Find the corresponding state inside the GeoJSON
	for (var j = 0; j < 56; j++)  {
		var jsonState = states[j].properties.name;
     // console.log(datastate)
		if (dataState == jsonState) {
     // console.log(savedata)
      
		// Copy the data value into the JSON
		states[j].properties.BPCvalue = dataValue;
    states[j].properties.BPCvaluev2 = dataValuev2;
      
    states[j].properties.strdata = savedata;
		// Stop looking through the JSON
		break;
		}
	}
}
var div = d3.select("body")
		    .append("div")   
    		.attr("class", "tooltip")               
    		.style("opacity", 0);
  

// console.log(states) 
  // var width = 200,
  //     height = 200;
 var svgk = d3.select(".stream").append("svg")
  .attr("width",'100%')
    .attr("height", '100%')
.attr("id","str_ch");
  
  
 var svg3 = d3.select(".chart").append("svg")
            // .attr("width",'100%')
            // .attr("height", '100%')
          .attr("id","str_ch2");
  
  
 
  d3.select("#myCheckbox").on("change",function(d){
    compare = 1;
      console.log(compare)
  });
  
  
  d3.select("#Explore").on("change",function(d){
    compare = 0;
      console.log(compare)
    d3.select("#str_ch2")
          .style("opacity", 0);  
    
  });
  
  
  

   // var heat = 2;
  d3.select("#year1").on("change",function(d){
    heat = 1;
      // console.log(compare)
        updateHeat();
        updateScale();
  });
  
  d3.select("#year2").on("change",function(d){
    heat = 2;
      // console.log(compare)
    updateHeat();
    updateScale();
    
  });
  
  

  
  
 var heatTest=svg1.selectAll("path")
	.data(states)
	.enter().append("path")
	.attr("d", path)
	.style("stroke", "#fff")
	.style("stroke-width", "1")
	.style("fill", function(d) {
  
	// Get data value
	var value = d.properties.BPCvalue;
  var value2 = d.properties.BPCvaluev2;
  
   if (heat == 1){
	if (value) {
	//If value exists…
   // console.log(Number(value))
    
    
	return color(Number(value));
	}
   }
    
    if (heat == 2){
     if (value2) {
	//If value exists…
   // console.log(Number(value2))
    
    
	return color2(Number(value2));
	} 
    }
    
    
})
 .on("mouseover", function(d) {      
    	div.transition()        
      	   .duration(200)      
           .style("opacity", .8); 
   
       
   var pr = "State: " + d.properties.name + "\n" + "Agg rate: " + d.properties.BPCvalue;
           div.text(pr)
           .style("left", (d3.event.pageX) + "px")     
           .style("top", (d3.event.pageY - 28) + "px");  

      
    var currentState = this;
    d3.select(this).style('stroke', 'black').style("stroke-width", "1.5");
  
	}).on("mouseout", function(d) {       
        div.transition()        
           .duration(500)      
           .style("opacity", 0);   
   var currentState = this;
    d3.select(this).style('stroke', '#fff');
    }).on("click", function(d) {  

  if (compare==0){
        // d3.select("#str_ch")
        //   .style("opacity", 1);   
        // console.log('single click')
        // buildStreamGraph(d.properties.strdata, svgk)
           
          d3.select("#str_ch2")
          .style("opacity", 1);   
        console.log(d.properties.strdata)
        buildStreamGraphv2(d.properties.strdata, svg3)
        // var stdata = st[0];
        // var ar = st[1];
        // d3.selectAll("path")
        //    .data(stdata)
        //   .transition()
        //    .duration(750)
        //     .attr('d',ar);
  }
   
  if (compare==1){
    if (state==0){
       d3.select("#str_ch")
          .style("opacity", 1);   
        console.log('single click')
        buildStreamGraph(d.properties.strdata, svgk)
    }
    if (state==1){
       d3.select("#str_ch2")
          .style("opacity", 1);   
        // console.log(d.properties.strdata)
        buildStreamGraphv2(d.properties.strdata, svg3)
      // alert("node was double clicked"); 
    }
  }
   if (compare == 1 && state == 0){
     // console.log("state0")
     d3.select("#st1").style("opacity",1).text(" "+d.properties.name);
   }
   if (compare == 1 && state == 1){
     d3.select("#st2").style("opacity",1).text(" "+d.properties.name);
   }
    });
  
  
  
 function updateScale(){
   if (heat==2){
   d3.select(".cscale").style("visibility", "hidden");
      d3.select(".cscale2").style("visibility", "visible");
   }
   if (heat==1){
      d3.select(".cscale2").style("visibility", "hidden");
     d3.select(".cscale").style("visibility", "visible");
   }
   // rects.remove();
   
 	

 }
  
  function updateHeat(){
    svg1.selectAll("path")
          .data(states)
          .transition()
            .duration(750)
            .attr("d",path).style("stroke", "#fff")
	.style("stroke-width", "1")
	.style("fill", function(d) {
  
	// Get data value
	var value = d.properties.BPCvalue;
  var value2 = d.properties.BPCvaluev2;
  
   if (heat == 1){
	if (value) {
	//If value exists…
   // console.log(Number(value))
    // console.log("heat1")
    
	return color(Number(value));
	}
   }
    
    if (heat == 2){
     if (value2) {
	//If value exists…
   // console.log(Number(value))
    
    
	return color2(Number(value2));
	} 
    }
    
    
});
    
    heatTest.exit()
            .remove();
  
  // console.log("hiHello")
  }
  
//   .on("dblclick",function(d){ 
 
//   // var margin3 = {top: 0, right: 100, bottom: 100, left: 0};
 
// });
  
//   alert("node was double clicked"); 
  
// Loop through each state data value in the .csv file

}); 
  

});
// color.domain([0,1,2,3]); // setting the range of the input data

// Load GeoJSON data and merge with states data




////// stream graph






function buildStreamGraph(mqpdata, svgTemp) {
 // var margin = {top: 00, right: 0, bottom: 0, left: 0};
var data = mqpdata;
 var svgk = svgTemp;
  
  var width = 300,
      height = 290;
//   
 // svgk.attr("width", width + margin.left + margin.right)
 //    .attr("height", height + margin.top + margin.bottom)
 //  .append("g")
 //    .attr("transform", "translate(" + margin.left + "," + margin.top + ")") 
  
  // svgk.attr("width", width)
  //       .attr("height", height);
  
// console.log(data)
  
  
var stack = d3.stack()
    .keys(["MNM", "RRD", "ROB", "AGA", "BUR", "LAT", "MVT"])
    .order(d3.stackOrderNone)
    // .order(d3.stackOrderReverse)
    .offset(d3.stackOffsetWiggle);
// console.log(data)
var series = stack(data);
  


var x = d3.scaleTime()
    .domain(d3.extent(data, function(d){
     // console.log(d.month) 
     return d.month; }))
    .range([45, width-20]);

  
// setup axis
var xAxis = d3.axisBottom(x).ticks(d3.timeYear.every(1));
  
                                   
  
var y = d3.scaleLinear()
    .domain([0, d3.max(series, function(layer) { return d3.max(layer, function(d){ return d[0] + d[1];}); })])
    .range([height/2, -100]);

  
var color = d3.scaleLinear()
    .range(["#51D0D7", "#31B5BB"]);
  

// var color = d3.scaleOrdinal(d3.schemeCategory20);
  var color = d3.scaleOrdinal()
	.range(["#8B4513","#483D8B","#FF4500", "#FFFF00", "#FF1493", "#008000","#A0522D"]);
  
 
   //
  

var area1 = d3.area()
    .x(function(d) { 
      // console.info('in area function', d); 
                    return x(d.data.month); })
    .y0(function(d) { return y(d[0]); })
    .y1(function(d) { return y(d[1]); })
    .curve(d3.curveBasis);

  var tooltip = d3.select("body").append("div")
	.attr("class", "tooltip1");

  
  
  
  
  
  
  
  
// .style("opacity",0);
  
   
    // .attr("width", width)
    // .attr("height", height);
  
     // .attr("class", "svgS");

var test_str1 = svgk.selectAll("path")
    .data(series)
    .enter().append("path")
    .attr("d", area1)
.attr("transform", "translate(25, 0)")
    .style("fill", function() { return color(Math.random()); })
    .on('mouseover', function(d){      
 d3.select(this).style('fill-opacity', 0.7);
      
var prt = d.key + ": " + d[heat-1].data[d.key];
    
  tooltip.transition()
               .duration(700)
               .style("opacity", 1);
  			tooltip.html(prt)
                .style('font-weight', 'bold')
               .style("left", (d3.event.pageX + 5) + "px")
               .style("top", (d3.event.pageY - 28) + "px");
    })
    .on('mouseout', function(d){      
      d3.select(this).style('fill-opacity', 1);
         d3.select("#major").text("Mouse over");
  tooltip.transition()
               .duration(500)
               .style("opacity", 0);
})

// svgk.append("g")
//             .attr("class", "axis axis--x")
//             .attr("transform", "translate(0," + (height) + ")")
//             .call(xAxis);  
  
  var xAxisGroup = svgk.append("g").attr("transform","translate(22,0)").call(xAxis);
  
  
  


    var scale = d3.scaleLinear()
                  .domain([100, 0])
                  .range([height/2, 10]);

    var y_axis = d3.axisLeft()
                  .scale(scale);

    svgk.append("g")
       .attr("transform", "translate(50, 0)")
       .call(y_axis);
  
  svgk.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0)
      .attr("x",0 - (height/4))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
  .style('font-size', '18px')
  // .style('padding-left', '100px')
  // .style('position','absolute')
      .text("Crime rate in %"); 
  
  
   // test_str=test_str.merge(test_str);
     svgk.selectAll("path")
          .data(series)
          .transition()
            .duration(750)
            .attr("d",area1);
    test_str1.exit()
            .remove();
  
  
  
 // return [series, area]
}
   













function buildStreamGraphv2(mqpdata, svgtemp2) {
var data = mqpdata;
 var svg3 = svgtemp2;
// console.log(data)
//  svg3.attr("width", width + margin3.left + margin3.right)
//     .attr("height", height + margin3.top + margin3.bottom)
//   .append("g")
//     .attr("transform", "translate(" + margin3.left + "," + margin3.top + ")");
  
  var width = 300,
    height = 260;
  
  
 
var stack = d3.stack()
    .keys(["MNM", "RRD", "ROB", "AGA", "BUR", "LAT", "MVT"])
    // .order(d3.stackOrderNone)
    .order(d3.stackOrderReverse)
    .offset(d3.stackOffsetWiggle);
// console.log(data)
var series = stack(data);
  



var x = d3.scaleTime()
    .domain(d3.extent(data, function(d){
     // console.log(d.month) 
     return d.month; }))
    .range([45, width-20]);

  
// setup axis
// var xAxis = d3.axisBottom(x).ticks(d3.timeYear.every(1));
  
                                   
  
var y = d3.scaleLinear()
    .domain([0, d3.max(series, function(layer) { return d3.max(layer, function(d){ return d[0] + d[1];}); })])
    .range([height/2, -120]);
  

var color = d3.scaleLinear()
    .range(["#51D0D7", "#31B5BB"]);

var color = d3.scaleOrdinal(d3.schemeCategory20);
  
  var newcolor = d3.scaleOrdinal()
  .range(["#8B4513","#483D8B","#FF4500", "#FFFF00", "#FF1493", "#008000","#A0522D"]);

var area = d3.area()
    .x(function(d) { 
      // console.info('in area function', d); 
                    return x(d.data.month); })
    .y0(function(d) { return y(d[0]); })
    .y1(function(d) { return y(d[1]); })
    .curve(d3.curveBasis);

  var tooltip = d3.select("body").append("div")
	.attr("class", "tooltip1");


var test_str= svg3.selectAll("path")
    .data(series)
    .enter().append("path")
    .attr("d", area)
    .style("fill", function() { return newcolor(Math.random()); })
    .style("fill-opacity", 0.6)
    .attr("transform", "translate(18, 0)")
    .on('mouseover', function(d){
      // console.log("outputCehck")
      // var ky = d.key;
      // console.log(d[heat-1].data[d.key])
      var prt = d.key + ": " + d[heat-1].data[d.key];
      d3.select(this).style('fill-opacity', 0.4);
  tooltip.transition()
               .duration(700)
               .style("opacity", 1);
      
  			tooltip.html(prt)
      .style('font-weight','bold')
               .style("left", (d3.event.pageX + 5) + "px")
               .style("top", (d3.event.pageY - 28) + "px");
    })
    .on('mouseout', function(d){      
      // d3.select(this).style('fill', 
         // d3.rgb( d3.select(this).style("fill") ).darker());
      d3.select(this).style('fill-opacity', 0.6);
         d3.select("#major").text("Mouse over");
  tooltip.transition()
               .duration(500)
               .style("opacity", 0);
})

// svg3.append("g")
//             .attr("class", "axis axis--x")
//             .attr("transform", "translate(0," + (height) + ")")
//             .call(xAxis);  
  var xAxi = d3.axisBottom(x).ticks(d3.timeYear.every(1));
  // var xAxisGroup = svg3.append("g").attr("transform", "translate(0, 132)").call(xAxi);
  

  
  var scale = d3.scaleLinear()
                  .domain([0, 100])
                  .range([height/2, 10]);

    var y_axis = d3.axisLeft()
                  .scale(scale);

    svg3.append("g")
       .attr("transform", "translate(43, 0)")
       .call(y_axis);
  
  svg3.append("text")
      .attr("transform", "rotate(-90)")

      .attr("y", 0-5)
      .attr("x",0 - (height/4))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
  .style('font-size', '18px')
  // .style('padding-left', '100px')
  // .style('position','absolute')
      .text("Crime rate in %"); 
  
  
   // test_str=test_str.merge(test_str);
     svg3.selectAll("path")
          .data(series)
          .transition()
            .duration(750)
            .attr("d",area);
    test_str.exit()
            .remove();
  
  console.log('hello')
 // return [series, area]
}