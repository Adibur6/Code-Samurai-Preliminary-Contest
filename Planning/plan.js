class Station {
    constructor(arrival, departure, nextStation, trainid, cost) {
        this.arrival = arrival;
        this.departure = departure;
        this.nextStation = nextStation;
        this.trainid = trainid;
        this.cost = cost;
    }
}

function minimumDist(graph, start, time, last) {
    const dist = new Array(2000).fill().map(() => new Array(1460).fill(1e9));
    const useTrain = new Array(2000).fill().map(() => new Array(1460).fill(1e9));
    dist[start][time] = 0;
    const pq = new PriorityQueue((a, b) => a[0] - b[0]);
    pq.push([0, start, time]);
    let ans = Infinity;

    while (!pq.isEmpty()) {
        const [d, u, t] = pq.pop(); // Corrected here

        if (d > dist[u][t]) continue; // Skip if this is not the shortest path
        
        // Check if graph[u] is defined before accessing its length property
        if (graph[u] !== undefined) {
            for (let i = 0; i < graph[u].length; i++) {
                const u1 = graph[u][i];
                if (u1.departure < t) continue;
                if (dist[u][t] + u1.cost < dist[u1.nextStation][u1.arrival]) {
                    dist[u1.nextStation][u1.arrival] = dist[u][t] + u1.cost;
                    pq.push([dist[u1.nextStation][u1.arrival], u1.nextStation, u1.arrival]);
                    if (u1.nextStation === last) ans = Math.min(ans, dist[u1.nextStation][u1.arrival]);
                    useTrain[u1.nextStation][u1.arrival] = u1.trainid;
                }
            }
            graph[u] = []; // Clear the vector after processing all elements
        }
    }

    return ans;
}


// Priority Queue implementation
class PriorityQueue {
    constructor(comparator) {
        this.heap = [];
        this.compare = comparator || ((a, b) => a[0] - b[0]);
    }

    push(value) {
        this.heap.push(value);
        this.bubbleUp();
    }

    pop() {
        const top = this.heap[0];
        const bottom = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = bottom;
            this.sinkDown();
        }
        return top;
    }

    bubbleUp() {
        let node = this.heap.length - 1;
        while (node > 0) {
            const parent = Math.floor((node - 1) / 2);
            if (this.compare(this.heap[node][0], this.heap[parent][0]) < 0) {
                [this.heap[parent], this.heap[node]] = [this.heap[node], this.heap[parent]];
                node = parent;
            } else break;
        }
    }

    sinkDown() {
        let node = 0;
        const length = this.heap.length;
        while (true) {
            const leftChild = 2 * node + 1;
            const rightChild = 2 * node + 2;
            let swap = null;
            if (leftChild < length && this.compare(this.heap[leftChild][0], this.heap[node][0]) < 0) {
                swap = leftChild;
            }
            if (rightChild < length && this.compare(this.heap[rightChild][0], this.heap[node][0]) < 0 &&
                this.compare(this.heap[rightChild][0], this.heap[leftChild][0]) < 0) {
                swap = rightChild;
            }
            if (swap === null) break;
            [this.heap[node], this.heap[swap]] = [this.heap[swap], this.heap[node]];
            node = swap;
        }
    }

    isEmpty() {
        return this.heap.length === 0;
    }
}

// Define the stations as objects
const stations = {
    1: { arrival: 5, departure: 2, nextStation: 2, trainid: 1, cost: 10 },
    2: { arrival: 10, departure: 6, nextStation: 4, trainid: 2, cost: 20 }
};

// Define the graph using the station objects
const graph = {
    1: [stations[1]],
    2: [stations[2]],
    // Add more stations as needed
};

// Usage example:
const start = 1; // Start station
const time = 0; // Start time
const last = 4; // Destination station
console.log(minimumDist(graph, start, time, last)); // Output the result