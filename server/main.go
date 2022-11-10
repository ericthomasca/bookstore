package main

import (
	"context"
	"fmt"
	"log"
	"strconv"

	// "net/http"
	"os"

	// "github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5"
	"github.com/joho/godotenv"
	// TODO reenable imports
)

type Book struct {
	title        string
	author       string
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
	// router := gin.Default()
	// api := router.Group("/api")
	// TODO turn back on

	// Connect to Database
	conn, err := pgx.Connect(context.Background(), os.Getenv("DATABASE_URL"))
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", err)
		os.Exit(1)
	}
	defer conn.Close(context.Background())

	// Get table size
	var count int

	err = conn.QueryRow(context.Background(), "select count(*) from books").Scan(&count)
	if err != nil {
		fmt.Fprintf(os.Stderr, "QueryRow failed: %v\n", err)
		os.Exit(1)
	}

	number_of_books := strconv.Itoa(count)
	fmt.Println("Number of books: " + number_of_books)

	// Get every book and add to Books array
	for i := 1; i <= count; i++ {
		var title string
		var author string
		var book Book

		err = conn.QueryRow(context.Background(), "select title, author from books where id=$1", i).Scan(&title, &author)
		if err != nil {
			fmt.Fprintf(os.Stderr, "QueryRow failed: %v\n", err)
			os.Exit(1)
		}
		fmt.Println(title + " -- " + author)
		book.author = author
		book.title = title
		Books = append(Books, &book)
	}

	// TODO use Books array to feed books to Gin

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
	// api.GET("/ping", func(ctx *gin.Context) {
	// 	ctx.JSON(http.StatusOK, gin.H{
	// 		"message": "pong",
	// 	})
	// })

	// fmt.Println(rows)

// 	router.Run(":9333")
}
