..  Copyright (C)  Brad Miller, David Ranum, Jeffrey Elkner, Peter Wentworth, Allen B. Downey, Chris
    Meyers, and Dario Mitchell.  Permission is granted to copy, distribute
    and/or modify this document under the terms of the GNU Free Documentation
    License, Version 1.3 or any later version published by the Free Software
    Foundation; with Invariant Sections being Forward, Prefaces, and
    Contributor List, no Front-Cover Texts, and no Back-Cover Texts.  A copy of
    the license is included in the section entitled "GNU Free Documentation
    License".

.. qnum::
   :prefix: func-12-
   :start: 1

Passing Mutable vs Immuatable Objects
-------------------------------------

Now that you have a deeper understanding of sequences, we need to revisit functions and parameters. In this section, we look at what happens when we pass mutable lists vs. unmutable tuples and strings to functions. 

Take a look at the following code example. Can you predict what is printed out?

.. activecode:: ac10_9_1
   
   def double(y):
       y = 2 * y
   
   num = 5
   double(num)
   print(num)

Use **Show CodeLens** to step through the code to see why the assignment to the formal parameter ``y``
inside the ``double`` function on (line 2) did not affect the global variable ``num``. An assignment to a formal parameter inside a function **never**
affects the argument in the caller.

Passing Lists
=============

On the other hand, if you are passing a mutable object, such as a list, to a function, and the function alters the
object's state, that state change will be visible globally when the function returns. Take a look at the following
example, where a list is passed in to a function. 

.. activecode:: ac10_9_2
     
   def changeit(lst):
       lst[0] = "Manitoba"
       lst[1] = "Bisons"
      
   mylst = ['our', 'students', 'are', 'awesome']
   changeit(mylst)
   print(mylst)

Try stepping through this in codelens to see what happens. The state of the list referenced by ``lst`` is altered
by ``changeit``, and since ``lst`` is an alias for ``mylst``, ``mylst`` is affected by the actions taken by the function.

Look closely at this line::

    lst[0] = "Manitoba"

That statement modifies the state of ``lst`` by changing the value in slot 0. Although that line may appear to contradict the
statement above that "an assignment to a formal parameter inside a function never affects the argument in the caller,"
note that there is a difference between assigning to a *slot* of a list, and assigning to the list variable itself.
To see that difference, try changing that line to the following::

    lst = ["Manitoba", "Bisons"]

Then, run again. This time, ``mylist`` is not altered. To understand why, use CodeLens to step carefully through the code
and observe how the assignment to ``lst`` causes it to refer to a separate list.

Take a moment to experiment some more with the ``changeit`` function. Change the body of the function to the following:

    lst.append("Manitoba Bisons")

Step through using CodeLens. You should see that ``mylst`` is affected by this change, since the state of the list is altered.

Then, try again with this as the body::

    lst = lst + ["Manitoba Bisons"]

Step through using CodeLens. Here, we create a new list using the concatenation operator, and ``mylst`` is not affected by the change.


Understanding the techniques that functions can and cannot use to alter the state of mutable parameters is important.
You may want to take some time to study the information on this page more thoroughly and play with the examples until
you feel confident about your grasp of the material.

Passing Tuples
==============

Tuples are just like lists, except they are not mutable. If you pass a tuple into a function and that function tries to modify the contents of it, an error will be thrown. Consider this example:

.. activecode:: ac10_9_3
     
   def changeit(lst):
       lst[0] = "Manitoba"  #this will throw an error if lst points to a tuple!
       lst[1] = "Bisons"
      
   mytuple = ('our', 'students', 'are', 'awesome')
   changeit(mytuple)  # sending a tuple to this method is going to cause an error in the method
   print(mytuple)

If you want this to work, you need to convert the tuple into a list, and then store a returned list:

.. activecode:: ac10_9_4
     
   def changeit(lst):
       lst[0] = "Manitoba"  #this will throw an error if lst points to a tuple!
       lst[1] = "Bisons"
       return lst
      
   mytuple = ('our', 'students', 'are', 'awesome')
   modified_list = changeit(list(mytuple))  # sending a tuple to this method is going to cause an error in the method
   print(mytuple)
   print(modified_list)


Ethics & Data Protection
========================

We most often use lists for storing data, because we often want the flexibility of being able to edit and change information. However, sometimes there is important data (private personal data, health data, salaries, etc.) that needs to be protected from tampering. As a programmer, if you need to share data but you want to ensure the data isn't tampered with, you can send the data as a tuple. This allows a function to make use of the data, but not change it. Consider this example, which makes use of the accumulator pattern, reading from a tuple, but not modifying it:

.. activecode:: ac10_9_5
     
   def avg_salaries(lst):
       sum = 0;
       count = 0;   
       for item in lst:
           sum += item
           count += 1

       return sum/count

   company_salaries = (45376, 27995, 102345, 160300, 86900, 49354, 68451)
   avg_sal = avg_salaries(company_salaries)  
   print(avg_sal)

The avg_salaries function could take a list or a tuple. By passing in a tuple, the programmer ensures the data is not modified. In this case, where the function is in the same file, it's obvious that the list isn't modified inside the function. But often you import modules and use functions that other people have written. As a programmer, you need to ensure that any private data you are responsible for isn't modified inappropriately, and you can do this by using safe structures like tuples.


**Check Your Understanding**

.. mchoice:: mutobj-q1a

    What is the output of the following code fragment?

    .. sourcecode:: python

        def myfun(lst):
            lst = [1, 2, 3]

        mylist = ['a', 'b']
        myfun(mylist)
        print(mylist)

    - ['a', 'b']

      + Correct! ``mylist`` is not changed by the assignment in ``myfun``.

    - [1, 2, 3]

      - Incorrect. ``mylist`` is not changed by the assignment in ``myfun``.

.. mchoice:: mutobj-q2a

    What is the output of the following code fragment?

    .. sourcecode:: python

        def myfun(lst):
            del lst[0]

        mylist = ['a', 'b']
        myfun(mylist)
        print(mylist)

    - ['a', 'b']

      - Incorrect. ``myfun`` alters the state of the list object by removing the value at slot 0.

    - ['b']

      + Correct! ``myfun`` alters the state of the list object by removing the value at slot 0.
