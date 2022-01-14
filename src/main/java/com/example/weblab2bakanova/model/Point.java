package com.example.weblab2bakanova.model;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class Point {
    private final double x;
    private final double y;
    private final double r;
    private final LocalDateTime creationTime;
    private final double executionTime;
    private final boolean isHit;


    public Point(double x, double y, double r, LocalDateTime creationTime, double executionTime, boolean isHit) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.creationTime = creationTime;
        this.executionTime = executionTime;
        this.isHit = isHit;
    }

    public double getX() {
        return x;
    }

    public double getY() {
        return y;
    }

    public double getR() {
        return r;
    }

    public String getCreationTime() {
        return creationTime.format(DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss"));
    }

    public double getExecutionTime() {
        return executionTime;
    }

    public boolean isHit() {
        return isHit;
    }
}
