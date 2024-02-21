..  Copyright (C)  Brad Miller, David Ranum, Jeffrey Elkner, Peter Wentworth, Allen B. Downey, Chris
    Meyers, and Dario Mitchell.  Permission is granted to copy, distribute
    and/or modify this document under the terms of the GNU Free Documentation
    License, Version 1.3 or any later version published by the Free Software
    Foundation; with Invariant Sections being Forward, Prefaces, and
    Contributor List, no Front-Cover Texts, and no Back-Cover Texts.  A copy of
    the license is included in the section entitled "GNU Free Documentation
    License".

Introduction: Iteration
=======================

A basic building block of all programs is to be able to repeat some code
over and over again.  Whether it is updating the bank balances of millions of customers each night, or sending email messages to thousands of people, programming involves instructing the computer to do many repetitive actions. In computing, we refer to this repetitive execution as **iteration**.  In this section, we will explore some mechanisms for basic iteration.

With collections of items, such as lists and strings, a lot of computations involve processing one item at a time. For strings, this means that we would like to process one character at a time. Often we start at the beginning, select each character in turn, do something to it, and continue until the end. For example, we could take each character and substitute for the character 13 characters away in the alphabet to create a coded message. 

This pattern of processing is called a traversal, or iteration over the characters. Similarly, we can process each of the items in a list, by iterating over each item one at a time and doing something with each item. This has applications in every piece of software you can imagine:

* Displaying a list of friends on SnapChat
* Updating the position of every character on the screen of a video game
* Displaying the locations that Doctors Without Borders operates in 

You'll also see examples in this chapter of how iteration simplifies the code needed to make turtles draw shapes. Iteration takes advantage of a fundamental difference between humans and computers: computers can repeat a set of instructions hundreds or thousands of times very quickly, and they don't get bored doing the same thing over and over again, the way that humans would. This makes computers powerful and that has ethical implications that we will also discuss in this chatper.



