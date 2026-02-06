## Theory

### Introduction

Sorting is a fundamental operation in computer science that involves arranging elements of a dataset in a specified order, typically in ascending or descending order. Efficient sorting is essential because many operations such as searching, indexing, data analysis, and optimization perform significantly faster on sorted data.

Among various sorting techniques, **Divide and Conquer–based algorithms** are widely used due to their efficiency and systematic approach. These algorithms break a large problem into smaller subproblems, solve them independently, and combine the results to obtain the final solution. Two important sorting algorithms based on this paradigm are **Merge Sort** and **Quick Sort**, both of which are studied and visualized in this experiment.

### Divide and Conquer Paradigm

The Divide and Conquer strategy operates using three fundamental steps:
1. **Divide**  
   The given problem is divided into smaller subproblems of the same type.
2. **Conquer**  
   Each subproblem is solved recursively until it becomes simple enough to be solved directly.
3. **Combine**  
   The solutions of the subproblems are combined to obtain the final solution.
This paradigm significantly reduces computational complexity for large input sizes and forms the theoretical foundation of efficient sorting algorithms such as Merge Sort and Quick Sort.

### Merge Sort
Merge Sort is a **stable, comparison-based sorting algorithm** that strictly follows the divide and conquer approach. It uses a recursive strategy and guarantees predictable performance for all types of input.

#### Working Principle
- The input array is recursively divided into two halves.
- The division continues until each subarray contains only one element.
- Since a single element is inherently sorted, adjacent subarrays are merged in sorted order.
- The merging process continues until the entire array is merged into one sorted array.
### Example of Merge Sort
Consider the array:
**[8, 3, 5, 2]**

**Step 1: Divide**
- Split into two halves:  
  `[8, 3]` and `[5, 2]`

**Step 2: Recursive Division**
- `[8, 3] → [8] and [3]`  
- `[5, 2] → [5] and [2]`

**Step 3: Merge**
- Merge `[8]` and `[3] → [3, 8]`  
- Merge `[5]` and `[2] → [2, 5]`

**Step 4: Final Merge**
- Merge `[3, 8]` and `[2, 5] → [2, 3, 5, 8]`
This step-by-step splitting and merging process is visualized in the simulation.

### Characteristics of Merge Sort

- **Time Complexity**
  - Best Case: O(n log n)
  - Average Case: O(n log n)
  - Worst Case: O(n log n)

- **Stability**
  - Preserves the relative order of equal elements.

- **Space Complexity**
  - Requires additional auxiliary memory for merging.

- **Performance**
  - Independent of input order and highly predictable.

Merge Sort is suitable for large datasets, linked lists, and scenarios where stability is required.

### Quick Sort

Quick Sort is a **highly efficient in-place sorting algorithm** that also follows the divide and conquer strategy. Unlike Merge Sort, it does not use extra memory for merging but relies on an effective partitioning mechanism.
In this experiment, **Median-of-Three pivot selection** is used to improve performance.

### Working Principle (Median-of-Three Pivot Selection)

- The pivot is chosen as the median of:
  - The first element
  - The middle element
  - The last element

- Two pointers are used:
  - Pointer **i** moves from left to right.
  - Pointer **j** moves from right to left.

- Elements smaller than the pivot are moved to the left.
- Elements greater than the pivot are moved to the right.
- When pointers cross, the pivot is placed in its correct position.
- The same process is recursively applied to left and right subarrays.

### Example of Quick Sort

Consider the array:

**[8, 3, 5, 2]**

**Step 1: Pivot Selection**
- First = 8, Middle = 3, Last = 2  
- Median-of-Three pivot = **3**

**Step 2: Partitioning**
- Elements less than 3 → `[2]`  
- Pivot → `[3]`  
- Elements greater than 3 → `[8, 5]`

**Step 3: Recursive Sorting**
- Sort `[2]` → already sorted  
- Sort `[8, 5]`:
  - Pivot = 8
  - Partition → `[5, 8]`

**Final Sorted Array**
- **[2, 3, 5, 8]**
These pointer movements, swaps, and pivot placements are visualized step-by-step in the simulation.

### Characteristics of Quick Sort

- **Time Complexity**
  - Best Case: O(n log n)
  - Average Case: O(n log n)
  - Worst Case: O(n²) (rare with median-of-three strategy)

- **Space Complexity**
  - In-place; requires only recursive stack space.

- **Stability**
  - Not stable; relative order of equal elements may change.

- **Performance Dependency**
  - Highly dependent on pivot selection and input distribution.

Median-of-Three pivot selection significantly reduces the probability of worst-case behavior, making Quick Sort efficient for practical applications.

### Comparison of Merge Sort and Quick Sort

| Feature | Merge Sort | Quick Sort |
|------|-----------|-----------|
| Strategy | Divide and merge | Divide via partitioning |
| Time Complexity | O(n log n) (all cases) | O(n log n) average |
| Space Usage | Extra memory required | In-place |
| Stability | Stable | Not stable |
| Input Sensitivity | Independent of input order | Depends on pivot selection |
| Practical Speed | Moderate | Usually faster |

### Conclusion

This experiment demonstrates how the **Divide and Conquer paradigm** is applied to sorting using Merge Sort and Quick Sort. Through step-by-step visualization, the recursive division, merging, partitioning, and pivot selection processes become clear. While Merge Sort provides stable and predictable performance, Quick Sort offers superior practical speed with optimized pivot selection. The experiment highlights their operational differences, efficiency, and suitability for different types of input.
