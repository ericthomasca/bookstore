package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5"
	"github.com/joho/godotenv"
)

type Book struct {
	id           int
	title        string
	author       string
	publish_date int
	cover        string
}

var Books []*Book

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
	conn, err := pgx.Connect(context.Background(), os.Getenv("DATABASE_URL"))
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", err)
		os.Exit(1)
	}
	defer conn.Close(context.Background())

	// Get first row as example
	var title string
	var author string
	err = conn.QueryRow(context.Background(), "select title, author from books where id=$1", 1).Scan(&title, &author)
	if err != nil {
		fmt.Fprintf(os.Stderr, "QueryRow failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Println(title, author)

	// Get books
	// rows, err := db.Query("SELECT * FROM books;")
	// if err != nil {
	// 	log.Fatal(err)
	// }
	// defer rows.Close()

	// for rows.Next() {
	// 	log.Println()
	// }

	// Example GET
	api.GET("/ping", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})

	// fmt.Println(rows)

	router.Run(":9333")
}
