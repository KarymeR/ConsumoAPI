const url = 'https://amelica.org/wp-json/wp/v2/posts';
const urlA = 'https://amelica.org/wp-json/wp/v2/users/26' 

const llamandoAPI = async () => {
    try {
        const respuesta = await fetch(url);

        const data = await respuesta.json();
        console.log(data);

        const contenedor = document.getElementById('contenedor'); 
        const divTarjetas = document.createElement('DIV');
        divTarjetas.className = 'tarjetas';
        contenedor.appendChild(divTarjetas);

        for (let i = 0; i < data.length; i++) {
            let title = data[i].title.rendered;
            let urlA =  data[i]._links.author[0].href;
            let link = data[i].link;
            let date = data[i].date;
            let excerpt = data[i].excerpt.rendered; 
            
            let resp = await fetch(urlA);
            let dataA = await resp.json();
            let author = dataA.name;
            console.log(dataA.name);

            

            crearTarjeta(title, author, link, date, excerpt, divTarjetas);
        }        

    } catch (error) {
      console.log(error);
    } 
}

function crearTarjeta(title, author, link, date, excerpt, divTarjetas) {   

    const art = document.createElement('ARTICLE');
    art.className = 'tarjeta';
    divTarjetas.appendChild(art);
    
    const divPin = document.createElement('DIV');
    divPin.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" > <path d="M15 4.5l-4 4l-4 1.5l-1.5 1.5l7 7l1.5 -1.5l1.5 -4l4 -4" /> <path d="M9 15l-4.5 4.5" /> <path d="M14.5 4l5.5 5.5" /> </svg>'
    divPin.className = 'pin';
    art.appendChild(divPin);

    const divTitulo = document.createElement('DIV');
    divTitulo.className = 'titulo-articulo';
    art.appendChild(divTitulo);

    const titulo = document.createElement('H2');
    titulo.innerHTML = title;
    divTitulo.appendChild(titulo);

    const divContenido = document.createElement('DIV');
    divContenido.className = 'contenido-articulo';
    art.appendChild(divContenido);

    const pContenido = document.createElement('P');
    pContenido.innerHTML = excerpt;
    divContenido.appendChild(pContenido)

    const a = document.createElement('A');
    a.href = link;
    a.innerHTML = 'Continuar leyendo...';
    divContenido.appendChild(a);
    
    const divInfo = document.createElement('DIV');
    divInfo.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" x-bind:width="size" x-bind:height="size" viewBox="0 0 24 24" fill="none" stroke="currentColor" x-bind:stroke-width="stroke" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke-width="2"> <path d="M4 5m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path> <path d="M16 3l0 4"></path> <path d="M8 3l0 4"></path> <path d="M4 11l16 0"></path> <path d="M8 15h2v2h-2z"></path> </svg>'
    divInfo.className = 'info';
    art.appendChild(divInfo);

    const pInfo = document.createElement('P');
    pInfo.innerHTML = date + ' - <span> Autor: </span>' + author;
    divInfo.appendChild(pInfo);
}

function formatoFecha(date) {
	const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']; 
	
	date = date.substring(0,10);
	
	date = new Date(date);
	const dia = date.getDate();
	const mes = meses[date.getMonth()];
	const anio = date.getFullYear();

	return dia + ' ' + mes + ' ' + anio;
}
  
llamandoAPI()