..  Copyright (C)  Brad Miller, David Ranum, Jeffrey Elkner, Peter Wentworth, Allen B. Downey, Chris
    Meyers, and Dario Mitchell.  Permission is granted to copy, distribute
    and/or modify this document under the terms of the GNU Free Documentation
    License, Version 1.3 or any later version published by the Free Software
    Foundation; with Invariant Sections being Forward, Prefaces, and
    Contributor List, no Front-Cover Texts, and no Back-Cover Texts.  A copy of
    the license is included in the section entitled "GNU Free Documentation
    License".

.. qnum::
   :prefix: ethics-2-
   :start: 1

Ethics & Code Ownership
-----------------------
We have all heard about movie and brand copyrights but what about code? If you write a piece of code, do you own it? In Canada, an original work (including code) is automatically protected by copyright, from the moment you create it. This doesn't make your idea protected, just your work. For example, you might remember the viral game, *Flappy Bird*. In fact, in 2014, there were 864 Flappy Bird clones in the Google Play store and none of them broke copyright. Copyright protects the author from someone replicating their code *exactly* but it does not copyright the idea itself. However, imagine you work for a company and use Microsoft Word for your work. You want to finish from home but your own home computer doesn't have Microsoft word so you nake an extra copy of the software and install it at home so that you can finish. This is software copyright infringment.

Now imagine, since, you know that it is copyright infringment to duplicate Microsoft word, you install LibreOffice instead. LibreOffice is an alternative to Word software and this is copyright legal. How is this possible? Enter the idea of open-source.

Open-source softwarfe is computer software that is released under a license in which the copyright holder gives permission to users to use, study, alter and distribute it and the code for it however they see fit. It's not that a copyright holder doesn't exist for the code but rather a license to allow for everyone to benefit from code.

There are many benefits to sharing code publicly and creating open-source work. Such as:
* Freedom and flexibility of open source code means developers are not waiting on licenses and understanding legalese in order to enhance and update software.
* Open-source code is seen and critiqued by a global community of people. Developers are more likely to write better code when we know other experts will be looking at it.
* Open-source code is exponentially cheaper. Open-source implies you do not need to pay to use the software and you not need to manage any sort of licenses.
* The security issues that may arise with Open-Source is often addressed by Linus Torvald's "many eyes" theory. The theory has been proven to be true time and again when ethical and expert developers review open-source code to help it enhance it's security capabilities.

Open-source is often term for code and software being shared publically but there exists similar licenses for other resources, such as Creative Commons licenses. They are different types of CC licenses, depending on how strict or loose you want the guidelines around your copyrighted materials to be.

**Check your understanding**

.. mchoice:: question4_3_1
   :answer_a: prob = random.randrange(1, 101)
   :answer_b: prob = random.randrange(1, 100)
   :answer_c: prob = random.randrange(0, 101)
   :answer_d: prob = random.randrange(0, 100)
   :correct: a
   :feedback_a: This will generate a number between 1 and 101, but does not include 101.
   :feedback_b: This will generate a number between 1 and 100, but does not include 100.  The highest value generated will be 99.
   :feedback_c: This will generate a number between 0 and 100.  The lowest value generated is 0.  The highest value generated will be 100.
   :feedback_d: This will generate a number between 0 and 100, but does not include 100.  The lowest value generated is 0 and the highest value generated will be 99.
   :practice: T

   The correct code to generate a random number between 1 and 100 (inclusive) is:
