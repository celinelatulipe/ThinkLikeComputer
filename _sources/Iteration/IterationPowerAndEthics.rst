..  Copyright (C)  Brad Miller, David Ranum, Jeffrey Elkner, Peter Wentworth, Allen B. Downey, Chris
    Meyers, and Dario Mitchell.  Permission is granted to copy, distribute
    and/or modify this document under the terms of the GNU Free Documentation
    License, Version 1.3 or any later version published by the Free Software
    Foundation; with Invariant Sections being Forward, Prefaces, and
    Contributor List, no Front-Cover Texts, and no Back-Cover Texts.  A copy of
    the license is included in the section entitled "GNU Free Documentation
    License".

.. _for_by_index:

.. qnum::
   :prefix: moreiter-6-
   :start: 1

The Power of Iteration
----------------------

The examples you have seen so far in this chapter show iteration over small data: strings and lists that are hard-coded into the program. In the next 
chapter you are going to learn how to read from files. Reading from files gives a programmer access to much larger data sets that can be iterated over. 
In addition to reading from static files, there are also ways to read from live data streams, such as wind sensor data from a weather station or all the twitter posts with a given hashtag. With the ability to iterate, programmers have the ability to make computers do massive amounts of computation and this enables things that were not really possible before because it takes people much longer to do things than computers. 

One of the early ways iteration was used became powerful was for 'mail merge'. This allowed a computer to take a list of names and addresses, and print out letters addressed to everyone on the list. This meant that a company could send letters to huge lists of people (such as to every address in a city's phonebook), something that would have been nearly impossible for an administrative clerk to do prior to computers being standard office equipment. The introduction of iteration by computer changed things. Iteration and mail merge made it possible for people to reach a wider audience by mailing out letters. You can think of this as the original email spam! Like any tool, iteration can be used for good (sending out information about a blood donation clinic) or evil (spreading disinformation about a political candidate). 


Large Sets of Data
==================

The ability to iterate over large sets of data introduces ethical issues. Just because a for loop allows you to do something doesn't mean you should. Consider the following sets of large data:

* All the social insurance numbers (SIN) of citizens in Canada or social security numbers (SSN) of citizens in the US
* The DNA for a person (list of letter combinations ACDG, CDDA, etc.)
* Credit card numbers on file with Netflix
* Every purchase an individual has made through Amazon since they created their account
* The names and IDs of all the inmates held at prisons in the US from 2000-2020
* The photos of every person who has passed through airport security in Vancouver in 2021
* All photos and posts that somebody 'liked' on instagram
* Health card number of every person who has had a sex change operation at a hospital in Ontario
* A list containing the number of children/dependents of every employee in a large organization

For each list above, can you think of a good reason to iterate through the list? What might you do with that information that would be good for humanity? What might someone do with that list that would cause harm? One thing to keep in mind is that almost all of these data are incomplete and have inaccuracies - it is inevitable that in a large set of data there are errors. What would be the consequences to someone if the data about them in a list was erroneous? It's also often unclear who **owns** the information stored in such lists, and there is increasingly a price tag and market associated with this data. 

What would you do if the company you worked for asked you to write code that would iterate over a list and do something with the data that you thought was unethical? Who owns the data in the list? Is it data that you should even have access to? Is the data **about** someone? If so, do they know your company has that data and do you have permission to use it? As a programmer, you have an ethical responsibility to think about the impacts your code will have on people and to refuse to engage in developing software that will cause harm.


**Check your understanding**

[TODO: come up with questions for this]

.. mchoice:: question14_6_1
   :answer_a: 0
   :answer_b: 1
   :answer_c: 2
   :answer_d: 3
   :answer_e: 6
   :correct: d
   :feedback_a: idx % 2 is 0 whenever idx is even
   :feedback_b: idx % 2 is 0 whenever idx is even
   :feedback_c: idx % 2 is 0 whenever idx is even
   :feedback_d: idx % 2 is 0 whenever idx is even
   :feedback_e: idx % 2 is 0 whenever idx is even
   :practice: T

   How many times is the letter p printed by the following statements?
   
   .. code-block:: python

      s = "python"
      for idx in range(len(s)):
         print(s[idx % 2])
