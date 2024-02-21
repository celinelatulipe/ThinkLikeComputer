..  Copyright (C) Celine Latulipe.  Permission is granted to copy, distribute
    and/or modify this document under the terms of the GNU Free Documentation
    License, Version 1.3 or any later version published by the Free Software
    Foundation; with Invariant Sections being Forward, Prefaces, and
    Contributor List, no Front-Cover Texts, and no Back-Cover Texts.  A copy of
    the license is included in the section entitled "GNU Free Documentation
    License".


Listener Functions
------------------

We have talked about interactivity: you have gotten input from the end user and you have shown the end user output by having turtles make fun animated drawings in a canvas window. Let's take that interactivity a step further, now that we know about functions, and add a listener function to our turtle scripts. 

First, let's consider this turtle drawing example.

.. activecode:: ac5_5_1
    :nocodelens:

    import turtle
    import random

    def random_square():
        """ draws a random square with a random small size 
            at turtle's current location
             Pre-Conditions: Turtle named alex exists, pen is down """
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
        """ Sets turtle named alex to a random colour """
        alex.color(random.random(), random.random(), random.random())

    wn = turtle.Screen()      # Set up the window and its attributes
    alex = turtle.Turtle()    # create alex
    alex.speed(10)            # make alex draw fast
    random_colour()
    random_location()
    random_square()

This example contains three different functions. First note how nicely modularized this code is, with each funtion doing one small thing: moving the turtle, giving the turtle a random colour, and drawing a random sized square. We call the three functions at the bottom of the script on lines 30-32. Not also that line 25 creates a random colour by generating 3 random values. Don't worry about this for now - you will learn more about digital colours in a later section of this chapter.

If we wanted to draw more than one square, we could put a loop around lines 30-32, but that isn't very interactive - it doesn't involve the end user in any way. What if we want the user to decide when they have enough squares on the canvas? By adding a **listener function**, we can draw squares randomly in response to end user key presses. The version below does this, by adding a key_r function, and adding two lines of code at the bottom of the script to **register** the listener function and to start **listening** for window events such as keypresses.
 
Run the code below, click your cursor inside the canvas and then type the 'r' key a few times to see it in action. Now the end user is in control!

.. activecode:: ac5_5_2
    :nocodelens:
   
    import turtle
    import random

    def random_square():
        """ draws a random square with a random small size 
            at turtle's current location
             Pre-Conditions: Turtle named alex exists, pen is down """
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
        """ Sets turtle named alex to a random colour """
        alex.color(random.random(), random.random(), random.random())

    def key_r():
        """ draw randomly coloured and positioned square """
        random_colour()
        random_location()
        random_square()

    wn = turtle.Screen()      # Set up the window and its attributes
    alex = turtle.Turtle()    # create alex
    alex.speed(10)            # make alex draw fast
    random_colour()
    random_location()
    random_square()

    wn.onkey(key_r, 'r')    # tell the operating system to execute function 'key_r()' when the 'r' key is pressed on the keyboard
    wn.listen()             # tell the operating system to listen for events on the canvas window


Let's add one more listener function to this script that ends the script. The version below adds a listener event for key_q that closes the canvas and ends the script. 

.. activecode:: ac5_5_3
    :nocodelens:
   
    import turtle
    import random

    def random_square():
        """ draws a random square with a random small size 
            at turtle's current location
             Pre-Conditions: Turtle named alex exists, pen is down """
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
        """ Sets turtle named alex to a random colour """
        alex.color(random.random(), random.random(), random.random())

    def key_r():
        """ draw randomly coloured and positioned square """
        random_colour()
        random_location()
        random_square()

    def key_q():
        """ close the canvas window """
        wn.bye()

    wn = turtle.Screen()      # Set up the window and its attributes
    alex = turtle.Turtle()    # create alex
    alex.speed(10)            # make alex draw fast
    random_colour()
    random_location()
    random_square()

    wn.onkey(key_r, 'r')    # tell the operating system to execute function 'key_r()' when the 'r' key is pressed on the keyboard
    wn.onkey(key_q, 'q')    # tell the operating system to execute function 'key_q()' when the 'q' key is pressed on the keyboard
    wn.listen()             # tell the operating system to listen for events on the canvas window


