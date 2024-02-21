..  Copyright (C) Celine Latulipe.  Permission is granted to copy, distribute
    and/or modify this document under the terms of the GNU Free Documentation
    License, Version 1.3 or any later version published by the Free Software
    Foundation; with Invariant Sections being Forward, Prefaces, and
    Contributor List, no Front-Cover Texts, and no Back-Cover Texts.  A copy of
    the license is included in the section entitled "GNU Free Documentation
    License".

Listener Functions with Parameters
----------------------------------

Recall that in Chapter 6 we learned about adding interactivity to programs by 
adding **listener functions** that can respond to user events. The script below 
draws one random square, and then allows more squares to be drawn whenever the 
user presses the r key. The **key_r** function is a listener function that only 
gets called when the operating system detects that the r key is pressed by the 
user, while the turtle window is **listening** (note the statement on line X 
that tells the operating system to listen for events on this turtle graphics 
window).  


.. activecode:: ac8_12_1
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

Now that we know about function parameters, we can revisit these listener functions and make use of other types of user events. What if we want the user to define not just when to add a square, but **where** to add a square? We can register a listener function that will listen for mouse click events. The reason we need parameters is that the operating system, when passing a mouse click event to Python, will pass along x and y coordinates of where in the turtle window the click happened. Those coordinates will be stored in x and y parameters. The script below is a modification of the one above that adds a mouse click listener.

.. activecode:: ac8_12_2
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

    def click(x, y):
        """ go to clicked location, pick random color and draw square """
        alex.penup()
        alex.goto(x, y)
        alex.pendown()
        random_colour()
        random_square()

    wn = turtle.Screen()      # Set up the window and its attributes
    alex = turtle.Turtle()    # create alex
    alex.speed(10)            # make alex draw fast
    random_colour()
    random_location()
    random_square()

    wn.onkey(key_r, 'r')    # tell the operating system to execute function 'key_r()' when the 'r' key is pressed on the keyboard
    wn.onkey(key_q, 'q')    # tell the operating system to execute function 'key_q()' when the 'q' key is pressed on the keyboard
    wn.onclick(click)       # tell the operating system to execute function 'click' when the user clicks the mouse
    wn.listen()             # tell the operating system to listen for events on the canvas window

Try this out yourself in the script below. The script registers four listener functions. Two are already complete. Complete the other two functions, as specified in the comments. 

.. activecode:: ac8_12_3
    :nocodelens:
   
    import turtle
    import random

    def random_color():
        """ Sets turtle to a random colour """
        alex.color(random.random(), random.random(), random.random())


    def quit():
        """ close the canvas window """
        wn.bye()

    # TODO: create a toggle_pen function. If the pen is down, lift it up, if the pen is up, put it down.
                

    # TODO: create a move function with x & y parameters. Move the turtle to the given x, y coordinates.


    wn = turtle.Screen()      # Set up the window and its attributes
    alex = turtle.Turtle()    # create alex
    alex.speed(10)            # make alex draw fast

    wn.onkey(random_color, 'c')    # tell the operating system to execute function 'random_colour()' when the 'c' key is pressed on the keyboard
    wn.onkey(quit, 'q')    # tell the operating system to execute function 'quit()' when the 'q' key is pressed on the keyboard
    wn.onkey(toggle_pen, 'p')    # tell the operating system to execute function 'toggle_pen' when the 'p' key is pressed on the keyboard
    wn.onclick(move)       # tell the operating system to execute function 'move' when the user clicks the mouse
    wn.listen()             # tell the operating system to listen for events on the canvas window

   
**Check your understanding**


.. mchoice:: question8_12_1
   :answer_a: center of the canvas
   :answer_b: 100, 100 
   :answer_c: It doesn't - the 'here' function is never called
   :answer_d: It depends on where the end user clicks
   :correct: d
   :feedback_a: It is possible that it is drawn there, if that's where the user clicks
   :feedback_b: It is possible that it is drawn there, if that's where the user clicks
   :feedback_c: The message is in a listener function
   :feedback_d: Yes, because the code displaying the message is in a listener function that is called when the user clicks on the canvas
   :practice: T

   Where does the message get written on canvas?

   .. code-block:: python

    import turtle
    import random

    
    def here(x, y):
        alex.penup()
        alex.goto(x, y)
        alex.pendown()
        alex.write("You are here!")

    wn = turtle.Screen()      # Set up the window and its attributes
    alex = turtle.Turtle()    # create alex
    alex.goto(100, 100)

    wn.onclick(here)
    wn.listen()             
     

