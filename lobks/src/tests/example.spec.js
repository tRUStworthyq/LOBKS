import Pagination from "../services/Pagination";


const mockCalculateRange = jest.spyOn(Pagination, "calculateRange")
.mockImplementation(() => 2)

describe('Example', () => {
    it('Should do something', () => {
        console.log('first test')
    })
    it('Should do something else', () => {
        console.log('second test')
    })
    it('Should do something else2', () => {
        console.log('third test')
    })
    it("Test pagination", () => {
        Pagination.calculateRange(15, 8)

        expect(mockCalculateRange).toHaveBeenCalledWith(15, 8)
        expect(mockCalculateRange).toReturnTimes(1)
    })
})
