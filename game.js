// ===============================
// ESTADO DEL JUEGO
// ===============================
let productos = [];
let puntaje = 0;
let errores = 0;
let productoCorrecto = null;

// ===============================
// UTILIDADES
// ===============================
function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function mezclar(array) {
  return array.sort(() => Math.random() - 0.5);
}

// ===============================
// CARGAR JSON
// ===============================
fetch("/Juego_Bar-Vuelvo/data/productos_juego.json")
  .then(res => {
    if (!res.ok) throw new Error("No se pudo cargar el JSON");
    return res.json();
  })
  .then(data => {
    // APLANAR ARRAY DE ARRAYS
    productos = data.flat();

    console.log("Productos cargados:", productos.length);

    nuevaPregunta();
  })
  .catch(err => {
    console.error("Error cargando productos:", err);
    alert("Error cargando los productos");
  });

// ===============================
// JUEGO
// ===============================
function nuevaPregunta() {
  if (errores >= 3) {
    alert(`Juego terminado\nPuntaje final: ${puntaje}`);
    location.reload();
    return;
  }

  // Producto correcto
  productoCorrecto = randomItem(productos);

  // Opciones falsas (misma categoría/tipo)
  let opciones = productos
    .filter(p =>
      p.tipo === productoCorrecto.tipo &&
      p.nombre !== productoCorrecto.nombre
    );

  opciones = mezclar(opciones).slice(0, 2);
  opciones.push(productoCorrecto);
  opciones = mezclar(opciones);

  // Mostrar ingredientes
  document.getElementById("ingredientes").innerText =
    productoCorrecto.ingredientes;

  // Renderizar botones
  const contenedor = document.getElementById("opciones");
  contenedor.innerHTML = "";

  opciones.forEach(opcion => {
    const btn = document.createElement("button");
    btn.innerText = opcion.nombre;
    btn.onclick = () => verificarRespuesta(opcion);
    contenedor.appendChild(btn);
  });

  // Actualizar marcador
  actualizarMarcador();
}

function verificarRespuesta(opcion) {
  if (opcion.nombre === productoCorrecto.nombre) {
    puntaje++;
  } else {
    errores++;
  }

  nuevaPregunta();
}

function actualizarMarcador() {
  document.getElementById("puntaje").innerText = puntaje;
  document.getElementById("errores").innerText = errores;
}

