..  Copyright (C) Celine Latulipe.  Permission is granted to copy, distribute
    and/or modify this document under the terms of the GNU Free Documentation
    License, Version 1.3 or any later version published by the Free Software
    Foundation; with Invariant Sections being Forward, Prefaces, and
    Contributor List, no Front-Cover Texts, and no Back-Cover Texts.  A copy of
    the license is included in the section entitled "GNU Free Documentation
    License".

.. qnum::
   :prefix: func-1-
   :start: 1

Event Handlers
==============

An event handler is a function that you write that will get called automatically by the Python interpreter when the operating system (Windows, MacOS, Android, Linux, iOS, etc.) tells Python that an event happened in the window of a running Python program. If the end user clicks in the window where your Python program is running, that window gets the operating system focus. If the user then clicks on a user interface widget in that window, the operating system tells Python where the click happened and Python figures out if the click happened on a widget. If you have registered an event handler for mouse clicks on that widget, then that function is called.

We can generally think about two types of handlers. First there are widget handlers. These are functions you write that run code in response to the user interacting with the graphical user interface widgets you have put on screen. This may be clicking on a button, selecting an item from a drop-down menu, moving a slider, checking or unchecking a checkbox, entering text into an input field, or moving a scrollbar. The second type of handler is a more general mouse or keyboard handler. These handlers get called when the user performs actions with an input device, **while your program is the program in focus**. So, if the user has opened your Python program, but then switched over to type up a letter in MS Word, your Python program will not get the user's mouse input or keyboard input while they are working in MS Word. But, when the user switches back to your Python program, then your handlers will get their input actions and execute.

UI Widget Event Handlers
-------------------------

Widget event handlers get called in response to the end user interacting with a user interface widget/control that you have programmed to be displayed on screen. Some widget event handlers will have input parameters. You saw this in the previous section with the input text box: the handler for that widget needed a parameter, and that's how the text the user types can be accessed. The list below gives a sense of the types of information that would be passed automatically to an event handler for different types of user interface controls:

* text input box - the text the user enters (string)
* checkbox - whether the user checked or unchecked it (boolean)
* drop down menu - the item the user selected (string)
* slider - the value selected by the slider (integer or floating point number)
* scrollbar - the location of the scrollbar tab as a percent of the length of the scrollbar

Some inputs, like simple buttons, don't require any information to be passed, other than the fact that they were pressed, and so the event handler doesn't need any parameters. 

Window-Based Input Event Handlers
---------------------------------
Window-based input event handlers are called when the user types keys on the keyboard or uses their pointing device to click or drag in a work area of the window, such as on a drawing canvas or on text document. GUI toolkits use 'mouse' event terminology, even though in many cases the user is using something like a touchpad or touch screen gestures on a touch-sensitive tablet or laptop.

The operating system will notify the Python interpreter of any such events while your program is in focus on screen, but you must tell Python what type of events you want to respond to. This is done by registering an event handler. If you don't register a handler for an event your program won't respond to that event.

When you create input event handlers, you need to decide exactly what you want to respond to. Do you want to respond to a user when they press down the button on their pointing devices or when they lift up their finger off that button? Below is a list of common input events, along with the information that would likely be passed along to the handler function as parameters:

* mouse click - x and y coordinates, and which button (left, middle, right)
* mouse double-click - x and y coordinates, and which button (left, middle, right)
* mouse drag - x and y coordinates of current drag position
* mouse button down - x and y coordinates, and which button (left, middle, right)
* mouse button up - x and y coordinates, and which button (left, middle, right)
* mouse scroll wheel - x and y coordinates, scroll speed, scroll direction (up/down)
* mouse hover - x and y coordinates
* keypress - which key, and which modifier keys (SHIFT, CTRL, etc.)
* key up  - which key, and which modifier keys (SHIFT, CTRL, etc.)
* key down  - which key, and which modifier keys (SHIFT, CTRL, etc.)


