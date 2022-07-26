..  Copyright (C)  Brad Miller, David Ranum, Jeffrey Elkner, Peter Wentworth, Allen B. Downey, Chris
    Meyers, and Dario Mitchell.  Permission is granted to copy, distribute
    and/or modify this document under the terms of the GNU Free Documentation
    License, Version 1.3 or any later version published by the Free Software
    Foundation; with Invariant Sections being Forward, Prefaces, and
    Contributor List, no Front-Cover Texts, and no Back-Cover Texts.  A copy of
    the license is included in the section entitled "GNU Free Documentation
    License".

.. qnum::
   :prefix: 1-11-
   :start: 1

.. index::
   turtles 

.. _turtles_chap:

🐢 Hello Little Turtles!
========================

.. youtube:: Yxyx6KpKRzY
    :divid: vid_turtleintro1
    :height: 315
    :width: 560
    :align: left

There are many *modules* in Python that provide very powerful features that we can use in our own programs. A module is a library of code that can perform some tasks.
We will talk more about modules in an upcoming chapter. Some of these can send email or fetch web pages. Others allow us to perform complex mathematical calculations or even display graphs.
In this chapter we will introduce a module that allows us to create a data object called a **turtle** that can be used to draw pictures.

Turtle graphics, as it is known, is based on a very simple metaphor. Imagine that you have a turtle that 
understands English. You can tell your turtle to do simple commands such as go forward and turn right. As the turtle
moves around, if its tail is down touching the ground, it will draw a line (leave a trail behind) as it moves. If you tell your turtle to lift up its tail it can still move around but will not leave a trail. As you will see, you can make some pretty amazing drawings with this simple capability.

.. note::

    The turtles are fun because they allow us to visualize what our code is doing, but the real purpose of the turtle sections throughout this book is to teach ourselves a little more Python and to practice computational thinking. You’ll first draw simple geometric shapes with the turtles, and in a later chapter we’ll summarize the concepts and syntax you’ve learned, in particular, classes, instances, and method invocations. These concepts are the building blocks of object-oriented programming, a paradigm for structuring a program that is widespread in every modern programming language.


Interactivity & Turtles
-----------------------
When we program with Turtles, we are increasing the interactivity. The output of the program can now go to two different places. We can still use print() statements to write out text to the console (remember, this type of output is typically only seen by a programmer and not the end user of the program). But now we have output that is being displayed in a window on screen. The ouput is a picture. In this textbook, that picture shows up as a canvas inside the textbook, but if you use the Turtle module from a Python environment on your own computer, you will see a window pop up on screen, that is similar to other program windows, like any pop up. In later chapters, we will build on this interactivity and make use of user input (mouse clicks and keyboard button presses). This will allow the end user to control how the turtle draws. 


