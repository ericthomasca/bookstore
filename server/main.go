package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

type Book struct {
	id				int
	title 			string
	author 			string
	publish_date 	int
	cover 			string
}

var Books []*Book

const DB_NAME = "bookstore"

func main() {
	// Setup Environment
	err := godotenv.Load("../.env")
	if err != nil {
		log.Fatal("Failed to load .env file")
	}
	log.Println()

	// Setup Gin
	router := gin.Default()
	api := router.Group("/api")

	// Connect to Database
	dbinfo := fmt.Sprintf("user=%s password=%s dbname=%s sslmode=disable",
		os.Getenv("POSTGRES_USER"), os.Getenv("POSTGRES_PASS"), DB_NAME)
	
	db, err := sql.Open("postgres", dbinfo)
	if err != nil {
		log.Fatal("Failed to load database.")
	}
	defer db.Close()

	// Get books
	rows, err := db.Query("SELECT * FROM books;")
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	for rows.Next() {
		log.Println()
	}
	
	// Example GET
	api.GET("/ping", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})


	fmt.Println(rows)

	router.Run(":9333")
}

