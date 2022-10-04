package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

type Book struct {
	title string
	author string
	publish_date int
	cover string
}

var Books []*Book

func main() {
	router := gin.Default()

	api := router.Group("/api")

	api.GET("/ping", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})

	router.Run(":9333")
}