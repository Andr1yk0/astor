export default class CustomerService {
    #customers = [
        {
            id: 1,
            firstName: 'Андрій',
            lastName: 'Садовий',
            address: 'м. Львів, вул. Городоцька 11',
            phone: '0321172233'
        },
    ];

    search(params){
        let customers = [];
        if(params){
                customers = this.#customers.filter((customer) => {
                    for (let key in params){
                        if(params[key] && !customer[key].toLowerCase().includes(params[key].toLowerCase())){
                            return false;
                        }
                    }
                    return true;
                })
        }else {
            customers = [...this.#customers];
        }
        return new Promise((resolve) => {
            resolve(customers);
        })
    }

    addCustomer(customerData){
        return new Promise((resolve) => {
            const customer = {id: new Date().getTime(), ...customerData}
            this.#customers.push(customer)
            resolve({...customer})
        })
    }
}