const urlList = {
    education: "https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/for_user_education.json",
    map: "https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/counties.json"
};

let eduData = [];
let mapData = [];

let readyCount = 0;

document.addEventListener("DOMContentLoaded", () => {
    for (const property in urlList) {
        let request = new XMLHttpRequest();
        request.open("GET", urlList[property], true);
        request.send();

        request.onload = () => {
            if (property == "education") {
                eduData = JSON.parse(request.responseText);
                readyCount += 1;
            }
            else if (property == "map") {
                mapData = JSON.parse(request.responseText);
                readyCount += 1;
            }

            if (readyCount === Object.keys(urlList).length) {
                buildChart();
            };
        };
    };

    const buildChart = () => {

        const paddingTop = 40;
        const paddingLeft = 20;
        const paddingRight = 60;
        const paddingBottom = 20;

        const w = 1000 + paddingLeft + paddingRight;
        const h = 600 + paddingTop + paddingBottom;

        const legendRectCount = 10;
        const legendRectH = (h - paddingTop - paddingBottom) / legendRectCount;
        const legendRectW = 10;
        const legendSpacing = 55;


        const minColor = "#dae6f2";
        const pivotColor = "#6db4f2";
        const maxColor = "#0081f2";
        const stateBorderColor = "orange";

        const svg = d3
            .select("#container")
            .append("svg")
            .attr("id", "chart")
            .attr("width", w)
            .attr("height", h)
            ;

        svg
            .append("text")
            .text("Higher Education Rates by US county")
            .attr("id", "title")
            .attr("transform", `translate(${w / 2}, ${paddingTop})`)
            .attr("text-anchor", "middle")
            ;

        const eduMin = d3.min(eduData, d => d.bachelorsOrHigher);
        const eduMean = d3.mean(eduData, d => d.bachelorsOrHigher);
        const eduMax = d3.max(eduData, d => d.bachelorsOrHigher);

        const colorScale = d3
            .scaleLinear()
            .domain([eduMin, eduMean, eduMax])
            .range([minColor, pivotColor, maxColor])
            ;

        let recentEduData = [eduData[0]];

        const fetchEduData = (d, keyName) => {
            if (recentEduData[0].fips != d.id) {
                recentEduData = eduData.filter((val) => val.fips == d.id);
            }
            return recentEduData[0][keyName];
        };


        const toolTipBox = d3.select("#container")
            .append("div")
            .attr("id", "tooltip")
            ;

        const toolTipContent = (d) => {

            let currentCounty = eduData.filter((val) => val.fips == d.id)[0];

            let area_name = currentCounty.area_name;
            let state = currentCounty.state;
            let fips = d.id;
            let eduLevel = currentCounty.bachelorsOrHigher;

            return area_name + ", " + state + "<br>" + eduLevel + "%";
        };

        const legend = svg
            .append("g")
            .attr("id", "legend")
            .attr("transform", `translate(${(w - paddingLeft - paddingRight)}, ${(h - paddingBottom)})`)
            ;


        const legendData = function () {

            let arr = [eduMin]
            let stepSize = (eduMax - eduMean) / legendRectCount;

            for (i = 1; i <= legendRectCount - 1; i++) {
                arr.push(parseFloat((i * stepSize + eduMin).toFixed(1)))
            };
            arr.push(eduMax);
            return arr;
        };

        legend.selectAll("rect")
            .data(legendData().slice(0, -1)) 
            .enter()
            .append("rect")
            .attr("id", "legend-rect")
            .attr("y", (d, i) => i * (-legendRectH) - legendRectH) 
            .attr("width", legendRectW)
            .attr("height", legendRectH)
            .attr("fill", (d) => colorScale(d)) 
            .attr("stroke", "white") 
            ;

        legend
            .append("g")
            .attr("id", "legend-axis")
            .selectAll("text")
            .data(legendData())
            .enter()
            .append("text")
            .attr("id", "legend-label")
            .text((d) => d + "%")
            .attr("y", (d, i) => i * (-legendRectH)) 
            .attr("transform", "translate(" + legendSpacing + ", 0)") 
            ;

        const geoPathMaker = d3.geoPath()
            ;

        const counties = svg
            .append("g")
            .attr("id", "counties")
            .attr("transform", "translate(" + paddingLeft + ", " + paddingTop + ")") 
            ;

            const states = svg
			.append("g")
			.attr("id", "states")
			.attr("transform", "translate(" + paddingLeft + ", " + paddingTop + ")" ) 
		;

        counties
			.selectAll("path")
			.data( topojson.feature(mapData, mapData.objects.counties).features ) 
			.enter()
				.append("path") 
				.attr("class", "county") 
				.attr("d", geoPathMaker ) 
				.attr("data-fips", (d) => d.id ) 
				.attr("data-education", (d) => fetchEduData(d, "bachelorsOrHigher") )
				.attr("fill", (d) => colorScale( fetchEduData(d, "bachelorsOrHigher") ))
				.on("mouseover", (d, i) => {
					toolTipBox
						.style("top", d3.event.pageY + 10 + "px" ) 
						.style("left", d3.event.pageX + 10 + "px" )
						.attr("data-education", fetchEduData(d, "bachelorsOrHigher")) 
						//.style("background", colorScale(fetchEduData(d, "bachelorsOrHigher")) ) 
						.style("visibility", "visible") 
						.html( toolTipContent(d) ) 
					;
				})
				.on("mouseout", (d, i) => {
					toolTipBox					
						.style("visibility", "hidden")
					;
				})
		;

        states
        .selectAll("path")
        .data( topojson.feature(mapData, mapData.objects.states).features )
        .enter()
            .append("path")
            .attr("class", "state")
            .attr("d", geoPathMaker)
            .attr("fill", "none") 
            .attr("stroke", "white") 
    ;
    }; // END of buildChart() function
}); // END of DOMContentLoaded event listener


