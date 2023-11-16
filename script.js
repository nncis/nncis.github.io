const urlEducationData = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json";
const urlCountryData = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json"

let countyData
let educationData
let bachelorsPercentage = []
let colorScale

const width = 1200;
const height = 600;
const padding = 30;

const COLORS = {
    blue: ["#a9d9ff", "#002749"]
}

let svg = d3.select("#canvas")

const generateScales = () => {

    colorScale = d3.scaleLinear()
        .domain([d3.min(bachelorsPercentage), d3.max(bachelorsPercentage)])
        .range(COLORS.blue)

    xAxisScale = d3.scaleLinear()
        .domain([d3.min(bachelorsPercentage), d3.max(bachelorsPercentage)])    
        .range([0, 270])
}

const drawMap = () => {

    let tooltip = d3.select("body")
        .append("div")
        .attr("id", "tooltip")
        .style("visibility", "hidden")
        .style("background-color", "#fdff9c")
        .style("border", "solid")
        .style("border-width", "1px")
        .style("border-radius", "5px")
        .style("width", "auto")
        .style("height", "auto")
        .style("opacity", "0.8")
        .style("color", "black")
        .style("position", "absolute")
        .style("text-align", "center")

    svg.selectAll("path")
        .data(countyData)
        .enter()
        .append("path")
        .attr("class", "county")
        .attr("d", d3.geoPath())
        .attr("fill", d => {
            let id = d.id
            let county = educationData.find(item => item.fips === id)
            return colorScale(county.bachelorsOrHigher)
        })
        .attr("data-fips", d => d.id)
        .attr("data-education", d => {
            let id = d.id
            let county = educationData.find(item => item.fips === id)
            return county.bachelorsOrHigher
        })
        .on("mouseover", d => {           
            let id = d.id
            let county = educationData.find(item => item.fips === id)

            tooltip.style("visibility", "visible")
                .html("<p>"+ county.area_name + ", " + county.state + ": "+ county.bachelorsOrHigher + "%" +"</p>")
                .attr("stroke","black")
                .attr("data-education", county.bachelorsOrHigher)
        })
        .on("mousemove", function () { return tooltip.style("top", (event.pageY - 20) + "px").style("left", (event.pageX + 15) + "px"); })
        .on("mouseout", function () { return tooltip.style("visibility", "hidden"); });
}




const legend = () => {


    svg.append("g")
        .attr("id", "legend")
        .append("rect")
        .attr("transform","translate(" + (width / 2) + "," + (padding * 2) + ")")


        let xAxis = d3.axisBottom(xAxisScale)

        svg.append("g")
        .call(xAxis)
        .attr("id", "y-axis")
        .attr("transform","translate(" + (width / 2) + "," + (padding * 2) + ")")
}

d3.json(urlCountryData).then(
    (data, error) => {
        if (error) {
            console.log("error");
        } else {
            countyData = topojson.feature(data, data.objects.counties).features
            console.log(countyData);
            d3.json(urlEducationData).then(
                (data, error) => {
                    if (error) {
                        console.log("error");
                    } else {
                        educationData = data
                        console.log(educationData);
                        data.map(item => bachelorsPercentage.push(item.bachelorsOrHigher))
                        generateScales()
                        drawMap()
                        legend()
                    }
                }
            )
        }
    }
)
