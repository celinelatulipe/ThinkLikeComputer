..  Copyright (C)  Brad Miller, David Ranum, Jeffrey Elkner, Peter Wentworth, Allen B. Downey, Chris
    Meyers, and Dario Mitchell.  Permission is granted to copy, distribute
    and/or modify this document under the terms of the GNU Free Documentation
    License, Version 1.3 or any later version published by the Free Software
    Foundation; with Invariant Sections being Forward, Prefaces, and
    Contributor List, no Front-Cover Texts, and no Back-Cover Texts.  A copy of
    the license is included in the section entitled "GNU Free Documentation
    License".

.. index::
   single: +; list concatenation


Concatenation and Repetition
============================


Concatenation
-------------

As with strings, the ``+`` operator concatenates lists and tuples.  

.. activecode:: ac9_6_1

    fruit1 = ["apple","orange","banana","cherry"]
    fruit2 = ["kiwi", "pineapple", "mango", "strawberry", "blueberry", "rhubarb"]
    veggies1 = ("carrot", "potato", "bean", "pea", "spinach", "broccoli")
    veggies2 = ("celery", "onion", "cauliflower", "bok choy", "tomato", "pepper")
    all_fruit = fruit1 + fruit2
    print(all_fruit)
    print(fruit1)
    all_veg = veggies1 + veggies2
    print(all_veg)
    print(veggies2)

It is important to see that these operators create new lists/tuples from the elements of the operand lists/tuples.  
If you concatenate a list with 2 items and a list with 4 items, you will get a new list with 6 items 
(not a list with two sublists). 

One way for us to make this more clear is to run a part of this example in CodeLens.  
As you step through the code, you will see the variables being created and the lists that they refer to. 
Pay particular attention to the fact that when ``newlist`` is created by the statement 
``newlist = fruit + numlist``, it refers to a completely new list formed by making copies of the items from ``fruit`` and ``numlist``.  You can see this very clearly in the CodeLens object diagram.  The objects are different.

.. codelens:: ac9_6_2
    :python: py3

    fruit = ["apple","orange","banana","cherry"]
    numlist = [6,7]

    newlist = fruit + numlist


.. note:: WP: Adding types together

    Beware when adding different types together! Python doesn't understand how to concatenate different
    types together. Thus, if we try to add a string to a list with ``['first'] + "second"`` then the 
    interpreter will return an error. To do this you'll need to make the two objects the same type. In this
    case, it means putting the string into its own list and then adding the two together like so: 
    ``['first'] + ["second"]``. This process will look different for other types though. Remember that there
    are functions to convert types!


The following code won't run, because the third line attempts to add two different types (a list and a tuple). Run it to see the error. 

.. activecode:: ac9_6_3

    fruit1 = ["apple","orange","banana","cherry"]
    veggies1 = ("carrot", "potato", "bean", "pea", "spinach", "broccoli")
    produce_basket = fruit1 + veggies1
    print(produce_basket)

Fix the error above by converting veggies1 to a list in the expression on line 3: ``list(veggies1)``

Repetition
----------

Similarly, the ``*`` operator repeats the items in a list or tuple a given number of times.  So, repetition of a list of 2 items 4 times will give a list 
with 8 items.


.. activecode:: ac9_6_4

    fruit1 = ["apple","orange","banana","cherry"]
    veggies1 = ("carrot", "potato", "bean", "pea", "spinach", "broccoli")
    many_fruit = fruit1 * 3
    print("Many fruits: ", many_fruit)
    print(fruit1) # doesn't change original list!
    many_veg = veggies1 * 4
    print("Many veggies:", many_veg)
    print(veggies1) # doesn't change original tuple!

As with concatenation, these operations do not have any effect on the input lists/tuples, they create new lists. You can reassign the new list back to the same variable name though: 

.. activecode:: ac9_6_5

    fruit1 = ["apple","orange","banana","cherry"]
    print(fruit1)
    fruit1 = fruit1 * 3
    print(fruit1)



**Check your understanding**

.. mchoice:: question5_7_1
   :answer_a: 6
   :answer_b: [1,2,3,4,5,6]
   :answer_c: [1,3,5,2,4,6]
   :answer_d: [3,7,11]
   :correct: c
   :feedback_a: Concatenation does not add the lengths of the lists.
   :feedback_b: Concatenation does not reorder the items. 
   :feedback_c: Yes, a new list with all the items of the first list followed by all those from the second.
   :feedback_d: Concatenation does not add the individual items.
   :practice: T

   What is printed by the following statements?
   
   .. code-block:: python

     alist = [1,3,5]
     blist = [2,4,6]
     print(alist + blist)

.. mchoice:: question5_7_2
   :answer_a: 9
   :answer_b: [1,1,1,3,3,3,5,5,5]
   :answer_c: [1,3,5,1,3,5,1,3,5]
   :answer_d: [3,9,15]
   :correct: c
   :feedback_a: Repetition does not multiply the lengths of the lists.  It repeats the items.
   :feedback_b: Repetition does not repeat each item individually.
   :feedback_c: Yes, the items of the list are repeated 3 times, one after another.
   :feedback_d: Repetition does not multiply the individual items.
   :practice: T

   What is printed by the following statements?
   
   .. code-block:: python

     alist = [1,3,5]
     print(alist * 3)
