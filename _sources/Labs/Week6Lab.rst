..  Copyright (C)  Celine Latulipe.  Permission is granted to copy, distribute
    and/or modify this document under the terms of the GNU Free Documentation
    License, Version 1.3 or any later version published by the Free Software
    Foundation; with Invariant Sections being Forward, Prefaces, and
    Contributor List, no Front-Cover Texts, and no Back-Cover Texts.  A copy of
    the license is included in the section entitled "GNU Free Documentation
    License".

Week 6 Lab
==========

.. admonition:: Material Covered

   Conditionals, if, if-else, if-elif-else (Chapter 6)


Level 1
-------

In this level you need to search through a string looking for certain key words.

#. Underneath the starter code below, create a for loop that will iterate through every word in the key_word list. Make sure you give your iterator variable a good name, as you will need it to refer to each keyword as you iterate through the list.

#. Inside the for loop create an if statement with a condition that checks to see if the current keyword is in the string paragraph.
  
   #. If the word is in paragraph, print a message to the console that the word has been found. 
   #. Otherwise, print that the word was not found.

.. tip::
   
   If you aren't sure how to check whether a string is in another string, look at Section 6.4 in the textbook.

Output should look like this:

.. image:: Figures/keyword_output.png
   :width: 300
   :align: center


.. activecode:: lab6_level1
       
    ################################################################
    # Student name, ID & lab section
    # Date
    # Lab 6, Level 1
    ################################################################

    paragraph = 'computer science can be a rewarding career opportunity. In a world of growing technology, the demand for individuals who have experience with code and artificial intelligence is on the rise'

    key_words = ['computer', 'science', 'variables', 'technology', 'security', 'A.I', 'artificial intelligence']

    

Level 2
-------

In this level, you need to sort grades into categories of A, B, C, D and F. The grades need to be separated as follows: A >= 90, 90 > B >= 75, 75 > C >= 60, 60 > D >= 50, 50 > F

#. Start by importing the random module at the top of your code
#. Create a for loop that will iterate 50 times.
#. In the for loop, create a variable that will be set to a random value from 0 to 100.
#. Inside the for loop write code that will appropriately determine the letter grade that goes with the random numeric grade. You will want to use a chained conditional (if-elif-elif) type of structure to check for the different grade levels.

The end result should look something like this (this is shortened example):   

.. image:: Figures/grade_output.png
   :width: 400
   :align: center
   

.. tip:: 
   
   Reference the textbook Section 6.9 on chained conditionals if you don't remember the syntas.

.. activecode:: lab6_level2
    
    ################################################################
    # Student name, ID & lab section
    # Date
    # Lab 6, Level 2
    ################################################################




Level 3
-------

In this level you will create a game of chance, similar to the card game war. Two players will have a random number generated between 0 and 52, the player with the higher number will win the point. In the case of a tie, no point is awarded. 20 rounds will be played, after which the winner will be displayed.

#. Start off by importing the random module into your program and creating two variables to hold the points, one for player 1 and one for player 2. Initialize these variables to 0.
#. Create a for loop that will iterate 20 times. 
#. Inside the loop, create two more variables (one for player 1's card and one for player 2's card) and assign them random values between 0 and 53, using the randrange function. 
#. Create a chained conditional statement that responds to three possible states for this card round: if player 1's card was higher, if player 2's card was higher or if it was a tie. Inside each branch of this chained conditional there should be a print statement printing out both card values and who got the point (see sample screenshot at the bottom of the level)
#. After the for loop, we want to check to see who won the game. Similar to step 3, we need a chained conditional statement to check player 1 has the most points, layer 2 has the most points or if it is a tie. Inside each branch of the chained conditional there should be a print statement printing out the winner and their final score (see sample photo at the bottom of the level)

An output example can be seen below (this is a shortened example)

.. image:: Figures/card_rounds.png
   :width: 300
   :align: center



.. activecode:: lab6_level3   

    ################################################################
    # Student name, ID & lab section
    # Date
    # Lab 6, Level 3
    ################################################################

    
Bonus: Organizing output is just as important as organizing code! Add round numbers before each round, a blank line after each round and indent the print statements for each round. (See sample output below)

.. tip::
  Some useful characters for this bonus are '\n' and '\t'

.. image:: Figures/card_rounds_formatted.png
   :width: 300
   :align: center



