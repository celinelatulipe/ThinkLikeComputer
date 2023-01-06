..  Copyright (C)  Brad Miller, David Ranum, Jeffrey Elkner, Peter Wentworth, Allen B. Downey, Chris
    Meyers, and Dario Mitchell.  Permission is granted to copy, distribute
    and/or modify this document under the terms of the GNU Free Documentation
    License, Version 1.3 or any later version published by the Free Software
    Foundation; with Invariant Sections being Forward, Prefaces, and
    Contributor List, no Front-Cover Texts, and no Back-Cover Texts.  A copy of
    the license is included in the section entitled "GNU Free Documentation
    License".

.. qnum::
   :prefix: 1-3-
   :start: 1

.. index:: programming language, algorithm, pseudocode,
           program, interactivity, ethics

Problem Solving, Interactivity & Ethics
=======================================

This is a textbook that is designed to teach you how to program, but threaded throughout the book is three strands: problem solving (programming through the design of algorithms), interactivity (programming for people), and ethics (programming responsibly). We briefly introduce these three ideas here.
        
Problem Solving with Algorithms
-------------------------------
           
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

    1. Ask user to enter a radius. Save the result in a variable called radius 
    2. Create a variable called area and store in it the result of calculating (radius\ :sup:`2`) × π
    3. Display value stored in area to the user

Note how the pseudocode example expresses step 2 more precisely, specifying the formula in mathematical
terms.

Our goal in computer science is to take a problem and develop an algorithm that can serve as a general solution.  
Once we have such a solution, we can use our computer to automate its execution using programming. 
Programming is a skill that allows a computer scientist to take an algorithm and represent it in
a notation (a program) that can be followed by a computer.  A program is written in a **programming language**
such as Python, the language you will learn in this book.

To help you understand the difference between an algorithm and a program, consider this program which computes
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
in the first step; and the final step (line 3) displays the result to the user or programmer. Even
though we haven't covered any details of Python, hopefully you can see the
correspondence between the steps of the algorithm, which could be followed by a
human (but not executed by a computer), and the steps of the program, which can
be executed by a computer (which we ran by clicking 'Save & Run').

Algorithms are important because the process of solving a problem through programming often begins
by designing an algorithm. The programmer often expresses the algorithm in
pseudocode, then converts the algorithm to a program for the computer to execute.
In the next section, you will learn how to execute Python programs on a computer.

Interactivity - Programming for People
--------------------------------------
Consider the code we introduced in the previous section. The program is **interactive** because it asks for input from an **end user**. The end user is a person who might **use** your program, but will likely never see the code or programming instructions that you write. They just interact with the program. While you work through this book, you get to wear two hats: you get to act as both the programmer and the end user. The input() command on line 1 of the program above causes Python to show a dialog box to the end user, and the end user can type in a number. When you edit the code in the activecode window, you are wearing your **programmer** hat. When you type a number into the dialog box that comes up, you are wearing your **end user** hat.

Let's take a look at a version of this program that is *not* interactive:

.. activecode:: alg_impl_int_v2
   :nocodelens:

   radius = 15 
   area = (radius * radius) * 3.1415
   print("The area of a circle with radius", radius, "is:", area)

If you run this program, no dialog box pops up, and the user does not get to provide any input at all.  Instead, there is a hard-coded value for the radius: ``15``. That means that this program can only calculate one thing: the area of a circle with a radius of 15. That's pretty boring and not very useful! Adding interactivity
to our programs make them more dynamic and useful. The output of many of the programs in this book is displayed
in the **console** - that's the grey output window underneath the activecode window. The console is where errors and output 
messages appear and that is something a programmer or technology specialist uses. Most of the time, end users don't see 
what is printed to the programmer's console. In most modern applications, end users will interact with a program through user interface controls and windows. We will get to that as you progress through this book, but often we will have output print to the console, just to keep things simple while you are learning.

A program that is not interactive (that does not get input from a user **while the program is running**) is called a **batch** program. Sometimes batch programs read input from a file, or sometimes data is hard-coded right into the program, like the value ``15`` in the example above. Batch programs are used for data processing in many big companies. And often, when people are learning how to program, the first programs are batch programs because they are often simple: get some input, do something with it, spit out a result. Interactive programs are more complicated, because they often involve waiting for users to do things, and then doing things in response. However, interactive programs are really common in real life: every app that you use on your phone, your laptop, your smart watch, your video game console, or your fitness tracker is an interactive program. 

In this book we will teach you some of the basic elements of interactivity and interactive programming. We will show you how you can design interfaces that show the output of your programs to end users on a screen by popping up message boxes, drawing images on a canvas that the user can interact with, or presenting graphical user interfaces that have buttons and menus that a user can interact with. These interactivity elements will be interspersed throughout the book alongside more traditional batch programs that just output information to the console. 

