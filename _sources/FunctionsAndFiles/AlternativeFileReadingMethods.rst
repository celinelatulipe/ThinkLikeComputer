..  Copyright (C)  Brad Miller, David Ranum, Jeffrey Elkner, Peter Wentworth, Allen B. Downey, Chris
    Meyers, and Dario Mitchell.  Permission is granted to copy, distribute
    and/or modify this document under the terms of the GNU Free Documentation
    License, Version 1.3 or any later version published by the Free Software
    Foundation; with Invariant Sections being Forward, Prefaces, and
    Contributor List, no Front-Cover Texts, and no Back-Cover Texts.  A copy of
    the license is included in the section entitled "GNU Free Documentation
    License".


Alternative File Reading Methods
--------------------------------

Once you have a file "object", the thing returned by the open function, Python provides three methods to read data
from that object. The ``read()`` method returns the entire contents of the file as a single string (or just the first *n*  
characters if you provide a number as an input parameter). The ``readlines`` method returns the entire contents of
the file as a list of strings, where each item in the list is one line of the file. The ``readline``
method reads one line from the file and returns it as a string. The strings returned by ``readlines`` or
``readline`` will contain the newline character at the end.  :ref:`Table 2 <filemethods2a>` summarizes these
methods and the following session shows them in action.


======================== =========================== =====================================
**Method Name**           **Use**                     **Explanation**
======================== =========================== =====================================
``read(n)``               ``filevar.read()``          Read and return a string of ``n``
                                                      characters, or the entire file as a
                                                      single string if  ``n`` is not provided.
``readline(n)``           ``filevar.readline()``      Read and return the next line of the file with
                                                      all text up to and including the
                                                      newline character. If ``n`` is provided as
                                                      a parameter, then only ``n`` characters
                                                      will be returned if the line is longer
                                                      than ``n``. **Note:** the parameter ``n`` is 
                                                      not supported in the browser version of Python, 
                                                      and in fact is rarely used in practice, so 
                                                      you can safely ignore it.
``readlines(n)``          ``filevar.readlines()``     Returns a list of strings, each
                                                      representing a single line of the file.
                                                      If ``n`` is not provided then all lines of
                                                      the file are returned. If ``n`` is provided
                                                      then ``n`` characters are read but ``n`` is
                                                      rounded up so that an entire line is
                                                      returned.  **Note:** Like ``readline``,
                                                      ``readlines`` ignores the parameter ``n`` in the browser.
======================== =========================== =====================================


In this course, we will generally either iterate through the lines returned by ``readlines()`` with a for loop,
or use ``read()`` to get all of the contents as a single string.

In other programming languages, where they don't have the convenient for loop method of going through the lines
of the file one by one, they use a different pattern which requires a different kind of loop, the ``while`` loop.
Fortunately, you don't need to learn this other pattern, and we will put off consideration of ``while`` loops
until later in this course. We don't need them for handling data from files.

.. note::

   A common error that novice programmers make is not realizing that all these ways of reading the file contents,
   **use up the file**. After you call readlines(), if you call it again you'll get an empty list.

The example below shows how to use the readline() method from above and demonstrates how calling this repeatedly 
gets a different line each time, as the file is **used up**.

.. activecode:: ac5_8_1
    :nocodelens:

    olympicsfile = open("olympics.txt", "r")

    firstline = olympicsfile.readline()
    print("the first line of the file is: ", firstline)
    secondline = olympicsfile.readline()
    print("the second line of the file is: ", secondline)

    olympicsfile.close()


**Check your Understanding**

.. raw:: html

    <pre id="school_prompt.txt">
    Writing essays for school can be difficult but
    many students find that by researching their topic that they
    have more to say and are better informed. Here at the university
    we require many undergraduate students to take a first year writing requirement
    so that they can
    have a solid foundation for their writing skills. This comes
    in handy for many students.
    Different schools have different requirements, but everyone uses
    writing at some point in their academic career, be it essays, research papers,
    technical write ups, or scripts.
    </pre>


.. activecode:: ac5_8_2
   :language: python
   :nocodelens:
   :autograde: unittest
   :practice: T
   :available_files: school_prompt2.txt

   1. Using the file ``school_prompt2.txt``, find the number of characters in the file and assign that value to the variable ``num_char``.
   ~~~~

   =====

   from unittest.gui import TestCaseGui

   class myTests(TestCaseGui):

      def testOne(self):
         self.assertEqual(num_char, 536, "Testing that num_char has the correct value.")

   myTests().main()


