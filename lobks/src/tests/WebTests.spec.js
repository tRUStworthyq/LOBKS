import mockAxios from "jest-mock-axios"
import AuthorService from "../services/AuthorService"
import AuthService from "../services/AuthService"
import BookService from "../services/BookService"
import UserService from "../services/UserService"
import UserBookService from "../services/UserBookService"

describe("Axios services test", () => {
    afterEach(() => {
        mockAxios.reset()
    })
    describe("Author service test", () =>{
        test("Get author by id should return author", () => {
            const author = {
                id: 1, 
                firstname: "Maxim",
                lastname: "Dolgiy"
            }
            const response = {data: author}
            mockAxios.get.mockResolvedValue(response)

            const result = AuthorService.getAuthorById(1).then((res) => {
                expect(res.data).toEqual(author)
            })

        })

        test("Get all authors should return authors", () => {
            const authors = [
                {
                    id: 1,
                    firstname: "Maxim",
                    lastname: "Dolgiy"
                },
                {
                    id: 2,
                    firstname: "Oleg",
                    lastname: "Olegov"
                }
            ]
            const response = {data: authors}

            mockAxios.get.mockResolvedValue(response)
            
            const result = AuthorService.getAllAuthors().then((res) => {
                expect(res.data).toEqual(authors)
            })
        })

        test("Create author should return author", () => {
            const author = {
                id: 1, 
                firstname: "Maxim",
                lastname: "Dolgiy"
            }
            const response = {data: author}

            mockAxios.post.mockResolvedValue(response)

            const result = AuthorService.createAuthor({firstname: "Maxim", lastname: "Dolgiy"}).then((res) => {
                expect(res.data).toEqual(author)
            })
        })

        test("Update author should return author", () => {
            const author = {
                id: 1, 
                firstname: "Maxim",
                lastname: "Dolgiy"
            }
            const response = {data: author}

            mockAxios.put.mockResolvedValue(response)

            const result = AuthorService.updateAuthor(author).then((res) => {
                expect(res.data).toEqual(author)
            })
        })

        test("Delete author should return OK", () => {

            mockAxios.delete.mockResolvedValue("OK")

            const result = AuthorService.deleteAuthor(1).then((res) => {
                expect(res).toBe("OK")
            })
        })
    })
    describe("Auth service test", () => {
        test("Sign in should return JWT response", () => {
            const jwtResponse = {
                data: {
                    jwt: "Somejwt",
                    id: 1,
                    username: "user",
                    email: "user@mail.ru",
                    roles: "user:read"
                }
            }

            mockAxios.post.mockResolvedValue(jwtResponse)

            const result = AuthService.signIn({username: "user", password: "user"}).then((res) => {
                expect(res.data).toEqual(jwtResponse.data)
            })
        })

        test("Sign up should return message response", () => {
            const response = "User registered successfully"

            const signUp = {
                username: "user",
                email: "user@mail.ru",
                password: "user",
                role: "user"
            }
            mockAxios.post.mockResolvedValue(response)

            const result = AuthService.signUp(signUp).then((res) => {
                expect(res).toBe(response)
            })
        })
    })

    describe("User service test", () => {
        test("Find all users should return users", () => {
            const users = [
                {
                    username: "user",
                    email: "user@mail.ru",
                    statusUser: "ACTIVE",
                    role: "USER"
                },
                {
                    username: "user1",
                    email: "user1@mail.ru",
                    statusUser: "BANNED",
                    role: "USER"
                }
            ]

            const response = {data: users}

            mockAxios.get.mockResolvedValue(response)

            const result = UserService.findAllUsers().then((res) => {
                expect(res.data).toEqual(users)
            })
        })

        test("Find user by username should return user", () => {
            const user = {
                username: "user",
                email: "user@mail.ru",
                statusUser: "ACTIVE",
                role: "USER"
            }

            const response = {data: user}

            mockAxios.get.mockResolvedValue(response)

            const result = UserService.findUserByUsername("user").then((res) => {
                expect(res.data).toEqual(user)
            })
        })

        test("Find user by id should return user", () => {
            const user = {
                username: "user",
                email: "user@mail.ru",
                statusUser: "ACTIVE",
                role: "USER"
            }

            const response = {data: user}

            mockAxios.get.mockResolvedValue(response)

            const result = UserService.findUserById(1).then((res) => {
                expect(res.data).toEqual(user)
            })
        })

        test("Find user by status user should return users", () => {
            const user = [{
                username: "user",
                email: "user@mail.ru",
                statusUser: "ACTIVE",
                role: "USER"
            }]

            const response = {data: user}

            mockAxios.post.mockResolvedValue(response)

            const result = UserService.findUsersByStatusUser({statusUser: "ACTIVE"}).then((res) => {
                expect(res.data).toEqual(user)
            })
        })

        test("Update status user by username should return user", () => {
            const user = {
                username: "user",
                email: "user@mail.ru",
                statusUser: "BANNED",
                role: "USER"
            }

            const response = {data: user}

            mockAxios.patch.mockResolvedValue(response)

            const result = UserService.updateStatusUserByUsername("user").then((res) => {
                expect(res.data).toEqual(user)
            })
        })
    })
    describe("Book service test", () => {
        test("Get all books should return books", () => {
            const books = [
                {
                    id: 1,
                    name: "aaa",
                    description: "desc",
                    author: {
                        id: 1,
                        firstname: "Maxim",
                        lastname: "Dolgiy"
                    }
                },
                {
                    id: 2,
                    name: "aaa",
                    description: "desc",
                    author: {
                        id: 1,
                        firstname: "Maxim",
                        lastname: "Dolgiy"
                    }
                }
            ]

            const response = {data: books}

            mockAxios.get.mockResolvedValue(response)

            const result = BookService.getAllBooks().then((res) => {
                expect(res.data).toEqual(books)
            })
        })
        test("Create book should return book", () => {
            const book = {
                id: 1,
                name: "aaa",
                description: "desc",
                author: {
                    id: 1,
                    firstname: "Maxim",
                    lastname: "Dolgiy"
                }
            }
            const request = {
                name: "aaa",
                description: "desc",
                authorId: 1
            }

            const response = {data: book}

            mockAxios.post.mockResolvedValue(response)

            const result = BookService.createBook(request).then((res) => {
                expect(res.data).toEqual(book)
            })
        })

        test("Get book by id should return book", () => {
            const book = {
                id: 1,
                name: "aaa",
                description: "desc",
                author: {
                    id: 1,
                    firstname: "Maxim",
                    lastname: "Dolgiy"
                }
            }

            const response = {data: book}

            mockAxios.get.mockResolvedValue(response)

            const result = BookService.getBookById(1).then((res) => {
                expect(res.data).toEqual(book)
            })
        })

        test("Update book should return book", () => {
            const book = {
                id: 1,
                name: "aaa",
                description: "desc",
                author: {
                    id: 1,
                    firstname: "Maxim",
                    lastname: "Dolgiy"
                }
            }

            const request = {
                id: 1,
                name: "aaa",
                description: "desc",
                authorId: 1
            }
            const response = {data: book}

            mockAxios.put.mockResolvedValue(response)

            const result = BookService.updateBook(request).then((res) => {
                expect(res.data).toEqual(book)
            })
        })

        test("Delete book should return OK", () => {
            
            mockAxios.delete.mockResolvedValue("OK")

            const result = BookService.deleteBook(1).then((res) => {
                expect(res).toBe("OK")
            })
        })

        test("Get all books by author id should return books", () => {
            const books = [
                {
                    id: 1,
                    name: "aaa",
                    description: "desc",
                    author: {
                        id: 1,
                        firstname: "Maxim",
                        lastname: "Dolgiy"
                    }
                },
                {
                    id: 2,
                    name: "aaa",
                    description: "desc",
                    author: {
                        id: 1,
                        firstname: "Maxim",
                        lastname: "Dolgiy"
                    }
                }
            ]

            const response = {data: books}

            mockAxios.get.mockResolvedValue(response)

            const result = BookService.getAllBooksByAuthorId(1).then((res) => {
                expect(res.data).toEqual(books)
            })
        })
    })

    describe("User book service test", () => {
        test("Find books by user id should return books", () => {
            const books = [
                {
                    book: {
                        id: 1,
                        name: "aaa",
                        description: "desc",
                        author: {
                            id: 1,
                            firstname: "Maxim",
                            lastname: "Dolgiy"
                        }
                    },
                    statusBook: "PLANS"
                },
                {
                    book: {
                        id: 2,
                        name: "aaa",
                        description: "desc",
                        author: {
                            id: 1,
                            firstname: "Maxim",
                            lastname: "Dolgiy"
                        }
                    },
                    statusBook: "PLANS"
                }
            ]

            const response = {data: books}

            mockAxios.get.mockResolvedValue(response)

            const result = UserBookService.findBooksByUserId(1).then((res) => {
                expect(res.data).toEqual(books)
            })
        })

        test("Save user book should return book", () => {
            const book = {
                book: {
                    id: 1,
                    name: "aaa",
                    description: "desc",
                    author: {
                        id: 1,
                        firstname: "Maxim",
                        lastname: "Dolgiy"
                    }
                },
                statusBook: "PLANS"
            }

            const response = {data: book}

            mockAxios.post.mockResolvedValue(response)

            const result = UserBookService.saveUserBook({user_id: 1, book_id: 1}).then((res) => {
                expect(res.data).toEqual(book)
            })
        })

        test("Delete user book should return OK", () => {
            mockAxios.delete.mockResolvedValue("OK")

            const result = UserBookService.deleteUserBook(1, 1).then((res) => {
                expect(res).toBe("OK")
            })
        })

        test("Change status book by embeddable id should return status book", () => {
            const request = {
                userBookEmbeddable: {
                    userId: 1,
                    bookId: 1
                },
                statusBook: "PLANS"
            }

            mockAxios.patch.mockResolvedValue("END")

            const result = UserBookService.changeStatusBookEmbeddableId(request).then((res) => {
                expect(res).toBe("END")
            })
        })
    })
})