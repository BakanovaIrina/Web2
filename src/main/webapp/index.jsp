<%@ page import="com.example.weblab2bakanova.model.Result" %>
<%@ page import="com.example.weblab2bakanova.model.Point" %>
<%@ page import="java.util.Collection" %>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ru-RU">
<head>
    <meta charset="UTF-8">
    <title>Лабораторная работа №2</title>
    <link rel="stylesheet" href="style.css" type="text/css">
</head>
<body onload="drawCanvas()">

<script src="canvas1.js"></script>
<script src="validator1.js"></script>

<header>
    <h2>Веб-программирование, Лабораторная работа №2.  Вариант № 10579,  Баканова Ирина, P3210</h2>
</header>

<table id="main">
    <tr>
        <td id = "left_column"></td>
        <td id = "central_column">
            <form name = "mainForm">
                <table id = "internal">
                    <tr>
                        <th colspan="3">
                            <h3>Выберете изменение по Х:</h3>
                        </th>
                        <th rowspan="8">
                            <canvas id="canvas"></canvas>
                        </th>
                    </tr>
                    <tr>
                        <th>
                            <label>
                                <select id="X_select">
                                    <option value="-3" selected>-3</option>
                                    <option value="-2">-2</option>
                                    <option value="-1">-1</option>
                                    <option value="0">0</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </label>
                        </th>
                    </tr>

                    <tr>
                        <th colspan="3">
                            <h3>Выберете изменение по Y:</h3>
                        </th>
                    </tr>
                    <tr>
                        <td colspan="3">
                            <div id="y_placeholder">
                                <label>
                                    <input required type="text" id ="Y_text" placeholder="Значение от -3 до 3" aria-orientation="vertical">
                                </label>
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <th colspan="3">
                            <h3>Выберете изменение по R:</h3>
                        </th>
                    </tr>
                    <tr>
                        <th colspan="3">
                            <label>
                                <input class=r type="radio" value="1" name="R_radio"> 1
                                <input class=r type="radio" value="1.5" name="R_radio"> 1.5
                                <input class=r type="radio" value="2" name="R_radio"> 2
                                <input class=r type="radio" value="2.5" name="R_radio"> 2.5
                                <input class=r type="radio" value="3" name="R_radio"> 3
                            </label>
                        </th>
                    </tr>
                    <tr>
                        <th colspan="3">
                        </th>
                    </tr>
                    <tr>
                        <th colspan="3">
                        </th>
                    </tr>
                    <tr>
                        <th colspan="3">
                            <input type="button" id="send" onclick="send" value="Отправить">
                        </th>
                        <th>
                            <p hidden id = "error_message">Что-то пошло не по плану(</p>
                        </th>
                    </tr>
                </table>
            </form>
            <h3>Таблица результатов</h3>
            <table class="result_table">

                <thead>
                <tr id = "result_table_head">
                    <th class="variable">X</th>
                    <th class="variable">Y</th>
                    <th class="variable">R</th>
                    <th>Результат попадания</th>
                    <th>Время</th>
                    <th>Время выполнения</th>
                </tr>
                </thead>
                <tbody>
                <%
                    Result result = (Result) request.getSession().getAttribute("results");
                    if(result != null){
                        Collection<Point> points = result.getResults();
                        for (Point point: points){
                %>
                <tr>
                    <th class='the_X'><%= point.getX() %></th>
                    <th class='the_Y'><%= point.getY() %></th>
                    <th class='the_R'><%= point.getR() %></th>
                    <th class='the_Result'><%= point.isHit() %></th>
                    <th><%= point.getCreationTime() %></th>
                    <th><%= point.getExecutionTime() %></th>
                </tr>
                <%
                        }
                    }
                %>
                </tbody>
            </table>
        </td>
        <td id = "right_column"></td>
    </tr>
</table>
</body>
</html>