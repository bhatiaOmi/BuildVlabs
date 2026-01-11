### Introduction

Sorting is a fundamental operation in computer science that involves arranging elements of a dataset in a specified order, typically in ascending or descending order. Efficient sorting is crucial because many core operations such as searching, indexing, data analysis, and optimization perform significantly better on sorted data.

Among various sorting techniques, Divide and Conquer–based algorithms are widely used due to their efficiency and systematic problem-solving approach. These algorithms decompose a large problem into smaller subproblems, solve them independently, and combine their solutions to obtain the final result. Two prominent sorting algorithms based on this paradigm are Merge Sort and Quick Sort.

---
### Divide and Conquer Paradigm

The Divide and Conquer strategy operates through the following three fundamental steps:

- **Divide**
  - The main problem is divided into smaller subproblems of the same type.

- **Conquer**
  - Each subproblem is solved recursively until it becomes simple enough to solve directly.

- **Combine**
  - The solutions of the subproblems are combined to form the final solution.

This paradigm significantly reduces computational complexity for large input sizes and forms the theoretical foundation of efficient algorithms such as Merge Sort and Quick Sort.

---
### Merge Sort

Merge Sort is a stable, comparison-based sorting algorithm that strictly follows the divide and conquer approach. It uses a top-down recursive strategy and provides predictable performance irrespective of input order.

#### Working Principle

- The array is recursively divided into two halves until each subarray contains only one element.
- A single element is inherently sorted.
- Adjacent subarrays are merged in sorted order to form larger sorted subarrays.
- This merging process continues until the entire array is merged into one fully sorted array.

#### Characteristics of Merge Sort

- **Time Complexity**
  - Best Case: O(n log n)
  - Average Case: O(n log n)
  - Worst Case: O(n log n)

- **Stability**
  - Preserves the relative order of equal elements.

- **Memory Requirement**
  - Requires additional auxiliary space for merging subarrays.

- **Performance**
  - Predictable and independent of input order.

Merge Sort is particularly suitable for large datasets, linked lists, and external sorting where stability and consistent performance are required.

---
### Quick Sort

Quick Sort is a highly efficient in-place sorting algorithm that also follows the divide and conquer strategy. Unlike Merge Sort, it does not require extra memory for merging but relies on an effective partitioning technique.

In this implementation, the Median-of-Three pivot selection method is used to improve performance.

#### Working Principle (Median-of-Three Pivot Selection)

- The pivot element is selected as the median of:
  - The first element
  - The middle element
  - The last element

- This strategy reduces the chances of poor pivot selection.

- Two pointers are used:
  - Pointer **i** moves from left to right.
  - Pointer **j** moves from right to left.

- Elements less than or equal to the pivot are moved to the left side, while elements greater than the pivot are moved to the right side.

- When the pointers cross, the pivot is placed in its correct sorted position.

- The same process is recursively applied to the left and right subarrays.

#### Characteristics of Quick Sort

- **Time Complexity**
  - Best Case: O(n log n)
  - Average Case: O(n log n)
  - Worst Case: O(n²) (rare with median-of-three strategy)

- **Memory Usage**
  - In-place algorithm; no additional auxiliary memory required.

- **Stability**
  - Not stable; relative order of equal elements may change.

- **Performance Dependency**
  - Highly dependent on pivot selection and input distribution.

The median-of-three pivot selection significantly reduces the probability of worst-case behavior, making Quick Sort efficient for practical applications.
