..  Copyright (C)  Brad Miller, David Ranum, Jeffrey Elkner, Peter Wentworth, Allen B. Downey, Chris
    Meyers, and Dario Mitchell.  Permission is granted to copy, distribute
    and/or modify this document under the terms of the GNU Free Documentation
    License, Version 1.3 or any later version published by the Free Software
    Foundation; with Invariant Sections being Forward, Prefaces, and
    Contributor List, no Front-Cover Texts, and no Back-Cover Texts.  A copy of
    the license is included in the section entitled "GNU Free Documentation
    License".

Chapter Assessment
------------------

.. activecode:: ac10_8_1
    :practice: T
    :topics: MoreAboutIteration/listenerLoop

    Write a function, ``sublist``, that takes in a list of numbers as the parameter. In the function, use a while loop to return a sublist of the input list. The sublist should contain the same values of the original list up until it reaches the number 5 (it should not contain the number 5).
    ~~~~

    =====

    from unittest.gui import TestCaseGui

    class myTests(TestCaseGui):

       def testThree(self):
          self.assertEqual(sublist([1, 2, 3, 4, 5, 6, 7, 8]), [1, 2, 3, 4], "Testing that sublist([1, 2, 3, 4, 5, 6, 7, 8]) returns [1, 2, 3, 4]")
          self.assertEqual(sublist([5]), [], "Testing that sublist([5]) returns []")
          self.assertEqual(sublist([8, 6, 5]), [8, 6], "Testing that sublist([8, 6, 5]) returns [8, 6]")
          self.assertEqual(sublist([1, 6, 2, 3, 9]), [1, 6, 2, 3, 9], "Testing that sublist([1, 6, 2, 3, 9]) returns ([1, 6, 2, 3, 9])")

    myTests().main()

.. activecode:: ac10_8_2
    :practice: T
    :topics: MoreAboutIteration/listenerLoop

    Write a function called ``check_nums`` that takes a list as its parameter, and contains a while loop that only stops once the element of the list is the number 7. What is returned is a list of all of the numbers up until it reaches 7.
    ~~~~

    =====

    from unittest.gui import TestCaseGui

    class myTests(TestCaseGui):

       def testOne(self):
          self.assertEqual(check_nums([0,2,4,9,2,3,6,8,12,14,7,9,10,8,3]), [0,2,4,9,2,3,6,8,12,14], "Testing that check_nums stops on the correct postion with input [0,2,4,9,2,3,6,8,12,14,7,9,10,8,3]")
          self.assertEqual(check_nums([9,302,4,62,78,97,10,7,8,23,53,1]), [9,302,4,62,78,97,10], "Testing that check_nums stops on the correct position with input [9,302,4,62,78,97,10,7,8,23,53,1]")
          self.assertEqual(check_nums([7,8,3,2,4,51]), [], "Testing that check_nums stops on the correct position with input [7,8,3,2,4,51]")
          self.assertEqual(check_nums([1, 6, 2, 3, 9]), [1, 6, 2, 3, 9], "Testing that check_nums([1, 6, 2, 3, 9]) returns ([1, 6, 2, 3, 9])")

    myTests().main()

.. activecode:: ac10_8_3
    :practice: T
    :topics: MoreAboutIteration/listenerLoop

    Write a function, ``sublist``, that takes in a list of strings as the parameter. In the function, use a while loop to return a sublist of the input list. The sublist should contain the same values of the original list up until it reaches the string "STOP" (it should not contain the string "STOP").
    ~~~~

    =====

    from unittest.gui import TestCaseGui

    class myTests(TestCaseGui):

       def testFour(self):
          self.assertEqual(sublist(["bob", "joe", "lucy", "STOP", "carol", "james"]), ["bob", "joe", "lucy"], "Testing that sublist(['bob', 'joe', 'lucy', 'STOP', 'carol', 'james']) returns ['bob', 'joe', 'lucy']")
          self.assertEqual(sublist(["STOP"]), [], "Testing that sublist(['STOP']) returns []")
          self.assertEqual(sublist(["jackie", "paul", "STOP"]), ["jackie", "paul"], "Testing that sublist(['jackie', 'paul', 'STOP']) returns ['jackie', 'paul']")

    myTests().main()

.. activecode:: ac10_8_4
    :practice: T
    :topics: MoreAboutIteration/ThewhileStatement

    Write a function called ``stop_at_z`` that iterates through a list of strings. Using a while loop, append each string to a new list until the string that appears is "z". The function should return the new list.
    ~~~~

    def stop_at_z():

    =====

    from unittest.gui import TestCaseGui

    class myTests(TestCaseGui):

       def testOne(self):
          self.assertEqual(stop_at_z(['c', 'b', 'd', 'zebra', 'h', 'r', 'z', 'm', 'a', 'k']), ['c', 'b', 'd', 'zebra', 'h', 'r'], "Testing the function stop_at_z on the input ['c', 'b', 'd', 'zebra', 'h', 'r', 'z', 'm', 'a', 'k'].")
          self.assertEqual(stop_at_z(['zoo', 'zika', 'ozzie', 'pizzazz', 'z', 'pizza', 'zap', 'haze']), ['zoo', 'zika', 'ozzie', 'pizzazz'], "Testing the function stop_at_z on the input ['zoo', 'zika', 'ozzie', 'pizzazz', 'z', 'pizza', 'zap', 'haze'].")
          self.assertEqual(stop_at_z(['z']), [], "Testing the function stop_at_z on the input ['z'].")

    myTests().main()

