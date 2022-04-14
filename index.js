let data = [];
const trendingValues = [];

const textLatin = 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus quaerat modi iste! Necessitatibus, accusamus aperiam? Necessitatibus ea expedita eum fugiat blanditiis sequi iure dolores consequatur eligendi? Numquam doloribus, ex quas ',
      lines = textLatin.split(/[,\. ]+/g)

for(let i = 0; i < lines.length; i++) {
    data.push({
        name: lines[i],
        weight: Math.floor(Math.random() * 10) + 5,
        trending: Math.random() * 10,
    })
}

const customArchimedeanSpiral = (tick) => {
	if (tick > 10000) {
		return false;
	}

	const ratio = 1;
	const multiplier = 1;

	return {
		x: ratio * (tick *= 0.5) * Math.cos(tick) * multiplier,
		y: tick * Math.sin(tick) * multiplier
	};
};

const transformData = (data) => {
  
    data.forEach(d => trendingValues.push(d.trending))
    const maxTrending = Math.max(...trendingValues);

    const transform = data.map(d => ({
        ...d,
        color: `hsl(${180 - 180 / (maxTrending / d.trending)}, 80%, 60%)` 
     }))
    
    return transform
}


const randomPlacement = function randomPlacement(point, options) {
    let x;
    const field = options.field
    
    // Note that initial placement of each point is center
    // If trending value of the point is below middle trending value of all data then it will calc ratio between them
    // and use that ratio to subtract the proportion of that half of field from the actual half of the field
    // If trending value is higher than middle, ratio will be calculated based on remainder of point.trending - middleValue
    // and that ratio will be used to add the proportion of that half of field to the inital value (zero)
    const getX = () =>  {
        let ratio;
        const middleValue = (Math.max(...trendingValues) + Math.min(...trendingValues)) / 2;
        if(point.trending < middleValue) {
            ratio = point.trending / middleValue
            x = -(field.width  / 2 - (field.width / 2) * ratio)
        } else {
            ratio = (point.trending - middleValue) / middleValue
            x = field.width / 2 * ratio
        }

        return x
    }

    const position = {
        x: getX(),
        y: 0,
        rotation: 0,
        trending: point.trending,
      };
    return position
  };

Highcharts.seriesTypes.wordcloud.prototype.spirals.archimedean = customArchimedeanSpiral;  
Highcharts.seriesTypes.wordcloud.prototype.placementStrategy.random = randomPlacement;


Highcharts.chart('container', {
    title: 'Trending',
    credits: {
        enabled: false
    },
    series: [{
        type: 'wordcloud',
        placementStrategy: 'random',
        data: transformData(data),
        name: 'Index',
        spiral: 'archimedean'
    }],
    tooltip: {
        pointFormat: 'Trending: <b>{point.trending}</b>'
    },
    xAxis: {
        title: {
            text: 'ajdeee'
        }
    }
    
})