Try it out yourself. Add two functions to the code below. Add a function that draws a triangle (just copy, paste and edit the square function to draw three sides, with a turning angle of 120 instead of 90). Then add a listener function that can be called in response to the end user typing 't'. Then add a line of code at the bottom of the script to tell the computer what function to call when the user types 't'. 

.. activecode:: ac5_5_4
    :nocodelens:
   
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
        """ draw randomly coloured and positioned square """
        random_colour()
        random_location()
        random_square()

    def key_q():
        """ close the canvas window """
        wn.bye()

    wn = turtle.Screen()      # Set up the window and its attributes
    alex = turtle.Turtle()    # create alex
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


.. mchoice:: question5_5_a
   :answer_a: 0
   :answer_b: 1
   :answer_c: It doesn't - there is an error in the code
   :answer_d: It depends on the end user
   :answer_e: At least once
   :correct: d
   :feedback_a: It is possible that it is never invoked, but it could be invoked
   :feedback_b: This function gets called in response to end user input
   :feedback_c: No, there are no errors
   :feedback_d: Yes, every time the user presses the h key, the hello function will execute
   :feedback_e: If the user never presses 'h', this function never executes
   :practice: T

   How many times will the hello function get called?

   .. code-block:: python

    import turtle
    import random

    
    def hello():
        alex.penup()
        x = random.randrange(-200, 200) # get random x location
        y = random.randrange(-200, 200) # get random y location
        alex.goto(x, y)
        alex.pendown()
        alex.write("Hello!")

    wn = turtle.Screen()      # Set up the window and its attributes
    alex = turtle.Turtle()    # create alex

    alex.forward(20)

    wn.onkey(hello, 'h')
    wn.listen()             
     

.. mchoice:: question5_5_2
   :answer_a: At least once
   :answer_b: 1
   :answer_c: It doesn't - there is an error in the code
   :answer_d: It depends on the end user
   :correct: c
   :feedback_a: No, there are no calls to the goodbye() function
   :feedback_b: No, there are no calls to the goodbye() function
   :feedback_c: Yes, there is a logic error because the goodbye() function is not invoked or registered as a listener function
   :feedback_d: No, it is not registered as a listener function
   :practice: T

   How many times will the goodbye() function get called?

   .. code-block:: python

    import turtle
    import random

    def hello():
        alex.penup()
        x = random.randrange(-200, 200) # get random x location
        y = random.randrange(-200, 200) # get random y location
        alex.goto(x, y)
        alex.pendown()
        alex.write("Hello!") 

    def goodbye():
        alex.penup()
        x = random.randrange(-200, 200) # get random x location
        y = random.randrange(-200, 200) # get random y location
        alex.goto(x, y)
        alex.pendown()
        alex.write("Goodbye!")

    wn = turtle.Screen()      # Set up the window and its attributes
    alex = turtle.Turtle()    # create alex

    alex.forward(20)

    wn.onkey(hello, 'h')
    wn.listen()  

.. mchoice:: question5_5_3
   :answer_a: At least once
   :answer_b: It doesn't - there is an error in the code
   :answer_c: 1
   :answer_d: It depends on the end user
   :correct: b
   :feedback_a: No, there are no calls to the goodbye() function
   :feedback_b: Yes, there is a logic error because there is no listen() function telling the operating system to listen for window events
   :feedback_c: No, there are no calls to the goodbye() function
   :feedback_d: No, there are no calls to the goodbye() function
   :practice: T

   How many times will the goodbye() function get called?

   .. code-block:: python

    import turtle
    import random

    def hello():
        alex.penup()
        x = random.randrange(-200, 200) # get random x location
        y = random.randrange(-200, 200) # get random y location
        alex.goto(x, y)
        alex.pendown()
        alex.write("Hello!") 

    def goodbye():
        alex.penup()
        x = random.randrange(-200, 200) # get random x location
        y = random.randrange(-200, 200) # get random y location
        alex.goto(x, y)
        alex.pendown()
        alex.write("Goodbye!")

    wn = turtle.Screen()      # Set up the window and its attributes
    alex = turtle.Turtle()    # create alex

    alex.forward(20)

    wn.onkey(hello, 'h')
    wn.onkey(goodbye, 'b')
