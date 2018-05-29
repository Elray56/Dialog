import document from "document";
import * as DIA from "./Dialog";
import { me } from "appbit";

/* This example, uses the DialogSetup method to capture the push event for the back button.
   This intiates a "conversation" to exit with save or exit without save.
   It's not necessary to use the DialogSetup method.  You can call the DialogShow method to 
   show the dialog directly, as is shown in the AnsSaveNo() method.
*/

DIA.DialogSetup("\nExit: Are you sure?","YN","N",AnsYes,AnsNo,"","back");

function AnsYes(){
  //do stuff
  console.log("Answered Yes");
  DIA.DialogShow("\nSave data?","YNC","Y",AnsSaveYes,AnsSaveNo,AnsCancel);
}
function AnsNo(){
  //do stuff
  console.log("Answered No");
}
function AnsCancel(){
  //do stuff
  console.log("Answered Cancel");
}
function AnsSaveNo()
{
  // Set the Yes answer to an annoymous function to exit
  console.log("Answered Save Data and exit");
  DIA.DialogShow("Throws away all that hard work?","OKC","N"
                 ,function(){console.log("Answered No on save data, exiting...");me.exit();}
                 ,"",AnsCancel);
}
function AnsSaveYes()
{
  //save data
  //Uncomment to exit
  console.log("Answered Save Data and exit, exiting...");
  DIA.DialogShow("\nData saved","OK","",function(){me.exit();});
}