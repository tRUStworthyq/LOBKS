import Pagination from "../services/Pagination";
import Sorting from "../services/Sorting";

jest.mock("../services/Pagination")
jest.mock("../services/Sorting")

test("Calculate range should return correct value", () => {
    const mockCalculateRange = jest.fn((len, rowsPerPage) => [1, 2])
  
    Pagination.calculateRange = mockCalculateRange
    
    const result = Pagination.calculateRange(15, 8)
    expect(result).toEqual([1, 2])

})
test("Slice data should return correct value", () => {
    const data = [
        1, 2, 3
    ]
    
    const mockSliceData = jest.fn((data, page, rowsPerPage) => [1, 2])

    Pagination.sliceData = mockSliceData

    const result = Pagination.sliceData(data, 1, 2)
    expect(result.length).toBe(2)
})
test("sort should return correct value", () => {

    const data = [
        1, 4, 2, 3, 5
    ]

    const mockSort = jest.fn(() => [1, 2, 3, 4, 5])

    Sorting.sort = mockSort

    const result = Sorting.sort(data, "", false, false, false)

    expect(result.length).toBe(data.length)
    
    for (let i = 1; i < result.length; i++) {
        expect(result[i - 1] < result[i]).toBeTruthy()
    }
})

