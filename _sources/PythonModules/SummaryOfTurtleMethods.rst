..  Copyright (C)  Brad Miller, David Ranum, Jeffrey Elkner, Peter Wentworth, Allen B. Downey, Chris
    Meyers, and Dario Mitchell.  Permission is granted to copy, distribute
    and/or modify this document under the terms of the GNU Free Documentation
    License, Version 1.3 or any later version published by the Free Software
    Foundation; with Invariant Sections being Forward, Prefaces, and
    Contributor List, no Front-Cover Texts, and no Back-Cover Texts.  A copy of
    the license is included in the section entitled "GNU Free Documentation
    License".

.. qnum::
   :prefix: turtle-6-
   :start: 1

Summary of Turtle Methods
-------------------------

==========  ==========  =========================
Method      Parameters  Description
==========  ==========  =========================
Turtle      None          Creates and returns a new turtle object
forward     distance      Moves the turtle forward
backward    distance      Moves the turle backward
right       angle         Turns the turtle clockwise
left        angle         Turns the turtle counter clockwise
up          None          Picks up the turtle's tail
down        None          Puts down the turtle's tail
color       color name    Changes the color of the turtle and pen
fillcolor   color name    Changes the color the turtle will use to fill a polygon
heading     None          Returns the current heading
position    None          Returns the current position
goto        x,y           Move the turtle to position x,y
begin_fill  None          Remember the starting point for a filled polygon
end_fill    None          Close the polygon and fill with the current fill color
dot         None          Leave a dot at the current position
stamp       None          Leaves an impression of a turtle shape at the current location
shape       shapename     Can be set to 'arrow', 'triangle', 'classic', 'turtle', 'circle', or 'square'
speed       integer       0 = no animation, fastest; 1 = slowest; 10 = very fast
==========  ==========  =========================

Once you are comfortable with the basics of turtle graphics you can read about even
more options on the `Python Docs Website <http://docs.python.org/3/library/turtle.html>`.

Ethics: Variable Defaults Embed Values
======================================

When a turtle and screen/canvas are first created they have a default state. That default is defined by the values that are assigned to the turtle attributes by the programmer who created the turtle module for Python. Some examples of this are that by default the screen is 400 pixels wide and 300 pixels tall. By default, the turtle is black and the turtle's drawing pen is black. The turtle's pen width is, by default, 1 pixel wide. None of these choices are problematic in any way, but they are choices that a programmer had to make, and they have an impact. If you import turtle and start drawing, you will be drawing thin, black lines, because of the choices made by that programmer. Most people work with the defaults that are programmed in to software (think of the default font in your email editor - how often do you change your email to be in a different font?). It is true that other programmers using the turtle module can use methods like turtle.pencolor() to change the colour of the line, or turtle.pensize() to change the width of the line, and for lots of pieces of software, the end user can use menus and toolbars to change settings. But, at least when people start using a program, they are most likely to just stick with the defaults and so the programmer's choice of values for these defaults is important. And in some cases, the default value assigned to variables is not something that can be changed by other programmers or the end user through interaction. Thus, making a good choice for default values is important. 


Hopefully you see how the choices a programmer makes for default values of variables are important, but you may be struggling to think of this as having anything to do with ethics. Think about the fact that by default the turtle's pen width is 1 pixel. Knowing people will use this default value most frequently, how does that impact users? Is everyone going to be able to see lines that are only one pixel thick? Is this suitable for visually impaired people, or does it exclude them? There are good reasons to have a 1-pixel default line thickness - intricate designs will render better with thin lines and fine details would get lost if a thicker line pen is used. So, there is no **correct** answer here, but the values used as defaults embed the ethical values of the programmer, and tell you a lot about who they think it is important to design for. Throughout the rest of this text, we are going to highlight ways in which you as a programmer, have the opportunity to embed your values in a program you create, and choosing default values for variables is one of the ways you do this. 


