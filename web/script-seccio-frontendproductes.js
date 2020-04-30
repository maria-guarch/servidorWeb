
class ObjSeccioFrontendProductes {

    constructor () {
    }

    async iniciaSeccio () {
        let refLoading = document.getElementById('productesLoading'),
            refContinguts = document.getElementById('productesContinguts'),
            objRebut = null,
            valor = null,
            codiHTML = '',
            cntProducte = 0

        // Amaguem els continguts actuals i mostrem la càrrega
        refContinguts.style.display = 'none'
        refLoading.style.display = 'flex'

        // Demanem el llistat de productes al servidor
        objRebut = await promiseCallServer('POST', '/call/llistatProductes', {})

        // Transformem l'objecte rebut en codi HTML
        if (objRebut.resultat === 'ok') {
            for (cntProducte = 0; cntProducte < objRebut.missatge.length; cntProducte = cntProducte + 1) {
                valor = objRebut.missatge[cntProducte]
                codiHTML = codiHTML + '<div class="productesexp">'
                codiHTML = codiHTML + '<marquee><img src="https://images.vexels.com/media/users/3/145451/isolated/preview/d3ac7e539cba374525f981b102196af2-avi--n-despegando-by-vexels.png" height="100" width="100"></marquee>'
                codiHTML = codiHTML + '</div>'
                codiHTML = codiHTML + '<hr/>'
                codiHTML = codiHTML + '<div class="productes1">'
                codiHTML = codiHTML + '<div class="productes2" onclick=\'navegacio.canviaSeccio("frontendProducte&' + valor.id + '")\'>'
                codiHTML = codiHTML + '<h3>' + valor.nom +'</h3>'
                codiHTML = codiHTML + '<div>' + valor.descripcio +'</div>'
                codiHTML = codiHTML + '<div>' + valor.preu +' €</div>'
                codiHTML = codiHTML + '</div>'
                codiHTML = codiHTML + '<img src="' + valor.imatge + '" width="400" />'
                codiHTML = codiHTML + '</div>'
                codiHTML = codiHTML + '<hr/>'
            }
        }

        // Amaguem la càrrega i mostrem el llistat de productes
        refContinguts.innerHTML = codiHTML
        refContinguts.style.display = 'flex'
        refLoading.style.display = 'none'
    }
}