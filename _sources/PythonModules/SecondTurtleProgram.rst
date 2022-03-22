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

🐢 Our Second Turtle Program
-----------------------------
We already introduced the idea of drawing with turtles. Here is a turtle that starts to draw a dashed line:

.. activecode:: ac3_5_1_1
    :nocodelens:

    import turtle             # allows us to use the turtles library
    wn = turtle.Screen()      # creates a graphics window
    maya = turtle.Turtle()    # create a turtle named maya
    maya.forward(50)         # tell maya to move forward by 50 units
    maya.penup()             # tell maya to pick up pen, so maya can move without drawing
    maya.forward(25)          # move forward without drawing
    maya.pendown()            # put the pen back down to draw
    maya.forward(50)          # move forward by 50 units


Now that you know a bit more about Python, we can explain a bit more about what is going on here. 


Line 1 imports the Turtle module. This brings us two new types that we can use: the ``Turtle`` type, and the
        ``Screen`` type.  The dot notation ``turtle.Turtle`` means *"The Turtle type
        that is defined within the turtle module"*. (Remember that Python is case
        sensitive, so the module name, ``turtle``, with a lowercase ``t``, is different from the
        type ``Turtle`` because of the uppercase ``T``.)

        We then create and open what the turtle module calls a screen (we would
        prefer to call it a window, or in the case of this web version of Python
        simply a canvas), which we assign to variable ``wn``. Every window
        contains a **canvas**, which is the area inside the window on which we can draw.

        In line 3 we create a turtle. The variable ``maya`` is made to refer to this
        turtle.

These first three lines set us up so that we are ready to do some drawing.

In lines 4-8, we instruct the turtle 'maya' to move and to turn. Maya the turtle is an **object** and once we have created a turtle object, we can make it perform actions. We do this by **invoking** or activating alex's **methods** --- these are the instructions that all turtles know how to respond to.


.. admonition:: Complete the rectangle ...

    Modify the program by adding the commands necessary to have *maya* make a dotted line that goes to the right edge of the canvas. The code will be repetitive. In a few weeks we will learn how to write this code so that it is more efficient!

**Check your understanding**

.. mchoice:: question5_1
   :answer_a: forward()
   :answer_b: forward_penup()
   :answer_c: penup()
   :answer_d: pendown()
   :correct: c
   :feedback_a: No, forward() just moves the turtle in it's current direction.
   :feedback_b: No, this is not a valid instruction?
   :feedback_c: Yes, this instruction picks up a pen, and movement after this will not leave a line.
   :feedback_d: No, this instruction puts the pen down, and movement instructions after this will draw a line.

   What instruction do you give a turtle to allow it to move without drawing?


An object can have various methods --- things it can do --- and it can also
have **attributes** --- (sometimes called *properties*). For example, each
turtle has a *color* attribute. The method invocation  ``maya.color("red")``
will make maya red and the line that it draws will be red too.

The color of the turtle, the width of its pen(tail), the position of the turtle
within the window, which way it is facing, and so on are all part of its
current **state**. Similarly, the window object has a background color which is part of its state.

Quite a number of methods exist that allow us to modify the turtle and
window objects. In the example below, we show just show a couple and have only commented
those lines that are different from the previous example. Note also that we have decided
to call our turtle object *tess*.

.. activecode:: ac3_2_2
    :tour_1: "Overall Tour"; 1-10: Example02_Tour01_Line01; 4: Example02_Tour01_Line02; 6: Example02_Tour01_Line03; 7: Example02_Tour01_Line04; 8: Example02_Tour01_Line05; 10: Example02_Tour01_Line06; 11: Example02_Tour01_Line07; 12: Example02_Tour01_Line08; 14: Example02_Tour01_Line09;
    :tour_2: "Line by Line Tour"; 1: Example01_Tour02_Line01; 3: Example01_Tour02_Line02; 4: Example02_Tour02_Line03; 6: Example02_Tour02_Line04; 7: Example02_Tour02_Line05; 8: Example02_Tour02_Line06; 10: Example02_Tour02_Line07; 11: Example02_Tour02_Line08; 12: Example02_Tour02_Line09; 14: Example02_Tour02_Line10;
    :nocodelens:

    import turtle

    wn = turtle.Screen()
    wn.bgcolor("lightgreen")        # set the window background color

    tess = turtle.Turtle()
    tess.color("blue")              # make tess blue
    tess.pensize(3)                 # set the width of her pen

    tess.forward(50)
    tess.left(120)
    tess.forward(50)

    wn.exitonclick()                # wait for a user click on the canvas


