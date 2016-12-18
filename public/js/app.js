var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room');
var socket = io();

console.log(name + ' wants to join ' + room);

socket.on('connect', function() {
	console.log('Connected to socket.io server!');
});

socket.on('message', function(message) {
	console.log("New message");
	console.log(message.text);
	var momentTimestamp = moment.utc(message.timestamp);
	var timeString = momentTimestamp.local().format('h:mm a');

	var $messages = jQuery('.messages');
	$messages.append('<p><strong>' + message.name + ' '+ timeString + '</strong></p>')
	// jQuery('.messages').append('<p><strong>' + timeString + "</strong>: " + message.text + '</p>');
	$messages.append('<p>' + message.text +'</p>')
});


// Handles submitting new message
var $form = jQuery('#message-form');

$form.on('submit', function(event) {
	event.preventDefault();

	var $message = $form.find('input[name=message]');

	socket.emit('message', {
		name: name,
		text: $message.val()
	});

	$message.val('');
});