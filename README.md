<p align="center">
  <img src="https://img.shields.io/badge/Cloud%20Load%20Balancer-Simulator-blueviolet?style=for-the-badge" alt="Cloud Load Balancer Simulator"/>
</p>

<h1 align="center">☁️ Cloud Load Balancer Simulator</h1>

<p align="center">
  <b>Simulate, compare, and visualize advanced load balancing algorithms for the cloud.</b><br>
  <i>Empowering research and education in distributed systems.</i>
</p>

---

## 🚀 Features

- **Multiple Load Balancing Algorithms:**
  - 🔄 Round Robin (RR)
  - ⚖️ Weighted Round Robin (WRR)
  - 🏷️ Static Weighted Round Robin (SWRR)
  - ⭐ Priority Weighted Round Robin (PWRR)
- **Data-Driven Analysis:**
  - 📊 CSV-based input/output for tasks and VMs
  - 📈 Performance metrics and results for each algorithm
- **Interactive Visualization:**
  - 🖥️ Modern HTML/JS interface for result exploration
- **Modular & Extensible:**
  - 🧩 Clean separation of algorithms, tasks, and VMs

---

## 🗂️ Project Structure

```
index.js                # Main entry point
main.html               # Visualization UI
package.json            # Dependencies & scripts
algorithms/             # Algorithm implementations
  pwrr.js
  roundRobin.js
  staticWRR.js
  weightedRoundRobin.js
data/                   # Datasets & results
  data-*.csv
  tasks.csv
  vms.csv
Tasks/                  # Task logic
  task.js
VMs/                    # VM logic
  baseVM.js
  pwrrVM.js
  rrVM.js
  staticWrrVM.js
  wrrVM.js
docs/                   # Documentation & presentations
  ...
```

---

## 🛠️ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher)

### Installation
```zsh
# Clone the repository
$ git clone <repo-url>
$ cd <project-directory>

# Install dependencies
$ npm install
```

### Running the Simulation
```zsh
# Run the main simulation
$ node index.js

# Populate data
$ node populateData.js

# Run a specific algorithm
$ node rrIndex.js      # Round Robin
$ node wrrIndex.js     # Weighted Round Robin
$ node swrrIndex.js    # Static Weighted Round Robin
$ node pwrrIndex.js    # Priority Weighted Round Robin (if implemented)
```

### Visualization
Open `main.html` in your browser to explore results and visualizations.

---

## 📁 Data Files
- `data/tasks.csv` — List of tasks to be scheduled
- `data/vms.csv` — List of virtual machines
- `data/data-*.csv` — Output data for each algorithm

---


## 🤝 Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements or bug fixes.

