# Dialog Popup

A "module" to easily display a popup box on the FitBit Ionic watch.  Will probably work on the Versa but I have not tested it on that model.

## Overview

I was a little frustrated at the lack of a simple popup box.  I found the design guide for a popup but it isn't setup to be used multiple times.  Sometimes you just need to have a short conversation with the user.  Something like: Exit:  Are you sure? Yes/No.  On Yes, ask : Save data? Yes/No/Cancel ...   And sometimes it's just a quick OK that you need. 

## Features

- Easy to add to an existing application.
- Includes the option to display Yes/No/Cancel buttons as well as OK/Cancel with the Cancel button as an option.
- Includes a complete example application.
- Includes an option to capture the physical button press (especially useful to capture the back button).
- Uses callbacks to implement the actions for each button.
- Simple to use.
- Examples
  - Display an OK popup: 
	```javascript 
		DialogShow("Data saved","OK"); 
	```
  - Display a popup before exiting the app: 
	```javascript 
		DialogShow("Exit: Are you sure?","YN","N",function(Answer){if (Answer=="Y"){me.exit();}});
	```

## Process
Show Dialog -> Capture Answer -> Hide Dialog -> Execute function (if one)

If an action is required, pass in a function to be executed.  When a button is pressed, the function is executed and passed a string for the button pressed: "Y", "N", "OK" or "C".   If the desired action is to simply end the dialog, pass in an empty string for the function.  That will simply end the dialog.

## Installation

1. Download and unzip the project.
1. Copy Dialog.js into your app folder.
1. Copy the Dialog.gui into your resources folder.
1. Add a link in index.gui for Dialog.gui:
```    
        <svg>
      .....your page.....

          <link  rel="import" href="Dialog.gui" />

        </svg>
 ```   
5. Add the import below into your index.js file:
```
       import * as DIA from "./Dialog";
```    
6. If an option is to exit, you may also need to add:
```
       import { me } from "appbit";
```    
7. Add this import to your widgets.gui file:
```
    <link rel="import" href="/mnt/sysassets/widgets/square_button_widget.gui" />  
```

## Using the Dialog
A complete example application is included.  Look at the index.js file for examples.

- There are two functions that can be called:
```javascript
  
  DialogSetup(Question,Type,DefaultButton,CallbackFunction,Physical Key);
  DialogShow(Question,Type,DefaultButton,CallbackFunction);

```
### DialogSetup 
If you want to capture the physical button and you're not already doing so for any physical button, you can call the DialogSetup function to implement the listen event and disable the default behavior to exit.  That call would look something like this:
```javascript

   DIA.DialogSetup("\nExit: Are you sure?","YN","N",ExitAns,"back");

```
In this example, the dialog displays when the back button is pressed.  Yes and No buttons are displayed along with the question to exit.  The No button is highlighted.  The default action, to exit, is disabled automatically by the function.  

### DialogShow
You can also add code to call the Dialog without calling the setup function.  The setup function is ONLY called if you need to capture the physical key.  In your application you can simply add code like this to display an OK/Cancel dialog with a function to be executed when the user press OK:
```javascript

	DIA.DialogShow("\nData saved","OKC","",function(Answer){if (Answer=="OK"){me.exit();}});

```

**Examine the index.js file for examples**

## Function Parameters
Parameters for DialogSetup and DialogShow are identical except the Key parameter is dropped for the DialogShow method:
```javascript

  DIA.DialogSetup(Question,Type,DefaultButton,Yes/OK Function,No function, Cancel Function,Physical Key);
  DIA.DialogShow(Question,Type,DefaultButton,Yes/OK Function,No function, Cancel Function);

```
```
         Question: Max about 50 characters. Max of 2 lines. 
                   Note: If the question is short you can push it down to the second line
                   by starting it with \n.
      Dialog Type: "YN", "YNC", "OK", "OKC" Default is YN, or YNC if the cancel method is defined.
   Default Button: Values:Y or N This is the button that will be highlighed in the YNC type.
Callback Function: The function that will be executed when the user presses a button.
                   Pass in an empty string if there's no need for any action. Cancel is often
                   setup this way.  Annonymous functions can also be passed in.  See the 
                   AnsSaveNo() function for an  example.
                   The callback function is passed a string inidicating which button was pressed: 
                   "Y", "N", "OK" or "C".
     Physical Key: Use this to capture the pushed event for one of the physical keys.  If
                   you already have the pushed event captured, use the code in Dialog.js
                   as an example to capture the back button and NOT exit automatically.
                   The values are the same as the keys: back, up, down.

```
## Notes: Default Action
1. If DialogSetup is used to set a physical key, a second press of that physical key while the dialog is displayed, will end the dialog.  This was originally setup for the back button and doesn't make as much sense if the up or down buttons are used but it can be commented out if not needed.

 