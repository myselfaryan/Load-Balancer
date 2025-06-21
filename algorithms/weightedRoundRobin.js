import { addData } from '../data/data.js';

class WeightedRoundRobin {
	constructor(vms) {
		this.vms = vms; // Array of virtual machines
		this.iterationCount = 0; // Keep track of the number of iterations
		this.pendingTasks = [];
	}

	assignTask(task) {
		let selectedVM = null;
		let minWeightedTime = Infinity;

		// Calculate waiting time weighted by task priority for each VM
		console.log(`Assigning Task ${task.id} (Priority: ${task.priority})...`);
		for (const vm of this.vms) {
			const waitingTime = vm.getWaitingTime();
			console.log(
				`VM ${vm.id} Weighted Waiting Time: ${waitingTime.toFixed(2)}`
			);
			if (waitingTime < minWeightedTime) {
				minWeightedTime = waitingTime;
				selectedVM = vm;
			}
		}

		if (selectedVM) {
			selectedVM.addTask(task); // Assign task to selected VM
			console.log(`Assigned Task ${task.id} to VM ${selectedVM.id}.`);
			this.checkForOverloadedVMs(); // Check for overloaded VMs after assignment
		}
	}

	checkForOverloadedVMs() {
		// const threshold = 100000; // Define a threshold for overload
		console.log('Checking for overloaded VMs...');
		for (const vm of this.vms) {
			if (vm.isOverloaded((vm.ram * 0.8))) {
				console.log(`VM ${vm.id} is overloaded! Initiating task migration...`);
				this.migrateTasks(vm);
			}
		}
	}

	migrateTasks(overloadedVM) {
		// Filter out high-priority tasks to migrate
		console.log(`Migrating high-priority tasks from VM ${overloadedVM.id}.`);

		for (const task of overloadedVM.queue) {
			overloadedVM.queue.splice(overloadedVM.queue.indexOf(task), 1); // Remove from overloaded VM's queue
			overloadedVM.currentLoad -= task.length;
			overloadedVM.currentRamUsage -= task.ram;
			console.log(
				`Task ${task.id} removed from VM ${overloadedVM.id}. New load: ${overloadedVM.currentLoad}`
			);

			let targetVM = null;
			let minQueueLength = Infinity;

			// Find an underloaded VM to migrate the task to
			for (const vm of this.vms) {
				if (
					!vm.isOverloaded((vm.ram * 0.8)) &&
					vm.queue.length < minQueueLength
				) {
					minQueueLength = vm.queue.length;
					targetVM = vm;
				}
			}

			if (targetVM) {
				targetVM.addTask(task); // Assign task to underloaded VM
				console.log(
					`Migrated Task ${task.id} from VM ${overloadedVM.id} to VM ${targetVM.id}.`
				);
			} else {
				console.log(`No suitable VM found for migrating Task ${task.id}.`);
				//task is lost, needs to be recorded
				this.pendingTasks.push(task);

				addData({
					taskId: task.id,
					length: task.length,
					completionTime: null,
					executingTime: null,
					waitTime: null,
					taskPriority: task.priority,
					vmId: null,
					vmCapacity: null,
					vmLoadAtExecution: null,
				});
			}
		}
	}

	increaseWaitingTimeOfTasks(executingTime, vm) {
		console.log('Increasing waiting time for tasks waiting too long...');
		for (const task of vm.queue) {
			task.waitingTime += executingTime;
		}
	}

	runScheduler() {
		// Simulate task processing for each VM
		console.log(`\n--- Iteration ${this.iterationCount + 1} ---`);
		this.vms.forEach((vm) => {
			let executingTime = parseFloat((vm.processNextTask()));
			if (
				this.pendingTasks[0] &&
				this.pendingTasks[0].size + vm.currentRamUsage <= vm.ram
			) {
				vm.addTask(this.pendingTasks[0]);
				this.pendingTasks.shift();
			}
			this.increaseWaitingTimeOfTasks(executingTime, vm);
		});

		// Boost task priority if needed

		this.iterationCount++;
	}
}

export default WeightedRoundRobin;
