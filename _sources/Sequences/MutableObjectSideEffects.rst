..  Copyright (C)  Brad Miller, David Ranum, Jeffrey Elkner, Peter Wentworth, Allen B. Downey, Chris
    Meyers, and Dario Mitchell.  Permission is granted to copy, distribute
    and/or modify this document under the terms of the GNU Free Documentation
    License, Version 1.3 or any later version published by the Free Software
    Foundation; with Invariant Sections being Forward, Prefaces, and
    Contributor List, no Front-Cover Texts, and no Back-Cover Texts.  A copy of
    the license is included in the section entitled "GNU Free Documentation
    License".

Mutable Object Side Effects
---------------------------

When we pass mutable objects, like lists, to functions, the contents of those objects can be changed within the function. This is a side effect, if the
object is not returned from the function. Consider the following example, which we have seen before:

.. codelens:: clens9_10_1
   :python: py3

   def bison(lst):
      lst[0] = "Manitoba"
      lst[1] = "Bisons"
      
   mylst = ['COMP 1000', 'students', 'are', 'awesome']
   bison(mylst)
   print(mylst)


When this code runs and we print out mylst, it looks different from what's in mylst on line 5. Again, in this example, the bison function is right there, so it isn't hard to figure out why the list changed, but if there were 100 lines of code between the function definition and the function being called, it would be harder to understand and debug. 

We can avoid confusing side effects when passing around mutable objects by passing in a copy of the object and then returning the modified copy and reassigning it to the variable. This makes it much more obvious that the function is altering the mutable object. Here is the code above rewritten to do this:

.. codelens:: clens9_10_2
   :python: py3

   def bison(lst):
      lst[0] = "Manitoba"
      lst[1] = "Bisons"
      return lst

   mylst = ['COMP 1000', 'students', 'are', 'awesome']
   newlist = bison(list(mylst))
   print(mylst)
   print(newlist)


On line 7 in the code above, we use the built-in ``list()`` function, which takes a sequence as a 
parameter and returns a copy of that sequence as a list. Note also that we had to modify the function to return the list. Once these changes are made, the alterations to the list are no longer considered a side effect, as they are made transparent by returning a changed value.

Side Effects in Interactive Programs
====================================

When we program interactively and use listener functions, we end up modifying global variables and objects and creating side effects. This is because the listener functions that you can register must only have the parameters relevant to the interaction event. Let's revisit an earlier example:

.. activecode:: ac9_10_1_1
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

In this interactive programming example, it isn't possible to pass the turtle object (alex) to the listener functions key_r() or click() because these functions' parameters are confined to the parameters needed for responding to specific events. The key_r function is registered to execute when the user presses the r key and as a key listener function it takes no parameters. The click function is registered to execute when the user clicks the mouse and as a mouse-click listener function it must take two parameters so the operating system can pass in the information about where the user clicked the mouse (x and y). We can make this code have fewer side-effects by modifying it as shown below.

.. activecode:: ac9_10_1_2
    :nocodelens:
   
    import turtle
    import random

    def random_square(tur):
        """ Post-Condition: square with random small size 
            is drawn at turtle's current location """
        side = random.randrange(10, 30) # get random size
        for _ in range(4): #draw a square in location
            tur.forward(side)
            tur.left(90)
        return tur

    def random_location(tur):
        """ Post-Condition: turtle is moved to a random location on canvas
            Pre-conditions: Assume canvas is 400 x 400 """
        x = random.randrange(-200, 200) # get random x location
        y = random.randrange(-200, 200) # get random y location
        tur.penup() 
        tur.goto(x,y) # move to location without drawing
        tur.pendown()
        return tur

    def random_colour(tur):
        """ Post-Condition: turtle is a random colour """
        tur.color(random.random(), random.random(), random.random())
        return tur

    def key_r():
        """ draw randomly coloured and positioned square """
        global alex
        alex = random_colour(alex)
        alex = random_location(alex)
        alex = random_square(alex)

    def key_q():
        """ close the canvas window """
        wn.bye()

    def click(x, y):
        """ go to clicked location, pick random color and draw square """
        global alex
        alex.penup()
        alex.goto(x, y)
        alex.pendown()
        alex = random_colour(alex)
        alex = random_square(alex)

    wn = turtle.Screen()      # Set up the window and its attributes
    alex = turtle.Turtle()    # create alex
    alex.speed(10)            # make alex draw fast
    alex = random_colour(alex)
    alex = random_location(alex)
    alex = random_square(alex)

    wn.onkey(key_r, 'r')    # tell the operating system to execute function 'key_r()' when the 'r' key is pressed on the keyboard
    wn.onkey(key_q, 'q')    # tell the operating system to execute function 'key_q()' when the 'q' key is pressed on the keyboard
    wn.onclick(click)       # tell the operating system to execute function 'click' when the user clicks the mouse
    wn.listen()             # tell the operating system to listen for events on the canvas window


So, in the code above, we specify that we want to access and edit the global turtle variable (alex) in the listener functions key_r() and click(). Inside those functions, we call the other functions, but now we are passing them the turtle, they are modifying the turtle, and returning the turtle back to us. Now the only side-effects are the effects on the canvas (the square that is drawn, and the color and position of the turtle triangle representation).  By returning the turtle object to the listener, we make it really clear that the turtle is changed by the random_square(), random_location() and random_colour() functions.


**Check your understanding**

.. mchoice:: question9_10_1
   :answer_a: none
   :answer_b: 1 
   :answer_c: 2
   :answer_d: It depends on how often the end user clicks
   :correct: b
   :feedback_a: A turtle named Alex is created on line 16
   :feedback_b: Yes, one turtle is created, and then is passed around and modified
   :feedback_c: A turtle is a mutable object, and it is passed around and modified in this program
   :feedback_d: A turtle is a mutable object, and it is passed around and modified in this program
   :practice: T

   How many turtles are created in this script?

   .. code-block:: python

    import turtle
    import random

    def write_msg(tom, msg, x, y):
        tom.penup()
        tom.goto(x,y)
        tom.pendown()
        tom.write(msg)
        return tom
    
    def here(x, y):
        global alex
        alex = write_msg(alex, "You clicked here!", x, y)

    wn = turtle.Screen()      # Set up the window and its attributes
    alex = turtle.Turtle()    # create alex
    alex = write_msg(alex, "Hello!", 0, 0)
    wn.onclick(here)
    wn.listen()             

.. mchoice:: question9_10_2
   :answer_a: There is no side effect, because the turtle is returned
   :answer_b: The turtle's internally stored coordinated are different
   :answer_c: A msg has been written on the canvas, and the turtle icon is in a different place 
   :answer_d: The turtle alex has been modified
   :correct: c
   :feedback_a: Changes on the canvas are side effects.
   :feedback_b: Because the turtle is a mutable object, and it is returned from the functions, changes to it are not considered side effects
   :feedback_c: Yes changes to what the user sees on the canvas are side effects.
   :feedback_d: Because the turtle is a mutable object, and it is returned from the functions, changes to it are not considered side effects
   :practice: T

   What is a side effect of the write_msg function?

   .. code-block:: python

    import turtle
    import random

    def write_msg(tom, msg, x, y):
        tom.penup()
        tom.goto(x,y)
        tom.pendown()
        tom.write(msg)
        return tom
    
    def here(x, y):
        global alex
        alex = write_msg(alex, "You clicked here!", x, y)

    wn = turtle.Screen()      # Set up the window and its attributes
    alex = turtle.Turtle()    # create alex
    alex = write_msg(alex, "Hello!", 0, 0)
    wn.onclick(here)
    wn.listen()  

