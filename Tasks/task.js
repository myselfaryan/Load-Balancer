class Task {
	constructor(id, length, priority) {
		this.id = id; // Unique identifier for the task
		this.length = length; // Length of the task
		this.size = 0.3;
		this.priority = priority; // Priority of the task (1-10, where 1 is high priority)
		this.waitingTime = 0; // Track how long the task has been waiting
	}
}

export default Task;
