..  Copyright (C)  Brad Miller, David Ranum, Jeffrey Elkner, Peter Wentworth, Allen B. Downey, Chris
    Meyers, and Dario Mitchell.  Permission is granted to copy, distribute
    and/or modify this document under the terms of the GNU Free Documentation
    License, Version 1.3 or any later version published by the Free Software
    Foundation; with Invariant Sections being Forward, Prefaces, and
    Contributor List, no Front-Cover Texts, and no Back-Cover Texts.  A copy of
    the license is included in the section entitled "GNU Free Documentation
    License".

.. qnum::
   :prefix: intro-2-
   :start: 1

.. index:: programming language, algorithm, pseudocode,
           program

Algorithms
----------
           
If problem solving is a central part of computer science, then the solutions that you create through
the problem solving process are also important.  In computer science, we refer to these solutions
as **algorithms**.  An algorithm is a step by step list of instructions that if followed exactly will solve the problem under consideration.

For example, an algorithm to compute the area of a circle given its radius might look like this:

.. admonition:: Algorithm Example 1 (English)

    1. Ask for radius 
    2. Compute area by squaring radius and multiplying the result by pi
    3. Display the computed area 

Notice that this algorithm consists of a set of numbered steps. It is written in English, for ease of 
understanding. Although simple algorithms are easily understood when written in English, more complicated
algorithms need more precise notation. For improved precision, algorithms are often written in pseudocode. **Pseudocode** is
a notation that is more precise than English but generally not as precise as a programming language.
The same algorithm expressed in pseudocode might look something like this:

.. admonition:: Algorithm Example 2 (Pseudocode)

    1. Ask for radius 
    2. let area = (radius\ :sup:`2`) × π
    3. Display area 

Note how the pseudocode example expresses step 2 more precisely, specifying the formula in mathematical
terms.

Our goal in computer science is to take a problem and develop an algorithm that can serve as a general solution.  
Once we have such a solution, we can use our computer to automate its execution using programming. 
Programming is a skill that allows a computer scientist to take an algorithm and represent it in
a notation (a program) that can be followed by a computer.  A program is written in a **programming language**
such as Python, the language you will learn in this book.

To help you understand the difference between an algorithm and a program, consider this program to compute
the area of a circle (hit the 'Save & Run' button to see it execute):

.. activecode:: alg_impl
   :nocodelens:

   radius = int(input("Enter the radius:"))
   area = (radius * radius) * 3.1415
   print("The area of a circle with radius", radius, "is:", area)

A **program** is an algorithm expressed in a programming language. We might also say
that a program is an *implementation* of an algorithm. In this example, both the
algorithm and the program have three steps. The first step (on line 1) gets some input from
the user and then turns the input into something the computer can do math with; 
the second step (line 2) performs a calculation using the information obtained
in the first step; and the final step (line 3) displays the result to the programmer. Even
though we haven't covered any details of Python, hopefully you can see the
correspondence between the steps of the algorithm, which could be followed by a
human (but not executed by a computer), and the steps of the program, which can
be executed by a computer (try executing this one using the Run button).

Algorithms are important because the process of solving a problem through programming often begins
by designing an algorithm. The programmer often expresses the algorithm in
pseudocode, then converts the algorithm to a program for the computer to execute.
In the next section, you will learn how to execute Python programs on a computer.

This program is **interactive** because it actually asks for input from a user. In this book, you get
to act as both the programmer and the end user. The input() command on line 1 causes Python to show
a dialog box to the user, and the user can type in a number. Let's take a look at a version of this
program that is not interactive:

.. activecode:: alg_impl_v2
   :nocodelens:

   radius = 15 
   area = (radius * radius) * 3.1415
   print("The area of a circle with radius", radius, "is:", area)

If you run this program, no dialog box pops up to the user. Instead there is a hard-coded value (15). And
so this program can only calculate one thing: the area of a circle with a radius of 15. Adding interactivity
to our programs makes them more dynamic and useful. The output of many of the programs in this book shows up
in the **console** - that's the grey block underneath the code window. The console is where errors and output 
messages appear and that is something a programmer or technology specialist uses. Most end users don't see 
what is printed out to the programmer's console. Later in this book we will show you how you as the programmer can design interfaces that show the output of your programs to end users on a screen by popping up message boxes, drawing images on a canvas that the user can interact with, or presenting graphical user interfaces that have buttons and menus that a user can interact with. 

Even simple programs like the one above embed **ethical values**. You may be thinking "What?!? There 
are no ethics involved in calculating the area of a circle!". But consider this version of the same 
program:

.. activecode:: alg_impl_v3
   :nocodelens:

   radius = int(input("Enter the radius:"))
   area = (radius * radius) * 3
   print("The area of a circle with radius", radius, "is:", area)

In this version of the program, we have rounded the value of PI down to a whole number. After all, 3 is quite close to 3.1415, right? And 3.1415 isn't the true value of PI anyway, we've already discarded lots of digits
of PI. The decision of level of precision is made by the programmer here, and it could have disastrous consequences. What if we are trying to design a part for an airplane and because of this, a part is made the wrong size? One of the things we will discuss throughout this book is the many ways that programs embed ethhical values because they are written by humans. It's very important to self-reflect on how your values are reflected (or not) in a program you write. 


**Check your understanding**

.. mchoice:: question1_2_2
   :answer_a: A solution to a problem that can be solved by a computer.
   :answer_b: A step by step sequence of instructions that if followed exactly will solve the problem under consideration.
   :answer_c: A series of instructions implemented in a programming language.
   :answer_d: A special kind of notation used by programmers.
   :correct: b
   :feedback_a: While it is true that algorithms often do solve problems, this is not the best answer.  An algorithm is more than just the solution to the problem for a computer.  An algorithm can be used to solve all sorts of problems, including those that have nothing to do with computers.
   :feedback_b: Algorithms are like recipes:  they must be followed exactly, they must be clear and unambiguous, and they must end.
   :feedback_c: Programming languages are used to express algorithms, but an algorithm does not have to be expressed in terms of a programming language.
   :feedback_d: Programmers sometimes use a special notation to illustrate or document an algorithm, but this is not the definition of an algorithm.

   An algorithm is:


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




