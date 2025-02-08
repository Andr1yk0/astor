export default class RequestsService {
    #requests = [
        {
            number: 1,
            date: '2025-01-01',
            reason: '1',
            comment: 'test comment',
            power: 2.3,
            customer: {
                firstName: 'John',
                lastName: 'Doe',
                address: 'м. Львів, вул. Городоцька 11',
                phone: '0321172223'
            }
        }
    ]

    getAllRequests()  {
        return new Promise((resolve) => {
            resolve({...this.#requests})
        })
    }

    addRequest(request) {
        return new Promise((resolve) => {
            this.#requests.push(request)
            resolve(request)
        })
    }
}