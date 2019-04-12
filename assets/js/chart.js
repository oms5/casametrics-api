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
		var dailyChartConfig = {
            
			type: 'bar',
			data: {
				labels: [],
				datasets: [{
                    label: 'Miles Ran',
                    backgroundColor: "rgba(170,196,215,0.3)",
                    borderColor: "#0066b3",
                    borderWidth: 3,
                    pointRadius: 8,
                    pointBorderWidth: 4,
                    pointBackgroundColor: "#66ccff",
                    pointBorderColor: "#0066b3",
					data: [
					],
                    fill: true,
                    //lineTension: .1
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
					display: false,
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

			listentOnSockets();
            const ctx = document.getElementById('dailyChart').getContext('2d');
            window.myLine = new Chart(ctx, dailyChartConfig);

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
                window.responseData = data; 
                dailyChartConfig.data.labels = data.dailyActivity.map( (el) => {
                    
                    const date = moment.utc(el.sessiondate, moment.ISO_8601).format("dd MM/DD");
                    //console.log( "date from server %s | formatted %s", el.sessiondate, date);
                    return date;
                });
                dailyChartConfig.data.datasets[0].data = data.dailyActivity.map((el) => el.miles);
				myLine.update();
				instantiateViewComponents();
			});

			// new Vue({
			// 	el:"#card"
			// });
		};

	function listentOnSockets() {
		window.clearRpmTimeoutId = 0;
		window.io.socket.get('/api/v1/measurement/realtime/join/rpms/PI211', function responseFromServer (body, response) {
			
			console.log("The server responded with status " + response.statusCode + " and said: ", body);
		});

		window.io.socket.on('rpms', function(data) {
			document.getElementById('rpmValue').innerHTML = data.value;
			window.clearTimeout(window.clearRpmTimeoutId);
			window.clearRpmTimeoutId = setTimeout(function(){ 
				document.getElementById('rpmValue').innerHTML = 0;
			}, 
			1000);
		});
	}

	function instantiateViewComponents() {
		new Vue({
			el: '#app',
				data: {
					selected: null,
					activityForDay: null,
					revolutions: null,
					inches: null,
					feet: null,
					miles: null
				},
				methods: {
					showActivityForDay: function (event) {
						const activityForDay =  window.responseData.dailyActivity.find((activity) => {
							return activity.sessiondate === event;
						});
						console.log("activity: " + activityForDay.revolutions)
						this.revolutions = activityForDay.revolutions;
						this.inches = activityForDay.inches;
						this.feet = activityForDay.feet;
						this.miles = activityForDay.miles;
					}
				},
				computed: {
					dates: function() {
						const list = window.responseData.dailyActivity.reverse().map((activity)=> {
							const display = moment.utc(activity.sessiondate, moment.ISO_8601).format("ddd, MMM Do");
							return {value: activity.sessiondate, text: display};
						})
						return list;
					},
					currentLongDateDisplay: function() {
						return this.selected ? ("Hams Stats for " + moment.utc(this.selected, moment.ISO_8601).format("MMMM Do")) : "";
					}
				}
		});
	}
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