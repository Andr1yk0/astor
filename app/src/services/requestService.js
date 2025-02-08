export default class RequestService {
    #requests = [
        {
            id: 1,
            number: '1',
            date: '2025-01-01',
            reason: '1',
            comment: 'test comment',
            power: 2.3,
            customer: {
                firstName: 'Юрій',
                lastName: 'Петренко',
                address: 'м. Львів, вул. Городоцька 11',
                phone: '0321172223'
            }
        }
    ]

    search(params){
        let requests = [];
        const filteredParams = {};
        for (let key in params) {
            if(params[key]){
                filteredParams[key] = params[key];
            }
        }
        if(Object.keys(filteredParams).length){
            requests = this.#requests.filter((request) => {
                for (let key in filteredParams) {
                    if(key === 'minDate' && (new Date(request.date) < new Date(filteredParams[key]))) {
                        return false;
                    }
                    if(key === 'maxDate' && (new Date(request.date) > new Date(filteredParams[key]))) {
                        return false;
                    }
                }
                return true;
            })
        }else {
            requests = [...this.#requests]
        }
        return new Promise((resolve) => {
            resolve(requests);
        })
    }

    addRequest(requestData) {
        return new Promise((resolve) => {
            const request = {id: new Date().getTime(), ...requestData}
            this.#requests.push(request)
            resolve({...request})
        })
    }

    updateRequest(id, requestData){
        const requestIndex = this.#requests.findIndex((request) => request.id === id);
        for(let field in requestData){
            if(field === 'docs'){
                this.#requests[requestIndex][field] = [...requestData[field]];
            }else if (field === 'customer'){
                for(let customerField in requestData[field]){
                    this.#requests[requestIndex][field][customerField] = requestData[field][customerField];
                }
            }else {
                this.#requests[requestIndex][field] = requestData[field];
            }
        }
        return new Promise((resolve) => {
            resolve({...this.#requests[requestIndex]});
        })
    }
}