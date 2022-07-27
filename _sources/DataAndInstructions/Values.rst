..  Copyright (C)  Brad Miller, David Ranum, Jeffrey Elkner, Peter Wentworth, Allen B. Downey, Chris
    Meyers, and Dario Mitchell.  Permission is granted to copy, distribute
    and/or modify this document under the terms of the GNU Free Documentation
    License, Version 1.3 or any later version published by the Free Software
    Foundation; with Invariant Sections being Forward, Prefaces, and
    Contributor List, no Front-Cover Texts, and no Back-Cover Texts.  A copy of
    the license is included in the section entitled "GNU Free Documentation
    License".

.. qnum::
   :prefix: 2-2-
   :start: 1

Values and Data Types
---------------------

A **value** is one of the fundamental things --- like a word or a number --- that a program manipulates. 
Some values are ``5`` (the result when we add ``2 + 3``), and ``"Hello, World!"``. These objects are classified into 
different classes, or data types: 5 is an integer, and "Hello, World!" is a string, so-called because it contains a 
string or sequence of letters. You (and the Python interpreter) can identify strings because they are enclosed in quotation
marks.

We can specify values directly in the programs we write. For example we can specify a number as a **literal** just by (literally) typing it directly into the program (e.g., ``5`` or ``4.32``). In a program, we specify a word, or more generally a string of characters, by enclosing the characters inside quotation marks (e.g., ``"Hello, World!"``).

During execution of a program, the Python interpreter creates an internal representation of any literals that have been specified in that program. It can then manipulate them, for example by multiplying two numbers. We call the internal representations **objects** or just **values**.

You can't directly see the internal representations of values. You can, however, use the ``print`` function to see a printed representation in the console.

The printed representation of a number uses the familiar decimal representation (reading `Roman Numerals <http://en.wikipedia.org/wiki/Roman_numerals>`_ is a fun challenge in museums, but thank goodness the Python interpreter doesn't present the number 2014 as MMXIV in the output window). Thus, the printed representation of a number shown in the console is the same as the literal that you specify in a program.

The printed representation of a character string, however, is not exactly the same as the literal used to specify the string in a program. For the literal in a program, you enclose the string in quotation marks. The printed representation, in the console, omits the quotation marks.

.. activecode:: ac_print_literal_values
    :nocanvas:

    print(3.2)
    print("Hello, World!")

.. .. note::
   **Literals** appear in programs. The Python interpreter turns literals into **values**, which have internal representations that people never get to see directly.  **Outputs** are external representations of values that appear in the console. When we are being careful, we will use the terms this way. Sometimes, however, we will get a little sloppy and refer to literals or external representations as values.

Numbers with a decimal point belong to a class
called **float**, because these numbers are represented in a format called
*floating-point*.  At this stage, you can treat the words *class* and *type*
interchangeably.  You will gain a deeper understanding of what a class
is in later Computer Science courses.

You will soon encounter other types of objects as well, such as lists. Each of these has its own special representation for specifying an object as a literal in a program, and for displaying an object when you print it to the console. For example, list contents are enclosed in square brackets ``[ ]``. 

**Check your understanding**

.. mchoice:: question2_2_1
   :answer_a: Nothing is printed. It generates a runtime error.
   :answer_b: "Hello World!"
   :answer_c: Hello World!
   :correct: c
   :feedback_a: "Hello World!" has a printed representation, so there will not be an error.
   :feedback_b: The literal in the program includes the quote marks, but the printed representation omits them.
   :feedback_c: The printed representation omits the quote marks that are included in the string literal.
   :practice: T

   What appears in the console when the following statement executes?

   .. code-block:: python

      print("Hello World!")
      
.. mchoice:: question2_2_2
   :answer_a: String
   :answer_b: Integer
   :answer_c: Number
   :correct: a
   :feedback_a: Yes, because it is enclosed in quotation marks, it is a string.
   :feedback_b: No, it is enclosed in quotation marks
   :feedback_c: No, even though these letters spell out a number word, Python will not see this as a number
   :practice: T

   What is the data type of the literal in the program below?

   .. code-block:: python

      print("Twenty")

.. mchoice:: question2_2_3
   :answer_a: String
   :answer_b: Integer
   :answer_c: Number
   :correct: a
   :feedback_a: Yes, because it is enclosed in quotation marks, it is a string.
   :feedback_b: No, it is enclosed in quotation marks
   :feedback_c: No, even though this is numerals, Python will not see this as a number because it is enclosed in quotation marks
   :practice: T

   What is the data type of the literal in the program below?

   .. code-block:: python

      print("17")

.. mchoice:: question2_2_4
   :answer_a: String
   :answer_b: Integer
   :answer_c: Number
   :correct: b
   :feedback_a: No, this is not a String because it is not enclosed in quotation marks.
   :feedback_b: Yes, this is an integer (or whole number)
   :feedback_c: No, number is not a specific data type. This is an integer (a type of number that is whole, without a decimal portion)
   :practice: T

   What is the data type of the literal in the program below?

   .. code-block:: python

      print(341)
