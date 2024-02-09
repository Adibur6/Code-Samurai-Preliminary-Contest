class PriorityQueue {
    constructor() {
        this.queue = [];
    }

    enqueue(element, priority) {
        this.queue.push({ element, priority });
        this.sort();
    }

    dequeue() {
        if (!this.isEmpty()) {
            return this.queue.shift().element;
        }
        return null;
    }

    isEmpty() {
        return this.queue.length === 0;
    }

    sort() {
        this.queue.sort((a, b) => a.priority - b.priority);
    }
}

function dijkstra(graph, start) {
    const distances = {};
    const visited = {};
    const pq = new PriorityQueue();

    for (let vertex in graph) {
        distances[vertex] = Infinity;
    }
    distances[start] = 0;
    pq.enqueue(start, 0);

    while (!pq.isEmpty()) {
        const currentVertex = pq.dequeue();
        const neighbors = graph[currentVertex];
        visited[currentVertex] = true;

        for (let neighbor in neighbors) {
            const distance = distances[currentVertex] + neighbors[neighbor];
            if (distance < distances[neighbor]) {
                distances[neighbor] = distance;
                if (!visited[neighbor]) {
                    pq.enqueue(neighbor, distance);
                }
            }
        }
    }

    return distances;
}

// Example usage:
const graph = {
    A: { B: 5, C: 1 },
    B: { A: 5, C: 2, D: 1 },
    C: { A: 1, B: 2, D: 4, E: 8 },
    D: { B: 1, C: 4, E: 3, F: 6 },
    E: { C: 8, D: 3 },
    F: { D: 6 }
};

const startVertex = 'A';
const shortestDistances = dijkstra(graph, startVertex);
console.log(shortestDistances);
