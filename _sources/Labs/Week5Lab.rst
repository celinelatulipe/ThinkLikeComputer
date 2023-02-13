..  Copyright (C)  Celine Latulipe.  Permission is granted to copy, distribute
    and/or modify this document under the terms of the GNU Free Documentation
    License, Version 1.3 or any later version published by the Free Software
    Foundation; with Invariant Sections being Forward, Prefaces, and
    Contributor List, no Front-Cover Texts, and no Back-Cover Texts.  A copy of
    the license is included in the section entitled "GNU Free Documentation
    License".

Week 5 Lab
==========

.. admonition:: Material Covered

   Basic functions, listener functions and reading in files (Chapter 5)


Level 1
-------

The following function is missing a docstring with pre and post conditions. The objective of this level is to add the missing docstring. If you need to refresh, look at the docstrings information in Section 5.4 on how to add pre and post conditions to code. 

#1. Run the code below to understand what it does.  

#2. Add the missing docstrings. You are to find out what is needed for the function to run (aka pre-conditions) and what the output will be/how the program will be altered by running the function (aka post-conditions). You do not need to add or delete any code in this level, only add the docstrings.  
    

.. tip::
   
   There are 3 pre-conditions and 2 post conditions

.. activecode:: lab5_level1
    :nocodelens:
   
    ################################################################
    # Student name, ID & lab section
    # Date
    # Lab 5, Level 1
    ################################################################

    import turtle

    wn = turtle.Screen()      
    alexander = turtle.Turtle()    
    alexander.speed(10)   

    def axis():
       """--ADD DOCSTRING AND CONDITIONS HERE--"""

       alexander.forward(200)
       alexander.backward(400)
       home()
       alexander.left(90)
       alexander.forward(200)
       alexander.backward(400)
       home()

    def home():
       """--ADD DOCSTRING AND CONDITIONS HERE--""" 
       alexander.goto(0,0)

    alexander.color("red")
    alexander.pendown()

    axis()


Level 2
-------

In this level you will create a turtle function that will draw random lines in the window, by moving the turtle to random locations whenever the g key is pressed. This program will also erase all the lines and return the turtle to the middle when the r key is pressed. 

#. The starter code below imports modules and creates a window and a turtle. It also provides some useful constants about the window borders.
#. Create two global variables to store random x and y coordinates, assign them both the value 0 for now. 
#. Create a function called ``goto_random()``. Inside this function, assign the two global variables random values that are within the window edges(use the randrange function and the constants provided). Note that you will need to use the global keyword (followed by the names of the two variables) inside this function so that you can actually assign the variables values. Editing global variables inside of functions is typically a bad thing to do, but you need to do it here. In a few weeks you will learn a better way to do this.
#. Add a goto() statement inside this function that will send the turtle kyra to a random spot in the window, using the variables from the previous step.
#. Create another function called ``reset()``. This function should return the turtle to the center of the window and clear all the pen lines that the turtle has drawn.`` kyra.clear()`` will achieve this. 
#. At the bottom of the program, register the two functions so that they respond to user key presses. The reset() function should be called when the r key is pressed and the goto_random() function should be called when the g key is pressed. 
#. Call the reset() function near the bottom of the program. This ensures that the turtle window shows up, because a turtle command is acutally called.
#. Finally, add the ``wn.listen()`` command at the end of the script. This must be the last line.
#. Test to make sure this works. Click in the window, then hit the 'g' key a few times to make sure the turtle moves around. Then hit the 'r' key to ensure the turtle returns to the center and all the lines disappear. 
   
.. tip:: 
   
   Reference the textbook, Section 5.5 on listener functions if you have difficulty with the syntax for setting up the key press listeners.

.. activecode:: lab5_level2
    :nocodelens:

    ################################################################
    # Student name, ID & lab section
    # Date
    # Lab 5, Level 2
    ################################################################

    import turtle #iddmports the turtle library
    import random #imports the random library

    wn = turtle.Screen() #creates a graphic window

    # Window edge constants
    TOP = 200
    BOTTOM = -200
    LEFT = -200
    RIGHT = 200

    kyra = turtle.Turtle()

    #-----Add your code below-----------






Level 3
-------

This level is similar to Level 2, except instead of getting random coordinates in response to key presses, you will read a file containing turtle coordinates and then send a turtle around the window using those specific coordinates.

.. tip::
   Take a look at how the file is formatted before you start to code. The coordinate file is shown at the bottom of this page. 

#. The provided code sets up a world and a turtle, and opens the file with the coordinates for reading. Run the code to make sure it works. Nothing happens yet.
#. Iterate through each line of the file. For each line, do the following:
   
   #. Split up the coordinates, saving them to a list.  If you aren't sure how to do this, look at the examples in Section 5.9 of the textbook. 

   #. Send the turtle to the two coordinates in the list
   #. Print out the following message to the console: "Arrived at: <xcoordinate>, <ycoordinate>".

#. Once you have written this code, run it to make sure that the turtle walks through the coordinates and the coordinates print out to the console. 


.. activecode:: lab5_level3   
   :nocodelens:
   :available_files: turtle_coords.txt

    ################################################################
    # Student name, ID & lab section
    # Date
    # Lab 5, Level 3
    ################################################################

    import turtle #iddmports the turtle library

    wn = turtle.Screen() #creates a graphic window
    asif = turtle.Turtle()

    
    fileref = open("turtle_coords.txt", "r")

    #-----Add your code below-----------


    fileref.close()

Your output should look like this:

.. image:: Figures/turtle_coords_output.png
   :width: 500
   :align: center

.. datafile:: turtle_coords.txt

   10 125
   -45 67
   67 42
   -20 -180
   173 -2
   16 194
   -87 91
   0 -63



