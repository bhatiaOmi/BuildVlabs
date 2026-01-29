### Procedure

1. Open the **Closest Pair of Points – Divide & Conquer Simulation** experiment.

2. Enter the desired number of points **N** in the input field **“Enter Number of Points (N)”**.

3. Click the **Generate Points** button.

4. Randomly generated 2D coordinate points are displayed in the **Generated Coordinates** panel.

5. The same points are plotted on the visualization canvas.

6. Observe the plotted points on the canvas before the algorithm starts.

7. Click the **Auto Play** button to begin the simulation automatically.

8. Select the execution speed (**Slow / Normal / Fast**) from the speed dropdown next to **Auto Play**.

9. During execution, observe the following steps in the **Algorithm Steps** panel:
   - Sorting of points based on X-coordinates  
   - Recursive division of the point set into left and right halves  
   - Drawing of the Division Line  
   - Formation of the Strip Region near the dividing line  
   - Comparison of point pairs inside the strip  
   - Updates to the current minimum distance  

10. Use the **Next →** button to execute the algorithm step-by-step manually.

11. Use the **← Previous** button to revisit earlier steps and analyze recursive divisions and comparisons.

12. Observe the following visual indicators during execution:
    - **Blue line** → Division Line  
    - **Orange line** → Pair under review  
    - **Green line** → Best (closest) pair found so far  

13. Monitor real-time metrics displayed below the canvas:
    - Minimum Distance  
    - Number of Comparisons  

14. Click the **Runtime Metrics** button to view dynamic parameters such as:
    - Total comparisons using Divide & Conquer  
    - Execution time  
    - Comparisons saved compared to brute force  

15. Click the **Advanced Analysis** button to compare performance with the brute force approach:
    - Observe Brute Force (O(N²)) execution time and comparisons    
    - Observe Divide & Conquer (O(N log N)) execution time and comparisons 
    - Compare efficiency using the visual progress bars  

16. In the **Advanced Analysis** panel:
    - Adjust input size (**N**) for scalability testing  
    - Select points distribution:
      - Worst Case (Collinear)  
      - Best Case (Clusters)  

17. Click **Run Analysis** to execute the comparison for the selected input size and distribution.

18. Observe the comparison results for:
    - Execution Time  
    - Number of Distance Computations  
    - Efficiency improvement of Divide & Conquer over brute force  

19. Click the **Reset** button to clear the current experiment and run the simulation again with a new input.
