..  Copyright (C) Celine Latulipe.  Permission is granted to copy, distribute
    and/or modify this document under the terms of the GNU Free Documentation
    License, Version 1.3 or any later version published by the Free Software
    Foundation; with Invariant Sections being Forward, Prefaces, and
    Contributor List, no Front-Cover Texts, and no Back-Cover Texts.  A copy of
    the license is included in the section entitled "GNU Free Documentation
    License".

Combining Iterations, Conditionals and Functions
================================================

In this section, we will look at examples where we combine all three of these building blocks together in various ways. The purpose of looking at these examples, along with the flow charts that are color-coded (blue to show function blocks, green to show conditional blocks, and pink to show iteration blocks) is the ways that these things can all work together. Every program you write will make use of these blocks of code, nested in each other in lots of different ways. 

Let's look at an example of a program that uses all of these components, combined and nested together. This program is designed to check through a list of potential passwords and determine whether each password meets a set of four requirements. Run the program. This program is not interactive, so the output is only in the console. But note the use of functions, loops, conditionals and how they are combined.

.. activecode:: ac7_5_1

    # Password Checking Program
    # check whether each password has at least 8 characters, at least 1 number,
    # at least one lower-case character, at least one upper-case character

    def check_number():
        """sets globbal pwd_good false if no number is found """
        global pwd_good
        for c in current_pwd:
            if c.isdigit():
                return

        pwd_good = False
        print(current_pwd + " has no numbers")
        
    def check_lower():
        """sets globbal pwd_good false if no lowercase letter is found """
        global pwd_good
        for c in current_pwd:
            if c.islower():
                return

        pwd_good = False
        print(current_pwd + " has no lowercase letters")

    def check_upper():
        """sets globbal pwd_good false if no uppercase letter is found """
        global pwd_good
        for c in current_pwd:
            if c.isupper():
                return

        pwd_good = False
        print(current_pwd + " has no uppercase letters")

    def main(): 
        global pwd_good, current_pwd
        for pwd in pwd_list:
            pwd_good = True
            current_pwd = pwd
            # check len
            if len(current_pwd) < 8:
                print(current_pwd + " is too short (must have at least 8 characters)")
                pwd_good = False

            # check for number
            check_number()

            # check for lower-case char
            check_lower()

            # check for upper-case char
            check_upper()
            
            if not pwd_good:
                print("password: " + current_pwd + " is not good.")
            else:
                print("password: " + current_pwd + " meets requirements")

            print("*****")

    #global variabbles
    pwd_list = ["letmein", "456liteS", "5goodbye", "major7Hug", "334_*2211", "fountain", "2289999", "FUNTIMES4"]
    current_pwd = ""
    pwd_good = True

    main()

After you have run the program above, look at the code image below, which highlights with the functions, conditionals and loops with the same color-coding we've been using. We've also added arrows from the function calls to the function blocks.


.. image:: Figures/password_checker_blocks.png
    :width: 800
    :align: center

Here are some things to pay attention to in the image above:

* There is a main() method. This is common practice - the main method is what gets everything going and it then calls other methods. That's a common programming pattern. Almost all of the code, other than the declaration of global variables, is **inside** functions.
* The three functions at the top follow a standard search pattern, in which we are looking to find whether there are any instances of a given item in a list. The return statements in the middle of these functions cause the path of execution to jump back to where the function was called: once we have found at least one of the things we are looking for, we don't need to keep looking. If we loop through the whole list and don't find what we are looking for, we set a boolean to indicate that.
* These functions are editing global variables and we've already told you that's not a great idea, in the chapter on functions and parameters we will show you a better way to write code like this. 
* When you are working with lists the following pattern is really common: a function containing a loop containing a conditional, and the code above shows that pattern repeated four times. In the main() function we are iterating over the list of passwords and testing various things about each. In the top three functions, we are iterating over the characters in the current password to test whether the character meets some particular condition.


