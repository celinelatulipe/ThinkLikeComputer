..  Copyright (C)  Brad Miller, David Ranum, Jeffrey Elkner, Peter Wentworth, Allen B. Downey, Chris
    Meyers, and Dario Mitchell.  Permission is granted to copy, distribute
    and/or modify this document under the terms of the GNU Free Documentation
    License, Version 1.3 or any later version published by the Free Software
    Foundation; with Invariant Sections being Forward, Prefaces, and
    Contributor List, no Front-Cover Texts, and no Back-Cover Texts.  A copy of
    the license is included in the section entitled "GNU Free Documentation
    License".

.. qnum::
   :prefix: intro-3-
   :start: 1

.. index:: programming language, algorithm, pseudocode,
           program, interactivity, end user

Interactivity
-------------
Consider the following code we introduced in the previous section:           

.. activecode:: alg_impl_int
   :nocodelens:

   radius = int(input("Enter the radius:"))
   area = (radius * radius) * 3.1415
   print("The area of a circle with radius", radius, "is:", area)

This program is **interactive** because it asks for input from an **end user**. The end user is a person who might **use** your program, but will never see the code or programming instructions that you write. They just interact with the program. While you work through this book, you get to wear two hats: you get to act as both the programmer and the end user. The input() command on line 1 of the program above causes Python to show a dialog box to the end user, and the end user can type in a number. When you edit the code in the activecode window, you are wearing your **programmer** hat. When you type a number into the dialog box that comes up, you are wearing your **end user** hat.

Let's take a look at a version of this program that is not interactive:

.. activecode:: alg_impl_int_v2
   :nocodelens:

   radius = 15 
   area = (radius * radius) * 3.1415
   print("The area of a circle with radius", radius, "is:", area)

If you run this program, no dialog box pops up, and the user does not get to provide any input at all.  Instead there is a hard-coded value for the radius: ``15``. And
so this program can only calculate one thing: the area of a circle with a radius of 15. That's pretty boring and not very useful! Adding interactivity
to our programs makes them more dynamic and useful. The output of many of the programs in this book is displayed
in the **console** - that's the grey output window underneath the activecode window. The console is where errors and output 
messages appear and that is something a programmer or technology specialist uses. Most end users don't see 
what is printed out to the programmer's console. 

A program that is not interactive (that does not get input from a person **while the program is running** is called a **batch** program. Sometimes batch programs read input from a file, or sometimes data is hard-coded right into the program, like the value ``15`` in the example above. Batch programs are used for data processing in many big companies. And often, when people are learning how to program, the first programs are batch programs because they are often simple: get some input, do something with it, spit out a result. Interactive programs are more complicated, because they often involve waiting for users to do things, and then doing things in response. However, interactive programs are really common in real life: every app that you use on your phone, your laptop, your smart watch, your video game console, oryour fitness tracker is an interactive program. 

In this book we will teach you some of the basic elements of interactivity and interactive programming. We will show you how you can design interfaces that show the output of your programs to end users on a screen by popping up message boxes, drawing images on a canvas that the user can interact with, or presenting graphical user interfaces that have buttons and menus that a user can interact with. These interactivity elements will be interspersed throughout the book alongside more traditional batch programs that just output data to the console. 



**Check your understanding**


.. mchoice:: question1_2_3
   :answer_a: Always exactly the same as what the programmer sees.
   :answer_b: The text that shows up in the console.
   :answer_c: Not something the programmer needs to worry about.
   :answer_d: Designed by the programmer and usually shows up as a dialog box or window on screen.
   :correct: d 
   :feedback_a: The programmer gets lots of output from a program that helps them ensure the program is working correctly. An end user doesn't need to see all of that. They just need the result presented to them.
   :feedback_b: The console is not usually visible to end users. It is designed to show programming output to the programmer to help them as they develop the program.
   :feedback_c: Programmers are responsible for showing appropriate and understandable output to the end user of the program.
   :feedback_d: Programmers need to design output for the end users who will interact with their program and this usually shows up as part of a graphical user interface: in a dialog box, in a window, etc.

   The output of a program that an end user typically sees is:




