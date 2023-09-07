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

Event-Based Programming Made Elegant
====================================

There is a way to do event-based programming that doesn't involve having lots of global variables to keep track of the state of the program. The solution is to use objects. In this section you'll get a simple introduction to object-oriented programming, and then you can see how the event-based program from the last section can be rewritten in a way that is more elegant, uses no global variables, and is much more easy to extend with new features. 

.. caution::

   This section is long and involved. If you have gotten to this point in the chapter and your brain is exhausted, you can skip this section and go to the next one. You can always come back and read this later. The content here is not going to be tested. But, if you are interested in what comes later in computer programming, or how to make a more elegant version of the event-based example in the last section, read on!


A Simple Class Example
----------------------

Object-oriented code is often referred to as 'OO-code' for short. In OO programming, you create objects to represent things in your program. Instead of having a variable for student number, a variable for student name, and a variable for student grade, you can have a single student object that stores all of that related information together.  

Objects are things that have properties and methods. As an example, a dog has properties that describe the dog (fur color, breed, name, barking sound, name of human owner, age, etc.) and methods that define what it can do (bark, eat, sleep, fetch, etc.). Quite often, calling a method leads to the properties being updated. In object-oriented programming, we create **classes**, which you can think of as blueprints, and from any class you can create objects of that class. So, we could create a general class that can be used to make dog objects:

.. code-block:: python
   :linenos:

    class Dog:
        name = ""
        breed = ""
        fur_color = ""
        owner_name = ""
        bark_sound = ""
        num_balls_fetched = 0
        num_barks = 0

        def __init__(self, breed, name, owner, fur_color, bark_sound):
            self.breed = breed
            self.name = name
            self.owner_name = owner
            self.bark_sound = bark_sound

        def fetch(self):
            print(self.name + " fetched a ball!")
            self.num_balls_fetched += 1

        def bark(self):
            print(self.bark_sound)
            self.num_barks += 1


And then, we can ask the class to give us a dog, specifying properties of the dog we want:

.. code-block:: python

    bingo = Dog("beagle", "Bingo", "Angie", "brown and white", "Hawoooooooooooo")

The above line of code says create a Dog object, with the following information. It calls a special method inside the Dog class called a **constructor**. In Python a constructor is the method that has the special name __init__. The constructor constructs a new Dog object with the given information and returns a reference to the dog. In the line above the new Dog object is referenced by the bingo variable. Visually, this looks like this:

.. image:: Figures/dog_class_diagram.png
    :width: 800
    :align: center

Once we have a variable that refers to a Dog object, we can call that object's methods and read from or write to its properties:

.. code-block:: python

    bingo.fetch()
    bingo.bark()  
    bingo.fetch()
    print(bingo.num_barks)
    print(bingo.num_balls_fetched)

    CONSOLE OUTPUT:

    > Bingo fetched a ball!
    > Hawoooooooooooo
    > Bingo fetched a ball!
    > 1
    > 2

Now, you may be looking at this and thinking "Why do we need a class? We could just set up a few variables to store information about Bingo the dog and it would be a lot simpler!"

But, what if you want to represent many different dogs in your program? Imagine you are programming a simulation to understand dog over-crowding in animal shelters. Let's look at how we can work with multiple dogs using the class above. 

.. code-block:: python
    :linenos:
        
    import random

    bingo = Dog("beagle", "Bingo", "Angie", "brown and white", "Hawoooooooooooo")
    maxine = Dog("golden retriever", "Maxine", "Tom", "gold", "Woooofff")
    fido = Dog("german shepherd", "Fido", "Ellen", "brown and black", "Arrroooof")
    sparky = Dog("yorkshire terrier", "Sparky", "Davina", "blond", "Yip")
    queenie = Dog("mixed breed", "Queenie", "Ellen", "black and grey", "Arf")

    # put dogs into a list
    dogs = [bingo, maxine, fido, sparky, queenie]

    # simulate a bunch of dogs playing
    for _ in range(20):
        # make a random dog bark
        bark_index = random.randrange(len(dogs))
        dogs[bark_index].bark()
        # make a random dog fetch
        fetch_index = random.randrange(len(dogs))
        dogs[fetch_index].fetch()

    # print out what each dog did
    for dog in dogs:
        print(dog.name + " barked " + str(dog.num_barks) + " times and fetched "
              + str(dog.num_balls_fetched) + " balls")

Now, using the Dog class, we have created five different dogs, with a bunch of different information about each, and we haven't had to create 25+ separate variables in our code to represent all of these dogs' features. Then, we add our dog objects to a list. Then we can start to simulate dog play by picking random dogs from the list and calling the bark() or fetch() methods for those dogs. On lines 22-24, we then iterate across the list of dogs and report how many times each dog barked and how many balls each dog fetched. If you look at the Dog class, you'll see that we have two property variables to keep track of the number of barks and the number of balls fetched. Every time we call the bark() method on a particular dog, that method increments that variable. What's critical to understand here is that each dog has their own variable to keep track of the number of barks. You can see that in the sample console output below. You see the print statement "Sparky fetched a ball!" five times. And then if you look at the print statements at the bottom, it says Sparky barked once and fetched 5 balls. This is the power of object oriented programming: grouping things together into classes, creating objects from those classes, and calling methods on those objects.

.. code-block:: python

    CONSOLE OUTPUT:
    > Arf
    > Sparky fetched a ball!
    > Hawoooooooooooo
    > Bingo fetched a ball!
    > Hawoooooooooooo
    > Queenie fetched a ball!
    > Hawoooooooooooo
    > Fido fetched a ball!
    > Hawoooooooooooo
    > Queenie fetched a ball!
    > Arf
    > Sparky fetched a ball!
    > Woooofff
    > Fido fetched a ball!
    > Arrroooof
    > Sparky fetched a ball!
    > Arrroooof
    > Queenie fetched a ball!
    > Woooofff
    > Queenie fetched a ball!
    > Woooofff
    > Queenie fetched a ball!
    > Arf
    > Sparky fetched a ball!
    > Arrroooof
    > Sparky fetched a ball!
    > Arf
    > Fido fetched a ball!
    > Hawoooooooooooo
    > Queenie fetched a ball!
    > Woooofff
    > Fido fetched a ball!
    > Woooofff
    > Fido fetched a ball!
    > Woooofff
    > Maxine fetched a ball!
    > Woooofff
    > Fido fetched a ball!
    > Yip
    > Queenie fetched a ball!
    > Bingo barked 5 times and fetched 1 balls
    > Maxine barked 7 times and fetched 1 balls
    > Fido barked 3 times and fetched 6 balls
    > Sparky barked 1 times and fetched 5 balls
    > Queenie barked 4 times and fetched 7 balls


The Event-Based GUI Example - OO Style
---------------------------------------
Now, you may be wondering, "Okay, but what does this have to do with event-based programming?". In event-based programming, we can create a class that stores important information about the state of our program, and use methods to have things happen in the program in response to user interface events. In the example from the previous section, we created a program that allowed the user to draw with colored circles and stamp text. So, for that program, we can create a class to represent the circles, another class to represent text stamps, and a class to represent the overall drawing context.

Below is the object-oriented version of the SimpleGUI example. Note that there are no global variables at the top. Other than variables for the window frame and buttons at the bottom of the code, the only other global variable in this code is ``dc``, which is the reference variable to the drawing context object created on line 222. Look carefully at the object classes defined on lines 95-215. In object-oriented programming, the bulk of the code is in the definition of the objects: defining the properties and the methods that can be called on the objects. 

.. code-block:: python
   :linenos:

    # """""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
    # Dr. Celine's COMP 1000 Event-based Programming Example OO Version
    # """""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

    import simplegui

    ################################################################
    # GUI Control Handlers
    ################################################################
        
    def draw(canvas):
        """
        Draw handler, called automatically, many times/sec, by SimpleGUI module
        DO NOT call this function from other parts of the code.
        In this version, we just call the drawing context and ask it to draw itself
        """
        dc.draw(canvas)
        
    def clear_handler():
        """
        Gets called when clear button is clicked
        Clears all lists to remove content from canvas
        """
        dc.clear_canvas()
        
    def bkg_handler():
        """
        Background toggle button - toggles between white and grey
        """
        dc.toggle_bkgd_color()
            
    def lw_up_handler():
        """ 
        Linewidth + handler 
        """
        dc.change_line_width(True)
        
    def lw_dn_handler():
        """ 
        Linewidth - handler 
        """
        dc.change_line_width(False)
           
    def stamp_txt_handler(txt):
        """ 
        Stamp text input box handler
        When user types in text and then hits the enter key, this is called
        """
        dc.set_stamp_text(txt)

    ###########################################################
    # Input Device Event Handlers
    ###########################################################

    def drag(pos):
        """
        Mouse drag handler. Takes one parameter:
            a tuple of the current position of the mouse
        Called continuously while user is dragging - add a new circle
        """
        dc.add_circle(pos)
        
           
    def click(pos):
        """
        Mouse click handler, Takes one parameter:
            a tuple of the position of the mouse at moment of click
        """
        dc.add_text_stamp(pos)

        
    def key_handler(key):
        """
        Handles key presses, updates global variable fill_col
        """
        if chr(key) == 'R':
            dc.set_fill_color("Red")
        elif chr(key) == 'G':
            dc.set_fill_color("Green")
        elif chr(key) == 'B':
            dc.set_fill_color("Blue")
        elif chr(key) == 'C':
            dc.clear_canvas()
        elif key == 38:
            dc.change_line_width(True)
        elif key == 40:
            dc.change_line_width(False)
        else:
            #do nothing
            print("Unknown key event. Try pressing r, g, or b")
            print("key is:", key)
            return 
        
        
    ######################################################
    # OBJECT CLASSES
    ######################################################
    class Circle:
        """
        Stores information about a circle, and has a draw method
        to draw the circle on the canvas
        """
        
        def __init__(self, rad, fc, lc, lw, pos):
            self.radius = rad
            self.fill_col = fc
            self.line_col = lc
            self.line_wid = lw
            self.pos = pos
            
        def draw(self, canv):
            canv.draw_circle(self.pos, self.radius, self.line_wid, self.line_col, self.fill_col)
            
    class Text_Stamp:
        """ 
        Stores information about a text stamp, and has a draw method
        to draw the stamp on the canvas
        """
        
        def __init__(self, fs, col, pos, txt):
            self.fontsize = fs
            self.color = col
            self.pos = pos
            self.text = txt
            
        def draw(self, canv):
            canv.draw_text(self.text, self.pos, self.fontsize, self.color)
            
    class Drawing_Context:
        """
        Stores all the information about the current drawing state
        Including what has already been drawn (list of circles & list of text stamps)
        Has a draw method to draw everything on the canvas
        """
        CANVAS_WIDTH = 400
        CANVAS_HEIGHT = 400
        line_col = "Black"
        line_wid = 3
        fill_col = "Red"
        stamp_text = "Hello!"
        fontsize = 12
        radius = 10
        canvas_col = "Grey"
        
        # list vars to store circles/stamps that have been drawn
        circle_list = []
        stamp_list = []
        
        # boolean variables to differentiate mouse click/drag
        dragged = False

        def clear_canvas(self):
            """
            Clears all lists to remove content from canvas
            """
            self.circle_list.clear()
            self.stamp_list.clear()

        def change_line_width(self, up):
            """
            Increases line width by 1 if true is passed, 
            otherwise, decreases line width
            """ 
            if (up): # increase
                if self.line_wid < 5:
                    self.line_wid += 1
            else: # decrease
                if self.line_wid > 1:
                    self.line_wid -= 1
            lw_label.set_text("Line width: " + str(self.line_wid))

        def set_fill_color(self, col):
            """ Sets fill color for subsequent drawing """
            self.fill_col = col
            fc_label.set_text("Fill color: " + str(self.fill_col)) 

        def set_stamp_text(self, txt):
            """ sets stamp text for subsequenet drawing"""
            self.stamp_text = txt
            text_stamp_label.set_text("Text stamp: " + self.stamp_text)
            inp.set_text("") # resets input field to blank
            
        def toggle_bkgd_color(self):
            """ toggles canvas background between grey & white """
            if (self.canvas_col == "Grey"):
                self.canvas_col = "White"
                bkg_button.set_text("Grey Background")
            else:
                self.canvas_col = "Grey"
                bkg_button.set_text("White Background")
            frame.set_canvas_background(self.canvas_col)
            
        def add_circle(self, pos):
            """ creates a new circle object and adds it to list """
            circle = Circle(self.radius, self.fill_col, self.line_col, self.line_wid, pos)
            self.circle_list.append(circle)
            self.dragged = True # differentiate end of drag from click
            
        def add_text_stamp(self, pos):
            """ creates a new text stamp object and adds it to list """
            if self.dragged: 
                # this was just the end of drag, don't make stamp
                self.dragged = False
            else:
                stamp = Text_Stamp(self.fontsize, self.fill_col, pos, self.stamp_text)
                self.stamp_list.append(stamp)
            
        def draw(self, canvas):
            """ draw everything - iterate through circle & stamp lists """
            for circ in self.circle_list:
                circ.draw(canvas)

            for stamp in self.stamp_list:
                stamp.draw(canvas)
        
            
    #######################################################
    # Set up window, GUI controls & register event handlers
    #######################################################

    # Create a drawing context
    dc = Drawing_Context()

    # Frame
    frame = simplegui.create_frame("COMP 1000 Demo", dc.CANVAS_WIDTH, dc.CANVAS_HEIGHT) 
    frame.set_canvas_background(dc.canvas_col)

    # Create & Register Buttons & Labels
    # labels + bkgd button assigned to variables so they can be updated
    frame.add_button('Clear', clear_handler)
    bkg_button = frame.add_button('White Background', bkg_handler)
    fc_label = frame.add_label("Fill color: " + dc.fill_col) 
    lw_label = frame.add_label("Line width: " + str(dc.line_wid))
    frame.add_button('+', lw_up_handler)
    frame.add_button('-', lw_dn_handler)
    text_stamp_label = frame.add_label("Text stamp: " + dc.stamp_text)
    inp = frame.add_input('New text stamp:', stamp_txt_handler, 50)

    # Register Keyboard and Mouse Event Handlers
    frame.set_draw_handler(draw)
    frame.set_keydown_handler(key_handler)
    frame.set_mousedrag_handler(drag)
    frame.set_mouseclick_handler(click)

    # Show the frame and start listening
    frame.start()

