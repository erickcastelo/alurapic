angular.module('alurapic')
    .controller('FotoController', ['$scope', '$routeParams', 'recursoFoto', 'cadastroDeFotos',
        function($scope, $routeParams, recursoFoto, cadastroDeFotos) {

        $scope.foto = {};
        $scope.mensagem = '';
        $scope.classErro = '';

        if ($routeParams.fotoId){
            recursoFoto.get({fotoId: $routeParams.fotoId}, function (foto) {
                $scope.foto = foto;
            }, function (erro) {
                console.log(erro);
                $scope.mensagem = 'Não foi possível obter a foto';
            });
        }

        $scope.submeter = function() {
            if ($scope.formulario.$valid){
                cadastroDeFotos.cadastrar($scope.foto)
                    .then(function (dados) {
                        $scope.mensagem = dados.mensagem;
                        $scope.classErro = dados.classErro;
                        if (dados.inclusao) $scope.foto = {};

                        $scope.$broadcast('fotoCadastrada');
                        $scope.formulario.$submitted = false;
                    })
                    .catch(function (erro) {
                        $scope.mensagem = erro.mensagem;
                        $scope.classErro = erro.classErro;
                    });
            }
        };

    }]);