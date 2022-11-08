..  Copyright (C)  Celine Latulipe, Brad Miller, David Ranum, Jeffrey Elkner, Peter Wentworth, Allen B. Downey, Chris
    Meyers, and Dario Mitchell.  Permission is granted to copy, distribute
    and/or modify this document under the terms of the GNU Free Documentation
    License, Version 1.3 or any later version published by the Free Software
    Foundation; with Invariant Sections being Forward, Prefaces, and
    Contributor List, no Front-Cover Texts, and no Back-Cover Texts.  A copy of
    the license is included in the section entitled "GNU Free Documentation
    License".

Immutable Strings
=================

In Python, as in many programming languages, strings are immutable. What does that mean? When something is mutable it can change. When something is immutable, it cannot change. So, when we create a string, some memory is allocated to store that string. When we want to change that string, we have to actually create a new string. This is one of the ways that strings and lists differ. Examine the code below.

.. activecode:: ac9_2i_1

    list1 = ["hello", 2.0, 5, "bye"]
    print(list1)
    list1[2] = 37   #replace an item in the list, this is allowed
    print(list1)

    str1 = "Hello."
    print(str1)
    str1[5] = '!' # ERROR - trying to replace a character in the string 
    print(str1)

In the above example, you see that it is possible to edit a list and replace one of the items with another item. But it isn't possible to edit a string that has already been created, and change one of the letters. If you want to do that, you need to create a new string. 


String methods return a new string
----------------------------------

There are many built-in methods that can be used on strings. For example, if you want to make all the alphabetic characters in a string uppercase letters, you can call the .upper() method on a string. But, because strings are immutable, this method returns a new string, which has to be captured in a variable.

.. activecode:: ac9_2i_2

    name = "Wanda"
    name_uppercase = name.upper()
    print(name)
    print(name_uppercase)

In the example above we create a string, and then call the upper() method on that string, storing the resulting new string in a different variable. You can see that the original string (name) is not modified by calling the upper() method on it. 

Of course, often when we call string methods, we do want to change them. So, we often just reassign back to the same variable.The code above can be modified to do just that:


.. activecode:: ac9_2i_3

    name = "Wanda"
    print(name)
    name = name.upper()
    print(name)
   

Forgetting that strings are immutable and not capturing the return value is a really common mistake that novice programmers make. In the code below, a novice programmer is expecting to print out a message in all lowercase letters, but the code doesn't work because they forgot to capture the result of calling the string method lower().


.. activecode:: ac9_2i_4

    title = input("Please enter the title of the book you are looking for: ")
    # convert title to all lower case for searching through catalog
    title.lower()
    print("Your book title, converted to all lowercase, is: ", title) 

Fix the above program so that the title is printed out all in lowercase. Capture the result of the string method call on line 3, and use that variable in the print statement on line 4.
   

