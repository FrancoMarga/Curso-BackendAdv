const {Transport} = require ('winston');
const incidentModel = require ('../../models/Incident.model');

// Crear clase de transporte personalizado que extiende de winston.Transport
class IncidentTransport extends Transport {
    constructor (opts){
        super(opts);
    }

    // Override del método log() para personalizar el comportamiento del transporte
    log(info,callback){
        if (info.level === 'error'){
            setImmediate(async () => {
                const incident = new incidentModel({
                    message: { 
                        date: new Date().toLocaleString(),
                        error: info.message
                    }
                });
                await incident.save();

                // Llama al callback después de que hayas procesado el registro
                callback();
            });
        }
    }
}

// Exporta tu transporte personalizado para su uso en Winston
module.exports = IncidentTransport;