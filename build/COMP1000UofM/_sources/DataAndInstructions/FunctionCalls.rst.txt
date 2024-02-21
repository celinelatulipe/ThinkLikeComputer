..  Copyright (C)  Brad Miller, David Ranum, Jeffrey Elkner, Peter Wentworth, Allen B. Downey, Chris
    Meyers, and Dario Mitchell.  Permission is granted to copy, distribute
    and/or modify this document under the terms of the GNU Free Documentation
    License, Version 1.3 or any later version published by the Free Software
    Foundation; with Invariant Sections being Forward, Prefaces, and
    Contributor List, no Front-Cover Texts, and no Back-Cover Texts.  A copy of
    the license is included in the section entitled "GNU Free Documentation
    License".

.. qnum::
   :prefix: 2-4-
   :start: 1

Function Calls
--------------

The Python interpreter can compute new values with function calls. You are familiar with the idea of functions from high school algebra. There you might define a function ``f`` by specifying how it transforms an input into an output, ``f(x) = 3x + 2``. Then, you might write ``f(5)`` and expect to get the value 17.

Python adopts a similar syntax for invoking functions. If there is a named function ``foo`` that takes a single input, we can invoke foo on the value 5 by writing ``foo(5)``.

There are many built-in functions available in Python. You'll be seeing some in this chapter and the next couple of chapters.

Functions are like factories that take in some material, do some operation, and then send out the resulting object.

.. image:: Figures/function_object.png
   :alt: Icon that represents a function. Appears simliar to a factory with three places on top for inputs to come in and a place on the bottom for the output/return value to come out.

In this case, we refer to the materials as arguments or inputs and the resulting object is referred to as output or return value. This process of taking input, doing something, and then sending back the output is demonstrated in the gif below.

.. image:: Figures/function_calls.gif
   :alt: Animated gif that deomnstrates using the visual representation of a factory as used above. Shows three arrows coming into the function to represent that input or arguments that a function can require. It then shows the function object shaking, representing an action being completed by the function. Then it shows annother arrow leaving the function image, which represents a return value or output coming from the factory.

.. note::

    The output of a function is a Python value and we can never really see the internal representation of a value. But we can draw pictures to help us imagine what values are, or we can print them to see an external representation in the console.

    You have already used a function: ``print``. The ``print`` function causes things to appear in the console.

It is also possible for programmers to define new functions in their programs. You will learn how to do that later in the course. For now, you just need to learn how to invoke, or call, a function, and understand that the execution of the function returns a computed value.

.. activecode:: ac2_4_1
   :nocanvas:
   :hidecode:

   def square(x):
      return x * x

   def sub(x, y):
      return x - y

We've defined two functions above. The code is hidden so as not to bother you (yet) with how functions are defined.
``square`` takes a single input parameter, and returns that input multiplied by itself. ``sub`` takes two input
parameters and returns the result of subtracting the second from the first. Obviously, these functions are not
particularly useful, since we have the operators ``*`` and ``-`` available. But they illustrate how functions work.
The visual below illustrates how the ``square`` function works.

.. image:: Figures/square_function.gif
   :alt: a visual of the square function. Four is provided as the input, the function object shakes, and then sixteen comes out from the bottom of the function object.

.. activecode:: ac2_4_2
   :include: ac2_4_1
   :nocanvas:


   print(square(3))
   square(5)
   print(sub(6, 4))
   print(sub(5, 9))


Notice that when a function takes more than one input parameter, the inputs are separated by a comma. Also notice
that the order of the inputs matters. The value before the comma is treated as the first input, the value after it
as the second input.

Again, remember that when Python performs computations, the results are only shown in the console if there's a
print statement that says to do that. In the activecode window above, ``square(5)`` produces the value 25 but we never
get to see that in the console, because it is not printed.

Function calls as part of complex expressions
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Anywhere in an expression that you can write a literal like a number, you can also write a function call that
produces a number.

For example:

.. activecode:: ac2_4_3
   :include: ac2_4_1
   :nocanvas:


   print(square(3) + 2)
   print(sub(square(3), square(1+1)))


Let's take a look at how that last execution unfolds. Press the **Next Step** button below a few times to watch how these two lines of code get evaluated.

.. showeval:: se_ac2_4_1a
   :trace_mode: true

   Notice that we always have to resolve the expression inside the innermost parentheses first, in order to determine what input to provide when calling the functions.
   ~~~~
   print(sub({{square(3)}}{{9}}, square(1+1)))
   print(sub(9, square({{1+1}}{{2}})))
   print(sub(9, {{square(2)}}{{4}}))
   print({{sub(9, 4)}}{{5}})


Parentheses invoke functions
~~~~~~~~~~~~~~~~~~~~~~~~~~~~


Just typing the name of the function refers to the function as an object, as in the first line in the example below. Typing the name of the function followed by
parentheses ``()`` invokes (calls) the function. Of course, you have to put any input values that the function needs inside the parentheses. 

.. activecode:: ac2_4_4
   :include: ac2_4_1
   :nocanvas:


   print(square)
   print(square(3))

In the second line of the example above, the square function is called with the input ``3``. The square function evaluates the input and retunrs the value ``9``. The value ``9`` is then passed as the input to the print function. The print function displays ``9`` on the console. 
