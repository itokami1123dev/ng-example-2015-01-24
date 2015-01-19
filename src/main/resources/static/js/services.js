(function () {
    var m = angular.module("services");

    var l = [
        {name: "nobi"}, {name: "zyai"}, {name: "sune"}
        //,
        //{ name:"sizu" }, { name:"deki" }, { name:"dora" }
    ];

    var TestDataServ = function ($timeout) {
        this.testData = [];
        this.$timeout = $timeout;
    };

    TestDataServ.prototype.getTest = function () {
        return this.testData;
    };

    TestDataServ.prototype.start = function () {
        var testData = this.testData,
            $timeout = this.$timeout;

        l.forEach(function (test, idx) {
            var no = idx + 1;
            test.no = no;
            $timeout(function () {
                testData.push(test);
            }, 1000 * no);
        });
    };

    TestDataServ.$inject = ["$timeout"];

    m.service("testDataServ", TestDataServ);

})();