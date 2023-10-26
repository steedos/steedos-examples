use test;

/****** Object:  Table `TestCrudForDM` ******/
CREATE TABLE `TestCrudForDM`(
	`id` varchar(50) NOT NULL PRIMARY KEY,
	`name` varchar(50) NULL,
	`title` varchar(50) NULL,
	`count` int NULL
);

/****** Object:  Table `TestFieldsForDM` ******/
CREATE TABLE `TestFieldsForDM`(
	`id` varchar(50) NOT NULL PRIMARY KEY,
	`name` varchar(50) NULL,
	`title` varchar(50) NULL,
	`tag` varchar(50) NULL
);

/****** Object:  Table `TestFieldTypesForDM` ******/
CREATE TABLE `TestFieldTypesForDM`(
	`id` number(10) NOT NULL PRIMARY KEY,
	`text` varchar(50) NULL,
	`textarea` varchar(50) NULL,
	`int` int NULL,
	`floatnumber` float NULL,
	`datefield` date NULL,
	`datetimefield` timestamp NULL,
	`bool` number(1) NULL
);

/****** Object:  Table `TestFiltersForDM` ******/
CREATE TABLE `TestFiltersForDM`(
	`id` varchar(50) NOT NULL PRIMARY KEY,
	`name` varchar(50) NULL,
	`title` varchar(50) NULL,
	`count` int NULL
);

/****** Object:  Table `TestPageForDM` ******/
CREATE TABLE `TestPageForDM`(
	`id` varchar(50) NOT NULL PRIMARY KEY,
	`name` varchar(50) NULL,
	`title` varchar(50) NULL,
	`index` int NULL
);

/****** Object:  Table `TestPrimaryKeyForDM` ******/
CREATE TABLE `TestPrimaryKeyForDM`(
	`id` number(10) NOT NULL PRIMARY KEY,
	`name` varchar(50) NULL,
	`title` varchar(50) NULL,
	`count` int NULL
);

/****** Object:  Table `TestSortForDM` ******/
CREATE TABLE `TestSortForDM`(
	`id` varchar(50) NOT NULL PRIMARY KEY,
	`name` varchar(50) NULL,
	`title` varchar(50) NULL,
	`count` int NULL
);

/****** Object:  Table `Product` ******/
CREATE TABLE `Product`(
	`_id` varchar(50) NOT NULL PRIMARY KEY,
	`name` varchar(50) NULL,
	`author` varchar(50) NULL,
	`publisher` varchar(50) NULL,
	`publishtime` date NULL,
	`product_subcategoryid` int NULL,
	`productno` varchar(50) NULL,
	`satetystocklevel` int NULL,
	`originalprice` float NULL,
	`nowprice` float NULL,
	`discount` float NULL,
	`description` varchar(50) NULL,
	`type` varchar(50) NULL,
	`papertotal` int NULL,
	`wordtotal` int NULL,
	`sellstarttime` date NULL,
	`sellendtime` date NULL
);