(function () {
    var m = angular.module("controllers");

    /**
     * テストコントローラ
     * @param {TestDataServ} testDataServ
     * @constructor
     */
    var HelloCtr = function (testDataServ) {
        this.list = testDataServ.getTest();
        testDataServ.start();
    };

    HelloCtr.$inject = ["testDataServ"];

    m.controller("HelloCtr", HelloCtr);
})();