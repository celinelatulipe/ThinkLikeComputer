..  Copyright (C)  Celine Latulipe.  Permission is granted to copy, distribute
    and/or modify this document under the terms of the GNU Free Documentation
    License, Version 1.3 or any later version published by the Free Software
    Foundation; with Invariant Sections being Forward, Prefaces, and
    Contributor List, no Front-Cover Texts, and no Back-Cover Texts.  A copy of
    the license is included in the section entitled "GNU Free Documentation
    License".

Week 3 Lab
==========

.. admonition:: Material Covered

   Python modules and debugging (Chapter 3)

.. tip::

    When debugging a program, whether it be your own or someone else's, it's best to understand what the program is trying to do first. Read through the code and comments **before** editing the program. Also, when errors occur, it helps to start from the line number of the error and work your way backwards.
      

Level 1
-------

The program below contains multiple errors. Your objective is to debug the program, and match the expected output (see below the code). You can run the code to see error messages.

.. tip::
   
   You do not need to delete any lines of code, only edit/add.

.. activecode:: lab3_level1
   
    #This is a program that calculates annual compound interest
    
    loan = input("Please enter the amount of money borrowed (as a decimal)")
    time = int(input("Please enter amount of time the money has been borrowed (in months)"))
    rate = 6.25
    amount = loan * (math.pow((1 + rate / 100), time)
    compound_interest = amount-loan
    print("Your annual compound interest is: ", math.trunc(compound_interest))


For the following inputs: 
         
        loan = 5000
        
        time = 12
        
        rate = 6.25

The program should print:

        > Your annual compound interest is: 5349


Level 2
-------

The program below runs but contains multiple semantic (logic) and programmer errors.

Your objective is to debug the program, and match the expected output (see below the code).

.. tip::
  There are three errors on three separate lines


.. activecode:: lab3_level2

    #This program calculates your tax rate for the years 2020 and 2021
    
    income_2020 = input("Please enter your 2020 income (must be over 10,000)")
    income_2021 = input("Please enter your 2021 income (must be over 10,000)")
    total_income = int(income_2020 + income_2021)
    
    taxable_income = total_income - (total_income*0.2)
    total_tax = 3840
    
    tax_rate = (total_tax / taxable_income) * 100

    print("Your tax rate for 2020 and 2021 was:", total_tax, "percent")

For the following inputs:
        
        income_2020 = 10000
        
        income_2021 = 10000

The program should print:

    > Your tax rate for 2020 and 2021 was 24.0 percent


Level 3
-------

The following is a screenshot of turtle output. The program uses three turtles: 2 white and 1 red. 

.. image:: Figures/turtle_triangles.png
   :width: 600
   :align: center

.. tip::
  The windows size is 400 pixels by 400 pixels (default size)

You must recreate the output using the following guidelines:

* The white turtles have pen size is 1, while the red has pen size 2
* The red turtle draws last
* The red turtle draws a singular line at a random angle from 0-360 and a random length from 0 to 200


.. activecode:: lab3_level3   
   :nocodelens:

    import turtle             
    wn = turtle.Screen()      
    



