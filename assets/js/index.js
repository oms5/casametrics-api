window.chartColors = {
	red: 'rgb(255, 99, 132)',
	orange: 'rgb(255, 159, 64)',
	yellow: 'rgb(255, 205, 86)',
	green: 'rgb(75, 192, 192)',
	blue: 'rgb(54, 162, 235)',
	purple: 'rgb(153, 102, 255)',
	grey: 'rgb(201, 203, 207)'
};

var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		var config = {
            pointDotRadius : 8,
            pointDotStrokeWidth : 4,
            pointColor : "#0066b3",
            pointStrokeColor : "ffffff",
			type: 'bar',
			data: {
				labels: [],
				datasets: [{
					label: 'Miles Run',
					backgroundColor: "#0066b3",
					borderColor: "#0066b3",
					data: [
					],
                    fill: false,
                    lineTension: 0
                },
                // {
				// 	label: 'My Second dataset',
				// 	fill: false,
				// 	backgroundColor: "#ff0000",
				// 	borderColor: "#ff0000",
				// 	data: [
				// 		78,39,20,38,20,33,39
				// 	],
                // }
                ]
			},
			options: {
				responsive: true,
				title: {
					display: true,
					text: 'Ham Stats'
				},
				tooltips: {
					mode: 'index',
					intersect: false,
				},
				hover: {
					mode: 'nearest',
					intersect: true
				},
				scales: {
					xAxes: [{
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Date'
						}
					}],
					yAxes: [{
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Miles'
						}
					}]
				}
			}
		};

		window.onload = function() {

            const requestOptions = { 
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': 'HJsjs493DXdj392jsSJ20kdjsajsjSW'
                }),
              };

            fetch("/api/v1/measurement/stats", requestOptions)
            .then( (response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                var ctx = document.getElementById('canvas').getContext('2d');
                config.data.labels = data.dailyActivity.map( (el) => {
                    const date = moment(el.sessiondate).format("MM/DD");
                    return date;
                });
                config.data.datasets[0].data = data.dailyActivity.map((el) => el.miles);
                window.myLine = new Chart(ctx, config);
            });;
		};

		// document.getElementById('randomizeData').addEventListener('click', function() {
		// 	config.data.datasets.forEach(function(dataset) {
		// 		dataset.data = dataset.data.map(function() {
		// 			return  random();
		// 		});

		// 	});

		// 	window.myLine.update();
		// });

		// var colorNames = Object.keys(window.chartColors);
		// document.getElementById('addDataset').addEventListener('click', function() {
		// 	var colorName = colorNames[config.data.datasets.length % colorNames.length];
		// 	var newColor = window.chartColors[colorName];
		// 	var newDataset = {
		// 		label: 'Dataset ' + config.data.datasets.length,
		// 		backgroundColor: newColor,
		// 		borderColor: newColor,
		// 		data: [],
		// 		fill: false
		// 	};

		// 	for (var index = 0; index < config.data.labels.length; ++index) {
		// 		newDataset.data.push(random());
		// 	}

		// 	config.data.datasets.push(newDataset);
		// 	window.myLine.update();
		// });

		// document.getElementById('addData').addEventListener('click', function() {
		// 	if (config.data.datasets.length > 0) {
		// 		var month = MONTHS[config.data.labels.length % MONTHS.length];
		// 		config.data.labels.push(month);

		// 		config.data.datasets.forEach(function(dataset) {
		// 			dataset.data.push(random());
		// 		});

		// 		window.myLine.update();
		// 	}
		// });

		// document.getElementById('removeDataset').addEventListener('click', function() {
		// 	config.data.datasets.splice(0, 1);
		// 	window.myLine.update();
		// });

		// document.getElementById('removeData').addEventListener('click', function() {
		// 	config.data.labels.splice(-1, 1); // remove the label first

		// 	config.data.datasets.forEach(function(dataset) {
		// 		dataset.data.pop();
		// 	});

		// 	window.myLine.update();
		// });

function random() {
   const rand = Math.random() *100;
	 return  Math.round(rand);
}