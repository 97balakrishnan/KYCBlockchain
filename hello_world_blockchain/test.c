#include <stdio.h> 
int main()
{
   int a = 0; 
   int b = 512; 
   char *c = (char *)&a;
   *++c = 2;
   printf("%d, %d", a, b);
  
   return 0;
}