..  Copyright (C)  Brad Miller, David Ranum, Jeffrey Elkner, Peter Wentworth, Allen B. Downey, Chris
    Meyers, and Dario Mitchell.  Permission is granted to copy, distribute
    and/or modify this document under the terms of the GNU Free Documentation
    License, Version 1.3 or any later version published by the Free Software
    Foundation; with Invariant Sections being Forward, Prefaces, and
    Contributor List, no Front-Cover Texts, and no Back-Cover Texts.  A copy of
    the license is included in the section entitled "GNU Free Documentation
    License".

Strings, Lists and Tuples
=========================

Throughout the first chapters of this book we have used strings to represent words or phrases that we
wanted to print out. Our definition was simple: a string is simply some characters inside quotes. A string is like a list, but it can't hold different types of objects like a list can - a string can only hold some number of characters.
In Chapter 5, when we introduced for loops, we introduced the index operator to access individual characters of a string while iterating over a string and we introduced lists of items that we can iterate over as well.
In this chapter, we explore strings and lists in much more detail. 

Strings
-------

.. youtube:: T435lvYXE_w
    :divid: stringintro
    :height: 315
    :width: 560
    :align: left

Strings can be defined as sequential collections of characters.  This means that the individual
characters that make up a string are in a particular order from left to right.

A string that contains no characters, often referred to as the **empty string**, is still considered
to be a string. It is simply a sequence of zero characters and is represented by '' or "" (two single
or two double quotes with nothing in between).

Lists
-----

.. youtube:: mrwSbE5MDn0
    :divid: listintro
    :height: 315
    :width: 560
    :align: left


A **list** is a sequential collection of Python data values, where each value is identified by an
index. The values that make up a list are called its **elements**. Lists are similar to strings, which
are ordered collections of characters, except that the elements of a list can have any type and for
any one list, the items can be of different types.

There are several ways to create a new list.  The simplest is to enclose the
elements in square brackets ( ``[`` and ``]``).

.. sourcecode:: python

    list_of_nums = [10, 20, 30, 40]
    bird_list = ["parrot", "dove", "swallow"]

The first example is a list of four integers. The second is a list of three
strings. As we said above, the elements of a list don't have to be the same type.  The following
list contains a string, a float, an integer, and
another list.

.. sourcecode:: python

    list_of_things = ["hello", 2.0, 5, [10, 20]]


.. note:: WP: Don't Mix Types!

    You'll likely see us do this in the textbook to give you odd combinations, but when you create lists you
    should generally not mix types together. A list of just strings or just integers or just floats is generally
    easier to deal with.

Tuples
------

A **tuple**, like a list, is a sequence of items of any type. The printed representation of a tuple is a comma-separated
sequence of values, enclosed in parentheses. In other words, the representation is just like lists, except with
parentheses () instead of square brackets [].

One way to create a tuple is to write an expression, enclosed in parentheses,
that consists of multiple other expressions, separated by commas.

.. sourcecode:: python

    julia = ("Julia", "Roberts", 1967, "Duplicity", 2009, "Actress", "Atlanta, Georgia")

The key difference between lists and tuples is that a tuple is **immutable**, meaning that its contents can't be changed after the tuple is
created. So, once a tuple is created, it's not possible to add another value to it, to remove a value from it, or replace any of the values in the tuple. 

.. We will examine the mutability of lists in detail in the chapter on :ref:`Mutability <mutability>`.

To create a tuple with a single element (but you're probably not likely to do that too often), you have to include a comma after the item, because without that comma, Python treats the item as a string, float or integer. For example, in the code below, Python treats ``(5)`` as an integer in parentheses, but treats ``(5,)`` as a tuple:

.. activecode:: ac9_2_1

    t = (5,)
    print(type(t))

    x = (5)
    print(type(x))

You might wonder why anyone would create a tuple - what's the point of data that can't be changed? Tuples are often used for exactly that purpose - to create data that can't be accidentally tampered with. For really important information, it may be criticial to be able to verify that data was not edited after it was entered/created.


Index Operator: Accessing Elements of a String, List or Tuple
-------------------------------------------------------------

In Chapter 5, we introduced the index operator and how it is used to access elements of a string or list. We review this briefly here - the index operator applies to tuples in the same way.

We use the index operator ( ``[]``) to access an individual element of a string, list, or tuple.  The expression inside the brackets specifies
the index and must evaluate to an integer (the 3.75th element of a list doesn't make any sense!). Remember that indices start at 0. Any integer expression can be used
as an index and a negative index value will locate items from the right instead
of from the left.

While we are taught as children to count from 1, in most programming languages we count/index from zero. This means that when we talk about the first item, we need to remember that is at index 0, and when we talk about the second item, it is at index 1. The nth character and the character AT INDEX n are different then:  The nth character is at index n-1.  Make sure you are clear on what you mean! If you find indexing from zero weird, it might help to think about the index as **the offset from the first position** in the list, tuple, or string. So if we declare a string variable like this: ``greeting = "hello"``, the letter 'e' is offset by 1 from the first character and we access the 'e' by using ``greeting[1]``. 

Adding and Removing Items from Lists
------------------------------------

A different way to build a list is to add items to it one at a time using the append method, like this:

.. activecode:: ac9_2_5_1

    import random

    my_list = []  # start a new, empty list
    for _ in range(20):
        my_list.append(random.randrange(200, 800))

    print(my_list)
    
You can also use append to add more items to an existing list. New items are added on to the end of the list:

.. activecode:: ac9_2_5_2

    import random

    my_list = []  # start a new, empty list
    for _ in range(20):
        my_list.append(random.randrange(200, 800))

    print(my_list)
    my_list.append(550)
    my_list.append(378)
    print(my_list)

You can remove items from a list using the remove() method, but you have to make sure the item is in the list before you remove it, otherwise you will get an error:

.. activecode:: ac9_2_5_3

   days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
   print(days)
   if "Monday" in days:
        days.remove("Monday")

   print(days)

   days.remove("Saturday") # ERROR!

Note that if the item you want to remove is in the list multiple times, the remove method will only remove the first instance of the item:

.. activecode:: ac9_2_5_4

   nums = [6, 4, 7, 1, 4, 9, 5, 4, 2, 3]
   print(nums)

   if 4 in nums:
        nums.remove(4)

   print(nums)

There is one other useful method on lists: pop(). Pop removes an item from the end of a list (if you want that item, you need to capture it into a return variable). For example:

.. activecode:: ac9_2_5_5

   import random 

   my_list = []  # create empty list to start
   for _ in range(5):
       my_list.append(random.randrange(20, 70))
       print(my_list)

   # now remove a few items
   print(my_list.pop())
   print(my_list)

   item = my_list.pop()   # save the item popped off the list into a variable
   print(item)
   print(my_list)

It is important to remember that append(), pop(), and remove() only apply to lists, because only lists can be changed. You cannot call append() or remove() or pop() on a tuple or on a string.

**Check your understanding**

.. mchoice:: question9_2_1
   :answer_a: False
   :answer_b: True
   :correct: a
   :feedback_a: Yes, unlike strings, lists can consist of any type of Python data.
   :feedback_b: Lists are heterogeneous, meaning they can have different types of data.
   :practice: T

   A list can only contain integer items.
