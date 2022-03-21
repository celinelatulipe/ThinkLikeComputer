..  Copyright (C)  Brad Miller, David Ranum, Jeffrey Elkner, Peter Wentworth, Allen B. Downey, Chris
    Meyers, and Dario Mitchell.  Permission is granted to copy, distribute
    and/or modify this document under the terms of the GNU Free Documentation
    License, Version 1.3 or any later version published by the Free Software
    Foundation; with Invariant Sections being Forward, Prefaces, and
    Contributor List, no Front-Cover Texts, and no Back-Cover Texts.  A copy of
    the license is included in the section entitled "GNU Free Documentation
    License".

.. qnum::
   :prefix: turtle-2-
   :start: 1

.. index:: instance

🐢 Our First Turtle Program
---------------------------

Let's try a couple of lines of Python code to create a new turtle and
start drawing a simple figure like a rectangle.
We will refer to our first turtle using the variable name antara, but remember that you can
choose any name you wish as long as you follow the naming rules from the previous chapter.

The program as shown will only draw the first two sides of the rectangle.
After line 4 you will have a straight line going from the center of the
drawing canvas towards the right. After line 6, you will have a canvas with a
turtle and a half drawn rectangle. Press the run button to try it and see.

.. activecode:: ac3_2_1_1
    :tour_1: "Overall Tour"; 1-6: Example01_Tour01_Line01; 3: Example01_Tour01_Line02; 4: Example01_Tour01_Line03; 5: Example01_Tour01_Line04; 6: Example01_Tour01_Line05;
    :tour_2: "Line by Line Tour"; 1: Example01_Tour02_Line01; 2: Example01_Tour02_Line02; 3: Example01_Tour02_Line03; 4: Example01_Tour02_Line04; 5: Example01_Tour02_Line05; 6: Example01_Tour02_Line06;
    :nocodelens:

    import turtle             # allows us to use the turtles library
    wn = turtle.Screen()      # creates a graphics window
    antara = turtle.Turtle()    # create a turtle named antara
    antara.forward(150)         # tell antara to move forward by 150 units
    antara.left(90)             # turn by 90 degrees
    antara.forward(75)          # complete the second side of a rectangle




Here are a couple of things you'll need to understand about this program.

The first line tells Python to load a **module** named ``turtle``. You will learn about modules in a later chapter, for now you can think of a module as an external library of code that is available to use. 
Using the turtle module allows us to easily get a window up on screen and a turtle that can be used to draw pictures in that window. There are lots of details in this code that we will explain more later, for now, here is a brief explanation:

Line 2 creates a window, which has a name 'wn'. 

Line 3 creates a turtle, which has a name 'antara'.

.. brings us two new types that we can use: the ``Turtle`` type, and the
        ``Screen`` type.  The dot notation ``turtle.Turtle`` means *"The Turtle type
        that is defined within the turtle module"*. (Remember that Python is case
        sensitive, so the module name, ``turtle``, with a lowercase ``t``, is different from the
        type ``Turtle`` because of the uppercase ``T``.)

        We then create and open what the turtle module calls a screen (we would
        prefer to call it a window, or in the case of this web version of Python
        simply a canvas), which we assign to variable ``wn``. Every window
        contains a **canvas**, which is the area inside the window on which we can draw.

        In line 3 we create a turtle. The variable ``antara`` is made to refer to this
        turtle.

These first three lines set us up so that we are ready to do some drawing.

In lines 4-6, we instruct the turtle 'antara' to move and to turn. antara the turtle is an **object** and has things it can do. 
The antara.<action>(<info>) notation, tells Python that the turtle antara should do certain things (move forward, turn left) and
the information in the brackets gives details on how to do those things (how far to move, how much to turn). 

.. We do this by **invoking** or activating antara's **methods** --- these are the instructions that all turtles know how to respond to.


.. admonition:: Complete the rectangle ...

    Modify the program by adding the commands necessary to have *antara* complete the
    rectangle.

