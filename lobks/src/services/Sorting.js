
const statusBooks = ["READING", "FAVOURITE", "PLANS", "ABANDONED", "END", "OTHER"]

class Sorting {

    sort(data, field, isMyListPage = false, isAdminPanelAuthors = false, isSorted = false) {
        if (!isMyListPage) {
            if (!isAdminPanelAuthors) {
                if (field !== "author") {
                    return data.sort((a, b) => {
                        return a[field] > b[field] ? 1 : -1;
                    })
                } else {
                    return data.sort((a, b) => {
                        return a[field]["firstname"] === b[field]["firstname"]
                            ? a[field]["lastname"] > b[field]["lastname"]
                                ? 1
                                : -1
                            : a[field]["firstname"] > b[field]["firstname"]
                                ? 1
                                : -1;
                    })
                }
            } else {
                if (isSorted) {
                    return data.sort((a, b) => {
                        return a["firstname"] === b["firstname"]
                            ? a["lastname"] > b["lastname"]
                                ? 1
                                : -1
                            : a["firstname"] > b["firstname"]
                                ? 1
                                : -1;
                    })
                } else {
                    return data.sort((a, b) => {
                        return a["firstname"] === b["firstname"]
                            ? a["lastname"] > b["lastname"]
                                ? -1
                                : 1
                            : a["firstname"] > b["firstname"]
                                ? -1
                                : 1;
                    })
                }
            }
        } else {
            if (field !== "statusBook") {
                if (field !== "author") {
                    return data.sort((a, b) => {
                        return a["book"][field] > b["book"][field] ? 1 : -1;
                    })
                } else {
                    return data.sort((a, b) => {
                        return a["book"][field]["firstname"] === b["book"][field]["firstname"]
                            ? a["book"][field]["lastname"] > b["book"][field]["lastname"]
                                ? 1
                                : -1
                            : a["book"][field]["firstname"] > b["book"][field]["firstname"]
                                ? 1
                                : -1;
                    })
                }
            } else {
                return data.sort((a, b) => {
                    return statusBooks.indexOf(a[field]) > statusBooks.indexOf(b[field]) ? 1 : -1;
                })
            }
        }
    }
}

export default new Sorting()