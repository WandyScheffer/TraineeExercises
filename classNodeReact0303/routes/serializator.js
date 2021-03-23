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
        let filtered_data;
        if (Array.isArray(data)) {
            filtered_data = this.whenIsArray(data);
        } else {
            filtered_data = this.whenIsObject(data);
        }
        // it should return an "Array" containing "JSON" adapted to convert to XML or a JSON adapted...
        return filtered_data;
    },

    whenIsObject(data) {
        const tagRoot = this.verifyInstanceAndQuantity(data, false);

        if (data.message) {
            return { error: data };
        }

        const adapted_json = data.dataValues;
        for (const key in adapted_json) {
            if (Array.isArray(adapted_json[key])) {
                adapted_json[key] = this.whenIsArray(adapted_json[key], true)
            } else if (adapted_json[key].dataValues) {                
                adapted_json[key] = adapted_json[key].dataValues;
            }
        }
        return { [tagRoot]: adapted_json };
    },
    whenIsArray(data, justValue = false) {
        const tagRoot = this.verifyInstanceAndQuantity(data[0]);
        const adapted_json = data.map((item) => {
            if (Array.isArray(item)) {
                item = this.whenIsArray(item);
                return { ...item.dataValues };
            } else {
                const objectItem = item.dataValues;
                for (const key in objectItem) {
                    if (Array.isArray(objectItem[key])) {
                        objectItem[key] = this.whenIsArray(
                            objectItem[key],
                            true
                        );
                    } else if (
                        objectItem[key] instanceof db.Categorys ||
                        objectItem[key] instanceof db.Products
                    ) {
                        objectItem[key] = objectItem[key].dataValues;
                    }
                }
                const subTag = this.verifyInstanceAndQuantity(item, false);
                return { [subTag]: objectItem };
            }
        });
        return !justValue ? { [tagRoot]: adapted_json } : adapted_json;
    },

    verifyInstanceAndQuantity(model, moreThanOneInstance = true) {
        if (moreThanOneInstance) {
            return model instanceof db.Categorys ? "Categorys" : "Products";
        }
        return model instanceof db.Categorys ? "Category" : "Product";
    },

    serializing(data, contentType) {
        if (contentType === "application/json") {
            return this.json(data);
        } else if (contentType === "application/xml") {
            return this.xml(data);
        }
    },
};

module.exports = serializator;