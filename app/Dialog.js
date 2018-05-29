import document from "document";
import { me } from "appbit";

const debug=true;

/*Parameters for DialogSetup and DialogShow are identical except the Key parameter is dropped
  for the DialogShow method: 
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
*/

//Call this method if you want to use one of the physical
// keys to show the dialog.
export function DialogSetup(Question,Type,DefaultAns,YesMethod,NoMethod,CancelMethod,Key)
{
  if (Key != undefined && Key != "")
  {
    document.onkeypress = (evt) => 
    {
      if( evt.key == Key ){
        evt.preventDefault();
        //If the same key was pressed and the dialog is already displayed,
        //  remove the dialog
        if (document.getElementById("Dialog").style.display == "inline")
        {
          document.getElementById("Dialog").style.display="none";
          return;
        }
        DialogShow(Question,Type,DefaultAns,YesMethod,NoMethod,CancelMethod);
      }
    }
  }
}

export function DialogShow(Question,Type,DefaultAns,YesMethod,NoMethod,CancelMethod)
{
  var EDS=document.getElementById("Dialog");
  if (EDS==undefined) return;
  EDS.style.display = "inline";
  document.getElementById("DIA_Question").text=Question;
  if (Type == "OK" || Type == "OKC")
  {
    //Setup for the OK button
    document.getElementById("DIA_btnYes").style.display="none";
    document.getElementById("DIA_btnNo").style.display="none";    
    document.getElementById("DIA_btnOK").style.display="inline";
    if (Type == "OKC" || (CancelMethod != undefined && CancelMethod != ""))
    {
      document.getElementById("DIA_btnCancel").style.display="inline";
    }
    else
    {
      document.getElementById("DIA_btnCancel").style.display="none";
    }
    document.getElementById("DIA_btnOK").onclick  = () =>{ ButtonPressed(YesMethod); };
    document.getElementById("DIA_btnCancel").onclick  = () =>{ ButtonPressed(CancelMethod); };
    return;
  }
  //Setup Yes/No/Cancel options
  document.getElementById("DIA_btnYes").style.display="inline";
  document.getElementById("DIA_btnNo").style.display="inline";    
  document.getElementById("DIA_btnOK").style.display="none";
  if(CancelMethod == undefined || CancelMethod == "")
  {
    document.getElementById("DIA_btnHeight").y=150;
    document.getElementById("DIA_btnCancel").style.display="none";
  }
  else
  {
    document.getElementById("DIA_btnHeight").y=112;
    document.getElementById("DIA_btnCancel").style.display="inline";
    document.getElementById("DIA_btnCancel").onclick  = () =>{ ButtonPressed(CancelMethod); };
  }
  document.getElementById("DIA_btnYes").value=0;
  if (DefaultAns=="Y")
  {
    document.getElementById("DIA_btnYes").value=1;
    document.getElementById("DIA_btnNo").value=0;
  }
  else if (DefaultAns=="N")
  {
    document.getElementById("DIA_btnYes").value=0;
    document.getElementById("DIA_btnNo").value=1;
  }
  document.getElementById("DIA_btnYes").onclick = () =>{ ButtonPressed(YesMethod); };
  document.getElementById("DIA_btnNo").onclick  = () =>{ ButtonPressed(NoMethod); };
  return;
}

function ButtonPressed(Method)
{
  var EDS=document.getElementById("Dialog");
  if (EDS==undefined) return;
  EDS.style.display = "none";
  if (Method != undefined && Method != "")
    {
      Method();
      return;
    }
  return;
}
