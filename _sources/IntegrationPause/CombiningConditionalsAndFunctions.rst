..  Copyright (C) Celine Latulipe.  Permission is granted to copy, distribute
    and/or modify this document under the terms of the GNU Free Documentation
    License, Version 1.3 or any later version published by the Free Software
    Foundation; with Invariant Sections being Forward, Prefaces, and
    Contributor List, no Front-Cover Texts, and no Back-Cover Texts.  A copy of
    the license is included in the section entitled "GNU Free Documentation
    License".

.. qnum::
   :prefix: func-1-
   :start: 1

Combining Conditionals and Functions
=====================================

In this section, we will look at examples where:

* We use conditional branching inside of a function
* We call functions from inside a conditional branch 

Remember that we use functions to help break our code up into smaller, meaningful sub-tasks, and to enable easy code re-use. We use conditionals when we need to decide what code to execute based on some information (such as the state of certain variables, the contents in a list, or input we get from a user). So we will often make a decision and than call a function to perform different tasks depending on the decision outcome (calling functions from within conditional branches). It also makes sense that quite often within a function that performs a task, we need to make decisions as part of that task (having donditional statements inside of functions). And sometimes, we want to do both of those things.  

Conditional Branching inside Functions
--------------------------------------

We use conditional branches inside functions when the function task involves making decisions about things. That could look like any of these:

.. image:: Figures/conditionals_inside_functions.png
    :width: 600
    :align: center

A toggle function is a really good example of a function with a conditional inside of it. Let's imagine that we want a turtle to switch between drawing in red and black whenever the user presses the 't' key on the keyboard. The following code accomplishes this through the toggle_color() function, which contains an if-else conditional statement.

.. activecode:: ac7_4_1a
    :nocodelens:
    
    import turtle
    import random

    def toggle_color():
        if tami.pencolor() == "Red":
            tami.pencolor("Black")
        else:
            tami.pencolor("Red")

    def random_move():
        x = random.randrange(-180, 180)
        y = random.randrange(-180, 180)
        tami.goto(x,y)
    
    def key_t():
        toggle_color()

    def key_c():
        toggle_color()

    def key_m():
        random_move()

    wn = turtle.Screen()
    tami = turtle.Turtle()

    tami.home()

    wn.onkey(key_t, "t")
    wn.onkey(key_c, "c")
    wn.onkey(key_m, "m")
    wn.listen()

A few things to note about this example:

* The turtle moves to a random location whenever the user presses the 'm' key 
* We haven't used an elif condition to check if the pencolor is black before switching it to red, but that would be a good idea if we thought the pen color could be set to something else somewhere else in the code. 
* You may be wondering why we don't just put the if-else inside the key_t() listener function. But notice that we have actually allowed the user to press either the t key (for "Toggle") or the c key (for "Color") to toggle the color. If we put the if-else in the key_t() function, we'd then have to repeat it in the key_c() function. Remember that we want to avoid repeating code. We might also later want to toggle the pen color in response to some other thing happening (such as the turtle hitting the edge of the canvas). The toggle_color() function can be called from any part of the code, and then it makes a decision, based on the current state of the turtle, to update the turtle to a different color.
* The tami.home() command is necessary in the Runestone textbook version of this code. If we don't have a turtle movement command of some sort, Runestone won't show the canvas, and until the canvas is shown, there is nothing to listen for. You wouldn't need that command if you were running this code in a desktop Python environment. 


Calling Functions from Conditional Blocks
-----------------------------------------

[TODO]
