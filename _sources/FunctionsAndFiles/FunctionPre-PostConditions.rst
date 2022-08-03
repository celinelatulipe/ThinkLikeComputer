..  Copyright (C)  Brad Miller, David Ranum, Jeffrey Elkner, Peter Wentworth, Allen B. Downey, Chris
    Meyers, and Dario Mitchell.  Permission is granted to copy, distribute
    and/or modify this document under the terms of the GNU Free Documentation
    License, Version 1.3 or any later version published by the Free Software
    Foundation; with Invariant Sections being Forward, Prefaces, and
    Contributor List, no Front-Cover Texts, and no Back-Cover Texts.  A copy of
    the license is included in the section entitled "GNU Free Documentation
    License".


Ethics: Documenting Function Assumptions  
----------------------------------------

You already saw earlier in this chapter that **docstrings** are used to provide information about the purpose of a function.
But, that's just the beginning. It's often useful and important to document other information about functions: such as when 
the function is appropriate to use (and when it might not be appropriate), and how the state of a program is impacted by running the 
funtion. Let's look at an example. 


.. activecode:: ac5_4_1
    :nocodelens:
  
    import turtle

    def square():
      """Draws a square"""
      for _ in range(4):
        amy.forward(20)
        amy.right(90)

    def flower():
      """Draws squares in rotation around a point to form a flower"""
      num_squares = 12
      angle = 360/num_squares               # turn 30 degrees before drawing each square
      for _ in range(num_squares):
        amy.right(angle)
        square()


    wn = turtle.Screen()      # Set up the window and its attributes
    amy = turtle.Turtle()    # create amy
    amy.speed(10)            # make turtle draw fast

    amy.color("red")      # draw first flower in red
    flower()

    amy.penup()           # pick up pen and move to new location
    amy.left(45)
    amy.forward(100)
    amy.pendown()         # put pen back down
     
    amy.color("purple")   # draw second flower in purple
    flower()

    amy.penup()           # pick up pen and move to new location
    amy.left(70)
    amy.forward(50)
    amy.pendown()         # put pen back down

    amy.color("pink")   # draw third flower in pink
    flower()

This example uses function composition: one function calls another function. The flower() function calls the square() function repeatedl, each rotated slightly, to form a small flower. The two functions are defined at the top of the script. Also note the docstrings in each, saying what each function does. The rest of the code sets up the turtle and screen, and then there are a number of commands that move the turtle to different places, set the colour and call the flower() function.

The purple and pink flowers are rotated slightly compared to the red flower. If you look at the code, after drawing the red flower the turtle turns right 45 degrees, moves to the new location and then starts drawing the flower. The turtle is facing north-east when it starts drawing the second flower; the rotation of the flower is defined by the heading of the turtle. There are a lot of aspects of program state that can come into play here, and it is appropriate for you as the developer of the code to communicate how this function will behave when it is called. Let's look at a slightly modified version of the same code below:

.. activecode:: ac5_4_2
    :nocodelens:
  
    import turtle

    def square():
      """Draws a square"""
      for _ in range(4):
        amy.forward(20)
        amy.right(90)

    def flower():
      """Draws squares in rotation around a point to form a flower"""
      amy.color("orange")
      num_squares = 12
      angle = 360/num_squares               # turn 30 degrees before drawing each square
      for _ in range(num_squares):
        amy.right(angle)
        square()
      amy.penup()
      amy.home()
      amy.pendown()

    wn = turtle.Screen()      # Set up the window and its attributes
    amy = turtle.Turtle()    # create amy
    amy.speed(10)            # make turtle draw fast

    amy.color("red")
    flower()

    amy.penup()
    amy.left(45)
    amy.forward(100)
    amy.pendown()
    
    amy.color("purple")
    flower()

    amy.penup()           # pick up pen and move to new location
    amy.left(70)
    amy.forward(50)
    amy.pendown()         # put pen back down

    amy.color("pink")   # draw third flower in pink
    flower()

In this version of the program, everything is the same, except for the flower() function. It still draws a flower, but it behaves differently in two ways. Run it and see if you can figure it out.

First, the colour is different. This version of the flower function is setting the turtle draw color to orange inside the function. That means that the code on lines 25, 33, and 41 are useless - they are setting the turtle colour before calling the flower() function, but the flower() function is setting the colour to orange, and so it only draws orange flowers. The second difference is that in this version, the code at the end of the flower() function sends the turtle to the home location in the center of the screen, and that home() command also resets the turtle's orientation to face east. That means any movements of the turtle between drawing flowers are movements from the center of the screen. This change to the way the flower function works impacts how the code in the rest of the program functions (and in this case changes the location of the pink flower).  

It is important to realize that when writing functions, you are making choices and making assumptions about how you expect the code to be used. Writing out the pre and post-conditions, as shown below, is a way of making your assumptions about how the function should be used, very explicit. This forces you to think about your design choices. Does it make sense for the flower to be only one colour? What's so great about orange? Maybe the colour should be set prior to calling this function so that the flowers can be other colours. (In Chapter 9 we'll show how to send in the colour to the function as a parameter.) Should the turtle end at the center of the flower, or should the turtle return to the center of the drawing canvas? Either might be the right choice, depending on what your program is meant to do, but writing out the pre- and post-conditions explicitly will help you think through the choices you are making. 

