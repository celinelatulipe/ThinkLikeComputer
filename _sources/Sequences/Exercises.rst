..  Copyright (C)  Brad Miller, David Ranum, Jeffrey Elkner, Peter Wentworth, Allen B. Downey, Chris
    Meyers, and Dario Mitchell.  Permission is granted to copy, distribute
    and/or modify this document under the terms of the GNU Free Documentation
    License, Version 1.3 or any later version published by the Free Software
    Foundation; with Invariant Sections being Forward, Prefaces, and
    Contributor List, no Front-Cover Texts, and no Back-Cover Texts.  A copy of
    the license is included in the section entitled "GNU Free Documentation
    License".

:skipreading:`True`

.. qnum::
   :prefix: seq-11-
   :start: 1

Exercises
---------

#.

   .. parsonsprob:: pp5_11_1

      Write a program that will print out the length of each item in the list as well as the first and last characters of the item.
      -----
      weather = ["sunny", "cloudy", "partially sunny", 
                 "rainy", "storming", "windy", "foggy", 
                 "snowy", "hailing"]
      =====
      for condition in weather:
      =====
          print("The word is", len(condition), "characters")
      =====
          first_char = condition[0]
          last_char = condition[-1]
      =====
          print("The first character is: " + first_char)
          print("The last character is: " + last_char)

#.

   .. parsonsprob:: pp5_11_2

      Write code to determine how many t's are in the following sentences.
      -----
      phrases = ["My, what a lovely day today is!", 
      "Have you mastered cooking yet? A tasty treat could be in your future.", 
      "Have you ever seen the leaves change color?"]
      =====
      for sentence in phrases:
      =====
          print(sentence.count("t"))

#.

   .. tabbed:: q6

        .. tab:: Question

           .. actex:: ac11_14_6

              Although Python provides us with many list methods, it is good practice and very instructive to think about how they are implemented.  Implement a Python function that works like the following:
   
              a. count
              #. in
              #. reverse
              #. index
              #. insert
              ~~~~ 

        .. tab:: Answer

            .. activecode:: answer11_14_6

                def count(obj, lst):
                    count = 0
                    for e in lst:
                        if e == obj:
                            count = count + 1
                    return count

                def is_in(obj, lst):  # cannot be called in() because in is a reserved keyword
                    for e in lst:
                        if e == obj:
                            return True
                    return False

                def reverse(lst):
                    reversed = []
                    for i in range(len(lst)-1, -1, -1): # step through the original list backwards
                        reversed.append(lst[i])
                    return reversed

                def index(obj, lst):
                    for i in range(len(lst)):
                        if lst[i] == obj:
                            return i
                    return -1

                def insert(obj, index, lst):
                    newlst = []
                    for i in range(len(lst)):
                        if i == index:
                            newlst.append(obj)
                        newlst.append(lst[i])
                    return newlst

                lst = [0, 1, 1, 2, 2, 3, 4, 5, 6, 7, 8, 9]
                print(count(1, lst))
                print(is_in(4, lst))
                print(reverse(lst))
                print(index(2, lst))
                print(insert('cat', 4, lst))

        .. tab:: Discussion

            .. disqus::
                :shortname: interactivepython
                :identifier: disqus_39ee0274e51d4c888cc20b6fefa4069c

#.

   .. tabbed:: q8

        .. tab:: Question

           .. actex:: ac11_14_8

                Write a Python function that will take a list of 100 random integers between 0 and 1000 and return the maximum value.  (Note: there is a builtin function named ``max`` but pretend you cannot use it.)
                ~~~~
                import random as r
                lst = []

                for i in range(100):
                    num = r.randint(1, 1000)
                    lst.append(num)

                def largest(lst):
                    #your code here

                ====
                from unittest.gui import TestCaseGui
                import re
                class myTests(TestCaseGui):
                    def testOne(self):
                        output = self.getOutput().split('\n')
                        editor = self.getEditorText().split('\n')
                        float_re = r'[-+]?(\d+(\.\d*)?|\.\d+)([eE][-+]?\d+)?'
                    
                        self.assertEqual(largest(lst), max(lst), 'Checking for the list'+ str(lst))
                        
                        # hardcode check
                        self.assertFalse(re.search(r'max', self.getEditorText()), 'Checking for max')
                myTests().main()


        .. tab:: Answer

            .. activecode:: answer11_14_8

                import random

                def max(lst):
                    max = 0
                    for e in lst:
                        if e > max:
                            max = e
                    return max

                lst = []
                for i in range(100):
                    lst.append(random.randint(0, 1000))

                print(max(lst))

        .. tab:: Discussion

            .. disqus::
                :shortname: interactivepython
                :identifier: disqus_714fd5537ebf41189ce5fb6fb16d1d26

