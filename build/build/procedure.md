### User Input

1. Select the desired sorting algorithm from the dropdown menu:
   - Merge Sort
   - Quick Sort 

2. Adjust the value of **N** (number of elements in the array) using the slider provided.

3. Select the type of input array from the dropdown menu:
   - Randomly generated array
   - Already sorted array (ascending order)
   - Already sorted array (descending order)

4. Click the **Run Simulation** button to generate the input array and initialize the selected sorting algorithm.

---

### Calculations / Simulation Steps

1. Click the **Next** button to execute the sorting algorithm step-by-step.

2. Observe the comparison, movement, and placement of elements at each step of the algorithm.

3. During **Merge Sort** execution, observe the following:
   - Recursive splitting of the array into smaller subarrays
   - Merging of subarrays in sorted order based on element comparison

4. During **Quick Sort (Median-of-Three)** execution, observe the following:
   - Selection of the pivot using the Median-of-Three method
   - Movement of pointer **i** from left to right
   - Movement of pointer **j** from right to left
   - Swapping of elements when misplaced values are detected
   - Placement of the pivot element at its correct sorted position after pointer crossing

5. Click the **Previous** button to revisit earlier steps and analyze the algorithm’s behavior in detail.

6. Click the **Auto-Run** button to automatically execute all remaining steps until the sorting process is completed.

---

### Scalability Analysis (Graph Visualization)

1. After completing the simulation, click the **Scalability Graph** option.

2. Select the maximum input size **N** from the dropdown menu.

3. The system automatically generates multiple input sizes up to the selected **N** and measures the execution time for each.

4. Observe the plotted graph of **Input Size (n)** versus **Execution Time (ms)**.

5. Analyze how the execution time increases with respect to input size for the selected algorithm.

---

### Results

1. Observe the **final sorted array** displayed after completion of the simulation.

2. Analyze the **Step Log**, which records each operation performed by the algorithm along with the corresponding array state.

3. Study the **Scalability Graph analysis**, which highlights:
   - Growth of execution time with increasing input size
   - Average-case behavior of Quick Sort (O(n log n))
   - Consistent performance of Merge Sort (O(n log n))
   - Practical differences in scalability between the two algorithms
