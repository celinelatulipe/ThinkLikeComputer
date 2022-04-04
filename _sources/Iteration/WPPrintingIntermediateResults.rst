..  Copyright (C) Paul Resnick.  Permission is granted to copy, distribute
    and/or modify this document under the terms of the GNU Free Documentation
    License, Version 1.3 or any later version published by the Free Software
    Foundation; with Invariant Sections being Forward, Prefaces, and
    Contributor List, no Front-Cover Texts, and no Back-Cover Texts.  A copy of
    the license is included in the section entitled "GNU Free Documentation
    License".

.. qnum::
   :prefix: iter-7-
   :start: 1

👩‍💻 Printing Intermediate Results
===================================

In this textbook we provide the CodeLens tool so that you are able to step through 
the program and watch what happens each time a line is evaluated by the Python 
interpretor. What if you didn't have CodeLens though, what would you do?

In that case, print statements are your best friend. They can show you what the value of
something is. This is especially helpful in the case of writing for loops or accumulating 
a value. If something is going wrong you can compare what you expect to happen to what
is actually happening. Consider the following example, which only prints out the value of 
the accumlator after the for loop.

.. activecode:: ac6_7_1

   w = range(10)

   tot = 0
   for num in w:
       tot += num
   print(tot)

Say we weren't sure what ``num`` was being assigned each time we iterated. One way to find out 
would be to add a print statement inside of the for loop.

.. activecode:: ac6_7_2

   w = range(10)

   tot = 0
   for num in w:
       print(num)
       tot += num
   print(tot)

If we wanted to see what was happening to ``tot`` as well, we could print that out in the for loop too!

.. activecode:: ac6_7_3
   
   w = range(10)


   tot = 0
   for num in w:
       print(num)
       tot += num
       print(tot)
   print(tot)

Finally, if we wanted to make these numbers easier to understand, we could add more to the print statements 
to make them easier to read! This is especially important when you have a loop that is complex or will iterate many times. If your console is full of information from print statements, it can be hard to decipher. But adding informative print 
statements, as in the example below, makes it much easier to see what is happening. 

.. activecode:: ac6_7_4
   
   w = range(10)

   tot = 0
   print("***** Before the For Loop ******")
   for num in w:
       print("***** A New Loop Iteration ******")
       print("Value of num:", num)
       tot += num
       print("Value of tot:", tot)
   print("***** End of For Loop *****")
   print("Final total:", tot)

In the above example, we have done two different things. We have added text inside the print statements on lines 7, 9 & 11, to explain what variable is being displayed. We have also added navigationnal print statements on lines 4, 6, & 10 that don't print out any variables, but just provide information about where in the code the Python interpreter is executing. This shows us the flow of execution, and helps provide context for the variable print statements. You won't always need this many print statements, but if your code is not behaving as you expect and you are really struggling to identify the problem, these types of print statements will be very helpful. 

       
