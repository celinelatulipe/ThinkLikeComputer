..  Copyright (C)  Brad Miller, David Ranum, Jeffrey Elkner, Peter Wentworth, Allen B. Downey, Chris
    Meyers, and Dario Mitchell.  Permission is granted to copy, distribute
    and/or modify this document under the terms of the GNU Free Documentation
    License, Version 1.3 or any later version published by the Free Software
    Foundation; with Invariant Sections being Forward, Prefaces, and
    Contributor List, no Front-Cover Texts, and no Back-Cover Texts.  A copy of
    the license is included in the section entitled "GNU Free Documentation
    License".

.. qnum::
   :prefix: 1-7-
   :start: 1


A Typical First Program
-----------------------

Traditionally, the first program written in a new language is called *Hello, World!* because all it does is display the words, Hello, World!  In Python, the source code
looks like this.

.. sourcecode:: python

    print("Hello, World!")

This is an example of using the **print function**, which doesn't actually print anything on paper. It displays a value on the screen, in the programming console. Programmers do their work in development environments (software applications designed specifically for developing programs). In a development environment there is typically one part of the window where the programmer edits the program, and another part of the window, called the console, where output (such as from a print statement) is displayed. The ActiveCode panel is like our development environment. In this case, the result on the console is the phrase:

::

    Hello, World!

Here is the example in an ActiveCode window, where you can run it and modify it. When you click the Save & Run button, a grey console window appears below the ActiveCode window. That is where output from print() statements will always appear.

.. activecode:: ac_hello_world

    print("Hello, World!")

The quotation marks in the program mark the beginning and end of the string value.
They don't appear in the result. You'll learn more about why in the next chapter.

Some people judge the quality of a programming language by the simplicity of the Hello, World! program. By this standard, Python does about as well as possible.

For comparison in another language, the Hello, World! program in Java looks like this:

::

    public class HelloWorld {
        public static void main(String[] args) {
            System.out.println("Hello, World!");
        }
    }

**Check your understanding**

.. mchoice:: question_print_statement
   :answer_a: sends information to the printer to be printed on paper.
   :answer_b: displays a value in the console.
   :answer_c: tells the computer to put the information in print, rather than cursive, format.
   :answer_d: tells the computer to speak the information.
   :correct: b
   :feedback_a: Within the Python programming language, the print statement has nothing to do with the printer.
   :feedback_b: Yes, the print statement is used to display the value of the thing being printed. This shows up in the console, which is typically only seen by the programmer, not the end user.
   :feedback_c: The format of the information is called its font and has nothing to do with the print statement.
   :feedback_d: That would be nice! But no...

   The print() statment:
