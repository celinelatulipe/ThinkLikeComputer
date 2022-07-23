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

A Complete Event-Based GUI Example
==================================

In this chapter we have shown the steps in creating an event-based graphical program that gives the end user an interface and working area or canvas. The steps are:

* Set up any global variables that are neceesary
* Create GUI controls
* Create handler functions for the controls
* Create handler functions for input on the working area or canvas
* Register the event handlers for the controls
* Register input listeners for keyboard and mouse events on the canvas
* Create a draw() function that draws the working area of canvas
* Tell the Python interpreter to start listening for events on the canvas and the controls

We've shown these steps in bits and pieces, and in this chapter, we want to show a more complex example that pulls all of this together in one program. The complete example is shown below. You shoould copy and paste this into a blank CodeSkulptr3 window to run it and see how it works. The code is fairly well commented, but in the text below the code we draw your attention to some important aspects of how this all works together. 

.. code-block:: python
    :linenos:

    # """"""""""""""""""""""""""""""""""""""""""""""""""""""
    # Dr. Celine's COMP 1000 Event-based Programming Example
    # """"""""""""""""""""""""""""""""""""""""""""""""""""""

    import simplegui

    # Global Variables
    CANVAS_WIDTH = 400
    CANVAS_HEIGHT = 400
    # current drawing state
    line_col = "Black"
    line_wid = 3
    fill_col = "Red"
    stamp_text = "Hello!"
    radius = 10
    fontsize = 12
    canvas_col = "Grey"
    # list vars to store circles that have been drawn
    circle_list = []
    circle_col_list = []
    circle_line_wid_list = []
    # list vars to store text stamps that have been drawn
    text_list = []
    text_pos_list = []
    text_col_list = []
    # boolean variable to differentiate clicks/drags 
    dragged = False

    ################################################################
    # GUI Control Handlers
    ################################################################
        
    def clear_handler():
        """
        Gets called when clear button is clicked
        Clears all lists to remove content from canvas
        """
        clear_canvas()
        
    def undo_handler():
        """ 
        Gets called when user presses undo button
        """
        undo()
        
    def bkg_handler():
        """
        Background toggle button - toggles between white and grey
        """
        toggle_background()
            
    def lw_up_handler():
        """ 
        Linewidth + handler 
        """
        change_line_width(True)
        
    def lw_dn_handler():
        """ 
        Linewidth - handler
        """
        change_line_width(False)
           
    def stamp_txt_handler(txt):
        """ 
        Stamp text input box handler
        When user types in text and then hits the enter key, this is called
        """
        set_stamp_text(txt)

    def draw(canvas):
        """
        Draw handler, takes canvas as input, keeps canvas up to date
        This is called automatically, many times/second, as part of the SimpleGUI module
        DO NOT call this function from other parts of the code
        """
        for index in range(len(circle_list)):
            canvas.draw_circle(circle_list[index], radius, circle_line_wid_list[index], line_col, circle_col_list[index])
        
        for index in range(len(text_list)):
            canvas.draw_text(text_list[index],text_pos_list[index], fontsize, text_col_list[index])

    ###########################################################
    # Input Device Event Handlers
    ###########################################################

    # Handler for mouse drag events. Takes one parameter:
    #	a tuple of the current position of the mouse
    # This gets called continuously while the user is dragging
    def drag(pos):
        """
        Mouse drag handler
        """
        add_circle(pos)
        
    # Handler for mouse click events. Takes one parameter:
    #	a tuple of the position of the mouse at moment of click   
    def click(pos):
        """
        Mouse click handler, if a real click (not end of drag)
        this adds a text stamp to the canvas at location of click
        """
        add_text_stamp(pos)
        
    # Keypress handler
    def key_handler(key):
        """
        Handles key presses
        """
        if chr(key) == 'R':
            set_fill_color("Red")
        elif chr(key) == 'G':
            set_fill_color("Green")
        elif chr(key) == 'B':
            set_fill_color("Blue")
        elif chr(key) == 'C':
            clear_canvas()
        elif key == 38:
            change_line_width(True)
        elif key == 40:
            change_line_width(False)
        else:
            #do nothing
            print("Unknown key event. Try pressing r, g, or b")
            print("key is:", key)
            return 
        
           
    ###############################
    # Other Functions
    ###############################

    def clear_canvas():
        """
        Clears all lists to remove content from canvas
        """
        circle_list.clear()
        circle_col_list.clear()
        circle_line_wid_list.clear()
        text_list.clear()
        text_pos_list.clear()
        text_col_list.clear()
        
    def change_line_width(up):
        """
        Increases line width by 1 if true is passed, 
        otherwise, decreases line width
        """ 
        global line_wid
        if (up): # increase
            if line_wid < 5:
                line_wid += 1
        else: # decrease
            if line_wid > 1:
                line_wid -= 1
        lw_label.set_text("Line width: " + str(line_wid))
        
    def set_fill_color(col):
        """ updates fill color for subsequent drawing, updates label """
        global fill_col
        fill_col = col
        fc_label.set_text("Fill color: " + str(fill_col)) 
        
    def toggle_background():
        """ Toggle canvas background between white & grey
            updates button text """
        if (bkg_button.get_text() == 'White Background'):
            canvas_col = "White"
            bkg_button.set_text('Grey Background')
        else:
            canvas_col = "Grey"
            bkg_button.set_text('White Background')
        frame.set_canvas_background(canvas_col)
            
    def set_stamp_text(txt):
        """ updates stamp text for subsequent drawing, update label """
        global stamp_text
        stamp_text = txt
        text_stamp_label.set_text("Text stamp: " + stamp_text)
        inp.set_text("")
        
    def add_text_stamp(pos):
        """ 
        if this is a real click (not end of drag)
        add a new text stamp to the list of text stamps
        """
        global dragged, can_undo, prev_draw_is_text
        if dragged: 
            # this was just the end of drag, not a real click
            # don't do anything
            dragged = False
        else:
            # this is a real click, so add a new text stamp
            text_list.append(stamp_text)
            text_pos_list.append(pos)
            text_col_list.append(fill_col)

    def add_circle(pos):
        """ Add a circle to the circle list"""
        global dragged, can_undo, prev_draw_is_text
        circle_list.append(pos)
        circle_col_list.append(fill_col)
        circle_line_wid_list.append(line_wid)
        dragged = True # need to store this to differentiate end
                        # of click from a regular mouse click
            
    #######################################################
    # Set up window, GUI controls & register event handlers
    #######################################################

    # Frame
    frame = simplegui.create_frame("COMP 1000 Demo", CANVAS_WIDTH, CANVAS_HEIGHT) 
    frame.set_canvas_background(canvas_col)

    # Create & Register Buttons & Labels
    # assign labels and bkgd button to vars for updating
    frame.add_button('Clear', clear_handler)
    bkg_button = frame.add_button('White Background', bkg_handler)
    fc_label = frame.add_label("Fill color: " + str(fill_col)) 
    lw_label = frame.add_label("Line width: " + str(line_wid))
    frame.add_button('+', lw_up_handler)
    frame.add_button('-', lw_dn_handler)
    text_stamp_label = frame.add_label("Text stamp: " + stamp_text)
    inp = frame.add_input('New text stamp:', stamp_txt_handler, 50)


    # Register Keyboard and Mouse Event Handlers
    frame.set_draw_handler(draw)
    frame.set_keydown_handler(key_handler)
    frame.set_mousedrag_handler(drag)
    frame.set_mouseclick_handler(click)

    # Show the frame and start listening
    frame.start()

The code uses big comments with lots of #### marks to section off different parts: the global variables at the top (lines 7-27), the function handlers for GUI controls (lines 29-82) and for input device events (lines 83-127), other functions (lines 129-206) and then the code at the bottom that sets up the GUI, registers the event handlers and tells Python to start listening (lines 208-235).

The way this code works is that there is some drawing state that is saved in the collection of global variables. As the user interacts with the canvas, circles are drawn when the user drags and text is stamped when the user clicks. The color and size of the circles, the color and fontsize of the text, and the background color of the canvas are determined by the values of the global variables. By interacting with the GUI controls, the user can change some of these things (the fill color of the circles/text, the outline width for the circles). The user can also change the value of the text stamp by typing text into the text input box and hitting enter. Whenever such changes are made, they only impact subsequent drawing actions on the canvas. 

Everything that the user draws on the canvas (which in this case is only circles and text stamps) is stored in a series of lists. There are three 'parallel' lists to store information about the circles: the position, the color, and the outline width. So, everytime a new circle is made because the user continues to drag the mouse, a position, a color and an outline width is added to the three lists that store this information. Thus, these three lists will always all bbe the same length. Similarly, everytime the user clicks on the canvas, a text stamp is added. This involves storing the position, the text string, and the color, in three separate lists. 

Some of the drawing state is change via key presses. To change the fill color for circles/text, the user has to press 'r', 'g', or 'b' on their keyboard (see lines 110-121, which all call the set_fill_color() function on lines 159-163).

The user can clear the canvas two ways: by pressing the clear button, or by pressing 'c' on the keyboard. Note that both of these handlers do the same thing: they call the clear_canvas() function. In fact, all of the handlers simply call another function that does the work. While we could have just put the code directly in the handler, it is better to have separate functions so that the code can be invoked in other ways. 

The canvas background color is not something that we have to draw as part of the draw() method - it is drawn automatically for us by the SimpleGUI module. We can specify the color of the background, though, which we do after we create the initial frame, see lines 212 and 213. In addition, the user can toggle the background color between grey and white by pressing the <color> background button. Note that this button always shows the *other* color. So, if the background is currently grey, the button says "White background" telling the user what will happen if they press the button. If you look at the code for the toggle_background() function on lines 
164-173, you'll note that this code checks what the current background color is, sets the background color to the other one, sets the button to label to say the opposite, and then calls the SimpleGUI frame method, set_canvas_background() to actually update the canvas background color.

Global Variables in Event-Based Programs
----------------------------------------
As you look through this code, you might have observed that we have been editing global variables throughout. You may be thinking "I thought we weren't supposed to do that???". Remember that the typical way to avoid using global variables is to pass the information around as parameters and return values. But when the action in the program is handled by event handlers that the Python system calls, we can't add arbitrary parameters, and we don't want to return values to the operating system that called our event handler functions. That is why we are having to write new values to these global variables. This is okay for this class, because you are just learning. But it isn't elegant, and programmers like things to be elegant. Most programmers would consider the code above to be quite clunky because of the use of global variables and parallel lists to store information about circles and text stamps. 

You may be wondering if there is a better way to do this. And there is. The better way to handle sets of information like what we see in this example is through object-oriented programming. You've played with object-oriented programming a bit already - we introduced it in Chapter 4 when we introduced the Turtles module. In using Turtles you have been
creating objects (turtles and screens) and calling methods of objects (like forward() and pen_down()). In the next section, you will see a version of the program above completely rewritten in an object-oriented fashion, and not a single global variable is assigned in any of the functions. 


TODO: add some exercises interspersed above: have them add more colours, have them make the font size vary by adding three font size buttons (small, med, large). 
