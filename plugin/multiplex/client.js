(function() {
    var multiplex = Reveal.getConfig().multiplex;

    if (!multiplex || !multiplex.url || !multiplex.id) {
        console.warn('Reveal Multiplex (Client): Configuración incompleta.');
        return;
    }

    function connect() {
        var socket = io.connect(multiplex.url);

        socket.on(multiplex.id, function(data) {
            if (data.secret === undefined || data.secret === null || data.secret === '') {
                Reveal.setState(data.state);
            }
        });
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
