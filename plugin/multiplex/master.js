(function() {
    var multiplex = Reveal.getConfig().multiplex;

    if (!multiplex || !multiplex.url || !multiplex.secret || !multiplex.id) {
        console.warn('Reveal Multiplex (Master): Configuración incompleta.');
        return;
    }

    function connect() {
        var socket = io.connect(multiplex.url);

        function post() {
            var messageData = {
                state: Reveal.getState(),
                secret: multiplex.secret,
                socketId: multiplex.id
            };
            socket.emit('multiplex-statechanged', messageData);
        }

        Reveal.on('slidechanged', post);
        Reveal.on('fragmentshown', post);
        Reveal.on('fragmenthidden', post);
        Reveal.on('overviewhidden', post);
        Reveal.on('overviewshown', post);
        Reveal.on('paused', post);
        Reveal.on('resumed', post);
    }

    if (typeof io !== 'undefined') {
        connect();
    } else {
        var checkInterval = setInterval(function() {
            if (typeof io !== 'undefined') {
                clearInterval(checkInterval);
                connect();
            }
        }, 50);
    }
}());
