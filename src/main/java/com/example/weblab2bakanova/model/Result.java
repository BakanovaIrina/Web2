package com.example.weblab2bakanova.model;

import java.util.*;

public class Result {
    private Stack<Point> points;

    public Result() {
        this.points = new Stack<>();
    }

    public void add(Point point){
        points.push(point);
    }

    public Collection<Point> getResults(){
        return Collections.unmodifiableCollection(points);
    }
}
