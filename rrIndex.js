import fs from 'fs/promises';
import roundRobin from './algorithms/roundRobin.js';
import { printDataRR } from './data/data.js';
import Task from './Tasks/task.js';
import VirtualMachineRR from './VMs/rrVM.js';

// Example usage:
let vms = [];
let tasks = [];

async function run() {
	try {
		// Reading VMs from CSV
		const vmData = await fs.readFile('./data/vms.csv', 'utf8');
		const vmLines = vmData.split('\n');
		for (let i = 1; i < vmLines.length; ++i) {
			if (!vmLines[i]) continue; // Skip empty lines
			const line = vmLines[i].split(',');
			if (line.length !== 2) {
				// Ensure the correct number of columns
				console.error(`Invalid VM line: ${vmLines[i]}`);
				continue;
			}
			vms.push(new VirtualMachineRR(+line[0], +line[1]));
		}

		// Reading Tasks from CSV
		const taskData = await fs.readFile('./data/tasks.csv', 'utf8');
		const taskLines = taskData.split('\n');
		for (let i = 1; i < taskLines.length; ++i) {
			if (!taskLines[i]) continue; // Skip empty lines
			const line = taskLines[i].split(',');
			if (line.length !== 3) {
				// Ensure the correct number of columns
				console.error(`Invalid Task line: ${taskLines[i]}`);
				continue;
			}
			tasks.push(new Task(+line[0], +line[1], +line[2]));
		}

		// Ensure we have valid data
		if (vms.length === 0) {
			console.error('No VMs found!');
			return;
		}

		if (tasks.length === 0) {
			console.error('No tasks found!');
			return;
		}

		// Process data after reading
		processData();
	} catch (err) {
		console.error(err);
	}
}

function processData() {
	console.log('Vms', vms);
	console.log('Tasks', tasks);

	const loadBalancer = new roundRobin(vms);
	console.log(vms);

	// Assigning tasks to VMs
	tasks.forEach((task, ind) => loadBalancer.assignTask(task, ind));

	let totalExecutionTimeOfTasks = 0;

	// Simulating the scheduler running over multiple iterations
	while (true) {
		let stat = true;
		for (let vm of vms) {
			if (vm.currentLoad !== 0) {
				stat = false;
				break;
			}
		}
		if (stat) {
			break;
		}
		totalExecutionTimeOfTasks += parseFloat(loadBalancer.runScheduler());
	}

	console.log(
		`\nTotal execution time for all cloudlets: ${totalExecutionTimeOfTasks.toFixed(
			2
		)} ms`
	);

	let avgExecutionTimeOfTasks = totalExecutionTimeOfTasks / tasks.length;
	console.log(
		`Average execution time per task: ${avgExecutionTimeOfTasks.toFixed(2)} ms`
	);

	printDataRR();
}

// Start reading data
run();
