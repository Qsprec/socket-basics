var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room');
var socket = io();

console.log(name + ' wants to join ' + room);


$('h1.room-title').text(room);

socket.on('connect', function() {
	console.log('Connected to socket.io server!');
	socket.emit('joinRoom', {
		name: name,
		room: room
	});
});

socket.on('message', function(message) {
	console.log("New message");
	console.log(message.text);
	var momentTimestamp = moment.utc(message.timestamp);
	var timeString = momentTimestamp.local().format('h:mm a');

	var $messages = jQuery('.messages');
	var $message = jQuery('<li class="list-group-item"></li>');

	$message.append('<li><strong>' + message.name + ' ' + timeString + '</strong></li>')
	$message.append('<p>' + message.text + '</p>')
	$messages.append($message);
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