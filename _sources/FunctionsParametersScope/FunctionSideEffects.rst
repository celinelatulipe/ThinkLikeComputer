..  Copyright (C)  Brad Miller, David Ranum, Jeffrey Elkner, Peter Wentworth, Allen B. Downey, Chris
    Meyers, and Dario Mitchell.  Permission is granted to copy, distribute
    and/or modify this document under the terms of the GNU Free Documentation
    License, Version 1.3 or any later version published by the Free Software
    Foundation; with Invariant Sections being Forward, Prefaces, and
    Contributor List, no Front-Cover Texts, and no Back-Cover Texts.  A copy of
    the license is included in the section entitled "GNU Free Documentation
    License".

Side Effects
------------

We say that a function has a **side effect** if it makes a change in the program or output that is not reflected through the return value.

Side effects are sometimes desirable. For example, in turtle graphics, a function that causes a turtle to draw a square on the canvas may not return any value, 
but the side effect of running that function is that there is now a square on the canvas that the end user can see, and possibly, the turtle is in a different position after the function has executed. 

Additionally, if you have a function
that returns a value (such as an average), but also contains a print statement that prints out intermediate values to the console (such as the total used to calculate the average), that printed
output is a side effect of calling the function. Both of these are good examples of positive and purposeful use of side effects.

Directly editing a global variable is another side effect, but it is one we typically want to avoid. For example, consider the code below:

.. codelens:: clens8_11_1
   :python: py3

   def double(n):
      global y
      y = 2 * n
   
   y = 5
   double(y)
   print(y)

In this example, the statement on line 2 says that we want to be able to access and edit the global variable y. On line 3, we change the value of that 
variable. While this works, it is considered bad form - it is harder to debug becuase it is less clear, when we print out the value of y on line 7, where the value of y was changed. It's actually easy to figure it out in this very short code snippet, but it would be much more difficult if the double() function was 300 lines of code away from the print(y) statement.

The way to avoid using side effects to change global variables is to use return values instead: Pass the global variable's value in as a parameter,
and set that global variable to be equal to a value returned from the function. For example, the following is a better version 
of the code above.

.. codelens:: clens8_11_2
   :python: py3

   def double(n):
      return 2 * n
   
   y = 5
   y = double(y)
   print(y)

In this example, it is obvious on line 6 that the value of y is being modified by calling the double() function. 


To summarize, any lasting effect that occurs as a result of executing a function, that isn't represented through its return value, is called a side effect. There 
are three ways to have side effects:

* Printing out a value to the console. This doesn't change any objects or variable values, but it does have a potential lasting effect outside the function execution, because a programmer can see the output and be influenced by it.
* Changing the value of a global variable.
* Changing the value of a mutable object (which we will talk about in the chapter on sequences).

Documenting Side Effects
========================

When you create functions that have side effects, it is particularly important to document these as post-conditions. This may not be necessary when you are using print() statements inside a function to help debug things while you are in the middle of programming, as those are likely temporary statements that will be removed before you submit/share your code. But other side effects are really critical to document. Here is an example:

.. activecode:: ac_8_11_1

   import turtle
   import random

   def random_square(tomi):
      """pre-condition: turtle canvas created"""
      """post-conditions: a square is drawn on canvas"""
      """    at a randomly chosen location"""
      """    square is a random color"""
      """    turtle is located at corner of random square"""
      """    turtle is a random color, pen is down""" 
      x = random.randrange(-150,150)
      y = random.randrange(-150,150)
      tomi.penup()
      tomi.goto(x,y)
      tomi.pendown()
      size = 30
      tomi.color(random.random(), random.random(), random.random())
      for _ in range(4):
        tomi.right(90)
        tomi.forward(size)


   wn = turtle.Screen()
   t1 = turtle.Turtle()
   t1.speed(20)

   for _ in range(10):
      random_square(t1)