Ethics - Programming Responsibly
--------------------------------
You may be wondering why there is a section on ethics in your programming book. You might be thinking that this is where we tell you it is wrong to cheat on your programming assignments. That is true, but that is not what this section is about. Ethics is critically important in computer science. People who are trained in computer science go on to develop technologies that change the world. Technologies impact almost every aspect of our day to day life, and so it is critical that as you learn how to design, develop and deploy technology, you make decisions so that the technology you put out in the world does not cause harm. That may seem obvious, but it's not as easy as you think to predict how the technology you develop might be used and abused. Throughout this book we will ask you to pause and consider the ethical implications of your choices as a programmer. By the end of this course, we hope you will recognize the importance of ethics in computer code.        

.. activecode:: alg_impl_ethics
   :nocodelens:

   radius = int(input("Enter the radius:"))
   area = (radius * radius) * 3.1415
   print("The area of a circle with radius", radius, "is:", area)

Even simple programs like the one above embed **ethical values**. You may be thinking "What?!? There 
are no ethics involved in calculating the area of a circle!". But consider this version of the same 
program:

.. activecode:: alg_ethics_v3
   :nocodelens:

   radius = int(input("Enter the radius:"))
   area = (radius * radius) * 3
   print("The area of a circle with radius", radius, "is:", area)

In this version of the program, we have rounded the value of PI down to a whole number. After all, 3 is quite close to 3.1415, right? Now you may be thinking, that's not an ethical decision - that's just an error. But the original value of 3.1415 isn't the true value of PI either. If you are a math afficionado, you will recall that PI has many, many digits beyond 3.1415. So, a programmer in the first program made a decision that four digits after the decimal number was enough precision. They made a decision to leave off many digits. In the second version of the program, we've just made a different decision about precision. The decision of level of precision is made by the programmer, and it could have disastrous consequences. What if we are trying to design a part for an airplane and because of this, a part is made the wrong size and that causes a malfunction which leads to a plane crash? One of the things we will discuss throughout this book is the many ways that **programs embed ethical values**, because programs are written by humans. It's very important to self-reflect on how your values are reflected (or not) in a program you write. 


**Check your understanding**

.. mchoice:: question_what_is_alg
   :answer_a: A solution to a problem that can be solved by a computer.
   :answer_b: A step by step sequence of instructions that, if followed exactly, will solve the problem under consideration.
   :answer_c: A series of instructions implemented in a programming language.
   :answer_d: A special kind of notation used by programmers.
   :correct: b
   :feedback_a: While it is true that algorithms often do solve problems, this is not the best answer.  An algorithm is more than just the solution to the problem for a computer.  An algorithm can be used to solve all sorts of problems, including those that have nothing to do with computers.
   :feedback_b: Algorithms are like recipes:  they must be followed exactly, they must be clear and unambiguous, and they must end.
   :feedback_c: Programming languages are used to express algorithms, but an algorithm does not have to be expressed in terms of a programming language.
   :feedback_d: Programmers sometimes use a special notation to illustrate or document an algorithm, but this is not the definition of an algorithm.

   An algorithm is:

.. mchoice:: question_program_output
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

.. mchoice:: ethics_try
   :answer_a: Writing code for a hospital's medical laser.
   :answer_b: Designing a new display for a calculator app.
   :answer_c: Programming software that unlocks a phone based on a face.
   :answer_d: All of the above.
   :answer_e: None of the above.
   :correct: d
   :feedback_a: Does our code account for people of different ages? Different weights? Different heights? What about people who have different immune systems or diseases? Whatever our code does will affect the end users (in this case, patients at a hospital). Are there any other scenarios that involve ethical decision making?
   :feedback_b: We are embedding our values here. How many decimals will we show? Which math operations do we want to be easily accessible? How do we know this display is easy to use? What about the other scenarios?
   :feedback_c: Facial Recognition software is a hot topic for ethical decisions. How did we make this program? Did you test it on your face? Your mom? Your dad? Your friend from Quebec? What about from Nigeria? Or Brazil? How did you make sure that it works properly for all faces? What about the other scenarios?
   :feedback_d: You got it! It doesn't matter what kind of code we are writing or designing, the choices we make will affect the product or program! It's important we self-reflect and are aware of the impact of our work on the world.
   :feedback_e: No, the decisions we make when we code will always have implications on the world. Whether we are designing a small game or coding a program that will be used in space, we embed our morals, values, and ethics into everything we produce.

   Which of the following scenarios would the programmer's decision affect the ethics of the product/result?



