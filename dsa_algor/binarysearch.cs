
bool result =  BinarySearch([33, 43, 74, 23, 7, 34, 675, 35], 555);
Console.WriteLine(result);

//This binary search is not exactly O(Log n) since Array.Sort() is O(n log n)
static bool BinarySearch(int[] array, int searchItem)
{
  Array.Sort<int>(array);
    int low = 0; 
    int high = array.Length-1;
    while (low <= high)
    {
        int mid = (low+ high) / 2;
        int guess = array[mid];
        if(guess == searchItem)
        {
            return true;
        } else if (guess < searchItem)
        {
            low = mid + 1;
        } else
        {
            high = mid -1;
        }
    }
    return false; 
}                                                                                                                             