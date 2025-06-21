class VirtualMachine {
	constructor(id, capacity) {
		this.id = id; // Unique identifier for the VM
		this.capacity = capacity; // Processing capacity of the VM
		this.ram = 512; // RAM allocated to the VM
		this.queue = []; // Tasks assigned to this VM
		this.currentLoad = 0; // Current load on the VM
		this.currentRamUsage = 0; // Current RAM usage
	}
}

export default VirtualMachine;
