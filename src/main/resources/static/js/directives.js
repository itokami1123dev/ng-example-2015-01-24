(function () {
    var m = angular.module("directives");

    m.directive("oreTable", ["$compile", function ($compile) {
        return {
            restrict: "E",
            scope: {
                data: "="
            },
            compile: function ($tEl) {

                var colLayouts = [];

                var $cols = $tEl.find("column");
                $cols.each(function () {
                    var $col = $(this);
                    var title = $col.attr("title");
                    var name = $col.attr("name");
                    colLayouts.push({
                        title: title, name: name
                    })
                });

                $tEl.empty();

                var html = '';

                html += '<table class="table table-striped" >';
                html += '<thead>';
                html += ' <tr>';
                colLayouts.forEach(function (col) {
                    html += '<th>' + col.title + '</th>';
                });
                html += ' </tr>';
                html += '</thead>';
                html += '<tbody></tbody>';
                html += '</table>';
                $tEl.append(html);

                // Post Link
                return function (iScope, $iEl) {
                    var html = '';
                    html += ' <tr ng-repeat="item in data" >';
                    colLayouts.forEach(function (col) {
                        html += '<td>{{item.' + col.name + '}}</td>';
                    });
                    html += ' </tr>';
                    $iEl.find("tbody").append(
                        $compile(html)(iScope)
                    );
                };

            }

        };
    }]);

})();

(function () {
    var m = angular.module("directives");

    var oreTableTemplate = {
        root: '<table class="table table-striped" ></table>',
        row: '<tr></tr>',
        hcol: '<th></th>',
        col: '<td></td>'
    };

    var GridComponent = function (layout) {
        this.layout = layout;
        this.template = oreTableTemplate;
    };

    GridComponent.prototype.getModelId = function () {
        return this.layout.modelId;
    };

    GridComponent.prototype.getHead = function () {
        var $row = $(this.template.row);

        this.layout.row.columns.forEach(function (colLayout, colIdx) {
            var $col = $(this.template.hcol);
            $col.text(colLayout.title);
            $row.append($col);
        }, this);

        return $row;
    };

    GridComponent.prototype.getRow = function () {
        var $row = $(this.template.row);

        this.layout.row.columns.forEach(function (colLayout, colIdx) {
            var $col = $(this.template.col);
            $col.attr("ng-bind", "rowData." + colLayout.name);
            $col.css("text-align", colLayout.align);
            $row.append($col);
        }, this);

        return $row;
    };

    m.directive("oreGrid", ["$compile", function ($compile) {
        return {
            restrict: "E",
            scope: {data: "="},
            template: oreTableTemplate.root,
            link: function (scope, iElm, iAttrs) {
                var layout = globalLayout[iAttrs.layout];
                var comp = new GridComponent(layout);

                var $el = iElm.find("table");

                $el.append(comp.getHead());

                var listModel = scope.data[comp.getModelId()];
                var $tr = comp.getRow();

                scope.$watchCollection(function () {
                    return listModel;

                }, function () {
                    $el.empty();
                    listModel.forEach(function (rowData, rowIdx) {
                        var rowScope = scope.$new();
                        rowScope.rowData = rowData;
                        rowScope.rowIdx = rowIdx;
                        $el.append(
                            $compile(comp.getRow())(rowScope)
                        );
                    });
                });
            }
        };
    }]);

})();