'use strict'
class Obj {

    constructor () {
    }

    // Inicia l'objecte
    init () {
        // TODO
    }

    async llistat (db, utils, data, result) {

        let sql = '',
            taulaProductesExisteix = false,
            taula = null
    
        // Forçem una espera al fer login amb codi, perquè es vegi la càrrega (TODO: esborrar-ho)
        await utils.promiseWait(1000) 
        
        // Mira si la taula "productes" existeix
        try {
            taulaProductesExisteix = await db.promiseTableExists('productes')
        } catch (e) {
            console.warn('Avis, funció login: la taula "productes" no existeix')
        }
    
        // Si la taula "productes" no existeix, en crea una i afegeix productes
        if (!taulaProductesExisteix) {
            try {
                sql = 'CREATE TABLE productes (id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, nom VARCHAR(50) NOT NULL, descripcio TEXT, preu INT(6), imatge VARCHAR(255))'
                await db.promiseQuery(sql)
                sql = 'INSERT INTO productes (nom, descripcio, preu, imatge) VALUES ("Galicia", "Comunidad autonoma del noroeste de España", 50, "/web/imatges/viaje_galicia.jpg")'
                await db.promiseQuery(sql)
                sql = 'INSERT INTO productes (nom, descripcio, preu, imatge) VALUES ("Andorra", "Pequeño principado independiente", 40, "/web/imatges/viaje_andorra.jpg")'
                await db.promiseQuery(sql)
                sql = 'INSERT INTO productes (nom, descripcio, preu, imatge) VALUES ("Berlin", "Capital de Alemania", 80, "/web/imatges/viaje_berlin.jpg")'
                await db.promiseQuery(sql)
                sql = 'INSERT INTO productes (nom, descripcio, preu, imatge) VALUES ("California", "Estado occidental de EE.UU", 78, "/web/imatges/viaje_california.jpg")'
                await db.promiseQuery(sql)
                sql = 'INSERT INTO productes (nom, descripcio, preu, imatge) VALUES ("Hong Kong", "Territorio autonomo", 65, "/web/imatges/viaje_hongkong.jpg")'
                await db.promiseQuery(sql)
                sql = 'INSERT INTO productes (nom, descripcio, preu, imatge) VALUES ("Londres", "Capital de Inglaterra y Reino Unido", 84, "/web/imatges/viaje_londres.jpg")'
                await db.promiseQuery(sql)
                sql = 'INSERT INTO productes (nom, descripcio, preu, imatge) VALUES ("Los Angeles", "Es el nucleo de la industria televisiva y cinematografica", 75, "/web/imatges/viaje_losangeles.jpg")'
                await db.promiseQuery(sql)
                sql = 'INSERT INTO productes (nom, descripcio, preu, imatge) VALUES ("Madrid", "Capital de España", 80, "/web/imatges/viaje_madrid.jpg")'
                await db.promiseQuery(sql)
                sql = 'INSERT INTO productes (nom, descripcio, preu, imatge) VALUES ("Paris", "Capital de Francia", 86, "/web/imatges/viaje_paris.jpg")'
                await db.promiseQuery(sql)
                sql = 'INSERT INTO productes (nom, descripcio, preu, imatge) VALUES ("Roma", "Capital de Italia", 76, "/web/imatges/viaje_roma.jpg")'
                await db.promiseQuery(sql)
            } catch (e) {
                console.error(e)
                return result.json({ resultat: "ko", missatge: "Error, funció llistatProductes: no s'ha pogut crear la taula productes"})  
            }
        }
    
       // Demana la informació de productes
       if (data.id) {
            try {
                sql = 'SELECT * FROM productes WHERE id=' + data.id
                taula = await db.promiseQuery(sql)
            } catch (e) {
                console.error(e)
                return result.json({ resultat: "ko", missatge: "Error, funció llistatProductes: ha fallat la crida a les dades"})  
            }
        } else {
            try {
                sql = 'SELECT * FROM productes'
                taula = await db.promiseQuery(sql)
            } catch (e) {
                console.error(e)
                return result.json({ resultat: "ko", missatge: "Error, funció llistatProductes: ha fallat la crida a les dades"})  
            }
        }   
    
        // Si hem aconseguit dades corectament, tornem la taula resultant
        if (typeof taula === 'object' && typeof taula.length === 'number') {
            result.json({ resultat: "ok", missatge: taula })
        } else {
            result.json({ resultat: "ko", missatge: [] })
        }
    }
}

// Export
module.exports = Obj

/*
function expandeiximg() {
    let divimg = document.getElementById('productes1 img');
    divimg.style.width = '500px';
}
*/
