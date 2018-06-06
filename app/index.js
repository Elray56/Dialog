import document from "document";
import * as DIA from "./Dialog";
import { me } from "appbit";

/* This example, uses the DialogSetup method to capture the push event for the back button.
   This intiates a "conversation" to exit with save or exit without save.
   It's not necessary to use the DialogSetup method unless, like this example, you need to 
   capture the key event.  You can call the DialogShow method to show the dialog directly,
   as is shown in the AnsSave() method.
*/
 
DIA.DialogSetup("\nExit: Are you sure?","YN","N",AnsExit,"back");

function AnsExit(Answer){
  //Answered Yes to exit
  console.log("Exit : Answered:"+Answer);
  if (Answer=="Y"){
    DIA.DialogShow("\nSave data?","YNC","Y",AnsSave);
  }
}

function AnsSave(Answer)
{
  console.log("Save : Answered:"+Answer);
  switch (Answer){
    case "Y":
      //Show a confirmation box
      DIA.DialogShow("\nData saved","OK","",function(Answer){me.exit();});
      break;
    case "N":
        //Last question, exit if OK
        DIA.DialogShow("Throws away all that hard work?","OKC",""
                       ,function(Answer){
                            console.log("Throw away work answer:"+Answer);
                            if (Answer=="OK") {
                              console.log("exiting...");
                              me.exit();
                            }
                        });
      break;
  }
}
