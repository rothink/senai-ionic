angular.module('starter.controllers', [])

    .controller('CadastroCtrl', function ($scope, Chats, $ionicPopup, $state) {

        $scope.pessoa = {
            doador: true
        }

        $scope.save = function (pessoa) {
            Chats.save(pessoa).then(function () {
                $scope.pessoa = {};
                Chats.all().then(function (pessoas) {
                    $scope.pessoas = pessoas;
                });

                $ionicPopup.alert({
                    title: 'Alerta',
                    template: 'Usuário cadastrado com sucesso'
                }).then(function (res) {
                    $state.go('tab.pessoas');
                });
            });
        }
    })

    .controller('PessoasCtrl', function ($scope, Chats, $ionicPopup, $state) {

        Chats.all().then(function (pessoas) {
            $scope.pessoas = pessoas;
        });

        $scope.remove = function (id) {
            Chats.remove(id).then(function() {
                $ionicPopup.alert({
                    title: 'Alerta',
                    template: 'Usuário removido do sistema'
                }).then(function (res) {
                    Chats.all().then(function (pessoas) {
                        $scope.pessoas = pessoas;
                    });
                    $state.go('tab.pessoas');
                });
            }, function(error){
                $ionicPopup.alert({
                    title: 'Alerta',
                    template: 'Usuário não encontrado no sistema'
                }).then(function (res) {
                    $state.go('tab.pessoas');
                });
            });
        };
    })

    .controller('DetailCtrl', function ($scope, $stateParams, Chats) {
        $scope.chat = Chats.get($stateParams.chatId);
    })

    .controller('AccountCtrl', function ($scope, Chats, $ionicPopup, $state) {
        Chats.getConfigs().then(function(config) {
            $scope.configs = config;
        });

        $scope.removeAll = function () {
            Chats.clear().then(function() {
                $ionicPopup.alert({
                    title: 'Alerta',
                    template: 'Todos os usuários foram removidos'
                }).then(function (res) {
                    $state.go('tab.pessoas');
                });
            });
        }

        $scope.attStatusConfig = function() {
            Chats.setConfigs($scope.configs).then(function() {
                $ionicPopup.alert({
                    title: 'Alerta',
                    template: 'Configurações atualizadas'
                }).then(function (res) {
                    Chats.all().then(function (pessoas) {
                        $scope.pessoas = pessoas;
                    });
                });
            })
        }
    });
