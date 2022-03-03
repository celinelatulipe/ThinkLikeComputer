..  Copyright (C)  Brad Miller, David Ranum, Jeffrey Elkner, Peter Wentworth, Allen B. Downey, Chris
    Meyers, and Dario Mitchell.  Permission is granted to copy, distribute
    and/or modify this document under the terms of the GNU Free Documentation
    License, Version 1.3 or any later version published by the Free Software
    Foundation; with Invariant Sections being Forward, Prefaces, and
    Contributor List, no Front-Cover Texts, and no Back-Cover Texts.  A copy of
    the license is included in the section entitled "GNU Free Documentation
    License".

.. qnum::
   :prefix: intro-4-
   :start: 1

.. index:: program, ethics

Ethics
-------
You may be wondering why there is a section on ethics in your programming book. You might be thinking that this is where we tell you it is wrong to cheat on your programming assignments. That is true, but that is not what this section is about. Ethics is critically important in computer science. People who are trained in computer science go on to develop technologies that change the world. Technologies impact so much of our day to day life, and so it is absolutely critical that as you learn how to design, develop and deploy technology, that you make decisions so that the technology you put out in the world does not cause harm. That may seem obvious, but it's not as easy as you think to predict how the technology you develop might be used and abused. Throughout this book we will ask you to pause and consider the technological implications of your choices as a programmer. We hope that you will realize by the end of this course how ethics become embedded in computer code.           

.. activecode:: alg_impl_ethics
   :nocodelens:

   radius = int(input("Enter the radius:"))
   area = (radius * radius) * 3.1415
   print("The area of a circle with radius", radius, "is:", area)

Even simple programs like the one above embed **ethical values**. You may be thinking "What?!? There 
are no ethics involved in calculating the area of a circle!". But consider this version of the same 
program:

.. activecode:: alg_ethics_v3
   :nocodelens:

   radius = int(input("Enter the radius:"))
   area = (radius * radius) * 3
   print("The area of a circle with radius", radius, "is:", area)

In this version of the program, we have rounded the value of PI down to a whole number. After all, 3 is quite close to 3.1415, right? Now you may be thinking, that's not an ethical decision - that's just an error. But the original valud of 3.1415 isn't the true value of PI either. If you are a math afficionado, you will recall that PI has many, many digits beyond 3.1415. So, a programmer in the first program made a decision that four digits after the decimal number is enough precision. They made a decision to leave off many digits. In the second version of the program, we've just made a differnt decision about precision. The decision of level of precision is made by the programmer, and it could have disastrous consequences. What if we are trying to design a part for an airplane and because of this, a part is made the wrong size and that causes a malfunction which leads to a plane crash? One of the things we will discuss throughout this book is the many ways that programs embed ethhical values, because programs are written by humans. It's very important to self-reflect on how your values are reflected (or not) in a program you write. 


**Check your understanding**

TODO: add an MC question on ethics. 