.. activecode:: ac10_8_5
    :practice: T
    :topics: MoreAboutIteration/ThewhileStatement

    Below is a for loop that works. Underneath the for loop, rewrite the problem so that it does the same thing, but using a while loop instead of a for loop. Assign the accumulated total in the while loop code to the variable ``sum2``. Once complete, sum2 should equal sum1.
    ~~~~

    sum1 = 0

    lst = [65, 78, 21, 33]

    for x in lst:
        sum1 = sum1 + x

    =====

    from unittest.gui import TestCaseGui

    class myTests(TestCaseGui):

       def testFive(self):
          self.assertEqual(sum2, 197, "Testing that sum2 is assigned to correct value.")
          self.assertIn('while', self.getEditorText(), "Testing your code (Don't worry about actual and expected values).")

    myTests().main()

.. activecode:: ac10_8_6
    :practice: T
    :topics: MoreAboutIteration/listenerLoop

    **Challenge:** Write a function called ``beginning`` that takes a list as input and contains a while loop that only stops once the element of the list is the string 'bye'. What is returned is a list that contains up to the first 10 strings, regardless of where the loop stops. (i.e., if it stops on the 32nd element, the first 10 are returned. If "bye" is the 5th element, the first 4 are returned.) *If you want to make this even more of a challenge, do this without slicing*
    ~~~~

    =====

    from unittest.gui import TestCaseGui

    class myTests(TestCaseGui):

       def testOne(self):
          self.assertEqual(beginning(['water', 'phone', 'home', 'chapstick', 'market', 'headphones', 'bye', 'stickie notes', 'snapchat', 'facebook', 'social media']), ['water', 'phone', 'home', 'chapstick', 'market', 'headphones'], "Testing that beginning returns the correct list on input ['water', 'phone', 'home', 'chapstick', 'market', 'headphones', 'bye', 'stickie notes', 'snapchat', 'facebook', 'social media']")
          self.assertEqual(beginning(['bye', 'no', 'yes', 'maybe', 'sorta']), [], "Testing that beginning returns the correct list on input ['bye', 'no', 'yes', 'maybe', 'sorta']")
          self.assertEqual(beginning(['hello', 'hi', 'hiyah', 'howdy', 'what up', 'whats good', 'holla', 'good afternoon', 'good morning', 'sup', 'see yah', 'toodel loo', 'night', 'until later', 'peace', 'bye', 'good-bye', 'g night']),['hello', 'hi', 'hiyah', 'howdy', 'what up', 'whats good', 'holla', 'good afternoon', 'good morning', 'sup'] , "Testing that beginning returns the correct list on input ['hello', 'hi', 'hiyah', 'howdy', 'what up', 'whats good', 'holla', 'good afternoon', 'good morning', 'sup', 'see yah', 'toodel loo', 'night', 'until later', 'peace', 'bye', 'good-bye', 'g night']")

    myTests().main()

.. fillintheblank:: assess_ch10_7_lh

    .. image:: Figures/Chapter_10_1.PNG
        :width: 900
        :align: center
        :alt: Adding to a list of odd number from 1 to 19

    Consider the above screenshot of CodeLens animation. What line number has the exit condition for the while loop? |blank|
    How many more times will the exit condition be checked? |blank|

    -   :3: Correct.
        :.*: Incorrect. The exit condition is the condition we check to see if the code inside the loop will run.
    -   :8: Correct.
        :.*: Incorrect. Pay close attention to the screenshot. What is the current value of odd_num and what line will be executed next in the code?

.. fillintheblank:: assess_ch10_8_lh

    .. image:: Figures/Chapter_10_2.PNG
        :width: 900
        :align: center
        :alt: While loop incrementing a score

    The above screenshot shows a program in mid execution. What will the variable score be equal to after the current iteration of the loop completes? |blank|

    -   :55: Correct.
        :.*: Incorrect. score currently equals 50. Pay close attention to the red arrow (the line that will execute next), and the line directly after.

.. mchoice:: assess_ch10_9_lh
    :multiple_answers:
    :answer_a: The loop exits and number_sum is printed
    :answer_b: number_sum is now equal to 36
    :answer_c: The loop continues to execute
    :answer_d: num is now equal to 0
    :answer_e: The variable exit remains 1
    :correct: a b d
    :feedback_a: Incorrect, take another look at our exit condition and the variable that the user is changing
    :feedback_b: Incorrect, number_sum is currently equal to 29 and the next number added will be 0
    :feedback_c: Correct, this is an infinte loop since we never alter the variable exit's value
    :feedback_d: Correct, the user has entered 0, overwriting nums previous value of 7
    :feedback_e: Correct, we did not edit exit's value

    .. image:: Figures/Chapter_10_3.PNG
        :width: 900
        :align: center
        :alt: Infinte loop

    The above screenshot is in mid execution. Assuming the user enters 0 next, select all that are true. 
