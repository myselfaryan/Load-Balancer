class StaticWRR {
	constructor(vms) {
		this.vms = vms; // Array of virtual machines
		this.iterationCount = 0; // Keep track of the number of iterations
		this.weightProportions = this.calculateWeightProportions(vms);
		this.correspondingVmIndex = this.calculateCorrespondingVmIndex(vms);
		this.currentVmIndex = 0;
		this.count = 0;
	}

	calculateWeightProportions(vms) {
		const minWeight = Math.min(...vms.map((vm) => vm.capacity));
		const weightIndexPairs = vms.map((vm, index) => ({
			index: index,
			weight: vm.capacity / minWeight,
		}));
		weightIndexPairs.sort((a, b) => b.weight - a.weight);
		return weightIndexPairs.map((pair) => Math.floor(pair.weight));
	}

	calculateCorrespondingVmIndex(vms) {
		const weightIndexPairs = vms.map((vm, index) => ({
			index: index,
			weight: vm.capacity,
		}));
		weightIndexPairs.sort((a, b) => b.weight - a.weight);
		return weightIndexPairs.map((pair) => pair.index);
	}

	assignTask(task) {
		if (this.count < this.weightProportions[this.currentVmIndex]) {
			this.vms[this.correspondingVmIndex[this.currentVmIndex]].addTask(task);
			this.count++;
		} else {
			this.currentVmIndex = (this.currentVmIndex + 1) % this.vms.length;
			this.count = 0;
			this.vms[this.correspondingVmIndex[this.currentVmIndex]].addTask(task);
			this.count++;
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
			let executingTime = vm.processNextTask();
			this.increaseWaitingTimeOfTasks(executingTime, vm);
		});

		this.iterationCount++;
	}
}

export default StaticWRR;
