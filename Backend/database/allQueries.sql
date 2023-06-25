CREATE DATABASE ExpensesTracking;
USE ExpensesTracking;


CREATE TABLE Expenses (
  ExpenseID INT IDENTITY (100,1) PRIMARY KEY,  
  Username VARCHAR(50),
  DateOfExpense datetimeoffset DEFAULT SYSDATETIMEOFFSET(),
  Amount DECIMAL(10, 2),
  CategoryName VARCHAR(50),
  Description VARCHAR(140),
  FOREIGN KEY (Username) REFERENCES Users(Username),
  FOREIGN KEY (CategoryName) REFERENCES Categories(CategoryName)
);

INSERT INTO Expenses (Username, Amount, CategoryName, Description)
VALUES
  
  ('johnsmith',350, 'Food','Bought twelve oranges' ),
  ('mikejones' ,450,'Bills','Paid the water bill for this month'  ), 
  ('janedoll',650,'Rent', 'Paid this month rent' );
  SELECT * FROM Expenses;

DROP TABLE Expenses;

CREATE TABLE Categories (
  CategoryName VARCHAR(50) PRIMARY KEY
  
);

INSERT INTO Categories (CategoryName)
VALUES
	('Food'),
	('Rent'),
	('Bills');

DROP TABLE Categories;

SELECT * FROM Categories;

CREATE TABLE Users (
  UserID INT IDENTITY (1,1),
  Username VARCHAR(50) PRIMARY KEY,
  EmailAddress VARCHAR(100),
  Password VARCHAR(300)
);


INSERT INTO Users (Username,EmailAddress, Password)
VALUES
  ( 'johnsmith', 'johnsmith@gmail.com', 'word123'),
  ( 'janedoll','janedoll@gmail.com', 'pass456'),
  ( 'mikejones','mikejones@gmail.com', 'abc123');

   DROP TABLE Users;        

   SELECT * FROM Users;

CREATE TABLE PaymentMethods (
  PaymentMethodID INT IDENTITY (200,1) PRIMARY KEY,
  PaymentMethodName VARCHAR(50),
  Description VARCHAR(255)
);

DROP TABLE PaymentMethods;

CREATE TABLE ExpenseCategories (
  ExpenseID INT,
  CategoryName VARCHAR(50),
  PRIMARY KEY (ExpenseID, CategoryName),
  FOREIGN KEY (ExpenseID) REFERENCES Expenses(ExpenseID),
  FOREIGN KEY (CategoryName) REFERENCES Categories(CategoryName)
);

DROP TABLE ExpenseCategories;