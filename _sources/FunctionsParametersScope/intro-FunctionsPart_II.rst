..  Copyright (C)  Brad Miller, David Ranum, Jeffrey Elkner, Peter Wentworth, Allen B. Downey, Chris
    Meyers, and Dario Mitchell.  Permission is granted to copy, distribute
    and/or modify this document under the terms of the GNU Free Documentation
    License, Version 1.3 or any later version published by the Free Software
    Foundation; with Invariant Sections being Forward, Prefaces, and
    Contributor List, no Front-Cover Texts, and no Back-Cover Texts.  A copy of
    the license is included in the section entitled "GNU Free Documentation
    License".

Introduction: Functions Part II
-------------------------------

You already learned how to create basic functions in Chapter 4. Functions are nice because we can call them repeatedly to execute the same set of code over and over again. In this chapter we learn how to make functions more powerful, by passing information in and out of them. Paramters allow us to pass information to functions, and return values allow us to get information from functions. 

We've played a lot with turtles, and in Chapter 6 we created two different turtle functions to have a turtle draw a small square and a big square repeatedly to make a flower image:

.. activecode:: ac8_1_1
    :nocodelens:

    import turtle

    def draw_small_square():
        """Make turtle alex draw a square of with side 50."""

        for _ in range(4):
            alex.forward(50)
            alex.left(90)

    def draw_big_square():
        """Make turtle alex draw a square of with side 100."""

        for _ in range(4):
            alex.forward(100)
            alex.left(90)

    wn = turtle.Screen()      # Set up the window and its attributes
    alex = turtle.Turtle()    # create alex
    alex.speed(10)            # make alex draw fast

    turn_angle = 15           # store a turn angle

    for _ in range(12):       # loop 12 times to go around in a circle
        alex.color("red")
        alex.right(turn_angle) # turn by 15 degrees
        draw_big_square()      # Call the function to draw the big square

        alex.color("blue")
        alex.right(turn_angle) # turn by 15 degrees
        draw_small_square()      # Call the function to draw the small square

    wn.exitonclick()
 
With the use of parameters, we can simplify this code so that only one function is needed, and so that it will work for 
any turtle, not just a turtle named alex:

.. activecode:: ac8_1_2
    :nocodelens:

    import turtle

    def draw_square(tur, size):
        """Make tur draw a square with side length size."""

        for _ in range(4):
            tur.forward(size)
            tur.left(90)

    wn = turtle.Screen()      # Set up the window and its attributes
    alex = turtle.Turtle()    # create alex
    alex.speed(10)            # make alex draw fast

    turn_angle = 15           # store a turn angle

    for _ in range(12):       # loop 12 times to go around in a circle
        alex.color("red")
        alex.right(turn_angle) # turn by 15 degrees
        draw_square(alex, 100)      # Call draw_square with large side length

        alex.color("blue")
        alex.right(turn_angle) # turn by 15 degrees
        draw_square(alex, 50)      # Call draw_square with small side length

    wn.exitonclick()

In this chapter we will explain all the details of how to construct and call functions with parameters, as well as learn about ways to return information from functions, and the side effects that functions can have. Really what we are focusing on here is where information is stored (locally in the function or globally in the program) and how it moves around in the program while the program is executing.

Topics
======

* passing information to and from functions
* local and global scope
* documenting functions
* side effects

Learning Objectives
===================

At the end of this chapter, you should be able to:

* identify formal parameters and parameter values in a code sample
* predict the return value of a function given sample parameter values
* define functions with appropriate names for formal parameters
* use type annotations to specify expected parameter and return types
* avoid the use of global variables in function definitions by creating formal parameters for all values that are needed
* identify whether a function has any side effects


