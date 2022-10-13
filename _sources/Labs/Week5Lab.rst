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

The following function is missing a docstring with pre and post conditions. The objective of this level is to add the missing docstring.

#1. Add the missing docstring. You are to find out what is needed for the function to run (aka pre-conditions) and what the output will be/how the program will be altered by running the function (aka post-conditions). You do not need to add or delete any code in this level, only add the docstring.  
    

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

      alexander.goto(0,0)

    alexander.color("red")

    alexander.pendown()

    axis()


Level 2
-------

In this level you will create a turtle function that will draw a random line in the window when a key is pressed.

#. The starter code below imports modules and creates a window and a turtle. 
#. Create a function called ``goto_random()``. Inside this function, create two variables to store random x and y coordinates. Assign these variables random values that range from -200 to 200 (these are left/bottom and right/top window edges). Use the randrange() function to get random numbers.
#. Add a goto() statement that will send the turtle kyra to a random spot in the window, using the variables from the previous step.
#. Create another function called ``reset()``. This function should return the turtle to the center of the window and clear all the pen lines that the turtle has drawn.
#. At the bottom of the program, call the reset function. This ensures the turtle window pops up, since a turtle command is called.
#. Under the reset function call, register the two functions so that they respond to the correct user key presses. The reset() function should be called when the r key is pressed and the goto_random() function should be called when the f key is pressed. 
#. Finally, add the wn.listen() command at the end. This must be the last line.
#. Test to make sure this works. Click in the window, then hit the 'f' key a few times to make sure the turtle moves around. Then hit the 'r' key to ensure the turtle returns to the center and all the lines disappear. 
   
.. tip:: 
   
   Reference the textbook, Section 5.5 on listener functions if you have difficulty with the syntax for setting up the key press listeners.

.. activecode:: lab5_level2
    :nocodelens:

    ################################################################
    # Student name, ID & lab section
    # Date
    # Lab 5, Level 2
    ################################################################

    import turtle #imports the turtle library
    import random #imports the random library

    wn = turtle.Screen() #creates a graphic window

    #-----Add your code below-----------

    kyra = turtle.Turtle()

Below is a clip of how your program should work.


Level 3
-------

This level is similar to Level 2, except instead of getting random coordinates in response to key presses, you will You will read a file containing turtle coordinates and then send a turtle around the window using those specific coordinates.

.. tip::
   Take a look at how the file is formatted before you start to code. The coordinate file is shown at the bottom of this page. 

#. The provided code sets up a world and a turtle, and opens the file with the coordinates for reading. Run the code to make sure it works. Nothing happens yet.
#. Iterate through each line of the file. See Section 5.9 in the textbook for how to write a for loop that does this, in particular, look at activity 5.9.3 as an example. For each line, do the following:
   
   #. Split up the coordinates (assign them to a variable called coords)
   #. Access the two elements of coords (using coords[0] and coords[1]), using them in a goto() function to send the turtle to those coordinates
   #. Print out the following message to the console: "Going to: <xcoordinate> <ycoordinate>".

#. Once you have written this code, run it to make sure that the turtle does a walk through the coordinates and the coordinates print out to the console. 


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



