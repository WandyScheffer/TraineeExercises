const jsontoxml = require('jsontoxml');
const db = require('../models');

const serializator = {
    json(data) {
        return JSON.stringify(data);
    },
    xml(data) {
        data = this.filterData(data);
        return jsontoxml(data);
    },
    filterData(data) {
        let tagRoot;

        if (Array.isArray(data)) {
            data = data.map(item => {

                tagRoot = this.verifyInstanceAndQuantity(item, data);

                if (Array.isArray(item)) {
                    item = item.map(subItem => {
                        
                        const subTagModel = this.verifyInstanceAndQuantity(subItem, item);

                        return {
                            [subTagModel]: subItem.dataValues
                        }
                    })
                } else {
                    const objectItem = item.dataValues;
                    for (const key in objectItem) {
                        if (Array.isArray(objectItem[key])) {
                            objectItem[key] = objectItem[key].map(subItem => {

                                const subTagModel = this.verifyInstanceAndQuantity(subItem);

                                return {
                                    [subTagModel]: subItem.dataValues
                                }

                            })
                        }
                    }
                    const subTagModel = this.verifyInstanceAndQuantity(item);
                    return {
                        [subTagModel]: item.dataValues
                    }

                }

            })
        } else {
            tagRoot = this.verifyInstanceAndQuantity(data);

            if (data.message) {
                return {error: data};
            }

            data = data.dataValues;
            for (const key in data) {
                if (Array.isArray(data[key])) {
                    data[key] = data[key].map(item => {

                        const subTagModel = this.verifyInstanceAndQuantity(item);

                        return {
                            [subTagModel]: item.dataValues
                        }
                    })
                }
            }
        }

        return { [tagRoot]: data };
    },
    verifyInstanceAndQuantity(model, containsModel){
        
        if (Array.isArray(containsModel)) {
            return model instanceof db.Categorys ? "categorys" : "products";
        }
        return model instanceof db.Categorys ? "category" : "product";
    },
    serializing(data, contentType) {
        if (contentType === 'application/json') {
            return this.json(data);
        } else if (contentType === 'application/xml') {
            return this.xml(data)
        }
    }
}

module.exports = serializator;