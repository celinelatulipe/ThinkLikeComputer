..  Copyright (C)  Brad Miller, David Ranum, Jeffrey Elkner, Peter Wentworth, Allen B. Downey, Chris
    Meyers, and Dario Mitchell.  Permission is granted to copy, distribute
    and/or modify this document under the terms of the GNU Free Documentation
    License, Version 1.3 or any later version published by the Free Software
    Foundation; with Invariant Sections being Forward, Prefaces, and
    Contributor List, no Front-Cover Texts, and no Back-Cover Texts.  A copy of
    the license is included in the section entitled "GNU Free Documentation
    License".

.. qnum::
   :prefix: 2-6-
   :start: 1

Type conversion functions
-------------------------

Sometimes it is necessary to convert values from one type to another.  Python provides
a few simple functions that will allow us to do that.  The functions ``int``, ``float`` and ``str``
will (attempt to) convert their arguments into types ``int``, ``float`` and ``str``
respectively.  We call these **type conversion** functions.

The ``int`` function can take a floating point number or a string, and turn it
into an int. For floating point numbers, it *discards* the decimal portion of
the number - a process we call *truncation towards zero* on the number line.
Let us see this in action:

.. activecode:: ac2_6_1
    :nocanvas:

    print(3.14, int(3.14))
    print(3.9999, int(3.9999))       # This doesn't round to the closest int!
    print(3.0, int(3.0))
    print(-3.999, int(-3.999))        # Note that the result is closer to zero

    print("2345", int("2345"))        # parse a string to produce an int
    print(17, int(17))                # int even works on integers
    print(int("23bottles"))


The last case shows that a string has to be a syntactically legal number,
otherwise you'll get one of those pesky runtime errors.  Modify the example by deleting the
``bottles`` and rerun the program.  You should see the integer ``23``.

The type converter ``float`` can turn an integer, or a syntactically
legal string, into a float.

.. activecode:: ac2_6_2
    :nocanvas:

    print(float("123.45"))
    print(type(float("123.45")))


The type converter ``str`` turns its argument into a string.  Remember that when we print a string, the
quotes are removed in the output window.  However, if we print the type, we can see that it is definitely ``str``.

.. activecode:: ac2_6_3
    :nocanvas:

    print(str(17))
    print(str(123.45))
    print(type(str(123.45)))

One common operation where you might need to do a type conversion is when you are concatenating several strings together but want to include a numeric value as part of the final string. Because we can't concatenate a string with an integer or floating point number, we will often have to convert numbers to strings before concatenating them.

.. image:: Figures/type_cast.gif
   :alt: a variable stores the value 55. a print statement tries to print "the value is" concatenated with the integer, but a runtime error occurs. Solution is to convert the integer into a string so that it can be concatenated.

**Check your understanding**

.. mchoice:: question2_6_1
   :answer_a: Nothing is printed. It generates a runtime error.
   :answer_b: 53
   :answer_c: 54
   :answer_d: 53.785
   :correct: b
   :feedback_a: The statement is valid Python code.  It calls the int function on 53.785 and then prints the value that is returned.
   :feedback_b: The int function truncates all values after the decimal and prints the integer value.
   :feedback_c: When converting to an integer, the int function does not round.
   :feedback_d: The int function removes the fractional part of 53.785 and returns an integer, which is then printed.
   :practice: T

   What value is printed when the following statement executes?

   .. code-block:: python

      print(int(53.785))
