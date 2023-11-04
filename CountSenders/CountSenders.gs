function sender_list() {

  // DECLARE VARIABLES
  const regexAddy = /\<(.*)\>$/;
  var sender_array=[];
  var sender_counter={};
  var output_array=[];
  var inbox_threads=GmailApp.search('in:inbox has:nouserlabels category:promotions',0,500);

  // POPULATE SENDER ARRAY
  for(var i=0;i<inbox_threads.length;i++) {
    var message=inbox_threads[i].getMessages();
    for(var x=0;x<message.length; x++) {
      var sender=regexAddy.exec(message[x].getFrom())[1];
      if(sender_array.indexOf(sender)==-1) {
        sender_array.push(sender);
        sender_counter[sender]=1;
      }else{
        sender_counter[sender]+=1;
      }
    }
  }

  // BUILD OUTPUT ARRAY
  sender_array.forEach(function(r){
    output_array.push(('          ' + sender_counter[r]).slice(-10) + '  ' + r);
  });

  // REVERSE SORT THE ARRAY
  output_array.sort().reverse();
  //output_array.reverse();

  // SEND OUTPUT TO LOG
  Logger.log(
    output_array.join("\n") +
    "\n\n" +
    'Total number of senders: ' + sender_array.length +
    "\n" +
    'Total number of counts: ' + output_array.length
  );


}
