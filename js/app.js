/**
 * Created by denuss on 18.02.2015.
 */
requirejs.config({
    baseUrl: 'js/libs',
    paths: {
        game: '../game',
        stages:'../game/stages'
    }
});

requirejs(['game/main']);
