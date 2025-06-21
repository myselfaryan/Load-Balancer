import { addData } from '../data/data.js';
import VirtualMachine from './baseVM.js';

class VirtualMachineSWRR extends VirtualMachine {
	constructor(id, capacity) {
		super(id, capacity);
	}

	addTask(task) {
		this.queue.push(task);
		this.currentLoad += task.length; // Update current load based on task length
		console.log(
			`Task ${task.id} added to VM ${this.id}. Current load: ${this.currentLoad}`
		);
	}

	processNextTask() {
		if (this.queue.length > 0) {
			const nextTask = this.queue.shift();
			let executionTIme = nextTask.length / this.capacity;
			const waitTime = nextTask.waitingTime + executionTIme;

			addData({
				taskId: nextTask.id,
				length: nextTask.length,
				completionTime: waitTime,
				executingTime: executionTIme,
				waitTime: nextTask.waitingTime,
				taskPriority: nextTask.priority,
				vmId: this.id,
				vmCapacity: this.capacity,
				vmLoadAtExecution: this.currentLoad,
			});

			this.currentLoad -= nextTask.length; // Reduce the load
			console.log(
				`VM ${this.id} is processing Task ${nextTask.id} (Priority: ${nextTask.priority}). Load reduced to ${this.currentLoad}`
			);
			return executionTIme;
		} else {
			console.log(`VM ${this.id} has no tasks to process.`);
			return 0;
		}
	}
}

export default VirtualMachineSWRR;
