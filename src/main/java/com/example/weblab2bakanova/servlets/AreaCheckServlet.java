package com.example.weblab2bakanova.servlets;

import com.example.weblab2bakanova.model.Point;
import com.example.weblab2bakanova.model.Result;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.time.LocalDateTime;

@WebServlet(name = "AreaCheckServlet", value = "/AreaCheckServlet")
public class AreaCheckServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        long startTime = System.nanoTime();
        response.setContentType("text/html; charset=UTF-8");

        double x, y, r;

        try {
            x = Double.parseDouble(request.getParameter("x"));
            y = Double.parseDouble(request.getParameter("y"));
            r = Double.parseDouble(request.getParameter("r"));
        } catch (NumberFormatException | NullPointerException e) {
            response.sendError(400);
            return;
        }

        if (validateX(x) && validateY(y) && validateR(r)) {
            boolean isHit = hitTest(x, y, r);
            double execTime = (System.nanoTime() - startTime) / 1000000.0;
            LocalDateTime creationTime = LocalDateTime.now();
            Point point = new Point(x, y, r, creationTime, execTime, isHit);
            Result result = (Result) request.getSession().getAttribute("results");

            if (result == null){
                result = new Result();
                result.add(point);
                request.getSession().setAttribute("results", result);
            } else {
                result.add(point);
            }
        }
    }

    private boolean validateX(double x) {
        return ((x <= 5 && x >= -3));
    }

    private boolean validateY(double y) {
        return (y < 3 && y > -3);
    }

    private boolean validateR(double r) {
        return (r <= 3 && r >= 1);
    }

    private boolean hitTest(double x, double y, double r) {
        return ((x <= 0 && y >= 0) && (y <= 0.5 * x + r/2) ||
                (x <= 0 && y <= 0) && (x >= -r && y >= -r/2) ||
                (x >= 0 && y <= 0) && (x*x + y*y <= r*r));
    }
}