The last line plays a very important role. The wn variable refers to the window shown
above. When we invoke its ``exitonclick`` method, the program pauses execution and waits for the user to click the mouse somewhere in the window.
When this click event occurs, the response is to close the turtle window and
exit (stop execution of) the Python program.

Each time we run this program, a new drawing window pops up, and will remain on the
screen until we click on it.

.. admonition:: Extend this program ...

    #. Modify this program so that before it creates the window, it prompts
       the user to enter the desired background color.It should store the
       user's responses in a variable, and modify the color of the window
       according to the user's wishes.
       (Hint: you can find a list of permitted color names at
       https://www.w3schools.com/colors/colors_names.asp. It includes some quite
       unusual ones, like "PeachPuff"  and "HotPink".)
    #. Do similar changes to allow the user, at runtime, to set tess' color.
    #. Do the same for the width of tess' pen. *Hint:* your dialog with the
       user will return a string, but tess' ``pensize`` method
       expects its argument to be an ``int``. That means you need to convert
       the string to an int before you pass it to ``pensize``.


**Check your understanding**

.. mchoice:: question3_2_2
   :answer_a: It creates a new turtle object that can be used for drawing.
   :answer_b: It defines the module turtle which will allow you to create a Turtle object and draw with it.
   :answer_c: It makes the turtle draw half of a rectangle on the screen.
   :answer_d: Nothing, it is unnecessary.
   :correct: b
   :feedback_a: The line &quotalex = turtle.Turtle()&quot is what actually creates the turtle object.
   :feedback_b: This line imports the module called turtle, which has all the built in functions for drawing on the screen with the Turtle object.
   :feedback_c: This functionality is performed with the lines: &quotalex.forward(150)&quot, &quotlex.left(90)&quot, and &quotalex.forward(75)&quot
   :feedback_d: If we leave it out, Python will give an error saying that it does not know about the name &quotturtle&quot when it reaches the line &quotwn = turtle.Screen()&quot

   Consider the following code:

   .. code-block:: python

     import turtle
     wn = turtle.Screen()
     alex = turtle.Turtle()
     alex.forward(150)
     alex.left(90)
     alex.forward(75)

   What does the line "import turtle" do?

.. mchoice:: question3_2_3
   :answer_a: This is simply for clarity.  It would also work to just type "Turtle()" instead of "turtle.Turtle()".
   :answer_b: The period (.) is what tells Python that we want to invoke a new object.
   :answer_c: The first "turtle" (before the period) tells Python that we are referring to the turtle module, which is where the object "Turtle" is found.
   :correct: c
   :feedback_a: We must specify the name of the module where Python can find the Turtle object.
   :feedback_b: The period separates the module name from the object name.  The parentheses at the end are what tell Python to invoke a new object.
   :feedback_c: Yes, the Turtle type is defined in the module turtle.  Remember that Python is case sensitive and Turtle is different from turtle.

   Why do we type ``turtle.Turtle()`` to get a new Turtle object?

.. mchoice:: question3_2_4
   :answer_a: True
   :answer_b: False
   :correct: a
   :feedback_a: In this chapter you saw one named alex and one named tess, but any legal variable name is allowed.
   :feedback_b: A variable, including one referring to a Turtle object, can have whatever name you choose as long as it follows the naming conventions from Chapter 2.

   True or False: A Turtle object can have any name that follows the naming rules from Chapter 2.

