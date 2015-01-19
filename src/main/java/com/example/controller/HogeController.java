package com.example.controller;

import com.example.layout.OreColumn;
import com.example.layout.OreGrid;
import com.example.layout.OreRow;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/")
public class HogeController {

    @RequestMapping(method = RequestMethod.GET)
    String index(Model model) {

        OreColumn c1 = new OreColumn();
        c1.setTitle("番号");
        c1.setName("no");
        c1.setAlign("right");

        OreColumn c2 = new OreColumn();
        c1.setTitle("名前");
        c2.setName("name");
        c2.setAlign("left");

        OreRow r = new OreRow();
        List<OreColumn> columns = new ArrayList<>();
        columns.add(c1);
        columns.add(c2);
        r.setColumns(columns);

        OreGrid oreGrid = new OreGrid();
        oreGrid.setModelId("list");
        oreGrid.setRow(r);


        Map<String, OreGrid> layout = new HashMap<>();
        layout.put("gLayout", oreGrid);

        model.addAttribute("layout", layout);
        return "index";
    }
}