Most of the functions that were in the previous version are now methods of the drawing context object. And most of the variables that were global variabbles before are now properties of the drawing context. 

The ``Circle`` and ``Text_Stamp`` classes collapse the information from the prior version. In the previous version if we had three text stamps, we would have three entries in three separate lists, and if we wanted to be able to store different font sizes for each text stamp, we would have had to add a fourth list. In this version, the information for each text stamp is stored as properties of that Text_Stamp object. You can see that the Text_Stamp class already has fontsize as a property, so in this new version, it would be very easy to change the program so that every text stamp could have a different font size: we would just add + and - buttons (similar to the line width buttons we already have) and added a font_change() method to the Drawing_Context class. Then, when we create a new text stamp, we would use the current font size. 

Below is a class diagram that shows the relations between the classes in this version:

.. image:: Figures/drawing_class_diagram.png
    :width: 800
    :align: center


If you look closely at the code for this object-oriented version of the circle and stamp drawing program, you will notice that we never have to use the keyword global to specify that we are changing a global variable. We are using ``dc``, which is a global reference variable to the drawing context, but we are never overwriting that variable. Instead, we are calling that variable's methods and properties to access and make changes to the drawing context. This is a much cleaner and more elegant version, with the same functionality. This version of the program is also easier to extend with new features. If looking at this version of the program seems very confusing to you - don't stress about it. You have lots of time to learn about object-oriented approaches to programming in future courses. 