.. mchoice:: question3_2_5
   :answer_a: <img src="../_static/test1Alt1.png" alt="right turn of 90 degrees before drawing, draw a line 150 pixels long, turn left 90, and draw a line 75 pixels long">
   :answer_b: <img src="../_static/test1Alt2.png" alt="left turn of 180 degrees before drawing,  draw a line 150 pixels long, turn left 90, and draw a line 75 pixels long">
   :answer_c: <img src="../_static/test1Alt3.png" alt="left turn of 270 degrees before drawing,  draw a line 150 pixels long, turn left 90, and draw a line 75 pixels long">
   :answer_d: <img src="../_static/test1Alt4v2.png" alt="right turn of 270 degrees before drawing, draw a line 150 pixels long, turn right 90, and draw a line 75 pixels long">
   :answer_e: <img src="../_static/test1correct.png" alt="left turn of 90 degrees before drawing,  draw a line 150 pixels long, turn left 90, and draw a line 75 pixels long">
   :correct: e
   :feedback_a: This code would turn the turtle to the south before drawing
   :feedback_b: This code would turn the turtle to the west before drawing
   :feedback_c: This code would turn the turtle to the south before drawing
   :feedback_d: This code is almost correct, but the short end would be facing east instead of west.
   :feedback_e: Yes, the turtle starts facing east, so to turn it north you can turn left 90 or right 270 degrees.

   Which of the following code would produce the following image?

   .. image:: Figures/turtleTest1.png
      :alt: long line to north with shorter line to west on top

**Mixed up programs**

.. parsonsprob:: pp3_3_4

   The following program uses a turtle to draw a capital L in white on a blue background as shown to the left, 
   
   .. image:: Figures/BlueTurtleL.png 
      :width: 150
      :align: left 
      :alt: image of a navigational compass and a letter L drawn by Turtle.
      
   But the lines are mixed up. The program should do all necessary set-up and create the turtle and set the pen size to 10. The turtle should then turn to face south, draw a line that is 150 pixels long, turn to face east, and draw a line that is 75 pixels long. Finally, set the window to close when the user clicks in it. 
   
   Drag the blocks of statements from the left column to the right column and put them in the right order. Then click on *Check Me* to see if you are right. You will be told if any of the lines are in the wrong order.
   -----
   import turtle
   wn = turtle.Screen()
   =====
   wn.bgcolor("blue")
   jamal = turtle.Turtle()
   =====
   jamal.color("white")
   jamal.pensize(10)
   =====
   jamal.right(90)
   jamal.forward(150)
   =====
   jamal.left(90)
   jamal.forward(75)
   wn.exitonclick()

.. parsonsprob:: pp3_2_5

   The following program uses a turtle to draw a capital T in white on a green background as shown to the left, 
   
   .. image:: Figures/TurtleT.png 
      :width: 150 
      :align: left
      :alt: image of a letter T drawn by Turtle. 
      
   But the lines are mixed up. The program should do all necessary set-up, create the turtle, and set the pen size to 10. After that the turtle should turn to face north, draw a line that is 150 pixels long, turn to face west, and draw a line that is 50 pixels long. Next, the turtle should turn 180 degrees and draw a line that is 100 pixels long. Finally, set the window to close when the user clicks in it.
      
   Drag the blocks of statements from the left column to the right column and put them in the right order. Then click on *Check Me* to see if you are right. You will be told if any of the lines are in the wrong order.
   -----
   import turtle
   wn = turtle.Screen()
   wn.bgcolor("green")
   jamal = turtle.Turtle()
   jamal.color("white")
   jamal.pensize(10)
   =====
   jamal.left(90)
   jamal.forward(150)
   =====
   jamal.left(90)
   jamal.forward(50)
   =====
   jamal.right(180)
   jamal.forward(100)
   =====
   wn.exitonclick()
