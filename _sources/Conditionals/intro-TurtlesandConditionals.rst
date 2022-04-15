..  Copyright (C)  Brad Miller, David Ranum, Jeffrey Elkner, Peter Wentworth, Allen B. Downey, Chris
    Meyers, and Dario Mitchell.  Permission is granted to copy, distribute
    and/or modify this document under the terms of the GNU Free Documentation
    License, Version 1.3 or any later version published by the Free Software
    Foundation; with Invariant Sections being Forward, Prefaces, and
    Contributor List, no Front-Cover Texts, and no Back-Cover Texts.  A copy of
    the license is included in the section entitled "GNU Free Documentation
    License".

.. qnum::
   :prefix: condition-1-
   :start: 1

Intro: What we can do with Turtles and Conditionals
===================================================

So far, our programs have either been a series of statements which always execute sequentially, operations that are applied to each item in an iterable, or calls to functions. Yet programs frequently need to be more subtle with their behavior. For example, a messaging app might only set a message's title bold if it has not been read by the user. Or a video game needs to update the position of all the characters, except the ones that are asleep. These situations represent choices (bold or not bold?, update or not update?) and in programming, this is done with something called a **selection** or a **conditional statement**. 

In the context of turtle drawings, using this kind of statement will allow us to check conditions and change the behavior of the program accordingly. Run the program below a few times and examine the code.

.. activecode:: ac7_1_1

  # Nesting turtles beach scene
  import turtle
  import random
  wn = turtle.Screen()
  wn.bgcolor("navajo white") #sandy color

  amy = turtle.Turtle()
  amy.shape("turtle") # make turtle actually turtle shaped
  amy.penup() # we don't need to draw traces as turtle moves

  for _ in range(20): # repeat loop 20 times
    # get random location
    x = random.randrange(-200, 200)
    y = random.randrange(-200, 200)
    
    # go to location 
    amy.goto(x,y)    
    
    # get random angle direction
    direction = random.randrange(360)
    amy.setheading(direction)
    
    # set turtle color based on direction (angle < 180 is facing up)
    if direction < 180:
        amy.color("darkgreen") # heading north to lay eggs
    else:
        amy.color("lightgreen") # heading south back to water

    # stamp turtle
    amy.stamp()

The code uses turtle stamping to draw a beach scene. We create a canvas and turtle, and pick the pen up
so that there are no traces as the turtle moves around. We are using the stamp() function which just imprints 
the turtle image on the canvas. We use a for loop to stamp turtles in random locations 20 times. The 
random.rangrange() function is used to get a random x location and a random y location for the turtle each time
through the loop, and we move the turtle to that location. We use randrange again to get a random direction (between 
0 and 360), and rotate the turtle to face that direction using the setheading() function. 

The conditional part comes in when we decide what color the turtle should be before we do the stamping. To emulate
turtles heading up a beach to nest, we are colouring pregnant turtles carrying eggs dark green, and turtles that have 
already laid eggs a lighter green. How do we know which ones to colour light vs. dark? We're going to assume the turtles 
heading north are going to lay eggs, so if the angle they are facing is between 0 and 180 degrees they are heading more 
north than south. If the angle they are facing is greater than 180, then they are heading more south, and we will color 
them light green. The code on line 24 shows the conditional statement ``if direction < 180:``. This statement looks at 
the current value of the direction variable, and if it is less than 180, the expression (direction < 180) evaluates to true. In that case
the code in the indented block below executes (so amy's colour would be set to dark green). If the current angle is greater
than or equal to 180, the expression evaluates to false and the code in the indented block below the ``else`` is executed
(so amy's colour would be set to light green). What's critical to note here is that amy's colour is either going to be set
to light green or dark green. Each time through this loop, the code on line 25 will execute, or the code on line 27 will 
execute, it will never be the case that both lines execute during the same loop iteration.

    
This chapter will further detail how to use conditional statements.

Learning Goals
--------------

* To understand boolean expressions and logical operators
* To understand conditional execution
* To be able to write a boolean function
* To know when to use binary, unary, chained and nested conditional statements


Objectives
----------

* To properly evaluate a (compound) boolean expression
* To use parenthesis to properly demonstrate operator precedence
* To use conditional statements to properly branch code