While the colour of flowers and the position of the turtle may not be life-changing in their ethical implications, other code that you write will have much more critical implications. In the next chapter you will learn about conditionals and how the Python interpreter can make decisions based on code statements you write. Then in Chapter 9 when we learn how to write functions that can accept information as parameters, we will put these things together and you will see how a function can return a decision about a piece of information, such as whether someone should be considered for a job, whether someone should be admitted into a college program, etc. If the assumptions about the information sent in are not documented or met, people's lives could be impacted negatively. Writing the pre and post conditions for your functions will help ensure you and other programmers know in which conditions it's appropriate to use your functions, and how running them may affect other code.  


    
Function Pre-Conditions
=======================
Pre-conditions define the assumptions that the programmer expects to be true in order for the function to work as expected. In this modification of the example above, you can see that pre-conditions have been added for both functions:

.. activecode:: ac5_4_3
    :nocodelens:
  
    import turtle

    def square():
      """Draws a square

         Pre-conditions: turtle named Amy exists, and pen is down,
           Amy's current orientation determines orientation of square.
           Amy's current pen color determines color of square.
      """

      for _ in range(4):
        amy.forward(20)
        amy.right(90)

    def flower():
      """Draws squares in rotation around a point to form a flower

         Pre-conditions: turtle named Amy exists, pen is down.
           Amy's current orientation determines orientation of flower.
           Amy's current pen color determines colour of flower. 
      """
      num_squares = 12
      angle = 360/num_squares               # turn 30 degrees before drawing each square
      for _ in range(num_squares):
        amy.right(angle)
        square()
      amy.penup()
      amy.home()
      amy.pendown()

    wn = turtle.Screen()      # Set up the window and its attributes
    amy = turtle.Turtle()    # create amy
    amy.speed(10)            # make turtle draw fast

    amy.color("red")
    flower()

    amy.penup()
    amy.left(45)
    amy.forward(100)
    amy.pendown()
    
    amy.color("purple")
    flower()

    amy.penup()           # pick up pen and move to new location
    amy.left(70)
    amy.forward(50)
    amy.pendown()         # put pen back down

    amy.color("pink")  # draw third flower in pink
    flower()

A few things to note: the pre-conditions outline what is expected to be true in order for these two functions to work. In this case, if there isn't a turtle called Amy, the function will fail. If there is a turtle called Amy, but Amy's pen is up, the function will run, but no flower will be visible. This may lead you to think that perhaps there should be an amy.pendown() command at the beginning of the flower function. That's a possible design decision. (See how writing out the pre-conditions helps you to think through your design choices?). Another thing to note here is the style of the **docstrings** comment. Since it spans multiple lines, the three quotation marks at the beginning and end are at the left, with the comment text indented. There is a summary line first, then a blank line, then the rest of the information, including the preconditions. This helps for readability and is a convention you should follow.

Function Post-Conditions
========================

Post-conditions identify how the state of your program will be different *after* running the function. The program from above is presented below with post-conditions added for both functions:

.. activecode:: ac5_4_4
    :nocodelens:
  
    import turtle

    def square():
      """Draws a square

         Pre-conditions: turtle named Amy exists, and pen is down,
           Amy's current orientation determines orientation of square.
           Amy's current pen color determines color of square.
         Post-conditions: A square is drawn on the canvas.
      """

      for _ in range(4):
        amy.forward(20)
        amy.right(90)

    def flower():
      """Draws squares in rotation around a point to form a flower

         Pre-conditions: turtle named Amy exists, pen is down.
           Amy's current orientation determines orientation of flower.
           Amy's current pen color determines colour of flower. 
         Post-conditions: A flower is drawn on the canvas. The turtle is 
           returned to home (0,0), with east orientation. 
      """
      num_squares = 12
      angle = 360/num_squares               # turn 30 degrees before drawing each square
      for _ in range(num_squares):
        amy.right(angle)
        square()
      amy.penup()
      amy.home()
      amy.pendown()

    wn = turtle.Screen()      # Set up the window and its attributes
    amy = turtle.Turtle()    # create amy
    amy.speed(10)            # make turtle draw fast

    amy.color("red")
    flower()

    amy.penup()
    amy.left(45)
    amy.forward(100)
    amy.pendown()
    
    amy.color("purple")
    flower()

    amy.penup()           # pick up pen and move to new location
    amy.left(70)
    amy.forward(50)
    amy.pendown()         # put pen back down

    amy.color("pink")  # draw third flower in pink
    flower()

This code now shows what programmers need to know about changes to the state of the program, after the function has run. In the case of the square() function, the only change is that there is now a square on the canvas. The turtle's colour, orientation, pen state, etc. is all the same as before the function was called. For the flower() function, there are two changes: the flower is drawn on canvas, and the turtle is returned to the home position and orientation. Reading this allows you and any other programmers to know what to expect if the function is called.


**Check your understanding**
[TODO: Lauren will add some questions

.. .. mchoice:: question6_4_1a
   :answer_a: A named sequence of statements.
   :answer_b: Any sequence of statements.
   :answer_c: A mathematical expression that calculates a value.
   :answer_d: A statement of the form x = 5 + 4.
   :correct: a
   :feedback_a: Yes, a function is a named sequence of statements.
   :feedback_b: While functions contain sequences of statements, not all sequences of statements are considered functions.
   :feedback_c: While some functions do calculate values, the python idea of a function is slightly different from the mathematical idea of a function in that not all functions calculate values.  Consider, for example, the turtle functions in this section.   They made the turtle draw a specific shape, rather than calculating a value.
   :feedback_d: This statement is called an assignment statement.  It assigns the value on the right (9), to the name on the left (x).

   What is a function in Python?


