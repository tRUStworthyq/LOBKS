
class Pagination {
    calculateRange(len, rowsPerPage) {
        let range = []
        const num = Math.ceil(len / rowsPerPage)
        for (let i = 1; i <= num; i++) {
            range.push(i)
        }
        return range
    }

    sliceData(data, page, rowsPerPage) {
        return data.slice((page - 1) * rowsPerPage, page * rowsPerPage)
    }
}
export default new Pagination()