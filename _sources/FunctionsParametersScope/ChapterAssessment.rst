..  Copyright (C)  Brad Miller, David Ranum, Jeffrey Elkner, Peter Wentworth, Allen B. Downey, Chris
    Meyers, and Dario Mitchell.  Permission is granted to copy, distribute
    and/or modify this document under the terms of the GNU Free Documentation
    License, Version 1.3 or any later version published by the Free Software
    Foundation; with Invariant Sections being Forward, Prefaces, and
    Contributor List, no Front-Cover Texts, and no Back-Cover Texts.  A copy of
    the license is included in the section entitled "GNU Free Documentation
    License".

.. qnum::
   :prefix: func-15-
   :start: 1

Chapter Assessment
==================

.. activecode:: ac11_15_1
   :language: python
   :autograde: unittest
   :practice: T
   :topics: Functions/Returningavaluefromafunction

   Write a function called ``int_return`` that takes an integer as input and returns the same integer.
   ~~~~
   =====

   from unittest.gui import TestCaseGui

   class myTests(TestCaseGui):

      def testOne(self):
         self.assertEqual(int_return(10), 10, "Testing that function int_return(10) returns 10")

   myTests().main()

.. activecode:: ac11_15_2
   :language: python
   :autograde: unittest
   :practice: T
   :topics: Functions/Returningavaluefromafunction

   Write a function called ``add`` that takes any number as its input and returns that sum with 2 added.
   ~~~~

   =====

   from unittest.gui import TestCaseGui

   class myTests(TestCaseGui):

      def testTwo(self):
         self.assertEqual(add(-2), 0, "Testing that add(-2) returns 0")
         self.assertEqual(add(6), 8, "Testing that add(6) returns 8")
         self.assertEqual(add(4), 6, "Testing that add(4) returns 6")

   myTests().main()

.. activecode:: ac11_15_3
   :language: python
   :autograde: unittest
   :practice: T
   :topics: Functions/Returningavaluefromafunction

   Write a function called ``change`` that takes any string, adds "Nice to meet you!" to the end of the argument given, and returns that new string.
   ~~~~
   
   =====

   from unittest.gui import TestCaseGui

   class myTests(TestCaseGui):

      def testThree(self):
         self.assertEqual(change("I'm Bob. "), "I'm Bob. Nice to meet you!", "Tests that change('I'm Bob. '') returns 'I'm Bob. Nice to meet you!'")   
         self.assertEqual(change(""), "Nice to meet you!", "Tests that change() returns 'Nice to meet you!'")

   myTests().main()

.. activecode:: ac11_15_6
   :language: python
   :autograde: unittest
   :practice: T
   :topics: Functions/Functionscancallotherfunctions

   You will need to write two functions for this problem. The first function, ``divide`` that takes in any number and returns that same number divided by 2. The second function called ``sum`` should take any number, divide it by 2, and add 6. It should return this new number. You should call the ``divide`` function within the ``sum`` function. Do not worry about decimals.
   ~~~~

   =====

   from unittest.gui import TestCaseGui

   class myTests(TestCaseGui):

      def testSixA(self):
         self.assertEqual(divide(4), 2, "Tests that divide(4) returns 2")
      def testSixB(self):
         self.assertEqual(sum(4), 8, "Tests that sum(4) returns 8")
         self.assertEqual(sum(2), 7, "Tests that sum(2) returns 7")
         self.assertEqual(sum(-6), 3, "Tests that sum(-6) returns 3")
         self.assertEqual(sum(0), 6, "Tests that sum(0) returns 6")

   myTests().main()

.. fillintheblank:: assess_ch8_1_lh

   .. image:: Figures/Chapter_8_1.PNG
        :width: 900
        :align: center
        :alt: Finding the maximum number

   Given the following function with the class_grades list passed in, what will the return value be? |blank|

   -  :97: Correct.
      :.*: Incorrect. Our function is looking for and returning the highest element in class_grades

.. mchoice:: assess_ch8_2_lh
   :multiple_answers:
   :answer_a: NUM_COORDS
   :answer_b: MAX
   :answer_c: MIN
   :answer_d: x_coord
   :answer_e: coord
   :correct: b c e
   :feedback_a: Incorrect, as seen in the function we are accessing the global variable NUM_COORDS
   :feedback_b: Correct, we are using the local version of MAX declared inside the function
   :feedback_c: Correct, we are using the local version of MIN declared inside the function
   :feedback_d: Incorrect, the x_coord append line is using a reference of the global list x_coord
   :feedback_e: Correct, the iterator variable is still a variable and in this case it is created locally inside the function

   .. image:: Figures/Chapter_8_2.PNG
      :width: 900
      :align: center
      :alt: local vs global variables

   In the above screenshot, select all the variables that are local to the function generate_coords

.. fillintheblank:: assess_ch8_3_lh

   .. image:: Figures/Chapter_8_3.PNG
      :width: 900
      :align: center
      :alt: division function

   Consider the above program. Which variable will the parameter x point to? |blank|
   Which variable will the parameter y point to? |blank|

   -  :combined_grades: Correct.
      :.*: Incorrect, x will point to the variable in the same parameter position when the function is called
   - :students: Correct.
      :.*: Incorrect, y will point to the variable in the same parameter position when the function is called 
      

