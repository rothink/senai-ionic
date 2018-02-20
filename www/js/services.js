angular.module('starter.services', ['ngStorage'])

    .factory('Chats', function ($localStorage, $q) {

        var deferred = $q.defer();

        $localStorage = $localStorage.$default({
            pessoas: [],
            config: {
                
            }
        });

        return {
            all: function () {
                var config = $localStorage.config;
                var pessoas = $localStorage.pessoas;

                console.info(pessoas, 'antes do if');

                if(config.isShowOnlyDoador == true) {
                    console.info('só mostre os doadores');
                    for(var i=0; i<pessoas.length; i++) {
                        if(!pessoas[i].doador) {
                            console.info('acho um bicho que nõa é doador');
                            pessoas.splice(i,1);
                        }
                    }
                }
                console.info(pessoas, 'deoius do if');
                deferred.resolve(pessoas);
                return deferred.promise;
            },
            remove: function (id) {
                var find = false;
                for(var i=0; i<$localStorage.pessoas.length; i++) {
                    if($localStorage.pessoas[i].id == id) {
                        $localStorage.pessoas.splice(i,1);
                        find = true;
                        deferred.resolve();
                    }
                }
                if(find === false) {
                    deferred.reject();
                }
                return deferred.promise;
            },
            get: function (chatId) {
                for (var i = 0; i < chats.length; i++) {
                    if (chats[i].id === parseInt(chatId)) {
                        return chats[i];
                    }
                }
                return null;
            },
            update: function(data, id) {
                deferred.resolve();
                return deferred.promise;
            },
            save: function(pessoa) {
                $localStorage.pessoas.push(pessoa);
                pessoa.id = ($localStorage.pessoas.length) + 1;
                deferred.resolve();
                return deferred.promise;
            },
            clear: function() {
                $localStorage.pessoas = [{}];
                deferred.resolve();
                return deferred.promise;
            },
            getConfigs: function() {
                deferred.resolve($localStorage.config);
                return deferred.promise;
            },
            setConfigs: function() {
                $localStorage.config.isShowOnlyDoador = !$localStorage.config.isShowOnlyDoador;
                deferred.resolve();
                return deferred.promise;
            }
        };
    });
