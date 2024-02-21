..  Copyright (C)  Brad Miller, David Ranum, Jeffrey Elkner, Peter Wentworth, Allen B. Downey, Chris
    Meyers, and Dario Mitchell.  Permission is granted to copy, distribute
    and/or modify this document under the terms of the GNU Free Documentation
    License, Version 1.3 or any later version published by the Free Software
    Foundation; with Invariant Sections being Forward, Prefaces, and
    Contributor List, no Front-Cover Texts, and no Back-Cover Texts.  A copy of
    the license is included in the section entitled "GNU Free Documentation
    License".


Function Parameters
-------------------

.. youtube:: Ndw_EgFO_tw
    :divid: goog_function_parms
    :height: 315
    :width: 560
    :align: left

Parameters make functions more powerful because they enable the function to operate with slight variation by passing in pieces of information that the function needs in order to do its work. These values, often
called **arguments** or **actual parameters** or **parameter values**, are passed to the function by the programmer. It is important to note that the programmer who wrote the function may be a different person than the programmer who uses the function. Here is a representation of a function that takes in information through parameters:

.. image:: Figures/blackboxproc.png

This type of diagram is often called a **black-box diagram** because it only states the requirements from the
perspective of the user (well, the programmer, but the programmer who uses the function, who may be different than the
programmer who created the function). The user must know the name of the function and what arguments need to be
passed. The details of how the function works are hidden inside the "black-box".

You have already been making function invocations with parameters. For example, when you write ``len("abc")`` or
``len([3, 9, "hello"])``, len is the name of a function, and the value that you put inside the parentheses, the string
"abc" or the list [3, 9, "hello"], is a parameter value.

When a function has one or more parameters, the names of the parameters appear in the function definition, and the
values to assign to those parameters appear inside the parentheses of the function invocation when you call that function. Let's look at each of
those a little more carefully.

In the definition, the parameter list is sometimes referred to as the **formal parameters** or **parameter names**.
These names can be any valid variable name. If there is more than one, they are separated by commas.

In the function invocation (call), inside the parentheses one value should be provided for each of the parameter names. These
values are separated by commas. The values can be specified either directly, or by any python expression including a
reference to some other variable name.

That can get kind of confusing, so let's start by looking at a function with just one parameter. The revised hello
function personalizes the greeting: the person to greet is specified by the parameter.

.. codelens:: clens8_2_1
   :python: py3

   def hello2(s):
      print("Hello " + s)
      print("Glad to meet you")

   hello2("Iman")
   hello2("Jackie")

First, notice that hello2 has one formal parameter, s. You can tell that because
there is exactly one variable name inside the parentheses on line 1.

Next, notice what happened during Step 2. Control was passed to the function, just like we saw before. But in
addition, the variable s was bound to a value, the string "Iman". When it got to Step 7, for the second invocation of
the function, s was bound to "Jackie".

Function invocations always work that way. The expression inside the parentheses on the line that invokes the function
is evaluated before control is passed to the function. The value is assigned to the corresponding formal parameter.
Then, when the code block inside the function is executing, it can refer to that formal parameter and get its value,
the value that was 'passed into' the function.

