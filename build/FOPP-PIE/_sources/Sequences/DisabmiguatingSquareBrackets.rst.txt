..  Copyright (C)  Brad Miller, David Ranum, Jeffrey Elkner, Peter Wentworth, Allen B. Downey, Chris
    Meyers, and Dario Mitchell.  Permission is granted to copy, distribute
    and/or modify this document under the terms of the GNU Free Documentation
    License, Version 1.3 or any later version published by the Free Software
    Foundation; with Invariant Sections being Forward, Prefaces, and
    Contributor List, no Front-Cover Texts, and no Back-Cover Texts.  A copy of
    the license is included in the section entitled "GNU Free Documentation
    License".


Disambiguating []: creation vs indexing
=======================================

Square brackets ``[]`` are used in quite a few ways in Python. When you're first learning how to use them it may be 
confusing, but with practice and repetition they'll be easy to incorporate!

You have currently encountered two instances where we have used square brackets. The first is creating lists and the second 
is indexing. At first glance, creating and indexing are difficult to distinguish. However, indexing requires referencing 
an already created list while simply creating a list does not.

.. activecode:: ac9_3_1

   my_lst = []

In the code above, a new list is created using the empty brackets. Since there's nothing in it though, we can't index into it.

.. activecode:: ac9_3_2

   new_lst = ["NFLX", "AMZN", "GOOGL", "DIS", "XOM"]
   part_of_new_lst = new_lst[0]

In the code above, both lines use square brackets, but one uses them for list creation and one uses them for indexing. You can differentiate them because with list creation there is nothing between the equal sign and the opening square bracket. On the left side of the equal sign is the variable that the list is being assigned to, and on the right side of the equal sign is the two square brackets with items in the list in between them. On the second line, the square brackets come immediately after a variable name, which tells you that they are indexing into that list variable. Because we have elements inside of ``new_lst``, we can index into it. 
In order to extract an element of the list, we use ``[]``, but we first have to specify which list we are indexing. Additionally, we have to specify what element we want to extract. This index belongs inside of the brackets. 

The code below shows that naming a variable as a list doesn't make it a list.

.. activecode:: ac9_3_3

   lst = [0]            # using [] to create a new list
   n_lst = lst[0]       # using [] to index into a list to retrieve an element

   print(type(lst))
   print(type(n_lst))
   
   print(lst)
   print(n_lst)

Here, we see that the variable ``lst`` is assigned a list with one element, zero. Then, we see another variable called ``n_lst`` gets assigned 
the value associated with the first element of lst. Despite the variable names, only one of the above variables is 
assigned to a list. 

.. mchoice:: question9_3_1
   :multiple_answers:
   :answer_a: w = [a]
   :answer_b: y = a[]
   :answer_c: x = [8]
   :answer_d: t = a[0]
   :feedback_a: No, due to the way the code was written it creates a list. This list would have one element which is the value assigned to the variable a.
   :feedback_b: Though this tries to use indexing, it does not specify what element should be taken from a.
   :feedback_c: No, this is an example of creating a list.
   :feedback_d: Yes, this will using indexing to get the value of the first element of a.
   :correct: d
   :practice: T

   Which of the following correctly uses indexing? Assume that ``a`` is a list or string. Select as many as apply.
