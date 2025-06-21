import { addData } from '../data/data.js';
import VirtualMachine from './baseVM.js';

class VirtualMachinePWRR extends VirtualMachine {
	constructor(id, capacity) {
		super(id, capacity);
	}

	addTask(task) {
		this.queue.push(task);
		this.currentLoad += task.length; // Update current load based on task length
		this.currentRamUsage += task.ram; // Update current RAM usage
		console.log(
			`\nTask ${task.id} added to VM ${this.id}. Current load: ${this.currentLoad}`
		);
	}

	getWaitingTime() {
		// Calculate waiting time based on current load and capacity
		const waitingTime = this.currentLoad / this.capacity;
		console.log(
			`\nVM ${this.id} Waiting Time: ${waitingTime.toFixed(2)} (Load: ${
				this.currentLoad
			}, Capacity: ${this.capacity})`
		);
		return waitingTime;
	}

	isOverloaded(threshold) {
		const overloaded = this.currentRamUsage > threshold;
		console.log(
			`\nVM ${this.id} is ${
				overloaded ? 'overloaded' : 'not overloaded'
			}. Current load: ${this.currentLoad}, Threshold: ${threshold}`
		);
		return overloaded;
	}

	processNextTask() {
		if (this.queue.length > 0) {
			// Sort the queue by priority (lower number = higher priority)
			this.queue.sort((a, b) => a.priority - b.priority);
			const nextTask = this.queue.shift(); // Take the highest-priority task
			let executionTIme = parseFloat((nextTask.length / this.capacity));
			const waitTime = parseFloat(nextTask.waitingTime + executionTIme);
			addData({
				taskId: nextTask.id,
				length: nextTask.length,
				completionTime: parseFloat(waitTime),
				executingTime: executionTIme,
				waitTime: parseFloat(nextTask.waitingTime),
				taskPriority: nextTask.priority,
				vmId: this.id,
				vmCapacity: this.capacity,
				vmLoadAtExecution: this.currentLoad,
			});
			this.currentLoad -= nextTask.length; // Reduce the load
			console.log(
				`VM ${this.id} is processing Task ${nextTask.id} in ${executionTIme} ms (Priority: ${nextTask.priority}). Load reduced to ${this.currentLoad}`
			);
			return executionTIme;
		} else {
			console.log(`VM ${this.id} has no tasks to process.`);
			return 0;
		}
	}
}

export default VirtualMachinePWRR;
