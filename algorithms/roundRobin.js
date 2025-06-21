class roundRobin {
	constructor(vms) {
		console.log(vms, 'LOL');
		this.vms = vms; // Array of virtual machines
		this.iterationCount = 0; // Keep track of the number of iterations
		// this.pendingTasks = [];
	}

	assignTask(task, index) {
		console.log(this.vms);
		const ind = index % this.vms.length;
		this.vms[ind].addTask(task);
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
			let executingTime = vm.processNextTask();
			this.increaseWaitingTimeOfTasks(executingTime, vm);
		});

		this.iterationCount++;
	}
}

export default roundRobin;
