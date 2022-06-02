..  Copyright (C)  Brad Miller, David Ranum, Jeffrey Elkner, Peter Wentworth, Allen B. Downey, Chris
    Meyers, and Dario Mitchell.  Permission is granted to copy, distribute
    and/or modify this document under the terms of the GNU Free Documentation
    License, Version 1.3 or any later version published by the Free Software
    Foundation; with Invariant Sections being Forward, Prefaces, and
    Contributor List, no Front-Cover Texts, and no Back-Cover Texts.  A copy of
    the license is included in the section entitled "GNU Free Documentation
    License".

.. qnum::
   :prefix: func-7-
   :start: 1

.. index:: local variable
   variable; local
   lifetime
 
Scope - Local vs Global Variables
---------------------------------

Scope refers to the parts of the program where a variable/object are visible and can be referred to. When you have program
that has no functions, all of the variables are global. But very few real programs in the world work that way. Most programs
are divided up into functions, and global variables are passed around, while inside of functions there are also local variables that are used. 
In this section we will take a look at the differences between local and global variables. 
  
Variable and parameters are local
=================================

.. youtube:: HdFujZpLFVg
    :divid: goog_local_vars
    :height: 315
    :width: 560
    :align: left

 
An assignment statement in a function creates a **local variable** for the variable on the left hand side of the
assignment operator. It is called local because this variable only exists inside the function and you cannot use it
outside. For example, consider again the ``square`` function:
 
.. activecode:: ac9_7_1a

   def square(x):
       y = x * x
       return y
 
   z = square(10)
   print(y)
 

Try running this in CodeLens. When a function is invoked in CodeLens, the local scope is separated from global scope by
a blue box. Variables in the local scope will be placed in the blue box while global variables will stay in the global
frame. If you press the 'last >>' button you will see an error message. When we try to use ``y`` on line 6 (outside the
function) Python looks for a global variable named ``y`` but does not find one. This results in the error:
``Name Error: 'y' is not defined.``
 
The variable ``y`` only exists while the function is being executed --- we call this its **lifetime**. When the
execution of the function terminates (returns), the local variables are destroyed. CodeLens helps you visualize this
because the local variables disappear after the function returns. Go back and step through the statements paying
particular attention to the variables that are created when the function is called. Note when they are subsequently
destroyed as the function returns.
 
Formal parameters are also local and act like local variables. For example, the lifetime of ``x`` begins when
``square`` is called, and its lifetime ends when the function completes its execution.
 
So it is not possible for a function to set some local variable to a value, complete its execution, and then when it
is called again next time, recover the local variable. Each call of the function creates new local variables, and
their lifetimes expire when the function returns to the caller.

Global Variables
================

Variable names that are at the *top-level*, not inside any function definition,
are called global. 

It is legal for a function to access a global variable that isn't passed in as a parameter. However, this is considered
**bad form** by nearly all programmers and should be avoided in most cases. This subsection
includes some examples that illustrate the potential interactions of global and
local variables. These will help you understand exactly how Python works. Hopefully,
they will also convince you that things can get pretty confusing when you mix
local and global variables, and that you really shouldn't do it.  

Look at the following, nonsensical variation of the square function.

.. activecode:: ac9_7_2a

    def badsquare(x):
        y = x ** power
        return y

    power = 2
    result = badsquare(10)
    print(result)

Although the ``badsquare`` function works, it is silly and poorly written. We have done it here to illustrate
an important rule about how variables are looked up in Python.
First, Python looks at the variables that are defined as local variables in
the function.  We call this the **local scope**. If the variable name is not
found in the local scope, then Python looks at the global variables,
or **global scope**. This is exactly the case illustrated in the code above.
``power`` is not found locally in ``badsquare`` but it does exist globally.
The appropriate way to write this function would be to pass power as a parameter.
For practice, you should rewrite the badsquare example to have a second parameter called power.

There is another variation on this theme of local versus global variables. Assignment statements in the local function cannot 
change variables defined outside the function. Consider the following
CodeLens example:

.. codelens::  clens9_7_1a
    :python: py3

    def powerof(x,p):
        power = p   # Another dumb mistake
        y = x ** power
        return y

    power = 3
    result = powerof(10,2)
    print(result)

Now step through the code. What do you notice about the values of variable ``power``
in the local scope compared to the variable ``power`` in the global scope?

The value of ``power`` in the local scope was different than the global scope.
That is because in this example ``power`` was used on the left hand side of the
assignment statement ``power = p``. When a variable name is used on the
left hand side of an assignment statement inside a function, Python creates a local variable.
When a local variable has the same name as a global variable we say that the
local shadows the global. A **shadow** means that the global variable cannot
be accessed by Python because the local variable will be found first. This is
another good reason not to use global variables. As you can see,
it makes your code confusing and difficult to understand.

If you really want to change the value of a global variable inside a function,
you can can do it by explicitly declaring the variable to be global, as in the example
below. Again, you should *not* do this in your code. The example is here only
to cement your understanding of how Python works.

.. codelens::  clens9_7_2a
    :python: py3

    def powerof(x,p):
        global power  # a really... 
        power = p     # ...bad idea, but valid code
        y = x ** power
        return y

    power = 3
    result = powerof(10,2)
    print(result)
    print(power)

