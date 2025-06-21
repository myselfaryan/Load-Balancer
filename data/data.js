import fs from 'fs';
import { Parser } from 'json2csv';

const data = [];

export function generateVMs() {
	const noOfVMs = 50;
	const vms = [];

	for (let i = 1; i <= noOfVMs; ++i) {
		let capacity = 1000 + Math.random() * 5000;
		capacity = Math.floor(capacity - (capacity % 1000));
		vms.push({ id: i, capacity });
	}

	const json2csvParser = new Parser();
	const csv = json2csvParser.parse(JSON.parse(JSON.stringify(vms)));

	fs.writeFile('./data/vms.csv', csv, (err) => {
		if (err) {
			console.log(err);
		} else {
			console.log('Success');
		}
	});
}

export function generateTasks() {
	const noOfTasks = 200;
	const tasks = [];

	for (let i = 1; i <= noOfTasks; ++i) {
		let length = Math.random() * 1000;
		length = 50 + Math.floor(length - (length % 100));
		let priority = Math.random() * 10;
		priority = 1 + Math.floor(priority - (priority % 1));
		tasks.push({ id: i, length, priority });
	}

	const json2csvParser = new Parser();
	const csv = json2csvParser.parse(JSON.parse(JSON.stringify(tasks)));

	fs.writeFile('./data/tasks.csv', csv, (err) => {
		if (err) {
			console.log(err);
		} else {
			console.log('Success');
		}
	});
}

export function addData(entry) {
	data.push(entry);
}

function formatData(data) {
	const formattedData = data.map((item) => ({
		...item,
		length: parseFloat(item.length),
		completionTime: parseFloat(parseFloat(item.completionTime).toFixed(2)),
		executingTime: parseFloat(parseFloat(item.executingTime).toFixed(2)),
		waitTime: parseFloat(parseFloat(item.waitTime).toFixed(2)),
		taskPriority: parseInt(item.taskPriority, 10),
		vmCapacity: parseInt(item.vmCapacity, 10),
		vmLoadAtExecution: parseFloat(item.vmLoadAtExecution),
	}));
	return formattedData;
}

export function printDataRR() {
	console.log(data);

	const json2csvParser = new Parser();
	// const csv = json2csvParser.parse(JSON.parse(JSON.stringify(data)));
	const formattedData = formatData(data);
	const csv = json2csvParser.parse(formattedData);
	fs.writeFile('./data/data-rr.csv', csv, (err) => {
		if (err) {
			console.log(err);
		} else {
			console.log('Success');
		}
	});
}

export function printDataSWRR() {
	console.log(data);

	const json2csvParser = new Parser();
	// const csv = json2csvParser.parse(JSON.parse(JSON.stringify(data)));
	const formattedData = formatData(data);
	const csv = json2csvParser.parse(formattedData);
	fs.writeFile('./data/data-swrr.csv', csv, (err) => {
		if (err) {
			console.log(err);
		} else {
			console.log('Success');
		}
	});
}

export function printData() {
	console.log(data);

	const json2csvParser = new Parser();
	// const csv = json2csvParser.parse(JSON.parse(JSON.stringify(data)));
	const formattedData = formatData(data);
	const csv = json2csvParser.parse(formattedData);
	fs.writeFile('./data/data-wrr.csv', csv, (err) => {
		if (err) {
			console.log(err);
		} else {
			console.log('Success');
		}
	});
}
export function printDataPWRR() {
	console.log(data);

	const json2csvParser = new Parser();
	// const csv = json2csvParser.parse(JSON.parse(JSON.stringify(data)));
	const formattedData = formatData(data);
	const csv = json2csvParser.parse(formattedData);

	fs.writeFile('./data/data-pwrr.csv', csv, (err) => {
		if (err) {
			console.log(err);
		} else {
			console.log('Success');
		}
	});
}
