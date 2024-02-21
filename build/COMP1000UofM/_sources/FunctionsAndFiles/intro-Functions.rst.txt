..  Copyright (C)  Brad Miller, David Ranum, Jeffrey Elkner, Peter Wentworth, Allen B. Downey, Chris
    Meyers, and Dario Mitchell.  Permission is granted to copy, distribute
    and/or modify this document under the terms of the GNU Free Documentation
    License, Version 1.3 or any later version published by the Free Software
    Foundation; with Invariant Sections being Forward, Prefaces, and
    Contributor List, no Front-Cover Texts, and no Back-Cover Texts.  A copy of
    the license is included in the section entitled "GNU Free Documentation
    License".


Introduction to Functions
=========================

.. youtube:: 85WYZKKnaPQ
    :divid: goog_function_intro
    :height: 315
    :width: 560
    :align: left

In Python, a **function** is a chunk of code that performs some operation that is meaningful for a person to think about as a whole unit, for example calculating a student's GPA in a learning system or responding to the jump action in a video game. Once a function has been defined and you are satisfied that it does what it is supposed to do, you will start thinking about it in terms of the larger operation that it performs rather than the specific lines of code that make it work.

This breaking down of a task or problem is crucial to the successful implementation of any program of more than 50 or so lines (and plenty of smaller ones too).  For example, the program that displays the Instagram landing page is made up of functions that:

* display the header bar
* display your friends' posts
* display your friends' stories
* display the ad at the bottom of the screen recommending you use the app

And each of those is made up of functions as well. For example, the function that displays your friends' posts is a for loop that calls a function to:

* display a single post which in turn calls functions to:
* display the photo and name of the person posting the story
* display the photo itself
* display other users' "likes" to the story
* display the comments on the story
* etc.

In this chapter you will learn about named functions, functions that can be referred to by name when you want to execute them.

Introduction to Files
---------------------
After exploring functions, we are also going to explore working with data outside of our program by reading and writing files. So far, the data we have used in this book have all been either coded right into the program, or have been entered by the user. In real life data ofetn resides in files. For example, the images we worked with in the image processing unit ultimately live in files on your hard drive. Web pages, and word processing documents, and music are other examples of data that live in files. In the second half of this chapter we will introduce the Python concepts necessary to use data from files in our programs.

For our purposes, we will assume that our data files are text files–that is, files filled with characters. The Python programs that you write are stored as text files. We can create these files in any of a number of ways. For example, we could use a text editor to type in and save the data. We could also download the data from a website and then save it in a file. Regardless of how the file is created, Python will allow us to manipulate the contents. 


Learning Goals
--------------

* To understand functions as a means of abstraction
* To understand the difference between defining functions and calling functions
* To understand the structure of file systems
* To understand opening files with different modes
* To introduce files as another kind of sequence that one can iterate over
* To introduce the read/transform/write pattern

Objectives
----------

At the end of this chapter, you should be able to:
* create and call simple functions (functions that don't take any parameters)
* read a single value from each line in a file
* convert the line to the appropriate value
* open files and read the contents line by line
* write out files, line by line