To cement all of these ideas even further let's look at one final example.
Inside the ``square`` function we are going to make an assignment to the
parameter ``x``  There's no good reason to do this other than to emphasize
the fact that the parameter ``x`` is a local variable.  If you step through
the example in CodeLens you will see that although ``x`` is 0 in the local
variables for ``square``, the ``x`` in the global scope remains 2.  This is confusing
to many beginning programmers who think that an assignment to a
formal parameter will cause a change to the value of the variable that was
used as the actual parameter, especially when the two share the same name.
But this example demonstrates that that is clearly not how Python operates.

.. codelens:: clens9_7_3a
    :python: py3

    def square(x):
        y = x * x
        x = 0       # assign a new value to the parameter x
        return y

    x = 2
    z = square(x)
    print(z)
 
**Check Your Understanding**
 
.. mchoice:: question9_7_1a
   :answer_a: True
   :answer_b: False
   :correct: b
   :feedback_a: Local variables cannot be referenced outside of the function they were defined in.
   :feedback_b: Local variables cannot be referenced outside of the function they were defined in.
   :practice: T
 
   True or False: Local variables can be referenced outside of the function they were defined in.

.. fillintheblank:: question9_7_2a
 
   Which of the following are local variables? Please, write them in order of what line they are on in the code.

   .. sourcecode:: python
 
    numbers = [1, 12, 13, 4]
    def foo(bar):
        aug = str(bar) + "street"
        return aug

    for item in numbers:
        print(foo(item))


   The local variables are

   -  :bar: Good work!
      :aug: While aug is a local variable, it is not the first one in the code.
      :item: item is not a local variable.
      :.*: Incorrect, try again.
   -  :aug: Good work!
      :bar: While bar is a local variable, it is not the first one in the code.
      :item: item is not a local variable.
      :.*: Incorrect, try again.
 
.. mchoice:: question9_7_3a
   :answer_a: 4
   :answer_b: 6
   :answer_c: 10
   :answer_d: Code will give an error because x and z do not match.
   :correct: a
   :feedback_a: Correct, the output is right because the subtract function takes in x as the global variable for the z parameter and puts it into the function. The subtract function uses the local variable y for its return.
   :feedback_b: Incorrect, look again at what is being produced in the subtract function.
   :feedback_c: Incorrect, look again at what is being produced in the subtract function.
   :feedback_d: Incorrect, there shouldn't be any error.
   :practice: T
 
   What would be the result of running the following code?
 
   .. sourcecode:: python
 
     x = 3 * 2
     y = 1

     def subtract(z):
         y = 10
         return y - z
         
     print(subtract(x)) 
 
.. mchoice:: question9_7_4a
   :answer_a: 33
   :answer_b: 12
   :answer_c: There is an error in the code.
   :correct: c
   :feedback_a: Incorrect, look again at what is happening in producing.
   :feedback_b: Incorrect, look again at what is happening in producing.
   :feedback_c: Yes! There is an error because we reference y in the producing function, but it was defined in adding. Because y is a local variable, we can't use it in both functions without initializing it in both. If we initialized y as 3 in both though, the answer would be 33.
   :practice: T
 
   What would be the result of running the following code?
 
   .. sourcecode:: python
 
     def adding(x):
         y = 3
         z = y + x + x
         return z
 
     def producing(x):
         z = x * y
         return z
 
     print(producing(adding(4)))
 
.. mchoice:: question9_7_5a
   :answer_a: 1
   :answer_b: 9
   :answer_c: 10
   :answer_d: Error, local variable 'x' is referenced before assignment.
   :correct: d 
   :feedback_a: Incorrect, pay attention to the local scope in the function.
   :feedback_b: Incorrect, pay attention to the local scope in the function.
   :feedback_c: Incorrect, pay attention to the local scope in the function.
   :feedback_d: This code gives an error because the local variable 'x' was referenced in the local scope before it was assigned a value.  
     
   What would be the result of running the following code?
 
   .. sourcecode:: python
 
     x = 9
 
     def adding():
         x+=1
         print(x)
    
     adding()


.. mchoice:: question9_7_6a
   :answer_a: Its value
   :answer_b: The range of statements in the code where a variable can be accessed.
   :answer_c: Its name
   :correct: b
   :feedback_a: Value is the contents of the variable.  Scope concerns where the variable is &quot;known&quot;.
   :feedback_b: Correct.
   :feedback_c: The name of a variable is just an identifier or alias.  Scope concerns where the variable is &quot;known&quot;.

   What is a variable's scope?

.. mchoice:: question9_7_7a
   :answer_a: A temporary variable that is only used inside a function
   :answer_b: The same as a parameter
   :answer_c: Another name for any variable
   :correct: a
   :feedback_a: Yes, a local variable is a temporary variable that is only known (only exists) in the function it is defined in.
   :feedback_b: While parameters may be considered local variables, functions may also define and use additional local variables.
   :feedback_c: Variables that are used outside a function are not local, but rather global variables.

   What is a local variable?

.. mchoice:: question9_7_8a
   :answer_a: Yes, and there is no reason not to.
   :answer_b: Yes, but it is considered bad form.
   :answer_c: No, it will cause an error.
   :correct: b
   :feedback_a: While there is no problem as far as Python is concerned, it is generally considered bad style because of the potential for the programmer to get confused.
   :feedback_b: it is generally considered bad style because of the potential for the programmer to get confused.  If you must use global variables (also generally bad form) make sure they have unique names.
   :feedback_c: Python manages global and local scope separately and has clear rules for how to handle variables with the same name in different scopes, so this will not cause a Python error.

   Can you use the same name for a local variable as a global variable?
   