#.

   .. tabbed:: q9

        .. tab:: Question

           .. actex:: ac11_14_9

              Write a function ``sum_of_squares(xs)`` that computes the sum
              of the squares of the numbers in the list ``xs``.  For example,
              ``sum_of_squares([2, 3, 4])`` should return 4+9+16 which is 29:
              ~~~~   
              def sum_of_squares(xs):
                  # your code here

              ====
              from unittest.gui import TestCaseGui

              class myTests(TestCaseGui):

                  def testOne(self):
                      self.assertEqual(sum_of_squares([2,3,4]),29,"Tested sum_of_squares on input [2,3,4]")
                      self.assertEqual(sum_of_squares([0,1,-1]),2,"Tested sum_of_squares on input [0,1,-1]")
                      self.assertEqual(sum_of_squares([5,12,14]),365,"Tested sum_of_squares on input [5,12,14]")

              myTests().main()

#.

   .. tabbed:: q10

        .. tab:: Question

           .. actex:: ac11_14_10

              Write a function to count how many odd numbers are in a list.
              ~~~~
              def countOdd(lst):
                  # your code here

              ====
              from unittest.gui import TestCaseGui

              class myTests(TestCaseGui):

                  def testOne(self):
                      self.assertEqual(countOdd([1,3,5,7,9]),5,"Tested countOdd on input [1,3,5,7,9]")
                      self.assertEqual(countOdd([1,2,3,4,5]),3,"Tested countOdd on input [-1,-2,-3,-4,-5]")
                      self.assertEqual(countOdd([2,4,6,8,10]),0,"Tested countOdd on input [2,4,6,8,10]")
                      self.assertEqual(countOdd([0,-1,12,-33]),2,"Tested countOdd on input [0,-1,12,-33]")

              myTests().main()



        .. tab:: Answer

            .. activecode:: answer11_14_10

                import random

                def countOdd(lst):
                    odd = 0
                    for e in lst:
                        if e % 2 != 0:
                            odd = odd + 1
                    return odd

                # make a random list to test the function
                lst = []
                for i in range(100):
                    lst.append(random.randint(0, 1000))

                print(countOdd(lst))

        .. tab:: Discussion

            .. disqus::
                :shortname: interactivepython
                :identifier: disqus_fdd366b1b4c8494082a385e1e1197844


#.

   .. tabbed:: q11

        .. tab:: Question

           .. actex:: ac11_14_11

              Sum up all the even numbers in a list.
              ~~~~
              def sumEven(lst):
                  # your code here

              ====
              from unittest.gui import TestCaseGui

              class myTests(TestCaseGui):

                def testOne(self):
                    self.assertEqual(sumEven([1,3,5,7,9]),0,"Tested sumEven on input [1,3,5,7,9]")
                    self.assertEqual(sumEven([-1,-2,-3,-4,-5]),-6,"Tested sumEven on input [-1,-2,-3,-4,-5]")
                    self.assertEqual(sumEven([2,4,6,7,9]),12,"Tested sumEven on input [2,4,6,7,9]")
                    self.assertEqual(sumEven([0,1,12,33]),12,"Tested sumEven on input [0,1,12,33]")

              myTests().main()

#.

   .. tabbed:: q12

        .. tab:: Question

           .. actex:: ac11_14_12

              Sum up all the negative numbers in a list.
              ~~~~
              def sumNegatives(lst):
                  # your code here

              ====
              from unittest.gui import TestCaseGui

              class myTests(TestCaseGui):

                  def testOne(self):
                      self.assertEqual(sumNegatives([-1,-2,-3,-4,-5]),-15,"Tested sumNegatives on input [-1,-2,-3,-4,-5]")
                      self.assertEqual(sumNegatives([1,-3,5,-7,9]),-10,"Tested sumNegatives on input [1,-3,5,-7,9]")
                      self.assertEqual(sumNegatives([-2,-4,6,-7,9]),-13,"Tested sumNegatives on input [-2,-4,6,-7,9]")
                      self.assertEqual(sumNegatives([0,1,2,3,4]),0,"Tested sumNegatives on input [0,1,2,3,4]")

              myTests().main()



        .. tab:: Answer

            .. activecode:: answer11_14_12

                import random

                def sumNegative(lst):
                    sum = 0
                    for e in lst:
                        if e < 0:
                            sum = sum + e
                    return sum

                lst = []
                for i in range(100):
                    lst.append(random.randrange(-1000, 1000))

                print(sumNegative(lst))

        .. tab:: Discussion

            .. disqus::
                :shortname: interactivepython
                :identifier: disqus_bfe671ac1e0942f2be4de7179921f83f



Contributed Exercises
~~~~~~~~~~~~~~~~~~~~~

.. raw:: html

    {% for q in questions: %}
        <div class='oneq full-width'>
            {{ q['htmlsrc']|safe }}
        </div>
    {% endfor %}
