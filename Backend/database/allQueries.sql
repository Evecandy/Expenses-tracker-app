CREATE DATABASE ExpensesTracking;
USE ExpensesTracking;

CREATE TABLE PaymentMethods (
  PaymentMethodID INT IDENTITY (200,1) PRIMARY KEY,
  PaymentMethodName VARCHAR(50),
  Description VARCHAR(255)
);

DROP TABLE PaymentMethods;


CREATE TABLE Users (
  UserID INT IDENTITY (1,1),
  Username VARCHAR(50) PRIMARY KEY,
  EmailAddress VARCHAR(100),
  Password VARCHAR(8)
);

  DROP TABLE Users; 

INSERT INTO Users (Username,EmailAddress, Password)
VALUES
  ( 'johnsmith', 'johnsmith@gmail.com', 'word123'),
  ( 'janedoll','janedoll@gmail.com', 'pass456'),
  ( 'mikejones','mikejones@gmail.com', 'abc123');

SELECT * FROM Users;

CREATE TABLE Categories (
  CategoryName VARCHAR(50) PRIMARY KEY,
  Description VARCHAR(255)
);

DROP TABLE Categories;

CREATE TABLE Expenses (
  ExpenseID INT IDENTITY (100,1) PRIMARY KEY,  
  Username VARCHAR(50),
  Date DATE,
  Amount DECIMAL(10, 2),
  CategoryName VARCHAR(50),
  FOREIGN KEY (Username) REFERENCES Users(Username),
  FOREIGN KEY (CategoryName) REFERENCES Categories(CategoryName)
);

DROP TABLE Expenses;

CREATE TABLE ExpenseCategories (
  ExpenseID INT,
  CategoryName VARCHAR(50),
  PRIMARY KEY (ExpenseID, CategoryName),
  FOREIGN KEY (ExpenseID) REFERENCES Expenses(ExpenseID),
  FOREIGN KEY (CategoryName) REFERENCES Categories(CategoryName)
);

DROP TABLE ExpenseCategories;