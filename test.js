/* setttings */
var server_ip = '167.114.101.98'
var server_port = 28016
var server_pass = '9ZQZ26q8sUyj63bf'
var WebSocket = require('ws');/* connect */
var ws = new WebSocket('ws://'+server_ip+':'+server_port+'/'+server_pass+'/');/* we're connected */
ws.on('open', function open() {
  console.log('connected');  /* send a test command */
  SendMsg('find *',1);
});/* server sent us a message */
ws.on('message', function(data, flags) {
  // flags.binary will be set if a binary data is received.
  // flags.masked will be set if the data was masked.
  console.log('message:'+data);
});/* our connection closed */
ws.on('close', function close() {
  console.log('disconnected');
});/* send a message */
function SendMsg(msg, identifier)
{
    var packet =
    {
        Identifier: identifier,
        Message: msg,
        Name: "WebRcon"
    }
    ws.send(JSON.stringify(packet));
}