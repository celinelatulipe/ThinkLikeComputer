..  Copyright (C) Celine Latulipe.  Permission is granted to copy, distribute
    and/or modify this document under the terms of the GNU Free Documentation
    License, Version 1.3 or any later version published by the Free Software
    Foundation; with Invariant Sections being Forward, Prefaces, and
    Contributor List, no Front-Cover Texts, and no Back-Cover Texts.  A copy of
    the license is included in the section entitled "GNU Free Documentation
    License".

.. qnum::
   :prefix: func-2-
   :start: 1

Listener Functions
------------------

We have talked about interactivity: you have gotten input from the end user and you have shown the end user output by having turtles make fun animated drawings in a canvas window. Let's take that interactivity a step further, now that we know about functions, and add a listener function to our turtle scripts. 

First, let's consider this turtle drawing example.

.. activecode:: ac6_5_a

    import turtle
    import random

    def random_square():
        """ draws a random square with a random small size 
            at turtle's current location
             Pre-Condition: Turtle name alex exists """
        side = random.randrange(10, 30) # get random size
        for _ in range(4): #draw a square in location
            alex.forward(side)
            alex.left(90)

    def random_location():
        """ Take turtle to a random location on canvas
            Pre-conditions: Assume turtle is named alex, and
            canvas is 400 x 400 """
        x = random.randrange(-200, 200) # get random x location
        y = random.randrange(-200, 200) # get random y location
        alex.penup() 
        alex.goto(x,y) # move to location without drawing
        alex.pendown()

    def random_colour():
        """ Sets turtle to a random colour """
        alex.color(random.random(), random.random(), random.random())

    wn = turtle.Screen()      # Set up the window and its attributes
    alex = turtle.Turtle()    # create alexr
    alex.speed(10)            # make alex draw fast
    random_colour()
    random_location()
    random_square()

This example contains three different functions. First note how nicely modularized this code is, with each funtion doing one small thing: moving the turtle, giving the turtle a random colour, and drawing a random sized square. We call the three functions at the bottom of the script on lines 30-32. Not also that line 25 creates a random colour by generating 3 random values. Don't worry about this for now - you will learn more about digital colours in a later section of this chapter.

If we wanted to draw more than one square, we could put a loop around lines 30-32, but that isn't very interactive - it doesn't involve the end user in any way. What if we want the user to decide when they have enough squares on the canvas? By adding a **listener function**, we can draw squares randomly in response to end user key presses. The version below does this, by adding a key_r function, and adding two lines of code at the bottom of the script to **register** the listener function and to start **listening** for window events such as keypresses.
 
Run the code below, click your cursor inside the canvas and then type the 'r' key a few times to see it in action. Now the end user is in control!

.. activecode:: ac6_5_b
   
    import turtle
    import random

    def random_square():
        """ draws a random square with a random small size 
            at turtle's current location
             Pre-Condition: Turtle name alex exists """
        side = random.randrange(10, 30) # get random size
        for _ in range(4): #draw a square in location
            alex.forward(side)
            alex.left(90)

    def random_location():
        """ Take turtle to a random location on canvas
            Pre-conditions: Assume turtle is named alex, and
            canvas is 400 x 400 """
        x = random.randrange(-200, 200) # get random x location
        y = random.randrange(-200, 200) # get random y location
        alex.penup() 
        alex.goto(x,y) # move to location without drawing
        alex.pendown()

    def random_colour():
        """ Sets turtle to a random colour """
        alex.color(random.random(), random.random(), random.random())

    def key_r():
        """ R-key listener - draw square in response to r key press """
        random_colour()
        random_location()
        random_square()

    wn = turtle.Screen()      # Set up the window and its attributes
    alex = turtle.Turtle()    # create alexr
    alex.speed(10)            # make alex draw fast
    random_colour()
    random_location()
    random_square()

    wn.onkey(key_r, 'r')    # tell the operating system to execute function 'key_r()' when the 'r' key is pressed on the keyboard
    wn.listen()             # tell the operating system to listen for events on the canvas window


Let's add one more listener function to this script that ends the script. The version below adds a listener event for key_q that closes the canvas and ends the script. 

.. activecode:: ac6_5_c
   
    import turtle
    import random

    def random_square():
        """ draws a random square with a random small size 
            at turtle's current location
             Pre-Condition: Turtle name alex exists """
        side = random.randrange(10, 30) # get random size
        for _ in range(4): #draw a square in location
            alex.forward(side)
            alex.left(90)

    def random_location():
        """ Take turtle to a random location on canvas
            Pre-conditions: Assume turtle is named alex, and
            canvas is 400 x 400 """
        x = random.randrange(-200, 200) # get random x location
        y = random.randrange(-200, 200) # get random y location
        alex.penup() 
        alex.goto(x,y) # move to location without drawing
        alex.pendown()

    def random_colour():
        """ Sets turtle to a random colour """
        alex.color(random.random(), random.random(), random.random())

    def key_r():
        """ R-key listener - draw square in response to r key press """
        random_colour()
        random_location()
        random_square()

    def key_q():
        """ close the canvas window """
        wn.bye()

    wn = turtle.Screen()      # Set up the window and its attributes
    alex = turtle.Turtle()    # create alexr
    alex.speed(10)            # make alex draw fast
    random_colour()
    random_location()
    random_square()

    wn.onkey(key_r, 'r')    # tell the operating system to execute function 'key_r()' when the 'r' key is pressed on the keyboard
    wn.onkey(key_q, 'q')    # tell the operating system to execute function 'key_q()' when the 'q' key is pressed on the keyboard
    wn.listen()             # tell the operating system to listen for events on the canvas window


There are a number of other events we can listen for and respond to, such as mouse clicks and drags, but we will return to those when we revisit functions with parameters in Chapter 9.


.. admonition:: Common Mistake with Listener Functions

   Most of the listener functions you write are functions that you should *never* invoke yourself. Notice that we never explicitly call key_r() in the scripts above. They are invoked automatically by the operating system. So, don't call your own listener functions. Run your script, be the end user, and press the keys to test your listener methods!
   
**Check your understanding**


.. mchoice:: question6_5_a
   :answer_a: 0
   :answer_b: 1
   :answer_c: 3
   :answer_d: 4
   :answer_e: 7
   :correct: e
   :feedback_a: Here the the function is invoked and there is also a separate print statement.
   :feedback_b: There is only one print statement outside the funciton, but the invocations of hello also cause lines to print.
   :feedback_c: There are three print statements, but the function is invoked more than once.
   :feedback_d: Each time the function is invoked, it will print two lines, not one.
   :feedback_e: Three invocations generate two lines each, plus the line "It works".
   :practice: T

   How many lines will be printed out to the console by executing this code?

   .. code-block:: python

      def hello():
         print("Hello")
         print("Glad to meet you")
         
      hello()
      print("It works")
      hello()
      hello()   
