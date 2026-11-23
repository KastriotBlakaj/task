-- Query 1
-- Customers who used United Package, with how many orders they shipped with it
-- and the total value of those orders. Highest value first.
SELECT
    c.CustomerName,
    c.Country,
    COUNT(DISTINCT o.OrderID)            AS UnitedPackageOrders,
    ROUND(SUM(od.Quantity * p.Price), 2) AS TotalValue
FROM Customers    AS c
JOIN Orders       AS o  ON o.CustomerID = c.CustomerID
JOIN Shippers     AS s  ON s.ShipperID  = o.ShipperID
JOIN OrderDetails AS od ON od.OrderID   = o.OrderID
JOIN Products     AS p  ON p.ProductID  = od.ProductID
WHERE s.ShipperName = 'United Package'
GROUP BY c.CustomerID, c.CustomerName, c.Country
ORDER BY TotalValue DESC;


-- Query 2
-- Customers who placed at least one order but never used United Package.
SELECT
    c.CustomerName,
    c.Country
FROM Customers AS c
WHERE EXISTS (
        SELECT 1
        FROM Orders AS o
        WHERE o.CustomerID = c.CustomerID
    )
  AND NOT EXISTS (
        SELECT 1
        FROM Orders   AS o
        JOIN Shippers AS s ON s.ShipperID = o.ShipperID
        WHERE o.CustomerID = c.CustomerID
          AND s.ShipperName = 'United Package'
    )
ORDER BY c.CustomerName;