Different GUI toolkits will handle events slightly differently. For example, some toolkits will allow you to register events for specific keys, while other toolkits will only allow you to register general key events and then pass you the information about what key was pressed. In this latter case, you need to use conditional statements inside the key event listeners to specify what code executes depending on what key was activated. The SimpleGUI module we are working with in this chapter only handles mouse click and drag and key up and down events. 

Event Handlers Are Short
-------------------------

It is fairly typical that event handler functions are really short. They often contain only one or two lines of code, and these lines just call some other functions. You might think, why not just put the code from those functions straight into the event handlers?


Let's look at a turtle example to think about this:

.. activecode:: ac11_6_1a
    :nocodelens:
   
    import turtle
    import random

    def random_square():
        """ draws a random square with a random small size 
            at turtle's current location
             Pre-Condition: Turtle name alex exists """
        side = random.randrange(10, 30) # get random size
        for _ in range(4): #draw a square in location
            alex.forward(side)
            alex.left(90)

    def move_to_location(x, y):
        alex.penup() 
        alex.goto(x,y) # move to location without drawing
        alex.pendown()


    def random_location():
        """ Take turtle to a random location on canvas
            Pre-conditions: Assume turtle is named alex, and
            canvas is 400 x 400 """
        x = random.randrange(-200, 200) # get random x location
        y = random.randrange(-200, 200) # get random y location
        move_to_location(x,y)

    def random_colour():
        """ Sets turtle to a random colour """
        alex.color(random.random(), random.random(), random.random())

    def key_r():
        """ draw randomly coloured and positioned square """
        random_location()
        random_colour()
        random_square()

    def key_c():
        """ get new random colour """
        random_colour()

    def key_q():
        """ close the canvas window """
        wn.bye()

    def click(x, y):
        """ go to clicked location and draw square """
        move_to_location(x,y)
        random_square()

    wn = turtle.Screen()      # Set up the window and its attributes
    alex = turtle.Turtle()    # create alex
    alex.speed(10)            # make alex draw fast
    random_colour()
    random_location()
    random_square()

    wn.onkey(key_r, 'r')    # tell the operating system to execute function 'key_r()' when the 'r' key is pressed on the keyboard
    wn.onkey(key_q, 'q')    # tell the operating system to execute function 'key_q()' when the 'q' key is pressed on the keyboard
    wn.onkey(key_c, 'c')    # tell the operating system to execute function 'key_c()' when the 'c' key is pressed on the keyboard
    wn.onclick(click)       # tell the operating system to execute function 'click' when the user clicks the mouse
    wn.listen()             # tell the operating system to listen for events on the canvas window

This turtle example registers function handlers for a mouse click event and three different key events. In the turtle module, you can register to listen for specific keys, which you will see is different than in the SimpleGUI module. But what you should pay attention to here is the fact that the code in these function handlers is just a few calls to other functions. Note that the move_to_location() function is called from the click event handler, but it is also called from inside the random_location function. Likewise, the random_colour() function is called from the key_r handler and the key_c handler. And the random_square() function is called from the key_r handler and the click handler. If we had put the code that is in random_square() into the click handler directly, we wouldn't be able to use it whenever we want. Remember than we **never call handler functions directly**, they only get called by the system. By putting the square drawing commands into a separate functon, we can call it from the main code (like on line 55), and from various different event handler functions. This organization gives us more flexibility. 

Registering Event Handlers
--------------------------

In addition to writing an event handler function (like the key_r() function in the turtle example above), you also need to register the event handler, so that the Python interpreter knows that you want to receive such events. In some toolkits, you register the event as a separate action. That is the case in the turtle example above, where the last five lines of the program regiseter event handlers. The very last line basically tells the Python interpreter - okay now start listening! In the SimpleGUI module, you register handlers in the same line of code that you use to create the user interface widget (for buttons and textboxes), but you have separate instructions to register the more general event handlers that respond to key presses and mouse clicks. 

In all cases, once you have added GUI elements to the window, written the event handlers, and registered the event handlers, you need something to tell the Python interpreter to start listening for events (in the Turtle module it's ``wn.listen()`` in the SimpleGUI module it's ``frame.start()``).