.. showeval:: eval8_2_1
   :trace_mode: true

   def hello2(s):
       print("Hello " + s)
       print("Glad to meet you")

   hello2("Nick")
   ~~~~
   {{hello2("Nick")}}{{lookup hello2 name and find it is a function}}
   {{hello2("Nick")}}{{s = "Nick"}} # bind actual parameter to formal parameter
   print("Hello " + {{s}}{{"Nick"}})
   {{print("Hello " + "Nick")     #prints out "hello Nick"}}{{print("Glad to meet you")   #prints out "Glad to meet you"}}
   {{print("Glad to meet you")   #prints out "Glad to meet you"}}{{ # the function is finished}}

To get a feel for that, let's invoke hello2 using some more complicated expressions. Try some of your own, too.

.. activecode:: ac8_2_1

   def hello2(s):
       print("Hello " + s)
       print("Glad to meet you")

   hello2("Iman" + " and Jackie")
   hello2("Class " * 3)

Now let's consider a function with two parameters. This version of hello takes
a parameter that controls how many times the greeting will be printed.

.. codelens:: clens8_2_2
   :python: py3

   def hello3(s, n):
      greeting = "Hello " + s
      print(greeting*n)

   hello3("Wei", 4)
   hello3("", 1)
   hello3("Kitty", 11)

At Step 3 of the execution, in the first invocation of hello3, notice that the variable s is bound
to the value "Wei" and the variable n is bound to the value 4.

That's how function invocations always work. Each of the expressions, separated by commas, that are inside the
parentheses are evaluated to produce values. Then those values are matched up positionally
with the formal parameters. The first parameter name is bound to the first value
provided. The second parameter name is bound to the second value provided. And so on.

Parameter Order and Type
========================

The order of the parameters matters, and so when you are calling a function with multiple parameters, you need to make sure that you specify the values in the correct order, and that you are passing in the right type of value for each parameter. Let's return to the turtle example and add two more parameters to the square function, to specify the line width and color.

.. activecode:: clens8_2_1_1
    :nocodelens:

    import turtle

    def draw_square(tur, size, linewidth, linecolor):
        """Make tur draw a square with side length size."""

        tur.pensize(linewidth)
        tur.pencolor(linecolor)

        for _ in range(4):
            tur.forward(size)
            tur.left(90)

    wn = turtle.Screen()      # Set up the window and its attributes
    alex = turtle.Turtle()    # create alex
    alex.speed(10)            # make alex draw fast

    turn_angle = 15           # store a turn angle

    for _ in range(12):       # loop 12 times to go around in a circle
        alex.right(turn_angle) # turn by 15 degrees
        draw_square(alex, 100, 4, "red")      # Call draw_square with big side, wide pen & red color

        alex.right(turn_angle) # turn by 15 degrees
        draw_square(alex, 50, 2, "blue")      # Call draw_square with small side length, thin pen & blue color

    wn.exitonclick()

Note that now we set the color as part of the call to the draw_square method, and we are drawing the flower petal outlines with different thicknesses. The order of the values in the call match the order of the parameters on line 3.

Let's examine the types of errors that we encounter if we mess up specifying the parameters. In the example below, we accidentally leave off the color parameter on line 24, and we get a TypeError noting that we are missing 1 required argument.  

.. activecode:: clens8_2_1_2
    :nocodelens:

    import turtle

    def draw_square(tur, size, linewidth, linecolor):
        """Make tur draw a square with side length size."""

        tur.pensize(linewidth)
        tur.pencolor(linecolor)

        for _ in range(4):
            tur.forward(size)
            tur.left(90)

    wn = turtle.Screen()      # Set up the window and its attributes
    alex = turtle.Turtle()    # create alex
    alex.speed(10)            # make alex draw fast

    turn_angle = 15           # store a turn angle

    for _ in range(12):       # loop 12 times to go around in a circle
        alex.right(turn_angle) # turn by 15 degrees
        draw_square(alex, 100, 4, "red")      # Call draw_square with big side, wide pen & red color

        alex.right(turn_angle) # turn by 15 degrees
        draw_square(alex, 50, 2)      # Type error caused by forgetting a required parameter
    wn.exitonclick()


In this next example, we swap the order of the middle two parameters on line 24 (side length and line thickness). In this case we get a logic error, the program executes completely, but the output is not what we expect. Instead of a bunch of thin blue squares forming the inner flower petals, we get what looks like a blue circle being drawn over and over again, because we are drawing a square with sides of length 2 and a pen width of 50! 


.. activecode:: clens8_2_1_3
    :nocodelens:

    import turtle

    def draw_square(tur, size, linewidth, linecolor):
        """Make tur draw a square with side length size."""

        tur.pensize(linewidth)
        tur.pencolor(linecolor)

        for _ in range(4):
            tur.forward(size)
            tur.left(90)

    wn = turtle.Screen()      # Set up the window and its attributes
    alex = turtle.Turtle()    # create alex
    alex.speed(10)            # make alex draw fast

    turn_angle = 15           # store a turn angle

    for _ in range(12):       # loop 12 times to go around in a circle
        alex.right(turn_angle) # turn by 15 degrees
        draw_square(alex, 100, 4, "red")      # Call draw_square with big side, wide pen & red color

        alex.right(turn_angle) # turn by 15 degrees
        draw_square(alex, 2, 50, "blue")      # Logic error caused by switching the middle two values
    wn.exitonclick()

It is also possible to have optional parameters, so that if a programmer leaves off a parameter value when calling a function, the code still runs, but we won't cover that in this course.

**Check your understanding**

.. mchoice:: question8_2_1
   :answer_a: def greet(t):
   :answer_b: def greet:
   :answer_c: greet(t, n):
   :answer_d: def greet(t, n)
   :correct: a
   :feedback_a: A function may take zero or more parameters.  In this case it has one.
   :feedback_b: A function needs to specify its parameters in its header. If there are no paramters, put () after the function name.
   :feedback_c: A function definition needs to include the keyword def.
   :feedback_d: A function definition header must end in a colon (:).
   :practice: T

   Which of the following is a valid function header (first line of a function definition)?

.. mchoice:: question8_2_2
   :answer_a: def print_many(x, y):
   :answer_b: print_many
   :answer_c: print_many(x, y)
   :answer_d: Print out string x, y times.
   :correct: b
   :feedback_a: This line is the complete function header (except for the semi-colon) which includes the name as well as several other components.
   :feedback_b: Yes, the name of the function is given after the keyword def and before the list of parameters.
   :feedback_c: This includes the function name and its parameters
   :feedback_d: This is a comment stating what the function does.

   What is the name of the following function?

   .. code-block:: python

     def print_many(x, y):
         """Print out string x, y times."""
         for i in range(y):
             print(x)

.. mchoice:: question8_2_3
   :answer_a: i
   :answer_b: x
   :answer_c: x, y
   :answer_d: x, y, i
   :correct: c
   :feedback_a: i is a variable used inside of the function, but not a parameter, which is passed in to the function.
   :feedback_b: x is only one of the parameters to this function.
   :feedback_c: Yes, the function specifies two parameters: x and y.
   :feedback_d: the parameters include only those variables whose values that the function expects to receive as input. They are specified in the header of the function.

   What are the parameters of the following function?

   .. code-block:: python

     def print_many(x, y):
         """Print out string x, y times."""
         for i in range(y):
             print(x)

.. mchoice:: question8_2_4
   :answer_a: print_many(x, y)
   :answer_b: print_many
   :answer_c: print_many("Greetings")
   :answer_d: print_many("Greetings", 10):
   :answer_e: print_many("Greetings", z)
   :correct: e
   :feedback_a: No, x and y are the names of the formal parameters to this function.  When the function is called, it requires actual values to be passed in.
   :feedback_b: A function call always requires parentheses after the name of the function.
   :feedback_c: This function takes two parameters (arguments)
   :feedback_d: A colon is only required in a function definition.  It will cause an error with a function call.
   :feedback_e: Since z has the value 3, we have passed in two correct values for this function. "Greetings" will be printed 3 times.

   Considering the function below, which of the following statements correctly invokes, or calls, this function (i.e., causes it to run)?

   .. code-block:: python

      def print_many(x, y):
         """Print out string x, y times."""
         for i in range(y):
             print(x)

      z = 3

.. mchoice:: question8_2_5
   :answer_a: True
   :answer_b: False
   :correct: a
   :feedback_a: Yes, you can call a function multiple times by putting the call in a loop.
   :feedback_b: One of the purposes of a function is to allow you to call it more than once. Placing it in a loop allows it to executed multiple times as the body of the loop runs multiple times.

   True or false: A function can be called several times by placing a function call in the body of a for loop.

.. mchoice:: question8_2_6
   :answer_a: Hello
   :answer_b: Goodbye
   :answer_c: s1
   :answer_d: s2
   :correct: b
   :feedback_a: "Hello" is shorter than "Goodbye"
   :feedback_b: "Goodbye" is longer than "Hello"
   :feedback_c: s1 is a variable name; its value would print out, not the variable name.
   :feedback_d: s2 is a variable name; its value would print out, not the variable name.
   :practice: T

   What output will the following code produce?

   .. code-block:: python

      def cyu(s1, s2):
         if len(s1) > len(s2):
            print(s1)
         else:
            print(s2)

      cyu("Hello", "Goodbye")