.. raw:: html

    <pre id="travel_plans.txt">
    This summer I will be travelling.
    I will go to...
    Italy: Rome
    Greece: Athens
    England: London, Manchester
    France: Paris, Nice, Lyon
    Spain: Madrid, Barcelona, Granada
    Austria: Vienna
    I will probably not even want to come back!
    However, I wonder how I will get by with all the different languages.
    I only know English!
    </pre>

.. activecode:: ac5_8_3
   :available_files: travel_plans2.txt
   :language: python
   :nocodelens:
   :autograde: unittest
   :practice: T

   2. Find the number of lines in the file, ``travel_plans2.txt``, and assign it to the variable ``num_lines``.
   ~~~~

   =====

   from unittest.gui import TestCaseGui

   class myTests(TestCaseGui):

      def testTwo(self):
         self.assertEqual(num_lines, 11, "Testing that num_lines is assigned to correct value.")

   myTests().main()


.. raw:: html

    <pre id="emotion_words.txt">
    Sad upset blue down melancholy somber bitter troubled
    Angry mad enraged irate irritable wrathful outraged infuriated
    Happy cheerful content elated joyous delighted lively glad
    Confused disoriented puzzled perplexed dazed befuddled
    Excited eager thrilled delighted
    Scared afraid fearful panicked terrified petrified startled
    Nervous anxious jittery jumpy tense uneasy apprehensive
    </pre>

.. activecode:: ac5_8_4
   :available_files: emotion_words2.txt
   :language: python
   :nocodelens:
   :autograde: unittest
   :practice: T

   3. Create a string called ``first_forty`` that is comprised of the first 40 characters of ``emotion_words2.txt``.
   ~~~~

   =====

   from unittest.gui import TestCaseGui

   class myTests(TestCaseGui):

      def testOne(self):
         self.assertEqual(first_forty, 'Sad upset blue down melancholy somber bi', "Testing that first_forty was created correctly.")
   myTests().main()

.. datafile:: travel_plans2.txt
   :fromfile: travel_plans.txt
   :hide:

.. datafile:: school_prompt2.txt
   :fromfile: school_prompt.txt
   :hide:

.. datafile:: emotion_words2.txt
   :fromfile: emotion_words.txt
   :hide:


.. raw:: html

    <pre hidden id="olympics.txt">
    Name,Sex,Age,Team,Event,Medal
    A Dijiang,M,24,China,Basketball,NA
    A Lamusi,M,23,China,Judo,NA
    Gunnar Nielsen Aaby,M,24,Denmark,Football,NA
    Edgar Lindenau Aabye,M,34,Denmark/Sweden,Tug-Of-War,Gold
    Christine Jacoba Aaftink,F,21,Netherlands,Speed Skating,NA
    Christine Jacoba Aaftink,F,25,Netherlands,Speed Skating,NA
    Christine Jacoba Aaftink,F,25,Netherlands,Speed Skating,NA
    Christine Jacoba Aaftink,F,27,Netherlands,Speed Skating,NA
    Per Knut Aaland,M,31,United States,Cross Country Skiing,NA
    Per Knut Aaland,M,33,United States,Cross Country Skiing,NA
    John Aalberg,M,31,United States,Cross Country Skiing,NA
    John Aalberg,M,33,United States,Cross Country Skiing,NA
    "Cornelia ""Cor"" Aalten (-Strannood)",F,18,Netherlands,Athletics,NA
    "Cornelia ""Cor"" Aalten (-Strannood)",F,18,Netherlands,Athletics,NA
    Antti Sami Aalto,M,26,Finland,Ice Hockey,NA
    "Einar Ferdinand ""Einari"" Aalto",M,26,Finland,Swimming,NA
    Jorma Ilmari Aalto,M,22,Finland,Cross Country Skiing,NA
    Jyri Tapani Aalto,M,31,Finland,Badminton,NA
    Minna Maarit Aalto,F,30,Finland,Sailing,NA
    Minna Maarit Aalto,F,34,Finland,Sailing,NA
    Pirjo Hannele Aalto (Mattila-),F,32,Finland,Biathlon,NA
    Timo Antero Aaltonen,M,31,Finland,Athletics,NA
    Win Valdemar Aaltonen,M,54,Finland,Art Competitions,NA
    </pre>

