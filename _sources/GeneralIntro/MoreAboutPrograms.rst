..  Copyright (C)  Brad Miller, David Ranum, Jeffrey Elkner, Peter Wentworth, Allen B. Downey, Chris
    Meyers, and Dario Mitchell.  Permission is granted to copy, distribute
    and/or modify this document under the terms of the GNU Free Documentation
    License, Version 1.3 or any later version published by the Free Software
    Foundation; with Invariant Sections being Forward, Prefaces, and
    Contributor List, no Front-Cover Texts, and no Back-Cover Texts.  A copy of
    the license is included in the section entitled "GNU Free Documentation
    License".

.. qnum::
   :prefix: 1-5-
   :start: 1

.. index:: control structures 
More About Programs
-------------------

A **program** is a sequence of instructions that specifies how to perform a
computation. The computation might be something as complex as rendering an html page in a web browser
or encoding a video and streaming it across a network.  It can also be a
symbolic computation, such as searching for and replacing text in a document or
(strangely enough) compiling a program.

The details look different in different languages, but a few basic terms appear in just about every language.

input
    Get data from the user via keyboard or mouse input, or from a file, or some other device.

output
    Display data on the screen for an end user, in the console for the programmer, or send data to a file or other device.

math and logic
    Perform basic mathematical operations like addition, multiplication and logical operations like ``and``, ``or``, and ``not`` (more on these later).

conditional execution
    Check for certain conditions and execute the appropriate sequence of
    statements.

repetition
    Perform some action repeatedly, usually with some  variations.

Believe it or not, that's pretty much all there is to it. Every program you've
ever used, no matter how complicated, is made up of instructions that look more
or less like these. Thus, we can describe programming as the process of
breaking a large, complex task into smaller and smaller subtasks until the
subtasks are simple enough to be performed with sequences of these basic
instructions.

Preview of Control Structures
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

We won't get too much into Python control structures yet, but it is good to mention them early to give you a taste for what you can do with the language! 
If these make sense to you now, that's great! 
However, we don't expect you to understand these yet - understanding will come later. 

First we have structures that allow us to iterate over something. We can look at strings character-by-character or lists item-by-item until we've reached the end of them by using something called a ``for`` loop. This is a type of repetition instruction. Run the program below to see what the output to the console is:

.. activecode:: ac_for_loop_preview

   for character in "Cool string":
       print(character)

We can also iterate without a definite stopping point with ``while`` loops (another type of repetition instruction). 
You might use this if you want to receive input from the user in your program but you don't know how long it'll take for them to be done entering new input. Run the program below and add some items to a grocery list:

.. activecode:: ac_while_loop_preview

   grocery_item = ""
   while grocery_item != "done":
       grocery_item = input("Please write down an item to add to your grocery list. When you are done writing the list simply type: done")
       print(grocery_item)


Note that in the example above, you could run this program repeatedly and give it a different number of items each time you run it. Also note the cancel button does not do anything at this time. That is because we haven't programmed it to do anything!

Other structures will allow us to only run parts of our programs or only do some task if a certain set of conditions are found. 
Conditionals, as they're called, allow us to do that. 
Check out how adding conditionals to our code can change what we can write about regarding grocery shopping. 

.. activecode:: ac_conditional_preview

   grocery_item = ""
   grocery_list = []
   while grocery_item != "done":
       grocery_item = input("Please write down an item to add to your grocery list. When you are done writing the list then simply type: done")
       if grocery_item == 'done':
           continue
       else:
           print("adding the item to the list")
           grocery_list.append(grocery_item)
   print("Here is our grocery list:")
   print(grocery_list)

**Check your understanding**

.. mchoice:: question_what_is_program
   :answer_a: a sequence of instructions that specifies how to perform a computation.
   :answer_b: something you follow along at a play or concert.
   :answer_c: a computation, even a symbolic computation.
   :answer_d: the same thing as an algorithm.
   :correct: a
   :feedback_a: It is just step-by-step instructions that the computer can understand and execute.  Programs often implement algorithms, but note that algorithms are typically less precise than programs and do not have to be written in a programming language.
   :feedback_b: True, but not in this context.  We mean a program as related to a computer.
   :feedback_c: A program can perform a computation, but by itself it's not one.
   :feedback_d: Programs often implement algorithms, but they are not the same thing.  An algorithm is a step by step list of instructions, but those instructions are not necessarily precise enough for a computer to follow.  A program must be written in a programming language that the computer knows how to interpret.

   A program is:
