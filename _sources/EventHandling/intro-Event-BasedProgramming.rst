..  Copyright (C)  Celine Latulipe.  Permission is granted to copy, distribute
    and/or modify this document under the terms of the GNU Free Documentation
    License, Version 1.3 or any later version published by the Free Software
    Foundation; with Invariant Sections being Forward, Prefaces, and
    Contributor List, no Front-Cover Texts, and no Back-Cover Texts.  A copy of
    the license is included in the section entitled "GNU Free Documentation
    License".

Event-Based Programming
=======================

Throughout this book, we have seen tidbits of interactive programming: using the input() statement to get information from the user, and using turtles to draw output in a window for an end user to view. We have even done a little bit of event-based programming by making use of the mouse and keyboard listeneers that are available in the turtle module. In this chapter, we formally introduce the idea of event-based programming, which is the most common form of architecture for interactive programs. The purpose of this chapter is to help you to understand the structure of event-based programming, which underlies many of the software systems, mobile apps, video games, and other digital systems you use daily. This is a huge topic, and there are entire books and courses about how to do event-based programming and how to design user interfaces for such programs. This chapter gives you a high level overview and a chance to briefly try out these concepts. 



Topics
------

* Understand what event-based programming is, and how it differs from other types of programs
* Understand that a GUI designed by the programmer is the visual representation that a user interacts with
* Understand that a programmer writes event handlers that are functions that get executed when a user interacts with the interface
* Understand that after a GUI is built and the event handlers are written, the event handlers have to be connected to the GUI objects

Learning Objectives
-------------------

At the end of this chapter, you should be able to use the Python simpleGUI module to:

* Create a simple graphical user interface
* Write event handling functions to react to end user actions
* Register event handler functions for the operating systtem to listen for

