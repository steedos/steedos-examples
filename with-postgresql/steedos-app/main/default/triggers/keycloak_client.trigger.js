const objectql = require('@steedos/objectql');
const { v4: uuidv4 } = require('uuid')

module.exports = {
    listenTo: 'keycloak_client',

    beforeInsert: async function(){
        const doc = this.doc
        if (!doc.id) {
            doc.id = uuidv4()
        }
    },

    beforeUpdate: async function(){
    
    },

    beforeDelete: async function(){
    
    },

    afterInsert: async function(){
    
    },

    afterUpdate: async function(){
    
    },

    afterDelete: async function(){
    
    },

}