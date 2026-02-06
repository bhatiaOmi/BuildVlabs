### Procedure

1. Open the **Merge Sort and Quick Sort – Divide & Conquer Simulation** experiment.
2. From the **Algorithm** dropdown menu, select the sorting algorithm to be analyzed:
   - Merge Sort
   - Quick Sort(Median-of-Three) 

3. Adjust the value of **N** (number of elements in the array) using the slider or input control provided.

4. Select the Input Array Type from the dropdown menu:
   - Random array
   - Already sorted array (ascending order)
   - Already sorted array (descending order)

5. Click the **Run Simulation** button.
      a. The selected input array is generated.
      b. The algorithm is initialized.
      c. The initial array is displayed in the    visualization area. 

###  Simulation Execution

6. Observe the unsorted array before execution begins.
7. Click the **Next →** button to execute the algorithm step-by-step.
8. During each step, observe:
   a. Comparisons between elements
   b. Movement and swapping of elements
   c. Placement of elements in their correct positions
9. Click the **← Previous** button to revisit earlier steps and analyze the algorithm’s behavior in detail.
10. Click the **Auto Play** button to automatically execute all remaining steps.
11. Select the execution speed (**Slow / Normal / Fast**) using the speed dropdown next to Auto Play.

### Algorithm-Specific Observations

**During Merge Sort Execution**

12. Observe the following:
   a. Recursive division of the array into smaller subarrays
   b. Splitting until single-element subarrays are obtained
   c. Merging of subarrays in sorted order based on comparisons
   d. Gradual formation of the final sorted array
**During Quick Sort (Median-of-Three) Execution**

13. Observe the following:
   a. Selection of the pivot using the Median-of-Three method (first element, middle element, last element)
   b. Movement of pointer i from left to right
   c. Movement of pointer j from right to left
   d. Swapping of elements when misplaced values are detected
   e. Placement of the pivot element at its f. correct sorted position
   f. Recursive sorting of left and right subarrays

### Runtime Analysis

14. Observe the Algorithm Steps / Step Log panel:
   a. Each comparison and swap is logged
   b. The current array state is shown after every step
15. Monitor the runtime metrics displayed during execution:
   -Number of comparisons
   -Execution time

### Advanced Analysis (Performance Comparison)

16. Click the **Advanced Analysis** button.
17. Select the maximum input size **N** for scalability analysis.
18. Click **Run Analysis**.
   a. The system executes the algorithm for multiple input sizes.
   b. Execution time is measured for each input size.
19. Observe the graph of **Input Size (n) vs Execution Time (ms)**.
20. Analyze:
   a. Average-case behavior of Quick Sort (O(n log n))
   b. Consistent performance of Merge Sort (O(n log n))
   c. Practical differences in scalability between the two algorithms

### Reset
21. Click the **Reset** button to clear the current simulation and repeat the experiment with a different algorithm, input size, or input type.