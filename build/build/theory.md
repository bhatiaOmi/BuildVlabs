### Introduction

The Closest Pair of Points problem is a fundamental problem in computational geometry, where the objective is to determine the pair of points in a given set such that the Euclidean distance between them is minimum. Given a set of n points in a two-dimensional plane, identifying the closest pair is an important task with applications in areas such as pattern recognition, clustering, computer graphics, geographic information systems, and collision detection.

<br>

The Euclidean distance between two points (x<sub>1</sub>, y<sub>1</sub>) and (x<sub>2</sub>, y<sub>2</sub>) is defined as:

<div align="center">
  <b>d = √((x<sub>2</sub> − x<sub>1</sub>)<sup>2</sup> + (y<sub>2</sub> − y<sub>1</sub>)<sup>2</sup>)</b>
</div>

<br>

A naïve solution to this problem would involve calculating the distance between every possible pair of points and selecting the minimum distance. However, this approach becomes inefficient as the number of points increases.
<br>

### 1. Brute Force Approach (Reference Method)

In the brute force approach, the distance between every possible pair of points is computed and compared. For a set of n points, this results in:

<div align="center">
  <b>n(n - 1) / 2</b>
</div>

This leads to a time complexity of **O(n²)**. While this method is straightforward and performs adequately for very small input sizes (for example, n ≤ 10), it becomes computationally infeasible for large datasets due to the rapid quadratic growth in the number of distance computations.
<br>

### 2. Divide and Conquer Approach (Optimized Method)

To overcome the limitations of the brute force method, the Divide and Conquer strategy is applied to the Closest Pair problem. This approach significantly improves efficiency by reducing unnecessary distance comparisons through spatial partitioning.

The Divide and Conquer algorithm consists of the following key stages:

1. **Divide**: The set of points is first sorted based on their x-coordinates. The sorted set is then divided into two equal halves by a vertical line passing through the median x-coordinate.
2. **Conquer**: The algorithm recursively computes the closest pair of points in the left and right halves. This recursive division continues until the base case is reached, where a small number of points (typically two or three) can be handled directly using simple distance comparisons.
3. **Combine (Strip Optimization)**: After computing the minimum distances from the left and right halves, the algorithm checks whether a closer pair exists across the dividing line. 

To do this efficiently, only points that lie within a vertical strip of width **2d** (where **d** is the smaller of the two minimum distances obtained) are considered. Due to geometric properties of the plane, each point in this strip needs to be compared with only a limited number of nearby points (at most a constant number), ensuring that the merge step remains efficient.
<br>

### 3. Comparison Table

| Feature | Brute Force Approach | Divide and Conquer Approach |
| :--- | :--- | :--- |
| **Basic Strategy** | Exhaustive search (checks every pair) | Spatial partitioning (splits the plane) |
| **Time Complexity** | O(n²) | O(n log n) |
| **Space Complexity** | O(1) | O(n) |
| **Scalability** | Poor (slows down quickly) | High (efficient for large sets) |
| **Results** | Adequate for n ≤ 10 | Practically scalable for large n |


### 4. Performance Scenarios

* **Best Case (Clusters)**: Points form tight clusters, and the closest pair is found early with minimal strip comparisons. (Example: Points grouped around (10,10), (50,50), and (90,90)).
* **Worst Case (Collinear)**: Points lie nearly in a straight line, increasing strip comparisons but still maintaining **O(n log n)** complexity. (Example: Points such as (10,10), (20,20), (30,30), (40,40)).
<br>

### 5. Algorithm of Divide and Conquer

1. Input **n** points with x and y coordinates.
2. Sort points based on x-coordinate.
3. Divide the set into two halves by the median x-coordinate.
4. Recursively find the closest pair in each half.
5. Compute the minimum of the two distances (**d**).
6. Build a strip containing points within distance **d** from the dividing line.
7. Compare relevant points inside the strip (sorted by y).
8. Return the smallest distance and closest pair.
9. Record execution time and number of distance computations.
<br>

### 6. Conclusion

The Closest Pair problem was effectively solved using the Divide and Conquer paradigm. The experiment confirmed that the algorithm performs efficiently under both **Best Case (Clusters)** and **Worst Case (Collinear)** scenarios. By reducing the time complexity from **O(n²)** to **O(n log n)**, Divide and Conquer proves to be a practical and scalable solution for large geometric datasets.