**Check your understanding**

.. mchoice:: question3_2_1
   :answer_a: North
   :answer_b: South
   :answer_c: East
   :answer_d: West
   :correct: c
   :feedback_a: Some turtle systems start with the turtle facing north, but not this one.
   :feedback_b: No, look at the first example with a turtle.  Which direction does the turtle move?
   :feedback_c: Yes, the turtle starts out facing east.
   :feedback_d: No, look at the first example with a turtle.  Which direction does the turtle move?

   Which direction does the Turtle face when it is created?

**Mixed up programs**
Throughout this textbook, you'll see many examples of 'Mixed up programs' like the one below. These are also known as Parsons' Problems. These are really helpful exercises for new programmers, because they allow you to focus just on the sequencing of the program, and not worry about the syntax (i.e. you don't have to worry about making typos or remembering exactly how a program instruction is supposed to be written). Drag the blocks from the grey box on the left to the yellow box on the right, putting them in the correct order. Click the 'Check' button to test your solution. 

.. parsonsprob:: pp3_2_1

   The following program uses a turtle to draw a capital L as shown in the picture to the left of this text:
   
   .. image:: Figures/TurtleL4.png
      :width: 150
      :align: left 
      :alt: image of a navigational compass and a letter L which is drawn by Turtle
      
   But the lines are mixed up. The program should do all necessary set-up: import the turtle module, get the window to draw on, and create the turtle. Remember that the turtle starts off facing east when it is created. The turtle should turn to face south and draw a line that is 150 pixels long and then turn to face east and draw a line that is 75 pixels long. We have added a compass to the picture to indicate the directions north, south, west, and east. 
      
   Drag the blocks of statements from the left column to the right column and put them in the right order. Then click on *Check Me* to see if you are right. You will be told if any of the lines are in the wrong order.
   -----
   import turtle
   window = turtle.Screen()
   ella = turtle.Turtle()
   =====
   ella.right(90)
   ella.forward(150)
   =====
   ella.left(90)
   ella.forward(75)

.. parsonsprob:: pp3_2_2

   The following program uses a turtle to draw a checkmark as shown to the left, 
   
   .. image:: Figures/TurtleCheckmark4.png 
      :width: 150 
      :align: left
      :alt: image of a navigational compass and a checkmark which is drawn by Turtle.
      
   But the lines are mixed up. The program should do all necessary set-up: import the turtle module, get the window to draw on, and create the turtle. The turtle should turn to face southeast, draw a line that is 75 pixels long, then turn to face northeast, and draw a line that is 150 pixels long. We have added a compass to the picture to indicate the directions north, south, west, and east. Northeast is between north and east. Southeast is between south and east. 
   
   Drag the blocks of statements from the left column to the right column and put them in the right order. Then click on Check Me to see if you are right. You will be told if any of the lines are in the wrong order.
   -----
   import turtle
   =====
   window = turtle.Screen()
   =====
   maria = turtle.Turtle()
   =====
   maria.right(45)
   maria.forward(75)
   =====
   maria.left(90)
   maria.forward(150)

.. parsonsprob:: pp3_2_3

   The following program uses a turtle to draw a single line to the west as shown to the left:
   
   .. image:: Figures/TurtleLineToWest.png 
      :width: 150 
      :align: left 
      :alt: image of a line moving in west direction drawn by Turtle. Turtle uses following steps: left turn of 180 degrees, and 75 pixels long line
      
   But the program lines are mixed up. The program should do all necessary set-up: import the turtle module, get the window to draw on, and create the turtle.  The turtle should then turn to face west and draw a line that is 75 pixels long. 
   
   Drag the blocks of statements from the left column to the right column and put them in the right order. Then click on *Check Me* to see if you are right. You will be told if any of the lines are in the wrong order.
   

   -----
   import turtle
   window = turtle.Screen()
   jamal = turtle.Turtle()
   jamal.left(180)
   jamal.forward(75)

