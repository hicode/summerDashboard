/* Setup blank page controller */
angular
    .module('alliedMobile')
    .controller('archiveCtrl', archiveCtrl)

    archiveCtrl.$inject['$rootScope', '$scope', 'settings'];

    function archiveCtrl ($rootScope, $scope, settings) {
        $scope.$on('$viewContentLoaded', function() {   
            // initialize core components
            App.initAjax();

            // set default layout mode
            $rootScope.settings.layout.pageContentWhite = true;
            $rootScope.settings.layout.pageBodySolid = false;
            $rootScope.settings.layout.pageSidebarClosed = false;
        });
    });
