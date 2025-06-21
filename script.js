Promise.all([
	fetch('./data/data-wrr.csv').then((response) => response.text()),
	fetch('./data/data-pwrr.csv').then((response) => response.text()),
	fetch('./data/data-rr.csv').then((response) => response.text()),
	fetch('./data/data-swrr.csv').then((response) => response.text()), // New dataset
]).then(([data1, data2, data3, data4]) => {
	// Parse each CSV file
	const parseCSV = (data) => {
		const rows = data.split('\n').slice(1);
		const parsedData = rows
			.map((row) => {
				const columns = row.split(',');
				if (columns.length < 9) return null;
				return {
					taskId: columns[0],
					length: parseFloat(columns[1]),
					completionTime: parseFloat(columns[2].replace(/"/g, '')),
					executingTime: parseFloat(columns[3]),
					waitTime: parseFloat(columns[4]).toFixed(2),
					taskPriority: parseInt(columns[5]),
					vmLoadAtExecution: parseFloat(columns[8]),
				};
			})
			.filter(Boolean);
		return parsedData.sort((a, b) => parseInt(a.taskId) - parseInt(b.taskId));
	};

	// Parse and filter each dataset
	let taskData1 = parseCSV(data1);
	let taskData2 = parseCSV(data2);
	let taskData3 = parseCSV(data3);
	let taskData4 = parseCSV(data4); // New staticWrrVM data

	const filterByPriority = (data, priority) =>
		data.filter((item) => item.taskPriority === priority);

	// Filter task data by priority for each dataset
	let priorityOneTaskData1 = filterByPriority(taskData1, 1);
	let priorityOneTaskData2 = filterByPriority(taskData2, 1);
	let priorityOneTaskData3 = filterByPriority(taskData3, 1);
	let priorityOneTaskData4 = filterByPriority(taskData4, 1);

	let priorityThreeTaskData1 = filterByPriority(taskData1, 3);
	let priorityThreeTaskData2 = filterByPriority(taskData2, 3);
	let priorityThreeTaskData3 = filterByPriority(taskData3, 3);
	let priorityThreeTaskData4 = filterByPriority(taskData4, 3);

	let priorityFiveTaskData1 = filterByPriority(taskData1, 5);
	let priorityFiveTaskData2 = filterByPriority(taskData2, 5);
	let priorityFiveTaskData3 = filterByPriority(taskData3, 5);
	let priorityFiveTaskData4 = filterByPriority(taskData4, 5);

	// Create combined charts for each metric
	createCombinedChart(
		'completionTimeChart',
		'Completion Time',
		taskData1.slice(50, 100),
		taskData2.slice(50, 100),
		taskData3.slice(50, 100),
		taskData4.slice(50, 100),
		'completionTime'
	);
	createCombinedChart(
		'executingTimeChart',
		'Executing Time',
		taskData1.slice(50, 100),
		taskData2.slice(50, 100),
		taskData3.slice(50, 100),
		taskData4.slice(50, 100),
		'executingTime'
	);
	createCombinedChart(
		'waitTimeChart',
		'Wait Time',
		taskData1.slice(50, 100),
		taskData2.slice(50, 100),
		taskData3.slice(50, 100),
		taskData4.slice(50, 100),
		'waitTime'
	);

	// Create charts specifically for priority 1, 3, and 5 tasks
	createCombinedChart(
		'priorityOneTasks',
		'Completion Time for Priority 1',
		priorityOneTaskData1,
		priorityOneTaskData2,
		priorityOneTaskData3,
		priorityOneTaskData4,
		'completionTime'
	);
	createCombinedChart(
		'priorityThreeTasks',
		'Completion Time for Priority 3',
		priorityThreeTaskData1,
		priorityThreeTaskData2,
		priorityThreeTaskData3,
		priorityThreeTaskData4,
		'completionTime'
	);
	createCombinedChart(
		'priorityFiveTasks',
		'Completion Time for Priority 5',
		priorityFiveTaskData1,
		priorityFiveTaskData2,
		priorityFiveTaskData3,
		priorityFiveTaskData4,
		'completionTime'
	);
});

// Function to create a combined chart for each metric and priority level
function createCombinedChart(
	chartId,
	label,
	data1,
	data2,
	data3,
	data4,
	metric
) {
	const ctx = document.getElementById(chartId).getContext('2d');
	const taskIds1 = data1.map((item) => item.taskId);

	new Chart(ctx, {
		type: 'bar',
		data: {
			labels: taskIds1,
			datasets: [
				{
					label: `${label} (WEIGHTED ROUND ROBIN)`,
					data: data1.map((item) => item[metric]),
					backgroundColor: 'rgba(75, 192, 192, 0.2)',
					borderColor: 'rgba(75, 192, 192, 1)',
					borderWidth: 1,
				},
				{
					label: `${label} (PRIORITY WEIGHTED ROUND ROBIN)`,
					data: data2.map((item) => item[metric]),
					backgroundColor: 'rgba(255, 99, 132, 0.2)',
					borderColor: 'rgba(255, 99, 132, 1)',
					borderWidth: 1,
				},
				{
					label: `${label} (ROUND ROBIN)`,
					data: data3.map((item) => item[metric]),
					backgroundColor: 'rgba(54, 162, 235, 0.2)',
					borderColor: 'rgba(54, 162, 235, 1)',
					borderWidth: 1,
				},
				{
					label: `${label} (STATIC WRR VM)`, // New label for static WRR VM
					data: data4.map((item) => item[metric]),
					backgroundColor: 'rgba(153, 102, 255, 0.2)',
					borderColor: 'rgba(153, 102, 255, 1)',
					borderWidth: 1,
				},
			],
		},
		options: {
			scales: {
				x: {
					title: {
						display: true,
						text: 'Task ID',
					},
				},
				y: {
					beginAtZero: true,
					title: {
						display: true,
						text: label,
					},
				},
			},
		},
	});
}
