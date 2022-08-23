..  Copyright (C)  Brad Miller, David Ranum, Jeffrey Elkner, Peter Wentworth, Allen B. Downey, Chris
    Meyers, and Dario Mitchell.  Permission is granted to copy, distribute
    and/or modify this document under the terms of the GNU Free Documentation
    License, Version 1.3 or any later version published by the Free Software
    Foundation; with Invariant Sections being Forward, Prefaces, and
    Contributor List, no Front-Cover Texts, and no Back-Cover Texts.  A copy of
    the license is included in the section entitled "GNU Free Documentation
    License".

.. index:: flow of execution

Flow of Execution Summary
-------------------------

When you are working with functions it is really important to know the order in which statements are executed. This is 
called the **flow of execution** and we've already talked about it a number of times in this chapter.

Execution always begins at the first statement of the program. Statements are executed one at a time, in order, from 
top to bottom. Function definitions do not alter the flow of execution of the program, but remember that statements 
inside the function are not executed **until the function is called**. Function calls are like a detour in the flow of 
execution. Instead of going to the next statement, the flow jumps to the first line of the called function, executes 
all the statements there, and then comes back to pick up where it left off.

That sounds simple enough, until you remember that one function can call another. While in the middle of one function, 
the program might have to execute the statements in another function. But while executing that new function, the
program might have to execute yet another function!

Fortunately, the Python interperter is adept at keeping track of where it is, so each time a function completes, the 
program picks up where it left off in the function that called it. When it gets to the end of the program, it terminates.

What does all that mean for us when we try to understand a program? Don't read from top to bottom. Instead, follow the 
flow of execution.  This means that you will read the def statements as you are scanning from top to bottom, but you 
should skip the body of the function until you reach a point where that function is called.

**Check your understanding**

.. mchoice:: question8_9_1
   :answer_a: 1, 2, 3, 5, 6, 7 9, 10, 11
   :answer_b: 9, 10, 11, 1, 2, 3, 5, 6, 7
   :answer_c: 9, 10, 11, 5, 6, 7, 1, 2, 3,
   :answer_d: 1, 5, 9, 10, 5, 6, 1, 2, 3, 6, 7, 10, 11
   :answer_e: 1, 5, 9, 10, 5, 6, 7, 1, 2, 3, 11
   :correct: d
   :feedback_a: The statements inside functions are not executed until the function is called.
   :feedback_b: The function headers (lines 1 and 5) are executed first, that is how Python knows that the functions exist when they are called later.
   :feedback_c: The function headers (lines 1 and 5) are executed first, that is how Python knows that the functions exist when they are called later.
   :feedback_d: Yes, the lines that have function calls in them appear twice, we get to the line, call the function and then return to that statement (this is when we assign return values - after we come back from the function that was called).
   :feedback_e: Notice that the pow function is called while in the middle of executing the square function, not after the square function is done.
   :practice: T

   Consider the following Python code. Note that line numbers are included on the left.

   .. code-block:: python
      :linenos:

      def pow(b, p):
          y = b ** p
          return y
     
      def square(x):
          a = pow(x, 2)
          return a
     
      n = 5
      result = square(n)
      print(result)

   Refering to the line numbers, in what order are the statements excuted?


.. mchoice:: question8_9_2
   :answer_a: 25
   :answer_b: 5
   :answer_c: 125
   :answer_d: 32
   :correct: a
   :feedback_a: The function square returns the square of its input (via a call to pow).
   :feedback_b: What is printed is the output of the square function.  5 is the input to the square function.
   :feedback_c: Notice that pow is called from within square with a base (b) of 5 and a power (p) of two.
   :feedback_d: Notice that pow is called from within square with a base (b) of 5 and a power (p) of two.
   :practice: T

   Consider the same Python code. 

   .. code-block:: python
      :linenos:

      def pow(b, p):
          y = b ** p
          return y
     
      def square(x):
          a = pow(x, 2)
          return a
     
      n = 5
      result = square(n)
      print(result)

   What is printed out?

