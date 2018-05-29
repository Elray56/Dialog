# Dialog Popup

A "module" to easily display a popup box on the FitBit Ionic watch.  Will probably work on the Versa but I have not tested it on that model.

## Overview

I was a little frustrated at the lack of a simple popup box.  I found the design guide for a popup but it isn't setup to be used multiple times.  Sometimes you just need to have a short conversation with the user.  Something like: Exit:  Are you sure? Yes/No.  On Yes, ask : Save data? Yes/No/Cancel ...   And sometimes it's just a quick OK that you need. 

## Features

-Easy to add to an existing application.
-Includes the option to display Yes/No/Cancel buttons as well as OK/Cancel with the Cancel button as an option.
-Includes a complete example application.
-Includes an option to capture the physical button press (especially useful to capture the back button).
-Uses callbacks to implement the actions for each button.
-Simple to use.
-Examples
	--Display an OK popup: DialogShow("Data saved","OK");
	--Display a popup before exiting the app: DialogShow("Exit: Are you sure?","YN","N",function(){me.exit();});

##Process
Show Dialog -> Capture Answer -> Hide Dialog -> Execute function (if one)

Each button can have a function associated with it, a callback.  When the button is pressed, the function is executed.  If the desired action is to simply end the dialog, pass in an empty string for the function.  That will simply end the dialog.

##Installation

-Download and unzip the project.
-Copy Dialog.js into your app folder.
-Copy the Dialog.gui into your resources folder.
-Add a link in index.gui for Dialog.gui:
    <svg>
      .....your page.....
          <link  rel="import" href="Dialog.gui" />
        </svg>
    
-Add the import below into your index.js file:
       import * as DIA from "./Dialog";
    
-If an option is to exit, you may also need to add:
       import { me } from "appbit";
    
-Add this import to your widgets.gui file:
    <link rel="import" href="/mnt/sysassets/widgets/square_button_widget.gui" />  


##Using the Dialog
A complete example application is included.  Look at the index.js file for examples.

--There are two functions that can be called:

---DialogSetup(Question,Type,DefaultButton,Yes/OK Function,No function, Cancel Function,Physical Key)
---DialogShow(Question,Type,DefaultButton,Yes/OK Function,No function, Cancel Function)

--If you want to capture the physical button and you're not already doing so for any button, you can call the DialogSetup function to implement the listen event and disable the default behavior to exit.  That call would look something like this:
   
   DialogSetup("\nExit: Are you sure?","YN","N",AnsYes,AnsNo,"","back");

In this example, the dialog displays when the back button is pressed.  Yes and No buttons are displayed along with the question to exit.  The No button is highlighted.  The default action, in this case, to exit, is disabled automatically by the function.  


--You can also add code to call the Dialog without calling the setup function.  The setup function is ONLY called if you need to capture the physical key.  In your application you can simply add code like this to display an OK/Cancel dialog with a function to be executed when the user press OK:

	DialogShow("\nData saved","OKC","",function(){me.exit();});

`Examine the index.js file for examples.`

Parameters for DialogSetup and DialogShow are identical except the Key parameter is dropped for the DialogShow method: 
         Question: Max about 50 characters. Max of 2 lines. 
                   Note: If the question is short you can push it down to the second line
                   by starting it with \n.
      Dialog Type: "YN", "YNC", "OK", "OKC" Default is YN, or YNC if the cancel method is defined.
   Default Button: Values:Y or N This is the button that will be highlighed in the YNC type.
  Yes/OK Function: The function that will be executed when the Yes or OK button is clicked.
                   For this and the next two buttons, pass in an empty string if there's
                   no need for any action. Cancel is often setup this way.  Annonymous 
                   functions can also be passed in.  See the AnsSaveNo() function for an 
                   example.
      No Function: The function that will be executed when the No button is clicked
  Cancel Function: The function that will be executed when the Cancel button is clicked
     Physical Key: Use this to capture the pushed event for one of the physical keys.  If
                   you already have the pushed event captured, use the code in the Dialog.js
                   file as an example to capture the back button and NOT exit automatically.
                   The values are the same as the keys: back, up, down.



There are some default actions within the dialog:
(1) If DialogSetup is used to set a physical key, a second press of that physical key while the dialog is displayed, will end the dialog.  This was originally setup for the back button and doesn't make as much sense if the up or down buttons are used but it can be commented out if needed.
(2) The dialog types YN and OK become YNC and OKC, respectively, if the cancel function is supplied.  The reverse is not true, YNC and OKC types will always display the Cancel button whether a cancel method is defined or not.

 
